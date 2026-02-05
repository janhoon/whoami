export default defineEventHandler(() => {
  const baseUrl = 'https://janhoon.com'
  const now = new Date().toISOString()

  const urls = [
    { loc: baseUrl, lastmod: now, changefreq: 'monthly', priority: '1.0' },
    { loc: `${baseUrl}/blog`, lastmod: now, changefreq: 'weekly', priority: '0.8' },
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

  setResponseHeader(event, 'content-type', 'application/xml')
  return xml
})
