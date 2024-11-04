import type { Config } from "tailwindcss";
import preset from "./tailwind.config";

export default {
  presets: [preset],
  content: [...preset.content, "../../packages/ui/web/src/**/*.{ts,tsx}"],
} satisfies Config;
