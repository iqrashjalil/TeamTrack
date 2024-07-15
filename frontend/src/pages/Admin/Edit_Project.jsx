import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectManagers } from "../../store/slices/UserSlice.jsx";
import {
  getSingleProject,
  updateProject,
} from "../../store/slices/projectSlice.jsx";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const Edit_Project = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { projectManagers, user } = useSelector((state) => state.users);
  const { message, error, projectDetails } = useSelector(
    (state) => state.projects
  );

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    projectManager: "",
  });

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
    dispatch(getAllProjectManagers());
    if (id) {
      dispatch(getSingleProject(id));
    }
  }, [dispatch, message, error, id]);

  useEffect(() => {
    if (projectDetails) {
      setFormData({
        projectName: projectDetails.projectName,
        description: projectDetails.description,
        projectManager: projectDetails.projectManager?._id || "",
      });
    }
  }, [projectDetails]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();

    updatedFormData.append("projectName", formData.projectName);
    updatedFormData.append("description", formData.description);
    updatedFormData.append("projectManager", formData.projectManager);

    dispatch(updateProject({ id: id, updatedFormData: updatedFormData }));
  };

  return (
    <>
      <section className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="p-4 w-full lg:flex flex-col items-center">
          <h1 className=" mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
            <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
            Update Project
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
                name="projectName"
                className="w-full p-2 mt-1 rounded bg-slate-200"
                type="text"
                placeholder="Enter Project Name"
                required
                value={formData.projectName}
                onChange={handleChange}
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
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>
            {user?.role == "admin" && (
              <div>
                <label className="text-slate-400" htmlFor="projectManager">
                  Select Project Manager <span className="text-red-600">*</span>
                </label>
                <select
                  className="w-full p-2 mt-1 rounded bg-slate-200"
                  name="projectManager"
                  id="projectManager"
                  required
                  value={formData.projectManager}
                  onChange={handleChange}
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
            )}

            <button
              type="submit"
              className="bg-purple-600 p-2 mt-6 w-full text-slate-100 font-semibold hover:bg-purple-700 transition duration-200"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Edit_Project;
