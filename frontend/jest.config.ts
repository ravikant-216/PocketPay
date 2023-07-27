export default {
  transform: {
    '.+\\.(css|scss|png|jpg|svg|webp|gif)$': 'jest-transform-stub',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['node_modules', 'jest-test-results.json'],
}
