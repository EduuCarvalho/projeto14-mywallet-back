
import { transationsCollection } from "../database/db.js";

export async function postTransations (req,res){
    const { type, value, description}  = req.body;

    try {
    await transationsCollection.insertOne({
        description,
        value,
        type,
    })
    res.sendStatus(201).send("transação concluida");
    console.log("postou corretamente")
}catch (err){
    console.log(err);
    res.sendStatus(501).send(err);
}
}

export async function getTransations (req,res) {
    const limit = Number(req.query.limit);
    const {description} = req.body;
    
    try{
        const transatios = await transationsCollection
        .find({description})
        .limit(limit)
        .toArray();

        if (transatios.length===0) {
            return res.sendStatus(404).send("Não foi encontrada nenhuma transação");
        }
        res.send(transatios);
    }catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}
