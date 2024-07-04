import React, { useState } from "react";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/UserSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.users);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <header className="flex justify-between items-center bg-white h-14 px-4">
        <div className="flex-shrink-0 flex-grow-0">
          <img className="w-12" src={logo} alt="" />
        </div>

        {isNavbarOpen ? (
          <RxCross2 className="md:hidden text-4xl" onClick={toggleNavbar} />
        ) : (
          <IoIosMenu className="md:hidden text-4xl" onClick={toggleNavbar} />
        )}
        {isNavbarOpen ? (
          <>
            <nav className="w-full absolute top-14 left-0 h-screen bg-white md:block">
              <ul className="flex flex-col justify-center items-center h-full gap-10">
                <li>
                  <NavLink
                    className="font-semibold hover:text-purple-500 transition duration-150"
                    to="/"
                    onClick={toggleNavbar}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="font-semibold active:text-purple-500 hover:text-purple-500 transition duration-150"
                    to="/alltasks"
                    onClick={toggleNavbar}
                  >
                    Tasks
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="bg-purple-500 p-2 rounded text-white transition duration-150 hover:bg-purple-600 font-semibold"
                    to="/register"
                    onClick={toggleNavbar}
                  >
                    SignUp
                  </NavLink>
                </li>
              </ul>
            </nav>
            <nav className="w-full absolute top-16 left-0 h-screen bg-white md:block">
              <ul className="flex flex-col justify-center items-center h-full gap-10">
                <li>
                  <NavLink
                    className="font-semibold hover:text-purple-500 transition duration-150"
                    to="/"
                    onClick={toggleNavbar}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="font-semibold active:text-purple-500 hover:text-purple-500 transition duration-150"
                    to="/alltasks"
                    onClick={toggleNavbar}
                  >
                    Tasks
                  </NavLink>
                </li>
                <li className="flex gap-2">
                  <NavLink
                    className="bg-white p-1 rounded border-2 border-purple-500 text-purple-500 transition duration-150 hover:text-white hover:bg-purple-600 font-semibold"
                    to="/login"
                    onClick={toggleNavbar}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    className="bg-purple-500 p-2 rounded text-white transition duration-150 hover:bg-purple-600 font-semibold"
                    to="/register"
                    onClick={toggleNavbar}
                  >
                    SignUp
                  </NavLink>
                </li>
              </ul>
            </nav>
          </>
        ) : (
          ""
        )}
        <nav className="w-full md:flex md:justify-end hidden bg-white">
          <ul className="flex items-center  gap-10">
            <li>
              <NavLink
                className="font-semibold hover:text-purple-500 transition duration-150"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="font-semibold active:text-purple-500 hover:text-purple-500 transition duration-150"
                to="/alltasks"
              >
                Tasks
              </NavLink>
            </li>
            <li className="flex gap-2">
              {isAuthenticated && isAuthenticated ? (
                <>
                  {" "}
                  <NavLink
                    className="bg-purple-500 p-1 rounded border-2 border-purple-500 text-white transition duration-150 hover:bg-purple-600 font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    className="bg-white p-1 rounded border-2 border-purple-500 text-purple-500 transition duration-150 hover:text-white hover:bg-purple-600 font-semibold"
                    to="/login"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    className="bg-purple-500 p-1 rounded border-2 border-purple-500 text-white transition duration-150 hover:bg-purple-600 font-semibold"
                    to="/register"
                  >
                    SignUp
                  </NavLink>
                </>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
