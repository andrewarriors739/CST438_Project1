// Global mocks for Jest testing

// Create a global mock function that can be accessed in tests
global.mockRouterPush = jest.fn();
global.mockUseLocalSearchParams = jest.fn(() => ({
  teamName: 'Test Team',
  logo: 'https://example.com/logo.png'
}));

// Mock expo-router globally
jest.mock('expo-router', () => ({
  router: {
    push: global.mockRouterPush,
    replace: jest.fn(),
    back: jest.fn(),
  },
  useLocalSearchParams: global.mockUseLocalSearchParams,
  useRouter: jest.fn(() => ({
    push: global.mockRouterPush,
    replace: jest.fn(),
    back: jest.fn(),
  })),
}));

// Mock React Native components that cause issues
jest.mock('react-native/Libraries/Utilities/Platform', () => ({
  OS: 'ios',
  select: () => null,
}));

// Silence console warnings in tests
const originalConsole = global.console;
global.console = {
  ...originalConsole,
  warn: jest.fn(),
  error: jest.fn(),
};
