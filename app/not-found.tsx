import Link from 'next/link'
import { Home } from 'lucide-react'
import { PageLayout } from '@/components/templates/PageLayout'
import { HomeAvatar } from '@/components/molecules/HomeAvatar'

export default function NotFoundPage() {
  return (
    <PageLayout>
      <div className="flex min-h-[calc(100dvh-192px)] flex-col items-center justify-center text-center max-md:min-h-[calc(100dvh-152px)]">
        <HomeAvatar interactive={false} />
        <div className="font-signature text-[96px] leading-none text-accent mt-7">404</div>
        <h1 className="mt-4 text-[22px] font-bold tracking-tight">Lost in the woods?</h1>
        <p className="mt-2.5 max-w-90 text-[15px] leading-6 text-muted-foreground">
          This page doesn&apos;t exist. Maybe it moved, maybe it&apos;s still brewing.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-md transition-colors hover:bg-accent/90"
        >
          <Home className="size-4" />
          Back to homepage
        </Link>
      </div>
    </PageLayout>
  )
}
