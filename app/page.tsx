'use client'

import { useState } from 'react'

export default function Home() {
  const [fid, setFid] = useState('')
  const [scoreResult, setScoreResult] = useState<string | null>(null)

  const [txHash, setTxHash] = useState('')
  const [txResult, setTxResult] = useState<string | null>(null)

  const [address, setAddress] = useState('')
  const [volumeResult, setVolumeResult] = useState<string | null>(null)

  async function handleCheckScore() {
    try {
      setScoreResult('Đang xử lý...')
      const res = await fetch(`/api/neynar-score?fid=${encodeURIComponent(fid)}`)
      const data = await res.json()
      setScoreResult(JSON.stringify(data, null, 2))
    } catch (e) {
      setScoreResult('Lỗi khi gọi api neynar')
    }
  }

  async function handleCheckTx() {
    try {
      setTxResult('Đang xử lý...')
      const res = await fetch(`/api/check-tx?hash=${encodeURIComponent(txHash)}`)
      const data = await res.json()
      setTxResult(JSON.stringify(data, null, 2))
    } catch (e) {
      setTxResult('Lỗi khi gọi api check tx')
    }
  }

  async function handleCheckVolume() {
    try {
      setVolumeResult('Đang xử lý...')
      const res = await fetch(
        `/api/check-volume?address=${encodeURIComponent(address)}`
      )
      const data = await res.json()
      setVolumeResult(JSON.stringify(data, null, 2))
    } catch (e) {
      setVolumeResult('Lỗi khi gọi api check volume')
    }
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        background:
          'radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 55%), radial-gradient(circle at bottom, rgba(59,130,246,0.2), #020617)'
      }}
    >
      {/* Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem',
          maxWidth: 1100,
          margin: '0 auto',
          color: 'white'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
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
            <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
              Base Onchain Point
            </h1>
            <p
              style={{
                marginTop: 4,
                color: 'rgba(148,163,184,1)',
                fontSize: '0.9rem'
              }}
            >
              Grow, raid và rise cùng cộng đồng onchain trên Base
            </p>
          </div>
        </div>

        <a
          href="https://warpcast.com/~/compose?text=Check+out+this+app"
          style={{
            padding: '0.6rem 1.2rem',
            borderRadius: 999,
            border: '1px solid rgba(148,163,184,0.4)',
            fontSize: '0.9rem',
            textDecoration: 'none',
            color: 'white',
            background:
              'linear-gradient(135deg, rgba(56,189,248,0.2), rgba(59,130,246,0.3))',
            backdropFilter: 'blur(8px)'
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
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1.6fr)',
          gap: '2rem',
          alignItems: 'center'
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '2.2rem',
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.2
            }}
          >
            Dashboard onchain dành cho cộng đồng Base
          </h2>
          <p
            style={{
              marginTop: '1rem',
              color: 'rgba(148,163,184,1)',
              fontSize: '1rem'
            }}
          >
            Theo dõi điểm Neynar, trạng thái giao dịch và volume onchain của bạn
            trên Base để tối ưu chiến dịch cộng đồng, chiến dịch quest và
            hoạt động raid.
          </p>

          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.75rem',
              fontSize: '0.85rem',
              color: 'rgba(148,163,184,1)'
            }}
          >
            <span
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.4)',
                backgroundColor: 'rgba(15,23,42,0.8)'
              }}
            >
              Neynar score realtime
            </span>
            <span
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.4)',
                backgroundColor: 'rgba(15,23,42,0.8)'
              }}
            >
              Check tx trên Base
            </span>
            <span
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 999,
                border: '1px solid rgba(148,163,184,0.4)',
                backgroundColor: 'rgba(15,23,42,0.8)'
              }}
            >
              Volume theo ví hoặc contract
            </span>
          </div>
        </div>

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
            <span>Tổng quan ví</span>
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
              <div style={{ fontSize: '0.85rem', color: 'rgba(148,163,184,1)' }}>
                Volume 30 ngày
              </div>
              <div style={{ fontSize: '1.6rem', fontWeight: 600 }}>
                12,4 k USD
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
              Neynar score mẫu 8 420
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
              Ví dụ
              0x1234...abcd
            </span>
            <span style={{ color: 'rgba(148,163,184,1)' }}>
              Tx gần nhất
              0x9f3c...e890
            </span>
          </div>
        </div>
      </section>

      {/* Feature grid */}
      <section
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {/* Neynar score */}
        <div
          style={{
            borderRadius: 20,
            padding: '1.25rem',
            backgroundColor: 'rgba(15,23,42,0.96)',
            border: '1px solid rgba(51,65,85,1)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            Check Neynar score
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(148,163,184,1)'
            }}
          >
            Nhập fid Farcaster hoặc id user mà bạn dùng cho chiến dịch, hệ thống
            sẽ trả về điểm Neynar và các thông số liên quan.
          </p>

          <input
            value={fid}
            onChange={e => setFid(e.target.value)}
            placeholder="Ví dụ 301818"
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem',
              borderRadius: 12,
              border: '1px solid rgba(51,65,85,1)',
              backgroundColor: 'rgba(15,23,42,0.9)',
              color: 'white',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <button
            onClick={handleCheckScore}
            disabled={!fid}
            style={{
              marginTop: '0.25rem',
              padding: '0.55rem 0.9rem',
              borderRadius: 999,
              border: 'none',
              fontSize: '0.9rem',
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
                marginTop: '0.5rem',
                maxHeight: 180,
                overflow: 'auto',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(15,23,42,1)',
                borderRadius: 12,
                padding: '0.6rem',
                border: '1px solid rgba(30,41,59,1)',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {scoreResult}
            </pre>
          )}
        </div>

        {/* Check tx */}
        <div
          style={{
            borderRadius: 20,
            padding: '1.25rem',
            backgroundColor: 'rgba(15,23,42,0.96)',
            border: '1px solid rgba(51,65,85,1)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            Check transaction
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(148,163,184,1)'
            }}
          >
            Dán tx hash trên Base để kiểm tra trạng thái, gas đã dùng và thời
            gian confirm.
          </p>

          <input
            value={txHash}
            onChange={e => setTxHash(e.target.value)}
            placeholder="Tx hash trên Base"
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem',
              borderRadius: 12,
              border: '1px solid rgba(51,65,85,1)',
              backgroundColor: 'rgba(15,23,42,0.9)',
              color: 'white',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <button
            onClick={handleCheckTx}
            disabled={!txHash}
            style={{
              marginTop: '0.25rem',
              padding: '0.55rem 0.9rem',
              borderRadius: 999,
              border: 'none',
              fontSize: '0.9rem',
              cursor: txHash ? 'pointer' : 'not-allowed',
              opacity: txHash ? 1 : 0.5,
              background:
                'linear-gradient(135deg, rgba(250,204,21,0.9), rgba(248,113,113,1))',
              color: 'black'
            }}
          >
            Check tx
          </button>

          {txResult && (
            <pre
              style={{
                marginTop: '0.5rem',
                maxHeight: 180,
                overflow: 'auto',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(15,23,42,1)',
                borderRadius: 12,
                padding: '0.6rem',
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
            padding: '1.25rem',
            backgroundColor: 'rgba(15,23,42,0.96)',
            border: '1px solid rgba(51,65,85,1)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}
        >
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>
            Check volume
          </h3>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'rgba(148,163,184,1)'
            }}
          >
            Nhập ví hoặc contract address để xem tổng volume giao dịch trong
            khoảng thời gian bạn định nghĩa.
          </p>

          <input
            value={address}
            onChange={e => setAddress(e.target.value)}
            placeholder="Ví dụ 0xabc...def"
            style={{
              width: '100%',
              padding: '0.6rem 0.8rem',
              borderRadius: 12,
              border: '1px solid rgba(51,65,85,1)',
              backgroundColor: 'rgba(15,23,42,0.9)',
              color: 'white',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />

          <button
            onClick={handleCheckVolume}
            disabled={!address}
            style={{
              marginTop: '0.25rem',
              padding: '0.55rem 0.9rem',
              borderRadius: 999,
              border: 'none',
              fontSize: '0.9rem',
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
                marginTop: '0.5rem',
                maxHeight: 180,
                overflow: 'auto',
                fontSize: '0.75rem',
                backgroundColor: 'rgba(15,23,42,1)',
                borderRadius: 12,
                padding: '0.6rem',
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
    </main>
  )
}
