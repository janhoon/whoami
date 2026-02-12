export const prerender = true

export function GET() {
  return new Response(
    `User-agent: *
Allow: /

Sitemap: https://janhoon.com/sitemap.xml`,
    {
      headers: {
        'content-type': 'text/plain; charset=utf-8',
      },
    }
  )
}
