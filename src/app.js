import express from "express";
import "./database";
import invoiceRoutes from "./routes/invoice.routes";
import morgan from "morgan";

const app = express();

// middlewares
app.use(morgan('dev'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", invoiceRoutes);

export default app;
