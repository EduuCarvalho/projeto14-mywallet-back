import {postSignIn, postSignUp} from "../controllers/users.controllers.js";

import { Router } from 'express';

const router = Router();

router.post("/signup", postSignUp);
router.post("/signin", postSignIn);
router.get("/")

export default router;