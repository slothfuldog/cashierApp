const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports = {
    encryptPassword : (password) => {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
    },
    createToken : (payload, expired = "24h") =>{
        let token = jwt.sign(payload, '@!cashierapp!@', {expiresIn: expired});
        return token
    },
    tokenVerify: (req, res ,next) => {
        jwt.verify(req.token, '@!cashierapp!@', (err, decrypt) => {
            if(err){
                return res.status(401).send({
                    success: false,
                    message: "Authenticate token failed!"
                })
            }

            req.decrypt = decrypt[0];
            next();
        })
    }
}