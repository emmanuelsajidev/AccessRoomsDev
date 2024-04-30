var mongoose = require("mongoose");
var youtubelinkModelSchema = mongoose.Schema({
  name: {
    type: String,
  },
  content: {
    type: String,
  },
  link:{
    type: String,
  },
  status: {
    type: String,
    default: "Active",
  },
});
module.exports = mongoose.model("youtubelinkModel", youtubelinkModelSchema);
