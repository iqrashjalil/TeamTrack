import React from "react";
import HomeImg from "../images/home.png";
import picture from "../images/new.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MdSpatialTracking, MdOutlineDynamicForm } from "react-icons/md";
import { FaUnlockAlt, FaTasks } from "react-icons/fa";
import { FaCloudArrowUp } from "react-icons/fa6";
import { IoNotificationsSharp } from "react-icons/io5";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  return (
    <>
      <section className="p-2">
        <div className="flex flex-col lg:h-[93vh] w-full lg:flex-row lg:justify-center items-center ">
          <div className="h-max lg:w-1/2 lg:pl-28">
            <h1 className="text-4xl md:text-8xl font-poppins drop-shadow-md text-purple-600 font-extrabold">
              <span className="text-slate-700 md:text-7xl">
                Project Management Tool
              </span>{" "}
              TeamTrack
            </h1>
            <p className="text-slate-400 mt-4 lg:w-3/4">
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
                className="bg-purple-600 p-2 rounded-full w-28 font-semibold mt-2 border-2 border-purple-600 hover:bg-transparent hover:text-purple-600 text-white transition-all duration-150"
              >
                Login
              </button>
            )}
          </div>
          <div className="flex justify-center h-max mt-10 md:w-1/2">
            <img className="w-full drop-shadow-md" src={HomeImg} alt="" />
          </div>
        </div>
        <div className="bg-slate-100 w-full">
          <div className="flex justify-center">
            <h1 className=" mb-4 relative w-fit font-bold text-4xl text-slate-500 pb-1">
              <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
              Features
            </h1>
          </div>

          <div className="flex justify-center gap-x-72 gap-y-20 flex-wrap">
            <div className="flex flex-col w-64 items-center p-2">
              <MdSpatialTracking className="text-7xl drop-shadow-md text-purple-600" />
              <h1 className="text-lg mt-4 font-bold font-poppins text-slate-700">
                Progress Tracking
              </h1>
              <p className="text-sm mt-2 text-slate-400 font-poppins">
                Visualize your project’s progress with intuitive progress bars,
                helping you keep track of task completion and project
                milestones.
              </p>
            </div>
            <div className="flex flex-col w-64 items-center p-2">
              <MdOutlineDynamicForm className="text-7xl drop-shadow-md text-green-400" />
              <h1 className="text-lg mt-4 font-bold font-poppins text-slate-700">
                Dynamic Team
              </h1>
              <p className="text-sm mt-2 text-slate-400 font-poppins">
                Assign team members to project managers with ease, ensuring the
                right people are always on the right tasks.
              </p>
            </div>
            <div className="flex flex-col w-64 items-center p-2">
              <FaUnlockAlt className="text-7xl drop-shadow-md text-yellow-400" />
              <h1 className="text-lg mt-4 font-bold font-poppins text-slate-700">
                Role-Based Access
              </h1>
              <p className="text-sm mt-2 text-slate-400 font-poppins">
                Control access to routes and features based on user roles,
                providing project managers and admins with the appropriate level
                of control and oversight.
              </p>
            </div>
            <div className="flex flex-col w-64 items-center p-2">
              <FaCloudArrowUp className="text-7xl drop-shadow-md text-blue-600" />
              <h1 className="text-lg mt-4 font-bold font-poppins text-slate-700">
                Cloud-Based Storage
              </h1>
              <p className="text-sm mt-2 text-slate-400 font-poppins">
                Securely store and manage your files with Cloudinary
                integration, making file uploads and image storage seamless and
                accessible.
              </p>
            </div>
            <div className="flex flex-col w-64 items-center p-2">
              <IoNotificationsSharp className="text-7xl drop-shadow-md text-cyan-400" />
              <h1 className="text-lg mt-4 font-bold font-poppins text-slate-700">
                Real-Time Notifications
              </h1>
              <p className="text-sm mt-2 text-slate-400 font-poppins">
                Stay informed with instant updates on task assignments, project
                progress, and team activities, powered by real-time technology.
              </p>
            </div>
            <div className="flex flex-col w-64 items-center p-2">
              <FaTasks className="text-7xl drop-shadow-md text-red-600" />
              <h1 className="text-lg mt-4 font-bold font-poppins text-slate-700">
                Task Prioritization
              </h1>
              <p className="text-sm mt-2 text-slate-400 font-poppins">
                Easily prioritize tasks to ensure your team focuses on what's
                most important, helping you meet deadlines and achieve project
                goals efficiently.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white w-full mt-4">
          <div className="flex justify-center">
            <h1 className=" mb-4 relative w-fit font-bold text-4xl text-slate-500 pb-1">
              <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
              Contact Me
            </h1>
          </div>
          <div className="w-full lg:flex lg:items-center lg:justify-center">
            <div className="lg:w-2/5">
              <h1 className="text-3xl font-extrabold text-slate-700 lg:text-7xl">
                Interested in{" "}
                <span className="relative drop-shadow-md text-purple-600 text-4xl lg:text-8xl">
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
                collaborate on your next big idea, I'm ready to make an impact.
              </p>
              <div className="mt-4 flex justify-center lg:justify-start gap-5">
                <button
                  onClick={(e) =>
                    (window.location.href = "https://iqrashjalil.github.io")
                  }
                  className="p-4 w-36 border-2 border-purple-600 rounded-full font-semibold hover:bg-purple-600 hover:text-white transition-all duration-200"
                >
                  View Portfolio
                </button>
                <button className="p-4 w-36 border-2 bg-purple-600 border-purple-600 rounded-full font-semibold hover:bg-purple-700 text-white transition-all duration-200">
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
        <div className="bg-slate-100">sadasdas</div>
      </section>

      <div class="absolute top-0 -z-10 h-full w-full bg-white">
        <div class="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
    </>
  );
};

export default Home;
