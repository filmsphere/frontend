import { Link } from "react-router-dom";

const TermsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight text-foreground">
        Terms and Conditions for FilmSphere
      </h1>
      <p className="text-sm text-muted-foreground mb-4">
        <strong>Last Updated:</strong> March 06, 2025
      </p>

      <p className="text-base text-muted-foreground mb-6">
        Welcome to <strong>FilmSphere</strong>, a fun, coin-based movie
        reservation system designed as a learning project by Anupam, Rachit, and
        Keshav. By accessing or using FilmSphere, you agree to be bound by these
        Terms and Conditions ("Terms"). If you do not agree with these Terms,
        please do not use FilmSphere.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          1. About FilmSphere
        </h2>
        <p className="text-muted-foreground">
          FilmSphere is an educational project inspired by roadmap.sh, aimed at
          exploring web development concepts through a movie booking system. It
          allows users to browse movies, book show tickets using virtual coins,
          and interact with features like an interactive seating layout, booking
          history, and a responsive design with dark/light mode support. This is
          not a commercial service but a learning tool developed for educational
          purposes.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          2. Eligibility
        </h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            FilmSphere is intended for personal, non-commercial use by
            individuals interested in exploring its features or contributing to
            its development.
          </li>
          <li>
            You must be at least 13 years old to use FilmSphere. If you are
            under 18, you should review these Terms with a parent or guardian.
          </li>
          <li>
            By using FilmSphere, you represent that your use complies with all
            applicable local laws and regulations.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          3. Use of FilmSphere
        </h2>
        <h3 className="text-lg font-medium mb-2 text-foreground">
          3.1 Account and Virtual Coins
        </h3>
        <ul className="list-disc pl-5 text-muted-foreground mb-2">
          <li>
            FilmSphere uses a virtual coin system for booking tickets. These
            coins have no real-world monetary value and are provided solely for
            the purpose of interacting with the system as part of the learning
            experience.
          </li>
          <li>
            You may need to create a profile to access certain features (e.g.,
            booking history). You are responsible for maintaining the
            confidentiality of your account information and for all activities
            under your account.
          </li>
        </ul>
        <h3 className="text-lg font-medium mb-2 text-foreground">
          3.2 Acceptable Use
        </h3>
        <p className="text-muted-foreground mb-2">
          You agree to use FilmSphere only for lawful purposes and in accordance
          with these Terms. You may not:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground mb-2">
          <li>
            Use FilmSphere to harm, disrupt, or interfere with its functionality
            or the experience of other users.
          </li>
          <li>
            Attempt to reverse-engineer, hack, or exploit the system beyond its
            intended educational scope.
          </li>
          <li>
            Use automated scripts or bots to interact with FilmSphere without
            prior permission from the developers.
          </li>
        </ul>
        <h3 className="text-lg font-medium mb-2 text-foreground">
          3.3 Contributions
        </h3>
        <p className="text-muted-foreground mb-2">
          FilmSphere is an open-source project, and we welcome contributions via
          our{" "}
          <a
            href="https://github.com/filmsphere"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub repository
          </a>
          . If you contribute code, ideas, or feedback:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            You grant the FilmSphere team a non-exclusive, royalty-free,
            worldwide license to use, modify, and distribute your contributions
            as part of the project.
          </li>
          <li>
            You represent that your contributions are your original work and do
            not infringe on third-party rights.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          4. Core Features
        </h2>
        <p className="text-muted-foreground mb-2">
          FilmSphere offers the following features as part of its learning
          experience:
        </p>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            <strong>Browse & Explore:</strong> Discover a curated selection of
            movies.
          </li>
          <li>
            <strong>Interactive Seating:</strong> Select seats using an
            interactive theater layout.
          </li>
          <li>
            <strong>Virtual Coin System:</strong> Book tickets with virtual
            coins provided within the platform.
          </li>
          <li>
            <strong>Booking History & Profile:</strong> View your booking
            history and manage your profile.
          </li>
          <li>
            <strong>Responsive Design:</strong> Access FilmSphere seamlessly
            across devices with dark/light mode support.
          </li>
        </ul>
        <p className="text-muted-foreground mt-2">
          These features are provided "as-is" for educational purposes and may
          change as the project evolves.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          5. Intellectual Property
        </h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            <strong>Ownership:</strong> The FilmSphere project, including its
            code, design, and content (excluding user contributions), is owned
            by its developers—Anupam, Rachit, and Keshav—and is licensed under
            the{" "}
            <a
              href="https://github.com/filmsphere/filmsphere/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              MIT License
            </a>
            .
          </li>
          <li>
            <strong>User Content:</strong> Any data you input (e.g., profile
            information, booking history) remains yours, but you grant us
            permission to store and display it as part of the FilmSphere
            experience.
          </li>
          <li>
            <strong>Trademarks:</strong> "FilmSphere" and its associated
            branding are identifiers of this project. You may not use them
            commercially without explicit permission.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          6. Privacy
        </h2>
        <p className="text-muted-foreground">
          FilmSphere collects minimal personal data (e.g., profile details)
          solely to enable its features. As a learning project, it does not sell
          or share your data with third parties for commercial purposes. For
          more details, please refer to our{" "}
          <Link to="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          7. Disclaimers
        </h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            <strong>Educational Purpose:</strong> FilmSphere is a learning
            project and not a production-ready commercial service. It may
            contain bugs, incomplete features, or downtime.
          </li>
          <li>
            <strong>No Warranty:</strong> FilmSphere is provided "as-is" without
            warranties of any kind, express or implied, including fitness for a
            particular purpose or uninterrupted access.
          </li>
          <li>
            <strong>Virtual Coins:</strong> The virtual coins have no monetary
            value and cannot be redeemed, traded, or transferred outside
            FilmSphere.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          8. Limitation of Liability
        </h2>
        <p className="text-muted-foreground">
          To the fullest extent permitted by law, the FilmSphere developers
          (Anupam, Rachit, Keshav) shall not be liable for any direct, indirect,
          incidental, or consequential damages arising from your use of
          FilmSphere, including but not limited to loss of data, inability to
          book a virtual ticket, or reliance on the system. As a free,
          educational tool, your use is at your own risk.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          9. Changes to FilmSphere and These Terms
        </h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            <strong>Feature Updates:</strong> We may add, modify, or remove
            features (e.g., real-time seat availability, movie trailers, user
            reviews, coin top-up system) as part of FilmSphere’s evolution. Such
            changes are at our discretion and may not be announced in advance.
          </li>
          <li>
            <strong>Terms Updates:</strong> We may update these Terms
            periodically. The updated version will be posted here with a revised
            "Last Updated" date. Continued use of FilmSphere after changes
            constitutes acceptance of the new Terms.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          10. Termination
        </h2>
        <ul className="list-disc pl-5 text-muted-foreground">
          <li>
            We reserve the right to suspend or terminate your access to
            FilmSphere at any time, for any reason, including violation of these
            Terms.
          </li>
          <li>
            You may stop using FilmSphere at any time by discontinuing access.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          11. Governing Law
        </h2>
        <p className="text-muted-foreground">
          These Terms are governed by the laws of <strong>India</strong>,
          without regard to conflict of law principles. As an educational
          project, disputes are unlikely, but any legal action will be subject
          to this jurisdiction.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-foreground">
          12. Contact Us
        </h2>
        <p className="text-muted-foreground mb-2">
          Have questions or feedback? Reach out to the FilmSphere team:
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
          13. Acknowledgment
        </h2>
        <p className="text-muted-foreground">
          Thank you for exploring FilmSphere! We’re excited to share this
          learning journey with you and welcome your contributions to make it
          even better. Enjoy your cinematic adventure!
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

export default TermsPage;
