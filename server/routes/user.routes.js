const UserController  = require("../controllers/user.controllers")

module.exports = app => {
    app.post("/api/register", UserController.register),
    app.post("/api/login", UserController.login),
    app.delete("/api/logout", UserController.logout)
}