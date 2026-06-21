import { HomeAvatar } from './HomeAvatar'

interface AuthorRowProps {
  date?: string
  readTime?: string
}

export function AuthorRow({ date, readTime }: AuthorRowProps) {
  return (
    <div className="author-row" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '22px 0', borderBottom: '1px solid var(--border-soft)', marginBottom: 32,
    }}>
      <div className="author-info" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <HomeAvatar size={52} interactive={false} className="neu-avatar author-avatar" />
        <div>
          <div className="author-name" style={{ fontWeight: 500, fontSize: 20, lineHeight: '100%' }}>Raka</div>
          <div className="author-role" style={{ fontSize: 15, color: 'var(--text-soft)', marginTop: 5 }}>Software Engineer</div>
        </div>
      </div>
      <div className="author-meta" style={{ display: 'flex', gap: 20, flexShrink: 0 }}>
        {date && <span style={{ fontSize: 14, color: 'var(--text-soft)', whiteSpace: 'nowrap' }}>{date}</span>}
        {readTime && <span style={{ fontSize: 14, color: 'var(--text-soft)', whiteSpace: 'nowrap' }}>{readTime}</span>}
      </div>
    </div>
  )
}
