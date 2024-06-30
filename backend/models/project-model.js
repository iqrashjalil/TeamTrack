import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: [true, "Please Enter Project Name"],
  },
  description: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please Select Project Manager"],
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projectStatus: {
    type: String,
    enum: ["InProgress", "Completed"],
    default: "InProgress",
  },
  task: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Project = mongoose.model("Project", projectSchema);

export default Project;
