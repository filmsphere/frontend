import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/particles";
import { useState, useEffect } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true",
  );

  useEffect(() => {
    const updateDarkMode = () => {
      setDarkMode(localStorage.getItem("darkMode") === "true");
    };

    updateDarkMode();
    window.addEventListener("storage", updateDarkMode);
    const interval = setInterval(updateDarkMode, 1000);

    return () => {
      window.removeEventListener("storage", updateDarkMode);
      clearInterval(interval);
    };
  }, []);

  const particlesColor = darkMode ? "#ffffff" : "#000000";

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col">
      {/* Sticky Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Particles Background */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={600}
        ease={80}
        color={particlesColor}
        refresh
      />

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center container mx-auto px-4 py-8 relative z-10 pt-20 pb-20">
        <div className="flex flex-col items-center justify-center text-center font-poppins">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-md">
            <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-200 bg-clip-text text-center text-7xl md:text-8xl font-semibold leading-none text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-800">
              Welcome to FilmSphere
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
            Your gateway to cinematic adventures—book shows, explore movies, and
            enjoy with coins!
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <Link to="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Log In
              </Button>
            </Link>
            <Link to="/register">
              <Button
                size="lg"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Get Started
              </Button>
            </Link>
          </div>
          {/* Uncomment if you want the feature cards */}
          {/*
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 shadow-md">
              <h3 className="text-lg font-semibold tracking-wide drop-shadow-sm">
                Browse Movies
              </h3>
              <p className="mt-2 text-muted-foreground">
                Discover a wide range of films to enjoy.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 shadow-md">
              <h3 className="text-lg font-semibold tracking-wide drop-shadow-sm">
                Book Shows
              </h3>
              <p className="mt-2 text-muted-foreground">
                Reserve your seats with ease.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800 shadow-md">
              <h3 className="text-lg font-semibold tracking-wide drop-shadow-sm">
                Coin System
              </h3>
              <p className="mt-2 text-muted-foreground">
                Use coins for a fun booking experience.
              </p>
            </div>
          </div>
          */}
        </div>
      </main>

      {/* Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
