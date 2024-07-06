import React from "react";
import { MdOutlineCreateNewFolder, MdSpaceDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";
import { BsListTask } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaUsers } from "react-icons/fa";

const Sidebar = () => {
  const { user } = useSelector((state) => state.users);
  return (
    <section className="w-12 md:w-52 lg:w-72 h-screen bg-slate-100 p-1 ">
      {user?.role === "admin" && (
        <ul className="flex flex-col gap-4">
          <NavLink
            className="flex  p-1 gap-2 items-center hover:bg-slate-200 transition duration-200"
            to={"/createproject"}
          >
            <MdOutlineCreateNewFolder className="text-4xl text-purple-600" />
            <span className="hidden text-slate-400 md:block">
              Create Project
            </span>
          </NavLink>
          <NavLink
            className="flex p-1 gap-2 items-center  hover:bg-slate-200 transition duration-200"
            to={"/allprojects"}
          >
            <MdSpaceDashboard className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">
              All Projects
            </span>
          </NavLink>
          <NavLink
            className="flex p-1 gap-2 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <IoMdAdd className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">Create Task</span>
          </NavLink>
          <NavLink
            className="flex p-1 gap-3 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <BsListTask className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">All Tasks</span>
          </NavLink>
          <NavLink
            className="flex p-1 gap-2 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <IoMdAddCircle className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">
              Create Sub Task
            </span>
          </NavLink>
          <NavLink
            className="flex p-1 gap-2 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <FaUsers className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">All Users</span>
          </NavLink>
        </ul>
      )}

      {user?.role === "project_manager" && (
        <ul className="flex flex-col gap-4">
          <NavLink
            className="flex p-1 gap-2 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <MdSpaceDashboard className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">
              All Projects
            </span>
          </NavLink>
          <NavLink
            className="flex p-1 gap-2 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <IoMdAdd className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">Create Task</span>
          </NavLink>
          <NavLink
            className="flex p-1 gap-3 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <BsListTask className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">All Tasks</span>
          </NavLink>
          <NavLink
            className="flex p-1 gap-2 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <IoMdAddCircle className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">
              Create Sub Task
            </span>
          </NavLink>
        </ul>
      )}

      {user?.role === "team_member" && (
        <ul className="flex flex-col gap-4">
          <NavLink
            className="flex p-1 gap-2 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <MdSpaceDashboard className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">
              All Projects
            </span>
          </NavLink>

          <NavLink
            className="flex p-1 gap-3 items-center  hover:bg-slate-200 transition duration-200"
            to={""}
          >
            <BsListTask className="text-4xl text-purple-600" />
            <span className="hidden  text-slate-400 md:block">All Tasks</span>
          </NavLink>
        </ul>
      )}
    </section>
  );
};

export default Sidebar;
