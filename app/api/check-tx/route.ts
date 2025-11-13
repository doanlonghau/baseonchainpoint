import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const hash = searchParams.get('hash')

  if (!hash) {
    return NextResponse.json({ error: 'Missing tx hash' }, { status: 400 })
  }

  // TODO: call api BaseScan hoặc node riêng của bạn
  // gợi ý:
  // https://api.basescan.org/api?module=transaction&action=gettxreceiptstatus&txhash=...

  const mock = {
    hash,
    status: 'success',
    confirmations: 128,
    gasUsed: '0.0012',
    timestamp: '2025-01-01T00:00:00Z'
  }

  return NextResponse.json(mock)
}
