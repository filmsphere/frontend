import { useState } from "react";
import useAdminStore from "../../stores/adminStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const ManageBookings = () => {
  const { getBookingsByShow, deleteBooking, shows, bookingsByShow, loading } =
    useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");

  const handleShowSelect = async (showId) => {
    await getBookingsByShow(showId);
  };

  const handleBookingDelete = async (bookingId) => {
    const booking = bookingsByShow.find((b) => b.id === bookingId);
    const movieTitle = booking?.show.movie.title || "Unknown";
    const confirmed = window.confirm(
      `Are you sure you want to delete booking "${bookingId}" for show "${movieTitle}"?`,
    );

    if (confirmed) {
      await deleteBooking(bookingId);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const filteredShows = shows.filter((show) =>
    show.movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 rounded-lg shadow-md bg-background text-foreground">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>
        <Input
          type="text"
          placeholder="Search by movie title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 w-full"
          disabled={loading}
        />
      </div>

      {loading ? (
        <LoadingSpinner size="medium" />
      ) : (
        <>
          {/* Shows List */}
          <div className="space-y-4 mb-6">
            {filteredShows.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No shows found
              </div>
            ) : (
              filteredShows.map((show) => (
                <div
                  key={show.id}
                  className="p-4 border rounded-md hover:bg-secondary transition-colors"
                >
                  <Button
                    variant="link"
                    onClick={() => handleShowSelect(show.id)}
                    className="font-semibold w-full text-left"
                  >
                    {show.movie.title}
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Screen: {show.screen.number}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(show.date_time)}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Bookings Section */}
          {bookingsByShow.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Bookings for {bookingsByShow[0].show.movie.title}
              </h4>

              {bookingsByShow.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No bookings for this show.
                </p>
              ) : (
                bookingsByShow.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-3 rounded-md mb-2 hover:bg-secondary"
                  >
                    <p className="text-sm text-muted-foreground">
                      Booking ID: {booking.id}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      User: {booking.user.username} ({booking.user.fullname})
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Seats: {booking.seats.map((s) => s.id).join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total Amount: 🪙{booking.total_amount}
                    </p>
                    <Button
                      variant="destructive"
                      onClick={() => handleBookingDelete(booking.id)}
                      disabled={loading}
                      className="mt-2"
                    >
                      Delete Booking
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageBookings;
