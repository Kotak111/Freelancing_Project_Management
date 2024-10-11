const Project = require("../models/project.model");
const { Parser } = require('json2csv');
const csvParser = require('csv-parser');
const fs = require('fs');

//createp project 
exports.CreateProject = async(req,res)=>{
    try {
        const {name,description,startDate,endDate,budget,clientId}=req.body;

        const project =await Project.create({
            name,description,startDate,endDate,budget,clientId
        })
        if(!project){
            return res.status(400).json({
                success:false,
                message:"Some errors"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Project Created"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}
//find project 
exports.FindAllProject=async(req,res)=>{
    try {
        const find=await Project.find()
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No project Found"
            })
        }
        return res.status(200).json({
            success:true,
            project:find
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}
//find by Id
exports.FindById=async(req,res)=>{
    try {
        const find=await Project.findById(req.params.id)
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No project Found"
            })
        }
        return res.status(200).json({
            success:true,
            project:find
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}
//delete a project 
exports.DeleteProject=async(req,res)=>{
    try {
        const find=await Project.findByIdAndDelete(req.params.id)
        if(!find){
            return res.status(400).json({
                success:false,
                message:"No project Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Project Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}
//update a project
exports.UpdateProject=async(req,res)=>{
    try {
        const update=await Project.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!update){
            return res.status(400).json({
                success:false,
                message:"No project Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Project Updated"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Error");
    }
}

//Bulk Data Export to CSV
exports.BulkUpload=  async (req, res) => {
    try {
        const projects = await Project.find();
        const fields = ['name', 'description', 'startDate', 'endDate', 'budget', 'clientId'];
        const json2csvParser = new Parser({ fields });
        const csv = json2csvParser.parse(projects);
        
        res.header('Content-Type', 'text/csv');
        res.attachment('projects.csv');
        res.status(200).send(csv);
    } catch (error) {
        console.log(error);
        
        res.status(500).json("error");
    }
}

exports.ImportCsv= async (req, res) => {
    const results = [];

    fs.createReadStream(req.file.path)
        .pipe(csvParser())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            try {
                await Project.insertMany(results);
                res.status(200).json({ message: 'Projects imported successfully' });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
            fs.unlinkSync(req.file.path); 
        });
}
