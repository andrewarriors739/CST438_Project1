module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?|expo-router|expo-modules-core)/)',
    ],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1',
    },
    collectCoverageFrom: [
      'components/**/*.{js,jsx}',
      'app/**/*.{js,jsx,ts,tsx}',
      '!**/*.d.ts',
    ],
  };
  