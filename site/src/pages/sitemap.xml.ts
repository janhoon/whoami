import { getCollection } from 'astro:content'

export const prerender = true

export async function GET() {
  const baseUrl = 'https://janhoon.com'
  const now = new Date().toISOString()

  const posts = await getCollection('blog')

  const urls = [
    { loc: baseUrl, lastmod: now, changefreq: 'monthly', priority: '1.0' },
    { loc: `${baseUrl}/blog`, lastmod: now, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/llms.txt`, lastmod: now, changefreq: 'monthly', priority: '0.5' },
    ...posts.map((post) => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: '0.7',
    })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
    },
  })
}
