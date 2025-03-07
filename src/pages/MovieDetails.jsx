import { useEffect, useState, useRef } from "react";
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
  const imgRef = useRef(null);

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
        {movie?.backdrop && (
          <img
            ref={imgRef}
            src={movie.backdrop}
            alt={movie?.title}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      </div>
      <div className="relative max-w-7xl mx-auto -mt-75 px-4 md:px-8">
        <Card className="bg-opacity-90 backdrop-blur-lg rounded-lg shadow-2xl p-4 md:p-8 mx-auto max-w-7xl">
          <CardHeader>
            <CardTitle className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-neutral-50 text-center md:text-left">
              {movie?.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 md:flex-row md:gap-8 mx-auto max-w-6xl">
              {movie?.poster && (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full md:w-1/3 h-auto rounded-lg shadow-lg"
                />
              )}
              <div className="flex-1 space-y-4 md:space-y-6">
                <div className="flex gap-2 md:gap-4 flex-wrap">
                  <span className="px-2 py-1 rounded-md bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300">
                    🕒 {Math.floor(movie?.duration / 60)}h{" "}
                    {movie?.duration % 60}m
                  </span>
                </div>

                <div className="bg-black/75 dark:bg-black/75 p-4 rounded-md backdrop-blur-sm">
                  <p className="text-base md:text-xl leading-relaxed text-white">
                    {movie?.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                      Details
                    </h3>
                    <dl className="space-y-2 md:space-y-3 text-neutral-600 dark:text-neutral-400">
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
                    <h3 className="text-xl md:text-2xl font-semibold mb-4 text-neutral-800 dark:text-neutral-200">
                      More Info
                    </h3>
                    <div className="space-y-2 md:space-y-3 text-neutral-600 dark:text-neutral-400">
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
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
          Shows
        </h2>
        {loading ? (
          <LoadingSpinner size="medium" />
        ) : shows.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {shows.map((show) => (
              <Card key={show.id} className="p-4 md:p-6 rounded-lg shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg md:text-xl font-semibold mb-2 text-neutral-900 dark:text-neutral-50">
                    <div>
                      {new Intl.DateTimeFormat("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }).format(new Date(show.date_time))}
                    </div>
                    <div className="text-base md:text-lg">
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
