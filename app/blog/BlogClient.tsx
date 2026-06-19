'use client'

import { PageLayout } from '@/components/templates/PageLayout'
import { BlogItem } from '@/components/molecules/BlogItem'
import { Footer } from '@/components/molecules/Footer'
import { FilterTabs } from '@/components/organisms/FilterTabs'
import { useContentFilter } from '@/lib/use-content-filter'
import type { BlogPost } from '@/types'

export function BlogClient({ posts }: { posts: BlogPost[] }) {
  const { tabs, activeTab, setActiveTab, filtered } = useContentFilter(posts)

  return (
    <PageLayout>
      <h1 className="responsive-h1" style={{ fontWeight: 600, fontSize: 34, lineHeight: '100%', marginBottom: 28, letterSpacing: '-0.01em' }}>Blogs</h1>
      <FilterTabs tabs={tabs} active={activeTab} onChange={setActiveTab} />
      <div className="stagger">
        {filtered.map((post) => <BlogItem key={post.slug} post={post} variant="row" />)}
      </div>
      <Footer />
    </PageLayout>
  )
}
