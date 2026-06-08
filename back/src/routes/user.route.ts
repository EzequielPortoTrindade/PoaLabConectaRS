import { FastifyInstance } from "fastify"
import { UserUseCase } from "../usecases/user.usecase.js"
import { UserCreate } from "../interfaces/user.interface.js"
import { UserRepoPrisma } from "../repositories/user.repository.js"

export async function userRoutes(fastify: FastifyInstance) {
    const userRepo = new UserRepoPrisma()
    const userUseCase = new UserUseCase(userRepo)

    // POST - Criar usuário (público)
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

    // LOGIN (público)
    fastify.post("/login", async (req, reply) => {
        const { email } = req.body as any

        const token = fastify.jwt.sign({
            email
        })

        return reply.send({ token })
    })

    // DELETE - protegido
    fastify.delete<{ Params: { id: string } }>(
        "/:id",
        {
            preHandler: async (req, reply) => {
                try {
                    await req.jwtVerify()
                } catch {
                    return reply.status(401).send({
                        message: "Unauthorized"
                    })
                }
            }
        },
        async (req, reply) => {
            try {
                const id = Number(req.params.id)

                const deletedUser = await userUseCase.delete(id)

                return reply.status(200).send(deletedUser)
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : "Erro"

                return reply
                    .status(message === "User not found" ? 404 : 500)
                    .send({ message })
            }
        }
    )

    // GET BY ID - protegido
    fastify.get<{ Params: { id: string } }>(
        "/:id",
        {
            preHandler: async (req, reply) => {
                try {
                    await req.jwtVerify()
                } catch {
                    return reply.status(401).send({
                        message: "Unauthorized"
                    })
                }
            }
        },
        async (req, reply) => {
            try {
                const id = Number(req.params.id)

                if (isNaN(id)) {
                    return reply.status(400).send({
                        message: "ID inválido"
                    })
                }

                const user = await userUseCase.findById(id)

                if (!user) {
                    return reply.status(404).send({
                        message: "Usuário não encontrado"
                    })
                }

                return reply.status(200).send(user)
            } catch {
                return reply.status(500).send({
                    message: "Erro ao buscar usuário"
                })
            }
        }
    )

    // GET BY EMAIL - protegido
    fastify.get<{ Params: { email: string } }>(
        "/email/:email",
        {
            preHandler: async (req, reply) => {
                try {
                    await req.jwtVerify()
                } catch {
                    return reply.status(401).send({
                        message: "Unauthorized"
                    })
                }
            }
        },
        async (req, reply) => {
            try {
                const { email } = req.params

                const user = await userUseCase.findByEmail(email)

                if (!user) {
                    return reply.status(404).send({
                        message: "Usuário não encontrado"
                    })
                }

                return reply.status(200).send(user)
            } catch {
                return reply.status(500).send({
                    message: "Erro ao buscar usuário"
                })
            }
        }
    )
}