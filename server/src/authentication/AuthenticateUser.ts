import Joi from "@hapi/joi";
import { User } from "@prisma/client";
import { CreateUserType } from "../utils/exportedDefinitions";

export function AuthenticateUser(body: CreateUserType){
    const schema: Joi.ObjectSchema<User> = Joi.object({
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        email: Joi.string().required().email(),
        password: Joi.string().min(6).required()

    });
  return schema.validate(body);
}

export default AuthenticateUser;