import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("mongodb conectado");
} catch (err){
    console.log("error no mongo db", err)
}

const db = mongoClient.db("myWallet");
export const usersCollection = db.collection("users");
export const sessionCollection = db.collection("sessions")
export const transationsCollection = db.collection("transations")

