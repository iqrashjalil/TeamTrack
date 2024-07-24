import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUsers } from "../../store/slices/UserSlice.jsx";
import { FaArrowRight } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const All_Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allusers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    dispatch(getAllUsers());
  };

  const handleOnClick = (id) => {
    navigate(`/userdetails/${id}`);
  };
  return (
    <>
      <section className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="p-2 w-full flex flex-col ">
          <h1 className=" mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
            <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
            All Users
          </h1>

          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Role
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Actions
                  </th>
                </tr>
              </thead>
              {allusers?.map((user) => (
                <tbody key={user._id}>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>

                    <td className="px-6 py-4">{user.email}</td>
                    <td
                      className={`px-6 py-4 ${
                        user.role === "admin"
                          ? "text-red-600"
                          : user.role === "project_manager"
                          ? "text-green-400"
                          : user.role === "team_member"
                          ? "text-purple-400"
                          : ""
                      }`}
                    >
                      {user.role}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={(e) => handleOnClick(user._id)}
                          className="flex items-center gap-1 bg-purple-600 text-white p-1 rounded transition-all duration-200 hover:bg-transparent hover:text-purple-600 border border-purple-600"
                        >
                          Edit
                          <FaEdit />
                        </button>
                        <button
                          onClick={(e) => handleDelete(user._id)}
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

export default All_Users;
