export function Footer() {
  return (
    <div
      style={{
        paddingTop: 28,
        marginTop: 32,
        borderTop: '1px solid var(--border-soft)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <span
        className="footer-sig"
        style={{
          fontFamily: 'var(--font-caveat)',
          fontSize: 28,
          lineHeight: 1,
          color: 'var(--accent)',
        }}
      >
        Raka
      </span>
      <span style={{ fontSize: 13, color: 'var(--text-soft)' }}>©2025</span>
    </div>
  )
}
