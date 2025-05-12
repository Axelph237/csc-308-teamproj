import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url';
import { dirname, resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss()
    ],
    resolve: {
        alias: {
            '@src': resolve(dirname(fileURLToPath(import.meta.url)), 'src'),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8001',
                changeOrigin: true,
                secure: false,
                cookieDomainRewrite: 'localhost',
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
