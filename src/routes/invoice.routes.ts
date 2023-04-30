import express from "express";
const router = express.Router();

import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../modules/invoices/invoice.controller";
import { authMiddleware } from "../modules/auth/auth.middleware";

const protectedRoutes = (router: express.Router) => {
  router.use(authMiddleware);

  router.get("/invoices", getInvoices);
  router.post("/invoices", createInvoice);
  router.put("/invoices/:id", updateInvoice);
  router.delete("/invoices/:id", deleteInvoice);
};

protectedRoutes(router);

export default router;
