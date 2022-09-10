import { tokenToCSSVar } from "@chakra-ui/react";
import { Post, User, PrismaClient } from "@prisma/client";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { PostPayload } from "../utils/exportedDefinitions";

type DataPayload = {
    message: string,
    payload: PostPayload
}

const prisma = new PrismaClient()

export class PostController implements Post{
    
    id: string;
    title: string;
    content: string | null;
    authorId: string;
    attachments: string[];

    constructor({ id, title, content, authorId, attachments }: Post){
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.attachments = attachments;
    }

    public async createPost(res: Response<DataPayload>)
    {
        const post: Post & { author: User; } = await prisma.post.create({
            data: {
                title: this.title,
                content: this.content,
                authorId: this.authorId,
                attachments: this.attachments
            },
            include: {
                author: true
            }
        });

        res.send({ 
            message: `Post Created by ${post.author.profile?.username}`,
            payload: {
                posts: [],
                post: post
            }
        })
    }

    public async getAllPosts(res: Response<DataPayload>)
    {
        const posts: Post[] = await prisma.post.findMany({ 
            include: {
                author: true
            }
        })

        res.send({
            message: "Retrieved Socalito's Posts",
            payload: {
                post: null,
                posts: posts
            }
        })
    }

    public async getPost(res: Response<DataPayload>)
    {
        const post: (Post & { author: User }) | null = await prisma.post.findUnique({
            where: {
                id: this.id
            },
            include: { 
                author: true
            }
        });

        res.send({
            message: "Retrieved a Post",
            payload: {
                post: post,
                posts: []
            }
        })
    }
}