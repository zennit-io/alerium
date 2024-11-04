// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require("expo/metro-config");
const path = require("node:path");
const {
  withTurborepoManagedCache,
  withWorkspace,
  withSVGTransformer,
  withNativewind,
  with3DAssets,
  composePlugins,
} = require("@zenncore/config/native");

const PROJECT_ROOT = __dirname;
const WORKSPACE_ROOT = path.resolve(PROJECT_ROOT, "../..");

const withZenncore = composePlugins(
  (config) => withSVGTransformer(config, WORKSPACE_ROOT),
  (config) => withNativewind(config, WORKSPACE_ROOT),
  (config) => withWorkspace(config, WORKSPACE_ROOT, PROJECT_ROOT),
  (config) => withTurborepoManagedCache(config, PROJECT_ROOT),
  (config) => with3DAssets(config),
);

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(PROJECT_ROOT);

module.exports = withZenncore(config);
