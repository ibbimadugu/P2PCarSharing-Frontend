import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ListCar from "./pages/CarListing";
import CarDetails from "./pages/CarDetails";
import Bookings from "./pages/Booking";
import Messages from "./pages/Messages";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  // Only render Navbar and Footer if we're not on the login or register page
  const showNavbarAndFooter = !["/login", "/register"].includes(
    location.pathname
  );

  return (
    <div className="min-h-screen flex flex-col">
      {showNavbarAndFooter && <Navbar />}
      <div className="flex-grow">
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/list-car"
            element={
              <ProtectedRoute>
                <ListCar />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
          <Route
            path="/messages"
            element={
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route path="/car/:id" element={<CarDetails />} />
        </Routes>
      </div>
      {showNavbarAndFooter && <Footer />}
    </div>
  );
}

export default App;
