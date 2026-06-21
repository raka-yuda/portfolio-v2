'use client'

import { PageLayout } from '@/components/templates/PageLayout'
import { ProjectItem } from '@/components/molecules/ProjectItem'
import { Footer } from '@/components/molecules/Footer'
import { FilterTabs } from '@/components/organisms/FilterTabs'
import { useContentFilter } from '@/lib/use-content-filter'
import type { Project } from '@/types'

export function ProjectsClient({ projects }: { projects: Project[] }) {
  const { tabs: catTabs, activeTab: cat, setActiveTab: setCat, filtered: byCategory } =
    useContentFilter(projects, { filterKey: 'tags'})

  const { tabs: techTabs, activeTab: tech, setActiveTab: setTech, filtered: visible } =
    useContentFilter(byCategory, { filterKey: 'techStack' })

  return (
    <PageLayout>
      <h1 className="responsive-h1" style={{ fontWeight: 600, fontSize: 34, lineHeight: '100%', marginBottom: 28, letterSpacing: '-0.01em' }}>Projects</h1>

      <div style={{ position: 'relative' }}>
        <aside
          aria-label="Filter by tech"
          className="hidden lg:block"
          style={{ position: 'sticky', top: 60, float: 'right', marginRight: 'calc(-170px - 32px)', width: 170, alignSelf: 'flex-start' }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14, letterSpacing: '-0.005em' }}>Tags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {techTabs.filter((t) => t !== 'All').map((t) => {
              const active = tech === t
              return (
                <button
                  key={t}
                  onClick={() => setTech(active ? 'All' : t)}
                  className={`neu-filter-btn${active ? ' active' : ''}`}
                  style={{
                    padding: '4px 12px', borderRadius: 999, border: 'none', cursor: 'pointer',
                    background: active ? 'var(--accent)' : 'var(--tag-bg)',
                    color: active ? '#fff' : 'var(--text-body)',
                    fontFamily: 'inherit', fontSize: 13, fontWeight: 500, lineHeight: '20px',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >{`#${t}`}</button>
              )
            })}
          </div>
        </aside>

        <FilterTabs tabs={catTabs} active={cat} onChange={setCat} />
        <div className="stagger">
          {visible.length === 0
            ? <p style={{ color: 'var(--text-soft)', fontSize: 16 }}>No projects match this filter.</p>
            : visible.map((p) => <ProjectItem key={p.slug} project={p} variant="row" />)
          }
        </div>
      </div>

      <Footer />
    </PageLayout>
  )
}
