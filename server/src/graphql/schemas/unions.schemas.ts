import { createUnionType } from "type-graphql";
import { UserError } from "./error.schemas";
import { User } from "./users.schemas";

export const UserSignUpResponse = createUnionType({
    name: "UserSignUpResponse",
    types: () => [User, UserError],
});
