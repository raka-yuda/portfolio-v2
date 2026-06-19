import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/mdx'
import { ProjectsClient } from './ProjectsClient'

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Personal projects, side experiments, and things I keep coming back to.',
  alternates: { canonical: '/project' },
  openGraph: {
    title: 'Projects',
    description: 'Personal projects, side experiments, and things I keep coming back to.',
    url: '/project',
    images: [{ url: '/project/opengraph-image', width: 1200, height: 630, alt: 'Projects' }],
  },
  twitter: { card: 'summary_large_image', title: 'Projects', description: 'Personal projects, side experiments, and things I keep coming back to.' },
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  return <ProjectsClient projects={projects} />
}
