import { Arg, Mutation, Query, Resolver } from "type-graphql";
import UsersModel from "../../api/models/users.models";
import { assignJWTAccessToken, hashPassword, verifyPassword } from "../../helpers/common.helpers";
import { User, UserError, UserInput, UserTokenResponse, UserResponse, UserResetInput } from "../schemas/users.schemas";

@Resolver((of) => User)
export class UserResolver {
    @Query(() => String)
    async hello(): Promise<string> {
        return "hello graphql world!";
    }

    @Query(() => [User])
    async getAllUsers(@Arg("role", { nullable: true }) role: string): Promise<User[]> {
        let users = role ? await UsersModel.find({ role }) : await UsersModel.find();
        console.log(users.length);
        if (users.length < 1) return [{ error: "no user found" }];

        return users;
    }

    @Mutation(() => User)
    async signUpUser(@Arg("UserInput") { username, email, password }: UserInput): Promise<User> {
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

    @Mutation(() => UserTokenResponse)
    async signInuser(@Arg("userInput") { username, password }: UserInput): Promise<UserTokenResponse> {
        const user = await UsersModel.findOne({ username });

        if (!user)
            return {
                error: "User doesn't exist",
            };

        const isPasswordVerified = await verifyPassword(password, user.password);

        if (!isPasswordVerified)
            return {
                error: "wrong credentials",
            };

        const jwtAccessToken = assignJWTAccessToken(username, user.id);

        if (!jwtAccessToken)
            return {
                error: "Some error occured, while assigning token. try again later!",
            };

        return {
            id: user.id,
            username: user.username,
            token: jwtAccessToken,
        };
    }

    @Mutation(() => UserError)
    async deleteUser(@Arg("UserInput") { username }: UserInput): Promise<UserError> {
        const user = await UsersModel.deleteOne({ username });

        if (user.deletedCount < 1)
            return {
                error: "wrong credentials!",
            };

        return {
            message: "user deleted successfully",
        };
    }

    @Mutation(() => UserResponse)
    async resetUserPassword(@Arg("UserResetInput") { username, password, new_password }: UserResetInput): Promise<UserResponse> {
        const user = await UsersModel.findOne({ username });

        if (!user) return { error: "user does not exist" };

        const isPasswordVerified = await verifyPassword(password, user.password);

        if (!isPasswordVerified) return { error: "wrong credentials" };

        const hashedPassword = await hashPassword(new_password);

        if (!hashedPassword) return { error: "some error occured while hashing password" };

        const modifiedUser = await UsersModel.findOneAndUpdate({ username }, { password: hashedPassword });

        return { id: modifiedUser.id, username };
    }
}
