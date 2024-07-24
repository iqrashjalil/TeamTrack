import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getTaskDetail } from "../../store/slices/Task_Slice.jsx";
import { useParams } from "react-router-dom";

const Task_Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { taskDetail } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getTaskDetail(id));
  }, [dispatch]);
  return (
    <>
      <section className="flex">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className="p-2">
          <h1 className="mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
            <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
            Task Details
          </h1>
          <div>
            <h1 className="font-semibold text-slate-700">
              {taskDetail?.title}
            </h1>
            <p className="text-sm text-slate-400">{taskDetail?.description}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Task_Details;
