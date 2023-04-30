import express from "express";
const router = express.Router();

import { signUp } from "../controllers/user.controller";

router.post("/sign-up", signUp);

export default router;
