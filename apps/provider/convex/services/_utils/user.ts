import type {
  GenericActionCtx,
  GenericMutationCtx,
  GenericQueryCtx,
} from "convex/server";
import { ConvexError } from "convex/values";
import { api } from "../../_generated/api";
import type { DataModel, Id } from "../../_generated/dataModel";

type User = DataModel["users"]["document"];
export const getUser = async (
  ctx:
    | GenericMutationCtx<DataModel>
    | GenericQueryCtx<DataModel>
    | GenericActionCtx<DataModel>,
): Promise<User> => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new ConvexError("User identity not found");

  const id = identity.subject.split("|")[0] as Id<"users">;

  const user: User | null = await ctx.runQuery(api.services.user.getUserById, {
    id,
  });

  if (!user) throw new ConvexError("User not found");
  return user;
};
