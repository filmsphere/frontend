import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiRequest } from "../utils/apiHelpers";
import useFlashMessageStore from "./flashMessageStore";
import useAuthStore from "./authStore";

const useBookingStore = create(
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
        bookings: [],
        draft: null,
        loading: false,
        isDraftLoaded: false,
        loadingSendTicket: false,

        updateDraft: ({
          bookingId,
          showId,
          movieId,
          seats,
          status = "draft",
          bookingDetails,
        }) => {
          set({
            draft:
              seats.length > 0
                ? { bookingId, showId, movieId, seats, status, bookingDetails }
                : null,
          });
        },

        createBooking: async ({ showId, movieId, selectedSeats }) => {
          return withLoading(async () => {
            const response = await apiRequest(
              "/api/booking/create-booking",
              "POST",
              {
                show_id: showId.toString(),
                seat_uuids: selectedSeats.map((seat) => seat.uuid),
              },
            );

            if (response.success) {
              const { message } = response;
              set({
                draft: {
                  bookingId: message.id,
                  showId,
                  movieId,
                  seats: selectedSeats,
                  status: "locked",
                  bookingDetails: message,
                },
              });
              get().addMessage("Seats reserved successfully!", "success");
              return message;
            }
            throw new Error(response.message || "Failed to create booking.");
          });
        },

        confirmBooking: async ({ draftBookingId, totalPrice }) => {
          return withLoading(async () => {
            const authStore = useAuthStore.getState();
            const currentBalance = authStore.balance;
            if (currentBalance < totalPrice) {
              throw new Error("Insufficient balance");
            }

            const response = await apiRequest(
              `/api/booking/confirm-booking/${draftBookingId.toString()}`,
              "POST",
            );

            if (response.success) {
              const { message } = response;
              //authStore((state) => ({
              //  balance: state.balance - totalPrice,
              //}));
              set({ bookings: [...get().bookings, message], draft: null });
              get().addMessage("Booking confirmed successfully!", "success");
              return message;
            }
            throw new Error(response.message || "Failed to confirm booking.");
          });
        },

        sendTicket: async (bookingId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/booking/send-tickets/${bookingId}`,
              "GET",
            );
            if (response.success) {
              get().addMessage("Ticket sent to your email.", "success");
              return true;
            }
            throw new Error(response.message || "Failed to send ticket.");
          }, "loadingSendTicket");
        },

        getUserBookings: async () => {
          return withLoading(async () => {
            const response = await apiRequest(
              "/api/booking/get-user-bookings",
              "GET",
            );
            if (response.success) {
              set({ bookings: response.message || [] });
              return true;
            }
            throw new Error(
              response.message || "Failed to fetch booking history.",
            );
          });
        },

        getUserDraftBookings: async () => {
          return withLoading(async () => {
            if (get().isDraftLoaded) return get().draft;
            const response = await apiRequest(
              "/api/booking/get-user-draft-bookings",
              "GET",
            );
            if (response.success) {
              const drafts = response.message || [];
              if (drafts.length > 0) {
                const latestDraft = drafts[0];
                set({
                  draft: {
                    bookingId: latestDraft.id,
                    showId: latestDraft.show.id,
                    movieId: latestDraft.show.movie.imdb_id,
                    seats: latestDraft.seats,
                    status: "locked",
                    created_at: new Date(latestDraft.created_at).getTime(),
                    bookingDetails: latestDraft,
                  },
                  isDraftLoaded: true,
                });
                return latestDraft;
              } else {
                set({ draft: null, isDraftLoaded: true });
              }
              return null;
            }
            throw new Error(
              response.message || "Failed to fetch draft bookings.",
            );
          });
        },

        getBookingDetails: async (bookingId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/booking/get-booking-details/${bookingId}`,
              "GET",
            );
            if (response.success) {
              return response.message;
            }
            throw new Error(
              response.message || "Failed to cancel draft booking.",
            );
          });
        },

        deleteDraftBooking: async (bookingId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/booking/delete-draft-booking/${bookingId}`,
              "GET",
            );
            if (response.success) {
              get().addMessage(
                "Draft booking canceled. Seats are now unlocked.",
                "success",
              );
              set({ draft: null });
              return true;
            }
            throw new Error(
              response.message || "Failed to cancel draft booking.",
            );
          });
        },

        cancelBooking: async (bookingId) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/booking/cancel-booking/${bookingId}`,
              "POST",
            );
            if (response.success) {
              get().addMessage("Booking canceled.", "success");
              return true;
            }
            throw new Error(response.message || "Failed to cancel booking.");
          });
        },

        clearDraft: () => {
          set({ draft: null });
        },

        clearAll: () =>
          set({
            bookings: [],
            draft: null,
            loading: false,
            isDraftLoaded: false,
          }),

        addMessage: (message, type) =>
          useFlashMessageStore.getState().addMessage(message, type),
      };
    },
    {
      name: "booking-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        bookings: state.bookings,
        draft: state.draft,
        isTicketSent: state.isTicketSent,
      }),
    },
  ),
);

export default useBookingStore;
