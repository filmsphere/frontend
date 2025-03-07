import { useState, useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import useAdminStore from "../stores/adminStore";
import useAuthStore from "../stores/authStore";
import ListMovies from "../components/admin/ListMovies";
import ListScreens from "../components/admin/ListScreens";
import ListShows from "../components/admin/ListShows";
import AddMovieForm from "../components/admin/AddMovieForm";
import AddScreenForm from "../components/admin/AddScreenForm";
import AddShowForm from "../components/admin/AddShowForm";
import ManageBookings from "../components/admin/ManageBookings";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Insights from "../components/admin/Insights";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const { tab } = useParams();
  const { isAuthenticated, isAdmin } = useAuthStore();
  const { movies, screens, shows, fetchAllData, loading } = useAdminStore();
  const [activeTab, setActiveTab] = useState(tab || "movies");

  useEffect(() => {
    if (tab && tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [tab, activeTab]);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      if (isAuthenticated && isAdmin && mounted) {
        await fetchAllData();
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [isAuthenticated, isAdmin, fetchAllData]);

  const validTabs = ["movies", "screens", "shows", "bookings"];
  if (!validTabs.includes(activeTab)) {
    return <Navigate to="/admin/insights" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Tab Buttons */}
        <div className="flex flex-wrap sm:flex-row gap-2 mb-8">
          {validTabs.map((tabName) => (
            <Link
              key={tabName}
              to={`/admin/${tabName}`}
              className={`px-4 py-2 rounded transition-colors`}
            >
              <Button variant={activeTab === tabName ? "default" : "outline"}>
                {tabName === "movies" && "Manage Movies"}
                {tabName === "screens" && "Manage Screens"}
                {tabName === "shows" && "Manage Shows"}
                {tabName === "bookings" && "Manage Bookings"}
                {tabName === "insights" && "Insights"}
              </Button>
            </Link>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "movies" && (
          <div className="space-y-8">
            <AddMovieForm />
            <ListMovies movies={movies} />
          </div>
        )}

        {activeTab === "screens" && (
          <div className="space-y-8">
            <AddScreenForm />
            <ListScreens screens={screens} />
          </div>
        )}

        {activeTab === "shows" && (
          <div className="space-y-8">
            <AddShowForm movies={movies} screens={screens} shows={shows} />
            <ListShows shows={shows} />
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-8">
            <ManageBookings shows={shows} />
          </div>
        )}

        {activeTab === "insights" && (
          <div className="space-y-8">
            <Insights />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
