import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import errorMiddleware from "./middlewares/error-middleware.js";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user-routes.js";
const app = express();
connectDB();

const Port = process.env.PORT || 4000;

app.use("/api/auth", userRoutes);

app.use(errorMiddleware);
app.listen(Port, () => {
  console.log(`Server is running on Port ${Port}`);
});
