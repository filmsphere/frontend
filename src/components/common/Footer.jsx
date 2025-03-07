import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const Footer = () => {
  return (
    <footer className="py-8 bg-background text-muted-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:justify-between">
          <p className="text-sm">
            © {new Date().getFullYear()} FilmSphere. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              to="/privacy"
              className={cn("text-sm hover:underline", "text-muted-foreground")}
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className={cn("text-sm hover:underline", "text-muted-foreground")}
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
