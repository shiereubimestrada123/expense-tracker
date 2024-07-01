import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHENTICATED_USER } from "../graphql/queries/user.query";
import { LOGOUT } from "../graphql/mutations/user.mutation";

const Navbar = () => {
  const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);
  const [logout, { loading, client }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAuthenticatedUser"],
  });
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    client.resetStore();
  };

  return (
    <div className="relative flex justify-between items-center pt-4 mb-10 px-4 lg:px-8">
      <h1 className="text-3xl lg:text-4xl font-bold">Expense Tracker</h1>
      <button
        className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded border border-gray-300"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>
          {loading ? (
            <div className="flex items-center justify-center h-full w-full">
              <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin" />
            </div>
          ) : (
            <span>{authUser?.authUser?.name}</span>
          )}
        </span>
        <span
          className={`transform transition-transform duration-300 ${
            showDropdown ? "animate-rotateIn" : "animate-rotateOut"
          }`}
        >
          {showDropdown ? <FaChevronUp /> : <FaChevronDown />}
        </span>
      </button>
      {showDropdown && (
        <div className="absolute right-4 lg:right-8 top-full mt-1 bg-white border rounded">
          <button
            className="block w-full px-4 py-2 text-left hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
