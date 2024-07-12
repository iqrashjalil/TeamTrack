import React, { useEffect } from "react";
import Sidebar from "../../components/layout/Sidebar.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../store/slices/UserSlice.jsx";
import { FaArrowRight } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";

const All_Users = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allusers } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
          <div className="flex gap-4 flex-wrap justify-center">
            {allusers?.map((user) => (
              <div
                className="flex flex-col w-52 rounded border mb-2 border-slate-200 p-2 cursor-pointer hover:bg-slate-100 transition-all duration-200 group"
                key={user._id}
                onClick={(e) => handleOnClick(user._id)}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex justify-center">
                    <img
                      className="w-14 h-14 rounded-full shadow-md"
                      src={user.profilePicture}
                      alt=""
                    />
                  </div>
                  <p className="font-bold">{user.name}</p>
                  <p className="text-slate-400">
                    Position:{" "}
                    <span className="text-purple-600 font-semibold">
                      {user.role}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default All_Users;
