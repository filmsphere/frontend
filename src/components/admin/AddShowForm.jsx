import { useState } from "react";
import useAdminStore from "../../stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFlashMessageStore from "../../stores/flashMessageStore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../assets/styles/date-time-picker.css";
import { isFutureDate } from "../../utils/general";

const AddShowForm = ({ movies, screens, shows }) => {
  const [formData, setFormData] = useState({
    imdb_id: "",
    screen_number: "",
    date_time: null,
    base_price: 0,
  });
  const { addShow, loading } = useAdminStore();
  const { addMessage } = useFlashMessageStore();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.imdb_id) {
      addMessage("Please select a movie.", "error");
      return;
    }

    if (!formData.screen_number) {
      addMessage("Please select a screen.", "error");
      return;
    }

    if (!formData.date_time) {
      addMessage("Please select a date and time.", "error");
      return;
    }

    if (!isFutureDate(formData.date_time)) {
      addMessage("Please select a future date and time.", "error");
      return;
    }

    if (!formData.base_price || Number(formData.base_price) <= 0) {
      addMessage("Please enter a valid positive base price.", "error");
      return;
    }

    const success = await addShow({
      ...formData,
      date_time: new Date(formData.date_time).toISOString(),
    });

    if (success) {
      setFormData({
        imdb_id: "",
        screen_number: "",
        date_time: null,
        base_price: 0,
      });
    }
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date_time: date,
    }));
  };

  const cssLabel =
    "block text-sm font-medium text-neutral-700 dark:text-neutral-300";

  return (
    <div className="p-6 rounded-lg shadow-md bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-4">Create New Show</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className={cssLabel}>Select Movie</Label>
            <Select
              required
              value={formData.imdb_id}
              onValueChange={(value) =>
                setFormData({ ...formData, imdb_id: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a movie" />
              </SelectTrigger>
              <SelectContent>
                {movies.map((movie) => (
                  <SelectItem key={movie.imdb_id} value={movie.imdb_id}>
                    {movie.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className={cssLabel}>Select Screen</Label>
            <Select
              required
              value={formData.screen_number}
              onValueChange={(value) =>
                setFormData({ ...formData, screen_number: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose a screen" />
              </SelectTrigger>
              <SelectContent>
                {screens.map((screen) => (
                  <SelectItem key={screen.number} value={screen.number}>
                    {screen.number}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className={cssLabel}>Date Time</Label>
            <DatePicker
              id="date_time"
              selected={formData.date_time}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={30}
              timeCaption="Time"
              dateFormat="MMMM d, yyyy h:mm aa"
              minDate={new Date()}
              className="w-full p-2 border rounded-md bg-background text-foreground border-border"
              disabled={loading}
            />
          </div>
          <div>
            <Label className={cssLabel}>Base Price</Label>
            <Input
              type="number"
              required
              value={formData.base_price}
              onChange={(e) =>
                setFormData({ ...formData, base_price: e.target.value })
              }
            />
          </div>
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Show"}
        </Button>
      </form>
    </div>
  );
};

export default AddShowForm;
