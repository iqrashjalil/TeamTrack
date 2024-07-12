import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import {
  clearMessage,
  deleteProject,
  getSingleProject,
} from "../../store/slices/projectSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

const Project_Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projectDetails, error, message } = useSelector(
    (state) => state.projects
  );
  useEffect(() => {
    dispatch(getSingleProject(id));
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, id, error, message, toast]);

  const totalTasks = projectDetails?.task.length;
  const completedTasks = projectDetails?.task.filter(
    (task) => task.status === "Completed"
  ).length;
  const pendingTasks = totalTasks - completedTasks;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <>
      <section className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="p-1 flex flex-col md:flex-row md:items-start items-center w-full">
          <div className="md:w-1/2 md:p-4">
            <h1 className="font-bold text-slate-700  text-2xl ">
              {projectDetails?.projectName}
            </h1>
            <p className="text-slate-400 text-sm mt-4">
              {projectDetails?.description}
            </p>

            <div>
              <h1 className="font-semibold text-md mt-4 text-slate-400">
                Project Manager:{" "}
                <span className="font-bold text-lg text-slate-700">
                  {projectDetails?.projectManager?.name}
                </span>
              </h1>
            </div>

            <div className="flex justify-between mt-4 mb-1">
              <span className="text-base font-medium text-purple-500 dark:text-white">
                Completed
              </span>
              <span className="text-sm font-medium text-purple-500 dark:text-white">
                {progressPercentage.toFixed()}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-green-400 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <hr className="mt-4 w-full md:hidden" />
          <div className="md:flex items-center hidden ">
            <div className="h-screen border-l border-gray-300"></div>
          </div>

          <div className="mt-4 w-full md:w-1/2 md:p-4 md:mt-0">
            {projectDetails?.projectManager && (
              <div className="border rounded border-slate-200 p-2">
                <h1 className="font-bold text-lg text-slate-700">
                  Team Members
                </h1>
                <div className="flex p-2 mb-4 items-center justify-between border rounded hover:bg-slate-100 cursor-pointer border-slate-200 group">
                  <div className="flex items-center">
                    <img
                      className="w-7 rounded-full mr-2"
                      src={projectDetails?.projectManager?.profilePicture}
                      alt=""
                    />
                    <p className="text-slate-400 text-sm">
                      {projectDetails?.projectManager?.name}
                    </p>
                  </div>
                  <FaArrowRight className="transform text-purple-500 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            )}

            {projectDetails?.task.length > 0 && (
              <div className="border rounded border-slate-200 mt-4 p-2">
                <h1 className="font-bold text-lg text-slate-700">Tasks</h1>
                {projectDetails &&
                  projectDetails.task.map((task) => (
                    <div
                      key={task._id}
                      className="flex p-2 mb-4 items-center justify-between border rounded cursor-pointer border-slate-200 group hover:bg-slate-100"
                    >
                      <p className="text-slate-400 text-sm">{task.title}</p>

                      <FaArrowRight className="transform text-purple-500 transition-transform group-hover:translate-x-2" />
                    </div>
                  ))}
              </div>
            )}

            <div className="mt-4 w-full flex gap-1 md:gap-4">
              <NavLink
                className="w-1/2 bg-purple-500 flex justify-center items-center text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 transition-all duration-200"
                to={`/editproject/${id}`}
              >
                {" "}
                Edit Project
              </NavLink>
              <button
                onClick={() => {
                  dispatch(deleteProject(id));
                  navigate("/allprojects");
                }}
                className="w-1/2 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition-all duration-200"
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Project_Details;
