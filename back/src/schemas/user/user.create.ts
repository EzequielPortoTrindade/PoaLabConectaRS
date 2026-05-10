import { z } from "zod"

export const createUserSchema = z.object({
  nome: z.string().min(3),
  email: z.email(),
  password: z.string().min(6),
  tipo: z.enum(["ADMIN", "USUARIO"]),
  id_escola: z.number().optional(),
})