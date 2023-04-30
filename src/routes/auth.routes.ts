import express from "express";
const router = express.Router();

import { signIn } from "../controllers/auth.controller";

router.post("/sign-in", signIn);

export default router;
