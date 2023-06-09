import express from 'express'
import { AdminCreate } from '../services/account/superadmin.create'

const superAdminRouter = express.Router()

superAdminRouter.route('/superadmin/create')
    .post(AdminCreate.createSuperAdmin)


export default superAdminRouter