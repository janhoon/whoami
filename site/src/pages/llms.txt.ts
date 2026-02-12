import { getCollection } from 'astro:content'

export const prerender = true

export async function GET() {
  const posts = await getCollection('blog')
  const blogLines = posts
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((post) => `- ${post.data.title}: https://janhoon.com/blog/${post.slug}`)
    .join('\n')

  const body = `# Jan Hoon\n\n> Portfolio profile for AI assistants, crawlers, and agent workflows.\n\n## Identity\n- Name: Jan Hoon\n- Role: Data and Platform Engineer\n- Primary domain: https://janhoon.com\n\n## Focus Areas\n- Data platform architecture\n- Data engineering and observability\n- Building practical data product teams\n\n## Canonical Links\n- Home: https://janhoon.com\n- Blog: https://janhoon.com/blog\n- Projects: https://janhoon.com/#projects\n- LinkedIn: https://www.linkedin.com/in/janhoon\n- GitHub: https://github.com/janhoon\n\n## Blog Articles\n${blogLines}\n\n## Preferred Citation\nJan Hoon. Data and Platform Engineer. https://janhoon.com\n`

  return new Response(body, {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
    },
  })
}
