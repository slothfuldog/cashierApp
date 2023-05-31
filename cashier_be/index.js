const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors());
const bearerToken = require('express-bearer-token');
const {
    dbCheckConnection,
    dbSequelize
} = require('./src/config/db');
app.use(bearerToken());
app.use(express.static('src/public'));
const PORT = process.env.PORT || 4000;
const userRouter = require('./src/router/userRouter');
app.use('/', userRouter)
dbSequelize.sync({});
dbCheckConnection();
app.listen(PORT, (req, res) => {
    console.log(`Server has been running...`)
})