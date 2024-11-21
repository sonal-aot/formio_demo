module.exports = function override(config) {
  // Avoid using eval() to prevent CSP violations
  config.devtool = "cheap-module-source-map"; 

  // Customize output file names for JS and CSS
  config.output = {
    ...config.output,
    filename: "static/js/main.js", // Rename main JS file
    chunkFilename: "static/js/[name].chunk.js", // Rename chunk JS files
  };

  // Modify CSS output filenames
  const cssRule = config.module.rules.find((rule) =>
    rule.oneOf?.some((r) => r.test?.toString().includes("css"))
  );

  if (cssRule) {
    cssRule.oneOf.forEach((rule) => {
      if (rule.options?.name) {
        rule.options.name = "static/css/[name].css"; // Rename CSS files
      }
    });
  }

  return config;
};
