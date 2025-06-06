import { Static, Type } from "@sinclair/typebox";
import { objectIdObj } from "./objectId";

export const comment = Type.Object({
  _id: objectIdObj,
  text: Type.String(),
  author: objectIdObj,
});
export type Comment = Static<typeof comment>;

export const page = Type.Object({
  _id: objectIdObj,
  title: Type.String(),
  date: Type.String(),
  body: Type.String(),
  likeCounter: Type.Number(),
  comments: Type.Array(comment),
});
export type Page = Static<typeof page>;
