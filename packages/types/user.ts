import {Type} from "@sinclair/typebox";
import {objectIdObj} from "./objectId";

export const user = Type.Object({
    _id: objectIdObj,
    username: Type.String(),
    password: Type.String(),
    email: Type.String(),
    diariesID: Type.Array(objectIdObj),
    profilePicture: Type.String({format: "uri"})
})
