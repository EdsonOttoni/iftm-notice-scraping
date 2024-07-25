import Fastify from "fastify"
import { env } from "./env.ts"
import { routes } from "./routes/index.ts"
import fastifySwagger from "@fastify/swagger"
import scalarFastifyReference from "@scalar/fastify-api-reference"
import {
  jsonSchemaTransform,

} from "fastify-type-provider-zod"

const app = Fastify()

// Swagger
app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Lab Web API",
      description: "Backend do Lab Web",
      version: "1.0.0",
    },
    servers: [],
  },
  transform: jsonSchemaTransform,
})

app.register(scalarFastifyReference, {
  routePrefix: "/docs",
  configuration: {
    theme: "purple",
  },
})

// declare routes
app.register( routes, {prefix: '/'})

// Run the server!
app
  .listen({ port: env.PORT, host: env.HOST })
  .then(address => {
    console.log(address)
    console.log(`Server listening on http://localhost:${env.PORT}`)
    console.log(`Docs on http://localhost:${env.PORT}/docs`)
  })
  .catch(err => {
    app.log.error(err)
    process.exit(1)
  })
