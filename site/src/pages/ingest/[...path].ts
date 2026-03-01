import type { APIRoute } from 'astro'

const POSTHOG_HOST = 'https://eu.i.posthog.com'

async function proxyToPostHog(request: Request, path: string): Promise<Response> {
  const url = new URL(request.url)
  const targetUrl = `${POSTHOG_HOST}/${path}${url.search}`

  const headers = new Headers()
  // Forward relevant headers — content-type is critical for sendBeacon (pageleave)
  for (const key of ['content-type', 'user-agent', 'x-forwarded-for', 'origin', 'referer']) {
    const val = request.headers.get(key)
    if (val) headers.set(key, val)
  }

  const res = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : undefined,
  })

  return new Response(res.body, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('Content-Type') ?? 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

export const GET: APIRoute = async ({ params, request }) => {
  return proxyToPostHog(request, params.path ?? '')
}

export const POST: APIRoute = async ({ params, request }) => {
  return proxyToPostHog(request, params.path ?? '')
}

export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
