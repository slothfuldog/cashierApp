const {
    dbSequelize
} = require("../config/db");
const {
    encryptPassword,
    createToken
} = require("../config/encrypt");
const {
    Op
} = require('sequelize');
const {
    userModel
} = require("../model/userModel");
const bcrypt = require('bcrypt')

module.exports = {
    login: async (req, res) => {
        try {
            const data = await userModel.findAll({
                where: {
                    [Op.or]: {
                        email: req.body.login,
                        username: req.body.login
                    }
                }
            });
            if (data.length > 0) {
                if (data[0].isSuspended === true) {
                    return res.status(401).send({
                        success: false,
                        message: "Account is suspended"
                    })
                }
                const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
                if (checkPassword) {
                    let token = createToken({
                        ...data
                    });
                    let data1 = userModel.update({
                        failedLogin: 0
                    }, {
                        where: {
                            id: data[0].id
                        }
                    })
                    res.status(200).send({
                        success: true,
                        message: "Login successful!",
                        result: data[0],
                        token
                    })
                } else {
                    const failedLoginCounted = data[0].failedLogin + 1
                    let data2 = await userModel.update({
                        failedLogin: failedLoginCounted
                    }, {
                        where: {
                            id: data[0].id
                        }
                    })
                    if (failedLoginCounted > 2) {
                        let data3 = await userModel.update({
                            isSuspended: true
                        }, {
                            where: {
                                id: data[0].id
                            }
                        })
                        return res.status(401).send({
                            success: false,
                            message: "Your account has been suspended"
                        })
                    }
                    return res.status(403).send({
                        success: false,
                        message: "Password or Username invalid"
                    })
                }
            } else {
                res.status(403).send({
                    success: false,
                    message: "Password or Username invalid"
                })
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send({
                success: false,
                error,
            })
        }
    },
    createAccount: async (req, res) => {
        try {
            const encryptedPassword = encryptPassword(req.body.password);
            const search = await userModel.findAll({
                where: {
                    [Op.or]: [{
                        email: req.body.email
                    }, {
                        username: req.body.username
                    }]
                }
            });
            if (search.length > 0) {
                return res.status(409).send({
                    success: false,
                    message: "email or username already exists!"
                })
            }
            const data = await userModel.create({
                email: req.body.email,
                username: req.body.username,
                fullname: req.body.fullname,
                password: encryptedPassword,
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                birthPlace: req.body.birthPlace,
                birthDate: req.body.birthDate,
                role: "employee"
            });
            return res.status(200).send({
                success: true,
                result: data,
                message: "Account has been registered"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                error
            })
        }
    },
    keepLogin: async (req, res) => {
        try {
            let data = await userModel.findAll({
                where: {
                    id: req.decrypt.id
                }
            })
            if (data.length > 0) {
                let token = createToken({
                    ...data
                });
                res.status(200).send({
                    success: true,
                    token,
                    result: data[0]
                })
            }
        } catch (error) {
            console.log(error);
            res.status(401).send({
                success: false,
                message: "Session ended"
            })
        }
    },
    getUserData: async (req, res) => {
        try {
            if (req.decrypt.role === "admin" || req.decrypt.role === "superadmin") {
                let data = await userModel.findAll({
                    where: {
                        role: "employee"
                    }
                })
                res.status(200).send({
                    success: true,
                    result: data
                })
            } else {
                res.status(401).send({
                    success: false,
                    message: "You are not authorized see the data"
                })
            }

        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                error
            })
        }
    },
    getAllUser: async (req, res) => {
        try {
            const data = await userModel.findAll();
            res.status(200).send({
                success: true,
                result: data,
                message: "successfully fetching data"
            })
        } catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Internal Server Error 500"
            })
        }
    }
}