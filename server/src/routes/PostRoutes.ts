import { post_endpoints } from '../utils/endpoints';
import { Router, Request, Response } from "express";
import { PostController } from '../controllers/PostController';

const router: Router = Router();

router.post(post_endpoints.CREATE_POST, (res: Response, req: Request) => {
    const { id, title, content, authorId, attachments } = req.body;
    const post = new PostController({ id, title, content, authorId, attachments });

    post.createPost(res);
})

router.get(post_endpoints.GET_ALL_POSTS, (res: Response, req: Request) => {
    const post = new PostController({ id: "", title: "", content: null, authorId: "", attachments: []});

    post.getAllPosts(res)
})

router.get(post_endpoints.GET_POST, (res: Response, req: Request) => {
    const { id } = req.body;
    const post = new PostController({ id, title: "", content: null, authorId: "", attachments: [] });

    post.getPost(res);
})

export default router;