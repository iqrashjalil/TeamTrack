import React, { useEffect, useState } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUnAssignedTeamMembers,
  removeTeamMember,
  resetSuccess,
  updateProfile,
} from "../../store/slices/UserSlice";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const User_Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, allusers, success, error, unAssignedMembers } = useSelector(
    (state) => state.users
  );

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    role: "",
    profilePicture: null,
  });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      toast.success("User Updated Successfully");
      dispatch(resetSuccess());
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);
  useEffect(() => {
    dispatch(getSingleUser(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (profile) {
      setFormValues({
        name: profile.name || "",
        email: profile.email || "",
        role: profile.role || "",
        profilePicture: null,
      });
      setSelectedMembers(profile.managedTeamMembers || []);
    }
  }, [profile]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    dispatch(getUnAssignedTeamMembers());
  };

  const handleCheckboxChange = (memberId) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(memberId)
        ? prevSelected.filter((id) => id !== memberId)
        : [...prevSelected, memberId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormValues({
      ...formValues,
      profilePicture: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", formValues.name);
    formData.append("email", formValues.email);
    formData.append("role", formValues.role);

    if (formValues.profilePicture) {
      formData.append("profilePicture", formValues.profilePicture);
    }

    formData.append("managedTeamMembers", JSON.stringify(selectedMembers));

    dispatch(updateProfile({ id, userData: formData }));
  };

  const handleDelete = () => {
    dispatch(deleteUser(id));
    navigate("/allusers");
  };

  const handleOnClick = (id) => {
    navigate(`/userdetails/${id}`);
  };

  const userid = id;
  const handleDeleteTeammember = (teamMemberId) => {
    dispatch(removeTeamMember({ userId: userid, teamMemberId: teamMemberId }));
  };
  return (
    <section className="flex min-h-screen">
      <div>
        <Sidebar />
      </div>
      <div className="p-2 w-full md:flex">
        <div className="md:w-1/3">
          <h1 className="mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
            <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
            User Details
          </h1>

          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="flex justify-center">
                <img
                  className="w-48 h-48 rounded-full"
                  src={profile?.profilePicture}
                  alt=""
                />
              </div>
              <div className="mt-4">
                <div className="flex flex-col">
                  <label className="text-slate-500" htmlFor="name">
                    Name:
                  </label>
                  <input
                    className="bg-slate-200 p-2"
                    name="name"
                    value={formValues.name}
                    type="text"
                    placeholder="Enter Name Here"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-4 flex flex-col">
                  <label className="text-slate-500" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="bg-slate-200 p-2"
                    name="email"
                    value={formValues.email}
                    type="email"
                    placeholder="Enter Email Here"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mt-4 flex flex-col">
                  <label className="text-slate-500" htmlFor="role">
                    Role:
                  </label>
                  <select
                    name="role"
                    value={formValues.role}
                    className="bg-slate-200 p-2"
                    onChange={handleInputChange}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="project_manager">Project Manager</option>
                    <option value="team_member">Team Member</option>
                  </select>
                </div>
                <div className="mt-4 flex flex-col">
                  <label className="text-slate-500" htmlFor="profilePicture">
                    Profile Picture:
                  </label>
                  <input
                    className="bg-slate-200 file:bg-slate-200 file:border-none file:p-2"
                    type="file"
                    name="profilePicture"
                    onChange={handleFileChange}
                  />
                </div>
                <div className="mt-4 flex flex-col">
                  <label className="text-slate-500" htmlFor="teamMembers">
                    Team Members:
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between bg-slate-200 p-2 rounded border border-slate-300"
                      onClick={toggleDropdown}
                    >
                      Select Team Members <IoIosArrowDown />
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute bg-white border border-slate-300 rounded shadow mt-2 w-full max-h-48 overflow-y-auto z-10">
                        {unAssignedMembers?.map((member) => (
                          <div
                            key={member._id}
                            className="flex items-center p-2"
                          >
                            <input
                              type="checkbox"
                              id={`member-${member._id}`}
                              checked={selectedMembers.includes(member._id)}
                              onChange={() => handleCheckboxChange(member._id)}
                            />
                            <label
                              className="ml-2"
                              htmlFor={`member-${member._id}`}
                            >
                              {member.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-4 w-full gap-2 flex">
                  <button
                    type="submit"
                    className="bg-purple-600 w-1/2 hover:bg-purple-700 transition-all duration-200 p-2 text-white font-semibold rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 w-1/2 hover:bg-red-700 transition-all duration-200 p-2 text-white font-semibold rounded"
                  >
                    Delete User
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <hr className="md:hidden w-full mt-4" />
        <div className="hidden md:block min-w-0.5 h-full  mx-4 bg-slate-200"></div>
        {profile?.role == "project_manager" ? (
          <>
            {" "}
            <div className="md:w-2/3 mt-4 md:mt-0">
              <h1 className="mb-4 relative w-fit font-bold text-2xl text-slate-500 pb-1">
                <span className="absolute rounded bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></span>
                Managed Team Members
              </h1>

              {profile?.managedTeamMembers.map((member) => (
                <div
                  className="flex justify-between items-center rounded border mb-2 border-slate-200 p-2 hover:bg-slate-100 transition-all duration-200 group"
                  key={member._id}
                >
                  <div className="flex items-center gap-2">
                    <img
                      onClick={(e) => {
                        handleOnClick(member._id);
                      }}
                      className="w-20 cursor-pointer h-20 rounded-full"
                      src={member.profilePicture}
                      alt=""
                    />
                    <p>{member.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleDeleteTeammember(member._id)}
                      className=" bg-slate-200 hover:bg-white p-2"
                    >
                      {" "}
                      <MdDelete className="transform text-2xl text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default User_Details;
