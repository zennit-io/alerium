import {ConvexError, v} from "convex/values";
import {mutation, query} from "../_generated/server";

export const getAllReports = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reports").collect();
  },
});

export const getReportsOfSurvey = query({
  args: {
    survey: v.id("surveys"),
  },
  handler: async (ctx, { survey }) => {
    return await ctx.db
      .query("reports")
      .filter((q) => q.eq(q.field("survey"), survey))
      .collect();
  },
});

export const getReportById = query({
  args: {
    id: v.id("reports"),
  },
  handler: async (ctx, { id }) => {
    const report = await ctx.db.get(id);
    if (!report) throw new ConvexError("Report not found");
    const image = report.photo ? await ctx.storage.getUrl(report.photo) : null;
    return { ...report, image };
  },
});

export const saveReport = mutation({
  args: {
    serialNumber: v.string(),
    deviceName: v.string(),
    deviceType: v.string(),
    description: v.string(),
    manufacturer: v.string(),
    model: v.string(),
    weight: v.optional(v.float64()),
    survey: v.id("surveys"),
    checkedBy: v.id("users"),
    checkedAt: v.int64(),
    note: v.optional(v.string()),
    location: v.object({
      address: v.string(),
      longitude: v.float64(),
      latitude: v.float64(),
    }),
    otherMetadata: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("reports", args);
  },
});

export const updateReport = mutation({
  args: {
    id: v.id("reports"),
    survey: v.id("surveys"),
    serialNumber: v.optional(v.string()),
    deviceName: v.optional(v.string()),
    deviceType: v.optional(v.string()),
    description: v.optional(v.string()),
    manufacturer: v.optional(v.string()),
    model: v.optional(v.string()),
    weight: v.optional(v.float64()),
    checkedBy: v.optional(v.id("users")),
    checkedAt: v.optional(v.int64()),
    note: v.optional(v.string()),
    location: v.optional(
      v.object({
        address: v.optional(v.string()),
        longitude: v.optional(v.float64()),
        latitude: v.optional(v.float64()),
      }),
    ),
    otherMetaData: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, args);
  },
});

export const deleteReport = mutation({
  args: {
    id: v.id("reports"),
  },
  handler: async (ctx, { id }) => {
    return await ctx.db.delete(id);
  },
});

export const retrieveBIM = query({
  args: {
    id: v.id("_storage"),
  },
  handler: async (ctx, { id }) => {
    return await ctx.storage.getUrl(id);
  },
});
