const express = require('express');
const router = express();
var jwt = require('jsonwebtoken');
const Misc = require('../controllers/Misc');
const bcrypt = require('bcryptjs');
const randomstring = require('randomstring');
const tokenModel = require('../models/tokenModel');
const ifToken = require('../middleware/ifToken');
const { json } = require('body-parser');
const EmailHelper = require("../controllers/Email");
const imageHelper = require('../controlize/imageHelperS3');
const upload = imageHelper.upload
const multer = require('multer');
const agentModel = require('../models/agentModel');
const userModel = require('../models/userModel');
const otpModel = require('../models/otpModel')
const adminAuth = require('../middleware/adminAuth');
// const dummyModel = require('../models/dummyModel');
const interactHelper = require('../controllers/interactHelper');


router.post('/agent/sendotp', ifToken, async (req, res) => {
    try {
        var { phoneNumber, email, name, countryCode } = req.body;
        if (Misc.isnullorempty(phoneNumber)) {
            res.status(200).json({
                status: true,
                msg: "Please Provide PhoneNumber"
            });
            return;
        }
        if (Misc.isnullorempty(email)) {
            res.status(200).json({
                status: true,
                msg: "Please Provide Email"
            });
            return;
        }
        if (Misc.isnullorempty(name)) {
            res.status(200).json({
                status: true,
                msg: "Please Provide Name"
            });
            return;
        }
        if (Misc.isnullorempty(name)) {
            name = 'User'
        }

        var checkuseremail = await userModel.findOne({ email: email, status: "Active" });
        console.log(checkuseremail)
        if (!Misc.isnullorempty(checkuseremail)) {
            res.status(200).json({
                status: false,
                msg: "Email Already Exist"
            });
            return;
        }
        var otp = await randomstring.generate({ length: 4, charset: 'numeric' });
        console.log(otp, "First Step Generate Otp")
        var error, alreadyExists;
        var user = await userModel.findOne({ status: "Active", _id: { $ne: req.user.id }, $or: [{ whatsappNumber: phoneNumber }, { phoneNumber: phoneNumber }], verificationStatus: "Verified", role: "Agent" });
        console.log(user)
        if (!Misc.isnullorempty(user)) {
            res.status(200).json({
                status: false,
                msg: "User Already Verified"
            });
            return;
        }
        //otp =1234;
        if (Misc.isnullorempty(user)) {

            try {
                var phoneOTP = await otpModel.findOne({ uid: req.user.id }).sort({ create_date: -1 });
                if (Misc.isnullorempty(phoneOTP)) {
                    //Create a new Otp data For This user
                    phoneOTP = new otpModel();
                    phoneOTP.uid = req.user.id;
                    phoneOTP.otp = otp;
                } else {
                    phoneOTP.otp = otp;
                }
                await phoneOTP.save();
            } catch (ex) {
                console.log(ex)
            }
            try {
                var content = await EmailHelper.readEmailTemplate("login", {
                    phoneNumber: phoneNumber,
                    otp: otp,
                });
                await EmailHelper.sendHtmlEmail(
                    email,
                    "Otp Verification Email",
                    content
                );
            } catch (e) {
                console.log(e, "Error while sending Email");
            }
        }
        var msgType = "verify"
        var data = [name, otp]
        const apiUrl = "https://api.interakt.ai/v1/public/message/";
        var mg = await interactHelper.sendWhatsAppOTP(msgType, phoneNumber, data, countryCode, apiUrl)
        res.status(200).json({
            status: true,
            alreadyExists: alreadyExists,
            msg: 'OTP send successfully',
            error: error
        });
        return;
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: 'Something went wrong!'
        })
    }
});
async function sendOtp(phoneNumber, email, uid, name, countrycode) {
    // Your existing logic for generating OTP and sending email
    var otp = await randomstring.generate({ length: 4, charset: "numeric" });
    try {
        // Your existing logic for saving OTP in the database
        var phoneOTP = await otpModel
            .findOne({ uid: uid })
            .sort({ create_date: -1 });
        if (Misc.isnullorempty(phoneOTP)) {
            phoneOTP = new otpModel();
            phoneOTP.uid = uid;
            phoneOTP.otp = otp;
        } else {
            phoneOTP.otp = otp;
        }
        await phoneOTP.save();
    } catch (ex) {
        console.log(ex);
    }
    if (email) {
        try {
            // Your existing logic for sending OTP via email
            var content = await EmailHelper.readEmailTemplate("login", {
                phoneNumber: phoneNumber,
                otp: otp,
            });
            await EmailHelper.sendHtmlEmail(email, "Otp Verification Email", content);
        } catch (e) {
            console.log(e, "Error while sending Email");
        }
    }
    var msgType = "verify";
    var data = [name, otp];
    const apiUrl = "https://api.interakt.ai/v1/public/message/";
    var mg = await interactHelper.sendWhatsAppOTP(
        msgType,
        phoneNumber,
        data,
        countrycode,
        apiUrl
    );
}
router.post('/forgott/password', async (req, res) => {
    try {
        var { email, phoneNumber } = req.body;
        if (Misc.isnullorempty(email) && Misc.isnullorempty(phoneNumber)) {
            res.status(200).json({
                status: false,
                msg: "Please provide either email or phoneNumber"
            });
            return;
        }
        if (email) {
            var d = await userModel.findOne({ email: email, status: "Active" })
            if (Misc.isnullorempty(d)) {
                res.status(200).json({
                    status: false,
                    msg: "Invalid Email."
                });
                return;
            }
        }
        if (phoneNumber) {
            var d = await userModel.findOne({ /* $or: [{ whatsappNumber: phoneNumber }, */ phoneNumber: phoneNumber, role: "Agent", status: "Active" });
            if (Misc.isnullorempty(d)) {
                res.status(200).json({
                    status: false,
                    msg: "Invalid PhoneNumber."
                });
                return;
            }
        }
        const otpResult = await sendOtp(d.phoneNumber, d.email, d._id, d.name, d.countryCode);

        res.status(200).json({
            status: true,
            msg: "Success",
        })
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }

})



