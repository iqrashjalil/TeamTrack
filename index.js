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
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
connectDB();

const Port = process.env.PORT || 4000;

const corsOptions = {
  origin: "https://teamtrack.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/task", taskroutes);
app.use("/api/subtask", subtaskRoutes);

// Deployment setup
const __filename = fileURLToPath(import.meta.url);
const __dirname1 = path.dirname(__filename);

// Reference the static files from the client build directory

app.use(express.static(path.join(__dirname1, "./frontend/dist")));

// Catch-all route to serve the index.html
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname1, "./frontend/dist", "index.html"));
});

app.use(errorMiddleware);
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
