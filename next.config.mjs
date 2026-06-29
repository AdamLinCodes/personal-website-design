/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export -> ./out, served as plain files by GitHub Pages.
  output: 'export',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
