import express from 'express';
import joi from 'joi';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()


import usersRouters from "./routes/users.routes.js"
import transationsRouter from "./routes/transations.routes.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(usersRouters);
app.use(transationsRouter);


export const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().min(3),
    password:joi.number().required().min(3),
    passwordConfirmation:joi.number().required().min(3),
});

/* export const transationSchema = joi.object({
    type:joi.string().required(),
    value:joi.number().required(),
})
 */

app.listen(5000, () => console.log("Porta 5k rodando"));