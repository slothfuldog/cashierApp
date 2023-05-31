const {Sequelize} = require('sequelize');
const {dbSequelize} = require('../config/db');
const DataTypes = Sequelize;

const productModel = dbSequelize.define("products",{
    productsId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Admin is too lazy to give a description for this product"
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'food'
    },
    picture: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValues: 0
    }
})

module.exports = {productModel};