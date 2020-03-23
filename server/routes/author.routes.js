const AuthorController = require('../controllers/author.controllers')
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get("/api/authors/:id", AuthorController.getOne),
    app.post("/api/authors/create", AuthorController.create),
    app.get("/api/authors", authenticate, AuthorController.getAll),
    app.delete("/api/authors/delete/:id", AuthorController.deleteOne),
    app.put("/api/authors/update/:id", AuthorController.updateOne)
    app.put("/api/authors/update/status/:id",AuthorController.updateStatus)
}