import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  getTaskDetail,
  resetSuccess,
  updateTask,
} from "../../store/slices/Task_Slice.jsx";
import { NavLink, useParams } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { toast } from "react-toastify";

const Task_Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { taskDetail, loading, error, success } = useSelector(
    (state) => state.tasks
  );
  const { user } = useSelector((state) => state.users);
  const [status, setStatus] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const formattedDate = taskDetail?.dueDate
    ? new Date(taskDetail.dueDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";
  const currentDate = new Date();
  const dueDate = taskDetail?.dueDate ? new Date(taskDetail.dueDate) : null;
  const timeDifference = dueDate
    ? Math.ceil((dueDate - currentDate) / (1000 * 60 * 60 * 24))
    : null;
  useEffect(() => {
    if (taskDetail) {
      setStatus(taskDetail.status);
    }
  }, [taskDetail]);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Status Updated Successfully!");
      dispatch(resetSuccess());
    }
    dispatch(getTaskDetail(id));
  }, [dispatch, error, success]);

  return (
    <>
      <section className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="p-2 lg:flex w-full">
          <div className="lg:w-1/2 p-2">
            <h1 className="mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
              <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
              Task Details
            </h1>
            <h1 className="font-semibold text-slate-700">
              {taskDetail?.title}
            </h1>
            <p className="text-sm mt-4 text-slate-400">
              {taskDetail?.description}
            </p>
            <div className="sm:flex gap-4">
              <p className="text-slate-400 mt-4">
                Status:{" "}
                <span
                  className={`${
                    taskDetail?.status == "Completed"
                      ? "text-green-400"
                      : "text-red-600"
                  } font-semibold text-sm shadow-sm px-2 bg-slate-100 p-1 rounded-full`}
                >
                  {taskDetail?.status}
                </span>
              </p>

              <p className="text-slate-400 mt-4">
                Due Date:{" "}
                <span
                  className={`${
                    timeDifference <= 3 ? "text-red-600" : "text-green-400"
                  } font-semibold text-sm shadow-sm px-2 bg-slate-100 p-1 rounded-full`}
                >
                  {formattedDate}
                </span>
              </p>
            </div>
          </div>
          <hr className="mt-4 mx-20 lg:hidden" />
          <div className="h-full w-[2px] hidden lg:block bg-slate-200"></div>
          <div className="lg:w-1/2">
            {taskDetail?.subtasks.length > 0 && (
              <div className="border rounded  border-purple-200 mt-4 mx-2 p-2">
                <h1 className="font-bold text-lg text-slate-700">Sub-Tasks</h1>
                {taskDetail &&
                  taskDetail.subtasks.map((subtask) => (
                    <div
                      key={subtask._id}
                      className="flex p-2 mb-4 items-center justify-between border rounded cursor-pointer border-slate-200 group text-slate-400 hover:bg-slate-100 hover:text-black hover:font-semibold"
                    >
                      <p className="text-sm">{subtask.title}</p>

                      <FaArrowRight className="transform text-purple-500 transition-transform group-hover:translate-x-2" />
                    </div>
                  ))}
              </div>
            )}

            <div className="p-2 flex flex-col">
              <label className="text-slate-400" htmlFor="status">
                Update Status:
              </label>
              <div className="flex gap-[2%]">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-slate-200 w-3/4 p-2 focus:outline-none border-2 cursor-pointer focus:border-purple-600 rounded"
                  name="status"
                  id="status"
                >
                  <option value="Completed">Completed</option>
                  <option value="InProgress">In Progress</option>
                  <option value="Pending">Pending</option>
                </select>
                <button
                  onClick={() =>
                    dispatch(
                      updateTask({
                        id: taskDetail?._id,
                        formData: { status: status },
                      })
                    )
                  }
                  className="bg-purple-600 w-[23%] font-semibold hover:bg-purple-700 transition-all duration-200 rounded text-white p-2 border-2 border-purple-600"
                >
                  Update Status
                </button>
              </div>
            </div>
            <div className="p-2">
              <h1 className="text-slate-400">
                {taskDetail?.assignedTo?.name == user?.name ? (
                  <span className="text-black font-semibold">You are</span>
                ) : (
                  <span className="text-black font-semibold">
                    {taskDetail?.assignedTo?.name}
                  </span>
                )}{" "}
                Working on this Task
              </h1>
            </div>
            {(user?.role == "admin" || user?.role == "project_manager") && (
              <div className="flex p-2 w-full gap-[2%]">
                <NavLink
                  to={`/edittask/${id}`}
                  className="p-2 flex justify-center items-center bg-purple-600 text-white font-semibold w-[49%] rounded hover:bg-purple-700 transition-all duration-200"
                >
                  Edit Task
                </NavLink>

                <button
                  onClick={openModal}
                  className="block w-[49%] text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
                  type="button"
                >
                  Delete
                </button>

                {isModalOpen && (
                  <div
                    id="popup-modal"
                    tabIndex="-1"
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden h-[calc(100%-1rem)] max-h-full"
                  >
                    <div className="relative w-full max-w-md max-h-full p-4">
                      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button
                          type="button"
                          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          onClick={closeModal}
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                        <div className="p-4 md:p-5 text-center">
                          <svg
                            className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>
                          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to delete {taskDetail?.title}
                          </h3>
                          <button
                            // onClick={(e) => handleDelete()}
                            type="button"
                            className="text-white h-10 bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                          >
                            {" "}
                            {loading ? (
                              <>
                                <div role="status">
                                  <svg
                                    aria-hidden="true"
                                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
                              " Yes, I'm sure"
                            )}
                          </button>
                          <button
                            onClick={closeModal}
                            type="button"
                            className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-purple-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            No, cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Task_Details;
