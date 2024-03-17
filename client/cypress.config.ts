import { defineConfig } from 'cypress';

export default defineConfig({
    env: {
        codeCoverage: {
            exclude: 'cypress/**/*.*'
        }
    },
    e2e: {
        baseUrl: 'http://localhost:5173',
        setupNodeEvents(on, config) {
            return config;
        }
    }
});
