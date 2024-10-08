import React from "react";
import logo from "../../images/logo.png";
import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa6";
const Footer = () => {
  return (
    <>
      <footer className="p-2 bg-slate-100">
        <section className="md:flex md:justify-between">
          <section className="flex flex-col items-center my-4">
            <img className="w-60" src={logo} alt="" />
            <p className="text-slate-400">
              "TeamTrack: Uniting Teams, Tracking Progress"
            </p>
          </section>
          <hr />
          <section className="flex flex-col my-4 ">
            <div className="flex flex-col items-center mt-6 mb-6">
              <h1 className="text-2xl font-bold text-purple-600">
                Quick Links
              </h1>
            </div>
            <div className="flex justify-center gap-20 mt-4">
              <ul className="flex flex-col gap-4 text-slate-500">
                <li>
                  <NavLink>Home</NavLink>
                </li>
                <li>
                  <NavLink>About Us</NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink>Contact Us</NavLink>
                </li>
              </ul>
              <ul className="flex flex-col gap-4 text-slate-500">
                <li>
                  {" "}
                  <NavLink>FAQ</NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink>Terms of Service</NavLink>
                </li>
                <li>
                  {" "}
                  <NavLink>Privacy Policy</NavLink>
                </li>
              </ul>
            </div>
          </section>
          <hr />
          <section className="mt-4 lg:w-1/3 ">
            <ul className="flex justify-center my-4">
              <div className="flex flex-col gap-4">
                <div className="flex justify-center">
                  <h1 className="text-2xl font-bold text-purple-600">
                    Contact Us
                  </h1>
                </div>
                <li>
                  <h1 className="text-slate-400">
                    Email: {""}
                    <a
                      className="text-blue-600"
                      href="mailto:iqrashjalil@gmail.com"
                    >
                      iqrashjalil@gmail.com
                    </a>
                  </h1>
                </li>
                <li>
                  <h1 className="text-slate-400">
                    Phone: <span className="text-black">0302-8950855</span>
                  </h1>
                </li>
                <li>
                  <h1 className="text-slate-400">
                    Address:{" "}
                    <span className="text-black">
                      Talagang, Punjab, Pakistan
                    </span>
                  </h1>
                </li>
              </div>
            </ul>
            <hr />
            <div className="flex justify-center my-4">
              <h1 className="font-bold text-purple-600">Get In Touch</h1>
            </div>
            <ul className="flex justify-center gap-4">
              <li className="flex items-center gap-2">
                <FaLinkedin className="text-blue-600" />
                <a
                  href="https://www.linkedin.com/in/iqrashjalil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  LinkedIn
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaInstagram className="text-red-600" />
                <a
                  href="https://www.instagram.com/iqrashjalil/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600"
                >
                  Instagram
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaFacebook className="text-blue-600" />
                <a
                  href="https://web.facebook.com/igiqrash1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </section>
        </section>
        <hr className="mt-4" />
        <p className="flex justify-center text-sm text-slate-400">
          <span>All &copy; Rights Reserved by Iqrash Jalil</span>
        </p>
      </footer>
    </>
  );
};

export default Footer;
