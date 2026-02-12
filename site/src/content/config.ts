import { defineCollection, z } from 'astro:content'

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    author: z
      .object({
        name: z.string(),
        url: z.string().url(),
      })
      .optional(),
    description: z.string().optional(),
  }),
})

export const collections = {
  blog,
}
