# FilmSphere

![FilmSphere Logo](https://filmsphere.me/images/logo.png)

**FilmSphere** is a fun, coin-based movie reservation system built as a learning project by Anupam, Rachit, and Keshav. Inspired by [roadmap.sh](https://roadmap.sh/projects/movie-reservation-system/), it’s designed to explore web development concepts through an engaging cinematic experience. Users can browse movies, book show tickets with virtual coins, and enjoy features like interactive seating, booking history, and a responsive design.

This is an open-source project, and we welcome contributions! Check out our [GitHub repository](https://github.com/filmsphere/filmsphere) to get involved.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Core Features](#core-features)
- [Routes](#routes)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Contributing](#contributing)
- [What’s Next?](#whats-next)
- [About the Developers](#about-the-developers)
- [License](#license)

---

## About the Project

FilmSphere is an educational tool that lets users dive into a movie booking system powered by a virtual coin economy. Built with modern web technologies, it’s a playground for learning frontend, backend, and cloud concepts while delivering a delightful user experience. Whether you’re here to explore, book a virtual ticket, or contribute, FilmSphere is your gateway to cinematic adventures!

The project is hosted at [filmsphere.me](https://filmsphere.me) using **Vercel**.

---

## Core Features

- **Browse & Explore**: Discover a curated selection of movies on the home page.
  - Searchable with filters by **language** and **genres**.
- **Interactive Seating**: Select your seats with an intuitive theater layout editor.
  - Admins can save/load seat layouts in **JSON format**, specifying premium, VIP, standard, or disabled seats.
- **Virtual Coin System**: Book tickets using a fun, virtual coin system (no real money involved!).
- **Booking History**: View your bookings with **filters** for easy navigation.
- **Synced Draft Booking**:
  - If payment is incomplete, the booking remains in draft mode for **6 minutes**.
  - Users are notified via a banner to complete the payment, even if they switch devices.
- **Admin Dashboard**:
  - Add, update, or delete **movies**, **screens**, and **shows**.
  - Manage bookings (e.g., delete bookings for specific shows).
- **Responsive Design**: Enjoy a seamless experience on any device with **dark/light mode support**.
- **Privacy & Terms**: Accessible at `/privacy` and `/terms` for transparency.

---

## Routes

FilmSphere organizes its functionality into public, protected, and admin routes:

### Public Routes

- `/`: Home page with a stunning gradient title and particle background.
- `/about`: Learn more about the FilmSphere project and team.
- `/privacy`: View our [Privacy Policy](#).
- `/terms`: Review our [Terms and Conditions](#).
- `/login`: Log in to your FilmSphere account.
- `/register`: Create a new FilmSphere account.
- `/ticket/:bookingId`: View a specific booking ticket.

### Protected Routes (Authenticated Users)

- `/profile`: Manage your user profile and booking history.
- `/movie/:movieId`: Explore detailed information about a movie.
- `/booking`: Book a show using virtual coins.
- `/booking-confirmation`: Confirm your booking details.

### Admin Routes (Admin Users)

- `/admin/:tab`: Admin dashboard with tabs for managing movies, shows, and bookings.

---

## Screenshots

### Home Page

![Home Page](/public/home.jpg)

### Seat Booking

![Seat Booking](/public/interactive_seats.jpg)

### Profile Page

![Profile Page](/public/profile.jpg)

### Responsive Design

![Responsive Design](/public/responsive.jpg)

---

## Getting Started

Follow these steps to set up FilmSphere locally and start exploring or contributing.

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher (or use Yarn/Pnpm)
- **Git**: For cloning the repository

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/filmsphere/frontend.git
   cd frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   - Create a `.env` file in the root directory.
   - Add necessary variables (e.g., API keys, backend URL) based on `.env.example` (if provided).

4. **Run the Development Server**

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173` (or your configured port) in your browser.

5. **Build for Production** (optional)
   ```bash
   npm run build
   ```

---

## Contributing

We’d love for you to contribute to FilmSphere! Whether it’s fixing bugs, adding features, or improving documentation, every contribution helps.

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`.
3. Make your changes and commit: `git commit -m "Add your feature"`.
4. Push to your fork: `git push origin feature/your-feature-name`.
5. Open a Pull Request on our [GitHub repository](https://github.com/filmsphere/filmsphere).

Check out our [Contributing Guidelines](CONTRIBUTING.md) for more details (to be added).

---

## What’s Next?

We’re excited to enhance FilmSphere with upcoming features:

- **Real-Time Seat Availability**: See which seats are taken in real time.
- **Movie Trailers**: Watch previews before booking.
- **User Reviews**: Share and read movie feedback.
- **Coin Top-Up System**: Earn or add virtual coins for more bookings.

Stay tuned for more cinematic goodness!

---

## About the Developers

FilmSphere is brought to you by a passionate trio:

- **Anupam**: _Frontend Wizard & Database_ - Crafting the UI and managing data magic.
- **Rachit**: _Backend Maestro & API Design_ - Powering the system with robust APIs.
- **Keshav**: _Cloud & Project Management_ - Keeping everything running smoothly in the cloud.
