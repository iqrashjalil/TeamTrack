import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectManagers } from "../../store/slices/UserSlice.jsx";
import { createProject } from "../../store/slices/projectSlice.jsx";
import { toast } from "react-toastify";

const Create_Project = () => {
  const dispatch = useDispatch();
  const { projectManagers } = useSelector((state) => state.users);
  const { message, error } = useSelector((state) => state.projects);

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(getAllProjectManagers());
  }, [dispatch, message, toast, error]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("projectName", e.target.projectName.value);
    formData.append("description", e.target.description.value);
    formData.append("projectManager", e.target.projectManager.value);

    dispatch(createProject(formData));
  };
  return (
    <>
      <section className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="p-4 w-full lg:flex flex-col items-center">
          <h1 className="text-4xl flex justify-center font-bold text-slate-400">
            <span>Create Project</span>
          </h1>
          <hr className="mt-2" />
          <form
            onSubmit={handleSubmit}
            className="mt-2 bg-slate-100 p-4 rounded"
          >
            <div>
              <label className="text-slate-400" htmlFor="projectName">
                Project Name <span className="text-red-600">*</span>
              </label>
              <input
                id="projectName"
                className="w-full p-2 mt-1 rounded bg-slate-200"
                type="text"
                placeholder="Enter Project Name"
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
                placeholder="Enter Project Description"
                rows="10"
                required
              ></textarea>
            </div>
            <div>
              <label className="text-slate-400" htmlFor="projectManager">
                Select Project Manager <span className="text-red-600">*</span>
              </label>
              <select
                className="w-full p-2 mt-1 rounded bg-slate-200"
                name="projectManager"
                id="projectManager"
                required
              >
                <option value="">Select Project Manager</option>
                {projectManagers &&
                  projectManagers.map((manager) => (
                    <option key={manager._id} value={manager._id}>
                      {manager.name}
                    </option>
                  ))}
              </select>
            </div>
            <button
              type="submit"
              className="bg-purple-400 p-2 mt-6 w-full text-slate-100 font-semibold hover:bg-purple-500 transition duration-200"
            >
              {" "}
              Create
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Create_Project;
