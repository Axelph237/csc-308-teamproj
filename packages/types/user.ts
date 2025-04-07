import {Type} from "@sinclair/typebox";

const user = Type.Object({
    username: Type.String()
})

//Type.Optional(Type.String()),