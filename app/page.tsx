'use client'

import { useEffect, useState } from 'react'
import { sdk } from '@farcaster/miniapp-sdk'

// TODO: replace these with your real GM contract on Base
const GM_CONTRACT_ADDRESS = '0xf227C3d167633182419a1Be8E15e81635Df27636'
const GM_CALL_DATA = '0xc0129d43' // encoded gm() call data

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  // mini app ready (splash)
  useEffect(() => {
    const init = async () => {
      try {
        await sdk.actions.ready()
      } catch (error) {
        console.error('Failed to call sdk.actions.ready', error)
      }
    }

    void init()
  }, [])

  // simple responsive flag
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768)
      }
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [fid, setFid] = useState('')
  const [scoreResult, setScoreResult] = useState<string | null>(null)

  const [txAddress, setTxAddress] = useState('')
  const [txResult, setTxResult] = useState<string | null>(null)

  const [address, setAddress] = useState('')
  const [volumeResult, setVolumeResult] = useState<string | null>(null)

  const [gmStatus, setGmStatus] = useState<string | null>(null)

  async function handleCheckScore() {
    try {
      setScoreResult('Loading...')
      const res = await fetch(`/api/neynar-score?fid=${encodeURIComponent(fid)}`)
      const data = await res.json()
      setScoreResult(JSON.stringify(data, null, 2))
    } catch (e) {
      setScoreResult('Error calling Neynar api')
    }
  }

  async function handleCheckTx() {
    try {
      setTxResult('Loading...')
      const res = await fetch(
        `/api/check-tx?address=${encodeURIComponent(txAddress)}`
      )
      const data = await res.json()
      setTxResult(JSON.stringify(data, null, 2))
    } catch (e) {
      setTxResult('Error calling tx api')
    }
  }

  async function handleCheckVolume() {
    try {
      setVolumeResult('Loading...')
      const res = await fetch(
        `/api/check-volume?address=${encodeURIComponent(address)}`
      )
      const data = await res.json()
      setVolumeResult(JSON.stringify(data, null, 2))
    } catch (e) {
      setVolumeResult('Error calling volume api')
    }
  }

    async function handleGmCheckin() {
    try {
      setGmStatus('Preparing gm transaction...')

      if (!GM_CONTRACT_ADDRESS) {
        setGmStatus('GM contract address is not configured.')
        return
      }

      // get EIP-1193 provider from Mini App SDK
      let provider: any = null
      try {
        provider = sdk.wallet.getEthereumProvider()
      } catch (e) {
        provider = null
      }

      if (!provider || typeof provider.request !== 'function') {
        setGmStatus(
          'Wallet provider is not available. Open this mini app inside Warpcast or the Base app with a connected wallet.'
        )
        return
      }

      const tx = {
        to: GM_CONTRACT_ADDRESS,
        data: GM_CALL_DATA,
        value: '0x0' // no ETH, contract call only
      }

      const txHash = await provider.request({
        method: 'eth_sendTransaction',
        params: [tx]
      })

      setGmStatus(`GM transaction sent: ${txHash}`)
    } catch (error) {
      setGmStatus(`Error sending gm transaction: ${String(error)}`)
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: isMobile ? '1rem' : '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: isMobile ? '1.5rem' : '2rem',
        background:
          'radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 55%), radial-gradient(circle at bottom, rgba(59,130,246,0.2), #020617)'
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          gap: '1rem',
          maxWidth: 1100,
          margin: '0 auto',
          color: 'white'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              width: isMobile ? 40 : 56,
              height: isMobile ? 40 : 56,
              borderRadius: 16,
              overflow: 'hidden',
              backgroundColor: '#020617',
              border: '1px solid rgba(148,163,184,0.4)'
            }}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgJzE3esFDDQJwxXfIEQy-TlsXLnWvlEOyTQ&s"
              alt="Base Onchain Point"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <div>
            <h1
              style={{
                fontSize: isMobile ? '1.1rem' : '1.5rem',
                fontWeight: 600
              }}
            >
              Base Onchain Point
            </h1>
            <p
              style={{
                marginTop: 4,
                color: 'rgba(148,163,184,1)',
                fontSize: '0.8rem',
                maxWidth: isMobile ? '100%' : 320
              }}
            >
              Grow, raid and rise with your onchain Base community
            </p>
          </div>
        </div>

        <a
          href="https://warpcast.com/~/compose?text=Check+out+this+app"
          style={{
            padding: isMobile ? '0.45rem 0.9rem' : '0.6rem 1.2rem',
            borderRadius: 999,
            border: '1px solid rgba(148,163,184,0.4)',
            fontSize: '0.85rem',
            textDecoration: 'none',
            color: 'white',
            background:
              'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(59,130,246,0.3))',
            backdropFilter: 'blur(8px)',
            alignSelf: isMobile ? 'stretch' : 'center',
            textAlign: 'center'
          }}
        >
          Open mini app
        </a>
      </header>

      {/* Hero */}
      <section
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'minmax(0, 2fr) minmax(0, 1.6fr)',
          gap: isMobile ? '1.25rem' : '2rem',
          alignItems: 'center'
        }}
      >
        <div>
          <h2
            style={{
              fontSize: isMobile ? '1.35rem' : '2.2rem',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.25
            }}
          >
            Onchain dashboard for the Base community
          </h2>
          <p
            style={{
              marginTop: '0.75rem',
              color: 'rgba(148,163,184,1)',
              fontSize: '0.85rem'
            }}
          >
            Track Neynar score, total transactions and onchain volume on Base so
            you can optimise quests, community campaigns and raid activity.
          </p>

          <div
            style={{
              marginTop: '1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              fontSize: '0.8rem',
              color: 'rgba(148,163,184,1)'
            }}
          >
            <span
              style={{
                padding: '0.35rem 0.7rem',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.4)',
                backgroundColor: 'rgba(15,23,42,0.8)'
              }}
            >
              Neynar score insights
            </span>
            <span
              style={{
                padding: '0.35rem 0.7rem',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.4)',
                backgroundColor: 'rgba(15,23,42,0.8)'
              }}
            >
              Total tx on Base
            </span>
            <span
              style={{
                padding: '0.35rem 0.7rem',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.4)',
                backgroundColor: 'rgba(15,23,42,0.8)'
              }}
            >
              Volume by wallet or contract
            </span>
          </div>
        </div>

        {!isMobile && (
          <div
            style={{
              borderRadius: 24,
              border: '1px solid rgba(148,163,184,0.4)',
              background:
                'radial-gradient(circle at top, rgba(56,189,248,0.22), rgba(15,23,42,0.96))',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              color: 'white',
              boxShadow: '0 24px 60px rgba(15,23,42,0.9)'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.8rem',
                color: 'rgba(148,163,184,1)'
              }}
            >
              <span>Wallet overview</span>
              <span>Base mainnet</span>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline'
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '0.85rem',
                    color: 'rgba(148,163,184,1)'
                  }}
                >
                  Volume last 30 days
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 600 }}>
                  12.4 k USD
                </div>
              </div>
              <div
                style={{
                  padding: '0.4rem 0.7rem',
                  borderRadius: 999,
                  fontSize: '0.75rem',
                  backgroundColor: 'rgba(22,163,74,0.24)',
                  border: '1px solid rgba(34,197,94,0.6)'
                }}
              >
                Sample Neynar score 8 420
              </div>
            </div>
            <div
              style={{
                borderRadius: 16,
                backgroundColor: 'rgba(15,23,42,0.95)',
                padding: '0.9rem',
                fontSize: '0.8rem',
                border: '1px solid rgba(51,65,85,1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              <span style={{ color: 'rgba(148,163,184,1)' }}>
                Sample wallet
                0x1234...abcd
              </span>
              <span style={{ color: 'rgba(148,163,184,1)' }}>
                Latest tx
                0x9f3c...e890
              </span>
            </div>
          </div>
        )}
      </section>

      {/* Feature grid */}
      <section
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile
            ? '1fr'
            : 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1rem',
          paddingBottom: isMobile ? '0.5rem' : '1rem'
        }}
      >
        {/* Neynar score */}
        <div
          style={{
            borderRadius: 20,
            padding: isMobile ? '1rem' : '1.25rem',
            backgroundColor: 'rgba(15,23,42,0.96)',
            border: '1px solid rgba(51,65,85,1)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>
            Check Neynar score
          </h3>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgba(148,163,184,1)'
            }}
          >
            Enter a Farcaster fid to fetch Neynar score and core user metrics
            for your campaigns.
          </p>

          <input
            value={fid}
            onChange={e => setFid(e.target.value)}
            placeholder="Example 301818"
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem',
              borderRadius: 12,
              border: '1px solid rgba(51,65,85,1)',
              backgroundColor: 'rgba(15,23,42,0.9)',
              color: 'white',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />

          <button
            onClick={handleCheckScore}
            disabled={!fid}
            style={{
              marginTop: '0.25rem',
              padding: '0.5rem 0.85rem',
              borderRadius: 999,
              border: 'none',
              fontSize: '0.85rem',
              cursor: fid ? 'pointer' : 'not-allowed',
              opacity: fid ? 1 : 0.5,
              background:
                'linear-gradient(135deg, rgba(56,189,248,0.9), rgba(59,130,246,1))',
              color: 'white'
            }}
          >
            Check score
          </button>

          {scoreResult && (
            <pre
              style={{
                marginTop: '0.4rem',
                maxHeight: 160,
                overflow: 'auto',
                fontSize: '0.7rem',
                backgroundColor: 'rgba(15,23,42,1)',
                borderRadius: 12,
                padding: '0.5rem',
                border: '1px solid rgba(30,41,59,1)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {scoreResult}
            </pre>
          )}
        </div>

        {/* Check total tx */}
        <div
          style={{
            borderRadius: 20,
            padding: isMobile ? '1rem' : '1.25rem',
            backgroundColor: 'rgba(15,23,42,0.96)',
            border: '1px solid rgba(51,65,85,1)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>
            Check total transactions
          </h3>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgba(148,163,184,1)'
            }}
          >
            Enter a Base wallet or contract address to count the total number of
            transactions on chain.
          </p>

          <input
            value={txAddress}
            onChange={e => setTxAddress(e.target.value)}
            placeholder="Wallet or contract address on Base"
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem',
              borderRadius: 12,
              border: '1px solid rgba(51,65,85,1)',
              backgroundColor: 'rgba(15,23,42,0.9)',
              color: 'white',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />

          <button
            onClick={handleCheckTx}
            disabled={!txAddress}
            style={{
              marginTop: '0.25rem',
              padding: '0.5rem 0.85rem',
              borderRadius: 999,
              border: 'none',
              fontSize: '0.85rem',
              cursor: txAddress ? 'pointer' : 'not-allowed',
              opacity: txAddress ? 1 : 0.5,
              background:
                'linear-gradient(135deg, rgba(250,204,21,0.9), rgba(248,113,113,1))',
              color: 'black'
            }}
          >
            Count transactions
          </button>

          {txResult && (
            <pre
              style={{
                marginTop: '0.4rem',
                maxHeight: 160,
                overflow: 'auto',
                fontSize: '0.7rem',
                backgroundColor: 'rgba(15,23,42,1)',
                borderRadius: 12,
                padding: '0.5rem',
                border: '1px solid rgba(30,41,59,1)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {txResult}
            </pre>
          )}
        </div>

        {/* Check volume */}
        <div
          style={{
            borderRadius: 20,
            padding: isMobile ? '1rem' : '1.25rem',
            backgroundColor: 'rgba(15,23,42,0.96)',
            border: '1px solid rgba(51,65,85,1)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>
            Check volume
          </h3>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgba(148,163,184,1)'
            }}
          >
            Enter a wallet or contract address to see total traded volume over
            your chosen time frame.
          </p>

          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Wallet or contract address on Base"
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem',
              borderRadius: 12,
              border: '1px solid rgba(51,65,85,1)',
              backgroundColor: 'rgba(15,23,42,0.9)',
              color: 'white',
              fontSize: '0.85rem',
              outline: 'none'
            }}
          />

          <button
            onClick={handleCheckVolume}
            disabled={!address}
            style={{
              marginTop: '0.25rem',
              padding: '0.5rem 0.85rem',
              borderRadius: 999,
              border: 'none',
              fontSize: '0.85rem',
              cursor: address ? 'pointer' : 'not-allowed',
              opacity: address ? 1 : 0.5,
              background:
                'linear-gradient(135deg, rgba(52,211,153,0.9), rgba(59,130,246,1))',
              color: 'black'
            }}
          >
            Check volume
          </button>

          {volumeResult && (
            <pre
              style={{
                marginTop: '0.4rem',
                maxHeight: 160,
                overflow: 'auto',
                fontSize: '0.7rem',
                backgroundColor: 'rgba(15,23,42,1)',
                borderRadius: 12,
                padding: '0.5rem',
                border: '1px solid rgba(30,41,59,1)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {volumeResult}
            </pre>
          )}
        </div>
      </section>

      {/* GM daily checkin */}
      <section
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          marginTop: isMobile ? '0.25rem' : '0.5rem',
          paddingBottom: isMobile ? '0.5rem' : '1.5rem'
        }}
      >
        <div
          style={{
            borderRadius: 20,
            padding: isMobile ? '1rem' : '1.25rem',
            backgroundColor: 'rgba(15,23,42,0.96)',
            border: '1px solid rgba(51,65,85,1)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.7rem'
          }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600 }}>
            GM daily check in
          </h3>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'rgba(148,163,184,1)'
            }}
          >
            Send an onchain gm to your GM contract on Base once a day to track
            streaks and reward active community members.
          </p>

          <button
            onClick={handleGmCheckin}
            style={{
              marginTop: '0.25rem',
              padding: '0.5rem 0.85rem',
              borderRadius: 999,
              border: 'none',
              fontSize: '0.85rem',
              cursor: 'pointer',
              background:
                'linear-gradient(135deg, rgba(129,140,248,0.95), rgba(6,182,212,0.95))',
              color: 'white'
            }}
          >
            Send gm on Base
          </button>

          {gmStatus && (
            <div
              style={{
                marginTop: '0.4rem',
                fontSize: '0.75rem',
                color: 'rgba(148,163,184,1)',
                wordBreak: 'break-word'
              }}
            >
              {gmStatus}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
