import {Type} from "@sinclair/typebox";
import {objectIdObj} from "./objectId";

// https://github.com/sinclairzx81/typebox?tab=readme-ov-file#typeregistry-format

const user = Type.Object({
    _id: objectIdObj,
    username: Type.String(),
    password: Type.String(),
    email: Type.String(),
    diariesID: Type.Array(objectIdObj),
    profilePicture: Type.String()
})

const page = Type.Object({
    _id: objectIdObj,
    title: Type.String(),
    date: Type.String(),
    body: Type.String(),
})

const diary = Type.Object({
    _id: objectIdObj,
    title: Type.String(),
    lastEntry: Type.String(),
    numEntries: Type.Integer(),
    entries: Type.Array(page),
})

//Type.Optional(Type.String()),