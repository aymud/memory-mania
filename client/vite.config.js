import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

export default defineConfig({
    plugins: [
        react(),
        istanbul({
            cypress: true,
            requireEnv: false
        })
    ]
});
