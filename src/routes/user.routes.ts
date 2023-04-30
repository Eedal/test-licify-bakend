import express from "express";
const router = express.Router();

import { signUp } from "../modules/user/user.controller";

router.post("/sign-up", signUp);

export default router;
