const catchAsync = require("../utils/catchAsync");
const { Link, Project } = require("../models");
const { Types, isValidObjectId } = require("mongoose");

exports.getAll = catchAsync(async (req, res) => {

    let {url} = req.query;
    if(!url) return res.BadRequest({}, "Invalid request");
    if (url.includes('bitbucket.org') || url.includes('github.com')) {
        url = url.split('/').slice(0, 5).join('/');
    }
    else{
        url = url.split('/').slice(0, 3).join('/');
    }
    let condition = { isDeleted: false };
    condition.url =  { $regex: url, $options: "i" };        // Case-insensitive regex search on 'name'

    const data = await Link.findOne(condition);
    if(!data) return res.NotFound({}, "No data found");
    const projectId = data.projectId;
    const [links, project] = await Promise.all([
        Link.find({ projectId, isDeleted: false }).sort({ url_type: 1 }),
        Project.findById(projectId)
    ]);
    return res.Ok({links,project}, "Successfully fetched data!", 1);

});

exports.getCred = catchAsync(async (req, res) => {

    let {url} = req.query;
    if(!url) return res.BadRequest({}, "Invalid request");
    let condition = { isDeleted: false };
    condition.url =  { $regex: url, $options: "i" };        // Case-insensitive regex search on 'name'
    const data = await Link.findOne(condition);
    if(!data) return res.NotFound({}, "No data found");
    const projectId = data.projectId;
    let project = await Project.findById(projectId);
    return res.Ok(project, "Successfully fetched data!", 1);

});

exports.searchItem = catchAsync(async (req, res) => {

    let {name} = req.query;
    // if(!name) return res.BadRequest({}, "Invalid request");
    let condition = { isDeleted: false };
    condition.name =  { $regex: name, $options: "i" };        // Case-insensitive regex search on 'name'
    const data = await Project.find(condition);
    if(!data) return res.NotFound({}, "No data found");
    return res.Ok(data, "Successfully fetched data!", 1);

});