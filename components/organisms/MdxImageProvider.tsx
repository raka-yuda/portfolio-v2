'use client'

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface MdxImageItem {
  id: string
  src: string
  alt: string
  caption?: string
}

interface MdxImageContextValue {
  images: MdxImageItem[]
  registerImage: (image: MdxImageItem) => void
  unregisterImage: (id: string) => void
  openIndex: number | null
  open: (id: string) => void
  close: () => void
  next: () => void
  prev: () => void
}

const MdxImageContext = createContext<MdxImageContextValue | null>(null)

export function MdxImageProvider({ children }: { children: React.ReactNode }) {
  const [images, setImages] = useState<MdxImageItem[]>([])
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const registerImage = useCallback((image: MdxImageItem) => {
    setImages((prev) => {
      if (prev.some((img) => img.id === image.id)) return prev
      return [...prev, image]
    })
  }, [])

  const unregisterImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }, [])

  const open = useCallback((id: string) => {
    setImages((prev) => {
      const index = prev.findIndex((img) => img.id === id)
      if (index >= 0) setOpenIndex(index)
      return prev
    })
  }, [])

  const close = useCallback(() => setOpenIndex(null), [])

  const next = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null) return null
      return current < images.length - 1 ? current + 1 : 0
    })
  }, [images.length])

  const prev = useCallback(() => {
    setOpenIndex((current) => {
      if (current === null) return null
      return current > 0 ? current - 1 : images.length - 1
    })
  }, [images.length])

  useEffect(() => {
    if (openIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, close, next, prev])

  return (
    <MdxImageContext.Provider value={{ images, registerImage, unregisterImage, openIndex, open, close, next, prev }}>
      {children}
      <Lightbox />
    </MdxImageContext.Provider>
  )
}

export function useMdxImageContext() {
  const ctx = useContext(MdxImageContext)
  if (!ctx) throw new Error('useMdxImageContext must be used within MdxImageProvider')
  return ctx
}

function Lightbox() {
  const { images, openIndex, close, next, prev } = useMdxImageContext()
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    if (openIndex === null) return
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [openIndex])

  if (openIndex === null) return null

  const image = images[openIndex]
  const visible = [-1, 0, 1]
    .map((offset) => ({ offset, img: images[openIndex + offset] }))
    .filter((item): item is { offset: number; img: MdxImageItem } => !!item.img)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = e.changedTouches[0].screenX - touchStartX.current
    if (diff > 60) prev()
    if (diff < -60) next()
    touchStartX.current = null
  }

  return (
    <div
      className="mdx-lightbox-overlay"
      onClick={close}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.88)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'zoom-out',
        padding: 24,
        overflow: 'hidden',
      }}
    >
      <button
        type="button"
        className="mdx-lightbox-close"
        onClick={(e) => { e.stopPropagation(); close() }}
        aria-label="Close lightbox"
        style={{
          position: 'absolute',
          top: 16,
          right: 16,
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '50%',
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          cursor: 'pointer',
          backdropFilter: 'blur(4px)',
          zIndex: 20,
        }}
      >
        <X size={20} />
      </button>

      {/* Desktop: image + caption column + side buttons */}
      <div className="mdx-lightbox-desktop" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
        <button
          type="button"
          className="mdx-lightbox-nav mdx-lightbox-nav-side"
          onClick={(e) => { e.stopPropagation(); prev() }}
          aria-label="Previous image"
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
        >
          <ChevronLeft size={24} />
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', maxWidth: '100%', maxHeight: '100%' }}>
          <img
            key={openIndex}
            src={image.src}
            alt={image.alt}
            className="mdx-lightbox-image"
            style={{
              maxWidth: '100%',
              maxHeight: '78vh',
              objectFit: 'contain',
              borderRadius: 8,
              boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
          {image.caption && (
            <span
              style={{
                marginTop: 16,
                color: 'rgba(255,255,255,0.9)',
                fontSize: 14,
                fontStyle: 'italic',
                textAlign: 'center',
                maxWidth: '80%',
                textShadow: '0 1px 4px rgba(0,0,0,0.5)',
              }}
            >
              {image.caption}
            </span>
          )}
        </div>

        <button
          type="button"
          className="mdx-lightbox-nav mdx-lightbox-nav-side"
          onClick={(e) => { e.stopPropagation(); next() }}
          aria-label="Next image"
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              background: 'rgba(255,255,255,0.18)',
            border: '1px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
          }}
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Mobile: stacked cards, transparent background, no buttons, swipe */}
      <div className="mdx-lightbox-mobile" style={{ display: 'none', position: 'relative', width: '100%', height: '100%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', height: '55vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {visible.map(({ offset, img }) => {
            const isActive = offset === 0
            return (
              <button
                key={img.id}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  if (offset < 0) prev()
                  if (offset > 0) next()
                }}
                aria-label={isActive ? img.alt : offset < 0 ? 'Previous image' : 'Next image'}
                className="mdx-lightbox-card"
                style={{
                  position: 'absolute',
                  width: '105%',
                  transform: `translateX(${offset * 55}%) scale(${isActive ? 1 : 0.82})`,
                  opacity: isActive ? 1 : 0.45,
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                  cursor: isActive ? 'default' : 'pointer',
                  padding: 0,
                  transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
                }}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', background: 'transparent' }}
                />
              </button>
            )
          })}
        </div>

        {image.caption && (
          <span
            style={{
              marginTop: 12,
              color: 'rgba(255,255,255,0.9)',
              fontSize: 14,
              fontStyle: 'italic',
              textAlign: 'center',
              maxWidth: '80%',
              textShadow: '0 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            {image.caption}
          </span>
        )}

        {images.length > 1 && (
          <div style={{ marginTop: 16, display: 'flex', gap: 8, zIndex: 20 }}>
            {images.map((img, idx) => (
              <span
                key={img.id}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: idx === openIndex ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.35)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
