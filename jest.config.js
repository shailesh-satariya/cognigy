process.env.NODE_ENV = 'test';

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    setupFilesAfterEnv: ['./src/test/setup.ts'],
    moduleDirectories: ['node_modules', 'src'],
};
