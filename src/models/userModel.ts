import mongoose, { Document } from "mongoose"
import validator from "validator";
import bcrypt from 'bcryptjs'

interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    lastPasswordChange: Date | undefined;
    lastLogin: Date;
    createdAt: Date;
    updatedAt: Date | undefined;
    role: mongoose.Schema.Types.ObjectId,
    otp: number | undefined,
    status: string,
    accountActive: string
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

    otp: Number,

    status: {
        type: String,
        enum: ['logged-in', 'logged-out'],
        default: 'logged-in'
    },

    accountActive: {
        type: String,
        enum: ['active', 'verification-pending', 'suspended'],
        default: 'verification-pending'
    },

    role: {
        type: mongoose.Schema.Types.ObjectId,
        default: '648548d14a9ab2d275826530',
        ref: 'Role'
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
    },
})


userSchema.pre('save', async function (next: any) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 8)
    const OTP = Math.floor(1000 + Math.random() * 9000)
    this.otp = OTP

    next()
})


userSchema.methods.verifyOTP = async function (enteredOTP: number, otpInDB: number) {
    return enteredOTP === otpInDB
}

const User = mongoose.model<IUser>("User", userSchema)

export default User