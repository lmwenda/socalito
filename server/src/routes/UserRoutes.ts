import { user_endpoints } from '../utils/endpoints';
import { Router, Request, Response } from "express";
import { UserController } from "../controllers/UserController";

const router: Router = Router();

router.post(user_endpoints.CREATE_USER, (req: Request, res: Response) => {
    const user = new UserController({ 
        id: "", 
        createdAt: new Date(), 
        updatedAt: new Date(), 
        email: req.body.email,
        password: req.body.password, 
        profile: {
            firstName: "",
            lastName: "",
            username: null,
            profilePicture: "",
            category: null
        } 
    })

    user.createUser(res);
})

export default router;