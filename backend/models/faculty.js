const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// Passport will username and password automatically
const facultySchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

facultySchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Faculty", facultySchema);
