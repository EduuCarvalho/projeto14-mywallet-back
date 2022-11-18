
import { userSchema } from '../index.js';
import { usersCollection } from '../database/db.js';


export async function postSignUp (req,res) {
    const {name, email, password, passwordConfirmation} = req.body;
        
        if(password !== passwordConfirmation){
            res.send("As senhas não são iguais!!!").sendStatus(409);
        }
   
        const { error } = userSchema.validate({name, email, password, passwordConfirmation},{abortEarly:false});

        if (error){
            const errors = error.details.map((detail)=> detail.message);
            return res.status(422).send(errors);
        }
        try {
            const userExist = await usersCollection.findOne({email});
            if (userExist){
                return res.sendStatus(409);
            }


        await usersCollection.insertOne({
            name,
            email,
            password,
        });
        res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

export async function getUsers(req,res){
    const {user} = req.headers;

    try{
        const users = await usersCollection
        .find({
            $or:[
                {name:user},
                {email:user},    
            ],
        })
        .toArray();

        if (users.length === 0 ){
            return res.status(404).send("Não foi encontrado nenhum usuário");
        }
        res.send(users);
    }catch (err){
        console.log(err);
        res.sendStatus(500)
    }
}