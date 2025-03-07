import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import Logout from "../auth/Logout";
import { cn } from "@/lib/utils";

const Navbar = ({ toggleDarkMode }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const { isAuthenticated, isAdmin, loading } = useAuthStore();
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved
      ? JSON.parse(saved)
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (toggleDarkMode) toggleDarkMode();
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    ...(isAuthenticated && !loading
      ? [
          { path: "/profile", label: "Profile" },
          ...(isAdmin ? [{ path: "/admin", label: "Admin" }] : []),
          { label: "Logout", onClick: () => setShowLogout(true) },
        ]
      : [
          { path: "/login", label: "Login" },
          { path: "/register", label: "Register" },
        ]),
  ];

  return (
    <div>
      <nav
        className={cn(
          "shadow-md transition-colors duration-300",
          "bg-background text-foreground",
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold">FilmSphere</h1>
            </Link>

            <div className="hidden md:flex items-center space-x-4">
              {navLinks.map((link) =>
                link.path ? (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium",
                      "hover:bg-secondary",
                    )}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Button
                    key={link.label}
                    variant="ghost"
                    onClick={link.onClick}
                    className="hover:bg-secondary"
                  >
                    {link.label}
                  </Button>
                ),
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleToggleDarkMode}
                className="hover:bg-secondary"
                aria-label={
                  isDarkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                <Sun className="h-5 w-5 dark:hidden" />
                <Moon className="h-5 w-5 hidden dark:block" />
              </Button>
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-secondary"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden bg-background w-full px-2 pt-2 pb-3">
              {navLinks.map((link) =>
                link.path ? (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block w-full px-3 py-2 rounded-md text-center font-medium",
                      "hover:bg-secondary",
                    )}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <Button
                    key={link.label}
                    variant="ghost"
                    onClick={() => {
                      link.onClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full hover:bg-secondary"
                  >
                    {link.label}
                  </Button>
                ),
              )}
              <Button
                variant="ghost"
                onClick={() => {
                  handleToggleDarkMode();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full hover:bg-secondary"
              >
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Button>
            </div>
          )}
        </div>
      </nav>
      {showLogout && (
        <Logout onClose={() => setShowLogout(false)} isOpen={showLogout} />
      )}
    </div>
  );
};

export default Navbar;
