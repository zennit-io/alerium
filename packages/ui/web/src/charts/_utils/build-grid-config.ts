import type { GridConfig } from "../_types";
import { buildConfig } from "./build-config";

const DEFAULT_GRID_CONFIG: GridConfig = {
  x: true,
  y: true,
  color: "hsl(var(--border)",
};
export const buildGridConfig = (grid?: GridConfig | boolean) =>
  buildConfig(grid, DEFAULT_GRID_CONFIG);
