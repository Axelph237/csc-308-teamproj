import {Type} from "@sinclair/typebox";
import {objectIdObj} from "./objectId";

// https://github.com/sinclairzx81/typebox?tab=readme-ov-file#typeregistry-format

const user = Type.Object({
    _id: objectIdObj,
    username: Type.String()
})

//Type.Optional(Type.String()),