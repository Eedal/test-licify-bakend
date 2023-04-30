import express from "express";
const router = express.Router();

const invoiceController = require('../controllers/invoice.controller');

router.get("/invoices", invoiceController.getInvoices);
router.post('/invoices', invoiceController.createInvoice);
router.put('/invoices/:id', invoiceController.updateInvoice);
router.delete('/invoices/:id', invoiceController.deleteInvoice);

export default router;
