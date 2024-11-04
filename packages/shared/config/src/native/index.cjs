/**
 * @typedef {import('metro-config').MetroConfig} MetroConfig
 */

/**
 * @typedef {(config: MetroConfig) => MetroConfig} MetroPlugin
 */

module.exports = {
  /**
   * Add the monorepo root to the metro resolver,
   * this is required to resolve packages from the monorepo root such as packages
   *
   * @param config {MetroConfig}
   *
   * @param  {string} workspaceRoot - the root of the monorepo
   * @param  {string} projectRoot - the __dirname of the metro config file, the project root
   *
   * @returns {MetroConfig}
   */
  withWorkspace: require("./with-workspace.cjs"),
  /**
   * Move the Metro cache to the `.cache/metro` folder.
   * If you have any environment variables, you can configure Turborepo to invalidate it when needed.
   *
   * @see https://turbo.build/repo/docs/reference/configuration#env
   *
   * @param {MetroConfig} config
   * @param {string} projectRoot - the __dirname of the metro config file, the project root
   *
   * @returns {MetroConfig}
   */
  withTurborepoManagedCache: require("./with-turborepo-cache.cjs"),
  /**
   * Add the svg transformer to the metro config;
   * this does edit the babel transformer path to intercept for icon files,
   * with a fallback to the default expo/babel transformer for other files;
   * you can overwrite this behavior by passing the path to your own transformer to handle other files.
   *
   * @param config {MetroConfig}
   * @param projectRoot {string}  the __dirname of the metro config file, the project root, used to resolve the transformer path
   *
   * @returns {MetroConfig}
   */
  withSVGTransformer: require("./with-SVG-transformer.cjs"),
  /**
   * Sets up nativewind for the project.
   *
   * @param {MetroConfig} config
   * @param {string} workspaceRoot  - the workspace root, used to resolve the globals.css path
   * @param {string | undefined} globalsCSSPath - a custom globals.css path if needed
   *
   * @returns {MetroConfig}
   */
  withNativewind: require("./with-nativewind.cjs"),
  /**
   * Sets up 3D asset resolution for the project.
   *
   * @param {import('expo/metro-config').MetroConfig} config
   *
   * @returns {import('expo/metro-config').MetroConfig}
   */
  with3DAssets: require("./with-3D-assets.cjs"),
  /**
   * composePlugins – composes an array of plugins into a single plugin
   *
   * @param  {...MetroPlugin[]} plugins - the plugins to compose into a single plugin
   *
   * @returns {MetroPlugin} the composed plugin
   */
  composePlugins: require("./compose-plugins.cjs"),
};
