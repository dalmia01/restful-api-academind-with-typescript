import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UsersModel from "../../api/models/users.models";
import { hashPassword } from "../../helpers/common.helpers";
import { User, UserRegisterInput } from "../schemas/users.schemas";

@Resolver((of) => User)
export class UserResolver {
    @Query((returns) => String)
    async hello(): Promise<string> {
        return "hello graphql world!";
    }

    @Mutation((returns) => User)
    async signUpUser(@Arg("userRegisterInput") { username, email, password }: UserRegisterInput): Promise<User> {
        const user = await UsersModel.findOne({ username });

        if (user) {
            return {
                error: "User Already exists!",
            };
        }

        const hashedPassword = await hashPassword(password);

        if (!hashedPassword)
            return {
                error: "Some error occured while hashing password, try again later!",
            };

        const newUser = new UsersModel();
        newUser.username = username;
        newUser.email = email;
        newUser.password = hashedPassword;

        const userResult = await newUser.save();

        return {
            id: userResult.id,
            username: userResult.username,
            email: userResult.email,
        };
    }
}
