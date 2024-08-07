import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, projectTasks } from "../../store/slices/Task_Slice";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { MdDelete, MdOutlineDoNotDisturb } from "react-icons/md";
import Loader from "../../components/loader/Loader";

const Project_Tasks = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { allTasks, loading } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(projectTasks(id));
  }, [dispatch, id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
    navigate("/alltasks");
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <section className="flex min-h-screen">
          <div>
            <Sidebar />
          </div>

          {allTasks.length > 0 ? (
            <>
              <div className="p-2 w-full">
                <h1 className="mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
                  <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                  All Tasks
                </h1>
                <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Task Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Status
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Assigned To
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Due Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    {allTasks?.map((task) => (
                      <tbody key={task._id}>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {task.title}
                          </th>
                          <td
                            className={`px-6 py-4 ${
                              task.status === "Pending" ||
                              task.status === "InProgress"
                                ? "text-red-600"
                                : "text-green-400"
                            }`}
                          >
                            {task.status}
                          </td>
                          <td className="px-6 py-4">{task.assignedTo?.name}</td>
                          <td className="px-6 py-4">
                            {formatDate(task.dueDate)}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <NavLink
                                to={`/taskdetail/${task._id}`}
                                className="flex items-center gap-1 bg-purple-600 text-white p-1 rounded transition-all duration-200 hover:bg-transparent hover:text-purple-600 border border-purple-600"
                              >
                                View
                                <FaEye />
                              </NavLink>
                              <button
                                onClick={(e) => handleDelete(task._id)}
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
      )}
    </>
  );
};

export default Project_Tasks;
