import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthStore from "../../stores/authStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const { isAuthenticated } = useAuthStore();
  const [showCat, setShowCat] = useState(false);

  const handleEasterEgg = (e) => {
    if (e.detail === 3) {
      setShowCat(true);
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-screen",
        "bg-background text-foreground",
      )}
    >
      <div className="text-center">
        <h1
          className="text-8xl font-bold cursor-pointer"
          onClick={handleEasterEgg}
        >
          404
        </h1>
        <p className="text-2xl mt-4 text-muted-foreground">
          Oops! Page Not Found
        </p>
        <p className="text-sm mt-2 max-w-md text-muted-foreground">
          It seems you’ve wandered off the script. Let’s get you back to the
          main feature!
        </p>
        {showCat && (
          <div className="mt-6 flex flex-col items-center">
            <img
              src="https://cataas.com/cat"
              alt="A random cat"
              className="max-w-xs rounded-lg shadow-lg"
            />
            <p className="mt-2 text-sm text-muted-foreground">
              🖖 Live long and prosper, human!
            </p>
          </div>
        )}
        <div className="mt-8">
          <Link to={isAuthenticated ? "/" : "/login"}>
            <Button>{isAuthenticated ? "Back to Home" : "Go to Login"}</Button>
          </Link>
        </div>
      </div>
      <div className="mt-8 text-sm opacity-50 text-muted-foreground">
        FilmSphere © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default NotFound;
