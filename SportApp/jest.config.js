module.exports = {
    preset: 'jest-expo',
    setupFilesAfterEnv: ['@testing-library/react-native/cleanup-after-each'],
    transformIgnorePatterns: [
      'node_modules/(?!(react-native|@react-native|@react-navigation|expo(nent)?|@expo(nent)?|expo-router)/)',
    ],
  };
  