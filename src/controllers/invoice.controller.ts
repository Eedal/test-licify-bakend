import { Request, Response } from "express";
import { InvoiceModel } from "../models/Invoice";

export const getInvoices = async (req: Request, res: Response) => {
  try {
    const invoices = await InvoiceModel.find();
    res.status(200).json(invoices);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await InvoiceModel.create(req.body);
    res.status(201).json(invoice);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await InvoiceModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.status(200).json(invoice);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const deleteInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await InvoiceModel.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
