const AuthorController = require('../controllers/author.controllers')

module.exports = app => {
    app.get("/api/authors/:id", AuthorController.getOne),
    app.post("/api/authors/create", AuthorController.create),
    app.get("/api/authors", AuthorController.getAll),
    app.delete("/api/authors/delete/:id", AuthorController.deleteOne),
    app.put("/api/authors/update/:id", AuthorController.updateOne)
    app.put("/api/authors/update/status/:id",AuthorController.updateStatus)
}