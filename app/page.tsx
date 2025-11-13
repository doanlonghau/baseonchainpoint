export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem'
      }}
    >
      <img
        src="/icon.png"
        alt="Base Onchain Point"
        style={{ width: 96, height: 96, borderRadius: 24 }}
      />
      <h1>Base Onchain Point</h1>
      <p>Grow, Raid and Rise in Stoke Fire</p>
      <a
        href="https://warpcast.com/~/compose?text=Check+out+this+app"
        style={{
          padding: '0.75rem 1.5rem',
          borderRadius: 999,
          border: '1px solid #ccc',
          textDecoration: 'none'
        }}
      >
        Open mini app
      </a>
    </main>
  )
}
