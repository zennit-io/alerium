type GeneralConfig = Record<string, unknown>;

export const buildConfig = <T extends GeneralConfig>(
  config: T | boolean | undefined,
  defaultConfig?: T,
): T | undefined => {
  if (typeof config === "object") return { ...defaultConfig, ...config };
  if (config === true) return defaultConfig;
};
