import useAdminStore from "../../stores/adminStore";
import useThemeStore from "../../stores/themeStore";

const Insights = () => {
  const { movies, shows, screens, bookings } = useAdminStore();
  const { darkMode } = useThemeStore();

  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.total_amount || 0),
    0,
  );
  const totalSeats = screens.reduce(
    (sum, screen) =>
      sum +
      screen.layout.rows.reduce((rowSum, row) => rowSum + row.seats.length, 0),
    0,
  );
  const bookedSeats = bookings.reduce(
    (sum, booking) => sum + booking.seats.length,
    0,
  );
  const occupancyRate = totalSeats ? (bookedSeats / totalSeats) * 100 : 0;

  const movieRevenue = movies.map((movie) => ({
    title: movie.title,
    revenue: bookings
      .filter((b) => b.show.movie.imdb_id === movie.imdb_id)
      .reduce((sum, b) => sum + (b.total_amount || 0), 0),
  }));

  const seatTypeStats = {
    standard: { count: 0, revenue: 0, price: shows[0]?.base_price || 180 },
    premium: {
      count: 0,
      revenue: 0,
      price: (shows[0]?.base_price || 180) * 1.5,
    },
    vip: { count: 0, revenue: 0, price: (shows[0]?.base_price || 180) * 2 },
  };

  bookings.forEach((booking) => {
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
      <div className="max-w-6xl mx-auto">
        <h1
          className={`text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          Overall Insights
        </h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div
            className={`p-4 sm:p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">Total Bookings</h2>
            <p className="text-2xl sm:text-3xl font-bold">{totalBookings}</p>
          </div>
          <div
            className={`p-4 sm:p-6 rounded-lg shadow-lg ${
              darkMode ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <h2 className="text-xl font-semibold mb-2">Total Revenue</h2>
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

        {/* Movie Revenue Breakdown */}
        <div
          className={`p-4 sm:p-6 rounded-lg shadow-lg mb-8 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">Revenue by Movie</h2>
          <div className="space-y-4">
            {movieRevenue.map((movie) => (
              <div
                key={movie.title}
                className={`flex justify-between items-center p-3 rounded-lg ${
                  darkMode ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                <span className="text-base sm:text-lg">{movie.title}</span>
                <span className="text-base sm:text-lg font-medium">
                  🪙{movie.revenue}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
