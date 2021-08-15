const router = require("express").Router();
const Action = require("./actions-model");
const { checkActionId, checkAction } = require("./actions-middlware");

router.get("/", (req, res, next) => {
    Action.get()
        .then(actions => res.json(actions))
        .catch(err => next(err))
});

router.get("/:id", checkActionId, (req, res) => {
    res.json(req.actionId)
});

router.post("/", checkAction, (req, res, next) => {
    const body = req.body
    Action.insert(body)
        .then(({ id }) => {
            return Action.get(id)
        })
        .then(action => res.status(201).json(action))
        .catch(err => next(err))
});

router.put("/:id", checkActionId, checkAction, (req, res, next) => {
    const id = req.params.id
    const body = req.body
    Action.get(id)
        .then(() => {
            return Action.update(id, body)
        })
        .then(() => {
            return Action.get(id)
        })
        .then(action => res.json(action))
        .catch(err => next(err))
});

router.delete("/:id", checkActionId, async (req, res, next) => {
    const id = req.params.id
    try{
        const actionId = await Action.get(id)
        if(actionId){
            await Action.remove(id)
            res.json(actionId)
            next()
        }
    }catch(err){
        next(err)
    }
});

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
      message: "Well, this wasn't supposed to happen.",
      error: err.message
    });
  });

module.exports = router;