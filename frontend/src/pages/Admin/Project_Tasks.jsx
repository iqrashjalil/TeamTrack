import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { projectTasks } from "../../store/slices/Task_Slice";
import { useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { MdOutlineDoNotDisturb } from "react-icons/md";
const Project_Tasks = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allTasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(projectTasks(id));
  }, [dispatch, id]);
  return (
    <>
      <section className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>

        {allTasks.length > 0 ? (
          <>
            {" "}
            <div className="p-2 w-full">
              <h1 className=" mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
                <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                All Tasks
              </h1>

              {allTasks?.map((task) => (
                <div
                  className="flex justify-between items-center rounded border mb-2 border-slate-200 p-2 cursor-pointer hover:bg-slate-100 transition-all duration-200 group"
                  key={task._id}
                >
                  <div className="flex items-center gap-2">
                    <p>{task.title}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaArrowRight className="transform text-xl text-purple-500 transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center h-screen w-full">
            <MdOutlineDoNotDisturb size={60} className="text-purple-600" />
            <p className="text-xl text-slate-500">
              No tasks found for this project.
            </p>
          </div>
        )}
      </section>
    </>
  );
};

export default Project_Tasks;
