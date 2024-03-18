import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    testEnvironment: 'jsdom',
    collectCoverage: true,
    coverageDirectory: 'jest-coverage',
    coverageReporters: ['text', 'cobertura']
};

export default config;
