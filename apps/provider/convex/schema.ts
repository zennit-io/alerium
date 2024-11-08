import {defineSchema, defineTable} from "convex/server";
import {v} from "convex/values";
import {authTables} from '@convex-dev/auth/server';

export default defineSchema({
    ...authTables,

    itemTypes: defineTable({
        itemTypeName: v.string().unique(),
    }).index("unique_itemTypeName", ["itemTypeName"]),

    items: defineTable({
        serialNumber: v.string().unique(),
        itemName: v.string(),
        itemType: v.id('itemTypes'),
        description: v.string(),
    }),

    report: defineTable({
        survey: v.id('survey'),
        serialNumber: v.string(),
        manufacturer: v.string(),
        model: v.string(),
        weight: v.int64(),
        checkedBy: v.id('users'),
        checkedAt: v.int64(),
        note: v.string(),
        otherMetaData: v.any(),
    }).index("index_serialNumber", ["serialNumber"]),

    location: defineTable({
        location: v.string(),
        longitude: v.int64(),
        latitude: v.int64(),
    }),

    survey: defineTable({
        location: v.id('location'),
        name: v.string(),
    })
});