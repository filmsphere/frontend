import { Link } from "react-router-dom";
import { formatDate } from "../../utils/general";

const MovieCard = ({ movie }) => {
  const durationHours = Math.floor(movie.duration / 60);
  const durationMinutes = movie.duration % 60;

  return (
    <div className="rounded-lg shadow-md overflow-hidden transition-all duration-300 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 hover:shadow-lg border border-neutral-200 dark:border-neutral-800">
      <Link to={`/movie/${movie.imdb_id}`}>
        {movie.poster && (
          <img
            src={movie.poster}
            alt={movie.title || "Movie Poster"}
            className="w-full h-auto object-cover rounded-t-lg"
            loading="lazy"
          />
        )}
      </Link>
      <div className="p-4">
        <h2 className="text-lg font-bold line-clamp-1 text-neutral-900 dark:text-neutral-50 mb-2">
          {movie.title}
        </h2>
        <p
          className="text-sm line-clamp-3 text-neutral-600 dark:text-neutral-400 mb-4"
          title={movie.description}
        >
          {movie.description}
        </p>
        <div className="flex items-center justify-between text-sm text-neutral-600 dark:text-neutral-400">
          <span>
            🕒 {durationHours}h {durationMinutes}m
          </span>
          <span>{formatDate(movie.release_datetime)}</span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
