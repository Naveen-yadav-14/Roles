const hbs = require("hbs");
function registerHelpers(){
    hbs.registerHelper("includes", function (array, value) {
        return Array.isArray(array) && array.includes(value);
    });
    hbs.registerHelper("inc", (value) => parseInt(value) + 1);
    hbs.registerHelper("ifEquals", function (a, b, options) {
  return a.toString() === b.toString() ? options.fn(this) : options.inverse(this);
});
}
module.exports = registerHelpers;