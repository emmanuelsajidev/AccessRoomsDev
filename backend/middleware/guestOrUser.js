var jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const tokenModel = require('../models/tokenModel');

const Misc = require('../controllers/Misc');

module.exports = async function (req, res, next) {
    try {
        var token = req.body.token || req.query.token || req.headers.token;

        if (token) {
            try {
                var user = await jwt.verify(token, 'shhhhh');
                if (user) {
                    req.user = user;
                    var tok = await tokenModel.findOne({name:req.user.id})
                    if(Misc.isnullorempty(tok)){
                        res.status(200).json({
                            status: false,
                            expired: true,
                            msg: 'Token expired, need to login again.',
                        });
                        return;
                    }
                    var admin = await userModel.findOne({ _id: req.user.id,status:"Active" }, { password: 0 });
                    if (!(Misc.isnullorempty(admin))) {
                        req.user.user = admin;
                        next();
                    }
                    else {
                        res.status(200).json({
                            status: false,
                            msg: 'Access Denied.'
                        });
                        return;
                    }

                } else {
                    res.status(200).json({
                        status: false,
                        expired: true,
                        msg: 'Failed to authenticate token.'
                    });
                    return;
                }
            } catch (ex) {
                console.log(ex)
                res.status(200).json({
                    status: false,
                    expired: true,
                    msg: 'Token expired, need to login again.',
                    ex: ex
                });
                return;
            }

        } else {
            var guestid = req.headers.guestid;
            if (guestid == null || guestid == undefined) {
                guestid = req.body.guestid;
            }
            if (guestid == null || guestid == undefined) {
                guestid = req.query.guestid;
            }
            if (guestid == null || guestid == undefined) {
                res.status(200).json({
                    status: false,
                    msg: 'guest id reqired'
                });
                return;
            }
            var guest = await userModel.findOne({_id:guestid,role:"Guest"})
            if(Misc.isnullorempty(guest)){
                res.status(200).json({
                    status: false,
                    msg: 'guest details not found'
                });
                return;
            }
            req.guestid = guestid;
            next();
        }
    } catch (e) {
        res.status(500).json({
            status: false,
            expired: true,
            msg: 'Something went wrong!!!',
        e: e
        });
        return;
    }
};