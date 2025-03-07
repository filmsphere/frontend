import { useState } from "react";
import useThemeStore from "../../stores/themeStore";

const SeatLayoutEditor = ({ onLayoutChange }) => {
  const { darkMode, seatColors } = useThemeStore();
  const [selectedType, setSelectedType] = useState("standard");
  const [layout, setLayout] = useState(() => {
    const initialRows = 5;
    const initialCols = 10;
    return Array.from({ length: initialRows }, (_, i) => {
      const rowLabel = String.fromCharCode(65 + i);
      return {
        row: rowLabel,
        seats: Array.from({ length: initialCols }, (_, j) => ({
          id: `${rowLabel}${j + 1}`,
          type: "standard",
          row: rowLabel,
          number: j + 1,
          x: j,
          y: i,
        })),
      };
    });
  });
  const [isDragging, setIsDragging] = useState(false);

  const colsCount = layout[0]?.seats.length || 0;

  const handleSeatClick = (rowIndex, seatIndex) => {
    setLayout((prev) => {
      const updatedLayout = prev.map((row, rIdx) =>
        rIdx === rowIndex
          ? {
              ...row,
              seats: row.seats.map((seat, sIdx) =>
                sIdx === seatIndex ? { ...seat, type: selectedType } : seat,
              ),
            }
          : row,
      );
      onLayoutChange(updatedLayout);
      return updatedLayout;
    });
  };

  const modifyRows = (action) => {
    setLayout((prev) => {
      const currentCols = prev[0]?.seats.length || 0;
      if (action === "add") {
        const newRowLabel = String.fromCharCode(65 + prev.length);
        return [
          ...prev,
          {
            row: newRowLabel,
            seats: Array.from({ length: currentCols }, (_, j) => ({
              id: `${newRowLabel}${j + 1}`,
              type: "standard",
              row: newRowLabel,
              number: j + 1,
              x: j,
              y: prev.length,
            })),
          },
        ];
      } else if (action === "remove" && prev.length > 1) {
        return prev.slice(0, -1);
      }
      return prev;
    });
  };

  const modifyColumns = (action) => {
    setLayout((prev) => {
      if (action === "add") {
        return prev.map((row) => ({
          ...row,
          seats: [
            ...row.seats,
            {
              id: `${row.row}${row.seats.length + 1}`,
              type: "standard",
              row: row.row,
              number: row.seats.length + 1,
              x: row.seats.length,
              y: row.y,
            },
          ],
        }));
      } else if (action === "remove" && colsCount > 1) {
        return prev.map((row) => ({
          ...row,
          seats: row.seats.slice(0, -1),
        }));
      }
      return prev;
    });
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseEnter = (rowIndex, seatIndex) => {
    if (!isDragging) return;
    handleSeatClick(rowIndex, seatIndex);
  };

  const saveLayout = () => {
    const json = JSON.stringify(layout, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seat_layout.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadLayout = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const loadedLayout = JSON.parse(e.target.result);
        setLayout(loadedLayout);
      } catch (err) {
        console.error("Invalid JSON format");
      }
    };
    reader.readAsText(file);
  };

  const resetLayout = () => {
    const initialRows = 5;
    const initialCols = 10;
    const newLayout = Array.from({ length: initialRows }, (_, i) => {
      const rowLabel = String.fromCharCode(65 + i);
      return {
        row: rowLabel,
        seats: Array.from({ length: initialCols }, (_, j) => ({
          id: `${rowLabel}${j + 1}`,
          type: "standard",
          row: rowLabel,
          number: j + 1,
          x: j,
          y: i,
        })),
      };
    });
    setLayout(newLayout);
  };

  return (
    <div className="p-2 sm:p-6 rounded-lg">
      <div className="flex flex-wrap gap-4 mb-4">
        <button
          type="button"
          onClick={saveLayout}
          className="px-3 py-1 bg-gray-600 text-white rounded cursor-pointer"
        >
          Save Layout
        </button>
        <input
          type="file"
          onChange={loadLayout}
          className="hidden"
          id="layoutFile"
        />
        <label
          htmlFor="layoutFile"
          className="px-3 py-1 bg-gray-600 text-white rounded cursor-pointer"
        >
          Load Layout
        </label>
        <button
          type="button"
          onClick={resetLayout}
          className="px-3 py-1 bg-gray-600 text-white rounded cursor-pointer"
        >
          Reset Layout
        </button>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <button
          type="button"
          onClick={() => modifyRows("add")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add Row
        </button>
        <button
          type="button"
          onClick={() => modifyRows("remove")}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Remove Row
        </button>
        <button
          type="button"
          onClick={() => modifyColumns("add")}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add Column
        </button>
        <button
          type="button"
          onClick={() => modifyColumns("remove")}
          className="px-3 py-1 bg-red-600 text-white rounded"
        >
          Remove Column
        </button>
      </div>

      <div className="mb-4 flex gap-2 flex-wrap">
        {Object.entries(seatColors).map(([key, { light, dark }]) => (
          <button
            type="button"
            key={key}
            onClick={() => setSelectedType(key)}
            className={`px-3 py-1 rounded ${
              selectedType === key ? "ring-2 ring-offset-2" : ""
            } ${darkMode ? dark : light}`}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </button>
        ))}
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Note: Select a seat type, then click and drag over seats to change
          their type.
        </p>
      </div>

      {/* Screen Visualization */}
      <div className="relative mb-6 sm:mb-8">
        <div
          className={`w-full h-8 sm:h-12 rounded-t-lg shadow-inner flex items-center justify-center text-sm sm:text-base font-semibold ${
            darkMode ? "bg-gray-800 text-gray-300" : "bg-gray-300 text-gray-700"
          }`}
        >
          Screen
        </div>
        <div
          className={`absolute inset-x-0 bottom-0 h-1 ${
            darkMode ? "bg-blue-500" : "bg-blue-600"
          }`}
          style={{ boxShadow: "0 0 10px 2px rgba(59, 130, 246, 0.5)" }}
        />
      </div>
      <div
        className={`p-4 rounded-lg ${darkMode ? "bg-neutral-900" : "bg-neutral-100"} overflow-x-auto`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      >
        <div
          className="grid gap-2"
          style={{ gridTemplateColumns: `repeat(${colsCount + 1}, auto)` }}
        >
          {layout.map((row, rowIndex) => (
            <>
              <div
                key={row.row}
                className="flex items-center justify-center font-bold"
              >
                {row.row}
              </div>
              {row.seats.map((seat, seatIndex) => (
                <button
                  type="button"
                  key={seat.id}
                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                  onMouseEnter={() => handleMouseEnter(rowIndex, seatIndex)}
                  className={`w-10 h-10 rounded-md flex items-center justify-center text-xs border border-gray-600 transition-transform transform hover:scale-110 hover:ring-2 ${
                    seatColors[seat.type][darkMode ? "dark" : "light"]
                  } ${seat.type === "disabled" ? "opacity-60" : "opacity-100"}`}
                  title={`${seat.id} - ${
                    seatColors[seat.type].name || seat.type
                  }`}
                >
                  {seat.id}
                </button>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeatLayoutEditor;
