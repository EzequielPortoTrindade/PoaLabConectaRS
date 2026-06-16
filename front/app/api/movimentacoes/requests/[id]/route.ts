import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const REQUESTS_FILE = path.join(DATA_DIR, 'mov_requests.json')
const STOCK_FILE = path.join(DATA_DIR, 'stock.json')

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const body = await req.json()
  const action = body.action
  const adminId = body.adminId ?? null

  // load requests
  const content = await fs.readFile(REQUESTS_FILE, 'utf8')
  const requests = JSON.parse(content || '[]')
  const idx = requests.findIndex((r: any) => r.id === id)
  if (idx === -1) {
    return NextResponse.json({ error: 'not found' }, { status: 404 })
  }

  if (action === 'approve') {
    requests[idx].status = 'approved'
    requests[idx].approved_by = adminId
    requests[idx].approved_at = new Date().toISOString()

    // apply stock change for consumo items
    if (requests[idx].itemType === 'consumo' && requests[idx].id_item_consumo) {
      try {
        const stockRaw = await fs.readFile(STOCK_FILE, 'utf8')
        const stock = JSON.parse(stockRaw || '{}')
        const idItem = requests[idx].id_item_consumo
        const quantidade = Number(requests[idx].quantidade) || 0
        stock[idItem] = Math.max(0, (stock[idItem] || 0) - quantidade)
        await fs.writeFile(STOCK_FILE, JSON.stringify(stock, null, 2), 'utf8')
      } catch (e) {
        // ignore
      }
    }

    await fs.writeFile(REQUESTS_FILE, JSON.stringify(requests, null, 2), 'utf8')
    return NextResponse.json({ ok: true, request: requests[idx] })
  }

  if (action === 'reject') {
    requests[idx].status = 'rejected'
    requests[idx].rejected_by = adminId
    requests[idx].rejected_at = new Date().toISOString()
    await fs.writeFile(REQUESTS_FILE, JSON.stringify(requests, null, 2), 'utf8')
    return NextResponse.json({ ok: true, request: requests[idx] })
  }

  return NextResponse.json({ error: 'invalid action' }, { status: 400 })
}

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const content = await fs.readFile(REQUESTS_FILE, 'utf8')
  const requests = JSON.parse(content || '[]')
  const reqItem = requests.find((r: any) => r.id === id)
  if (!reqItem) return NextResponse.json({ error: 'not found' }, { status: 404 })
  return NextResponse.json({ request: reqItem })
}
