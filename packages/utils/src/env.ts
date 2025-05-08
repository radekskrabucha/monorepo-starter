import { z } from 'zod'

export const validateEnv = <T extends z.ZodRawShape>(
  envSchema: z.ZodObject<T>
): z.infer<typeof envSchema> => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables')
      console.error(z.prettifyError(error))
      process.exit(1)
    }

    throw error
  }
}
