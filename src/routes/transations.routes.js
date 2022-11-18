import { postTransations } from "../controllers/transations.controllers.js";

import { Router } from "express";

const router = Router();

router.post("/transations", postTransations);

export default router 

