'use client'

import { useState } from 'react'

interface HomeAvatarProps {
  size?: number
  src?: string
  interactive?: boolean
  className?: string
  alt?: string
}

export function HomeAvatar({
  size = 68,
  src = '/favicon.png',
  interactive = true,
  className = 'neu-avatar home-avatar',
  alt = 'Raka',
}: HomeAvatarProps) {
  const [showImage, setShowImage] = useState(true)
  const [pressed, setPressed] = useState(false)

  const hasImage = Boolean(src)
  const imageVisible = hasImage && (!interactive || showImage)
  const letterVisible = !imageVisible

  const sharedStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: '50%',
    flexShrink: 0,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    padding: 0,
    background:
      'linear-gradient(135deg, var(--placeholder-grad-1) 0%, var(--placeholder-grad-2) 100%)',
    fontFamily: 'var(--font-caveat)',
    fontSize: Math.round(size * 0.44),
    color: 'var(--accent)',
    letterSpacing: '4px',
    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
  }

  const children = (
    <>
      <span
        aria-hidden={!letterVisible}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: letterVisible ? 1 : 0,
          transform: letterVisible ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        R
      </span>
      {hasImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          width={size}
          height={size}
          aria-hidden={!imageVisible}
          style={{
            position: 'absolute',
            inset: 0,
            width: '80%',
            height: '80%',
            placeSelf: 'center',
            objectFit: 'cover',
            opacity: imageVisible ? 1 : 0,
            transform: imageVisible ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 0.3s ease, transform 0.3s ease',
          }}
        />
      )}
    </>
  )

  if (!interactive) {
    return (
      <div className={className} style={sharedStyle}>
        {children}
      </div>
    )
  }

  return (
    <button
      type="button"
      aria-label="Swap avatar"
      className={className}
      onClick={() => setShowImage((s) => !s)}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        ...sharedStyle,
        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
        transition: 'transform 0.15s ease',
        transform: pressed ? 'scale(0.95)' : 'scale(1)',
      }}
    >
      {children}
    </button>
  )
}
