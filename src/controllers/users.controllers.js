import { usersCollection, sessionCollection} from '../database/db.js';
import { v4 as uuidV4 } from "uuid"
import bcrypt from 'bcrypt';


export async function postSignUp (req,res) {
    const {name, email, password,passwordConfirmation} = req.body;
        
        if(password !== passwordConfirmation){
           return res.status(409).send("As senhas não são iguais!!!");
        }

        const passwordHash = bcrypt.hashSync(password, 10);

        try {
            const userExist = await usersCollection.findOne({email});
            if (userExist){
                return res.sendStatus(409);
            }


        await usersCollection.insertOne({
            name,
            email,
            password:passwordHash,
        });
        res.status(201).send("Cadastro feito com sucesso!!!")
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }

}

export async function postSignIn (req,res) {
    const { email, password} = req.body;
    const token = uuidV4();

    const user = await usersCollection.findOne({email});

console.log(user.password)
console.log(password)
    if(user && bcrypt.compareSync(password, user.password)) {
      
        await sessionCollection.insertOne({
            token,
            userId: user._id,
         
        });
     const userObj =  await usersCollection.findOne({email});
     const name = userObj.name
     
        res.send({token,name})
    } else {
        res.status(404).send("Usuário não encontrado,favor conferir e-mail e senha!!!")
    }

}

export async function keepLogIn (req,res){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const sessions = await sessionCollection.findOne({token})
        console.log(sessions);
        const user = await usersCollection.findOne({_id: sessions?.userId})
        delete user.password;

        res.send(user)
    }catch (err) {
        res.sendStatus(500)
    }
}