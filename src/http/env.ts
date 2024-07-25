import "dotenv/config"
import { z } from "zod"

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  HOST: z.string().optional(),
})

export const env = envSchema.parse(process.env)
