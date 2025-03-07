import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useBookingStore from "../stores/bookingStore";
import useMovieStore from "../stores/movieStore";
import useAuthStore from "../stores/authStore";
import { Button } from "@/components/ui/button";
import BookingProcess from "../components/booking/BookingProcess";

const BookingPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const {
    clearDraft,
    createBooking,
    deleteDraftBooking,
    confirmBooking,
    draft,
    updateDraft,
    loading,
  } = useBookingStore();
  const { balance } = useAuthStore();
  const { fetchShowSeats, seatsByShow, getMovieById } = useMovieStore();

  const [step, setStep] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [layout, setLayout] = useState([]);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loadedSeats, setLoadedSeats] = useState(false);
  const show = state?.show || null;
  const movie = getMovieById(state?.movieId) || null;

  const [isDraftRestored, setIsDraftRestored] = useState(false);

  useEffect(() => {
    if (!show) {
      navigate("/");
      return;
    }
    const loadSeatData = async () => {
      if (!loadedSeats) {
        const success = await fetchShowSeats(show.id);
        if (!success) {
          navigate(-1);
          return;
        } else setLoadedSeats(true);
      }
      const seats = seatsByShow[show.id] || [];
      transformLayout(seats);
    };
    loadSeatData();
  }, [fetchShowSeats, seatsByShow, navigate, show, loadedSeats]);

  useEffect(() => {
    if (show && !isDraftRestored) {
      if (!draft) {
        setIsDraftRestored(true);
      } else if (draft.showId === show.id) {
        setSelectedSeats(draft.seats);
        setStep(2);
        setBookingDetails(draft.bookingDetails);
        setIsDraftRestored(true);
      }
    }
  }, [show, draft, isDraftRestored]);

  const transformLayout = (seats) => {
    const rows = {};
    seats.forEach((seat) => {
      if (!rows[seat.row]) rows[seat.row] = [];
      rows[seat.row].push({ ...seat, number: seat.col });
    });
    const transformed = Object.entries(rows)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([rowLabel, seats]) => ({
        row: rowLabel,
        seats: seats.sort((a, b) => a.col - b.col),
      }));
    setLayout(transformed);
  };

  const handleSeatSelection = (seat) => {
    if (seat.state === "booked") return;
    setSelectedSeats((prev) => {
      const newSeats = prev.some((s) => s.id === seat.id)
        ? prev.filter((s) => s.id !== seat.id)
        : [...prev, seat];
      if (show && !draft) {
        updateDraft({
          showId: show.id,
          movieId: movie.imdb_id,
          seats: newSeats,
        });
      }
      return newSeats;
    });
  };

  const handleNextStep = async () => {
    if (step !== 1 || selectedSeats.length === 0) return;
    const creationResponse = await createBooking({
      showId: show.id,
      movieId: movie.imdb_id,
      selectedSeats,
    });
    if (creationResponse) {
      setBookingDetails(creationResponse);
      setStep(2);
    }
  };

  const handleBookingSubmit = async () => {
    if (step !== 2 || !bookingDetails) return;
    const confirmationResponse = await confirmBooking({
      draftBookingId: bookingDetails.id,
      totalPrice: bookingDetails.total_price,
    });
    navigate("/booking-confirmation", {
      state: {
        bookingId: confirmationResponse.id,
        totalPrice: bookingDetails.total_price,
      },
    });
  };

  const handleDeleteDraft = async () => {
    if (!bookingDetails || !bookingDetails.id) return;
    await deleteDraftBooking(bookingDetails.id);
    setStep(1);
  };

  const handleCancel = () => {
    clearDraft();
    navigate(-1);
  };

  return (
    <div className="min-h-screen p-4 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-neutral-900 dark:text-neutral-50">
          Booking: {movie?.title}
        </h1>

        <BookingProcess
          step={step}
          layout={layout}
          selectedSeats={selectedSeats}
          basePrice={show?.base_price}
          balance={balance}
          onSeatClick={handleSeatSelection}
        />

        <div className="flex justify-between mt-8">
          <Button
            onClick={() => (step > 1 ? handleDeleteDraft() : handleCancel())}
            variant="outline"
          >
            Cancel
          </Button>

          {step === 1 ? (
            <Button
              onClick={handleNextStep}
              disabled={selectedSeats.length === 0 || loading}
            >
              {loading ? "Reserving..." : "Continue to Payment"}
            </Button>
          ) : (
            <Button onClick={handleBookingSubmit} disabled={loading}>
              {loading ? "Processing..." : "Confirm Payment"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
