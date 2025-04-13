import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl flex items-center gap-2 text-white"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          <span>P2PCarSharing</span>
        </Link>

        {/* Main Navbar Menu */}
        <div className="flex items-center gap-6">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-xl hover:text-blue-400 transition duration-200"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Dashboard
              </Link>
              <Link
                to="/bookings"
                className="text-xl hover:text-blue-400 transition duration-200"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Bookings
              </Link>
              <Link
                to="/messages"
                className="text-xl hover:text-blue-400 transition duration-200"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}>
                Messages
              </Link>

              {/* Logout */}
              <span className="text-sm text-gray-300 italic">
                Welcome, <span className="font-semibold">{user.name}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-300">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-blue-400 transition duration-200 text-sm font-medium">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-md transition duration-300">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
