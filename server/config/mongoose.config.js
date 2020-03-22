const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/author",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:true
})
    .then(()=> console.log("established a connection with the db, author"))
    .catch((err)=> {console.log("failed to establish a connection with the db"), err})
