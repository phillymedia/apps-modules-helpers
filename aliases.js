const moduleAlias = require("module-alias");

// Or multiple aliases
moduleAlias.addAliases({
	"@": __dirname,
	"@controllers": `${__dirname}/controllers`,
	"@config": `${__dirname}/config`,
});
