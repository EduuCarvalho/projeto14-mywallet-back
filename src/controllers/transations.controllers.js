import { transationSchema } from "../index.js";
import { transationsCollection } from "../database/db.js";

export async function postTransations (req,res){
    const {type , value, name} = req.body;

    try {

    await transationsCollection.insertOne({
        type,
        value,
        name,
    })
    res.sendStatus(200).send("transação concluida");
}catch (err){
    res.sendStatus(501).send(err)
}
}