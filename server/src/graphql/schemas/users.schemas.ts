import { Field, ObjectType, InputType } from "type-graphql";

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
export class UserRegisterInput implements Partial<User> {
    @Field({ nullable: true })
    username?: string;
    @Field({ nullable: true })
    email?: string;
    @Field({ nullable: true })
    password?: string;
    @Field({ nullable: true })
    profileImage?: string;
}
