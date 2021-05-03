import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserError {
    @Field()
    error: string;
}
