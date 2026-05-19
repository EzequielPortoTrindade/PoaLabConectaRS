import { fastify, FastifyInstance } from "fastify"
import jwt from "@fastify/jwt"
import { userRoutes } from "./routes/user.route.js"
import { localRoutes } from "./routes/local.route.js"

const app: FastifyInstance =  fastify({ logger: false });

app.register(jwt, {
    secret: process.env.JWT_SECRET || "supersecret"
});

app.register(userRoutes, {
    prefix: '/users',
});

app.listen({
    port: 3100,
},
() => console.log("Server is running on port 3100"),
);