import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { FavoriteMedia } from "src/shared/types/favoriteMedia";

type FavoritesState = {
  favorites: FavoriteMedia[];

  addFavorite: (item: FavoriteMedia) => void;
  removeFavorite: (id: number, mediaType: FavoriteMedia["mediaType"]) => void;

  toggleFavorite: (item: FavoriteMedia) => void;
  isFavorite: (id: number, mediaType: FavoriteMedia["mediaType"]) => boolean;
};

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.some(
            (f) => f.id === item.id && f.mediaType === item.mediaType
          );

          if (exists) return state;

          return {
            favorites: [...state.favorites, item],
          };
        }),

      removeFavorite: (id, mediaType) =>
        set((state) => ({
          favorites: state.favorites.filter(
            (f) => !(f.id === id && f.mediaType === mediaType)
          ),
        })),

      toggleFavorite: (item) =>
        set((state) => {
          const exists = state.favorites.some(
            (f) => f.id === item.id && f.mediaType === item.mediaType
          );

          return {
            favorites: exists
              ? state.favorites.filter(
                  (f) =>
                    !(f.id === item.id && f.mediaType === item.mediaType)
                )
              : [...state.favorites, item],
          };
        }),

      isFavorite: (id, mediaType) =>
        get().favorites.some(
          (f) => f.id === id && f.mediaType === mediaType
        ),
    }),
    {
      name: "favorites-storage",
      storage: {
        getItem: async (key) => {
          const value = await AsyncStorage.getItem(key);
          return value ? JSON.parse(value) : null;
        },
        setItem: async (key, value) => {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        },
        removeItem: async (key) => {
          await AsyncStorage.removeItem(key);
        },
      },
    }
  )
);
