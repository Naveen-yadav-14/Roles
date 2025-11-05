const hbs = require("hbs");
function registerHelpers(){
    hbs.registerHelper("includes", function (array, value) {
        return Array.isArray(array) && array.includes(value);
    });
    hbs.registerHelper("inc", (value) => parseInt(value) + 1);

}
module.exports = registerHelpers;