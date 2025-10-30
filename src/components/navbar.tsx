import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);
  const signUserOut =async () => await signOut(auth);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / nazwa */}
        <Link
          to="/"
          className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors"
        >
          MyApp
        </Link>

        {/* Linki */}
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-gray-700 font-medium"
          >
            Home
          </Link>
          {!user && (
            <Link
              to="/login"
              className="text-gray-700 font-medium"
            >
              Login
            </Link>
          )}
          {!user ? (
          <Link
            to="/login"
            className="text-gray-700 font-medium"
          >
            Login
          </Link>
        ) : (
          <Link
            to="/createpost"
            className="text-gray-700 font-medium"
          >
            Create Post
          </Link>
        )}
          

          {/* Jeśli użytkownik zalogowany */}
          {user && (
            <div className="flex items-center space-x-3">
              <img
                src={user.photoURL || ""}
                alt="User avatar"
                referrerPolicy="no-referrer"
                className="w-9 h-9 rounded-full border border-gray-300 shadow-sm"
              />
              <p className="text-gray-700 font-medium">{user.displayName}</p>
              <button className="text-gray-700 font-medium" onClick={signUserOut}>Log out</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
