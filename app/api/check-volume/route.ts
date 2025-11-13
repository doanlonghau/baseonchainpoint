import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const address = searchParams.get('address')

  if (!address) {
    return NextResponse.json(
      { error: 'Missing address' },
      { status: 400 }
    )
  }

  // TODO: logic tính volume
  // tùy bạn chọn nguồn
  // - tự index onchain
  // - gọi api dexscreener, basescan, dune, v.v.

  const mock = {
    address,
    chain: 'Base',
    volume24hUsd: 1234.56,
    volume7dUsd: 9876.54,
    txCount24h: 42
  }

  return NextResponse.json(mock)
}
