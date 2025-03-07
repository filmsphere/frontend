import { useState } from "react";
import { Link } from "react-router-dom";
import useAdminStore from "../../stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "../common/LoadingSpinner";
import Modal from "../common/Modal";
import { cn } from "@/lib/utils";

const ListMovies = () => {
  const { movies, deleteMovie, loading } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [movieToDelete, setMovieToDelete] = useState(null);

  const handleDelete = (movieId) => {
    setShowDeleteModal(true);
    setMovieToDelete(movieId);
  };

  const handleDeleteConfirm = async () => {
    if (movieToDelete) {
      await deleteMovie(movieToDelete);
      setShowDeleteModal(false);
      setMovieToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setMovieToDelete(null);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 rounded-lg shadow-md bg-background text-foreground">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">All Movies</h2>
        <Input
          type="text"
          placeholder="Search by movie title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2"
        />
      </div>

      {loading ? (
        <LoadingSpinner size="medium" />
      ) : (
        <div className="space-y-4">
          {filteredMovies.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No movies found
            </div>
          ) : (
            filteredMovies.map((movie) => (
              <div
                key={movie.imdb_id}
                className={cn(
                  "flex items-center justify-between p-4 border rounded-md transition-colors",
                  "border-border",
                  "hover:bg-secondary/50",
                )}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-16 h-24 object-cover rounded"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <Link to={`/movie/${movie.imdb_id}`}>
                      <h3 className="font-semibold">{movie.title}</h3>
                    </Link>
                    <p className="text-sm text-muted-foreground">
                      {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                      | {movie.language.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Genres: {movie.genre.map((g) => g.name).join(", ")}
                    </p>
                    <a
                      href={movie.imdb_page}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:underline"
                    >
                      IMDb Page
                    </a>
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(movie.imdb_id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            ))
          )}
        </div>
      )}

      {/* delete modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        title="Confirm Delete"
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCancelDelete}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteConfirm}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </>
        }
      >
        <p className="text-muted-foreground">
          Are you sure you want to delete the movie "
          {movies.find((m) => m.imdb_id === movieToDelete)?.title || "Unknown"}
          "?
        </p>
      </Modal>
    </div>
  );
};

export default ListMovies;
