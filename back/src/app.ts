import { fastify } from "fastify"
import cors from "@fastify/cors"

import {
  serializerCompiler,
  validatorCompiler,
  jsonSchemaTransform,
  type ZodTypeProvider,
} from "fastify-type-provider-zod"

import { fastifySwagger } from "@fastify/swagger"
import ScalarApiReference from "@scalar/fastify-api-reference"

import { usersRoutes } from "./routes/user.routes.js"

export const app = fastify({
  logger: true,
}).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: true,
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Inventory Manager API",
      description: "API for management of items",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform,
})

app.register(ScalarApiReference, {
  routePrefix: "/docs",
  configuration: {
    url: "/documentation/json",
  },
})

app.register(usersRoutes)

app.get("/", async () => {
  return { hello: "world" }
})