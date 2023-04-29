import express from "express";
const router = express.Router();

const invoiceController = require('../controllers/invoice.controller');

router.get("/invoices", invoiceController.getInvoices);
router.post('/invoices', invoiceController.createInvoice);
// router.put('/invoices/:invoiceId', invoiceController.updateInvoice);
// router.delete('/invoices/:invoiceId', invoiceController.deleteInvoice);

export default router;
