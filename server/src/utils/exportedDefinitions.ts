import { User, Post } from "@prisma/client";

type CreateUserType = {
    createdAt: Date,
    updatedAt: Date,
    email: string | null,
    password: string
}

type Payload = {
    calitoken: string | null,
    users: User | User[] | null,
    posts: Post | Post[] | null | undefined
} | null

export { CreateUserType, Payload }