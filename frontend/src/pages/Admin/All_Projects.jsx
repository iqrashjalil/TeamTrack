import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearMessage,
  getAllProjects,
} from "../../store/slices/projectSlice.jsx";
import { toast } from "react-toastify";

const All_Projects = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects, error, message } = useSelector((state) => state.projects);
  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);

      dispatch(clearMessage());
    }
  }, [message, error]);

  const handleCardClick = (id) => () => {
    navigate(`/projectdetails/${id}`);
  };
  return (
    <section className="min-h-screen flex">
      <div>
        <Sidebar />
      </div>
      <div className="w-full p-4">
        <div>
          <h1 className=" mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
            <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
            All Projects
          </h1>
        </div>
        <div className="flex justify-center gap-4 mt-4 flex-wrap">
          {projects &&
            projects.map((project) => (
              <div
                key={project._id}
                onClick={handleCardClick(project._id)}
                className="bg-slate-100 rounded p-2 w-64 h-32 cursor-pointer hover:bg-slate-200 transition-all duration-200"
              >
                <h1 className="text-slate-500 text-lg font-bold truncate">
                  {project.projectName}
                </h1>
                <p className="line-clamp-2 text-slate-400">
                  {project.description}
                </p>
                <div className="flex items-center">
                  <p className="text-sm text-slate-500">Project Status:</p>
                  <p
                    className={`text-sm ${
                      project.projectStatus === "Completed"
                        ? "text-green-400"
                        : "text-red-400"
                    }  font-semibold truncate`}
                  >
                    {" "}
                    {project.projectStatus}{" "}
                  </p>
                </div>
                <div className="flex items-center">
                  <p className="text-xs text-slate-500">Project Manager:</p>
                  <p className="max-w-36 text-sm text-purple-500 font-semibold truncate">
                    {" "}
                    {project.projectManager?.name}{" "}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default All_Projects;
