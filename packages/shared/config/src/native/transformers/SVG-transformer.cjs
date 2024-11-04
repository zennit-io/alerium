const { parse } = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const generate = require("@babel/generator").default;
const t = require("@babel/types");

/**
 * @typedef {Object} TransformOptions
 * @property {string} src
 * @property {string} filename
 * @property {Record<string, unknown>} [options]
 */

/**
 * @typedef {Object} Transformer
 * @property {(options: TransformOptions) => Promise<TransformOptions>} transform
 */

/**
 * @param {string} src
 * @returns {Promise<string>}
 */

const defaultTransformer = require("@expo/metro-config/babel-transformer");

/**
 * webToNativeSVGTransformer – transform web icon code to native icon code,
 * handles imports from react-native-svg, transforming tag names and CSS interoping icons for use with nativewind
 *
 * @param {string} src - the code to transform
 *
 * @returns {Promise<string>} - the transformed code
 */

const webToNativeSVGTransformer = async (src) => {
  const ast = parse(src, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  traverse(ast, {
    /**
     * @param {import('@babel/traverse').NodePath} path
     */
    JSXElement(path) {
      const openingElement = path.node.openingElement;
      const closingElement = path.node.closingElement;

      switch (openingElement.name.name) {
        case "svg":
          openingElement.name.name = "Svg";
          if (closingElement) closingElement.name.name = "Svg";
          // openingElement.attributes = openingElement.attributes.filter(
          //   (attr) =>
          //     !(
          //       t.isJSXAttribute(attr) &&
          //       (attr.name.name === "height" || attr.name.name === "width")
          //     ),
          // );
          // openingElement.attributes.push(
          //   t.jsxAttribute(
          //     t.jsxIdentifier("className"),
          //     t.stringLiteral("size-6"),
          //   ),
          // );

          break;
        case "path":
          openingElement.name.name = "Path";
          if (closingElement) closingElement.name.name = "Path";

          break;
        case "circle":
          openingElement.name.name = "Circle";
          if (closingElement) closingElement.name.name = "Circle";

          break;
        case "rect":
          openingElement.name.name = "Rect";
          if (closingElement) closingElement.name.name = "Rect";

          break;
        case "g":
          openingElement.name.name = "G";
          if (closingElement) closingElement.name.name = "G";

          break;
        case "defs":
          openingElement.name.name = "Defs";
          if (closingElement) closingElement.name.name = "Defs";

          break;
        case "title":
          path.remove();

          break;
        default:
          break;
      }
    },
    ExportNamedDeclaration(path) {
      const { declaration, specifiers } = path.node;

      if (declaration) {
        if (
          t.isFunctionDeclaration(declaration) ||
          t.isVariableDeclaration(declaration)
        ) {
          const id = declaration.declarations
            ? declaration.declarations[0].id.name
            : declaration.id.name;
          ast.program.body.push(
            t.callExpression(t.identifier("interopIcon"), [t.identifier(id)]),
          );
        }
      } else if (specifiers) {
        for (const specifier of specifiers) {
          if (t.isExportSpecifier(specifier)) {
            ast.program.body.push(
              t.callExpression(t.identifier("interopIcon"), [
                t.identifier(specifier.local.name),
              ]),
            );
          }
        }
      }
    },
  });

  // Add import declarations
  const importDeclarations = [
    t.importDeclaration(
      [
        t.importSpecifier(t.identifier("Svg"), t.identifier("Svg")),
        t.importSpecifier(t.identifier("Path"), t.identifier("Path")),
        t.importSpecifier(t.identifier("Circle"), t.identifier("Circle")),
        t.importSpecifier(t.identifier("Rect"), t.identifier("Rect")),
        t.importSpecifier(t.identifier("G"), t.identifier("G")),
        t.importSpecifier(t.identifier("Defs"), t.identifier("Defs")),
      ],
      t.stringLiteral("react-native-svg"),
    ),
    t.importDeclaration(
      [
        t.importSpecifier(
          t.identifier("interopIcon"),
          t.identifier("interopIcon"),
        ),
      ],
      t.stringLiteral("@zenncore/utils/native"),
    ),
  ];

  for (const importDeclaration of importDeclarations) {
    ast.program.body.unshift(importDeclaration);
  }

  const { code } = generate(ast);
  // console.log(code);
  return code;
};

/**
 * createTransformer – create a transformer function that can be used with metro
 * intercepts icon files and transforms them to native icon code
 *
 * @param {Transformer} transformer
 *
 * @returns {(options: TransformOptions) => Promise<TransformOptions>}
 */
const createTransformer =
  (transformer) =>
  async ({ src, filename, ...rest }) => {
    if (filename.includes("icons") && filename.includes(".tsx")) {
      return transformer.transform({
        src: await webToNativeSVGTransformer(src),
        filename,
        ...rest,
      });
    }
    return transformer.transform({ src, filename, ...rest });
  };
/** @type {{ transform: (options: TransformOptions) => Promise<TransformOptions> }} */
module.exports.transform = createTransformer(
  /** @type {Transformer} */ (defaultTransformer),
);
