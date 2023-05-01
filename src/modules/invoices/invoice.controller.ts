import { NextFunction, Request, Response } from "express";
import { ItemI } from "../../models/item/Item";
import { invoiceService } from "./invoice.service";

export const getInvoices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const query = req.query;
  try {
    const invoices = await invoiceService.getAll(query);
    res.status(200).json(invoices);
  } catch (error) {
    next(error);
  }
};

export const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const items: ItemI[] = req.body.items;
  try {
    const invoice = await invoiceService.createOne(items);
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};

export const updateInvoice = async (req: Request, res: Response) => {
  try {
    const invoice = await invoiceService.updateOne(
      req.params.id,
      req.body.items
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
    const invoice = await invoiceService.deleteOne(req.params.id);
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
