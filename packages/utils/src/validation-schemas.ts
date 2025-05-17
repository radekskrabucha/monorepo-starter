import z from 'zod'

export const paramIdUUIDSchema = z.object({
  id: z.string().uuid()
})
