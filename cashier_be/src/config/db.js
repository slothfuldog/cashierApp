const {Sequelize} = require('sequelize');

const dbSequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: "localhost",
    dialect: "mysql",
    logQueryParameters: true
});

const dbCheckConnection = async() =>{
    try {
        await dbSequelize.authenticate();
        console.log(`Authenticate complete ✅`)
    } catch (error) {
        console.log(error)
    }
}

module.exports = { dbSequelize, dbCheckConnection}