import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/slices/UserSlice.jsx";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const All_Users = () => {
  const dispatch = useDispatch();
  const { allusers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <>
      <section className="flex min-h-screen">
        <div>
          <Sidebar />
        </div>
        <div className="p-2 w-full">
          <h1 className="font-bold text-2xl text-slate-500">All Users</h1>

          {allusers?.map((user) => (
            <div
              className="flex justify-between items-center border mb-2 border-slate-200 p-2 cursor-pointer hover:bg-slate-100 transition-all duration-200 group"
              key={user._id}
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-10 h-10 rounded-full shadow-md"
                  src={user.profilePicture}
                  alt=""
                />
                <p>{user.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <MdDelete
                  onClick={""}
                  className="text-red-500 text-2xl hover:text-red-600"
                />

                <FaArrowRight className="transform text-xl text-purple-500 transition-transform group-hover:translate-x-2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default All_Users;
