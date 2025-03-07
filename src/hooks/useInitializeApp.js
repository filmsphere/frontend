import { useEffect } from "react";

export const useInitializeApp = ({
  initializeCsrfToken,
  isAuthenticated,
  fetchMovies,
  fetchUser,
  getUserDraftBookings,
}) => {
  useEffect(() => {
    const init = async () => {
      await initializeCsrfToken();
      if (isAuthenticated) {
        await Promise.all([fetchMovies(), fetchUser(), getUserDraftBookings()]);
      }
    };
    init();
  }, [
    initializeCsrfToken,
    fetchMovies,
    isAuthenticated,
    fetchUser,
    getUserDraftBookings,
  ]);
};
