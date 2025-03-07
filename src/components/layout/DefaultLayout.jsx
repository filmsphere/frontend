import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import FlashMessage from "../common/FlashMessage";

const DefaultLayout = ({ children, toggleDarkMode }) => (
  <div className="flex flex-col min-h-screen">
    <Navbar toggleDarkMode={toggleDarkMode} />
    <main className="flex-grow">{children}</main>
    <Footer />
    <FlashMessage />
  </div>
);

export default DefaultLayout;
