import { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import SeatGrid from "./SeatGrid";

const BookingProcess = ({
  step,
  layout,
  selectedSeats,
  basePrice,
  balance,
  onSeatClick,
}) => {
  const seatTypes = useMemo(
    () => ({
      standard: {
        price: basePrice,
        color: "bg-blue-600 text-white dark:bg-blue-500",
      },
      premium: {
        price: basePrice * 1.5,
        color: "bg-amber-600 text-white dark:bg-amber-500",
      },
      vip: {
        price: basePrice * 2,
        color: "bg-purple-600 text-white dark:bg-purple-500",
      },
      disabled: { price: 0, color: "bg-gray-500 text-white dark:bg-gray-600" },
    }),
    [basePrice],
  );

  const calculateTotal = useMemo(
    () =>
      selectedSeats.reduce((sum, seat) => sum + seatTypes[seat.type].price, 0),
    [selectedSeats, seatTypes],
  );

  useEffect(() => {
    if (step === 2) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [step]);

  return (
    <div className="space-y-8">
      {/* Seat Selection */}
      {step === 1 && (
        <Card className="p-2 sm:p-6">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-center text-neutral-900 dark:text-neutral-50">
              Select Your Seats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 px-2 sm:px-6">
            {/* Screen Visualization */}
            <div className="relative">
              <div className="w-full h-8 sm:h-12 rounded-t-lg shadow-inner flex items-center justify-center text-sm sm:text-base font-semibold bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                Screen
              </div>
              <div
                className="absolute inset-x-0 bottom-0 h-1 bg-blue-500"
                style={{ boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.5)" }}
              />
            </div>
  
            {/* Seat Grid */}
            <SeatGrid
              layout={layout}
              selectedSeats={selectedSeats}
              onSeatClick={onSeatClick}
              seatTypes={seatTypes}
            />
  
            {/* Seat Legend */}
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              {Object.entries(seatTypes).map(([type, { price, color }]) => {
                if (type !== "disabled") {
                  return (
                    <div key={type} className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full ${color}`}
                      ></div>
                      <span className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
                        {type.charAt(0).toUpperCase() + type.slice(1)} (🪙
                        {price})
                      </span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </CardContent>
        </Card>
      )}
  
      {/* Payment Section */}
      {step === 2 && (
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
              Payment Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Selected Seats:
                </span>
                <span className="font-medium text-neutral-600 dark:text-neutral-400">
                  {selectedSeats.map((seat) => seat.id).join(", ")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600 dark:text-neutral-400">
                  Total Cost:
                </span>
                <span className="font-bold text-neutral-900 dark:text-neutral-50">
                  🪙{calculateTotal}
                </span>
              </div>
              <div className="flex justify-between text-green-600 dark:text-green-400">
                <span>Your Balance:</span>
                <span>🪙{balance}</span>
              </div>
              <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                <span>Remaining Balance:</span>
                <span>🪙{balance - calculateTotal}</span>
              </div>
            </div>
            {balance < calculateTotal && (
              <div className="mt-4 text-sm text-red-600 dark:text-red-400">
                Insufficient balance. Please select fewer seats or add more
                coins.
              </div>
            )}
            <div className="mt-4 text-sm text-center">
              Note: You have 5 min. to confirm your booking
            </div>
          </CardContent>
        </Card>
      )}
  
      {/* Selected Seats Preview */}
      {selectedSeats.length > 0 && step === 1 && (
        <Card className="p-4">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-neutral-900 dark:text-neutral-50">
              Selected Seats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {selectedSeats.map((seat) => (
                <Badge
                  key={seat.id}
                  className={`px-3 py-1 ${seatTypes[seat.type].color} text-neutral-900 dark:text-neutral-50`}
                >
                  {seat.id} (🪙{seatTypes[seat.type].price})
                </Badge>
              ))}
            </div>
            <div className="mt-4 font-bold text-neutral-900 dark:text-neutral-50">
              Total: 🪙{calculateTotal}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

BookingProcess.propTypes = {
  step: PropTypes.number.isRequired,
  layout: PropTypes.array.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  basePrice: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
  onSeatClick: PropTypes.func.isRequired,
};

export default BookingProcess;