//AGENT REGISTRATION CHECK
router.post("/agent/registration/start", async (req, res) => {
    try {
        var { phoneNumber, userType, countryCode } = req.body;
        if (Misc.isnullorempty(userType)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide userType",
            });
            return;
        }
        if (Misc.isnullorempty(phoneNumber)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide phoneNumber",
            });
            return;
        }
        if (Misc.isnullorempty(countryCode)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide Country Code",
            });
            return;
        }
        // var checkPhone = await userModel.findOne({
        //   phoneNumber: phoneNumber,
        //   status: "Active",
        // }).populate('vendorCategory');
        var checkexistingUser = await userModel
            .findOne({
                phoneNumber: phoneNumber,
                status: "Active",
            })
        /* .populate("vendorCategory"); */
        if (!Misc.isnullorempty(checkexistingUser)) {
            if (
                checkexistingUser.level == 0 &&
                checkexistingUser.verificationStatus == "Pending" && checkexistingUser.role == "Agent"
            ) {
                var token = jwt.sign(
                    {
                        id: checkexistingUser._id,
                        phoneNumber: checkexistingUser.phoneNumber,
                    },
                    "shhhhh"
                );
                var tokendata = new tokenModel({
                    name: checkexistingUser._id,
                    token: token,
                    role: checkexistingUser.role,
                });
                await tokendata.save();
                res.status(200).json({
                    status: true,
                    msg: "Registered Successfully.",
                    data: checkexistingUser,
                    token: tokendata.token,
                });
                return;
            } else {
                res.status(200).json({
                    status: false,
                    msg: "User Already Registered.",
                });
                return;
            }
        }
        //CREATE NEW ENTRY IN USERMODEL

        var d = new userModel({
            phoneNumber: phoneNumber,
            role: "Agent",
            countryCode: countryCode,
            userType: userType,
        });
        await d.save();
        if (
            !Misc.isnullorempty(phoneNumber) &&
            !Misc.isnullorempty(userType)
        ) {
            var token = jwt.sign({ id: d._id, phoneNumber: d.phoneNumber }, "shhhhh");
            var tokendata = new tokenModel({
                name: d._id,
                token: token,
                role: d.role,
            });
            await tokendata.save();
        }
        var dd = new agentModel({
            userid: d._id,
            //userType: userType,
        });
        await dd.save();

        d.agentId = dd._id;
        await d.save();

        var dddd = await userModel
            .findOne({ phoneNumber: phoneNumber, status: "Active" })
            .populate("agentId")
        // .populate("vendorId");
        res.status(200).json({
            status: true,
            msg: "Registered Successfully1.",
            data: dddd,
            token: tokendata.token,
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            msg: "Internal server error",
        });
    }
});

