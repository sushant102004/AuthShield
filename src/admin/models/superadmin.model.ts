import { Document, Schema, model } from 'mongoose'

interface ISuperAdmin extends Document {
    name: string
    email: string
    password: string
    type: string
}

const AdminSchema = new Schema<ISuperAdmin>({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    type: {
        type: String,
        trim: true,
        required: true,
        default: 'admin'
    }
})

const SuperAdmin = model<ISuperAdmin>('Admin', AdminSchema)

export default SuperAdmin