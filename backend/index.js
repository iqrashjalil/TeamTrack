import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import errorMiddleware from "./middlewares/error-middleware.js";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user-routes.js";
import projectRoutes from "./routes/project-routes.js";
import taskroutes from "./routes/task-routes.js";
import subtaskRoutes from "./routes/subtask-routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
const app = express();
connectDB();

const Port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());

app.use("/api/auth", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskroutes);
app.use("/api/subtask", subtaskRoutes);

app.use(errorMiddleware);
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
