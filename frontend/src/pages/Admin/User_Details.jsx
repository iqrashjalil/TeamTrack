import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../../components/layout/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getAllUsers,
  getSingleUser,
  getUnAssignedTeamMembers,
  removeTeamMember,
  resetSuccess,
  updateProfile,
} from "../../store/slices/UserSlice";
import { toast } from "react-toastify";
import { IoIosArrowDown } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const User_Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, allusers, success, loading, error, unAssignedMembers } =
    useSelector((state) => state.users);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    role: "",
    profilePicture: null,
  });
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

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

  const handleOnClick = (id) => {
    navigate(`/userdetails/${id}`);
  };

  const userid = id;
  const handleDeleteTeammember = (teamMemberId) => {
    dispatch(removeTeamMember({ userId: userid, teamMemberId: teamMemberId }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

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
                  <div className="relative" ref={dropdownRef}>
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
                    className="bg-purple-600 w-full h-10 flex items-center justify-center hover:bg-purple-700 transition-all duration-200 p-2 text-white font-semibold rounded"
                  >
                    {loading ? (
                      <>
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
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
                          <span class="sr-only">Loading...</span>
                        </div>
                      </>
                    ) : (
                      "Update"
                    )}
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
                  className="flex justify-between items-center rounded border mb-2 border-slate-200 p-2 hover:bg-slate-100 transition-all duration-200"
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
                      className="flex border border-red-500 text-red-500 hover:bg-red-500 hover:text-white rounded group p-2"
                    >
                      Remove{" "}
                      <MdDelete className="transform text-2xl text-red-500 group-hover:text-white" />
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
