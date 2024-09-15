const catchAsync = require("../utils/catchAsync");
const { Project } = require("../models");
const { Types, isValidObjectId } = require("mongoose");

exports.create = catchAsync(async (req, res) => {
	try {
		const data = req.body;
		if (!data.name) return res.BadRequest({}, "Invalid request");


		const project = await Project.create({
			name: data.name,
			default_link: data.default_link,
            username: data.username,
            password: data.password,
		});
		return res.Ok(project, "Project Created Successfully");
	} catch (error) {
		console.log("error", error);
		return res.BadRequest({ stack: error.stack }, "Something went wrong!");
	}
});


exports.getAll = catchAsync(async (req, res) => {

		let skip = req.query.skip ? parseInt(req.query.skip) : 0;
		let limit = req.query.limit ? parseInt(req.query.limit) : null;
		let count = null;
		let condition = { isDeleted: false };
		if (req.query?.name) {
			condition.name =  { $regex: req.query.name, $options: "i" };        // Case-insensitive regex search on 'name'
		}
		count = await Project.countDocuments(condition);
		const data = await Project.find(condition)
			.sort({ modifiedAt: -1 })
			.skip(skip)
			.limit(limit);
		return res.Ok(data, "Successfully fetched data!", count);

});

exports.updateOne = catchAsync(async (req, res) => {
	try {
		let data = req.body;
		let { _id } = req.params;
		data["modifiedAt"] = new Date();
		if (!_id || !isValidObjectId(_id)) return res.BadRequest({}, "Invalid request");
		let response = await Project.updateOne({ _id }, { $set: data });
		return res.Ok(response, "Updated");
	} catch (error) {
		if (error.code == "11000")
			return res.BadRequest(
				{ stack: error.stack },
				`An Entry With City Code ${error.keyValue.code} Already Exists!`
			);
		return res.BadRequest({ stack: error.stack }, "Something went wrong!");
	}
});

exports.deleteOne = catchAsync(async (req, res) => {
    let { _id } = req.params;
    if (!_id || !isValidObjectId(_id)) return res.BadRequest({}, "Invalid request");
    let response = await Project.updateOne({ _id }, { $set: { isDeleted: true } });
    return res.Ok(response, "Deleted");
});


