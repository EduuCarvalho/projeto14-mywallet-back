
import { sessionCollection, transationsCollection } from "../database/db.js";
import dayjs from "dayjs";

export async function postTransations (req,res){
    const { type, value, description}  = req.body;
    const {authorization} = req.headers;
    const today = dayjs().format("DD/MM/YY");
    const token = authorization?.replace("Bearer ", "");

    if(!token){
        return res.sendStatus(401);
    }

    try {
    const session = await sessionCollection.findOne({token});
    
    if(!session){
        return res.sendStatus(401);
    }

    await transationsCollection.insertOne({
        userId:session?.userId,
        description,
        value,
        type,
        date:today

    })
    res.status(201).send("transação concluida");
    console.log("postou corretamente")
}catch (err){
    console.log(err);
    res.status(501).send(err);
}
}

export async function getTransations (req,res) {
  
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if(!token){
        return res.sendStatus(401);
    }

    try{
        const sessions = await sessionCollection.findOne({token});
        
        const userTransactions = await transationsCollection
        .find({
            userId:sessions?.userId,
        })
        .toArray();

        res.send(userTransactions);
        
    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
