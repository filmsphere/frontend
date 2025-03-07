import { useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import useMovieStore from "../stores/movieStore";
import useAuthStore from "../stores/authStore";
import { formatDate } from "../utils/general";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LoadingSpinner from "../components/common/LoadingSpinner";

const MovieDetails = () => {
  const { movieId } = useParams();
  const { getMovieById, fetchShowsByMovieId, shows, loading, addMessage } =
    useMovieStore();
  const { isAuthenticated, fallbackLogout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const movie = getMovieById(movieId);

  useEffect(() => {
    const fetchData = async () => {
      if (!movie) {
        addMessage("Movie not found.", "error");
        navigate("/", { replace: true });
        return;
      }
      await fetchShowsByMovieId(movieId);
    };
    fetchData();
  }, [
    movieId,
    isAuthenticated,
    fallbackLogout,
    navigate,
    location,
    fetchShowsByMovieId,
    addMessage,
    movie,
  ]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
      <div className="relative w-screen h-[85vh] overflow-hidden">
        <img
          src={movie?.backdrop}
          alt={movie?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto -mt-75 px-8">
        <Card className="bg-opacity-90 backdrop-blur-lg rounded-lg shadow-2xl p-8">
          <CardHeader>
            <CardTitle className="text-4xl md:text-5xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
              {movie?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              {movie?.poster && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full md:w-1/3 h-auto rounded-lg shadow-lg self-start"
                />
              )}
              <div className="flex-1 space-y-6">
                <div className="flex gap-4 flex-wrap">
                  <span className="px-2 py-1 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                    🕒 {Math.floor(movie.duration / 60)}h {movie.duration % 60}m
                  </span>
                </div>
                <p className="text-xl leading-relaxed text-neutral-100 dark:text-neutral-400">
                  {movie?.description}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                      Details
                    </h3>
                    <dl className="space-y-3 text-neutral-600 dark:text-neutral-400">
                      <div>
                        <dt className="font-bold">Release Date:</dt>
                        <dd>{formatDate(movie?.release_datetime)}</dd>
                      </div>
                      <div>
                        <dt className="font-bold">Genres:</dt>
                        <dd>
                          {movie?.genre?.map((g) => g.name).join(", ") || "N/A"}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-bold">Original Language:</dt>
                        <dd>{movie?.language?.name || "N/A"}</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                      More Info
                    </h3>
                    <div className="space-y-3 text-neutral-600 dark:text-neutral-400">
                      {movie?.imdb_id && (
                        <div>
                          <a
                            href={`https://www.imdb.com/title/${movie.imdb_id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            IMDb Page
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Shows Section */}
      <div className="max-w-7xl mx-auto px-8 mt-8">
        <h2 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
          Shows
        </h2>
        {loading ? (
          <LoadingSpinner size="medium" />
        ) : shows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {shows.map((show) => (
              <Card key={show.id} className="p-6 rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50">
                    <div>
                      {new Intl.DateTimeFormat("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(show.date_time))}
                    </div>
                    <div className="text-lg">
                      {new Intl.DateTimeFormat("en-IN", {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }).format(new Date(show.date_time))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-neutral-600 dark:text-neutral-400">
                  <p>
                    <span className="font-bold">Starting Price:</span> 🪙{" "}
                    {show.base_price}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() =>
                      navigate("/booking", { state: { show, movieId } })
                    }
                    className="w-full"
                  >
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-neutral-600 dark:text-neutral-400">
            No shows available
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
