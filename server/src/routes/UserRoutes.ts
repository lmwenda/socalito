import { Router, Request, Response } from "express";
// import { UserController } from "../Controller/UserController";
import { user_endpoints } from '../utils/endpoints';

const router = Router();

router.get(user_endpoints.CREATE_USER, (req: Request, res: Response) => {
    
})

export default router;