import fastify, { FastifyInstance } from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors"
import cookie from "@fastify/cookie";
import { userRoutes } from "./routes/user.route.js";
import { localRoutes } from "./routes/local.route.js";
import { escolaRoutes } from "./routes/school.route.js";
import { itemConsumoRoutes } from "./routes/consumo.route.js";
import { itemCapitalRoutes } from "./routes/capital.route.js";
import { fornecedorRoutes } from "./routes/supplier.route.js";
import { compraRoutes } from "./routes/purchase.route.js";
import { saidaRoutes } from "./routes/log.route.js";

const app: FastifyInstance = fastify({ logger: false });
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const DISABLE_AUTH = process.env.DISABLE_AUTH === "true"

app.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
})

if (!COOKIE_SECRET) {
  throw new Error("COOKIE_SECRET não definido");
}
app.register(cookie, {
  secret: COOKIE_SECRET,
});

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido");
}

if (!DISABLE_AUTH) {
  app.register(jwt, {
    secret: JWT_SECRET,
    cookie: {
      cookieName: "token",
      signed: false,
    },
  })
}

// ROTAS
app.register(userRoutes, { prefix: "/users" });
app.register(localRoutes, { prefix: "/local" });
app.register(escolaRoutes, { prefix: "/escolas" });
app.register(itemConsumoRoutes, { prefix: "/consumo" });
app.register(itemCapitalRoutes, { prefix: "/capital" });
app.register(fornecedorRoutes, { prefix: "/fornecedores" });
app.register(compraRoutes, { prefix: "/compras" });
app.register(saidaRoutes, { prefix: "/saidas" });

app.addHook("preHandler", async (req, reply) => {
  console.log("HOOK:", req.method, req.url)
  if (DISABLE_AUTH) {
    return 
  }

  const publicRoutes = ["/users/login", "/users"]

  const route = req.url.split("?")[0]

  if (route && publicRoutes.includes(route)) {
    return
  }

  try {
    await req.jwtVerify()
  } catch {
    return reply.status(401).send({ message: "Token inválido ou ausente" })
  }
})
// app.addHook("onRequest", async (req) => {
//   console.log("REQ:", req.method, req.url)
// })

app.listen(
    { port: 3100, host: "0.0.0.0" },
    () => console.log("Server is running on port 3100")
);