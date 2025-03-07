import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
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
import { CheckCircle2 } from "lucide-react";
import LoadingSpinner from "../components/common/LoadingSpinner";
const VITE_APP_URL = import.meta.env.VITE_APP_URL;

const BookingConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { getBookingDetails, cancelBooking, sendTicket, loading } =
    useBookingStore();
  const { addMessage } = useFlashMessageStore();
  const [bookingDetails, setBookingDetails] = useState(null);
  const showTime = new Date(bookingDetails?.show_date);
  const now = new Date();
  const diffInMinutes = (showTime - now) / (1000 * 60);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      const details = await getBookingDetails(state?.bookingId);
      if (!details) {
        navigate("/profile");
        return;
      }
      setBookingDetails(details);
      await sendTicket(state?.bookingId);
    };
    if (state?.bookingId) {
      fetchBookingDetails();
    } else {
      addMessage("No booking ID provided.", "error");
      navigate("/profile");
    }
  }, [state?.bookingId, getBookingDetails, sendTicket, navigate, addMessage]);

  const handleCancelBooking = async () => {
    if (
      diffInMinutes > 20 &&
      window.confirm("Are you sure you want to cancel this booking?")
    ) {
      const success = await cancelBooking(state?.bookingId);
      if (success) navigate("/profile");
    } else if (diffInMinutes <= 20) {
      window.alert("Cannot cancel booking within 20 minutes of showtime.");
    }
  };

  if (loading || !bookingDetails) {
    return <LoadingSpinner size="large" />;
  }

  const qrCodeData = `${VITE_APP_URL}/ticket/${bookingDetails.id}`;

  return (
    <div className="min-h-screen p-4 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="max-w-3xl mx-auto">
        <Card className="p-6 rounded-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <CheckCircle2 className="h-12 w-12 text-green-500 dark:text-green-400" />
              <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                Booking Confirmed!
              </CardTitle>
            </div>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 mt-2">
              Thank you for your reservation
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
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
            </div>

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
                Scan this QR code to verify your booking
              </p>
            </div>

            <Separator />

            <div className="text-sm text-neutral-600 dark:text-neutral-400 space-y-2">
              <p>
                A confirmation email has been sent to your registered address.
                Please present this booking ID or QR code at the theater.
              </p>
              <p>
                You can view this and all your bookings in the{" "}
                <button
                  onClick={() => navigate("/profile")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                >
                  Booking History
                </button>{" "}
                section of your profile page.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-start">
            {diffInMinutes > 20 && (
              <Button
                onClick={handleCancelBooking}
                disabled={loading}
                variant="destructive"
              >
                {loading ? "Cancelling..." : "Cancel Ticket"}
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BookingConfirmation;
