const path = require("node:path");
const { FileStore } = require("metro-cache");

/**
 * Move the Metro cache to the `.cache/metro` folder.
 * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
 *
 * @see https://turbo.build/repo/docs/reference/configuration#env
 *
 * @param {import('expo/metro-config').MetroConfig} config
 * @param {string} projectRoot - the __dirname of the metro config file, the project root
 *
 * @returns {import('expo/metro-config').MetroConfig}
 */
const withTurborepoManagedCache = (config, projectRoot = process.cwd()) => {
  config.cacheStores = [
    new FileStore({ root: path.join(projectRoot, ".cache/metro") }),
  ];
  return config;
};

module.exports = withTurborepoManagedCache;
