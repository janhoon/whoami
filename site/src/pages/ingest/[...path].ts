export const prerender = false

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

  // Read body as ArrayBuffer first — Cloudflare Workers can't reliably stream
  // request.body directly into a fetch call (body may be consumed or unavailable)
  let body: ArrayBuffer | undefined
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    try {
      body = await request.arrayBuffer()
    } catch {
      body = undefined
    }
  }

  const res = await fetch(targetUrl, {
    method: request.method,
    headers,
    body: body && body.byteLength > 0 ? body : undefined,
  })

  // Read response as ArrayBuffer too — avoids streaming issues on the way back
  const responseBody = await res.arrayBuffer()

  return new Response(responseBody, {
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
