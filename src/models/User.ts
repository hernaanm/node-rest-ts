import bcrypt from 'bcryptjs';
import { Document, model, Schema } from 'mongoose';

export interface IUser extends Document {
    userId: number;
    name: string;
    email: string;
    password: string
    username: string;
    createdAt: Date;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
};

const userSchema = new Schema<IUser>({
    userId: {type: Number, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true ,lowercase: true },
    password: { type: String, required: true },
    username: { type: String, required: true, min: 4 ,lowercase: true },
    createdAt: { type: Date, default: Date.now() },
})

userSchema.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);