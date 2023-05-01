import express from "express";
const router = express.Router();

import { signIn } from "../modules/auth/auth.controller";

router.post("/sign-in", signIn);

export default router;
