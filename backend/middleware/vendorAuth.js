var jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const Misc = require('../controllers/Misc')

module.exports = async function (req, res, next) {
    try {
        var token = req.body.token || req.query.token || req.headers.token;

        if (token) {
            try {
                var user = await jwt.verify(token, 'shhhhh');
                if (user) {
                    req.user = user;
                    var vendor = await userModel.findOne({ _id: req.user.id, role: 'Vendor', status: 'Active' }, { password: 0 });
                    if (!(Misc.isnullorempty(vendor))) {
                        req.user.user = vendor;
                        next();
                    }
                    else {
                        res.status(200).json({
                            status: false,
                            msg: 'Access Denied.'
                        });
                    }

                } else {
                    res.status(200).json({
                        status: false,
                        expired: true,
                        msg: 'Failed to authenticate token.'
                    });
                }
            } catch (ex) {
                console.log(ex)
                res.status(200).json({
                    status: false,
                    expired: true,
                    msg: 'Token expired, need to login again.',
                    ex: ex
                });
            }

        } else {
            res.status(200).json({
                status: false,
                expired: true,
                msg: 'No token provided.'
            });
        }

    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            expired: true,
            msg: 'Something went wrong!!!',
            e: e
        });
    }
};


