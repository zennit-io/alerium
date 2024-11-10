import {authTables} from "@convex-dev/auth/server";
import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";

export default defineSchema({
  ...authTables,
  reports: defineTable({
    survey: v.id("surveys"),
    serialNumber: v.optional(v.string()),
    deviceName: v.optional(v.string()),
    deviceType: v.optional(v.string()),
    description: v.optional(v.string()),
    manufacturer: v.optional(v.string()),
    photo: v.optional(v.id("_storage")),
    model: v.optional(v.string()),
    weight: v.optional(v.float64()),
    checkedBy: v.optional(v.id("users")),
    checkedAt: v.optional(v.int64()),
    note: v.optional(v.string()),
    dimensions: v.optional(v.string()),
    material: v.optional(v.string()),
    location: v.optional(
      v.object({
        address: v.optional(v.string()),
        longitude: v.optional(v.float64()),
        latitude: v.optional(v.float64()),
      }),
    ),
    otherMetadata: v.optional(v.any()),
    class: v.optional(v.string()),
  }).index("by_serialNumber", ["serialNumber"]),
  surveys: defineTable({
    name: v.string(),
    location: v.object({
      address: v.string(),
      longitude: v.float64(),
      latitude: v.float64(),
    }),
    bim: v.optional(v.id("_storage")),
  }),
});
