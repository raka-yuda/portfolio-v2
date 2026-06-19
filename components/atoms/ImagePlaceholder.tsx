import Image from 'next/image'

interface ImgPhProps {
  h?: number
  src?: string
  alt?: string
  emoji?: string
  label?: string
}

export function ImgPh({ h = 139, src, alt = '', emoji, label }: ImgPhProps) {
  return (
    <div
      aria-label={alt}
      // className="img-placeholder"
      style={{
        width: '100%',
        height: h,
        flexShrink: 0,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 4,
        padding: "16px",
        background: src
          ? 'linear-gradient(135deg, var(--placeholder-grad-1) 0%, var(--placeholder-grad-2) 0%, transparent 100%)'
          : 'linear-gradient(135deg, var(--placeholder-grad-1) 0%, var(--placeholder-grad-2) 100%)',
      }}
    >
      {/* Real image as base layer */}
      {src && 
        <div style={{ position: 'absolute', inset: 0, padding: 16 }}>
          <Image src={src} alt={alt} fill style={{ objectFit: 'cover', zIndex: -1 }} loading='eager'/>
        </div> 
      }

      {/* Dot grain — on top of image */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle, color-mix(in srgb, var(--text-base) 6%, transparent) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
          opacity: src ? 0.25 : 0.5,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Accent wash — on top of image */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-30%', right: '-20%',
          width: '60%', height: '120%',
          background: 'radial-gradient(circle at center, color-mix(in srgb, var(--accent) 14%, transparent) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 3,
        }}
      />

      {/* Emoji or initials label — only when no real image */}
      {emoji && (
        <span
          style={{
            position: 'relative', zIndex: 2,
            fontSize: Math.round(h * 0.32),
            lineHeight: 1,
            filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.08))',
          }}
        >
          {emoji}
        </span>
      )}
      {!src && !emoji && label && (
        <span
          style={{
            position: 'relative', zIndex: 2,
            fontFamily: 'var(--font-caveat)',
            fontSize: Math.round(h * 0.28),
            color: 'color-mix(in srgb, var(--accent) 55%, transparent)',
            lineHeight: 1,
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
