import express from 'express';
import joi from 'joi';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config()


import {
    postSignUp,
    getUsers,
} from "./controllers/users.controllers.js"

const app = express();
app.use(express.json());
app.use(cors());


export const userSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().required().min(3),
    password:joi.number().required().min(3),
    passwordConfirmation:joi.number().required().min(3),
});


app.post("/signup", postSignUp);
app.get("/signup", getUsers);

app.listen(5000, () => console.log("Porta 5k rodando"));