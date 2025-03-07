import { lazy } from "react";

export const routes = {
  public: [
    { path: "/", component: lazy(() => import("./pages/Home")) },
    //{ path: "/landing", component: lazy(() => import("./pages/LandingPage")) },
    { path: "/about", component: lazy(() => import("./pages/AboutPage")) },
    { path: "/privacy", component: lazy(() => import("./pages/PrivacyPage")) },
    { path: "/terms", component: lazy(() => import("./pages/TermsPage")) },
    {
      path: "/login",
      component: lazy(() => import("./components/auth/LoginForm")),
    },
    {
      path: "/register",
      component: lazy(() => import("./components/auth/RegisterForm")),
    },
    {
      path: "/ticket/:bookingId",
      component: lazy(() => import("./pages/TicketPage")),
    },
  ],
  protected: [
    { path: "/profile", component: lazy(() => import("./pages/ProfilePage")) },
    {
      path: "/movie/:movieId",
      component: lazy(() => import("./pages/MovieDetails")),
    },
    { path: "/booking", component: lazy(() => import("./pages/BookingPage")) },
    {
      path: "/booking-confirmation",
      component: lazy(() => import("./pages/BookingConfirmation")),
    },
  ],
  admin: [
    {
      path: "/admin/:tab",
      component: lazy(() => import("./pages/AdminDashboard")),
    },
    {
      path: "/admin/show/:showId",
      component: lazy(() => import("./pages/ShowInsights")),
    },
  ],
};
