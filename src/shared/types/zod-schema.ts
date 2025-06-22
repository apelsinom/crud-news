import { z } from 'zod'

export const schema = z.object({
  title: z.string().trim().nonempty('Title is required').max(100, 'Max 100 characters'),
  content: z.string().trim().nonempty('Content is required').max(1000, 'Max 1000 characters'),
})

export type FormData = z.infer<typeof schema>
