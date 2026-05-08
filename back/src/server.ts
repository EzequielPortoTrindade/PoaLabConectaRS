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
//import { connectDB } from "./database/mongo.js"
//import { connectDB } from "./database/postgre.js"

const app = fastify({
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

app.get("/", async () => {
  return { hello: "world" }
})

async function bootstrap() {
  try {
    // await connectDB()

    await app.listen({
      port: 3333,
      host: "0.0.0.0",
    })

    console.log("Server running")
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

bootstrap()