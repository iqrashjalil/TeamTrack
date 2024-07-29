import React, { useEffect, useRef, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjectManagers } from "../../store/slices/UserSlice.jsx";
import {
  clearSuccess,
  getSingleProject,
  updateProject,
} from "../../store/slices/projectSlice.jsx";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader.jsx";

const Edit_Project = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    loading: usersLoading,
    projectManagers,
    user,
  } = useSelector((state) => state.users);
  const { loading, success, error, projectDetails } = useSelector(
    (state) => state.projects
  );

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    projectManager: "",
  });

  useEffect(() => {
    if (success) {
      toast.success("Project Updated Successfully");
      dispatch(clearSuccess());
    }
    if (error) {
      toast.error(error);
    }
    dispatch(getAllProjectManagers());
    if (id) {
      dispatch(getSingleProject(id));
    }
  }, [dispatch, success, error, id]);

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
      {usersLoading ? (
        <Loader />
      ) : (
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
                    Select Project Manager{" "}
                    <span className="text-red-600">*</span>
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
                className="bg-purple-600 flex justify-center items-center h-10 p-2 mt-6 w-full text-slate-100 font-semibold hover:bg-purple-700 transition duration-200"
              >
                {loading ? (
                  <>
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </>
                ) : (
                  "Update Project"
                )}
              </button>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Edit_Project;
