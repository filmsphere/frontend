import { useState } from "react";
import useAdminStore from "../../stores/adminStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "../common/LoadingSpinner";
import { isValidUrl } from "../../utils/validations";

const AddMovieForm = () => {
  const [formData, setFormData] = useState({
    imdb_id: "",
    title: "",
    description: "",
    duration: "",
    poster: "",
    release_datetime: "",
    backdrop: "",
    genre: "",
    language: "",
  });
  const { addMovie, loading, addMessage } = useAdminStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await addMovie({
      imdb_id: formData.imdb_id.startsWith("tt")
        ? formData.imdb_id
        : `tt${formData.imdb_id}`,
      title: formData.title,
      description: formData.description,
      duration: parseInt(formData.duration),
      poster: formData.poster,
      release_datetime: formData.release_datetime,
      backdrop: formData.backdrop,
      genre: formData.genre
        .split(",")
        .map((g, index) => ({ id: index, name: g.trim() })),
      language: { id: 0, name: formData.language },
      imdb_page: `https://www.imdb.com/title/${
        formData.imdb_id.startsWith("tt")
          ? formData.imdb_id
          : `tt${formData.imdb_id}`
      }`,
    });

    if (success) {
      setFormData({
        imdb_id: "",
        title: "",
        description: "",
        duration: "",
        poster: "",
        release_datetime: "",
        backdrop: "",
        genre: "",
        language: "",
      });
    }
  };

  const validateForm = () => {
    if (!formData.imdb_id) {
      addMessage("IMDb ID is required.", "error");
      return false;
    }
    if (!formData.imdb_id.startsWith("tt")) {
      addMessage(
        "IMDb ID must start with 'tt'",
        "error",
      );
      return false;
    }
    if (!formData.title) {
      addMessage("Title is required.", "error");
      return false;
    }
    if (!formData.description) {
      addMessage("Description is required.", "error");
      return false;
    }
    if (!formData.duration || parseInt(formData.duration) <= 0) {
      addMessage("Duration must be a positive number.", "error");
      return false;
    }
    if (!formData.release_datetime) {
      addMessage("Release date is required.", "error");
      return false;
    }
    if (!formData.poster || !isValidUrl(formData.poster)) {
      addMessage("Valid poster URL is required.", "error");
      return false;
    }
    if (!formData.backdrop || !isValidUrl(formData.backdrop)) {
      addMessage("Valid backdrop URL is required.", "error");
      return false;
    }
    if (!formData.genre) {
      addMessage("Genres are required (comma-separated).", "error");
      return false;
    }
    if (!formData.language) {
      addMessage("Language is required.", "error");
      return false;
    }
    return true;
  };

  return (
    <div className="p-6 rounded-lg shadow-md bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-4">Add New Movie</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Movie IMDb ID (e.g., tt1234567)</Label>
            <Input
              type="text"
              required
              placeholder="e.g., tt1234567"
              value={formData.imdb_id}
              onChange={(e) =>
                setFormData({ ...formData, imdb_id: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Duration (minutes)</Label>
            <Input
              type="number"
              required
              min="1"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Release Date</Label>
            <Input
              type="date"
              required
              value={formData.release_datetime}
              onChange={(e) =>
                setFormData({ ...formData, release_datetime: e.target.value })
              }
            />
          </div>
          <div className="md:col-span-2">
            <Label>Description</Label>
            <textarea
              required
              className="w-full p-2 border rounded-md h-32 bg-background text-foreground border-border"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Poster URL</Label>
            <Input
              type="url"
              required
              placeholder="e.g., https://example.com/poster.jpg"
              value={formData.poster}
              onChange={(e) =>
                setFormData({ ...formData, poster: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Backdrop URL</Label>
            <Input
              type="url"
              required
              placeholder="e.g., https://example.com/backdrop.jpg"
              value={formData.backdrop}
              onChange={(e) =>
                setFormData({ ...formData, backdrop: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Genres (comma-separated)</Label>
            <Input
              type="text"
              required
              placeholder="e.g., Action, Drama, Sci-Fi"
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
            />
          </div>
          <div>
            <Label>Language</Label>
            <Input
              type="text"
              required
              placeholder="e.g., English"
              value={formData.language}
              onChange={(e) =>
                setFormData({ ...formData, language: e.target.value })
              }
            />
          </div>
        </div>
        <Button type="submit" disabled={loading} className="mt-4">
          {loading ? <LoadingSpinner size="small" /> : "Add Movie"}
        </Button>
      </form>
    </div>
  );
};

export default AddMovieForm;
