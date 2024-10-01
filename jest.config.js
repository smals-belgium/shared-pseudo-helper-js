/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testMatch: [
    "<rootDir>/test/**/*.spec.ts"
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup-jest.ts'],
  transform: {
    '^.+\\.ts?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  modulePathIgnorePatterns: [
    'dist'
  ]
};

