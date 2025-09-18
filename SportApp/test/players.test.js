import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import PlayersPage from '../components/players';

// Mock the database functions
jest.mock('../database/database', () => ({
  addFavoritePlayer: jest.fn(),
  isPlayerFavorited: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ player: [] }),
  })
);

describe('PlayersPage Component', () => {
  const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
  };

  it('renders without crashing', () => {
    const { getByPlaceholderText } = render(<PlayersPage navigation={mockNavigation} />);
    expect(getByPlaceholderText('Search players...')).toBeTruthy();
  });

  it('displays search button', () => {
    const { getByText } = render(<PlayersPage navigation={mockNavigation} />);
    expect(getByText('Search')).toBeTruthy();
  });

  it('allows typing in search input', () => {
    const { getByPlaceholderText } = render(<PlayersPage navigation={mockNavigation} />);
    const searchInput = getByPlaceholderText('Search players...');
    
    fireEvent.changeText(searchInput, 'LeBron James');
    expect(searchInput.props.value).toBe('LeBron James');
  });

  it('shows empty state message initially', () => {
    const { getByText } = render(<PlayersPage navigation={mockNavigation} />);
    expect(getByText('Search for a player to see their information')).toBeTruthy();
  });
});
