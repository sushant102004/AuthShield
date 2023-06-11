import { Document, Schema, model } from 'mongoose'

interface IAdmin extends Document {
    name: string
    email: string
    password: string
    type: string
}

const AdminSchema = new Schema<IAdmin>({
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
        default: 'SuperAdmin'
    }
})

const Admin = model<IAdmin>('Admin', AdminSchema)

export default Admin