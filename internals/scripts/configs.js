var minimist = require('minimist');
var printConfigForJest = require('./helpers/printJestConfig');
var printConfigForLint = require('./helpers/printLintConfig');
var printConfigForBabel = require('./helpers/printBabelConfig');

function parseArgs() {
    var args = minimist(process.argv.slice(2));
    var what = args['_'];
    if (what.length === 0) {
        process.stdout.write("Pass a tool's name to see its config\n");
        return;
    }
    what.forEach((tool) => printConfigFor(tool));
}

function printConfigFor(tool) {
    switch (tool) {
        case "jest":
            printConfigForJest();
            break;
        case "lint":
            printConfigForLint();
            break;
        case "babel:dev":
            printConfigForBabel('dev');
            break;
        case "babel:prod":
            printConfigForBabel('prod');
            break;
        default:
            process.stdout.write("Unknown tool " + tool + "\n");
            process.exit(1);
    }
}

parseArgs();