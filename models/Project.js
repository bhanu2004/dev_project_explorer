const mongoose = require("mongoose");
// require("../utils/connectDB");
const ProjectSchema = mongoose.Schema(
    {
        name: { type: String, required: true, index: true },
        default_link: {type:String, default:""},
        username: {type:String},
        password: {type:String},
        isDeleted: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        modifiedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

//Create a compound index on code and stateCode fields.
module.exports = mongoose.model("Project", ProjectSchema);