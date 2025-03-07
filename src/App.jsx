import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import useAuthStore from "./stores/authStore";
import useMovieStore from "./stores/movieStore";
import useBookingStore from "./stores/bookingStore";
import { useInitializeApp } from "./hooks/useInitializeApp";
import { routes } from "./routes";
import { Analytics } from "@vercel/analytics/react";

import DefaultLayout from "./components/layout/DefaultLayout";
import ErrorBoundary from "./components/common/ErrorBoundary";
import LoadingSpinner from "./components/common/LoadingSpinner";
import PaymentNotificationBanner from "./components/booking/PaymentNotificationBanner";
import LandingPage from "./pages/LandingPage";

const ProtectedRoute = lazy(() => import("./components/common/ProtectedRoute"));
const NotFound = lazy(() => import("./components/common/NotFound"));
const Logout = lazy(() => import("./components/auth/Logout"));

const renderRoutes = (routeList) =>
  routeList.map(({ path, component: Component }) => (
    <Route key={path} path={path} element={<Component />} />
  ));

function AppContent({ toggleDarkMode }) {
  const { initializeCsrfToken, isAuthenticated, fetchUser } = useAuthStore();
  const { fetchMovies } = useMovieStore();
  const { getUserDraftBookings } = useBookingStore();

  useInitializeApp({
    initializeCsrfToken,
    isAuthenticated,
    fetchUser,
    fetchMovies,
    getUserDraftBookings,
  });

  return (
    <DefaultLayout toggleDarkMode={toggleDarkMode}>
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner size="large" fullScreen />}>
          <Routes>
            {renderRoutes(routes.public)}
            <Route element={<ProtectedRoute />}>
              <Route path="/logout" element={<Logout />} />
              {renderRoutes(routes.protected)}
            </Route>
            <Route element={<ProtectedRoute admin />}>
              <Route
                path="/admin"
                element={<Navigate to="/admin/movies" replace />}
              />
              {renderRoutes(routes.admin)}
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <PaymentNotificationBanner />
      </ErrorBoundary>
    </DefaultLayout>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/*" element={<AppContent />} />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
