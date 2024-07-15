import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import {
  clearMessage,
  deleteProject,
  getSingleProject,
  removeMemberFromproject,
  addMember,
} from "../../store/slices/projectSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { MdDeleteForever } from "react-icons/md";

const Project_Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { projectDetails, error, message } = useSelector(
    (state) => state.projects
  );
  const { user } = useSelector((state) => state.users);

  const [selectedMember, setSelectedMember] = useState("");

  useEffect(() => {
    dispatch(getSingleProject(id));
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
  }, [dispatch, id, error, message, toast]);

  const totalTasks = projectDetails?.task.length;
  const completedTasks = projectDetails?.task.filter(
    (task) => task.status === "Completed"
  ).length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  const handleMemberRemove = (teamMemberId) => {
    dispatch(
      removeMemberFromproject({
        projectId: id,
        teamMemberId: teamMemberId,
      })
    );
    dispatch(getSingleProject(id));
    window.location.reload();
  };

  const handleMemberAdd = () => {
    if (selectedMember) {
      dispatch(
        addMember({
          projectId: id,
          teamMemberId: selectedMember,
        })
      );
      setSelectedMember("");
    } else {
      toast.error("Please select a member to add");
    }
  };

  const availableTeamMembers = user?.managedTeamMembers?.filter(
    (member) =>
      !projectDetails?.members?.some(
        (projectMember) => projectMember._id === member._id
      )
  );

  return (
    <>
      <section className="flex">
        <div>
          <Sidebar />
        </div>
        <div className="p-1 flex flex-col md:flex-row w-full">
          <div className="md:w-1/2 md:p-4">
            <h1 className="font-bold text-slate-700 text-2xl">
              {projectDetails?.projectName}
            </h1>
            <p className="text-slate-400 text-sm mt-4">
              {projectDetails?.description}
            </p>

            <div>
              <h1 className="font-semibold text-md mt-4 text-slate-400">
                Project Manager:{" "}
                <span className="font-bold text-lg text-slate-700">
                  {projectDetails?.projectManager?.name}
                </span>
              </h1>
            </div>

            <div className="flex justify-between mt-4 mb-1">
              <span className="text-base font-medium text-purple-500 dark:text-white">
                Completed
              </span>
              <span className="text-sm font-medium text-purple-500 dark:text-white">
                {progressPercentage.toFixed()}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-green-400 h-2.5 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>
          <hr className="mt-4 w-full md:hidden" />
          <div className="md:flex items-center hidden">
            <div className="h-screen border-l border-gray-300"></div>
          </div>

          <div className="mt-4 w-full md:w-1/2 md:p-4 md:mt-0">
            {projectDetails?.members.length > 0 && (
              <div className="border rounded border-slate-200 p-2">
                <h1 className="font-bold text-lg text-slate-700">
                  Team Members
                </h1>

                {projectDetails &&
                  projectDetails.members.map((member) => (
                    <div
                      key={member._id}
                      className="flex p-2 mb-4 items-center justify-between border rounded hover:bg-slate-100 border-slate-200 group"
                    >
                      <div className="flex items-center cursor-pointer">
                        <img
                          className="w-7 h-7 rounded-full mr-2"
                          src={member.profilePicture}
                          alt=""
                        />
                        <p className="text-slate-400 text-sm hover:text-black font-bold">
                          {member.name}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <button onClick={(e) => handleMemberRemove(member._id)}>
                          <MdDeleteForever className="text-red-600 text-2xl" />
                        </button>
                      </div>
                    </div>
                  ))}
                {user?.role == "project_manager" && (
                  <div className="flex flex-col">
                    <label htmlFor="add-member-select">Add Team Members:</label>
                    <div className="flex gap-2">
                      <select
                        className="w-full p-2 mt-1 rounded bg-slate-200"
                        id="add-member-select"
                        value={selectedMember}
                        onChange={(e) => setSelectedMember(e.target.value)}
                      >
                        <option value="">Select Team Members</option>

                        {availableTeamMembers?.map((member) => (
                          <option key={member._id} value={member._id}>
                            {member.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="bg-purple-600 text-white w-40 rounded hover:bg-purple-700"
                        onClick={handleMemberAdd}
                      >
                        Add Member
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {projectDetails?.task.length > 0 && (
              <div className="border rounded border-purple-200 mt-4 p-2">
                <h1 className="font-bold text-lg text-slate-700">Tasks</h1>
                {projectDetails &&
                  projectDetails.task.map((task) => (
                    <div
                      key={task._id}
                      className="flex p-2 mb-4 items-center justify-between border rounded cursor-pointer border-slate-200 group text-slate-400 hover:bg-slate-100 hover:text-black hover:font-semibold"
                    >
                      <p className="text-sm">{task.title}</p>

                      <FaArrowRight className="transform text-purple-500 transition-transform group-hover:translate-x-2" />
                    </div>
                  ))}
              </div>
            )}

            {(user?.role == "admin" || user?.role == "project_manager") && (
              <div className="mt-4 w-full flex justify-center gap-1 md:gap-4">
                <NavLink
                  className="w-1/2 bg-purple-500 flex justify-center items-center text-white font-semibold py-2 px-4 rounded hover:bg-purple-600 transition-all duration-200"
                  to={`/editproject/${id}`}
                >
                  Edit Project
                </NavLink>
                {user?.role == "admin" && (
                  <button
                    onClick={() => {
                      dispatch(deleteProject(id));
                      navigate("/allprojects");
                    }}
                    className="w-1/2 bg-red-500 text-white font-semibold py-2 px-4 rounded hover:bg-red-600 transition-all duration-200"
                  >
                    Delete Project
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Project_Details;
