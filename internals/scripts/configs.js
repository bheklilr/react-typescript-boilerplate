var minimist = require('minimist');
var printConfigForJest = require('./helpers/printJestConfig');
var printConfigForLint = require('./helpers/printLintConfig');
var printConfigForBabel = require('./helpers/printBabelConfig');
var printConfigForTs = require('./helpers/printTsConfig');
var printConfigForTsLint = require('./helpers/printTslintConfig');

function parseArgs() {
    var args = minimist(process.argv.slice(2));
    var what = args['_'];
    if (what.length === 0) {
        process.stdout.write("Pass a tool's name to see its config\n");
        return;
    }
    what.forEach((tool) => printConfigFor(tool));
}

const tools = {
    "jest":         () => printConfigForJest(),
    "lint":         () => printConfigForLint(),
    "babel:dev":    () => printConfigForBabel("dev"),
    "babel:prod":   () => printConfigForBabel("prod"),
    "tslint":       () => printConfigForTsLint(),
    "ts:dev":       () => printConfigForTs("dev"),
    "ts:test":      () => printConfigForTs("test"),
    "ts:prod":      () => printConfigForTs("prod"),
}

function printConfigFor(tool) {
    const printer = tools[tool];
    if (printer !== null) {
        printer();
    } else {
        process.stdout.write("Unknown tool " + tool + "\n");
        process.exit(1);
    }
}

parseArgs();