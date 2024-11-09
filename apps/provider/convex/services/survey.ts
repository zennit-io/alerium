import {v} from "convex/values";
import {mutation, query} from "../_generated/server";
import {getReportsOfSurvey} from "./report";

export const getAllSurveys = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("surveys").collect();
  },
});

export const getSurveyById = query({
  args: {
    id: v.id("surveys"),
  },
  handler: async (ctx, { id }) => {
    const survey = await ctx.db
      .query("surveys")
      .filter((q) => q.eq(q.field("_id"), id))
      .unique();
    if (!survey) throw new Error("Survey not found");
    const reports = await getReportsOfSurvey(ctx, { survey: survey._id });

    return {
      ...survey,
      reports: [...reports],
    };
  },
});

export const saveSurvey = mutation({
  args: {
    name: v.string(),
    location: v.object({
      address: v.string(),
      longitude: v.float64(),
      latitude: v.float64(),
    }),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("surveys", args);
  },
});

export const updateSurvey = mutation({
  args: {
    id: v.id("surveys"),
    name: v.optional(v.string()),
    location: v.optional(
      v.object({
        address: v.optional(v.string()),
        longitude: v.optional(v.float64()),
        latitude: v.optional(v.float64()),
      }),
    ),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, args);
  },
});

export const deleteSurvey = mutation({
  args: {
    id: v.id("surveys"),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db.delete(id);
  },
});
