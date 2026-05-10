import { app } from "./app.js"
import { connectMongo } from "./db/index.js"

async function bootstrap() {
  try {
    //await connectMongo()

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