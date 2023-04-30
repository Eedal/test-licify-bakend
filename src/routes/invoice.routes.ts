import express from "express";
const router = express.Router();

import {
  getInvoices,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} from "../controllers/invoice.controller";

router.get("/invoices", getInvoices);
router.post("/invoices", createInvoice);
router.put("/invoices/:id", updateInvoice);
router.delete("/invoices/:id", deleteInvoice);

export default router;
