import { transationSchema } from "../index.js";

export function schemaTransationValidation(req,res,next){
    const { type, value, name} = req.body;

    const transation = {
        name,
        value,
        type,
    };

    const { error } = transationSchema.validate(transation,{abortEarly:false});

    if (error){
        const errors = error.details.map((details)=> details.message);
        return res.status(422).send(errors);
    }
    req.transation = transation

    next();
    
}