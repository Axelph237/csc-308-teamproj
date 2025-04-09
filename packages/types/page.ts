import {Type} from "@sinclair/typebox";
import {objectIdObj} from "./objectId";

export const page = Type.Object({
    _id: objectIdObj,
    title: Type.String(),
    date: Type.String(),
    body: Type.String(),
})

