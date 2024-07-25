import { FastifyInstance } from "fastify";
import { noticeRoutes } from "./notices/index.ts";

export async function routes(app:FastifyInstance) {
  app.register(noticeRoutes)
}
