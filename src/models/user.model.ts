import mongoose, { Schema, Document, Model } from 'mongoose'

interface User extends Document {
    email: string;
    password: string;
}

const UserSchema = new Schema<User>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})


export const UserModel: Model<User> = mongoose.model<User>('User', UserSchema)