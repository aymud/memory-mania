import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import istanbul from 'vite-plugin-istanbul';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        istanbul({
            // Other options...
            forceBuildInstrumentation: true // Ensure instrumentation during production build
        })
    ]
});
