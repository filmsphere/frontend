import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiRequest } from "../utils/apiHelpers";
import useFlashMessageStore from "./flashMessageStore";

const useMovieStore = create(
  persist(
    (set, get) => {
      const withLoading = async (fn, customLoadingKey = "loading") => {
        set({ [customLoadingKey]: true });
        try {
          return await fn();
        } catch (err) {
          get().addMessage(err.message || "An error Occurred.", "error");
          return false;
        } finally {
          set({ [customLoadingKey]: false });
        }
      };

      return {
        // State
        movies: [],
        shows: [],
        seatsByShow: {},
        loading: false,

        addMessage: (message, type) =>
          useFlashMessageStore.getState().addMessage(message, type),

        // Actions
        fetchMovies: async () => {
          return withLoading(async () => {
            const response = await apiRequest("/api/movie/list-movies", "GET");
            if (response.success) {
              set({ movies: response.message || [] });
              return true;
            }
            throw new Error(response.message || "Failed to fetch movies.");
          });
        },

        getMovieById: (movieId) => {
          return get().movies.find((m) => m.imdb_id === movieId);
        },

        fetchShowsByMovieId: async (movieId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/movie/get-movie-shows/${movieId}`,
              "GET",
            );
            if (response.success) {
              set({ shows: response.message || [] });
              return true;
            }
            throw new Error(
              response.message || `Failed to fetch shows for movie ${movieId}.`,
            );
          });
        },

        getShowById: (showId) => {
          return get().shows.find((s) => s.id === showId);
        },

        fetchShowSeats: async (showId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/movie/get-show-seats/${showId}`,
              "GET",
            );
            if (response.success) {
              set((state) => ({
                seatsByShow: {
                  ...state.seatsByShow,
                  [showId]: response.message || [],
                },
              }));
              return true;
            }
            throw new Error(
              response.message || `Failed to fetch seats for show ${showId}.`,
            );
          });
        },

        getShowSeats: (showId) => {
          return get().seatsByShow[showId] || [];
        },

        clearAll: () =>
          set({ movies: [], shows: [], seatsByShow: {}, loading: false }),
      };
    },
    {
      name: "movie-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        movies: state.movies,
        shows: state.shows,
        seatsByShow: state.seatsByShow,
      }),
    },
  ),
);

export default useMovieStore;
