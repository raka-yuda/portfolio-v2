interface PageLayoutProps {
  children: React.ReactNode
  /** Aria landmark label — defaults to "main content" */
  label?: string
}

/**
 * Every page goes through this module. It owns:
 *  - content-width constraint + responsive padding
 *  - entrance animation
 *  - semantic <main> landmark for screen readers and SEO
 *  - consistent bottom clearance above the fixed nav bar
 */
export function PageLayout({ children, label = 'main content' }: PageLayoutProps) {
  return (
    <main aria-label={label} className="page-in layout-container">
      {children}
    </main>
  )
}
