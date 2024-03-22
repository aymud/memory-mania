const { defineConfig } = require('cypress');
const wp = require('@cypress/webpack-preprocessor');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'http://localhost:5173',
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);

            on('file:preprocessor', require('@cypress/code-coverage/use-babelrc'));

            const options = {
                webpackOptions: {
                    resolve: {
                        extensions: ['.ts', '.tsx', '.js']
                    },
                    module: {
                        rules: [
                            {
                                test: /\.tsx?$/,
                                loader: 'ts-loader',
                                options: { transpileOnly: true }
                            }
                        ]
                    }
                }
            };
            on('file:preprocessor', wp(options));

            return config;
        }
    }
});
