const express = require('express')

const bodyParser = require('body-parser')

const config = require('./config/database.config')

const mogoose = require('mongoose')

const logger = require('./util/logger')

mogoose.Promise = global.Promise

const app = express();
const UserRoute = require('./app/routes/User')



app.use(bodyParser.urlencoded({ extended : true}))

app.use(bodyParser.json())
require("./util/AuthVerification");
app.use('/user',UserRoute)

app.get('/' , (req , res) => {
    
        res.json({message: "Hello Crud Node Express"});
    });
    
    app.listen(2000, () => {
        logger.info("Server is listening on port :: 2000");
    });


mogoose.connect(config.url, {
    useNewUrlParser : true
}).then(() => {
    logger.info("Database Connected Successfully")
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});

