import type { Config } from "tailwindcss";
import preset from "./tailwind.config";

const nativewindPreset = require("nativewind/preset");

export default {
  darkMode: "class",
  presets: [preset, nativewindPreset],
  content: [
    ...preset.content,
    "./index.js",
    "../../packages/ui/native/src/**/*.{ts,tsx}",
  ],
  fontFamily: {
    sans: ["RFDewi-Regular"],
    header: ["RFDewiExtended-Bold"],
  },
} satisfies Config;
