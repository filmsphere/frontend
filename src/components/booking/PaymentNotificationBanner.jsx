import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import useBookingStore from "../../stores/bookingStore";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

function PaymentNotificationBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [manuallyDismissed, setManuallyDismissed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const navigate = useNavigate();
  const { clearDraft, draft, getUserDraftBookings, deleteDraftBooking } =
    useBookingStore();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    const checkDraftBookings = async () => {
      if (!isAuthenticated) {
        setIsVisible(false);
      }
      let draftBooking;
      if (isAuthenticated) draftBooking = await getUserDraftBookings();
      if (draftBooking && draftBooking.created_at && !manuallyDismissed) {
        setIsVisible(true);
      }
    };
    checkDraftBookings();
  }, [getUserDraftBookings, manuallyDismissed, isAuthenticated]);

  useEffect(() => {
    if (!draft || !draft.bookingDetails) return;

    const creationTime = new Date(
      draft.bookingDetails.created_at || draft.created_at,
    ).getTime();
    const expirationTime = creationTime + 6 * 60 * 1000; //6 min.

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const remainingTime = expirationTime - now;

      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      setTimeLeft({ minutes, seconds, total: remainingTime });

      if (
        (minutes <= 1 && !isVisible && !manuallyDismissed) ||
        (remainingTime <= 60000 && manuallyDismissed) // 6min.
      ) {
        setIsVisible(true);
        setManuallyDismissed(false);
      }

      if (remainingTime <= 0) {
        clearInterval(timer);
        setTimeLeft({ minutes: 0, seconds: 0, total: 0 });
        setIsVisible(false);
        setManuallyDismissed(false);
        clearDraft();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [draft, clearDraft, isVisible, manuallyDismissed]);

  const handleConfirmPayment = async () => {
    if (draft && draft.showId && draft.movieId) {
      setIsVisible(false);
      navigate("/booking", {
        state: { show: draft.bookingDetails.show, movieId: draft.movieId },
      });
    }
  };

  const handleCancelBooking = async () => {
    if (!draft || !draft.bookingId) return;

    const result = await deleteDraftBooking(draft.bookingId);
    if (result) {
      setIsVisible(false);
      setManuallyDismissed(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setManuallyDismissed(true);
  };

  const formatTime = (minutes, seconds) => {
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  if (!draft || !isVisible || !timeLeft) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 left-0 right-0 z-50 mx-auto px-4"
        >
          <div className="bg-slate-800 dark:bg-slate-900 text-slate-50 shadow-lg p-4 md:p-6 rounded-b-lg max-w-6xl mx-auto">
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-slate-50 hover:bg-slate-700"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </Button>

            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center mr-4">
                  <img
                    src="/images/logo.png"
                    alt="FilmSphere Logo"
                    className="w-12 h-12 rounded-full"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Complete Your Booking</h3>
                  <p className="text-slate-200">
                    {draft.bookingDetails?.show?.movie?.title ||
                      "Movie Booking"}{" "}
                    -{" "}
                    {new Date(
                      draft.bookingDetails?.show?.date_time,
                    ).toLocaleString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div
                  className={`mr-4 font-mono text-lg ${timeLeft.total <= 60000 ? "text-red-300 animate-pulse" : "text-slate-50"}`}
                >
                  {formatTime(timeLeft.minutes, timeLeft.seconds)}
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleCancelBooking}
                    variant="outline"
                    size="sm"
                    className="text-red-300 border-red-300 hover:bg-red-300 hover:text-slate-900"
                  >
                    Cancel Booking
                  </Button>
                  <Button
                    onClick={handleConfirmPayment}
                    size="sm"
                    className="bg-slate-50 text-slate-900 hover:bg-slate-200"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default PaymentNotificationBanner;
