interface PageLayoutProps {
  children: React.ReactNode
  /** Aria landmark label — defaults to "main content" */
  label?: string
  className?: string
  /** Use fade+slide entrance (default: slide only, better for LCP) */
  fade?: boolean
}

/**
 * Every page goes through this module. It owns:
 *  - content-width constraint + responsive padding
 *  - entrance animation
 *  - semantic <main> landmark for screen readers and SEO
 *  - consistent bottom clearance above the fixed nav bar
 */
export function PageLayout({ children, label = 'main content', className, fade = false }: PageLayoutProps) {
  return (
    <main aria-label={label} className={`${fade ? 'page-in-fade' : 'page-in'} layout-container ${className ?? ''}`.trim()}>
      {children}
    </main>
  )
}
