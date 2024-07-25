import { FastifyInstance } from "fastify";

export async function getCompetition(app: FastifyInstance) {
 app.withTypeProvider().get('/competition', async(request, reply) => {
  return reply.send('hello world!!')
 })
}
