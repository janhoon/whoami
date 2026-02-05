export default defineEventHandler(() => {
  setResponseHeader(event, 'content-type', 'text/plain')
  return `User-agent: *
Allow: /

Sitemap: https://janhoon.com/sitemap.xml`
})
