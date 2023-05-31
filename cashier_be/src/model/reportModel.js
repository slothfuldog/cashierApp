const {Sequelize} = require('sequelize');
const {dbSequelize} = require('../config/db');
const {DataTypes} = Sequelize;

const reportModel = dbSequelize.define('report',{
    reportId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    total: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

module.exports = {reportModel}