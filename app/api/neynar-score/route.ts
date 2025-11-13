import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const fid = searchParams.get('fid')

  if (!fid) {
    return NextResponse.json({ error: 'Missing fid' }, { status: 400 })
  }

  // TODO: call api Neynar với fid
  // ví dụ:
  // const res = await fetch('https://api.neynar.com/v2/user/...', {
  //   headers: { 'api_key': process.env.NEYNAR_API_KEY as string }
  // })
  // const data = await res.json()

  const mock = {
    fid,
    score: 8420,
    level: 'Diamond',
    castsLast30d: 123,
    reactionsLast30d: 456
  }

  return NextResponse.json(mock)
}
