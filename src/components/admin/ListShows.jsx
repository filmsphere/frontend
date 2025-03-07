import { useState } from "react";
import { Link } from "react-router-dom";
import useAdminStore from "../../stores/adminStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import LoadingSpinner from "../common/LoadingSpinner";
import Modal from "../common/Modal";
import { cn } from "@/lib/utils";

const ListShows = () => {
  const { shows, deleteShow, loading } = useAdminStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToDelete, setShowToDelete] = useState(null);

  const handleDelete = (showId) => {
    setShowDeleteModal(true);
    setShowToDelete(showId);
  };

  const handleDeleteConfirm = async () => {
    if (showToDelete) {
      await deleteShow(parseInt(showToDelete, 10));
      setShowDeleteModal(false);
      setShowToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setShowToDelete(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const filteredShows = shows.filter((show) =>
    show.movie.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const showToDeleteData = shows.find((s) => s.id === showToDelete);

  return (
    <div className="p-6 rounded-lg shadow-md bg-background text-foreground">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">All Shows</h2>
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
          {filteredShows.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No shows scheduled
            </div>
          ) : (
            filteredShows.map((show) => (
              <div
                key={show.id}
                className={cn(
                  "flex items-center justify-between p-4 border rounded-md hover:bg-secondary/50 transition-colors",
                  "border-border",
                )}
              >
                <div>
                  <Link to={`/admin/show/${show.id}`}>
                    <h3 className="font-semibold">{show.movie.title}</h3>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    Screen: {show.screen.number}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(show.date_time)}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(show.id)}
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
          Are you sure you want to delete the show for movie "
          {showToDeleteData?.movie.title || "Unknown"}" on Screen "
          {showToDeleteData?.screen.number || "Unknown"} at "
          {formatDate(showToDeleteData?.date_time) || "Unknown Time"}?
        </p>
      </Modal>
    </div>
  );
};

export default ListShows;
