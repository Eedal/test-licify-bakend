import { validate } from "class-validator";

import { ErrorException } from "../../error-handler/error-exception";
import { InvoiceI, InvoiceModel } from "./invoice.schema";
import { ErrorCode } from "../../error-handler/error-code";
import { ItemI } from "../../models/item/Item";
import { CreateInvoiceDTO } from "./dto/create-invoice.dto";
import { generateNit } from "../../utils/invoice";

const generateInvoice = (items: ItemI[]): InvoiceI => {
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

  return {
    nit,
    total,
    totalIva: averageIva,
    paid: false,
    items: itemsWithTotals,
  };
};

export const invoiceService = {
  getAll: async (query: any) => {
    try {
      const invoices = await InvoiceModel.find(query);
      return invoices;
    } catch (error) {
      throw new ErrorException(ErrorCode.Unauthenticated);
    }
  },
  createOne: async (items: ItemI[]) => {
    const newInvoice = new CreateInvoiceDTO();
    newInvoice.items = items;

    const errors = await validate(newInvoice);
    if (errors.length) {
      throw new ErrorException(ErrorCode.ValidationError, errors);
    }

    const invoiceCreate = generateInvoice(items);

    try {
      const invoice = await InvoiceModel.create(invoiceCreate);
      return invoice;
    } catch (error) {
      throw new ErrorException(ErrorCode.UnknownError);
    }
  },

  updateOne: async (id: string, items: ItemI[]) => {
    const invoiceUpdate = generateInvoice(items);

    try {
      const invoice = await InvoiceModel.findByIdAndUpdate(id, invoiceUpdate, {
        new: true,
      });

      return invoice;
    } catch (error) {
      throw new ErrorException(ErrorCode.UnknownError);
    }
  },

  deleteOne: async (id: string) => {
    try {
      const invoice = await InvoiceModel.findByIdAndDelete(id);
      return invoice;
    } catch (error) {
      throw new ErrorException(ErrorCode.UnknownError);
    }
  },
};
