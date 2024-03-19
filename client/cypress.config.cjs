const { defineConfig } = require('cypress');

module.exports = defineConfig({
    env: {
        codeCoverage: {
            exclude: ['cypress/**/*.*', 'src/**/*.test.*']
        }
    },
    e2e: {
        baseUrl: 'http://localhost:5173',
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);

            on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

            return config;
        }
    }
});
