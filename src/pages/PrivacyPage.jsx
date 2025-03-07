import { Link } from "react-router-dom";

const PrivacyPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight text-foreground">
        Privacy Policy for FilmSphere
      </h1>
      <p className="text-sm text-muted-foreground mb-4">
        <strong>Last Updated:</strong> March 06, 2025
      </p>

      <p className="text-base text-muted-foreground mb-6">
        Welcome to <strong>FilmSphere</strong>, a fun, coin-based movie
        reservation system designed as a learning project by Anupam, Rachit, and
        Keshav. At FilmSphere, we value your privacy and are committed to being
        transparent about how we handle your information. This Privacy Policy
        explains what data we collect, how we use it, and how we protect it. By
        using FilmSphere, you agree to the practices described in this policy.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          1. About FilmSphere
        </h2>
        <p className="text-muted-foreground">
          FilmSphere is an open-source, educational project inspired by
          roadmap.sh, allowing users to browse movies, book virtual show tickets
          using a coin-based system, and interact with features like an
          interactive seating layout and booking history. This Privacy Policy
          applies to your use of FilmSphere and its associated services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          2. Information We Collect
        </h2>
        <p className="text-muted-foreground mb-2">
          As an educational project, FilmSphere collects minimal data to enable
          its features. We may collect the following:
        </p>
        <h3 className="text-lg font-medium mb-2 text-foreground">
          2.1 Information You Provide
        </h3>
        <ul className="list-disc pl-5 text-muted-foreground mb-2">
          <li>
            <strong>Profile Information:</strong> If you create a profile, we
            may collect basic details like a username, email address (optional),
            or other identifiers you choose to provide.
          </li>
          <li>
            <strong>Booking Data:</strong> Details of your virtual ticket
            bookings, such as movie selections, seat choices, and timestamps,
            stored locally or in your profile for the booking history feature.
          </li>
          <li>
            <strong>Contributions:</strong> If you contribute to FilmSphere via
            our{" "}
            <a
              href="https://github.com/filmsphere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub repository
            </a>
            , we may collect your GitHub username or other information you
            submit with your contributions.
          </li>
        </ul>
        <h3 className="text-lg font-medium mb-2 text-foreground">
          2.2 Automatically Collected Information
        </h3>
        <ul className="list-disc pl-5 text-muted-foreground mb-2">
          <li>
            <strong>Usage Data:</strong> Basic analytics about how you interact
            with FilmSphere (e.g., pages visited, features used), collected for
            educational insights into user behavior and system performance.
          </li>
          <li>
            <strong>Device Information:</strong> General data like device type,
            browser version, and operating system to ensure responsive design
            compatibility.
          </li>
          <li>
            <strong>Virtual Coins:</strong> Records of virtual coin usage within
            FilmSphere, which have no real-world value and are tied to your
            session or profile.
          </li>
        </ul>
        <h3 className="text-lg font-medium mb-2 text-foreground">
          2.3 Cookies and Similar Technologies
        </h3>
        <p className="text-muted-foreground">
          FilmSphere may use cookies or local storage to maintain your session
          (e.g., dark/light mode preference, virtual coin balance). These are
          minimal and functional, not used for tracking or advertising.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          3. How We Use Your Information
        </h2>
        <p className="text-muted-foreground">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground mb-2">
          <li>
            <strong>Provide Features:</strong> Enable browsing, seat selection,
            virtual coin bookings, and profile management.
          </li>
          <li>
            <strong>Improve FilmSphere:</strong> Analyze usage patterns to
            enhance the project’s functionality and user experience as part of
            our learning goals.
          </li>
          <li>
            <strong>Support Contributions:</strong> Process and display your
            contributions if you participate via GitHub.
          </li>
          <li>
            <strong>Ensure Functionality:</strong> Maintain a seamless
            experience across devices with responsive design.
          </li>
        </ul>
        <p className="text-muted-foreground">
          We do <strong>not</strong> use your information for commercial
          purposes, advertising, or profit.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          4. How We Share Your Information
        </h2>
        <p className="text-muted-foreground mb-2">
          FilmSphere is an educational project, and we do not sell, rent, or
          share your personal information with third parties for commercial
          purposes. Information may be shared in these limited cases:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            <strong>Open-Source Contributions:</strong> If you contribute via
            GitHub, your contributions (e.g., code, username) will be publicly
            visible in our repository under its open-source license.
          </li>
          <li>
            <strong>Developers:</strong> The FilmSphere team (Anupam, Rachit,
            Keshav) may access usage data or profile information internally to
            debug, improve, or maintain the system.
          </li>
          <li>
            <strong>Legal Requirements:</strong> If required by law or to
            protect FilmSphere’s rights, we may disclose information to
            authorities, though this is unlikely for an educational project.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          5. Data Storage and Security
        </h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            <strong>Storage:</strong> Data (e.g., profiles, booking history) is
            stored locally on your device via browser storage (e.g.,
            localStorage) or on our servers if hosted (e.g., for profiles). As a
            learning project, we use basic storage solutions, not
            enterprise-grade systems.
          </li>
          <li>
            <strong>Security:</strong> We implement reasonable measures (e.g.,
            secure coding practices) to protect your data, but as an educational
            tool, FilmSphere does not guarantee absolute security. Use at your
            own risk.
          </li>
          <li>
            <strong>Retention:</strong> Data persists only as long as needed for
            the feature (e.g., session duration) or until you delete your
            profile. Contributions via GitHub remain indefinitely as part of the
            open-source project.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          6. Your Choices and Rights
        </h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            <strong>Profile Management:</strong> You can view or delete your
            booking history and profile data within FilmSphere’s interface, if
            implemented.
          </li>
          <li>
            <strong>Cookies:</strong> You can disable cookies or clear local
            storage via your browser settings, though this may affect
            functionality (e.g., losing your coin balance).
          </li>
          <li>
            <strong>Contributions:</strong> You control what you submit to our
            GitHub repository. Public contributions cannot be retracted once
            merged, per open-source norms.
          </li>
          <li>
            <strong>Opt-Out:</strong> As a free, non-commercial tool, you can
            stop using FilmSphere at any time to opt out of data collection.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          7. Third-Party Services
        </h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            <strong>GitHub:</strong> If you contribute, your data is subject to{" "}
            <a
              href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              GitHub’s Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>No External Analytics:</strong> FilmSphere does not use
            third-party analytics tools (e.g., Google Analytics) unless
            explicitly added later, in which case this policy will be updated.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          8. Children’s Privacy
        </h2>
        <p className="text-muted-foreground">
          FilmSphere is not directed at children under 13. If you are under 13,
          please do not use FilmSphere without parental consent. We do not
          knowingly collect personal information from children under 13.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          9. International Users
        </h2>
        <p className="text-muted-foreground">
          FilmSphere is developed by a team based in <strong>India</strong>.
          Data is processed where our systems are hosted (e.g., local devices or
          cloud servers). By using FilmSphere, you consent to data processing in
          this jurisdiction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          10. Changes to This Privacy Policy
        </h2>
        <p className="text-muted-foreground">
          We may update this Privacy Policy as FilmSphere evolves (e.g., adding
          real-time seat availability or user reviews). Changes will be posted
          here with an updated "Last Updated" date. Continued use after changes
          indicates acceptance of the revised policy.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          11. Contact Us
        </h2>
        <p className="text-muted-foreground mb-2">
          If you have questions about your privacy or this policy, feel free to
          reach out to the FilmSphere team:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            <strong>Anupam:</strong> Frontend Wizard & Database
          </li>
          <li>
            <strong>Rachit:</strong> Backend Maestro & API Design
          </li>
          <li>
            <strong>Keshav:</strong> Cloud & Project Management
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href="https://github.com/filmsphere"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              FilmSphere Repository
            </a>
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          12. Acknowledgment
        </h2>
        <p className="text-muted-foreground">
          Thank you for joining us on this educational journey! FilmSphere is a
          learning project, and we’re committed to keeping your experience fun,
          safe, and transparent. Enjoy exploring the cinematic world with us!
        </p>
      </section>

      <div className="mt-8 text-center">
        <Link to="/" className="text-primary hover:underline">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PrivacyPage;
