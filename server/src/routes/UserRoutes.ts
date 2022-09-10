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

router.put(user_endpoints.UPDATE_USER, (req: Request, res: Response) => {
    const { id, email, firstName, lastName, username, profilePicture, category } = req.body;

    const user = new UserController({ 
        id, 
        createdAt: new Date(), 
        updatedAt: new Date(), 
        email,
        password: "", 
        profile: {
            firstName: "",
            lastName: "",
            username: null,
            profilePicture: "",
            category: null
        } 
    })

    user.updateProfile(res, { firstName, lastName, username, profilePicture, category })
})

router.delete(user_endpoints.DELETE_USER, (req: Request, res: Response) => {
    const { id, email } = req.body;

    const user = new UserController({
        id,
        createdAt: new Date(), 
        updatedAt: new Date(), 
        email,
        password: "", 
        profile: {
            firstName: "",
            lastName: "",
            username: null,
            profilePicture: "",
            category: null
        } 
    })

    user.deleteAccount(res)
})

export default router;