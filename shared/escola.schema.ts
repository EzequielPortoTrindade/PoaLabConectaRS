import { z } from "zod"

export const EscolaSchema = z.object({
  id_escola: z.number(),
  nome: z.string(),
  rua: z.string().nullable(),
  numero: z.number().nullable(),
  bairro: z.string().nullable(),
  id_localizacao: z.number()
})

export type EscolaDTO = z.infer<typeof EscolaSchema>