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

  if (!process.env.BASESCAN_API_KEY) {
    return NextResponse.json(
      { error: 'Missing BASESCAN_API_KEY' },
      { status: 500 }
    )
  }

  try {
    const params = new URLSearchParams({
      module: 'account',
      action: 'txlist',
      address,
      startblock: '0',
      endblock: '99999999',
      page: '1',
      offset: '10000',
      sort: 'asc',
      apikey: process.env.BASESCAN_API_KEY
    })

    const res = await fetch(
      `https://api.basescan.org/api?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json'
        },
        cache: 'no-store'
      }
    )

    const data = await res.json()

    if (data.status !== '1' || !Array.isArray(data.result)) {
      return NextResponse.json(
        {
          error: 'Cannot fetch transactions from BaseScan',
          message: data.message,
          result: data.result
        },
        { status: 500 }
      )
    }

    const totalTx = data.result.length

    const response = {
      address,
      chain: 'base',
      totalTransactions: totalTx,
      note:
        'For very active addresses you may need pagination instead of a single page with offset 10000.'
    }

    return NextResponse.json(response)
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error', details: String(error) },
      { status: 500 }
    )
  }
}
