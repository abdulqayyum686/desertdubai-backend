const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const saltRounds = 10
// remove c
module.exports.userLogin = async (req, res, next) => {
    const { email, password, isAdmin } = req.body
    console.log("Admin Login", email, password, isAdmin)
    User.findOne({ email, isAdmin: true })
        .exec()
        .then(async (adminFound) => {
            if (adminFound) {
                bcrypt.compare(password, adminFound.password, (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'password decryption error',
                        })
                    } else {
                        const loginToken = jwt.sign(
                            adminFound.toObject(),
                            "adminsecret",
                            {
                                expiresIn: '5d',
                            },
                        )
                        res.status(200).json({
                            message: 'Login Successfull',
                            token: loginToken,
                            user: adminFound,
                        })

                    }
                })
            } else {
                return res.status(404).json({
                    message: 'Sorry ! No Username Found',
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            })
        })
};

module.exports.userSignup = async (req, res, next) => {
    const { email, password, isAdmin } = req.body
    console.log('admin Signup', req.body)

    User.findOne({ email })
        .exec()
        .then(async (foundAdmin) => {

            if (foundAdmin) {
                return res.status(403).json({
                    message: 'Username  already exists',
                })
            } else {
                bcrypt.hash(password, saltRounds, async (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            message: 'password encryption error',
                        })
                    } else {
                        const newAdmin = new User({
                            email, password, isAdmin
                        })
                        console.log("newadmin", newAdmin)
                        newAdmin
                            .save()
                            .then(async (savedObj) => {
                                const token = jwt.sign(
                                    newAdmin.toObject(),
                                    "adminsecret",
                                    { expiresIn: '5d' },
                                )
                                res.status(201).json({
                                    message: 'User Register Successfully',
                                    user: savedObj,
                                    token: token,
                                })
                            })
                            .catch((err) => console.log('Err', err))
                    }
                })
            }
        })
        .catch((err) => {
            res.status(500).json({
                error: err,
            })
        })
};

