// Jest setup file for React Native testing
import 'react-native-gesture-handler/jestSetup';

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock expo modules
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock expo-constants
jest.mock('expo-constants', () => ({
  default: {
    expoConfig: {
      extra: {
        eas: {
          projectId: 'test-project-id',
        },
      },
    },
  },
}));

// Mock fetch globally
global.fetch = jest.fn();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import FavSportsListPage from "./FavSportsListPage";
import PageWithSportsList from "./PageWithSportsList";
import * as FavItemsContextMod from "./FavItemsContext";

const mockFavHook = jest.spyOn(FavItemsContextMod, "useFavItems");

describe("FavSportsListPage simple tests", () => {
  it("displays 'No favorites yet' if no favorites", () => {
    mockFavHook.mockReturnValue({ favItemIds: [] });
    render(<FavSportsListPage />);
    expect(screen.getByText("No favorites yet")).toBeTruthy();
  });

  it("shows some favorites when present", () => {
    mockFavHook.mockReturnValue({ favItemIds: ["sport001", "team002"] });
    render(<FavSportsListPage />);
    expect(screen.getByText("[SPORT] Soccer")).toBeTruthy();
    expect(screen.getByText("[TEAM] Golden State Warriors")).toBeTruthy();
  });
});

describe("PageWithSportsList simple tests", () => {
  it("renders items and hearts", () => {
    mockFavHook.mockReturnValue({
      toggleFavItemById: jest.fn(),
      checkIsFavItem: () => false,
    });
    render(<PageWithSportsList />);
    expect(screen.getByText("[SPORT] Soccer")).toBeTruthy();
    expect(screen.getByText("[PLAYER] Tom Brady")).toBeTruthy();
  });

  it("toggles favorite on press", () => {
    const mockToggle = jest.fn();
    mockFavHook.mockReturnValue({
      toggleFavItemById: mockToggle,
      checkIsFavItem: (id) => id === "sport001",
    });
    render(<PageWithSportsList />);
    const hearts = screen.getAllByRole("button");
    if (hearts.length > 0) {
      fireEvent.press(hearts[0]);
      expect(mockToggle).toHaveBeenCalledWith("sport001");
    }
  });
});
