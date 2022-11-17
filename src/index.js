import express from 'express';
import joi from 'joi';
import { MongoClient } from 'mongodb';

import dotenv from 'dotenv';
dotenv.config()


import {
    postSignUp
} from "./controllers/users.controllers.js"

const app = express();
app.use(express.json());

const mongoClient = new MongoClient("mongodb://localhost:27017");


try {
    await mongoClient.connect();
    console.log("mongodb conectado");
} catch (err){
    console.log("error no mongo db", err)
}

const db = mongoClient.db("myWallet");

export const usersCollection = db.collection("users");


export const userSchema = joi.object({
    name: joi.string().required(2),
    email: joi.email().required().min(3),
    password:joi.passwrd().required().min(3),
});


app.post("signup", postSignUp);

app.listen(5000, () => console.log("Porta 5k rodando"));