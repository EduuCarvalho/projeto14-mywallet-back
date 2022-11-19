import { postTransations } from "../controllers/transations.controllers.js";
import { schemaTransationValidation } from "../middlewares/schemaTransationsValidation.js";

import { Router } from "express";

const router = Router();

router.post("/transations",schemaTransationValidation, postTransations);

export default router;


