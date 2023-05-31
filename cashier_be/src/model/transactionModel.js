const {Sequelize} = require('sequelize');
const { dbSequelize } = require('../config/db');
const {DataTypes} = Sequelize;

const transactionModel = dbSequelize.define('transactions', {
    transactionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    items: {
        type: DataTypes.JSON,
        allowNull: true
    },
    total: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false
    },
    paidCondition: {
        type: DataTypes.STRING,
        defaultValue: "not paid yet"
    }
})

module.exports = { transactionModel };