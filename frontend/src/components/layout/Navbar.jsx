import React, { useState } from "react";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/UserSlice";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.users);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  return (
    <>
      <header className="flex justify-between items-center bg-slate-100 h-12 px-4">
        <div className="flex-shrink-0 flex-grow-0">
          <img className="w-8" src={logo} alt="" />
        </div>
        <div className="flex justify-center gap-2">
          <div
            onClick={toggleDropdown}
            className="flex items-center cursor-pointer gap-2 md:hidden"
          >
            <img
              className="w-7 h-7 rounded-full drop-shadow"
              src={user?.profilePicture}
              alt=""
            />
            <BiSolidDownArrow className="text-1xl text-slate-200" />
          </div>
          {isDropdownOpen ? (
            <div className="absolute top-14 bg-slate-100 right-20 md:right-8 rounded">
              <ul>
                <li
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 p-2 m-1 rounded transition-all hover:text-purple-500 duration-200 hover:bg-slate-100"
                >
                  <IoPersonSharp />
                  <NavLink className="text-slate-500">Edit Profile</NavLink>
                </li>
                <hr />
                <li
                  onClick={handleLogout}
                  className="flex items-center gap-2 p-2 m-1 rounded hover:text-purple-500 hover:bg-slate-100"
                >
                  <IoMdExit />
                  <NavLink className="text-slate-500">Logout</NavLink>
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}

          {isNavbarOpen ? (
            <RxCross2 className="md:hidden text-4xl" onClick={toggleNavbar} />
          ) : (
            <IoIosMenu className="md:hidden text-4xl" onClick={toggleNavbar} />
          )}
        </div>
        {isNavbarOpen ? (
          <>
            <nav className="w-full absolute top-12 left-0 z-10 h-screen bg-slate-100 md:block">
              <ul className="flex flex-col justify-center items-center h-full gap-10">
                <li>
                  <NavLink
                    className={`font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150`}
                    to="/"
                    onClick={toggleNavbar}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className={`font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150`}
                    to="/alltasks"
                    onClick={toggleNavbar}
                  >
                    Tasks
                  </NavLink>
                </li>
                <li className="flex gap-2">
                  {isAuthenticated && isAuthenticated ? (
                    <></>
                  ) : (
                    <>
                      <NavLink
                        className={`font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150`}
                        to="/login"
                      >
                        Login
                      </NavLink>
                      <NavLink
                        className={`font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150`}
                        to="/register"
                      >
                        SignUp
                      </NavLink>
                    </>
                  )}
                </li>
              </ul>
            </nav>
          </>
        ) : (
          ""
        )}
        <nav className="w-full md:flex md:justify-end hidden bg-slate-100">
          <ul className="flex items-center  gap-10">
            <li>
              <NavLink
                className={`font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150`}
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={`font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150`}
                to="/alltasks"
              >
                Tasks
              </NavLink>
            </li>
            <li className="flex gap-2">
              {isAuthenticated && isAuthenticated ? (
                <>
                  <div
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <img
                      className="w-7 h-7 rounded-full drop-shadow"
                      src={user?.profilePicture}
                      alt=""
                    />
                    <BiSolidDownArrow className="text-1xl text-slate-200" />
                  </div>
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
