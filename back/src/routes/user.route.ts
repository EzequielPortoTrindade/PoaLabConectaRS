import { FastifyInstance } from "fastify"
import { UserUseCase } from "../usecases/user.usecase.js"
import { UserCreate } from "../interfaces/user.interface.js"
import { UserRepoPrisma } from "../repositories/user.repository.js"

export async function userRoutes(fastify: FastifyInstance) {
    const userRepo = new UserRepoPrisma()
    const userUseCase = new UserUseCase(userRepo)

    // POST - Criar usuário (público - liberado pelo hook global do server.ts)
    fastify.post<{ Body: UserCreate }>("/", async (req, reply) => {
        const { nome, email, senha, tipo, id_escola } = req.body

        try {
            const data = await userUseCase.create({
                nome,
                email,
                senha,
                tipo,
                id_escola
            })

            return reply.status(201).send(data)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro interno"

            if (message === "User already exists") {
                return reply.status(409).send({ message })
            }

            return reply.status(500).send({ message })
        }
    })

    // LOGIN (público - cria o Cookie HTTPOnly blindado)
    fastify.post("/login", async (req, reply) => {
        const { email } = req.body as any

        // 1. Gera o token JWT com os dados que você precisa no payload
        const token = fastify.jwt.sign({ email })

        // 2. Envia o token trancado em um Cookie HTTPOnly
        return reply
            .setCookie("token", token, {
                path: "/",
                secure: false, // Mude para 'true' quando subir para produção (HTTPS)
                httpOnly: true, // Bloqueia o acesso via JavaScript no frontend (Adeus XSS!)
                sameSite: "lax",
                maxAge: 3600 * 24 // Expira em 1 dia
            })
            .send({ 
                message: "Login efetuado com sucesso!",
                user: { email } // Retorna os dados do usuário se o front precisar, mas sem o token exposto
            })
    })

    // LOGOUT (Rota bônus importante para limpar o cookie)
    fastify.post("/logout", async (req, reply) => {
        return reply
            .clearCookie("token", { path: "/" })
            .send({ message: "Logout efetuado com sucesso!" })
    })

    // DELETE - protegido (O hook do server.ts valida o token automaticamente)
    fastify.delete<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id)

            const deletedUser = await userUseCase.delete(id)

            return reply.status(200).send(deletedUser)
        } catch (error) {
            const message = error instanceof Error ? error.message : "Erro"

            return reply
                .status(message === "User not found" ? 404 : 500)
                .send({ message })
        }
    })

    // GET BY ID - protegido
    fastify.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
        try {
            const id = Number(req.params.id)

            if (isNaN(id)) {
                return reply.status(400).send({ message: "ID inválido" })
            }

            const user = await userUseCase.findById(id)

            if (!user) {
                return reply.status(404).send({ message: "Usuário não encontrado" })
            }

            return reply.status(200).send(user)
        } catch {
            return reply.status(500).send({ message: "Erro ao buscar usuário" })
        }
    })

    // GET BY EMAIL - protegido
    fastify.get<{ Params: { email: string } }>("/email/:email", async (req, reply) => {
        try {
            const { email } = req.params

            const user = await userUseCase.findByEmail(email)

            if (!user) {
                return reply.status(404).send({ message: "Usuário não encontrado" })
            }

            return reply.status(200).send(user)
        } catch {
            return reply.status(500).send({ message: "Erro ao buscar usuário" })
        }
    })
}