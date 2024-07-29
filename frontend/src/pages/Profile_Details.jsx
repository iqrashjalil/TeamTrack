import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/layout/Sidebar.jsx";
import {
  deleteUser,
  resetSuccess,
  updateProfile,
} from "../store/slices/UserSlice.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loader/Loader.jsx";

const Profile_Details = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, success, loading } = useSelector((state) => state.users);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const id = user?._id;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProfile = new FormData();
    updatedProfile.append("name", formData.name);
    updatedProfile.append("email", formData.email);
    if (formData.password) {
      updatedProfile.append("password", formData.password);
    }
    if (formData.profilePicture) {
      updatedProfile.append("profilePicture", formData.profilePicture);
    }
    dispatch(updateProfile({ id, userData: updatedProfile }));
  };

  const handleDelete = () => {
    dispatch(deleteUser(id));
    navigate("/");
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        password: "",
        profilePicture: null,
      });
    }
    if (success) {
      toast.success("Profile Updated Successfully!");
      dispatch(resetSuccess());
    }
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      toast.s;
      navigate("/");
    }
  }, [error, user, success, dispatch]);

  useEffect(() => {
    if (isModalOpen && !user) {
      closeModal();
    }
  }, [isModalOpen, user]);

  return (
    <>
      {loading || !user ? (
        <Loader />
      ) : (
        <>
          {" "}
          <section className="flex">
            <div className="h-screen">
              <Sidebar />
            </div>
            <div className="p-2 w-full">
              <div className="">
                <h1 className="mb-4 relative w-fit font-bold text-4xl text-slate-500 pb-1">
                  <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                  Edit Profile
                </h1>
              </div>
              <form className="w-full" onSubmit={handleSubmit}>
                <div className="w-full flex justify-center">
                  <img
                    className="w-[200px] h-[200px] rounded-full"
                    src={user?.profilePicture}
                    alt=""
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-slate-400" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="p-2 bg-slate-100 focus:border-purple-600 border-2 rounded focus:outline-none"
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter Full Name"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-slate-400" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="p-2 bg-slate-100 focus:border-purple-600 border-2 rounded focus:outline-none"
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Valid Email"
                  />
                </div>
                <div className="flex flex-col mt-4">
                  <label className="text-slate-400" htmlFor="password">
                    Password
                  </label>
                  <input
                    className="p-2 bg-slate-100 focus:border-purple-600 border-2 rounded focus:outline-none"
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter New Password"
                  />
                </div>
                <div className="flex items-center justify-center w-full mt-4">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                      </p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="flex w-full gap-[5%] mt-4">
                  <button
                    type="submit"
                    className="w-[47.5%] h-10 bg-purple-600 font-semibold text-white text-sm hover:bg-purple-800 rounded"
                  >
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
                      "Update"
                    )}
                  </button>

                  <button
                    onClick={openModal}
                    className="block w-[47.5%] text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-700"
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
                              Are you sure you want to delete your account
                              permanently?
                            </h3>
                            <button
                              onClick={(e) => handleDelete()}
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
              </form>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Profile_Details;
