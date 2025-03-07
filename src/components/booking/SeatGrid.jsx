import PropTypes from "prop-types";

const SeatGrid = ({ layout, selectedSeats, onSeatClick, seatTypes }) => {
  if (!layout || layout.length === 0) {
    return (
      <div className="col-span-full text-center text-neutral-600 dark:text-neutral-400">
        No seats available
      </div>
    );
  }

  return (
    <div className="overflow-x-auto p-4">
      <div
        className="grid gap-2 sm:gap-3 mx-auto"
        style={{
          gridTemplateColumns: `repeat(${layout[0].seats.length}, minmax(2rem, 1fr))`,
          minWidth: `${layout[0].seats.length * 2.5}rem`,
        }}
      >
        {layout.map((row) =>
          row.seats.map((seat) => {
            const isSelected = selectedSeats.some((s) => s.id === seat.id);
            const isBooked = seat.state === "booked";
            const isLocked = seat.state === "locked";
            const isDisabled = isBooked || isLocked;
            const isNotSeat = seat.type === "disabled";
            const seatColor = seatTypes[seat.type].color;

            return (
              <button
                key={seat.id}
                onClick={() => onSeatClick(seat)}
                disabled={isDisabled || isNotSeat}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-md flex items-center justify-center text-xs sm:text-sm font-medium border-2 transition-all duration-200 ${
                  isNotSeat
                    ? "cursor-not-allowed opacity-0"
                    : isDisabled
                      ? "cursor-not-allowed opacity-10"
                      : "cursor-pointer hover:scale-110 hover:shadow-lg"
                } ${
                  isSelected
                    ? "ring-2 ring-green-500 dark:ring-green-400 scale-105"
                    : "shadow-md"
                } ${seatColor} border-transparent`}
                aria-label={`${seat.id} - ${
                  isBooked
                    ? "Booked"
                    : `${seatTypes[seat.type].price} coins, ${
                        isDisabled ? "unavailable" : "available"
                      }`
                }`}
              ></button>
            );
          }),
        )}
      </div>
    </div>
  );
};

SeatGrid.propTypes = {
  layout: PropTypes.array.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  onSeatClick: PropTypes.func.isRequired,
  seatTypes: PropTypes.object.isRequired,
};

export default SeatGrid;
