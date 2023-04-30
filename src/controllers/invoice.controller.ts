import { NextFunction, Request, Response } from "express";
import { InvoiceModel } from "../models/invoice/invoice.schema";
import { generateNit } from "../utils/invoice";
import { CreateInvoiceDTO } from "../models/invoice/dto/create-invoice.dto";
import { validate } from "class-validator";
import { ErrorException } from "../error-handler/error-exception";
import { ErrorCode } from "../error-handler/error-code";
import { ItemI } from "../models/item/Item";
import { InvoiceI } from "../models/invoice/invoice.schema";

export const getInvoices = async (req: Request, res: Response) => {
  const query = req.query;

  try {
    const invoices = await InvoiceModel.find(query);
    res.status(200).json(invoices);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const createInvoice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newInvoice = new CreateInvoiceDTO();
    const items: ItemI[] = req.body.items;
    newInvoice.items = items;

    const errors = await validate(newInvoice);
    if (errors.length) {
      next(new ErrorException(ErrorCode.ValidationError, errors));
    }

    const nit = generateNit();

    const itemsWithTotals = items.map((item) => ({
      ...item,
      total: item.quantity * item.price,
    }));

    const total = itemsWithTotals.reduce((subtotal: number, item: ItemI) => {
      return subtotal + item.total;
    }, 0);

    const sumIva = itemsWithTotals.reduce(
      (subtotalIva: number, item) => subtotalIva + item.iva,
      0
    );
    const averageIva = sumIva / itemsWithTotals.length;

    const invoiceCreate: InvoiceI = {
      nit,
      items,
      paid: false,
      total,
      totalIva: averageIva,
    };

    const invoice = await InvoiceModel.create(invoiceCreate);
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
