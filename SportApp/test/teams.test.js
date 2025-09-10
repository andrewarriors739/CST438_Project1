import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import Teams from '../components/teams';

// Mock fetch to avoid real API calls
global.fetch = jest.fn();

// Mock console.log to avoid cluttering test output
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});

// Mock data for different sports
const mockBasketballEvents = {
  events: [
    {
      idHomeTeam: '134880',
      strHomeTeam: 'Los Angeles Lakers',
      strHomeTeamBadge: 'https://example.com/lakers-logo.png'
    },
    {
      idHomeTeam: '134881',
      strHomeTeam: 'Boston Celtics',
      strHomeTeamBadge: 'https://example.com/celtics-logo.png'
    }
  ]
};

const mockSoccerEvents = {
  events: [
    {
      idHomeTeam: '133602',
      strHomeTeam: 'Manchester United',
      strHomeTeamBadge: 'https://example.com/manutd-logo.png'
    },
    {
      idHomeTeam: '133603',
      strHomeTeam: 'Liverpool FC',
      strHomeTeamBadge: 'https://example.com/liverpool-logo.png'
    }
  ]
};

const mockFootballEvents = {
  events: [
    {
      idHomeTeam: '134513',
      strHomeTeam: 'New England Patriots',
      strHomeTeamBadge: 'https://example.com/patriots-logo.png'
    }
  ]
};

const mockBaseballEvents = {
  events: [
    {
      idHomeTeam: '136167',
      strHomeTeam: 'New York Yankees',
      strHomeTeamBadge: 'https://example.com/yankees-logo.png'
    }
  ]
};

const mockHockeyEvents = {
  events: [
    {
      idHomeTeam: '134880',
      strHomeTeam: 'Boston Bruins',
      strHomeTeamBadge: 'https://example.com/bruins-logo.png'
    }
  ]
};

describe('Teams Component', () => {
  beforeEach(() => {
    // Reset fetch mock before each test
    fetch.mockClear();
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  it('renders without crashing', () => {
    // Mock all API calls to return empty data
    fetch.mockImplementation((url) => {
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByText } = render(<Teams />);
    expect(getByText).toBeTruthy();
  });

  it('fetches and displays basketball teams', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('id=4387')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockBasketballEvents)
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByText } = render(<Teams />);
    
    await waitFor(() => {
      expect(getByText('Los Angeles Lakers')).toBeTruthy();
      expect(getByText('Boston Celtics')).toBeTruthy();
    });
  });

  it('fetches and displays soccer teams', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('id=4328')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockSoccerEvents)
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByText } = render(<Teams />);
    
    await waitFor(() => {
      expect(getByText('Manchester United')).toBeTruthy();
      expect(getByText('Liverpool FC')).toBeTruthy();
    });
  });

  it('fetches and displays football teams', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('id=4391')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockFootballEvents)
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByText } = render(<Teams />);
    
    await waitFor(() => {
      expect(getByText('New England Patriots')).toBeTruthy();
    });
  });

  it('fetches and displays baseball teams', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('id=4424')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockBaseballEvents)
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByText } = render(<Teams />);
    
    await waitFor(() => {
      expect(getByText('New York Yankees')).toBeTruthy();
    });
  });

  it('fetches and displays hockey teams', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('id=4380')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockHockeyEvents)
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByText } = render(<Teams />);
    
    await waitFor(() => {
      expect(getByText('Boston Bruins')).toBeTruthy();
    });
  });

  it('displays team logos when available', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('id=4387')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockBasketballEvents)
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByTestId } = render(<Teams />);
    
    await waitFor(() => {
      const lakersImage = getByTestId('team-logo-134880');
      const celticsImage = getByTestId('team-logo-134881');
      expect(lakersImage).toBeTruthy();
      expect(celticsImage).toBeTruthy();
    });
  });

  it('handles team clicks correctly', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('id=4387')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockBasketballEvents)
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByText } = render(<Teams />);
    
    await waitFor(() => {
      const lakersTeam = getByText('Los Angeles Lakers');
      fireEvent.press(lakersTeam);
      expect(mockConsoleLog).toHaveBeenCalledWith('Team clicked:', 'Los Angeles Lakers');
    });
  });

  it('handles empty events array gracefully', async () => {
    fetch.mockImplementation(() => {
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { queryByText } = render(<Teams />);
    
    await waitFor(() => {
      // Should not crash and should not display any team names
      expect(queryByText('Los Angeles Lakers')).toBeNull();
    });
  });

  it('handles API errors gracefully', async () => {
    fetch.mockImplementation(() => {
      return Promise.reject(new Error('API Error'));
    });

    const { getByText } = render(<Teams />);
    
    // Should not crash even when API fails
    expect(getByText).toBeTruthy();
  });

  it('displays all team data correctly when teams are loaded', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('id=4387')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockBasketballEvents)
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByText, getByTestId } = render(<Teams />);
    
    await waitFor(() => {
      // Check team names are displayed
      expect(getByText('Los Angeles Lakers')).toBeTruthy();
      expect(getByText('Boston Celtics')).toBeTruthy();
      
      // Check team logos are displayed
      expect(getByTestId('team-logo-134880')).toBeTruthy();
      expect(getByTestId('team-logo-134881')).toBeTruthy();
    });
  });

  it('calls teamClicked function with correct team data', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('id=4387')) {
        return Promise.resolve({
          json: () => Promise.resolve(mockBasketballEvents)
        });
      }
      return Promise.resolve({
        json: () => Promise.resolve({ events: [] })
      });
    });

    const { getByText } = render(<Teams />);
    
    await waitFor(() => {
      const celticsTeam = getByText('Boston Celtics');
      fireEvent.press(celticsTeam);
      
      expect(mockConsoleLog).toHaveBeenCalledWith('Team clicked:', 'Boston Celtics');
    });
  });
});
