const express = require('express');
const cors = require('cors');

const cookieParser = require('cookie-parser');
//****npm install dotenv****/
require('dotenv').config();
const app = express();

require('./server/config/mongoose.config');

app.use(cookieParser());
//**optional object added to cors argument */
app.use(cors({
    credentials:true,
    //****port number should be the client's*** */
    origin: "http://localhost:3000"    
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

require('./server/routes/author.routes')(app);
require('./server/routes/group.routes')(app);
require('./server/routes/user.routes')(app);

app.listen(8000,()=>{
    console.log("Listening to port 8000")
});