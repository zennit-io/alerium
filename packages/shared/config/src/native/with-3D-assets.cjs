/**
 * Sets up 3D asset resolution for the project.
 *
 * @param {import('expo/metro-config').MetroConfig} config
 *
 * @returns {import('expo/metro-config').MetroConfig}
 */

const with3DAssets = (config) => {
  config.resolver.assetExts.push("glb", "gltf");
  return config;
};

module.exports = with3DAssets;
