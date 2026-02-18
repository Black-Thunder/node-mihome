const path = require("path");
const glob = require("glob");

const models = {};

glob.sync(path.resolve(__dirname, "./devices/*.js")).forEach(modelPath => {
	const modelName = path.parse(modelPath).name;

	models[modelName] = require(modelPath);
});

module.exports = models;
