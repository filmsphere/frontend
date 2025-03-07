import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import useBookingStore from "../stores/bookingStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../components/common/LoadingSpinner";
import BookingList from "../components/booking/BookingList";

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout, balance, refillBalance, loading } =
    useAuthStore();
  const { bookings, getUserBookings } = useBookingStore();
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    getUserBookings();
  }, [isAuthenticated, getUserBookings, navigate]);

  const handleRefillBalance = async () => {
    await refillBalance();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (loading) {
    return <LoadingSpinner size="large" />;
  }

  const now = new Date();
  const futureBookings = bookings.filter(
    (booking) => new Date(booking.show_date) > now,
  );
  const pastBookings = bookings.filter(
    (booking) => new Date(booking.show_date) <= now,
  );

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-neutral-900 dark:text-neutral-50">
          Your Profile
        </h1>

        <Card className="p-6 shadow rounded-lg mb-6">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
              Account Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3 md:col-span-2 text-neutral-600 dark:text-neutral-400">
                <p>
                  <span className="font-bold">Full Name:</span>{" "}
                  {user?.fullname || "N/A"}
                </p>
                <p>
                  <span className="font-bold">Username:</span>{" "}
                  {user?.username || "N/A"}
                </p>
                <p>
                  <span className="font-bold">Email:</span>{" "}
                  {user?.email || "N/A"}
                </p>
                <p className="text-green-600 dark:text-green-400">
                  <span className="font-bold">Coin Balance:</span> 🪙{balance}
                </p>
              </div>
              <div className="mt-4 md:mt-8 flex flex-col space-y-4 items-center">
                <p className="text-sm text-center text-neutral-600 dark:text-neutral-400">
                  Note: You can refill balance after every 10 minutes.
                </p>
                <Button
                  onClick={handleRefillBalance}
                  disabled={loading}
                  variant="outline"
                >
                  {loading ? "Refilling..." : "Refill Balance"}
                </Button>
                <Button
                  onClick={handleLogout}
                  disabled={loading}
                  variant="destructive"
                >
                  {loading ? "Logging out..." : "Logout"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="p-6 shadow rounded-lg">
          <CardHeader className="flex justify-between items-center mb-4">
            <CardTitle className="text-xl sm:text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
              {showHistory ? "Booking History" : "Upcoming Bookings"}
            </CardTitle>
            <Button
              onClick={() => setShowHistory(!showHistory)}
              variant="outline"
              size="sm"
            >
              {showHistory ? "Show Upcoming" : "Show History"}
            </Button>
          </CardHeader>
          <CardContent>
            <BookingList
              bookings={showHistory ? pastBookings : futureBookings}
              showHistory={showHistory ? true : false}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
