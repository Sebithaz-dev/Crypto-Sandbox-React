import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(() => {

  const isGithubPages = process.env.DEPLOY === "gh-pages";

  return {
    plugins: [react()],
    base: isGithubPages ? '/Crypto-Sandbox-React/' : '/'
  }

})
