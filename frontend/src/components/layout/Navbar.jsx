import React, { useState } from "react";
import logo from "../../images/logo.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/UserSlice";
import { BiSolidDownArrow } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdExit } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { Link as ScrollLink, scroller } from "react-scroll";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleNavClick = (section) => {
    if (location.pathname === "/") {
      // If already on the Home page, scroll to the section using scroller
      scroller.scrollTo(section, {
        duration: 500,
        smooth: true,
      });
    } else {
      // Navigate to Home page and pass section state
      navigate("/", { state: { section } });
    }
  };

  return (
    <>
      <header className="relative flex items-center justify-between h-12 px-4 bg-slate-100">
        <div className="flex-grow-0 flex-shrink-0">
          <img className="w-8" src={logo} alt="Logo" />
        </div>
        <div className="flex justify-center gap-2">
          {user && (
            <div
              onClick={toggleDropdown}
              className="flex items-center gap-2 cursor-pointer md:hidden"
            >
              <img
                className="rounded-full w-7 h-7 drop-shadow"
                src={user?.profilePicture}
                alt="User"
              />
              <BiSolidDownArrow className="text-1xl text-slate-200" />
            </div>
          )}

          {isDropdownOpen && (
            <div className="absolute  z-50 rounded top-14 bg-slate-100 right-20 md:right-8">
              <ul>
                <li
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 p-2 m-1 transition-all duration-200 rounded hover:text-purple-500 hover:bg-slate-100"
                >
                  <MdDashboard />
                  <NavLink to="/allprojects" className="text-slate-500">
                    Dashboard
                  </NavLink>
                </li>
                <li
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 p-2 m-1 transition-all duration-200 rounded hover:text-purple-500 hover:bg-slate-100"
                >
                  <IoPersonSharp />
                  <NavLink to="/profiledetails" className="text-slate-500">
                    Edit Profile
                  </NavLink>
                </li>

                <hr />
                <li
                  onClick={handleLogout}
                  className="flex items-center cursor-pointer gap-2 p-2 m-1 rounded hover:text-purple-500 hover:bg-slate-100"
                >
                  <IoMdExit />
                  <span className="text-slate-500 cursor-pointer">Logout</span>
                </li>
              </ul>
            </div>
          )}
          {isNavbarOpen ? (
            <RxCross2 className="text-4xl md:hidden" onClick={toggleNavbar} />
          ) : (
            <IoIosMenu className="text-4xl md:hidden" onClick={toggleNavbar} />
          )}
        </div>
        {isNavbarOpen && (
          <nav className="absolute left-0 z-10 w-full h-screen top-12 bg-slate-100 md:block">
            <ul className="flex flex-col items-center justify-center h-full gap-10">
              <li>
                <NavLink
                  className="hover:text-purple-500 font-semibold [&.active]:text-purple-500  transition duration-150"
                  to="/"
                  onClick={toggleNavbar}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150"
                  to="#"
                  onClick={() => {
                    handleNavClick("features");
                    toggleNavbar();
                  }}
                >
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150"
                  to="#"
                  onClick={() => {
                    handleNavClick("contact");
                    toggleNavbar();
                  }}
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150"
                  to="#"
                  onClick={() => {
                    handleNavClick("testimonials");
                    toggleNavbar();
                  }}
                >
                  Testimonials
                </NavLink>
              </li>
              <li className="flex gap-2">
                {isAuthenticated ? (
                  <>{/* Authenticated User's Additional Links */}</>
                ) : (
                  <>
                    <NavLink
                      className="font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150"
                      to="/login"
                      onClick={toggleNavbar}
                    >
                      Login
                    </NavLink>
                    <NavLink
                      className="font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150"
                      to="/register"
                      onClick={toggleNavbar}
                    >
                      SignUp
                    </NavLink>
                  </>
                )}
              </li>
            </ul>
          </nav>
        )}
        <nav className="hidden w-full md:flex md:justify-end bg-slate-100">
          <ul className="flex items-center gap-10">
            <li>
              <NavLink
                className="font-semibold [&.active]:text-purple-500 hover:text-purple-500 transition duration-150"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <ScrollLink
                className="font-semibold cursor-pointer [&.active]:text-purple-500 hover:text-purple-500 transition duration-150"
                to="features"
                smooth={true}
                duration={500}
                onClick={() => handleNavClick("features")}
              >
                Features
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                className="font-semibold cursor-pointer [&.active]:text-purple-500 hover:text-purple-500 transition duration-150"
                to="contact"
                smooth={true}
                duration={500}
                onClick={() => handleNavClick("contact")}
              >
                Contact
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                className="font-semibold cursor-pointer [&.active]:text-purple-500 hover:text-purple-500 transition duration-150"
                to="testimonials"
                smooth={true}
                duration={500}
                onClick={() => handleNavClick("testimonials")}
              >
                Testimonials
              </ScrollLink>
            </li>
            <li className="flex gap-2">
              {isAuthenticated ? (
                <div
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    className="rounded-full w-7 h-7 drop-shadow"
                    src={user?.profilePicture}
                    alt="User"
                  />
                  <BiSolidDownArrow className="text-1xl text-slate-600" />
                </div>
              ) : (
                <>
                  <NavLink
                    className="p-1 font-semibold text-purple-500 transition duration-150 bg-white border-2 border-purple-500 rounded hover:text-white hover:bg-purple-600"
                    to="/login"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    className="p-1 font-semibold text-white transition duration-150 bg-purple-500 border-2 border-purple-500 rounded hover:bg-purple-600"
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
