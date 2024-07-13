import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../store/slices/projectSlice.jsx";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Select_Project = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const handleClick = (projectid) => {
    navigate(`/task/${projectid}`);
  };
  return (
    <>
      <section className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="p-2 w-full">
          <h1 className=" mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
            <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
            Select Project
          </h1>

          {projects?.map((project) => (
            <div
              onClick={(e) => handleClick(project._id)}
              className="flex justify-between items-center rounded border mb-2 border-slate-200 p-2 cursor-pointer hover:bg-slate-100 transition-all duration-200 group"
              key={project._id}
            >
              <div className="flex justify-center flex-col gap-2">
                <p className="text-slate-400">
                  <span className="font-semibold text-black">
                    Project Name:
                  </span>
                  {project.projectName}
                </p>
                <p className="text-purple-600 font-semibold">
                  <span className="font-semibold text-black">
                    {" "}
                    Project Manager:
                  </span>
                  {project?.projectManager?.name}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaArrowRight className="transform text-xl text-purple-500 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Select_Project;
