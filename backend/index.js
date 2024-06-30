import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import errorMiddleware from "./middlewares/error-middleware.js";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user-routes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
const app = express();
connectDB();

const Port = process.env.PORT || 4000;

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", userRoutes);

app.use(errorMiddleware);
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
