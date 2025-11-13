import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const fid = searchParams.get('fid')

  if (!fid) {
    return NextResponse.json({ error: 'Missing fid' }, { status: 400 })
  }

  if (!process.env.NEYNAR_API_KEY) {
    return NextResponse.json(
      { error: 'Missing NEYNAR_API_KEY' },
      { status: 500 }
    )
  }

  try {
    const res = await fetch(
      `https://api.neynar.com/v2/farcaster/user/bulk?fids=${fid}`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
          api_key: process.env.NEYNAR_API_KEY
        },
        // tránh cache cứng nếu deploy vercel
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        {
          error: 'Neynar API error',
          status: res.status,
          body: text
        },
        { status: 500 }
      )
    }

    const data = await res.json()
    const user = data.users?.[0]

    if (!user) {
      return NextResponse.json(
        { error: 'User not found for this fid' },
        { status: 404 }
      )
    }

    const result = {
      fid,
      username: user.username ?? null,
      displayName: user.display_name ?? null,
      followerCount: user.follower_count ?? null,
      followingCount: user.following_count ?? null,
      neynarScore:
        user.viewer_context?.relevance_score ??
        user.influence_score ??
        null,
      pfpUrl: user.pfp_url ?? null,
      custodyAddress: user.custody_address ?? null,
      verifications: user.verifications ?? [],
      powerBadges: user.power_badges ?? [],
      raw: user
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Server error', details: String(error) },
      { status: 500 }
    )
  }
}
