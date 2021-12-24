const CompressionPlugin = require("compression-webpack-plugin");

export default (config, env, helpers) => {
  const critters = helpers.getPluginsByName(config, "Critters")[0];
  if (critters) {
    // The default strategy in Preact CLI is "media",
    // but there are 6 different loading techniques:
    // https://github.com/GoogleChromeLabs/critters#preloadstrategy
    critters.plugin.options.preload = "body";
  }

  if (env.isProd) {
    config.devtool = false;
  }

  config.plugins.push(new CompressionPlugin({
    filename: "[path][base].gz",
    algorithm: "gzip",
    test: /.js$|.css$|.html$|.json$|.ico$|.eot$|.otf$|.ttf$/,
    exclude: /ssr/,
    minRatio: Number.MAX_SAFE_INTEGER,
    deleteOriginalAssets: true,
  }));
}