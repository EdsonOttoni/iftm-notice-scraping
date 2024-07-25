import { FastifyInstance } from "fastify"

import { getCompetition } from "./get-competition.ts"

export async function noticeRoutes(app: FastifyInstance) {
  app.register(getCompetition)
}
