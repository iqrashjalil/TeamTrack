import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getUserProjects } from "../../store/slices/projectSlice";
import { createTask, resetSuccess } from "../../store/slices/Task_Slice";
import { toast } from "react-toastify";

const Create_Task = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { userProjects } = useSelector((state) => state.projects);
  const { error, success } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(getUserProjects());
  }, [dispatch, error]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Task created successfully!");
      dispatch(resetSuccess());
    }
  }, [success, error]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    formData.append("projectId", e.target.projectId.value);
    formData.append("assignedTo", e.target.assignedTo.value);
    formData.append("dueDate", e.target.dueDate.value);

    dispatch(createTask(formData));
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
              Create Task
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
                  className="w-full p-2 mt-1 rounded bg-slate-200"
                  type="text"
                  placeholder="Enter Task Title"
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
                  required
                ></textarea>
              </div>
              <div>
                <label className="text-slate-400" htmlFor="projectId">
                  Select Project<span className="text-red-600">*</span>
                </label>
                <select
                  className="w-full p-2 mt-1 rounded bg-slate-200"
                  name="projectId"
                  id="projectId"
                  required
                >
                  <option value="">Select Project</option>
                  {userProjects &&
                    userProjects.map((userProject) => (
                      <option key={userProject._id} value={userProject?._id}>
                        {userProject.projectName}
                      </option>
                    ))}
                </select>
              </div>
              <div>
                <label className="text-slate-400" htmlFor="assignedTo">
                  Assigned To<span className="text-red-600">*</span>
                </label>
                <select
                  className="w-full p-2 mt-1 rounded bg-slate-200"
                  name="assignedTo"
                  id="assignedTo"
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
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-purple-600 rounded p-2 mt-6 w-full text-slate-100 font-semibold hover:bg-purple-700 transition duration-200"
              >
                {" "}
                Create Task
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Create_Task;
