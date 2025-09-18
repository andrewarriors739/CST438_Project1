import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import Teams from '../app/teams';

// Mocking is handled globally in jest-setup-mocks.js

// Mock the TeamsComponent
jest.mock('../components/teams', () => {
  return jest.fn(() => null);
});

// Mock console.log to avoid cluttering test output
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('Teams Search Functionality', () => {
  beforeEach(() => {
    global.mockRouterPush.mockClear();
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  it('renders search components correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Teams />);
    
    expect(getByPlaceholderText('Search teams...')).toBeTruthy();
    expect(getByText('Search')).toBeTruthy();
    expect(getByText('Teams')).toBeTruthy();
    expect(getByText('Discover Your Favorite Teams')).toBeTruthy();
  });

  it('updates search text when user types', () => {
    const { getByPlaceholderText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    
    fireEvent.changeText(searchInput, 'dodgers');
    expect(searchInput.props.value).toBe('dodgers');
  });

  it('formats team names correctly for database search', () => {
    const { getByPlaceholderText, getByText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    const searchButton = getByText('Search');
    
    // Test lowercase input
    fireEvent.changeText(searchInput, 'los angeles lakers');
    fireEvent.press(searchButton);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Searching for team:', 'Los Angeles Lakers');
    expect(global.mockRouterPush).toHaveBeenCalledWith({
      pathname: '/teamDisplay',
      params: { teamName: 'Los Angeles Lakers', logo: null }
    });
  });

  it('formats team names with mixed case correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    const searchButton = getByText('Search');
    
    // Test mixed case input
    fireEvent.changeText(searchInput, 'mAnChEsTeR uNiTeD');
    fireEvent.press(searchButton);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Searching for team:', 'Manchester United');
    expect(global.mockRouterPush).toHaveBeenCalledWith({
      pathname: '/teamDisplay',
      params: { teamName: 'Manchester United', logo: null }
    });
  });

  it('handles single word team names correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    const searchButton = getByText('Search');
    
    fireEvent.changeText(searchInput, 'dodgers');
    fireEvent.press(searchButton);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Searching for team:', 'Dodgers');
    expect(global.mockRouterPush).toHaveBeenCalledWith({
      pathname: '/teamDisplay',
      params: { teamName: 'Dodgers', logo: null }
    });
  });

  it('trims whitespace from search input', () => {
    const { getByPlaceholderText, getByText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    const searchButton = getByText('Search');
    
    fireEvent.changeText(searchInput, '  buffalo bills  ');
    fireEvent.press(searchButton);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Searching for team:', 'Buffalo Bills');
    expect(global.mockRouterPush).toHaveBeenCalledWith({
      pathname: '/teamDisplay',
      params: { teamName: 'Buffalo Bills', logo: null }
    });
  });

  it('does not search when input is empty', () => {
    const { getByText } = render(<Teams />);
    const searchButton = getByText('Search');
    
    fireEvent.press(searchButton);
    
    expect(global.mockRouterPush).not.toHaveBeenCalled();
    expect(mockConsoleLog).not.toHaveBeenCalledWith(expect.stringContaining('Searching for team:'));
  });

  it('does not search when input is only whitespace', () => {
    const { getByPlaceholderText, getByText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    const searchButton = getByText('Search');
    
    fireEvent.changeText(searchInput, '   ');
    fireEvent.press(searchButton);
    
    expect(global.mockRouterPush).not.toHaveBeenCalled();
    expect(mockConsoleLog).not.toHaveBeenCalledWith(expect.stringContaining('Searching for team:'));
  });

  it('triggers search on Enter key press', () => {
    const { getByPlaceholderText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    
    fireEvent.changeText(searchInput, 'chelsea');
    fireEvent(searchInput, 'submitEditing');
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Searching for team:', 'Chelsea');
    expect(global.mockRouterPush).toHaveBeenCalledWith({
      pathname: '/teamDisplay',
      params: { teamName: 'Chelsea', logo: null }
    });
  });

  it('has correct return key type for search', () => {
    const { getByPlaceholderText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    
    expect(searchInput.props.returnKeyType).toBe('search');
  });

  it('passes searchText prop to TeamsComponent', async () => {
    const TeamsComponent = require('../components/teams');
    const { getByPlaceholderText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    
    // Clear previous calls
    TeamsComponent.mockClear();
    
    fireEvent.changeText(searchInput, 'test search');
    
    // Wait for component to re-render with new prop
    await waitFor(() => {
      // Check if the component was called with the correct prop
      const calls = TeamsComponent.mock.calls;
      const hasCorrectCall = calls.some(call => 
        call[0] && call[0].searchText === 'test search'
      );
      expect(hasCorrectCall).toBe(true);
    });
  });

  it('handles navigation correctly with proper parameters', () => {
    const { getByPlaceholderText, getByText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    const searchButton = getByText('Search');
    
    fireEvent.changeText(searchInput, 'real madrid');
    fireEvent.press(searchButton);
    
    expect(global.mockRouterPush).toHaveBeenCalledTimes(1);
    expect(global.mockRouterPush).toHaveBeenCalledWith({
      pathname: '/teamDisplay',
      params: { 
        teamName: 'Real Madrid', 
        logo: null 
      }
    });
  });

  it('handles special characters in team names', () => {
    const { getByPlaceholderText, getByText } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    const searchButton = getByText('Search');
    
    fireEvent.changeText(searchInput, "ac milan");
    fireEvent.press(searchButton);
    
    expect(mockConsoleLog).toHaveBeenCalledWith('Searching for team:', 'Ac Milan');
    expect(global.mockRouterPush).toHaveBeenCalledWith({
      pathname: '/teamDisplay',
      params: { teamName: 'Ac Milan', logo: null }
    });
  });

  it('maintains search text state between renders', () => {
    const { getByPlaceholderText, rerender } = render(<Teams />);
    const searchInput = getByPlaceholderText('Search teams...');
    
    fireEvent.changeText(searchInput, 'barcelona');
    expect(searchInput.props.value).toBe('barcelona');
    
    rerender(<Teams />);
    const updatedSearchInput = getByPlaceholderText('Search teams...');
    expect(updatedSearchInput.props.value).toBe('barcelona');
  });
});
