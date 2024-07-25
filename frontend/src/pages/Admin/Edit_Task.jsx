import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserProjects } from "../../store/slices/projectSlice";
import {
  createTask,
  getTaskDetail,
  resetSuccess,
  updateTask,
} from "../../store/slices/Task_Slice";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Edit_Task = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { taskDetail, error, success } = useSelector((state) => state.tasks);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    projectId: "",
    assignedTo: "",
    dueDate: "",
  });

  useEffect(() => {
    dispatch(getUserProjects());
  }, [dispatch, error]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Task Updated Successfully!");
      dispatch(resetSuccess());
    }
    dispatch(getTaskDetail(id));
  }, [dispatch, success, error]);

  useEffect(() => {
    if (taskDetail) {
      setFormData({
        title: taskDetail?.title || "",
        description: taskDetail?.description || "",
        projectId: taskDetail?.projectId || "",
        assignedTo: taskDetail?.assignedTo?._id || "",
        dueDate: taskDetail?.dueDate
          ? new Date(taskDetail?.dueDate).toISOString().split("T")[0]
          : "",
      });
    }
  }, [taskDetail]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();

    updatedFormData.append("title", formData.title);
    updatedFormData.append("description", formData.description);
    updatedFormData.append("projectId", formData.projectId);
    updatedFormData.append("assignedTo", formData.assignedTo);
    updatedFormData.append("dueDate", formData.dueDate);

    dispatch(updateTask({ id: id, formData: updatedFormData }));
  };

  return (
    <>
      <section className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="w-full">
          <div className="p-4 w-full flex flex-col items-center">
            <h1 className=" mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
              <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
              Edit Task
            </h1>
            <hr className="mt-2" />
            <form
              onSubmit={handleSubmit}
              className="mt-2 w-full bg-slate-100 p-4 rounded md:w-1/2 lg:w-2/6"
            >
              <div>
                <label className="text-slate-400" htmlFor="title">
                  Task Title <span className="text-red-600">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  className="w-full p-2 mt-1 rounded bg-slate-200"
                  type="text"
                  placeholder="Enter Task Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="text-slate-400" htmlFor="description">
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  className="w-full text-slate-500 p-2 mt-1 rounded bg-slate-200"
                  name="description"
                  id="description"
                  placeholder="Enter Task Description"
                  rows="10"
                  value={formData.description}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div>
                <label className="text-slate-400" htmlFor="assignedTo">
                  Assigned To<span className="text-red-600">*</span>
                </label>
                <select
                  className="w-full p-2 mt-1 rounded bg-slate-200"
                  name="assignedTo"
                  id="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Team Member</option>
                  {user &&
                    user.managedTeamMembers.map((member) => (
                      <option key={member._id} value={member._id}>
                        {member.name}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-slate-400" htmlFor="dueDate">
                  Due Date<span className="text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  className="w-full p-2 mt-1 rounded bg-slate-200"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 rounded p-2 mt-6 w-full text-slate-100 font-semibold hover:bg-purple-700 transition duration-200"
              >
                Update Task
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Edit_Task;
