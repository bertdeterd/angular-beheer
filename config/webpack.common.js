var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require("./helpers");
var path = require("path");
const TsConfigPathsPlugin = require("awesome-typescript-loader").TsConfigPathsPlugin;

module.exports = {


/**
 * polyfills are needed for angular for browser support
 * You'll need polyfills to run an Angular application in most browsers as explained in the Browser Support guide.
 * Polyfills should be bundled separately from the application and vendor bundles. 
 * https://angular.io/guide/browser-support
 */
  entry: {
    polyfills: "./src/polyfills.ts",   
    vendor: "./src/vendor.ts",
    app: "./src/main.ts"
  },


/**
 * TsConfigPathsPlugin: If you want to use new paths and baseUrl feature of TS 2.0 please include TsConfigPathsPlugin. 
 * This feature is available only for webpack@2.1.
 */
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsConfigPathsPlugin()],
    alias: {
      app: path.resolve(__dirname, "src/app/"),
      services: path.resolve(__dirname, "src/services/")
    }
  },

  resolveLoader: {
    alias: {
      text: "text-loader"
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: "awesome-typescript-loader"
          },
          "angular2-template-loader"
        ]
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: "file-loader?name=assets/[name].[hash].[ext]"
      },
      {
        test: /\.css$/,
        exclude: helpers.root("src", "app"),
        loader: ExtractTextPlugin.extract({
          fallbackLoader: "style-loader",
          loader: "css-loader?sourceMap"
        })
      },
      {
        test: /\.css$/,
        include: helpers.root("src", "app"),
        loader: "raw-loader"
      }
    ]
  },

  plugins: [
    // Workaround for angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      helpers.root("./src"), // location of your src
      {} // a map of your routes
    ),

    new webpack.optimize.CommonsChunkPlugin({
      name: ["app", "vendor", "polyfills"]
    }),

    new webpack.DefinePlugin({
      "process.env": {
        SERVICE_URI: JSON.stringify("/proxy/sap/opu/odata/SAP/ZATI_MAIN_SRV/")
      }
    }),

    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
