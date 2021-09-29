import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';



export default class UserController{

    constructor(){}
    
    public async getUsers(req: Request, res: Response): Promise<void> {
        const posts = await User.find();
        res.json(posts);
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        const userId = <number><unknown>req.params.userId;
        const user = await User.findOne({ userId }).populate('posts');
        if(!user) res.status(404).json('User not found');
        
        res.json(user);
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        
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
                res.status(400).json({ Error: "Something went wrong, try again in a few minutes"});
            };
        }
    }


    public async loginUser(req:Request, res: Response): Promise<void>{
         const user = await User.findOne({email: req.body.email});
         if (!user) res.status(401).json('Invalid mail or password');
         const correctPassword = await user.validatePassword(req.body.password);
         if (!correctPassword) res.status(401).json('Invalid mail or password');
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

    public async updateUser(req: Request, res: Response): Promise<void> {
        const { username } = req.params;
        const user = await User.findOneAndUpdate({ username }, req.body, { new: true });
        res.json(user);
    }

    public async deleteUser(req: Request, res: Response): Promise<void> {
        const { username } = req.params;
        await User.findOneAndDelete({ username });
        res.json({ response: 'User deleted successfully' })
    }
}