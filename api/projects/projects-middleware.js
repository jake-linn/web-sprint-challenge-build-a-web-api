// add middlewares here related to projects

const Project = require("../projects/projects-model")


const checkProjectId = async (req, res, next) => {
    const id = req.params.id
    const projectId = await Project.get(id)
    if(!projectId){
        res.status(404).json({
            message: "Project not found"
        })
    } else{
        req.projectId = projectId
        next()
    }
}

const checkProject = async (req, res, next) => {
    const {name, description} = req.body
    if(!name || !description){
        res.status(400).json({
            message: "name and description fields required"
        })
    } else {
        next()
    }
}

// Project MiddleWare 

module.exports = {
    checkProjectId,
    checkProject,
}