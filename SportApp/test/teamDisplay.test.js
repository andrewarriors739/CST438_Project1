import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import TeamDisplayComponent from '../components/teamDisplay';

// Mocking is handled globally in jest-setup-mocks.js

// Mock console.log and console.error
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation(() => {});
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

// Mock team data responses
const mockTeamData = {
  teams: [{
    strTeam: 'Los Angeles Lakers',
    strBadge: 'https://example.com/lakers-badge.png',
    strLogo: 'https://example.com/lakers-logo.png',
    strDescriptionEN: 'The Los Angeles Lakers are an American professional basketball team.',
    strCountry: 'United States',
    strStadium: 'Crypto.com Arena',
    strLeague: 'NBA',
    intFormedYear: '1947'
  }]
};

const mockTeamDataWithoutBadge = {
  teams: [{
    strTeam: 'Test Team',
    strBadge: null,
    strLogo: 'https://example.com/test-logo.png',
    strDescriptionEN: 'Test team description',
    strCountry: 'Test Country',
    strStadium: 'Test Stadium',
    strLeague: 'Test League',
    intFormedYear: '2000'
  }]
};

const mockEmptyResponse = {
  teams: null
};

describe('TeamDisplay Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    global.mockRouterPush.mockClear();
    mockConsoleLog.mockClear();
    mockConsoleError.mockClear();
    global.global.mockUseLocalSearchParams.mockReturnValue({
      teamName: 'Los Angeles Lakers',
      logo: 'https://example.com/passed-logo.png'
    });
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
    mockConsoleError.mockRestore();
  });

  it('renders without crashing', () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { getByText } = render(<TeamDisplayComponent />);
    expect(getByText('Loading team details...')).toBeTruthy();
  });

  it('displays team information correctly when API returns data', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      expect(getByText('Los Angeles Lakers')).toBeTruthy();
      expect(getByText('NBA')).toBeTruthy();
      expect(getByText('United States')).toBeTruthy();
      expect(getByText('Crypto.com Arena')).toBeTruthy();
      expect(getByText('1947')).toBeTruthy();
    });
  });

  it('displays team description when available', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      expect(getByText('The Los Angeles Lakers are an American professional basketball team.')).toBeTruthy();
    });
  });

  it('displays "Team Not Found" when API returns no data', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockEmptyResponse)
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      expect(getByText('Team Not Found')).toBeTruthy();
      expect(getByText(/Sorry, we couldn't find detailed information for this team/)).toBeTruthy();
    });
  });

  it('uses team badge from API response when available', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { UNSAFE_getByType } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      const images = UNSAFE_getByType('Image');
      expect(images.props.source.uri).toBe('https://example.com/lakers-badge.png');
    });
  });

  it('falls back to logo when badge is not available', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamDataWithoutBadge)
    });

    const { UNSAFE_getByType } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      const images = UNSAFE_getByType('Image');
      expect(images.props.source.uri).toBe('https://example.com/test-logo.png');
    });
  });

  it('uses passed logo parameter when API data has no badge or logo', async () => {
    const mockDataNoLogo = {
      teams: [{
        ...mockTeamData.teams[0],
        strBadge: null,
        strLogo: null
      }]
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockDataNoLogo)
    });

    const { UNSAFE_getByType } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      const images = UNSAFE_getByType('Image');
      expect(images.props.source.uri).toBe('https://example.com/passed-logo.png');
    });
  });

  it('displays "No Logo" placeholder when no logo is available', async () => {
    global.mockUseLocalSearchParams.mockReturnValue({
      teamName: 'Test Team',
      logo: null
    });

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({
        teams: [{
          ...mockTeamData.teams[0],
          strBadge: null,
          strLogo: null
        }]
      })
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      expect(getByText('No Logo')).toBeTruthy();
    });
  });

  it('handles API errors gracefully', async () => {
    fetch.mockRejectedValueOnce(new Error('API Error'));

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      expect(mockConsoleError).toHaveBeenCalledWith('Error fetching team details:', expect.any(Error));
    });
  });

  it('navigates back to teams page when back button is pressed', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      const backButton = getByText('← Back to Search');
      fireEvent.press(backButton);
      expect(global.mockRouterPush).toHaveBeenCalledWith('/teams');
    });
  });

  it('displays loading state initially', () => {
    fetch.mockImplementation(() => new Promise(() => {})); // Never resolves

    const { getByText } = render(<TeamDisplayComponent />);
    expect(getByText('Loading team details...')).toBeTruthy();
  });

  it('displays all team detail labels correctly', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      expect(getByText('League:')).toBeTruthy();
      expect(getByText('Location:')).toBeTruthy();
      expect(getByText('Stadium:')).toBeTruthy();
      expect(getByText('Founded:')).toBeTruthy();
      expect(getByText('Description:')).toBeTruthy();
    });
  });

  it('handles array parameters correctly', async () => {
    global.mockUseLocalSearchParams.mockReturnValue({
      teamName: ['Los Angeles Lakers'],
      logo: ['https://example.com/array-logo.png']
    });

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      expect(getByText('Los Angeles Lakers')).toBeTruthy();
    });
  });

  it('calls correct API endpoint with formatted team name', () => {
    global.mockUseLocalSearchParams.mockReturnValue({
      teamName: 'Manchester United',
      logo: null
    });

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    render(<TeamDisplayComponent />);

    expect(fetch).toHaveBeenCalledWith(
      'https://www.thesportsdb.com/api/v1/json/123/searchteams.php?t=Manchester United'
    );
  });

  it('handles missing team name parameter', () => {
    global.mockUseLocalSearchParams.mockReturnValue({
      teamName: null,
      logo: null
    });

    const { getByText } = render(<TeamDisplayComponent />);
    expect(getByText('Team Name Not Available')).toBeTruthy();
  });

  it('displays fallback values for missing team data', async () => {
    const incompleteMockData = {
      teams: [{
        strTeam: 'Test Team',
        strBadge: 'https://example.com/badge.png',
        strDescriptionEN: null,
        strCountry: null,
        strStadium: null,
        strLeague: null,
        intFormedYear: null
      }]
    };

    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(incompleteMockData)
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      expect(getByText('No description available')).toBeTruthy();
      expect(getByText('Unknown location')).toBeTruthy();
      expect(getByText('Unknown stadium')).toBeTruthy();
      expect(getByText('Unknown league')).toBeTruthy();
      expect(getByText('Unknown year')).toBeTruthy();
    });
  });

  it('logs image loading errors', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { UNSAFE_getByType } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      const image = UNSAFE_getByType('Image');
      fireEvent(image, 'error');
      expect(mockConsoleLog).toHaveBeenCalledWith('Failed to load team badge');
    });
  });

  it('shows favorites button when team is loaded', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      expect(getByText('Add to Favorites')).toBeTruthy();
    });
  });

  it('does not show favorites button when team is not found', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockEmptyResponse)
    });

    const { queryByText, getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      // Verify team not found message appears
      expect(getByText('Team Not Found')).toBeTruthy();
    });
    
    // The favorites button should not be visible
    expect(queryByText('Add to Favorites')).toBeNull();
  });

  it('handles favorites button press', async () => {
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockTeamData)
    });

    const { getByText } = render(<TeamDisplayComponent />);

    await waitFor(() => {
      const favoritesButton = getByText('Add to Favorites');
      fireEvent.press(favoritesButton);
      // Add expectations for favorites functionality when implemented
    });
  });
});
