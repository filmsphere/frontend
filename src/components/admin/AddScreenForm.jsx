import { useState } from "react";
import useAdminStore from "../../stores/adminStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import SeatLayoutEditor from "./SeatLayoutEditor";
import useFlashMessageStore from "../../stores/flashMessageStore";

const AddScreenForm = () => {
  const { addScreen, loading } = useAdminStore();
  const [screenNumber, setScreenNumber] = useState("");
  const [layout, setLayout] = useState([]);
  const { addMessage } = useFlashMessageStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await addScreen({
      number: screenNumber,
      layout: {
        rows: layout.map((row) => ({
          row_label: row.row,
          seats: row.seats.map((seat) => ({
            id: seat.id,
            type: seat.type,
          })),
        })),
      },
    });
    if (success) {
      setScreenNumber("");
      setLayout([]);
    }
  };

  const validateForm = () => {
    if (!screenNumber.trim()) {
      addMessage("Please enter a screen number!", "error");
      return false;
    }
    if (isNaN(parseInt(screenNumber))) {
      addMessage("Screen number must be a valid number.", "error");
      return false;
    }
    if (!layout || layout.length === 0) {
      addMessage("Please create a valid seat layout first!", "error");
      return false;
    }
    return true;
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-4">Add New Screen</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Screen Number Input */}
        <div>
          <Label>Screen Number</Label>
          <Input
            type="text"
            required
            value={screenNumber}
            onChange={(e) => setScreenNumber(e.target.value)}
            placeholder="Enter screen number"
          />
        </div>

        {/* Seat Layout Editor */}
        <SeatLayoutEditor onLayoutChange={setLayout} />

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Screen"}
        </Button>
      </form>
    </div>
  );
};

export default AddScreenForm;
