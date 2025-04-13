const { init } = require("@paralleldrive/cuid2");
const length = 28; // 50% odds of collision after ~51,386,368 ids
const cuid = init({ length });

module.exports = cuid;
