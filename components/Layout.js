import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="bg-gray-200">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
