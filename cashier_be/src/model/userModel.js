const {Sequelize} = require('sequelize');
const { dbSequelize } = require('../config/db');
const DataTypes = Sequelize;

const userModel = dbSequelize.define('users',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fullname:{
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'employee'
    },
    birthPlace:{
        type: DataTypes.STRING,
        allowNull: false
    },
    birthDate:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isDelete: {
        type: DataTypes.BOOLEAN,
        defaultValues: 0
    },
    isSuspended: {
        type: DataTypes.BOOLEAN,
        defaultValues: 0
    },
    failedLogin: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
});

module.exports = {userModel}