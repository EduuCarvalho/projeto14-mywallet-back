import { transationSchema } from "../index.js";

export function schemaTransationValidation(req,res,next){
    const { type, value, description} = req.body;


    const { error } = transationSchema.validate({ type, value, description} ,{abortEarly:false});

    if (error){
        const errors = error.details.map((details)=> details.message);
        return res.status(422).send(errors);
    }
    

    next();
    
}