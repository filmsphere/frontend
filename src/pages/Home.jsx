import { useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Search } from "lucide-react";
import useAuthStore from "../stores/authStore";
import useMovieStore from "../stores/movieStore";
import useBookingStore from "../stores/bookingStore";
import useFlashMessageStore from "../stores/flashMessageStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MovieCard from "../components/movie/MovieCard";
import LoadingSpinner from "../components/common/LoadingSpinner";

const Home = () => {
  const { movies, loading, fetchMovies } = useMovieStore();
  const { isAuthenticated } = useAuthStore();
  const { addMessage } = useFlashMessageStore();
  const { draft } = useBookingStore();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("all"); // Default to "all"
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);

  const genres = Array.from(
    new Set(movies.flatMap((movie) => movie.genre.map((g) => g.name))),
  ).sort();
  const languages = Array.from(
    new Set(movies.map((movie) => movie.language?.name).filter(Boolean)),
  ).sort();

  useEffect(() => {
    if (isAuthenticated) {
      fetchMovies();
    }
  }, [isAuthenticated, fetchMovies]);

  const handleContinueBooking = () => {
    if (draft && draft.showId && draft.movieId) {
      navigate("/booking", {
        state: { show: draft.bookingDetails.show, movieId: draft.movieId },
      });
    } else {
      addMessage({
        message: "Show not found. Please start a new booking.",
        type: "error",
      });
    }
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesQuery = movie.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLanguage =
      selectedLanguage === "all" || movie.language?.name === selectedLanguage;
    const matchesGenres =
      selectedGenres.length === 0 ||
      movie.genre.some((g) => selectedGenres.includes(g.name));
    return matchesQuery && matchesLanguage && matchesGenres;
  });

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre],
    );
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="container mx-auto px-4 py-8 relative">
        {isAuthenticated ? (
          <>
            {/* Continue Booking */}
            {draft && draft?.bookingId && (
              <div className="w-full sm:w-auto sm:absolute sm:top-8 sm:left-4 mb-6 sm:mb-0 flex justify-center sm:justify-start">
                <Button onClick={handleContinueBooking}>
                  Continue Your Booking
                </Button>
              </div>
            )}

            <h1 className="text-3xl font-bold mb-8 text-center text-neutral-900 dark:text-neutral-50">
              Movies
            </h1>

            {/* Search Button */}
            <div className="w-full sm:w-auto sm:absolute sm:top-8 sm:right-4 mb-6 sm:mb-0 flex justify-center sm:justify-end">
              <Button
                variant="outline"
                onClick={() => setShowSearch(!showSearch)}
                className="flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                {showSearch ? "Hide Filters" : "Search & Filter"}
              </Button>
            </div>

            {/* Search Options */}
            {showSearch && (
              <div className="mb-8 p-4 rounded-lg shadow-md bg-white dark:bg-neutral-900 transition-all duration-300 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 dark:text-neutral-400" />
                  <Input
                    type="text"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="w-full sm:w-48">
                  <Select
                    value={selectedLanguage}
                    onValueChange={setSelectedLanguage}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Languages" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Languages</SelectItem>
                      {languages.map((lang) => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full sm:w-48 relative">
                  <Button
                    variant="outline"
                    onClick={() => setShowGenreDropdown(!showGenreDropdown)}
                    className="w-full justify-between"
                  >
                    {selectedGenres.length > 0
                      ? `${selectedGenres.length} Genres`
                      : "Genres"}
                    <span>{showGenreDropdown ? "▲" : "▼"}</span>
                  </Button>
                  {showGenreDropdown && (
                    <div className="absolute z-10 mt-2 w-full rounded-lg shadow-lg bg-white dark:bg-neutral-900 max-h-60 overflow-y-auto border border-neutral-200 dark:border-neutral-700">
                      {genres.map((genre) => (
                        <label
                          key={genre}
                          className="flex items-center px-4 py-2 text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        >
                          <input
                            type="checkbox"
                            checked={selectedGenres.includes(genre)}
                            onChange={() => toggleGenre(genre)}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-neutral-300 dark:border-neutral-600 rounded"
                          />
                          {genre}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center items-center min-h-[50vh]">
                <LoadingSpinner size="large" />
              </div>
            ) : filteredMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredMovies.map((movie) => (
                  <MovieCard key={movie.imdb_id} movie={movie} />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg text-neutral-600 dark:text-neutral-400">
                No movies available.
              </p>
            )}
          </>
        ) : (
          <Navigate to="/landing" />
        )}
      </div>
    </div>
  );
};

export default Home;
