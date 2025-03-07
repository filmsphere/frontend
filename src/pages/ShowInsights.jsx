import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import useAdminStore from "../stores/adminStore";
import useThemeStore from "../stores/themeStore";
import LoadingSpinner from "../components/common/LoadingSpinner";
import FlashMessage from "../components/common/FlashMessage";

const ShowInsights = () => {
  const { showId } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const { shows, bookings, fetchAllData } = useAdminStore();
  const { darkMode } = useThemeStore();
  const [loading, setLoading] = useState(true);
  const [flash, setFlash] = useState(null);

  useEffect(() => {
    if (!isAuthenticated || !user?.is_superuser) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);
        await fetchAllData();
      } catch (err) {
        setFlash({
          message: err.message || "Failed to load show insights",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [isAuthenticated, user, navigate, fetchAllData]);

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  const show = shows.find((s) => s.id === Number(showId));
  if (!show) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-gray-900 text-red-400" : "bg-white text-red-600"
        }`}
      >
        <div className="text-2xl">Show not found</div>
      </div>
    );
  }

  // Calculate Show Insights
  const showBookings = bookings.filter((b) => b.show.id === Number(showId));
  const totalRevenue = showBookings.reduce(
    (sum, b) => sum + (b.total_amount || 0),
    0,
  );
  const bookedSeats = showBookings.reduce((sum, b) => sum + b.seats.length, 0);
  const totalSeats = show.screen.layout.rows.reduce(
    (sum, row) => sum + row.seats.length,
    0,
  );
  const occupancyRate = totalSeats ? (bookedSeats / totalSeats) * 100 : 0;

  // Calculate Seat Type Breakdown for this Show
  const seatTypeStats = {
    standard: { count: 0, revenue: 0, price: show.base_price },
    premium: { count: 0, revenue: 0, price: show.base_price * 1.5 },
    vip: { count: 0, revenue: 0, price: show.base_price * 2 },
  };

  showBookings.forEach((booking) => {
    booking.seats.forEach((seat) => {
      if (seat.type in seatTypeStats) {
        seatTypeStats[seat.type].count += 1;
        seatTypeStats[seat.type].revenue += seatTypeStats[seat.type].price;
      }
    });
  });

  return (
    <div
      className={`min-h-screen p-4 sm:p-8 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Flash Message */}
      {flash && (
        <FlashMessage
          message={flash.message}
          type={flash.type}
          onClose={() => setFlash(null)}
        />
      )}

      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Insights for {show.movie.title} -{" "}
          {new Date(show.date_time).toLocaleString("en-US", {
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div
            className={`p-4 sm:p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
            <p className="text-2xl sm:text-3xl font-bold">
              {showBookings.length}
            </p>
          </div>
          <div
            className={`p-4 sm:p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">Revenue</h2>
            <p className="text-2xl sm:text-3xl font-bold">🪙{totalRevenue}</p>
          </div>
          <div
            className={`p-4 sm:p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">Occupancy Rate</h2>
            <p className="text-2xl sm:text-3xl font-bold">
              {occupancyRate.toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Seat Type Breakdown */}
        <div
          className={`p-4 sm:p-6 rounded-lg shadow-lg mb-8 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Seat Type Breakdown</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(seatTypeStats).map(([type, { count, revenue }]) => (
              <div
                key={type}
                className={`p-3 rounded-lg text-center ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <h3 className="text-lg font-medium capitalize">{type}</h3>
                <p className="text-base">
                  <span className="font-medium">Booked:</span> {count}
                </p>
                <p className="text-base">
                  <span className="font-medium">Revenue:</span> 🪙{revenue}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Details */}
        <div
          className={`p-4 sm:p-6 rounded-lg shadow-lg ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
          {showBookings.length > 0 ? (
            <div className="space-y-4">
              {showBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`p-3 rounded-lg ${
                    darkMode ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  <p className="text-base sm:text-lg">
                    <span className="font-medium">User:</span>{" "}
                    {booking.user.username}
                  </p>
                  <p className="text-base sm:text-lg">
                    <span className="font-medium">Seats:</span>{" "}
                    {booking.seats.map((s) => s.id).join(", ")}
                  </p>
                  <p className="text-base sm:text-lg">
                    <span className="font-medium">Total Paid:</span> 🪙
                    {booking.total_amount}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p
              className={`text-center ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              No bookings for this show yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowInsights;
