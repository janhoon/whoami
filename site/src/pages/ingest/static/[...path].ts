import type { APIRoute } from 'astro'

export const GET: APIRoute = async ({ params, request }) => {
  const path = params.path ?? ''
  const url = new URL(request.url)
  const targetUrl = `https://eu-assets.i.posthog.com/static/${path}${url.search}`

  const res = await fetch(targetUrl, {
    headers: { 'User-Agent': request.headers.get('User-Agent') ?? '' },
  })

  return new Response(res.body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('Content-Type') ?? 'application/javascript',
      'Cache-Control': res.headers.get('Cache-Control') ?? 'public, max-age=86400',
    },
  })
}
