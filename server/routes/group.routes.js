const GroupController = require('../controllers/group.controllers')

module.exports = app => {
    app.get("/api/groups", GroupController.getAll),
    app.get("/api/groups/:num", GroupController.getOne),
    app.post("/api/groups/new", GroupController.create),
    app.post("/api/groups/add/:num", GroupController.addAuthor),
    // app.put("/api/groups/:num/author/:authorId", GroupController.updateAuthor),
    app.put("/api/groups/:num/remove/:authorId", GroupController.removeAuthor)
}
