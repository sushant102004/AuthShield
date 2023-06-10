import mongoose, { Document } from "mongoose"

interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    lastPasswordChange: Date | undefined;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date | undefined;

    /*
        Extends this interface to add more properties to User model.
    */
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },

    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },

    lastPasswordChange: {
        type: String,
        default: undefined
    },

    lastLogin: {
        type: Date,
        default: Date.now()
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    updatedAt: {
        type: Date,
        default: undefined
    }

})

const User = mongoose.model<IUser>("User", userSchema)

export default User