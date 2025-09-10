import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import HomePage from '../HomePage';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper'); // silence warnings

// mock fetch so we don’t call real API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ events: [{ idEvent: '1', strEvent: 'Mock Game', dateEvent: '2025-09-10', strTime: '19:00' }] }),
  })
);

describe('HomePage', () => {
  it('renders upcoming basketball games', async () => {
    const { getByText } = render(<HomePage navigation={{ setOptions: jest.fn(), openDrawer: jest.fn() }} />);
    
    await waitFor(() => {
      expect(getByText('Upcoming Basketball Games')).toBeTruthy();
      expect(getByText('Mock Game')).toBeTruthy();
    });
  });
});
