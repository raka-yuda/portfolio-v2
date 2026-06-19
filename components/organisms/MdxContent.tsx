import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { MdxImage } from '@/components/molecules/MdxImage'
import { MdxImageProvider } from '@/components/organisms/MdxImageProvider'

const components = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 style={{ fontWeight: 600, fontSize: 18, marginTop: 40, marginBottom: 14, letterSpacing: '-0.005em', color: 'var(--text-base)' }} {...props} />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 style={{ fontWeight: 600, fontSize: 16, marginTop: 28, marginBottom: 10, color: 'var(--text-base)' }} {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p style={{ fontSize: 17, lineHeight: '30px', color: 'var(--text-body)', marginBottom: 18 }} {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul style={{ fontSize: 17, lineHeight: '30px', color: 'var(--text-body)', paddingLeft: 22, marginBottom: 18 }} {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol style={{ fontSize: 17, lineHeight: '30px', color: 'var(--text-body)', paddingLeft: 22, marginBottom: 18 }} {...props} />
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: 6 }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a style={{ color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 3 }} target="_blank" rel="noopener noreferrer" {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ fontWeight: 600, color: 'var(--text-base)' }} {...props} />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code style={{ fontFamily: 'var(--font-mono), monospace', fontSize: '0.92em', background: 'var(--code-bg)', padding: '2px 6px', borderRadius: 4, color: 'var(--text-base)' }} {...props} />
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote style={{ borderLeft: '3px solid var(--accent)', paddingLeft: 16, margin: '20px 0', color: 'var(--text-body)', fontStyle: 'italic' }} {...props} />
  ),
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid var(--border-soft)', margin: '32px 0' }} />,
  img: MdxImage,
  MdxImage,
}

export function MdxContent({ source }: { source: string }) {
  return (
    <MdxImageProvider>
      <MDXRemote
        source={source}
        components={components}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
      />
    </MdxImageProvider>
  )
}
