import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import useAuthStore from "../stores/authStore";
import useBookingStore from "../stores/bookingStore";
import useFlashMessageStore from "../stores/flashMessageStore";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import LoadingSpinner from "../components/common/LoadingSpinner";
const VITE_APP_URL = import.meta.env.VITE_APP_URL;

const TicketPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const {
    getBookingDetails,
    getUserBookings,
    bookings,
    cancelBooking,
    loading,
    sendTicket,
    loadingSendTicket,
  } = useBookingStore();
  const { addMessage } = useFlashMessageStore();
  const [bookingDetails, setBookingDetails] = useState(null);
  const { isAuthenticated } = useAuthStore();
  const showTime = new Date(bookingDetails?.show_date);
  const now = new Date();
  const diffInMinutes = (showTime - now) / (1000 * 60);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const details = await getBookingDetails(bookingId);
      if (!details) {
        navigate(-1);
        return;
      }
      setBookingDetails(details);
    };
    if (bookingId) {
      fetchBookingDetails();
    } else {
      addMessage("No booking ID provided.", "error");
      navigate(-1);
    }
  }, [bookingId, getBookingDetails, navigate, addMessage]);

  const handleSendTicket = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (isAuthenticated) {
      const success = await getUserBookings();
      if (success) {
        const now = new Date();
        const isFutureBooking = new Date(bookingDetails.show_date) > now;
        const bookingMatch = bookings.some(
          (booking) => booking.id === bookingId,
        );
        if (isFutureBooking && bookingMatch) {
          await sendTicket(bookingId);
        } else {
          addMessage("This ticket doesn't belong to you.", "error");
        }
      }
    }
  };

  const handleCancelBooking = async () => {
    if (
      diffInMinutes > 20 &&
      window.confirm("Are you sure you want to cancel this booking?")
    ) {
      const success = await cancelBooking(bookingId);
      if (success) navigate("/profile");
    } else if (diffInMinutes <= 20) {
      window.alert("Cannot cancel booking within 20 minutes of showtime.");
    }
  };

  const handleBackorLogin = () => {
    isAuthenticated ? navigate(-1) : navigate("/login");
  };

  if (loading) {
    return <LoadingSpinner size="medium" />;
  }

  const qrCodeData = `${VITE_APP_URL}/ticket/${bookingDetails?.id}`;

  return (
    <div className="min-h-screen p-4 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 rounded-lg">
          <CardHeader className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
              Ticket
            </CardTitle>
            <Button onClick={handleBackorLogin} variant="outline" size="sm">
              {isAuthenticated ? "Back" : "Login"}
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {bookingDetails && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Booking ID:</span>
                  <span className="font-mono text-neutral-600 dark:text-neutral-400">
                    {bookingDetails.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Movie:</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {bookingDetails.movie_title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Show Time:</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {new Date(bookingDetails.show_date).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Seats:</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    {bookingDetails.seats}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Paid:</span>
                  <span className="text-neutral-600 dark:text-neutral-400">
                    🪙{bookingDetails.total_amount}
                  </span>
                </div>
                {bookingDetails.user && (
                  <div className="flex justify-between">
                    <span className="font-medium">User:</span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {bookingDetails.user.username} (
                      {bookingDetails.user.fullname})
                    </span>
                  </div>
                )}
              </div>
            )}

            <Separator />

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                Booking QR Code
              </h2>
              <div className="p-4 bg-white dark:bg-neutral-800 rounded-lg inline-block">
                <QRCodeSVG
                  value={qrCodeData}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={true}
                />
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Scan this QR code to view your booking
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-start gap-4">
            {isAuthenticated && diffInMinutes >= 0 && (
              <Button
                onClick={handleSendTicket}
                disabled={loading || loadingSendTicket}
              >
                {loadingSendTicket ? "Sending..." : "Send Ticket"}
              </Button>
            )}
            {isAuthenticated && diffInMinutes > 20 && (
              <Button
                onClick={handleCancelBooking}
                disabled={loading}
                variant="destructive"
              >
                {loading ? "Cancelling..." : "Cancel Ticket"}
              </Button>
            )}
            {!isAuthenticated && (
              <Button onClick={handleBackorLogin} variant="outline">
                Login to Manage Booking
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TicketPage;
