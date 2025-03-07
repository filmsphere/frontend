import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { apiRequest } from "../utils/apiHelpers";
import useFlashMessageStore from "./flashMessageStore";
import useBookingStore from "./bookingStore";
import useMovieStore from "./movieStore";

const useAuthStore = create(
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
        isAuthenticated: false,
        isAdmin: false,
        user: null,
        balance: 0,
        lastRefill: null,
        loading: false,
        loadingOtp: false,

        addMessage: (message, type) =>
          useFlashMessageStore.getState().addMessage(message, type),

        initializeCsrfToken: () => {
          return withLoading(async () => {
            const response = await fetch("/api/auth/set-csrf-token", {
              method: "GET",
              credentials: "include",
            });
            if (!response.ok)
              throw new Error("Failed to set CSRF token. Please refresh");
            return true;
          });
        },

        checkUsername: (username) => {
          return withLoading(async () => {
            const response = await apiRequest(
              `/api/auth/check-username/${username}`,
            );
            if (response.success) return true;
            throw new Error(response.message || "Username check failed.");
          });
        },

        requestOtp: (email) => {
          return withLoading(async () => {
            await get().initializeCsrfToken();
            const response = await apiRequest(
              `/api/auth/request-otp/${email}`,
              "POST",
            );
            if (response.success) {
              get().addMessage("OTP sent successfully!", "success");
              return true;
            }
            throw new Error(response.message || "Failed to send OTP.");
          }, "loadingOtp");
        },

        login: (username, email, password) => {
          return withLoading(async () => {
            //no need to call ig
            //await get().initializeCsrfToken();
            const response = await apiRequest("/api/auth/login", "POST", {
              username,
              email,
              password,
            });
            if (response.success) {
              set({ isAuthenticated: true });
              await get().fetchUser();
              get().addMessage("Login successful!", "success");
              return true;
            }
            throw new Error("Login failed unexpectedly.");
          });
        },

        logout: () => {
          return withLoading(async () => {
            const response = await apiRequest("/api/auth/logout", "POST");
            if (response.success) {
              useBookingStore.getState().clearAll();
              useMovieStore.getState().clearAll();
              set({
                isAuthenticated: false,
                user: null,
                isAdmin: false,
                balance: 0,
              });
              get().addMessage("Logged out successfully!", "success");
              return true;
            }
            throw new Error(response.message || "Logout failed");
          });
        },

        fallbackLogout: () => {
          useBookingStore.getState().clearAll();
          useMovieStore.getState().clearAll();
          set({
            isAuthenticated: false,
            user: null,
            isAdmin: false,
            balance: 0,
          });
          get().addMessage("Session expired. Please log in again.", "error");
        },

        register: (formData, navigate, lastPage) => {
          return withLoading(async () => {
            await get().initializeCsrfToken();
            const response = await apiRequest(
              "/api/auth/register",
              "POST",
              formData,
            );
            if (response.success) {
              get().addMessage(
                "Registration successful! Please log in.",
                "success",
              );
              navigate("/login", { state: { lastPage } });
              return true;
            }
            throw new Error(
              response.message || "Registration failed unexpectedly.",
            );
          });
        },

        fetchUser: () => {
          return withLoading(async () => {
            const response = await apiRequest("/api/auth/user");
            if (response.success) {
              set({
                user: response,
                isAuthenticated: true,
                isAdmin: response.is_superuser || false,
                balance: response.balance || 0,
              });
              return true;
            }
            throw new Error(response.message || "Failed to fetch user data");
          });
        },

        refillBalance: () => {
          return withLoading(async () => {
            const now = new Date().getTime();
            const lastRefill = get().lastRefill;
            const timeSinceLastRefill = lastRefill
              ? (now - lastRefill) / 1000 / 60
              : Infinity;

            // 10 mins
            if (timeSinceLastRefill < 10) {
              throw new Error(
                "You must wait 10 minutes before refilling your balance.",
              );
            }

            const response = await apiRequest(
              "/api/auth/refill-balance",
              "POST",
            );
            if (response.success) {
              const newBalance = response.message || 0;
              set({ balance: newBalance, lastRefill: now });
              get().addMessage("Balance refilled successfully!", "success");
              return true;
            }
            throw new Error(response.message || "Failed to refill balance.");
          });
        },
      };
    },
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        balance: state.balance,
      }),
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useAuthStore;
