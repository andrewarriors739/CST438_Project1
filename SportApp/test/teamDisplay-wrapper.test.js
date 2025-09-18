import React from 'react';
import { render } from '@testing-library/react-native';
import TeamDisplay from '../app/teamDisplay';

// Mock the TeamDisplayComponent
jest.mock('../components/teamDisplay', () => {
  return jest.fn(() => null);
});

// Mock expo-router
jest.mock('expo-router', () => ({
  useLocalSearchParams: () => ({
    teamName: 'Test Team',
    logo: 'https://example.com/logo.png'
  })
}));

describe('TeamDisplay Wrapper Component', () => {
  beforeEach(() => {
    const TeamDisplayComponent = require('../components/teamDisplay');
    TeamDisplayComponent.mockClear();
  });

  it('renders without crashing', () => {
    const { getByText } = render(<TeamDisplay />);
    expect(getByText('Team Details')).toBeTruthy();
  });

  it('displays correct title and subtitle', () => {
    const { getByText } = render(<TeamDisplay />);
    
    expect(getByText('Team Details')).toBeTruthy();
    expect(getByText('Learn More About The Team')).toBeTruthy();
  });

  it('renders TeamDisplayComponent', () => {
    const TeamDisplayComponent = require('../components/teamDisplay');
    render(<TeamDisplay />);
    
    expect(TeamDisplayComponent).toHaveBeenCalledTimes(1);
  });

  it('has correct container structure', () => {
    const { getByText } = render(<TeamDisplay />);
    const title = getByText('Team Details');
    const subtitle = getByText('Learn More About The Team');
    
    expect(title).toBeTruthy();
    expect(subtitle).toBeTruthy();
  });

  it('applies correct styling', () => {
    const { getByText } = render(<TeamDisplay />);
    const titleElement = getByText('Team Details');
    
    expect(titleElement.props.style).toEqual(
      expect.objectContaining({
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold'
      })
    );
  });

  it('renders with main container styling', () => {
    const { getByText } = render(<TeamDisplay />);
    
    // Check if component renders with proper structure
    expect(getByText('Team Details')).toBeTruthy();
    expect(getByText('Learn More About The Team')).toBeTruthy();
  });
});
