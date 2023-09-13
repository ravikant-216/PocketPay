export default {
  transform: {
    '.+\\.(css|scss|png|jpg|svg|webp|gif)$': 'jest-transform-stub',
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['node_modules', 'jest-test-results.json'],
  testPathIgnorePatterns: [
    'src/pages/',
    'src/components/organisms/RecipientDetails/',
    'src/components/organisms/LoginForm/',
  ],
}
