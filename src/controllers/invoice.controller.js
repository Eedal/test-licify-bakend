import Invoice from '../models/Invoice'

export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find()
    res.status(200).json(invoices)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createInvoice = async (req, res) => {
  console.log("🚀 ~ file: invoice.controller.js:13 ~ createInvoice ~ req:", req.body)
  try {
    const invoice = await Invoice.create(req.body)
    res.status(201).json(invoice)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}