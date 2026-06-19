interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'accent'
}

export function Tag({ children, variant = 'default' }: TagProps) {
  const isAccent = variant === 'accent'
  return (
    <span
      className="sku-tag"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '4px 12px',
        borderRadius: 999,
        background: isAccent ? 'var(--accent)' : 'var(--tag-bg)',
        color: isAccent ? '#fff' : 'var(--text-body)',
        fontSize: 13,
        fontWeight: 500,
        lineHeight: '20px',
        whiteSpace: 'nowrap',
        border: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      {children}
    </span>
  )
}
