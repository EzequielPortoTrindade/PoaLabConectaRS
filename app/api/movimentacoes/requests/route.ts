import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const REQUESTS_FILE = path.join(DATA_DIR, 'mov_requests.json')
const STOCK_FILE = path.join(DATA_DIR, 'stock.json')

async function ensureDataFiles() {
  try {
    await fs.access(DATA_DIR)
  } catch (e) {
    await fs.mkdir(DATA_DIR)
  }
  try {
    await fs.access(REQUESTS_FILE)
  } catch (e) {
    await fs.writeFile(REQUESTS_FILE, '[]', 'utf8')
  }
  try {
    await fs.access(STOCK_FILE)
  } catch (e) {
    // Initialize stock from mock-data
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { itensConsumo } = require('@/lib/mock-data')
      const stockMap = itensConsumo.reduce((acc, item) => {
        acc[item.id_item_consumo] = item.quantidade || 0
        return acc
      }, {})
      await fs.writeFile(STOCK_FILE, JSON.stringify(stockMap, null, 2), 'utf8')
    } catch (er) {
      await fs.writeFile(STOCK_FILE, '{}', 'utf8')
    }
  }
}

export async function POST(req: Request) {
  await ensureDataFiles()
  const body = await req.json()

  const capitalItemIds = Array.isArray(body.id_itens_capital)
    ? body.id_itens_capital
    : body.id_item_capital != null
      ? [body.id_item_capital]
      : []

  const patrimonyNumbers = Array.isArray(body.numeros_patrimonio)
    ? body.numeros_patrimonio
    : body.numero_patrimonio != null
      ? [body.numero_patrimonio]
      : []

  const now = new Date().toISOString()
  const request = {
    id: Date.now().toString(),
    tipo: body.tipo || 'saida',
    itemType: body.itemType || 'consumo',
    id_item_consumo: body.id_item_consumo ?? null,
    id_item_capital: body.id_item_capital ?? capitalItemIds[0] ?? null,
    id_itens_capital: capitalItemIds.length > 0 ? capitalItemIds : null,
    numero_patrimonio: body.numero_patrimonio ?? patrimonyNumbers[0] ?? null,
    numeros_patrimonio: patrimonyNumbers.length > 0 ? patrimonyNumbers : null,
    quantidade: body.quantidade ?? null,
    id_escola: body.id_escola ?? null,
    id_usuario: body.id_usuario ?? null,
    observacao: body.observacao ?? null,
    status: 'pending',
    criado_em: now,
  }

  const content = await fs.readFile(REQUESTS_FILE, 'utf8')
  const requests = JSON.parse(content || '[]')
  requests.push(request)
  await fs.writeFile(REQUESTS_FILE, JSON.stringify(requests, null, 2), 'utf8')

  return NextResponse.json({ ok: true, request }, { status: 201 })
}

export async function GET() {
  await ensureDataFiles()
  const content = await fs.readFile(REQUESTS_FILE, 'utf8')
  const requests = JSON.parse(content || '[]')
  return NextResponse.json({ requests })
}
