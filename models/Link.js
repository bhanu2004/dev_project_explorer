const mongoose = require("mongoose");
// require("../utils/connectDB");
const LinkSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        projectId:{
            
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        url: {type:String},
        url_type: {type:String},
        project_type: {type:String},
        isDeleted: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        modifiedAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);


module.exports = mongoose.model("Link", LinkSchema);