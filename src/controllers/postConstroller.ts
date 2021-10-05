import { Request, Response } from "express";
import Post from "../models/Post";
import User, { IUser } from "../models/User";

export default class PostController {
  constructor() {}

  public async getPosts(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
    const posts = await Post.find({ userId: userId });
    res.json(posts);
  }

  public async getPost(req: Request, res: Response): Promise<void> {
    const { url } = req.params;
    const post = await Post.findOne({ url });
    res.json(post);
  }

  public async createPost(req: Request, res: Response): Promise<void> {
    const { userId, title, url, content, image } = req.body;
    const newPost = new Post({ userId, title, url, content, image });
    const postSaved = await newPost.save();
    await User.findOneAndUpdate(
      { userId },
      { $push: { posts: postSaved._id } }
    );
    res.json({ data: postSaved });
  }

  public async updatePost(req: Request, res: Response): Promise<void> {
    const { url } = req.params;
    const post = await Post.findOneAndUpdate({ url }, req.body, { new: true });
    res.json(post);
  }

  public async deletePost(req: Request, res: Response): Promise<void> {
    const { url } = req.params;
    await Post.findOneAndDelete({ url });
    res.json({ response: "Post deleted successfully" });
  }
}
