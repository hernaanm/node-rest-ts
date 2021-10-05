import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createUserValidation, loginValidation } from '../libs/userValidation';
import User, { IUser } from '../models/User';


export default class UserController{

    constructor(){}
    
    public async getUsers(req: Request, res: Response): Promise<void> {
        const users = await User.find();
        res.json(users);
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        const userId = <number><unknown>req.params.userId;
        const user = await User.findOne({ userId }).populate('posts');
        if(!user) res.status(404).json('User not found');
        
        res.json(user);
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        
        const { error } = createUserValidation(req.body);
        if (error) {res.status(400).json(error.message);
            return;
        }

        const newUser: IUser = new User({
            userId : req.body.userId,
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            username : req.body.username
        })
        try{
            newUser.password = await newUser.encrypPassword(newUser.password);
            await newUser.save()
            res.status(201).json({ newUser });
        }catch(error){
            if (error instanceof Error) {res.status(400).json({ Error: error.message });
            }else{
                res.status(400).json({ error: "Something went wrong, try again in a few minutes"});
            };
        }
    }


    public async loginUser(req:Request, res: Response): Promise<void>{

        const { error } = loginValidation(req.body);
        if (error) {res.status(400).json(error.message);
            return;
        }
        
        const user = await User.findOne({email: req.body.email});
         if (!user) {res.status(401).json({ error: 'Invalid mail or password' });
            return;
        }
         const correctPassword = await user.validatePassword(req.body.password);
         if (!correctPassword) {res.status(401).json({ error: 'Invalid mail or password' });
            return;
        }
         const token: string = jwt.sign({
            _id : user._id,
            userId: user.userId,
            name: user.name,
            email: user.email
            },
            process.env.TOKEN_SECRET, {
            expiresIn: process.env.EXPIRACY_TIME
        });
        res.header('auth-token', token).json({ "accessToken" : token });
    }

    //TODO: REFACTOR NEEDED
    public async updateUser(req: Request, res: Response): Promise<void> {
        const userId = <number><unknown>req.params.userId;
        const user = await User.findOneAndUpdate({ userId }, req.body, { new: true });
        res.json(user);
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const userId = <number><unknown>req.params.userId;
        const deletedUser = await User.findOneAndDelete({ userId: userId });
        if(!deletedUser){
            res.status(404).json({ error: 'User does not exist' });
        }else{
            res.status(200).json({ message: 'User deleted successfully' });
        }
    
    }
}