import { userSchema } from "../index.js";

export function schemaUserValidation(req,res,next){
    const {name, email, password,passwordConfirmation} = req.body;

    const { error } = userSchema.validate({name, email, password,passwordConfirmation},{abortEarly:false});

    if (error){
        const errors = error.details.map((detail)=> detail.message);
        return res.status(422).send(errors);
    }
        
    next();
}