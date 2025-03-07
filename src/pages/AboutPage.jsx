import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";

const AboutPage = () => {
  const coreFeatures = [
    {
      image: "feature1-dark.jpg",
      title: "Browse & Explore",
      text: "Discover a curated selection of movies.",
      isReversed: false,
    },
    {
      image: "feature2-dark.jpg",
      title: "Interactive Seating",
      text: "Select your seats with our interactive theater layout.",
      isReversed: true,
    },
    {
      image: "feature3-dark.jpg",
      title: "Virtual Coin System",
      text: "Book tickets using our convenient virtual coin system.",
      isReversed: false,
    },
    {
      image: "feature4-dark.jpg",
      title: "Booking History & Profile",
      text: "View your booking history and manage your profile.",
      isReversed: true,
    },
    {
      image: "feature5-dark.jpg",
      title: "Responsive Design",
      text: "Enjoy a seamless experience on any device with dark/light mode support.",
      isReversed: false,
    },
    {
      image: "feature6-dark.jpg",
      title: "Contribute to FilmSphere",
      text: "Check out our GitHub repository and contribute!",
      link: "https://github.com/filmsphere/filmsphere",
      isReversed: true,
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-8 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-neutral-900 dark:text-neutral-50">
          About FilmSphere
        </h1>

        {/* About the Project Section */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50">
            About the Project
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
            FilmSphere is an open-source, educational project inspired by{" "}
            <a
              href="https://roadmap.sh/projects/movie-reservation-system"
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
            >
              roadmap.sh
            </a>
            , allowing users to browse movies, book virtual show tickets using a
            coin-based system, and interact with features like an interactive
            seating layout and booking history.
          </p>
        </section>

        {/* Core Features Section */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-neutral-900 dark:text-neutral-50">
            Core Features
          </h2>
          {coreFeatures.map((feature, index) => (
            <div
              key={index}
              className={`flex flex-col ${feature.isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8 mb-12`}
            >
              <div className="md:w-1/2 w-full relative group">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="rounded-xl shadow-2xl transform transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 rounded-xl border-2 border-neutral-200 dark:border-neutral-700 mix-blend-overlay`}
                ></div>
              </div>
              <div className="md:w-1/2 w-full p-6 text-neutral-600 dark:text-neutral-400">
                <h4 className="text-xl sm:text-2xl font-bold mb-4 text-neutral-900 dark:text-neutral-50">
                  {feature.title}
                </h4>
                <p className="text-lg leading-relaxed">
                  {feature.text}{" "}
                  {feature.link && (
                    <a
                      href={feature.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                    >
                      GitHub repository
                    </a>
                  )}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* What’s Next Section */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-neutral-900 dark:text-neutral-50">
            What’s Next?
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 dark:text-neutral-400">
            We’re excited to enhance FilmSphere with features like real-time
            seat availability, movie trailers, user reviews, and a coin top-up
            system. Stay tuned for more cinematic goodness!
          </p>
        </section>

        {/* Developers Section */}
        <section className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-center text-neutral-900 dark:text-neutral-50">
            About the Developers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <Card className="p-4 sm:p-6 rounded-lg shadow-lg text-center">
              <CardContent>
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src="/images/anupam.jpg"
                    alt="Anupam"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-2 text-neutral-800 dark:text-neutral-200">
                  Anupam
                </h3>
                <p className="text-sm sm:text-base mb-3 text-neutral-600 dark:text-neutral-400">
                  Frontend Wizard & Database
                </p>
                <div className="flex justify-center gap-3">
                  <a
                    href="https://twitter.com/rjanupam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                    aria-label="Twitter profile for Anupam"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://github.com/rjanupam"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-neutral-700 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-200"
                    aria-label="GitHub profile for Anupam"
                  >
                    <FaGithub />
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 sm:p-6 rounded-lg shadow-lg text-center">
              <CardContent>
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src="/images/rachit.jpg"
                    alt="Rachit"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-2 text-neutral-800 dark:text-neutral-200">
                  Rachit
                </h3>
                <p className="text-sm sm:text-base mb-3 text-neutral-600 dark:text-neutral-400">
                  Backend Maestro & API Design
                </p>
                <div className="flex justify-center gap-3">
                  <a
                    href="https://twitter.com/rancho_rachit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                    aria-label="Twitter profile for Rachit"
                  >
                    <FaTwitter />
                  </a>
                  <a
                    href="https://github.com/rancho-rachit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-neutral-700 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-200"
                    aria-label="GitHub profile for Rachit"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rachitagrawal308"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                    aria-label="LinkedIn profile for Keshav"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card className="p-4 sm:p-6 rounded-lg shadow-lg text-center">
              <CardContent>
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 rounded-full overflow-hidden">
                  <img
                    src="/images/keshav.jpg"
                    alt="Keshav"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-medium mb-2 text-neutral-800 dark:text-neutral-200">
                  Keshav
                </h3>
                <p className="text-sm sm:text-base mb-3 text-neutral-600 dark:text-neutral-400">
                  Cloud & Project Management
                </p>
                <div className="flex justify-center gap-3">
                  <a
                    href="https://github.com/KeshavAgrawal2903"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-neutral-700 dark:text-neutral-300 hover:text-neutral-600 dark:hover:text-neutral-200"
                    aria-label="GitHub profile for Keshav"
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/keshav-agrawal-65902a266"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xl text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                    aria-label="LinkedIn profile for Keshav"
                  >
                    <FaLinkedin />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <div className="text-center mt-16">
          <Button asChild>
            <Link to="/" className="px-8 py-3">
              Start Your Movie Journey
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
