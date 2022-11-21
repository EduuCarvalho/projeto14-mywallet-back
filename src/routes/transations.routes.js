import { postTransations, getTransations } from "../controllers/transations.controllers.js";
import { schemaTransationValidation } from "../middlewares/schemaTransationsValidation.js";

import { Router } from "express";

const router = Router();

router.post("/addtransaction",schemaTransationValidation, postTransations);
router.get("/transations",getTransations);

export default router;


