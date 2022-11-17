
import { userSchema , usersCollection } from '../index.js';


export async function postSignUp (req,res) {
    const {name, email, password} = req.body;

    const userInfo = {
        name,
        email,
        password,
    }

    try {
        const { error } = userSchema.validate(userInfo,{abortEarly:false});

        if (error){
            const errors = error.details.map((detail)=> detail.message);
            return res.status(422).send(errors);
        }

        await usersCollection.insertOne(userInfo);
        res.sendStatus(200)
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}