import {Type, type Static} from "@sinclair/typebox";

export const objectIdObj = Type.String({
    pattern: '^[0-9a-fA-F]{24}$',
    description: 'MongoDB ObjectId'
})
export type ObjectId = Static<typeof objectIdObj>;