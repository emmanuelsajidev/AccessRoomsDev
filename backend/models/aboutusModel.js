var mongoose = require("mongoose");
var aboutusSchema = mongoose.Schema({
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  // link:{
  //   type: String,
  // },
  status: {
    type: String,
    default: "Active",
  },
});
module.exports = mongoose.model("aboutusModel", aboutusSchema);
