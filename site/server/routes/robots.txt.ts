export default defineEventHandler((event) => {
  setResponseHeader(event, 'content-type', 'text/plain')
  return `User-agent: *
Allow: /

Sitemap: https://janhoon.com/sitemap.xml`
})
