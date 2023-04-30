import express from "express";
import morgan from "morgan";
import "./database";
import { errorHandler } from "./error-handler/error-handler";
import invoiceRoutes from "./routes/invoice.routes";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import expressListRoutes from "express-list-routes";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", invoiceRoutes);

expressListRoutes(app);

export default app;
