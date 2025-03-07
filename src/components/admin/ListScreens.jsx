import { useState } from "react";
import useAdminStore from "../../stores/adminStore";
import useThemeStore from "../../stores/themeStore";
import LoadingSpinner from "../common/LoadingSpinner";
import Modal from "../common/Modal";

const ListScreens = () => {
  const { screens, deleteScreen, loading } = useAdminStore();
  const { seatColors } = useThemeStore();
  const [expandedScreen, setExpandedScreen] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [screenToDelete, setScreenToDelete] = useState(null);

  const handleDelete = (screenId) => {
    setShowDeleteModal(true);
    setScreenToDelete(screenId);
  };

  const handleDeleteConfirm = async () => {
    if (screenToDelete) {
      await deleteScreen(screenToDelete);
      setShowDeleteModal(false);
      setScreenToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setScreenToDelete(null);
  };

  const toggleLayout = (id) => {
    setExpandedScreen(expandedScreen === id ? null : id);
  };

  const filteredScreens = screens.filter((screen) =>
    screen.number.toString().toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 rounded-lg shadow-md bg-background text-foreground transition-colors duration-300">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight">All Screens</h2>
        <input
          type="text"
          placeholder="Search by screen number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2 px-3 py-1 border rounded-md w-full bg-background border-neutral-300 dark:border-neutral-700 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {filteredScreens.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No screens found
            </div>
          ) : (
            filteredScreens.map((screen) => (
              <div
                key={screen.number}
                className="border rounded-md border-neutral-300 dark:border-neutral-700"
              >
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="font-semibold tracking-wide">
                      Screen {screen.number}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {screen.layout.rows.length} rows |{" "}
                      {screen.layout.rows.reduce(
                        (acc, row) => acc + row.seats.length,
                        0,
                      )}{" "}
                      seats
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => toggleLayout(screen.number)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {expandedScreen === screen.number
                        ? "Hide Layout"
                        : "View Layout"}
                    </button>
                    <button
                      onClick={() => handleDelete(screen.number)}
                      disabled={loading}
                      className="px-3 py-1 rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300 transition-colors disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {expandedScreen === screen.number && (
                  <div className="p-4 border-t bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700">
                    <h4 className="font-medium mb-2 tracking-wide">
                      Seat Layout
                    </h4>
                    <div className="overflow-x-auto whitespace-nowrap p-2 scrollbar-hide smooth-scroll">
                      <div className="inline-flex flex-col space-y-2">
                        {screen.layout.rows.map((row) => (
                          <div
                            key={row.row_label}
                            className="flex items-center space-x-2"
                          >
                            <span className="font-medium w-8 text-center text-foreground">
                              {row.row_label}
                            </span>
                            <div className="flex gap-2">
                              {row.seats.map((seat) => (
                                <span
                                  key={seat.id}
                                  className={`w-9 h-9 text-center flex justify-center items-center rounded transition-colors ${
                                    seatColors[seat.type]?.dark
                                  } dark:${seatColors[seat.type]?.dark}`}
                                >
                                  {seat.id}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex flex-wrap gap-4 mt-2">
                        <span
                          className={`px-2 py-1 ${seatColors.vip?.dark} dark:${seatColors.vip?.dark} rounded`}
                        >
                          VIP
                        </span>
                        <span
                          className={`px-2 py-1 ${seatColors.standard?.dark} dark:${seatColors.standard?.dark} rounded`}
                        >
                          Standard
                        </span>
                        <span
                          className={`px-2 py-1 ${seatColors.premium?.dark} dark:${seatColors.premium?.dark} rounded`}
                        >
                          Premium
                        </span>
                        <span
                          className={`px-2 py-1 ${seatColors.disabled?.dark} dark:${seatColors.disabled?.dark} rounded`}
                        >
                          Disabled
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Delete Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={handleCancelDelete}
        title="Confirm Delete"
        footer={
          <>
            <button
              onClick={handleCancelDelete}
              disabled={loading}
              className="px-4 py-2 rounded-md text-sm font-medium bg-neutral-200 dark:bg-neutral-700 text-foreground hover:bg-neutral-300 dark:hover:bg-neutral-600 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteConfirm}
              disabled={loading}
              className="px-4 py-2 rounded-md text-sm font-medium bg-red-500 dark:bg-red-600 text-white hover:bg-red-600 dark:hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </>
        }
      >
        <p className="text-muted-foreground">
          Are you sure you want to delete the Screen "
          {screens.find((m) => m.number === screenToDelete)?.number ||
            "Unknown"}
          "?
        </p>
      </Modal>
    </div>
  );
};

export default ListScreens;
