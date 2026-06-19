'use client'

import { useEffect, useId } from 'react'
import { useMdxImageContext } from '@/components/organisms/MdxImageProvider'

interface MdxImageProps {
  src?: string
  alt?: string
  title?: string
  caption?: string
}

export function MdxImage({ src, alt = '', title, caption }: MdxImageProps) {
  const id = useId()
  const { registerImage, unregisterImage, open } = useMdxImageContext()
  const finalCaption = caption ?? title

  useEffect(() => {
    if (!src) return
    registerImage({ id, src, alt, caption: finalCaption })
    return () => unregisterImage(id)
  }, [id, src, alt, finalCaption, registerImage, unregisterImage])

  if (!src) return null

  return (
    <>
      <button
        type="button"
        onClick={() => open(id)}
        aria-label={`Expand image: ${alt}`}
        style={{
          position: 'relative',
          width: '100%',
          height: 280,
          borderRadius: 8,
          overflow: 'hidden',
          border: '1px solid var(--border-soft)',
          background: 'var(--surface-1)',
          cursor: 'pointer',
          padding: 0,
          margin: '24px 0 8px',
          display: 'block',
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }}
        />
      </button>
      {finalCaption && (
        <span style={{ display: 'block', textAlign: 'center', fontSize: 13, color: 'var(--text-soft)', marginBottom: 24, fontStyle: 'italic' }}>
          {finalCaption}
        </span>
      )}
    </>
  )
}
