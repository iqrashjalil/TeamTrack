/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import HomeImg from "../images/home.png";
import picture from "../images/new.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdSpatialTracking, MdOutlineDynamicForm } from "react-icons/md";
import { FaUnlockAlt, FaTasks } from "react-icons/fa";
import { FaCloudArrowUp } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";
import usmanasif from "../images/usmanasif.jpg";
import asifpeer from "../images/asifpeer.webp";
import bilal from "../images/bilal.jpg";
import salimghauri from "../images/salimghauri.jpg";
import { Element, scroller } from "react-scroll";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.section) {
      scroller.scrollTo(location.state.section, {
        duration: 500,
        delay: 0,
        smooth: "easeInOutQuart",
      });
    }
  }, [location]);
  return (
    <>
      <section className="p-2">
        <div className="flex flex-col lg:h-[93vh] w-full lg:flex-row lg:justify-center items-center ">
          <div className="h-max lg:w-1/2 lg:pl-28">
            <h1 className="text-4xl font-extrabold text-purple-600 xl:text-7xl 2xl:text-8xl md:text-8xl lg:text-7xl font-poppins drop-shadow-md">
              <span className="text-slate-700 xl:text-6xl 2xl:text-7xl md:text-7xl lg:text-6xl">
                Project Management Tool
              </span>{" "}
              TeamTrack
            </h1>
            <p className="mt-4 text-slate-400 lg:w-3/4">
              Effortlessly manage your projects and enhance team collaboration
              with TeamTrack, the ultimate project management tool designed to
              keep your workflow streamlined and efficient. Whether you're
              leading a small team or overseeing large-scale projects, TeamTrack
              offers a comprehensive suite of features tailored to meet your
              unique needs.
            </p>
            {!user && (
              <button
                onClick={(e) => navigate("/login")}
                className="p-2 mt-2 font-semibold text-white transition-all duration-150 bg-purple-600 border-2 border-purple-600 rounded-full w-28 hover:bg-transparent hover:text-purple-600"
              >
                Login
              </button>
            )}
          </div>
          <div className="flex justify-center mt-10 h-max md:w-1/2">
            <img className="w-full drop-shadow-md" src={HomeImg} alt="" />
          </div>
        </div>
        <Element name="features">
          <div className="w-full bg-slate-100">
            <div className="flex justify-center">
              <h1 className="relative pb-1 mb-4 text-4xl font-bold w-fit text-slate-500">
                <span className="absolute bottom-0 left-0 w-full h-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                Features
              </h1>
            </div>

            <div className="flex flex-wrap justify-center gap-x-72 gap-y-20">
              <div className="flex flex-col items-center w-64 p-2">
                <MdSpatialTracking className="text-purple-600 text-7xl drop-shadow-md" />
                <h1 className="mt-4 text-lg font-bold font-poppins text-slate-700">
                  Progress Tracking
                </h1>
                <p className="mt-2 text-sm text-slate-400 font-poppins">
                  Visualize your project’s progress with intuitive progress
                  bars, helping you keep track of task completion and project
                  milestones.
                </p>
              </div>
              <div className="flex flex-col items-center w-64 p-2">
                <MdOutlineDynamicForm className="text-green-400 text-7xl drop-shadow-md" />
                <h1 className="mt-4 text-lg font-bold font-poppins text-slate-700">
                  Dynamic Team
                </h1>
                <p className="mt-2 text-sm text-slate-400 font-poppins">
                  Assign team members to project managers with ease, ensuring
                  the right people are always on the right tasks.
                </p>
              </div>
              <div className="flex flex-col items-center w-64 p-2">
                <FaUnlockAlt className="text-yellow-400 text-7xl drop-shadow-md" />
                <h1 className="mt-4 text-lg font-bold font-poppins text-slate-700">
                  Role-Based Access
                </h1>
                <p className="mt-2 text-sm text-slate-400 font-poppins">
                  Control access to routes and features based on user roles,
                  providing project managers and admins with the appropriate
                  level of control and oversight.
                </p>
              </div>
              <div className="flex flex-col items-center w-64 p-2">
                <FaCloudArrowUp className="text-blue-600 text-7xl drop-shadow-md" />
                <h1 className="mt-4 text-lg font-bold font-poppins text-slate-700">
                  Cloud-Based Storage
                </h1>
                <p className="mt-2 text-sm text-slate-400 font-poppins">
                  Securely store and manage your files with Cloudinary
                  integration, making file uploads and image storage seamless
                  and accessible.
                </p>
              </div>
              <div className="flex flex-col items-center w-64 p-2">
                <IoNotificationsSharp className="text-7xl drop-shadow-md text-cyan-400" />
                <h1 className="mt-4 text-lg font-bold font-poppins text-slate-700">
                  Real-Time Notifications
                </h1>
                <p className="mt-2 text-sm text-slate-400 font-poppins">
                  Stay informed with instant updates on task assignments,
                  project progress, and team activities, powered by real-time
                  technology.
                </p>
              </div>
              <div className="flex flex-col items-center w-64 p-2">
                <FaTasks className="text-red-600 text-7xl drop-shadow-md" />
                <h1 className="mt-4 text-lg font-bold font-poppins text-slate-700">
                  Task Prioritization
                </h1>
                <p className="mt-2 text-sm text-slate-400 font-poppins">
                  Easily prioritize tasks to ensure your team focuses on what's
                  most important, helping you meet deadlines and achieve project
                  goals efficiently.
                </p>
              </div>
            </div>
          </div>
        </Element>
        <Element name="contact">
          <div className="w-full mt-4 bg-white">
            <div className="flex justify-center">
              <h1 className="relative pb-1 mb-4 text-4xl font-bold w-fit text-slate-500">
                <span className="absolute bottom-0 left-0 w-full h-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                Contact Me
              </h1>
            </div>
            <div className="w-full lg:flex lg:items-center lg:justify-center">
              <div className="lg:w-2/5">
                <h1 className="text-3xl font-extrabold text-slate-700 lg:text-7xl">
                  Interested in{" "}
                  <span className="relative text-4xl text-purple-600 drop-shadow-md lg:text-8xl">
                    Hiring{" "}
                    <div
                      className="bg-green-400 absolute drop-shadow-md right-[5px] top-5 hidden lg:block lg:w-[50px] lg:h-[50px]"
                      style={{
                        clipPath:
                          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                      }}
                    ></div>
                  </span>{" "}
                  Me?
                </h1>
                <p className="text-slate-400 lg:mt-4">
                  Explore the projects I've created to see my skills in action.
                  Whether you're looking to hire a talented developer or
                  collaborate on your next big idea, I'm ready to make an
                  impact.
                </p>
                <div className="flex justify-center gap-5 mt-4 lg:justify-start">
                  <button
                    onClick={(e) =>
                      (window.location.href = "https://iqrashjalil.github.io")
                    }
                    className="p-4 font-semibold transition-all duration-200 border-2 border-purple-600 rounded-full w-36 hover:bg-purple-600 hover:text-white"
                  >
                    View Portfolio
                  </button>
                  <button
                    onClick={(e) =>
                      (window.location.href = "mailto:iqrashjalil@gmail.com")
                    }
                    className="p-4 font-semibold text-white transition-all duration-200 bg-purple-600 border-2 border-purple-600 rounded-full w-36 hover:bg-purple-700"
                  >
                    Email Me
                  </button>
                </div>
              </div>
              <div className="relative min-h-[45vh] flex justify-center mt-4 lg:w-2/5">
                <div
                  className="flex lg:w-[400px] drop-shadow-md lg:h-[400px] w-[350px] h-[350px] justify-center items-center bg-purple-600"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
                  }}
                >
                  <div
                    className="bg-purple-700 drop-shadow-md lg:w-[350px] lg:h-[350px] w-[300px] h-[300px]"
                    style={{
                      clipPath:
                        "polygon(50% 0%, 83% 12%, 100% 43%, 94% 78%, 68% 100%, 32% 100%, 6% 78%, 0% 43%, 17% 12%)",
                    }}
                  ></div>
                </div>
                <div
                  className="drop-shadow-md bg-yellow-400 absolute lg:left-[10px] xl:left-[10px] 2xl:left-[100px] 2xl:top-[50px] hidden lg:block lg:w-[50px] lg:h-[50px]"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                ></div>
                <div
                  className="bg-green-400 drop-shadow-md absolute lg:left-[430px] xl:left-[480px] 2xl:left-[580px] bottom-20 hidden lg:block lg:w-[50px] lg:h-[50px]"
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                ></div>
                <img
                  className="absolute w-[26rem] bottom-0 h-auto drop-shadow-md"
                  src={picture}
                  alt=""
                />
              </div>
            </div>
          </div>
        </Element>
        <Element name="testimonials">
          <div className="bg-slate-100">
            <div className="flex justify-center">
              <h1 className="relative pb-1 mb-4 text-4xl font-bold w-fit text-slate-500">
                <span className="absolute bottom-0 left-0 w-full h-1 rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                Testimonials
              </h1>
            </div>
            <div className="flex flex-col gap-4 p-2 md:flex-row md:justify-center md:flex-wrap">
              <div className="flex gap-4 bg-white border md:w-[25rem] border-slate-100 rounded p-4">
                <div className="">
                  <img
                    className="rounded-lg w-[500px] "
                    src={asifpeer}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    "As the CEO of Systems Limited, I am always on the lookout
                    for tools that can enhance our project management processes.
                    TeamTrack has exceeded our expectations with its dynamic
                    team assignments and real-time notifications. It has
                    streamlined our operations, improved collaboration, and
                    significantly boosted our productivity."
                  </p>
                  <div className="mt-10">
                    <p className="font-semibold">Asif Peer</p>
                    <p className="text-slate-400">CEO Systems Limited</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 bg-white border md:w-[25rem] border-slate-100 rounded p-4">
                <div className="">
                  <img
                    className="rounded-lg w-[500px]"
                    src={usmanasif}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    "TeamTrack has been a game-changer for Devsinc. Its
                    intuitive interface and powerful features have streamlined
                    our project management processes, making it easier for our
                    teams to collaborate and stay on top of their tasks. The
                    real-time notifications and dynamic team assignments have
                    significantly improved our efficiency and productivity."
                  </p>
                  <div className="mt-10">
                    <p className="font-semibold">Usman Asif</p>
                    <p className="text-slate-400">Founder & CEO Devsinc</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 bg-white border md:w-[25rem] border-slate-100 rounded p-4">
                <div className="">
                  <img className="rounded-lg w-[500px]" src={bilal} alt="" />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    "Using TeamTrack has been a game-changer for Contour
                    Software. The seamless integration of task management and
                    team collaboration features has made it easier for us to
                    stay organized and deliver projects on time. TeamTrack is an
                    essential tool for any company aiming to enhance their
                    project management capabilities."
                  </p>
                  <div className="mt-10">
                    <p className="font-semibold">Bilal Mehmood</p>
                    <p className="text-slate-400">MD Contour Software</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 bg-white border md:w-[25rem] border-slate-100 rounded p-4">
                <div className="">
                  <img
                    className="rounded-lg w-[500px]"
                    src={salimghauri}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm text-slate-400">
                    "TeamTrack has revolutionized our approach to project
                    management at NetSol Technologies. The ability to
                    dynamically assign team members and receive real-time
                    updates has greatly improved our operational efficiency. I
                    highly recommend TeamTrack to any organization looking to
                    optimize their project management processes."
                  </p>
                  <div className="mt-10">
                    <p className="font-semibold">Salim Ghauri</p>
                    <p className="text-slate-400">
                      {" "}
                      Founder & CEO, NetSol Technologies
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Element>
      </section>

      <div className="absolute top-0 w-full h-full bg-white -z-10">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
    </>
  );
};

export default Home;
