/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/.well-known/farcaster.json',
        destination: 'https://api.farcaster.xyz/miniapps/hosted-manifest/019a7b3c-e26c-3027-1431-2187ecab6536',
        permanent: false
      }
    ]
  }
}

module.exports = nextConfig
