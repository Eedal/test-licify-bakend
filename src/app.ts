import express from "express";
import morgan from "morgan";
import "./database";
import { errorHandler } from "./error-handler/error-handler";
import invoiceRoutes from "./routes/invoice.routes";

const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.use("/api", invoiceRoutes);

export default app;
