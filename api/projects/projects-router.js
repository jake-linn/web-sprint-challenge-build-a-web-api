// Write your "projects" router here!
const router = require("express").Router();
const Project = require("./projects-model");
const {checkProjectId, checkProject} = require("../projects/projects-middleware");


router.get("/", (req, res, next) => {
    Project.get()
        .then(projects => res.json(projects))
        .catch(err => next(err))
});

router.get("/:id", checkProjectId, (req, res) => {
    res.json(req.projectId)
});

router.post("/" , checkProject, (req, res, next) => {
    const body = req.body
    Project.insert(body)
        .then(({ id })=> {
            return Project.get(id)
        })
        .then(project => res.status(201).json(project))
        .catch(err => next(err))
});

router.put("/:id/actions", checkProjectId, (req, res, next) => {
    const id = req.params.id
    Project.getProjectActions(id)
        .then(projects => res.json(projects))
        .catch(err => next(err))
})

router.delete("/:id", checkProjectId, async(req, res, next) => {
    const id = req.params.id
    try{
        const projectId = await Project.get(id)
        if(projectId){
            await Project.remove(id)
            res.json(projectId)
            next()
        }
    }catch(err){
        next(err)
    }
});

router.get("/:id/actions", checkProjectId, (req, res, next) => {
    const id = req.params.id
    Project.getProjectActions(id)
        .then(projects => res.json(projects))
        .catch(err => next(err))
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
      message: "Well, this wasn't supposed to happen.",
      error: err.message
    });
  });

module.exports = router;

