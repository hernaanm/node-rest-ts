import { Request, Response } from 'express';
import Post from '../models/Post';

export default class PostController{

    constructor(){}

    public async getPosts(req: Request, res: Response): Promise<void> {
        const posts = await Post.find();
        res.json(posts);
    }

    public async getPost(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        const post = await Post.findOne({ url });
        res.json(post);

    }

    public async createPost(req: Request, res: Response): Promise<void> {
        const { title, url, content, image } = req.body;
        const newPost = new Post({ title, url, content, image });
        await newPost.save();
        res.json({ data: newPost });
    }

    public async updatePost(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        const post = await Post.findOneAndUpdate({ url }, req.body, { new: true });
        res.json(post);
    }

    public async deletePost(req: Request, res: Response): Promise<void> {
        const { url } = req.params;
        await Post.findOneAndDelete({ url });
        res.json({ response: 'Post deleted successfully' })
    }
}