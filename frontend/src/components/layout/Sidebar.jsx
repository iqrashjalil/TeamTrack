import React from "react";
import { MdOutlineCreateNewFolder, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";
import { BsListTask } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <section className="w-12 md:w-52 lg:w-72 h-full bg-slate-100 p-1 ">
      {user?.role === "admin" && (
        <ul className="flex flex-col gap-4">
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/createproject"}
          >
            <MdOutlineCreateNewFolder className="text-4xl " />
            <span className="hidden  md:block">Create Project</span>
          </NavLink>
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/allprojects"}
          >
            <MdSpaceDashboard className="text-4xl" />
            <span className="hidden   md:block">All Projects</span>
          </NavLink>
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/createtask"}
          >
            <IoMdAdd className="text-4xl " />
            <span className="hidden   md:block">Create Task</span>
          </NavLink>
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/alltasks"}
          >
            <BsListTask className="text-4xl " />
            <span className="hidden   md:block">All Tasks</span>
          </NavLink>
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/createsubtask"}
          >
            <IoMdAddCircle className="text-4xl" />
            <span className="hidden  md:block">Create Sub Task</span>
          </NavLink>
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/allusers"}
          >
            <FaUsers className="text-4xl " />
            <span className="hidden   md:block">All Users</span>
          </NavLink>
          <NavLink
            className={`flex p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/profiledetails"}
          >
            <IoPersonSharp className="text-4xl" />
            <span className="hidden md:block ">Edit Profile</span>
          </NavLink>
        </ul>
      )}

      {user?.role === "project_manager" && (
        <ul className="flex flex-col gap-4">
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/allprojects"}
          >
            <MdSpaceDashboard className="text-4xl" />
            <span className="hidden md:block">All Projects</span>
          </NavLink>
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/createtask"}
          >
            <IoMdAdd className="text-4xl" />
            <span className="hidden md:block">Create Task</span>
          </NavLink>
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/alltasks"}
          >
            <BsListTask className="text-4xl" />
            <span className="hidden md:block">All Tasks</span>
          </NavLink>
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/createsubtask"}
          >
            <IoMdAddCircle className="text-4xl" />
            <span className="hidden md:block">Create Sub Task</span>
          </NavLink>
          <NavLink
            className={`flex p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/profiledetails"}
          >
            <IoPersonSharp className="text-4xl" />
            <span className="hidden md:block ">Edit Profile</span>
          </NavLink></ul>
      )}

      {user?.role === "team_member" && (
        <ul className="flex flex-col gap-4">
          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/allprojects"}
          >
            <MdSpaceDashboard className="text-4xl" />
            <span className="hidden md:block">All Projects</span>
          </NavLink>

          <NavLink
            className={`flex  p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/alltasks"}
          >
            <BsListTask className="text-4xl" />
            <span className="hidden md:block">All Tasks</span>
          </NavLink>
          <NavLink
            className={`flex p-1 gap-2 items-center text-slate-400 [&.active]:text-purple-600 [&.active]:bg-slate-200 [&.active]:font-bold hover:bg-slate-200 transition duration-200`}
            to={"/profiledetails"}
          >
            <IoPersonSharp className="text-4xl" />
            <span className="hidden md:block ">Edit Profile</span>
          </NavLink>
        </ul>
      )}
    </section>
  );
};

export default Sidebar;
