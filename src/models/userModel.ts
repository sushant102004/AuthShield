import mongoose, { Document } from "mongoose"
import validator from "validator";

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
        validate: {
            validator: function (value: string) {
                return validator.isAlpha(value)
            },
            message: 'Name can only contain alphabets and words.'
        }
    },

    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 30,
        unique: true,
    },

    email: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 30
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