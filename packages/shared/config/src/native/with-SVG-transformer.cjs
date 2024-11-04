const path = require("node:path");
const SVG_TRANSFORMER_PATH =
  "/packages/shared/config/src/native/transformers/SVG-transformer.cjs";

/**
 * Add the svg transformer to the metro config;
 * this does edit the babel transformer path to intercept for icon files,
 * with a fallback to the default expo/babel transformer for other files;
 * you can overwrite this behavior by passing the path to your own transformer to handle other files.
 *
 * @param config {import('expo/metro-config').MetroConfig}
 * @param workspaceRoot {string}  the monorepo root, used to resolve the transformer absolute path
 *
 * @returns {import('expo/metro-config').MetroConfig}
 */

const withSVGTransformer = (config, workspaceRoot = process.cwd()) => {
  const transformerPath = path.join(workspaceRoot, SVG_TRANSFORMER_PATH);
  config.transformer = {
    ...config.transformer,
    babelTransformerPath: transformerPath,
    babelTransformer: transformerPath,
  };
  return config;
};

module.exports = withSVGTransformer;