//REGISTRATION AGENT LEVEL-0
router.post('/agent/registration/level0', async (req, res) => {
    try {
        var { countryCode, phoneNumber, userType } = req.body;
        if (Misc.isnullorempty(userType)) {
            res.status(200).json({
                status: false,
                msg: "userType not provided."
            });
            return;
        }
        if (Misc.isnullorempty(phoneNumber)) {
            res.status(200).json({
                status: false,
                msg: "phoneNumber not provided."
            });
            return;
        }
        if (Misc.isnullorempty(countryCode)) {
            res.status(200).json({
                status: false,
                msg: "countryCode not provided."
            });
            return;
        }
        var d = await userModel.findOne({ phoneNumber: phoneNumber, /*role: "Agent", */ status: "Active"/*,level:{$gt:0} */ })/*.populate("agentId")*/
        if (!Misc.isnullorempty(d)) {
            if (d.level >= 1) {
                var token = jwt.sign({ id: d._id, phoneNumber: d.phoneNumber }, 'shhhhh');
                var tokendata = new tokenModel({
                    name: d._id,
                    token: token,
                    role: d.role
                })
                await tokendata.save()

                res.status(200).json({
                    status: false,
                    msg: "User already registered,please login to continue.",
                    data: d,
                    token: tokendata.token
                });
                return;
            }
            else {
                var d = new userModel({
                    phoneNumber: phoneNumber,
                    role: "Agent",
                    countryCode: countryCode,
                    userType: userType
                })
                await d.save()
                if (!Misc.isnullorempty(phoneNumber) && !Misc.isnullorempty(userType)) {
                    var token = jwt.sign({ id: d._id, phoneNumber: d.phoneNumber }, 'shhhhh');
                    var tokendata = new tokenModel({
                        name: d._id,
                        token: token,
                        role: d.role
                    })
                    await tokendata.save()
                }
                var dd = new agentModel({
                    userid: d._id,
                    agentRole: userType
                })
                await dd.save()

                d.agentId = dd._id
                await d.save()
                var dddd = await userModel.findOne({ phoneNumber: phoneNumber, role: "Agent", status: "Active" }).populate("agentId")
                res.status(200).json({
                    status: true,
                    msg: "sucess.",
                    data: dddd,
                    token: tokendata.token
                });
                return;
            }
        }
    }

    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})

//REGISTRATION AGENT LEVEL-1
router.post('/agent/registration/level1', ifToken, async (req, res) => {
    try {
        var { name, password, email, whatsappNumber, otp, countryCode } = req.body;
        console.log(req.headers)
        if (Misc.isnullorempty(name)) {
            res.status(200).json({
                status: false,
                msg: "name not provided."
            });
            return;
        }
        if (Misc.isnullorempty(countryCode)) {
            res.status(200).json({
                status: false,
                msg: "countryCode not provided."
            });
            return;
        }
        if (Misc.isnullorempty(email)) {
            res.status(200).json({
                status: false,
                msg: "email not provided."
            });
            return;
        }
        if (Misc.isnullorempty(whatsappNumber)) {
            res.status(200).json({
                status: false,
                msg: "whatsappNumber not provided."
            });
            return;
        }
        if (Misc.isnullorempty(password)) {
            res.status(200).json({
                status: false,
                msg: "password not provided."
            });
            return;
        }
        if (Misc.isnullorempty(otp)) {
            res.status(200).json({
                status: false,
                msg: "OTP should be provided"
            })
            return;
        }
        var full = await userModel.findOne({ _id: req.user.id, level: { $gte: 0 } }).populate("agentId")
        if (Misc.isnullorempty(full)) {
            res.status(200).json({
                status: false,
                msg: "User registration is not possible at the moment."
            });
            return;
        }
        var phoneOTP = await otpModel.findOne({ uid: req.user.id, otp: otp });
        if ((Misc.isnullorempty(phoneOTP))) {
            res.status(200).json({
                status: false,
                msg: "Invalid OTP"
            });
            return;
        }
        var encryptedPassword = await bcrypt.hash(password, 10);
        full.name = name
        full.whatsappNumber = whatsappNumber
        full.email = email
        full.whatsappCountryCode = countryCode
        full.password = encryptedPassword
        if (full.level < 1) {
            full.level = 1
        }
        await full.save()


        res.status(200).json({
            status: true,
            msg: "sucess.",
            data: full,
        });
        return;

    }

    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})

