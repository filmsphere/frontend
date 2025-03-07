import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiRequest } from "../utils/apiHelpers";
import useFlashMessageStore from "./flashMessageStore";

const useAdminStore = create(
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
        screens: [],
        shows: [],
        bookings: [],
        bookingsByShow: [],
        loading: false,

        // Actions
        fetchAllData: async () => {
          return withLoading(async () => {
            const response = await apiRequest("/api/booking/getall", "GET");
            if (response.success) {
              set({
                movies: response.message.movies || [],
                screens: response.message.screens || [],
                shows: response.message.shows || [],
                bookings: response.message.bookings || [],
              });
              return true;
            }
            throw new Error("Fetching data from server failed!");
          });
        },

        addMovie: async (movieData) => {
          return withLoading(async () => {
            const response = await apiRequest(
              "/api/movie/add-movie",
              "POST",
              movieData,
            );
            if (response.success) {
              get().addMessage("Movie added successfully!", "success");
              set((state) => ({
                movies: [...state.movies, response.message],
              }));
              return true;
            }
            throw new Error(response.message || "Couldn't create movie");
          });
        },

        deleteMovie: async (movieId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/movie/delete-movie/${movieId}`,
              "DELETE",
            );
            if (response.success) {
              get().addMessage(
                `Movie "${movieId}" deleted successfully!`,
                "success",
              );
              set((state) => ({
                movies: state.movies.filter((m) => m.imdb_id !== movieId),
              }));
              return true;
            }
            throw new Error(response.message || "Failed to delete movie");
          });
        },

        addScreen: async (screenData) => {
          return withLoading(async () => {
            const response = await apiRequest(
              "/api/movie/add-screen",
              "POST",
              screenData,
            );
            if (response.success) {
              get().addMessage("Screen added successfully!", "success");
              set((state) => ({
                screens: [...state.screens, response.message],
              }));
              return true;
            }
            throw new Error(response.message || "Couldn't create screen");
          });
        },

        deleteScreen: async (screenNumber) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/movie/delete-screen/${screenNumber}`,
              "DELETE",
            );
            if (response.success) {
              get().addMessage(
                `Screen ${screenNumber} deleted successfully!`,
                "success",
              );
              set((state) => ({
                screens: state.screens.filter((s) => s.number !== screenNumber),
              }));
              return true;
            }
            throw new Error(response.message || "Failed to delete screen");
          });
        },

        addShow: async (showData) => {
          return withLoading(async () => {
            const response = await apiRequest(
              "/api/movie/add-show",
              "POST",
              showData,
            );
            if (response.success) {
              get().addMessage("Show added successfully!", "success");
              set((state) => ({
                shows: [...state.shows, response.message],
              }));
              return true;
            }
            throw new Error(response.message || "Couldn't create show");
          });
        },

        deleteShow: async (showId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/movie/delete-show/${showId}`,
              "DELETE",
            );
            if (response.success) {
              get().addMessage(
                `Show ${showId} deleted successfully!`,
                "success",
              );
              set((state) => ({
                shows: state.shows.filter((s) => s.id !== showId),
              }));
              return true;
            }
            throw new Error(response.message || "Failed to delete show");
          });
        },

        getBookingsByShow: async (showId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/booking/list-bookings/${showId}`,
              "GET",
            );
            if (response.success) {
              set({
                bookingsByShow: response.message || [],
              });
              get().addMessage(
                "Bookings for show loaded successfully!",
                "success",
              );
              return true;
            }
            throw new Error(
              response.message ||
                `Failed to fetch bookings for show ${showId}.`,
            );
          });
        },

        deleteBooking: async (bookingId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/booking/delete-booking/${bookingId}`,
              "GET",
            );
            if (response.success) {
              get().addMessage(
                `Booking ${bookingId} canceled successfully!`,
                "success",
              );
              set({
                bookings: get().bookings.filter((b) => b.id !== bookingId),
              });
              return true;
            }
            throw new Error(response.message || "Failed to cancel booking.");
          });
        },

        clearBookingsByShow: () => {
          set({ bookingsByShow: [] });
        },

        // Clear actions
        clearAdminStore: () =>
          set({
            movies: [],
            screens: [],
            shows: [],
            bookings: [],
            bookingsByShow: [],
            loading: false,
          }),

        addMessage: (message, type) =>
          useFlashMessageStore.getState().addMessage(message, type),
      };
    },
    {
      name: "admin-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        movies: state.movies,
        screens: state.screens,
        shows: state.shows,
        bookings: state.bookings,
      }),
    },
  ),
);

export default useAdminStore;
