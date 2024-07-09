import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../store/slices/projectSlice.jsx";
import { FaArrowRight } from "react-icons/fa";

const All_Tasks = () => {
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  return (
    <>
      <section className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="p-2 w-full">
          <h1 className="font-bold text-2xl text-slate-500">Select Project</h1>

          {projects?.map((project) => (
            <div

            onClick={""}
              className="flex justify-between items-center rounded border mb-2 border-slate-200 p-2 cursor-pointer hover:bg-slate-100 transition-all duration-200 group"
              key={project._id}
            >
              <div className="flex items-center gap-2">
                <p>{project.projectName}</p>
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

export default All_Tasks;