//REGISTRATION AGENT LEVEL-2
router.post('/agent/registration/level2', ifToken, async (req, res) => {
    try {
        var { iscompany, companyName, isGst, gstNo, locality, buildingNo, district, state, country, pincode, long, lat } = req.body;
        if (Misc.isnullorempty(iscompany)) {
            res.status(200).json({
                status: false,
                msg: "iscompany not provided."
            });
            return;
        }
        if (Misc.isnullorempty(companyName)) {
            res.status(200).json({
                status: false,
                msg: "companyName not provided."
            });
            return;
        }
        if (Misc.isnullorempty(isGst)) {
            res.status(200).json({
                status: false,
                msg: "isGst not provided."
            });
            return;
        }
        if (Misc.isnullorempty(locality)) {
            res.status(200).json({
                status: false,
                msg: "locality not provided."
            });
            return;
        }
        if (Misc.isnullorempty(buildingNo)) {
            res.status(200).json({
                status: false,
                msg: "buildingNo not provided."
            });
            return;
        }
        if (Misc.isnullorempty(district)) {
            res.status(200).json({
                status: false,
                msg: "district not provided."
            });
            return;
        }
        if (Misc.isnullorempty(state)) {
            res.status(200).json({
                status: false,
                msg: "state not provided."
            });
            return;
        }
        if (Misc.isnullorempty(country)) {
            res.status(200).json({
                status: false,
                msg: "country not provided."
            });
            return;
        }
        if (Misc.isnullorempty(pincode)) {
            res.status(200).json({
                status: false,
                msg: "pincode not provided."
            });
            return;
        }
        if (Misc.isnullorempty(long) || Misc.isnullorempty(lat)) {
            res.status(200).json({
                status: false,
                msg: "Lat or lon not provided."
            });
            return;
        }
        var full = await userModel.findOne({ _id: req.user.id, level: { $gt: 0 } }).populate("agentId")
        if (Misc.isnullorempty(full)) {
            res.status(200).json({
                status: true,
                msg: "This user is not allowed to continue this level registration."
            });
            return;
        }
        else {
            if (companyName) {
                full.companyName = companyName
                //await full.save()
            }

            if (iscompany) {
                full.iscompany = iscompany
                //await full.save()
            }

            if (isGst) {
                full.isGst = isGst
                //await full.save()
            }

            if (gstNo) {
                full.gstNo = gstNo
                // await full.save()
            }

            if (buildingNo) {
                full.buildingNo = buildingNo
                //  await full.save()
            }

            if (locality) {
                full.locality = locality
                // await full.save()
            }

            if (district) {
                full.district = district
                // await full.save()
            }

            if (state) {
                full.state = state
                //await full.save()
            }

            if (country) {
                full.country = country
                //await full.save()
            }

            if (pincode) {
                full.pincode = pincode
                //await full.save()
            }


            if (!Misc.isnullorempty(long) && !Misc.isnullorempty(lat)) {
                location = [long, lat]
                full.location = location
                //await full.save()
            }
            if (full.level < 2) {
                full.level = 2
            }
        }


        // var dd = new agentModel({
        //     userid: d._id
        // })
        // await dd.save()
        await full.save()
        res.status(200).json({
            status: true,
            msg: "sucess.",
            data: full
        });
        return;

    }

    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})

//REGISTRATION AGENT LEVEL-3
router.post('/agent/registration/level3', ifToken, upload.fields([{ name: 'agentIdProofFront', maxCount: 1 }, { name: 'agentIdProofBack', maxCount: 1 }, { name: 'agentGSTProof', maxCount: 1 }]), async (req, res) => {
    try {

        var check = await userModel.findOne({ _id: req.user.id, level: { $gt: 0 } }).populate("agentId")
        if (Misc.isnullorempty(check)) {
            res.status(200).json({
                status: false,
                msg: "This user is not allowed to continue this level registration."
            });
            return;
        }
        // if (!Misc.isnullorempty(req.files)) {
        //     if (Misc.isnullorempty(req.files.agentIdProofFront)) {
        //         res.status(200).json({
        //             status: false,
        //             msg: "Please provide agent Id proof."
        //         });
        //         return;
        //     }
        // }
        // else {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please upload all the required files."
        //     });
        //     return;
        // }
        // if (!Misc.isnullorempty(req.files)) {
        //     if (Misc.isnullorempty(req.files.agentIdProofBack)) {
        //         res.status(200).json({
        //             status: false,
        //             msg: "Please upload all the required files."
        //         });
        //         return;
        //     }
        // }
        // else {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please upload all the required files."
        //     });
        //     return;
        // }
        // if (!Misc.isnullorempty(req.files)) {
        //     if (Misc.isnullorempty(req.files.agentGSTProof)) {
        //         res.status(200).json({
        //             status: false,
        //             msg: "Please upload all the required files."
        //         });
        //         return;
        //     }
        // }
        // else {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please upload all the required files."
        //     });
        //     return;
        // }
        var data = await agentModel.findOne({ _id: check.agentId })
        if (Misc.isnullorempty(data)) {
            res.status(200).json({
                status: false,
                msg: "Agent not found."
            });
            return;
        }
        if (!Misc.isnullorempty(req.files)) {
            if (!Misc.isnullorempty(req.files.agentIdProofFront)) {
                if (req.files.agentIdProofFront.length > 0) {
                    isagentIdProofFront = true
                    data.agentIdProofFront = req.files.agentIdProofFront[0].key;
                    // await data.save()
                }
            }
        }
        if (!Misc.isnullorempty(req.files)) {
            if (!Misc.isnullorempty(req.files.agentIdProofBack)) {
                if (req.files.agentIdProofBack.length > 0) {
                    isagentIdProofBack = true
                    data.agentIdProofBack = req.files.agentIdProofBack[0].key;
                    // await data.save()
                }
            }
        }
        if (!Misc.isnullorempty(req.files)) {
            if (!Misc.isnullorempty(req.files.agentGSTProof)) {
                if (req.files.agentGSTProof.length > 0) {
                    isagentGSTProof = true
                    data.agentGSTProof = req.files.agentGSTProof[0].key;
                }
            }
        }
        await data.save()
        if (check.level < 3) {
            check.level = 3
        }
        var checkk = await userModel.findOne({ _id: req.user.id, level: { $gt: 0 } }).populate("agentId")
        await check.save();
        res.status(200).json({
            status: true,
            msg: 'file uploaded',
            data: checkk
        });

    } catch (e) {
        console.log(e);
        res.status(200).json({
            status: false,
            msg: "internal server error"
        });
    }
})

