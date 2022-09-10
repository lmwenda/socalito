import { User, Post } from "@prisma/client";

type CreateUserType = {
    createdAt: Date,
    updatedAt: Date,
    email: string | null,
    password: string
}

type UserPayload = {
    calitoken: string | null,
    users: User | User[] | null,
    posts: Post | Post[] | null | undefined
} | null;

type PostPayload = {
    post: Post | null,
    posts: Post | Post[] | null | undefined
}

export { CreateUserType, UserPayload, PostPayload  }