const path = require("path");
const webpack = require("webpack");

module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: "./src/js/index.tsx",
	output: {
		path: path.resolve(__dirname, "dist/"),
		publicPath: "/dist/",
		filename: "bundle.js",
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: "awesome-typescript-loader",
			},
			{
				test: /\.css$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }],
			},
			{
				test: /\.(png|jpe?g|gif|svg|ico|pdf)$/,
				loader: "file-loader?name=/resources/[path][name].[ext]&context=src/resources",
			},

			{
				test: /\.(woff|woff2|ttf|eot)$/,
				loader: "file-loader?name=/resources/fonts/[name].[hash].[ext]",
			},
		],
	},
	devServer: {
		contentBase: path.join(__dirname, "public/"),
		port: 3000,
		publicPath: "http://localhost:3000/dist/",
		hotOnly: true,
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
};