//REGISTRATION AGENT LEVEL-4
router.post('/agent/registration/level4', ifToken, async (req, res) => {
    try {
        var { agentid } = req.body
        var check = await userModel.findOne({ _id: req.user.id, level: { $gt: 0 } });
        if (Misc.isnullorempty(check)) {
            res.status(200).json({
                status: false,
                msg: "This user is not allowed to continue this level registration."
            });
            return;
        }
        else {

        }
        if (check.level < 4) {
            check.level = 4
        }
        await check.save();
        res.status(200).json({
            status: true,
            msg: 'Application submitted succesfully',
            data: check
        });

    } catch (e) {
        console.log(e);
        res.status(200).json({
            status: false,
            msg: "internal server error"
        });
    }
})

//CHANGE PASSWORD
router.post('/change/password', async (req, res) => {
    try {
        var { password, email, phoneNumber, userid } = req.body;
        if (Misc.isnullorempty(userid)) {
            res.status(200).json({
                status: false,
                msg: "userid is not provided"
            });
            return;
        }
        if (Misc.isnullorempty(phoneNumber)) {
            res.status(200).json({
                status: false,
                msg: "phoneNumber is not provided"
            });
            return;
        }
        var d = await userModel.findOne({ email: email, phoneNumber: phoneNumber })
        if (Misc.isnullorempty(d)) {
            res.status(200).json({
                status: false,
                msg: "Invalid credentials."
            });
            return;
        }
        if (Misc.isnullorempty(password)) {
            res.status(200).json({
                status: false,
                msg: "password not given."
            });
            return;
        }
        var encryptedPassword = await bcrypt.hash(password, 10);
        if (password != null || password != undefined) {
            d.password = encryptedPassword;
        }
        await d.save()
        res.status(200).json({
            status: true,
            msg: "PASSWORD CHANGED",
        })
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }

})

//AGENT LOGIN
router.post('/agent/login', async (req, res) => {
    try {
        var { phoneNumber, password } = req.body;
        // console.log(req.body)
        if (Misc.isnullorempty(phoneNumber)) {
            res.status(200).json({
                status: false,
                msg: "phoneNumber is not provided"
            });
            return;
        }
        if (Misc.isnullorempty(password)) {
            res.status(200).json({
                status: false,
                msg: "password is not provided"
            });
            return;
        }
        var d = await userModel.findOne({ phoneNumber: phoneNumber, /*registrationStatus: "Verified",*/ status: "Active", role: "Agent" })
        // console.log(d)
        if (Misc.isnullorempty(d)) {
            res.status(200).json({
                status: false,
                msg: "No user found!Please check your phonenumber."
            });
            return;
        }
        if (!Misc.isnullorempty(d)) {
            if (d.level == 0) {
              res.status(200).json({
                status: false,
                msg: "Agent at level 0 cannot log in.Please continue to register as agent",
              });
              return;
            }
          }
        if (d.password) {
            // var ss=await bcrypt(d.password)
            // console.log(ss)
            if (await bcrypt.compare(password, d.password)) {
                var token = jwt.sign({ id: d._id, phoneNumber: d.phoneNumber }, 'shhhhh');
                var tokendata = new tokenModel({
                    name: d._id,
                    token: token,
                    role: d.role
                })
                await tokendata.save()
                // console.log("responce send")
                res.status(200).json({
                    status: true,
                    msg: "sucess",
                    data: d,
                    token: token
                });
                return;
            }

            else {
                res.status(200).json({
                    status: false,
                    msg: "Wrong Password."
                });
                return;
            }
        }
        else {
            res.status(200).json({
                status: false,
                msg: "Password not found."
            });
            return;
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})

//pending list
router.get("/agent/pendingall", adminAuth, async (req, res) => {
    try {
        var { limit, page, keyword } = req.query;
        var pageNo = 0,
            dataLimit = 0;
        if (!Misc.isnullorempty(page) && !Misc.isnullorempty(limit)) {
            page = parseInt(page);
            limit = parseInt(limit);
            if (
                typeof page === "number" &&
                typeof limit === "number" &&
                page > 0 &&
                limit > 0
            ) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        var query = { verificationStatus: "Pending", role: "Agent", status: 'Active', level: { $gte: 1, $lte: 4 } };
        // var data = await userModel.find({ verificationStatus: "Pending", role: "Agent", status: 'Active',level: { $gte: 1 } }).populate("agentId").skip((pageNo - 1) * limit).limit(dataLimit);
        // var totalLength = await userModel.countDocuments({ verificationStatus: "Pending", role: "Agent", level: { $gte: 1 },status: 'Active' })
        if (keyword) {
            query = {
                $or: [{ name: { $regex: keyword, $options: "i" } }, { phoneNumber: { $regex: keyword, $options: "i" } }],
                verificationStatus: "Pending", role: "Agent", status: 'Active', level: { $gte: 1, $lte: 4 }
            }
        }
        var data = await userModel.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "agentId",
                    foreignField: "_id",
                    as: "agentId",
                },
            },
            {
                $unwind: { path: "$agentId", preserveNullAndEmptyArrays: true },
            },
            { $sort: { created_at: -1 } },
            { $skip: (pageNo - 1) * dataLimit },
            { $limit: dataLimit },
        ]);
        var totalLength = await userModel.countDocuments(query);

        res.status(200).json({
            status: true,
            data: data,
            page: pageNo,
            limit: dataLimit,
            totalLength: totalLength,
            msg: "Success"
        });

    } catch (e) {
        console.log(e);
        res.status(200).json({
            status: false,
            msg: "internal error",
        });
    }
});

