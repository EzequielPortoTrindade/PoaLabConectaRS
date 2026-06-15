import { z } from "zod"

export const LocalizacaoSchema = z.object({
  id_localizacao: z.number(),
  nome_cidade: z.string(),
  uf: z.string()
})

export type LocalizacaoDTO = z.infer<typeof LocalizacaoSchema>