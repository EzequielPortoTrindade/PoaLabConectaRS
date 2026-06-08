import fastify, { FastifyInstance } from "fastify";
import jwt from "@fastify/jwt";
import cors from "@fastify/cors"

import { userRoutes } from "./routes/user.route.js";
import { localRoutes } from "./routes/local.route.js";
import { escolaRoutes } from "./routes/school.route.js";
import { itemConsumoRoutes } from "./routes/consumo.route.js";
import { itemCapitalRoutes } from "./routes/capital.route.js";
import { fornecedorRoutes } from "./routes/supplier.route.js";
import { compraRoutes } from "./routes/purchase.route.js";
import { saidaRoutes } from "./routes/log.route.js";

const app: FastifyInstance = fastify({ logger: false });

app.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
})

app.register(jwt, {
    secret: process.env.JWT_SECRET || "supersecret"
});

// ROTAS
app.register(userRoutes, { prefix: "/users" });
app.register(localRoutes, { prefix: "/local" });
app.register(escolaRoutes, { prefix: "/escolas" });
app.register(itemConsumoRoutes, { prefix: "/consumo" });
app.register(itemCapitalRoutes, { prefix: "/capital" });
app.register(fornecedorRoutes, { prefix: "/fornecedores" });
app.register(compraRoutes, { prefix: "/compras" });
app.register(saidaRoutes, { prefix: "/saidas" });

app.listen(
    { port: 3100 },
    () => console.log("Server is running on port 3100")
);