//AGENT APPROVAL
router.post('/agent/approve', adminAuth, async (req, res) => {
    try {
        var { userid } = req.body;
        if (userid == null || userid == undefined) {
            res.status(200).json({
                status: false,
                msg: "Please provide the user Id to be approved."
            })
            return
        }
        var check = await userModel.findOne({ _id: userid, verificationStatus: "Pending", status: "Active" })
        if (Misc.isnullorempty(check)) {
            res.status(200).json({
                status: false,
                msg: "User not found"
            })
            return
        }
        if (check.level < 4) {
            res.status(200).json({
                status: false,
                msg: "Can't approve this vendor since level is less than 4.",
            })
            return;
        }
        check.verificationStatus = "Verified";
        check.verifiedBy = req.user.id;
        await check.save();
        res.status(200).json({
            status: true,
            msg: "User verified succesfully.",
            data: check
        });
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})

//approved list
router.get("/agent/approveall", adminAuth, async (req, res) => {
    try {
        var { limit, page, keyword } = req.query;
        var pageNo = 0,
            dataLimit = 0;
        if (!Misc.isnullorempty(page) && !Misc.isnullorempty(limit)) {
            page = parseInt(page);
            limit = parseInt(limit);
            if (
                typeof page === "number" &&
                typeof limit === "number" &&
                page > 0 &&
                limit > 0
            ) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        var query = { verificationStatus: "Verified", role: "Agent", status: 'Active', level: 4 };
        if (keyword) {
            query = {
                $or: [
                    { name: { $regex: keyword, $options: "i" } },
                    { companyName: { $regex: keyword, $options: "i" } },
                    { phoneNumber: { $regex: keyword, $options: "i" } },
                ],
                verificationStatus: "Verified",
                role: "Agent",
                status: "Active",
                level: 4
            };
        }
        // var data = await userModel.find({ verificationStatus: "Verified", role: "Agent", status: 'Active', level: 4 }).populate("agentId").skip((pageNo - 1) * limit).limit(dataLimit);
        // var totalLength = await userModel.countDocuments({ verificationStatus: "Verified", role: "Agent", status: 'Active', level: 4 })
        var data = await userModel.aggregate([
            { $match: query },
            {
                $lookup: {
                    from: "usermodels",
                    localField: "agentId",
                    foreignField: "_id",
                    as: "agentId",
                },
            },
            {
                $unwind: { path: "$agentId", preserveNullAndEmptyArrays: true },
            },
            { $sort: { created_at: -1 } },
            { $skip: (pageNo - 1) * dataLimit },
            { $limit: dataLimit },
        ]);
        var totalLength = await userModel.countDocuments(query);
        res.status(200).json({
            status: true,
            data: data,
            page: pageNo,
            limit: dataLimit,
            totalLength: totalLength,
            msg: "Success"
        });

    } catch (e) {
        console.log(e);
        res.status(200).json({
            status: false,
            msg: "internal error",
        });
    }
});
router.post('/agent/reject', adminAuth, async (req, res) => {
    try {
        var { userid } = req.body;
        if (userid == null || userid == undefined) {
            res.status(200).json({
                status: false,
                msg: "Please provide the user Id to be approved."
            })
            return
        }
        var check = await userModel.findOne({ _id: userid, verificationStatus: "Pending", status: "Active" })
        if (Misc.isnullorempty(check)) {
            res.status(200).json({
                status: false,
                msg: "User not found"
            })
            return
        }
        else {
            // check.verificationStatus = "Rejected";
            check.status = "Rejected";
            check.verifiedBy = req.user.id
            await check.save()
        }
        res.status(200).json({
            status: true,
            msg: "User verified succesfully.",
            data: check
        });
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})
router.post('/agent/delete', adminAuth, async (req, res) => {
    try {
        var { userId } = req.body;
        if (userId == null || userId == undefined) {
            res.status(200).json({
                status: false,
                msg: "Please provide the user Id to be approved."
            })
            return
        }
        var check = await userModel.findOne({ _id: userId, verificationStatus: { $in: ["Verified", "Pending"] }, status: "Active" })
        if (Misc.isnullorempty(check)) {
            res.status(200).json({
                status: false,
                msg: "User not found"
            })
            return
        }
        else {
            check.status = "Deleted";
            check.verifiedBy = req.user.id
            await check.save()
        }
        res.status(200).json({
            status: true,
            msg: "User deleted succesfully.",
            data: check
        });
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})
router.post('/agent/block', adminAuth, async (req, res) => {
    try {
        var { userId } = req.body;
        if (userId == null || userId == undefined) {
            res.status(200).json({
                status: false,
                msg: "Please provide the user Id to be approved."
            })
            return
        }
        var check = await userModel.findOne({ _id: userId, /*verificationStatus: "Pending",*/ status: "Active" })
        if (Misc.isnullorempty(check)) {
            res.status(200).json({
                status: false,
                msg: "User not found"
            })
            return
        }
        else {
            check.verificationStatus = "Blocked";
            check.verifiedBy = req.user.id
            await check.save()
        }
        res.status(200).json({
            status: true,
            msg: "User blocked succesfully.",
            data: check
        });
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})

router.post('/agent/unblock', adminAuth, async (req, res) => {
    try {
        var { userId } = req.body;
        if (userId == null || userId == undefined) {
            res.status(200).json({
                status: false,
                msg: "Please provide the user Id to be approved."
            })
            return
        }
        var check = await userModel.findOne({ _id: userId, /*verificationStatus: "Pending",*/ status: "Active" })
        if (Misc.isnullorempty(check)) {
            res.status(200).json({
                status: false,
                msg: "User not found"
            })
            return
        }
        else {
            check.verificationStatus = "Verified";
            check.verifiedBy = req.user.id
            await check.save()
        }
        res.status(200).json({
            status: true,
            msg: "User unblocked succesfully.",
            data: check
        });
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})
router.get("/agent/blocked/list", adminAuth, async (req, res) => {
    try {
        var { limit, page, keyword } = req.query;
        var pageNo = 0,
            dataLimit = 0;
        if (!Misc.isnullorempty(page) && !Misc.isnullorempty(limit)) {
            page = parseInt(page);
            limit = parseInt(limit);
            if (
                typeof page === "number" &&
                typeof limit === "number" &&
                page > 0 &&
                limit > 0
            ) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        var data = await userModel.find({ verificationStatus: "Blocked", role: "Agent", status: 'Active', level: 4 }).populate("agentId").skip((pageNo - 1) * limit).limit(dataLimit);
        var totalLength = await userModel.countDocuments({ verificationStatus: "Blocked", role: "Agent", status: 'Active', level: 4 })
        res.status(200).json({
            status: true,
            data: data,
            page: pageNo,
            limit: dataLimit,
            totalLength: totalLength,
            msg: "Success"
        });

    } catch (e) {
        console.log(e);
        res.status(200).json({
            status: false,
            msg: "internal error",
        });
    }
});
//VERIFY
router.get('/token/authenticate', ifToken, async (req, res) => {
    try {
        var data = await userModel.findOne({ _id: req.user.id, status: "Active" })
        res.status(200).json({
            status: true,
            msg: "User Authenticated Successfully",
            data: data
        });
        return;
    } catch (e) {
        res.status(200).json({
            status: false,
            msg: 'Something went wrong'
        });
        return;
    }
});

//PROFILE DATA
router.get('/profile', ifToken, async (req, res) => {
    try {
        var data = await userModel.findOne({ _id: req.user.id, status: "Active",/* role: "Agent"*/ }).populate("agentId");
        res.status(200).json({
            status: true,
            msg: "User profile",
            data: data
        });
        return;
    } catch (e) {
        res.status(200).json({
            status: false,
            msg: 'Error'
        });
        return;
    }
});

//LOGOUT
router.get('/logout/', ifToken, async (req, res) => {
    try {
        var id = req.user.id
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "id not provided"
            });
            return;
        }
        var data = await tokenModel.findOneAndRemove({})
        // console.log(data)
        res.status(200).json({
            status: true,
            msg: "logout sucess"
        });
        return;

    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})

router.get("/agent/info", adminAuth, async (req, res) => {
    try {
        var id = req.query.id;
        var d = await userModel.findById(id, { password: 0 }).populate("agentId");
        if (d === undefined || d === null) {
            res.status(200).json({
                status: false,
                msg: "user not found",
            });
            return;
        }
        res.status(200).json({
            status: true,
            msg: "done",
            data: d,
        });
    } catch (e) {
        console.log(e);
        res.status(200).json({
            status: false,
            msg: "internal error",
        });
    }
});


//////////////////////////////////////////
// //AGENT EDIT
router.post('/agent/edit', adminAuth, upload.fields([{ name: 'agentIdProofFront', maxCount: 1 }, { name: 'agentIdProofBack', maxCount: 1 }, { name: 'profileImage', maxCount: 1 }, { name: 'agentGSTProof', maxCount: 1 }]), async (req, res) => {
    try {
        var { id, name, iscompany, companyName, isGst, gstNo, address, buildingNo, locality, district, state, country, pincode, userType, location, lat, long, } = req.body;
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "id not provided"
            });
            return;
        }
        var d = await userModel.findOne({ _id: id, level: 4, status: "Active" })
        if (Misc.isnullorempty(d)) {
            res.status(200).json({
                status: false,
                msg: "Edit Unavailable for this user."
            });
            return;
        }
        var agent = await agentModel.findOne({ userid: d._id });
        if (name) {
            d.name = name;
        }
        if (iscompany) {
            d.iscompany = iscompany;
        }
        if (companyName) {
            d.companyName = companyName;
        }
        if (gstNo) {
            d.gstNo = gstNo;
            d.isGst = "Yes";
        }
        if (address) {
            d.address = address;
        }
        if (buildingNo) {
            d.buildingNo = buildingNo;
        }
        if (locality) {
            d.locality = locality;
        }
        if (district) {
            d.district = district;
        }
        if (state) {
            d.state = state;
        }
        if (country) {
            d.country = country;
        }
        if (pincode) {
            d.pincode = pincode;
        }
        if (userType) {
            d.userType = userType;
        }
        if (req.files.profileImage) {
            if (req.files.profileImage.length > 0) {
                isprofileImage = true
                d.profileImage = req.files.profileImage[0].key;
                await d.save()
            }
        }

        if (req.files.agentIdProofFront) {
            if (req.files.agentIdProofFront.length > 0) {
                isagentIdProofFront = true
                agent.agentIdProofFront = req.files.agentIdProofFront[0].key;
                await agent.save()
            }
        }


        if (req.files.agentIdProofBack) {
            if (req.files.agentIdProofBack.length > 0) {
                isagentIdProofBack = true
                agent.agentIdProofBack = req.files.agentIdProofBack[0].key;
                await agent.save()
            }
        }

        if (req.files.agentGSTProof) {
            if (req.files.agentGSTProof.length > 0) {
                isagentGSTProof = true
                agent.agentGSTProof = req.files.agentGSTProof[0].key;
                await agent.save()
            }
        }

        await d.save();

        res.status(200).json({
            status: true,
            msg: "Updated Successfully",
        })
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }

})

router.post('/agent/profile/edit', ifToken, upload.fields([{ name: 'agentIdProofFront', maxCount: 1 }, { name: 'agentIdProofBack', maxCount: 1 }, { name: 'agentGSTProof', maxCount: 1 }, { name: 'profileImage', maxCount: 1 }]), async (req, res) => {
    try {
        var { id, name, iscompany, companyName, isGst, gstNo, address, buildingNo, locality, district, state, country, pincode, userType, location, lat, long, } = req.body;
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "id not provided"
            });
            return;
        }
        var d = await userModel.findOne({ _id: id, level: 4, status: "Active" })
        if (Misc.isnullorempty(d)) {
            res.status(200).json({
                status: false,
                msg: "Edit Unavailable for this user."
            });
            return;
        }
        var agent = await agentModel.findOne({ userid: d._id });
        if (name) {
            d.name = name;
        }
        if (iscompany) {
            d.iscompany = iscompany;
        }
        if (companyName) {
            d.companyName = companyName;
        }
        if (isGst) {
            d.isGst = isGst;
        }
        if (gstNo) {
            d.gstNo = gstNo;
        }
        if (address) {
            d.address = address;
        }
        if (buildingNo) {
            d.buildingNo = buildingNo;
        }
        if (locality) {
            d.locality = locality;
        }
        if (district) {
            d.district = district;
        }
        if (state) {
            d.state = state;
        }
        if (country) {
            d.country = country;
        }
        if (pincode) {
            d.pincode = pincode;
        }
        // if (userType) {
        //     d.userType = userType;
        // }

        if (req.files.profileImage) {
            if (req.files.profileImage.length > 0) {
                isprofileImage = true
                d.profileImage = req.files.profileImage[0].key;
                await d.save()
            }
        }
        if (req.files.agentIdProofFront) {
            if (req.files.agentIdProofFront.length > 0) {
                isagentIdProofFront = true
                agent.agentIdProofFront = req.files.agentIdProofFront[0].key;
                await agent.save()
            }
        }

        if (req.files.agentIdProofBack) {
            if (req.files.agentIdProofBack.length > 0) {
                isagentIdProofBack = true
                agent.agentIdProofBack = req.files.agentIdProofBack[0].key;
                await agent.save()
            }
        }

        if (req.files.agentGSTProof) {
            if (req.files.agentGSTProof.length > 0) {
                isagentGSTProof = true
                agent.agentGSTProof = req.files.agentGSTProof[0].key;
                await agent.save()
            }
        }

        await d.save();

        res.status(200).json({
            status: true,
            msg: "Agent details edited succesfully.",
        })
        return;
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }

})




module.exports = router;
