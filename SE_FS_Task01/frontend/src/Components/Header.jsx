import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import userContext from "../context/userContext";
import Cookies from "js-cookie";

const Header = () => {
  const value = useContext(userContext);
  const navigate = useNavigate();

  useEffect(() => {}, [value]);

  const handleLogout = () => {
    localStorage.clear();
    Cookies.remove("jwt");
    navigate("/login");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  return (
    <div className="bg-black border-b-2">
      <nav className="p-2  flex items-center justify-between px-9">
        <Link to={"/"}>
          <h2 className="text-white text-3xl font-semibold">
            <span className="text-red-800">Movie</span>Ref
          </h2>
        </Link>
        {value.userStatus ? (
          <h2 className="text-xl font-medium text-white flex space-x-6 items-center">
            <Link to={"/addMovie"}>Add Movie</Link>
            <button
              className="bg-red-800 p-2 rounded-2xl"
              onClick={handleLogout}
            >
              Logout
            </button>
          </h2>
        ) : (
          <h2 className="text-xl font-medium text-white">
            {" "}
            <Link to={"/login"}>Login</Link>
          </h2>
        )}
      </nav>
    </div>
  );
};
export default Header;
