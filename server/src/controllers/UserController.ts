import { Post, PrismaClient, Profile, User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { Response } from "express";
import jwt from "jsonwebtoken";
import AuthenticateUser from "../authentication/AuthenticateUser";
import { CreateUserType, Payload } from "../utils/exportedDefinitions";

type DataPayload = {
    message: string,
    payload: Payload
}

const prisma = new PrismaClient()

export class UserController implements User{
    
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string | null;
    password: string;
    profile: Profile | null;

    constructor({ id, createdAt, updatedAt, email, password, profile }: User){
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.email = email;
        this.password = password;
        this.profile = profile;
    }

    public async createUser(res: Response<DataPayload>): Promise<any>{
        const body: CreateUserType = {
            createdAt: new Date(),
            updatedAt: new Date(),
            email: this.email,
            password: this.password
        }
        const { error } = AuthenticateUser(body);
        if(error) return res.status(400).json({ message: error.details[0].message, payload: null });
        const correctEmail: any = this.email;
    
        const _user = await prisma.user.findUnique(
          {
            where:
            {
              email: correctEmail,
            }
          }
       );
        if (_user) return res.status(400).json({ message: "Email already used...", payload: null })
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        
        const finalBody: CreateUserType = {
            createdAt: new Date(),
            updatedAt: new Date(),
            email: this.email,
            password: hashedPassword
        }

        const user: User = await prisma.user.create({
            data: finalBody
        });

        res.json({ 
            message: "Successfully Created a new account...", 
            payload:  {
                calitoken: null,
                users: user,
                posts: []
            }
        })
    }

    public async loginUser(res: Response<DataPayload>) {
        // CHECK IF EMAIL IS VALID 

        const _user = await prisma.user.findUnique(
        { 
            where: { 
                email: String(this.email) 
            }
        }
        );
        if(!_user) return res.status(400).json(
        {
            message: "Invalid Email or Password", 
            payload: null
        }
        );
        
        // CHECK IF PASSWORD IS VALID

        const validPassword = bcrypt.compare(this.password, _user.password);
        if(!validPassword) return res.status(400).json(
            {
                message: "Invalid Email or Password", 
                payload: null
            }
        );

        // EVERTHING THING IS CORRECT AND SIGNS THE USER IN

        const token = jwt.sign({ _id: _user.id }, String(process.env.SECRET_TOKEN));
        res.json(
        {
            message: "Succesfully Signed into your Account...", 
            payload: {
                calitoken: token,
                users: _user,
                posts: null
            }
        }
        );
        res.setHeader("calitoken", token);
    }

    public async updateProfile(res: Response<DataPayload>, { firstName, lastName, username, category }: Profile) {
        const updatedUser: User = await prisma.user.update({
            where: {
              id: this.id
            },
            data: {
                profile: {
                    firstName,
                    lastName,
                    username,
                    category
                }
            }
        });

        res.send({ 
            message: `Successfully Updated ${updatedUser.email}'s Profile`, 
            payload: { 
                calitoken: null,
                users: updatedUser,
                posts: null
            }
        })
    }

    public async getAllUsers(res: Response<DataPayload>)
    {
        const users: User[] = await prisma.user.findMany({
            include: {
                posts: true
            }
        });

        res.send({
            message: "Retrieved All Users on Socalito",
            payload: {
                calitoken: null,
                users: users,
                posts: null
            }
        })
    }

    public async getUser(res: Response<DataPayload>)
    {
        const foundUser: User | null = await prisma.user.findUnique({
            where: {
                id: this.id
            }
        });

        res.send({ message: `Retrieved ${this.email}'s Profile`, payload: {
            calitoken: null,
            users: foundUser,
            posts: null
        } })
    }

    public async getAllUsersPosts(res: Response<DataPayload>)
    {
        const foundUser: (User & { posts: Post[]; }) | null = await prisma.user.findUnique({
            where: {
                id: this.id
            },
            include: {
                posts: true
            }
        });

        res.send({
            message: `Revtrieved ${this.email}'s Posts`,
            payload: {
                calitoken: null,
                users: foundUser,
                posts: foundUser?.posts
            }
        })
    }

    public async deleteAccount(res: Response<DataPayload>)
    {
        const user: User = await prisma.user.delete({
            where: {
                id: this.id
            }
        })

        res.send({ 
            message: `Account Deleted: ${user.email}`,
            payload: {
                calitoken: null,
                users: user,
                posts: null
            }
        })
    }
}