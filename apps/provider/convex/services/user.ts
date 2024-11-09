import { v } from "convex/values";
import { query } from "../_generated/server";
import { getUser } from "./_utils/user";

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    return await getUser(ctx);
  },
});

export const getUserById = query({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("_id"), id))
      .unique();
  },
});
