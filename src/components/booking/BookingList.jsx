import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const BookingList = ({ bookings }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = bookings.filter((booking) => {
    const movieTitle = booking.movie_title.toLowerCase();
    const bookingId = booking.id.toString();
    const searchLower = searchTerm.toLowerCase();
    return movieTitle.includes(searchLower) || bookingId.includes(searchLower);
  });

  return (
    <div>
      {/* Search */}
      <div className="mb-4 flex flex-col sm:flex-row gap-4">
        <Input
          type="text"
          placeholder="Search by movie or booking ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:w-1/2"
        />
      </div>

      {/* Booking List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-4">
          {filteredBookings.map((booking) => (
            <Card key={booking.id} className="p-4">
              <CardHeader>
                <Link to={`/ticket/${booking.id}`}>
                  <CardTitle className="text-lg font-bold text-neutral-900 dark:text-neutral-50 hover:text-blue-600 dark:hover:text-blue-400">
                    {booking.movie_title || "Unknown Movie"}
                  </CardTitle>
                </Link>
              </CardHeader>
              <CardContent className="space-y-2 text-neutral-600 dark:text-neutral-400">
                <p>Booking ID: {booking.id}</p>
                <p>
                  <span className="font-medium">Show Time:</span>{" "}
                  {new Date(booking.show_date).toLocaleString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
                <p>
                  <span className="font-medium">Seats:</span>{" "}
                  {booking.seats || "N/A"}
                </p>
                <p>
                  <span className="font-medium">Total Paid:</span> 🪙
                  {booking.total_amount || "N/A"}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral-600 dark:text-neutral-400">
          {searchTerm
            ? "No bookings match your search or filter."
            : "No bookings available."}
        </p>
      )}
    </div>
  );
};

export default BookingList;
