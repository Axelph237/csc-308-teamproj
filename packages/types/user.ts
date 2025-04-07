import {Type} from "@sinclair/typebox";
import {objectIdObj} from "./objectId";

const user = Type.Object({
    _id: objectIdObj,
    username: Type.String()
})

//Type.Optional(Type.String()),