import { cn } from "@/lib/utils";
import PropTypes from "prop-types";

const LoadingSpinner = ({ size = "medium", fullScreen = true }) => {
  const sizes = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
  };

  const spinner = (
    <svg
      className={cn(
        "animate-spin rounded-full border-4 border-current border-t-transparent",
        sizes[size],
      )}
      viewBox="0 0 24 24"
      aria-label="Loading Spinner"
      data-testid="loading-spinner"
    />
  );

  return fullScreen ? (
    <div
      className={cn(
        "flex justify-center items-center h-screen bg-background text-foreground",
      )}
    >
      {spinner}
    </div>
  ) : (
    spinner
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(["small", "medium", "large"]),
  fullScreen: PropTypes.bool,
};

export default LoadingSpinner;
