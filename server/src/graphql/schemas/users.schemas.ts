import { Field, ObjectType, InputType } from "type-graphql";

@ObjectType()
export class UserError {
    @Field({ nullable: true })
    message?: string;
    @Field({ nullable: true })
    error?: string;
}

@ObjectType()
export class UserResponse {
    @Field({ nullable: true })
    id?: string;
    @Field({ nullable: true })
    username?: string;
    @Field({ nullable: true })
    error?: string;
}

@ObjectType()
export class UserTokenResponse extends UserResponse {
    @Field({ nullable: true })
    token?: string;
}

@ObjectType()
export class User {
    @Field({ nullable: true })
    id?: string;

    @Field({ nullable: true })
    username?: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    profileImage?: string;

    @Field({ nullable: true })
    error?: string;
}

@InputType()
export class UserInput implements Partial<User> {
    @Field({ nullable: true })
    username?: string;
    @Field({ nullable: true })
    email?: string;
    @Field({ nullable: true })
    password?: string;
    @Field({ nullable: true })
    profileImage?: string;
}

@InputType()
export class UserResetInput {
    @Field()
    username: string;
    @Field()
    password: string;
    @Field()
    new_password: string;
}
