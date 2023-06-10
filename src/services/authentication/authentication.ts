import { Request, Response } from "express";



export class UserAuth {
    static signUp(req: Request, res: Response): Response | void {
        const { name, username, email, password } = req.body

        if (!name || !username || !email || !password) {
            return res.status(400).json({ error: "Please provide all the fields." });
        }
    }
}