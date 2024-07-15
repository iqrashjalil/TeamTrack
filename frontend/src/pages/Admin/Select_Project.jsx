import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllProjects } from "../../store/slices/projectSlice.jsx";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const Select_Project = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projects } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(getAllProjects());
  }, [dispatch]);

  const handleOnClick = (projectid) => {
    navigate(`/task/${projectid}`);
  };

  const handleDelete = (projectid) => {
    dispatch("");
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

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Project Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Project Manager
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              {projects?.map((project) => (
                <tbody key={project._id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {project.projectName}
                    </th>

                    <td className="px-6 py-4">
                      {project.projectManager?.name}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        project.projectStatus === "InProgress"
                          ? "text-red-600"
                          : "text-green-400"
                      }`}
                    >
                      {project.projectStatus}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleOnClick(project._id)}
                          className="flex items-center gap-1 bg-purple-600 text-white p-1 rounded transition-all duration-200 hover:bg-transparent hover:text-purple-600 border border-purple-600"
                        >
                          View
                          <FaEye />
                        </button>
                        <button
                          onClick={(e) => handleDelete(project._id)}
                          className="flex items-center border-red-600 border text-red-600 rounded hover:bg-red-600 hover:text-white transition-all duration-200 p-1"
                        >
                          Delete
                          <MdDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Select_Project;
