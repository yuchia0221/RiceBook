const path = require("path");
const reporters = require("jasmine-reporters");

const junitReporter = new reporters.JUnitXmlReporter({
    savePath: path.join(__dirname, ".."),
    filePrefix: "junit-report.xml",
    consolidateAll: true,
});
jasmine.getEnv().addReporter(junitReporter);
