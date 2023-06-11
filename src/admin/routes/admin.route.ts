import express from 'express'
import { AdminCreate } from '../services/account/admin.create'

const adminRouter = express.Router()

adminRouter.route('/superadmin/create')
    .post(AdminCreate.createSuperAdmin)


export default adminRouter