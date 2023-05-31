const {
    dbSequelize
} = require("../config/db");
const {
    createToken
} = require("../config/encrypt");
const {
    productModel
} = require("../model/productModel");
const {
    Op
} = require('sequelize');
const {
    transactionModel
} = require("../model/transactionModel");
const {
    userModel
} = require("../model/userModel");
const {
    reportModel
} = require("../model/reportModel");

module.exports = {
    registerProduct: async (req, res) => {
        try {
            const data = await userModel.findAll({
                where: {
                    id: req.decrypt.id
                }
            })
            if (data.length > 0) {
                const data1 = await productModel.create({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    type: req.body.type,
                    picture: `/productPicture/${req.files[0].filename}`
                })
                res.status(200).send({
                    success: true,
                    message: "successfully add item!"
                })
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: error
            })
        }
    },
    updateProduct: async (req, res) => {
        try {
            if (!req.files[0]) {
                req.files[0] = {
                    filename: ""
                }
            } else if (!req.body.filename) {
                req.body.filename == "";
            }
            const data = await userModel.findAll({
                where: {
                    id: req.decrypt.id
                }
            })
            if (data.length > 0) {
                const data1 = await productModel.update({
                    name: req.body.name,
                    description: req.body.description,
                    price: req.body.price,
                    type: req.body.type,
                    picture: `/productPicture/${req.files[0].filename}${req.body.filename}`
                }, {
                    where: {
                        productsId: req.body.productsId
                    }
                })
                res.status(200).send({
                    success: true,
                    message: "Successfully updated!"
                })
            }

        } catch (error) {
            console.log("check", req.files)
            console.log(error)
            res.status(500).send({
                success: false,
                message: error
            })
        }
    },
    getAllMenu: async (req, res) => {
        //get all product data
        try {
            const data = await productModel.findAll({
                where: {
                    isDeleted: false
                }
            })
            return res.status(200).send({
                success: true,
                result: data
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                result: error
            })
        }
    },
    deleteMenu: async (req, res) => {
        try {
            let data = productModel.update({
                isDeleted: 1
            }, {
                where: {
                    productsId: req.body.productsId
                }
            })
            return res.status(200).send({
                success: true,
                message: "Successfully Deleted"
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success: false,
                message: "Internal Server Error"
            })
        }
    },
    filterMenu: async (req, res) => {
        try {
            const data = await productModel.findAll({
                where: {
                    type: {
                        [Op.like]: `%${req.body.types}%`
                    },
                    isDeleted: 0
                }
            })
            res.status(200).send({
                success: true,
                result: data
            })
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    filterProductList: async (req, res) => {
        try {
            let data = await dbSequelize.query(`select * from products where name like '%${req.body.name}%' and type like '%${req.body.type}%' and isDeleted = 0 order by ${req.body.values} ${req.body.order}`)
            console.log(data)
            return res.status(200).send({
                success: true,
                result: data[0],
                message: "success"
            })
        } catch (error) {
            console.log(error)
            res.status(500).send(error)
        }
    },
    createTransaction: async (req, res) => {
        try {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            const data = await transactionModel.create({
                items: req.body.jsonItems,
                username: req.body.username,
                userId: req.body.id,
                isPaid: true,
                total: req.body.total,
                paidCondition: "fully paid",
                date: today
            })
            res.status(200).send({
                success: true,
                result: data,
                message: "Transaction Success!"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    },
    getAllTransactions: async (req, res) => {
        try {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            let data = await transactionModel.findAll({
                where: {
                    date: today
                }
            });
            let data2 = await transactionModel.sum('total');
            return res.status(200).send({
                success: true,
                result: data,
                total: data2,
                message: "Transaction Succeeded"
            })
        } catch (error) {
            console.log(error);
            return res.status(500).send({
                success: false,
                message: "Internal Server Error 500"
            })
        }
    },
    getSpecUserTrans: async (req, res) => {
        try {
            let data = await transactionModel.findAll({
                where: {
                    userId: req.body.id
                }
            });
            let data2 = await transactionModel.sum('total', {
                where: {
                    userId: req.body.id
                }
            })
            return res.status(200).send({
                success: true,
                result: data,
                total: data2,
                message: "successfully fetching data"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal Server Error 500")
        }
    },
    createReport: async (req, res) => {
        try {
            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0');
            let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = today.getFullYear();
            today = yyyy + '-' + mm + '-' + dd;
            let data = await reportModel.create({
                date: today,
                total: req.body.total
            })
            res.status(200).send({
                success: true,
                message: "Successfully create a report!"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send(error)
        }
    },
    getAllReport: async (req, res) => {
        try {
            let sevenDaysAgo = new Date().setDate(new Date().getDate() - 7);
            let sevenDays = new Date(sevenDaysAgo)
            let dd = String(sevenDays.getDate()).padStart(2, '0');
            let mm = String(sevenDays.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = sevenDays.getFullYear();
            sevenDaysAgo = yyyy + '-' + mm + '-' + dd;
            let today = new Date();
            let dd1 = String(today.getDate()).padStart(2, '0');
            let mm1 = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy1 = today.getFullYear();
            today = yyyy1 + '-' + mm1 + '-' + dd1;
            let data = await reportModel.findAll({
                where: {
                    date: {
                        [Op.between]: [(req.body.past ? req.body.past: sevenDaysAgo), (req.body.date ? req.body.date : today)]
                    }
                }
            });
            return res.status(200).send({
                success: true,
                result: data,
                message: "Successfully fetching data"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send("Internal server error")
        }
    }
}