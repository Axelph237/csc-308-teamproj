import {Static, Type} from "@sinclair/typebox";
import {objectIdObj} from "./objectId";
import {page} from "./page";

export const diary = Type.Object({
    _id: objectIdObj,
    title: Type.String(),
    lastEntry: Type.String(),
    numEntries: Type.Integer(),
    entries: Type.Array(page),
})
export type Diary = Static<typeof diary>;