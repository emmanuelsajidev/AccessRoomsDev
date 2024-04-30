const express = require("express");
const router = express();
var jwt = require("jsonwebtoken");
const Misc = require("../controllers/Misc");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const tokenModel = require("../models/tokenModel");
const ifToken = require("../middleware/ifToken");
const userModel = require("../models/userModel");
const { json } = require("body-parser");
const imageHelper = require("../controlize/imageHelperS3");
const vendorModel = require("../models/vendorModel");
const upload = imageHelper.upload;
const multer = require("multer");
const vendorCategoryModel = require("../models/vendorCategoryModel");
const adminAuth = require("../middleware/adminAuth");
const vendorAuth = require("../middleware/vendorAuth");
const EmailHelper = require("../controllers/Email");
const otpModel = require("../models/otpModel");
const houseboatBookingModel=require("../models/houseboatBookingModel");
const shikaraBookingModel=require("../models/shikaraBookingModel");
const shikaraModel=require("../models/shikaraModel");
const houseBoatModel=require("../models/houseBoatModel");
const houseboatBookingItemModel = require("../models/houseboatBookingItemModel");
const moment = require('moment');
const ExcelJS = require('exceljs');


router.post("/vendor/category/add", async (req, res) => {
  try {
    var { categoryType } = req.body;
    if (Misc.isnullorempty(categoryType)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Category Name",
      });
      return;
    }

    var catrgy = await vendorCategoryModel.findOne({
      categoryType: categoryType,
      status: "Active",
    });
    if (!Misc.isnullorempty(catrgy)) {
      res.status(200).json({
        status: false,
        msg: " category name already there",
      });
      return;
    }
    var category = new vendorCategoryModel();
    category.categoryType = categoryType;
    await category.save();
    res.status(200).json({
      status: true,
      msg: "Category Details Added Successfully",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});

router.get("/vendor/category/getlist", async (req, res) => {
  try {
    var { count, page } = req.query;
    var query = { status: "Active" };
    if (Misc.isnullorempty(count)) count = 50;
    if (Misc.isnullorempty(page)) page = 1;
    var lm = parseInt(count);
    var pg = parseInt(page) * lm - lm;
    var data = [];
    var tot = await vendorCategoryModel.countDocuments({ status: "Active" });
    var totcount = tot;

    if (lm > 0) totcount = totcount / lm;
    totcount = Math.ceil(totcount);
    if (count == 0 && page == 0)
      data = await vendorCategoryModel.find(query).sort("-create_date");
    else
      data = await vendorCategoryModel
        .find(query)
        .skip(pg)
        .limit(lm)
        .sort("-create_date");

    res.status(200).json({
      status: true,
      data: data,
      pages: totcount,
      count: tot,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});

///////////////////////////////////////////////////

router.post("/vendor/registration/level0", async (req, res) => {
  try {
    var { phoneNumber, vendorCategory, countryCode } = req.body;

    if (!Array.isArray(vendorCategory) || vendorCategory.length === 0) {
      res.status(200).json({
        status: false,
        msg: "Vendor Category must be a non-empty array",
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
      .findOne({ phoneNumber: phoneNumber ,
        status: "Active",
      })
      .populate("vendorCategory");
    if (!Misc.isnullorempty(checkexistingUser)) {
      // if (
      //   checkexistingUser.level == 0 &&
      //   checkexistingUser.verificationStatus == "Pending" && checkexistingUser.role=="Vendor"
      // )
      if (
        checkexistingUser.level == 0 &&
        checkexistingUser.verificationStatus == "Pending" 
      )
       {
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
          msg: "User Already Registered As " + checkexistingUser.role,
        });
        return;
      }
    }
    //CREATE NEW ENTRY IN USERMODEL

    var d = new userModel({
      phoneNumber: phoneNumber,
      role: "Vendor",
      countryCode: countryCode,
      vendorCategory: vendorCategory,
    });
    await d.save();
    if (
      !Misc.isnullorempty(phoneNumber) &&
      !Misc.isnullorempty(vendorCategory)
    ) {
      var token = jwt.sign({ id: d._id, phoneNumber: d.phoneNumber }, "shhhhh");
      var tokendata = new tokenModel({
        name: d._id,
        token: token,
        role: d.role,
      });
      await tokendata.save();
    }
    var dd = new vendorModel({
      userid: d._id,
      vendorCategory: vendorCategory,
    });
    await dd.save();

    d.vendorId = dd._id;
    await d.save();

    var dddd = await userModel
      .findOne({ phoneNumber: phoneNumber,status: "Active" })
      .populate("vendorCategory")
      .populate("vendorId");
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

router.post("/vendor/registration/level1", ifToken, async (req, res) => {
  try {
    var { name, password, email, whatsappNumber, vendorCategory, otp,whatsappCountryCode } =
      req.body;
    if (!Array.isArray(vendorCategory) || vendorCategory.length === 0) {
      res.status(200).json({
        status: false,
        msg: "Vendor Category must be a non-empty array",
      });
      return;
    }
    if (Misc.isnullorempty(name)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Name",
      });
      return;
    }
    if (Misc.isnullorempty(password)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Password",
      });
      return;
    }
    if (Misc.isnullorempty(email)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide email",
      });
      return;
    }
    if (Misc.isnullorempty(whatsappNumber)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide whatsappNumber",
      });
      return;
    }
    if (Misc.isnullorempty(otp)) {
      res.status(200).json({
        status: false,
        msg: "OTP should be provided",
      });
      return;
    }
    var checkuser = await userModel
      .findOne({ _id: req.user.id, status: "Active" })
      .populate("vendorId");
    if (Misc.isnullorempty(checkuser)) {
      res.status(200).json({
        status: false,
        msg: "User Not Found",
        // msg: "This user is not allowed to continue this level registration."
      });
      return;
    }
    var checkuseremail = await userModel.findOne({
      email: email,
      status: "Active",
    });
    if (!Misc.isnullorempty(checkuseremail)) {
      res.status(200).json({
        status: false,
        msg: "Email Already Exist",
      });
      return;
    }
    var phoneOTP = await otpModel.findOne({ uid: checkuser._id, otp: otp });
    if (Misc.isnullorempty(phoneOTP)) {
      res.status(200).json({
        status: false,
        msg: "Invalid OTP",
      });
      return;
    }
    var encryptedPassword = await bcrypt.hash(password, 10);
    checkuser.name = name;
    checkuser.password = encryptedPassword;
    checkuser.email = email;
    checkuser.whatsappNumber = whatsappNumber;
    checkuser.vendorCategory = vendorCategory;
    checkuser.whatsappCountryCode=whatsappCountryCode;
    await checkuser.save();
    //is_phone_verified=true;
    if (checkuser.level < 1) {
      checkuser.level = 1;
    }
    await checkuser.save();
    checkuser.isPassword = true;
    checkuser.is_phone_verified = true;
    await checkuser.save();

    var checkvendor = await vendorModel.findOne({
      userid: checkuser._id,
      status: "Active",
    });
    checkvendor.whatsappNumber = whatsappNumber;
    checkvendor.whatsappCountryCode=whatsappCountryCode;
    checkvendor.vendorCategory=vendorCategory;
    await checkvendor.save();
    res.status(200).json({
      status: true,
      msg: "Level1 Registered Successfully.",
      data: checkuser,
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

router.post("/vendor/registration/level2", ifToken, async (req, res) => {
  try {
    var {
      companyName,
      isGst,
      gstNo,
      locality,
      district,
      state,
      country,
      pincode,
      location,
      socialMediaLink,
      expiryDate,
      link,
    } = req.body;

    if (Misc.isnullorempty(companyName)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Name",
      });
      return;
    }
    if (Misc.isnullorempty(isGst)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide GST",
      });
      return;
    }
    if (isGst == true) {
      if (Misc.isnullorempty(gstNo)) {
        res.status(200).json({
          status: false,
          msg: "Please Provide Gst Number",
        });
        return;
      }
    }
    if (Misc.isnullorempty(locality)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide locality",
      });
      return;
    }
    if (Misc.isnullorempty(district)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide district",
      });
      return;
    }
    // if (Misc.isnullorempty(location)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide location",
    //   });
    //   return;
    // }
    // if (Misc.isnullorempty(expiryDate)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide Expiry Date",
    //   });
    //   return;
    // }
    var checkuser = await userModel
      .findOne({ _id: req.user.id /*level: { $gt: 0 }*/ })
      .populate("vendorId");
    if (Misc.isnullorempty(checkuser)) {
      res.status(200).json({
        status: true,
        msg: "User Not Found",
        // msg: "This user is not allowed to continue this level registration."
      });
      return;
    }

    // var checkvendordata = await vendorModel.findOne({
    //   _id: checkuser.vendorId,status:"Active"
    // });
    // if (Misc.isnullorempty(checkvendordata)) {
    //   res.status(200).json({
    //     status: true,
    //     msg: "Data Not Found",
    //   });
    //   return;
    // }
    else {
      if (companyName) {
        checkuser.companyName = companyName;
      }
      if (isGst) {
        checkuser.isGst = isGst;
      }
      if (gstNo) {
        checkuser.gstNo = gstNo;
      }
      if (locality) {
        checkuser.locality = locality;
      }
      if (district) {
        checkuser.district = district;
      }
      if (state) {
        checkuser.state = state;
      }
      if (country) {
        checkuser.country = country;
      }
      if (pincode) {
        checkuser.pincode = pincode;
      }
      if (location) {
        checkuser.location = location;
      }
      if (link) {
        checkuser.link = link;
      }
      if (checkuser.level < 2) {
        checkuser.level = 2;
      }
    }

    //  checkuser.level = 2;
    await checkuser.save();

    // checkvendordata.expiryDate = expiryDate;
    // checkvendordata.socialMediaLink = socialMediaLink;
    // await checkvendordata.save();

    res.status(200).json({
      status: true,
      msg: "Level2 Registered Successfully.",
      data: checkuser,
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
router.post(
  "/vendor/proofupload/level2",
  ifToken,
  upload.fields([
    { name: "voteridProof", maxCount: 1 },
    { name: "licenseProof", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      var check = await userModel
        .findOne({ _id: req.user.id, /* level: { $gt: 0 }*/ status: "Active" })
        .populate("vendorId");
      if (Misc.isnullorempty(check)) {
        res.status(200).json({
          status: false,
          msg: "This user is not allowed to continue this level registration.",
        });
        return;
      }

      var data = await vendorModel.findOne({
        _id: check.vendorId,
        status: "Active",
      });
      if (Misc.isnullorempty(data)) {
        res.status(200).json({
          status: false,
          msg: "vendor not found.",
        });
        return;
      }
      if (!Misc.isnullorempty(req.files)) {
        if (!Misc.isnullorempty(req.files.voteridProof)) {
          if (req.files.voteridProof.length > 0) {
            isvoteridProof = true;
            data.voteridProof = req.files.voteridProof[0].key;
          }
        }
      }
      if (!Misc.isnullorempty(req.files)) {
        if (!Misc.isnullorempty(req.files.licenseProof)) {
          if (req.files.licenseProof.length > 0) {
            islicenseProof = true;
            data.licenseProof = req.files.licenseProof[0].key;
          }
        }
      }
      await data.save();
      // if (check.level < 3) {
      //     check.level = 3
      // }
      var checkk = await userModel
        .findOne({ _id: req.user.id /*level: { $gt: 0 }*/ })
        .populate("vendorId");
      await check.save();
      res.status(200).json({
        status: true,
        msg: "file uploaded",
        data: checkk,
        voterid: data.voteridProof,
        license: data.licenseProof,
      });
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: false,
        msg: "internal server error",
      });
    }
  }
);
router.post("/vendor/registration/level3", ifToken, async (req, res) => {
  try {
    var { bankDetails } = req.body;

    var checkuser = await userModel
      .findOne({ _id: req.user.id, /*level: { $gt: 0 }*/ status: "Active" })
      .populate("vendorId");
    if (Misc.isnullorempty(checkuser)) {
      res.status(200).json({
        status: true,
        msg: "User Not Found",
        //msg: "This user is not allowed to continue this level registration."
      });
      return;
    }

    var checkvendordata = await vendorModel
      .findOne({ _id: checkuser.vendorId, status: "Active" })
      .populate("userid");
    if (Misc.isnullorempty(checkvendordata)) {
      res.status(200).json({
        status: true,
        msg: "Data Not Found",
      });
      return;
    }
    if (!Misc.isnullorempty(bankDetails.bankName)) {
      checkvendordata.bankDetails.bankName = bankDetails.bankName;
    }
    if (!Misc.isnullorempty(bankDetails.accHolderName)) {
      checkvendordata.bankDetails.accHolderName = bankDetails.accHolderName;
    }
    if (!Misc.isnullorempty(bankDetails.accNo)) {
      checkvendordata.bankDetails.accNo = bankDetails.accNo;
    }
    if (!Misc.isnullorempty(bankDetails.accType)) {
      checkvendordata.bankDetails.accType = bankDetails.accType;
    }
    if (!Misc.isnullorempty(bankDetails.ifscCode)) {
      checkvendordata.bankDetails.ifscCode = bankDetails.ifscCode;
    }

    if (!Misc.isnullorempty(bankDetails.branchName)) {
      checkvendordata.bankDetails.branchName = bankDetails.branchName;
    }
    if (!Misc.isnullorempty(bankDetails.upiId)) {
      checkvendordata.bankDetails.upiId = bankDetails.upiId;
    }

    await checkvendordata.save();

    if (checkuser.level < 3) {
      checkuser.level = 3;
    }
    await checkuser.save();

    res.status(200).json({
      status: true,
      msg: "Level3 Registered Successfully.",
      data: checkuser,
      checkvendordata: checkvendordata,
      qrCode: checkvendordata.bankDetails.qrCode,
      passbook: checkvendordata.bankDetails.passBook,
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

router.post("/vendor/registration/level4", ifToken, async (req, res) => {
  try {
    var checkuser = await userModel.findOne({
      _id: req.user.id,
      /*level: {$gt:0},*/ status: "Active",
    });
    if (Misc.isnullorempty(checkuser)) {
      res.status(200).json({
        status: false,
        msg: "User Not Found",
        // msg: "This user is not allowed to continue this level registration."
      });
      return;
    }
    if (checkuser.level < 4) {
      checkuser.level = 4;
    }
    await checkuser.save();
    res.status(200).json({
      status: true,
      msg: "Application submitted succesfully",
      data: checkuser,
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal server error",
    });
  }
});
router.post("/validate/token", ifToken, async (req, res) => {
  res.status(200).json({
    status: true,
    msg: "OK",
  });
});

router.get("/vendor/profile", ifToken, async (req, res) => {
  try {
    var data = await userModel
      .findOne({ _id: req.user.id, status: "Active" })
      .populate("vendorId")
      .populate({
        path: "vendorCategory",
        options: { sort: { created_at: 1 } } // Sort in ascending order, use -1 for descending
      })
    var vendordata = await vendorModel.findOne({
      userid: data._id,
      status: "Active",
    });
    res.status(200).json({
      status: true,
      msg: "User profile",
      data: data,
      vendordata: vendordata,
    });
    return;
  } catch (e) {
    res.status(200).json({
      status: false,
      msg: "Error",
    });
    return;
  }
});

router.post(
  "/vendor/proofupload/level3",
  ifToken,
  upload.fields([
    { name: "qrCode", maxCount: 1 },
    { name: "passBook", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      var check = await userModel
        .findOne({ _id: req.user.id, /* level: { $gt: 0 }*/ status: "Active" })
        .populate("vendorId");
      if (Misc.isnullorempty(check)) {
        res.status(200).json({
          status: false,
          msg: "This user is not allowed to continue this level registration.",
        });
        return;
      }

      var data = await vendorModel.findOne({
        _id: check.vendorId,
        status: "Active",
      });
      if (Misc.isnullorempty(data)) {
        res.status(200).json({
          status: false,
          msg: "vendor not found.",
        });
        return;
      }
      if (!Misc.isnullorempty(req.files)) {
        if (!Misc.isnullorempty(req.files.qrCode)) {
          if (req.files.qrCode.length > 0) {
            isqrCode = true;
            data.bankDetails.qrCode = req.files.qrCode[0].key;
          }
        }
      }
      if (!Misc.isnullorempty(req.files)) {
        if (!Misc.isnullorempty(req.files.passBook)) {
          if (req.files.passBook.length > 0) {
            ispassBook = true;
            data.bankDetails.passBook = req.files.passBook[0].key;
          }
        }
      }
      await data.save();
      // if (check.level < 3) {
      //     check.level = 3
      // }
      var checkk = await userModel
        .findOne({ _id: req.user.id /*level: { $gt: 0 }*/ })
        .populate("vendorId");
      await check.save();
      res.status(200).json({
        status: true,
        msg: "file uploaded",
        data: checkk,
      });
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: false,
        msg: "internal server error",
      });
    }
  }
);

//for admin
router.get("/vendor/info", adminAuth, async (req, res) => {
  try {
    var id = req.query.id;
    var d = await userModel
      .findById(id, { password: 0 })
      .populate("vendorCategory")
      .populate("vendorId");
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

router.get("/vendor/pendingall", adminAuth, async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query={verificationStatus: "Pending",role: "Vendor", status: "Active", level: { $gte: 1, $lte: 4 }}
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
    // var data = await userModel
    //   .find({
    //     verificationStatus: "Pending",
    //     role: "Vendor",
    //     status: "Active",
    //     level: 4,
    //   })
    //   .populate("vendorId")
    //   .sort({ created_at: -1 })
    //   .skip((pageNo - 1) * limit)
    //   .limit(dataLimit);
    if(keyword){
      query = { $or: [ { name: { $regex: keyword, $options: "i" } }, { phoneNumber: { $regex: keyword, $options: "i" } } ] ,
      verificationStatus: "Pending",role: "Vendor", status: "Active", level: { $gte: 1, $lte: 4 }
    }
  }
    var data = await userModel.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "usermodels",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendorId",
        },
      },
      {
        $unwind: { path: "$vendorId", preserveNullAndEmptyArrays: true },
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
      msg: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});
router.post("/vendor/approve", adminAuth, async (req, res) => {
  try {
    var { userid } = req.body;
    if (userid == null || userid == undefined) {
      res.status(200).json({
        status: false,
        msg: "Please provide the user Id to be approved.",
      });
      return;
    }
    var check = await userModel.findOne({
      _id: userid,
      verificationStatus: "Pending",
      status: "Active",
    });
    if (Misc.isnullorempty(check)) {
      res.status(200).json({
        status: false,
        msg: "User not found",
      });
      return;
    }
   //  else {
    //   check.verificationStatus = "Verified";
    //   check.verifiedBy = req.user.id;
    //   await check.save();
    // }
    if(check.level<4){
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
      data: check,
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

router.post("/vendor/reject", adminAuth, async (req, res) => {
  try {
    var { userid } = req.body;
    if (userid == null || userid == undefined) {
      res.status(200).json({
        status: false,
        msg: "Please provide the user Id to be approved.",
      });
      return;
    }
    var check = await userModel.findOne({
      _id: userid,
      verificationStatus: "Pending",
      status: "Active",
    });
    if (Misc.isnullorempty(check)) {
      res.status(200).json({
        status: false,
        msg: "User not found",
      });
      return;
    } else {
    //  check.verificationStatus = "Rejected";
      check.status = "Rejected";
      check.verifiedBy = req.user.id;
      check.level=2;
      await check.save();
    }
    res.status(200).json({
      status: true,
      msg: "User rejected succesfully.",
      data: check,
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
router.post("/vendor/delete", adminAuth, async (req, res) => {
  try {
    var { userId } = req.body;
    if (userId == null || userId == undefined) {
      res.status(200).json({
        status: false,
        msg: "Please provide the user Id to be approved.",
      });
      return;
    }
    var check = await userModel.findOne({
      _id: userId,
      verificationStatus: { $in: ["Verified", "Pending"] },
      status: "Active",
    });
    if (Misc.isnullorempty(check)) {
      res.status(200).json({
        status: false,
        msg: "User not found",
      });
      return;
    } else {
      check.status = "Deleted";
      check.verifiedBy = req.user.id;
      await check.save();
    }
    res.status(200).json({
      status: true,
      msg: "User deleted succesfully.",
      data: check,
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
router.get("/vendor/approveall", adminAuth, async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query={verificationStatus: "Verified",role: "Vendor", status: "Active",level: 4}
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
    if(keyword){
      //query = { $or: [ { name: { $regex: keyword, $options: "i" } }, { phoneNumber: { $regex: keyword, $options: "i" } } ] };
      query = {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { phoneNumber: { $regex: keyword, $options: "i" } },
          { companyName: { $regex: keyword, $options: "i" } },
        ],
        verificationStatus: "Verified",
        role: "Vendor",
        status: "Active",
        level: 4
      };
    }
    // var data = await userModel
    //   .find({
    //     verificationStatus: "Verified",
    //     role: "Vendor",
    //     status: "Active",
    //     level: 4,
    //   })
    //   .populate("vendorId")
    //   .sort({ created_at: -1 })
    //   .skip((pageNo - 1) * limit)
    //   .limit(dataLimit);
    
    var data = await userModel.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "usermodels",
          localField: "vendorId",
          foreignField: "_id",
          as: "vendorId",
        },
      },
      {
        $unwind: { path: "$vendorId", preserveNullAndEmptyArrays: true },
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
      msg: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});

router.post("/vendor/edit",  upload.fields([
  { name: "voteridProof", maxCount: 1 },{ name: "licenseProof", maxCount: 1 },{ name: "qrCode", maxCount: 1 },{ name: "passBook", maxCount: 1 }
]), async (req, res) => {
  try {
    var{id,name,email,vendorCategory,companyName,isGst,gstNo,locality,district,state,country,pincode,location,socialMediaLink, expiryDate,link,bankDetails}=req.body;
   bankDetails =JSON.parse(req.body.bankDetails)
   vendorCategory=JSON.parse(req.body.vendorCategory);
    if(Misc.isnullorempty(id)){
      res.status(200).json({
        status: false,
        msg: "Please provide the user Id" ,
      });
      return;
    }
    var user=await userModel.findOne({_id:id,status:"Active"}).populate("vendorId");
    if(Misc.isnullorempty(user)){
      res.status(200).json({
        status: false,
        msg: "User not found",
      });
      return;
    }
    var vendor=await vendorModel.findOne({userid:user._id,status:"Active"});
    if(Misc.isnullorempty(vendor)){
      res.status(200).json({
        status: false,
        msg: "Vendor not found",
      });
      return;
    }
    
      if ((req.files.voteridProof)) {
          if (req.files.voteridProof.length > 0) {
              isvoteridProof = true
              vendor.voteridProof = req.files.voteridProof[0].key;
          }
      }
      if ((req.files.licenseProof)) {
        if (req.files.licenseProof.length > 0) {
            islicenseProof = true
            vendor.licenseProof = req.files.licenseProof[0].key;
            
        }
    }

    if ((req.files.passBook)) {
      if (req.files.passBook.length > 0) {
          ispassBook = true
          vendor.bankDetails.passBook = req.files.passBook[0].key;
      }
    }
    if ((req.files.qrCode)) {
      if (req.files.qrCode.length > 0) {
          isqrCode = true
          vendor.bankDetails.qrCode = req.files.qrCode[0].key;
      }
    }
    if(name){
      user.name=name;
    }
    if(vendorCategory){
    //check if it is an array and its length is greater than 0
    if (!Array.isArray(vendorCategory) || vendorCategory.length === 0) {
      res.status(200).json({
        status: false,
        msg: "vendorCategory should be an array",
      });
      return;
    }
     
      //vendorCategory= JSON.parse(JSON.stringify(vendorCategory));
      user.vendorCategory=vendorCategory;
      vendor.vendorCategory=vendorCategory
    }
    if(companyName){
      user.companyName=companyName;
    }
    if(gstNo){
      user.isGst="Yes";
      user.gstNo=gstNo;
    }
    if(locality){
      user.locality=locality;
    }
    if(district){
      user.district=district;
    }
    if(state){
      user.state=state;
    }
    if(country){
      user.country=country;
    }
    if(pincode){
      user.pincode=pincode;
    }
    if(location){
      user.location=location;
    }
    if(!Misc.isnullorempty(link)){
      user.link=link;
    }
    if (!Misc.isnullorempty(bankDetails.bankName)) {
      vendor.bankDetails.bankName = bankDetails.bankName;
      
    }
    if (!Misc.isnullorempty(bankDetails.accHolderName)) {
      vendor.bankDetails.accHolderName = bankDetails.accHolderName;
    }
    if (!Misc.isnullorempty(bankDetails.accNo)) {
      vendor.bankDetails.accNo = bankDetails.accNo;
    }
    if (!Misc.isnullorempty(bankDetails.accType)) {
      vendor.bankDetails.accType = bankDetails.accType;
    }
    if (!Misc.isnullorempty(bankDetails.ifscCode)) {
      vendor.bankDetails.ifscCode = bankDetails.ifscCode;
    }

    if (!Misc.isnullorempty(bankDetails.branchName)) {
      vendor.bankDetails.branchName = bankDetails.branchName;
    }
    if (!Misc.isnullorempty(bankDetails.upiId)) {
      vendor.bankDetails.upiId = bankDetails.upiId;
    }
    await vendor.save();
    await user.save();
    res.status(200).json({
      status: true,
      data: user,
      msg:"Updated Successfully"
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});

router.post('/vendor/houseboat/bookings',vendorAuth, async (req, res) => {
  try {
      var { page, limit,fromDate,toDate,keyword } = req.body;
      var pageNo = 0, dataLimit = 0;
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      var houseboatdata=await houseBoatModel.find({userid:req.user.id}).select("_id");
      var hbids=await houseboatdata.map(x=>x._id)
      var query={status: "Active" ,houseBoatId:{$in:hbids},paymentStatus:"Success"}
      var query1={};
      if(keyword){
        query1["houseBoatId.houseBoatName"] = { $regex: keyword, $options: "i" };
      }
      var frm = null;
      if (!Misc.isnullorempty(fromDate)) {
        frm = new Date(fromDate);
        frm.setHours(0, 0, 0, 0);
        query.startDate = { $gte: frm };
       
      }
      if (!Misc.isnullorempty(toDate)) {
        var todt = new Date(toDate);
        todt.setHours(24, 0, 0, 0);
        if (query.endDate === undefined) {
          query.endDate = { $lte: todt };
        } else {
          query.endDate = { $gte: frm, $lte: todt };
        }
      }
      var data = await houseboatBookingItemModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "houseboatmodels",
            localField: "houseBoatId",
            foreignField: "_id",
            as: "houseBoatId",
          },
        },
        {
          $unwind: { path: "$houseBoatId", preserveNullAndEmptyArrays: true },

        },
        {$match:query1},
        {
          $lookup: {
              from: "sublocationmodels", // Adjust this based on your actual sublocation model name
              localField: "houseBoatId.startingLocation",
              foreignField: "_id",
              as: "houseBoatId.startingLocation",
          },
       },
        {
          $lookup: {
              from: "locationmodels", // Adjust this based on your actual sublocation model name
              localField: "houseBoatId.location",
              foreignField: "_id",
              as: "houseBoatId.location",
          },
      },
        {
          $lookup: {
            from: "usermodels",
            localField: "userid",
            foreignField: "_id",
            as: "userid",
          },
        },
        {
          $unwind: { path: "$userid", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "locationmodels",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $unwind: { path: "$location", preserveNullAndEmptyArrays: true },
        },
        {$sort:{created_at:-1}},
        { $skip: (pageNo - 1) * dataLimit },
        { $limit: dataLimit },
      ]);
      data=JSON.parse(JSON.stringify(data))
      for(var i=0;i<data.length;i++){
        if(data[i].houseBoatId.houseBoatStatus=="Blocked"){
            data[i].hbStatus=true;
        }
        else{
            data[i].hbStatus=false;
        }
       
      }
      //var count=await houseboatBookingItemModel.countDocuments(query);
      var count = await houseboatBookingItemModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "houseboatmodels",
            localField: "houseBoatId",
            foreignField: "_id",
            as: "houseBoatId",
          },
        },
        {
          $unwind: { path: "$houseBoatId", preserveNullAndEmptyArrays: true },

        },
        {$match:query1},
      ]);
      res.status(200).json({
          status: true,
          msg: "Data",
          data: data,
          totalLength: count.length,
          limit: limit,
          page: page

      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.post('/vendor/shikara/bookings',vendorAuth, async (req, res) => {
  try {
      var { page, limit,fromDate,toDate,keyword } = req.body;
      var userid=new mongoose.Types.ObjectId(req.user.id);
      var pageNo = 0, dataLimit = 0;
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      var shikaradata=await shikaraModel.find({userid:userid}).select("_id");
      var shikaraids=await shikaradata.map(x=>x._id);
      // var d = await shikaraBookingModel.find({shikaraid:{$in:shikaraids}, status: "Active",advancepaymentStatus:"Success"/*paymentStatus:"Success"*/}).sort({ created_at: -1 }).populate({path:"shikaraid",populate:{path:"startingLocation"}}).populate("bookedbyid").skip((pageNo - 1) * limit).limit(dataLimit)
      // var totalLength = await shikaraBookingModel.countDocuments({ status: "Active",shikaraid:{$in:shikaraids} })
      // if (Misc.isnullorempty(d)) {
      //     res.status(200).json({
      //         status: true,
      //         msg: "NO DATA FOUND",
      //         data: d
      //     });
      //     return;
      // }
      var query={status: "Active" ,shikaraid:{$in:shikaraids},/*paymentStatus:"Success"*/advancepaymentStatus:"Success"};
      var query1={};
      if (keyword) {
          query1["shikaraid.shikaraName"] = { $regex: keyword, $options: "i" };
      }
      var frm = null;
      if (!Misc.isnullorempty(fromDate)) {
        frm = new Date(fromDate);
        frm.setHours(0, 0, 0, 0);
        query.selectedDate = { $gte: frm };
       
      }
      if (!Misc.isnullorempty(toDate)) {
        var todt = new Date(toDate);
        todt.setHours(24, 0, 0, 0);
        if (query.selectedDate === undefined) {
          query.selectedDate = { $lte: todt };
        } else {
          query.selectedDate = { $gte: frm, $lte: todt };
        }
      }
      var data = await shikaraBookingModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "shikaramodels",
            localField: "shikaraid",
            foreignField: "_id",
            as: "shikaraid",
          },
        },
        {
          $unwind: { path: "$shikaraid", preserveNullAndEmptyArrays: true },

        },
        {$match:query1},
        {
          $lookup: {
              from: "sublocationmodels", // Adjust this based on your actual sublocation model name
              localField: "shikaraid.startingLocation",
              foreignField: "_id",
              as: "shikaraid.startingLocation",
          },
       },
       {
        $unwind: { path: "$shikaraid.startingLocation", preserveNullAndEmptyArrays: true },

      },
        {
          $lookup: {
              from: "locationmodels", // Adjust this based on your actual sublocation model name
              localField: "shikaraid.location",
              foreignField: "_id",
              as: "shikaraid.location",
          },
      },
      {
        $unwind: { path: "$shikaraid.location", preserveNullAndEmptyArrays: true },

      },
        {
          $lookup: {
            from: "usermodels",
            localField: "bookedbyid",
            foreignField: "_id",
            as: "bookedbyid",
          },
        },
        {
          $unwind: { path: "$bookedbyid", preserveNullAndEmptyArrays: true },
        },
        // {
        //   $lookup: {
        //     from: "locationmodels",
        //     localField: "location",
        //     foreignField: "_id",
        //     as: "location",
        //   },
        // },
        // {
        //   $unwind: { path: "$location", preserveNullAndEmptyArrays: true },
        // },
        {$sort:{created_at:-1}},
        { $skip: (pageNo - 1) * dataLimit },
        { $limit: dataLimit },
      ]);
      //var totalLength=await shikaraBookingModel.countDocuments(query);
      var totalLength = await shikaraBookingModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "shikaramodels",
            localField: "shikaraid",
            foreignField: "_id",
            as: "shikaraid",
          },
        },
        {
          $unwind: { path: "$shikaraid", preserveNullAndEmptyArrays: true },

        },
        {$match:query1},
      ]);
      res.status(200).json({
          status: true,
          msg: "Data",
          data: data,
          totalLength: totalLength.length,
          limit: limit,
          page: page

      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
//houseboat details
// router.post('/vendor/my/bookings/details/old', async (req, res) => {
//   try {
//       var { bookingId } = req.body;  //houseboatBookId is given from frontend
//       if (Misc.isnullorempty(bookingId)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please provide bookingId"
//           })
//           return
//       }
//       var d = await houseboatBookingModel.findOne({ _id: bookingId, status: "Active" }).populate("houseBoatIds").populate({path:"userid",populate:{path:"agentId"}})

//       res.status(200).json({
//           status: true,
//           msg: "Success",
//           data: d
//       })
//       return;
//   } catch (err) {
//       console.log(err)
//       res.status(500).json({
//           status: false,
//           msg: "Internal server error"
//       })
//   }

// })

router.post('/vendor/my/bookings/details', async (req, res) => {
  try {
      var { bookingId } = req.body;
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return;
      }
      var d = await houseboatBookingItemModel
      .findOne({ _id: bookingId, status: "Active" }).populate({path:"houseBoatId",populate:{path:"startingLocation"}}).populate("userid");
      res.status(200).json({
          status: true,
          msg: "Success",
          data: d
      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.post('/vendor/my/bookings/details/shikara', async (req, res) => {
  try {
      var { bookingId } = req.body;
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      var d = await shikaraBookingModel.findOne({ _id: bookingId, status: "Active" }).populate({path:"shikaraid",populate:[{path:"location"},{path:"startingLocation"}]});

      res.status(200).json({
          status: true,
          msg: "Success",
          data: d
      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

//verify vendor if advancepaymentmode is guest and amount is fully paid
router.post('/vendor/verify/houseboat/payment', async (req, res) => {
  try {
      var { bookingId } = req.body;  
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      var bookingitems=await houseboatBookingItemModel.findOne({_id:bookingId,status:"Active"}).populate("location").populate({path:"houseBoatId",populate:{path:"startingLocation"}}).populate("vendorName")
      if(Misc.isnullorempty(bookingitems)){
        res.status(200).json({
            status: false,
            msg: "Booking not found"
        })
        return
      }

     // if(bookingitems.advancepaymentMode=="Guest" && bookingitems.balancepaymentStatus=="Success"){
        bookingitems.balancepaymentStatus="Verified"
        await bookingitems.save();
      //}
       var d = await houseboatBookingModel.findOne({ _id:bookingitems.houseboatBookId, status: "Active" }).populate("houseBoatIds").populate({path:"userid",populate:{path:"agentId"}})
       d.balancepaymentStatus="Verified"
       await d.save();
       var selecteddates=bookingitems.bookedDates.map(x=>{return formatDate(x)}).join(", ");
       
       var vendorName=bookingitems.vendorName.name;
      try {
        var content = await EmailHelper.readEmailBookingSuccessTemplate("bookingbalancepay",
        {
          houseBoatName: bookingitems.houseBoatId.houseBoatName,
          name: bookingitems.fullName,
          phoneNumber:bookingitems.phoneNumber,
          balanceAmount: bookingitems.balancePayAmount,
          bookingTotal: bookingitems.totalAmount,
          tripType:bookingitems.tripType,
          location: bookingitems.location.name,
          selectedDate: formatDate(bookingitems.bookingDate),
          bookingNo: bookingitems.bookingNo,
          pickUpLocation: bookingitems.houseBoatId.startingLocation.name,
          totalRooms:bookingitems.totalRooms,
          checkinDate:formatDate(bookingitems.startDate),
          checkoutDate:formatDate(bookingitems.endDate),
          houseBoatType:bookingitems.houseBoatType,
          totalGuests:bookingitems.totalGuests,
          category:bookingitems.houseBoatId.category,
          advanceAmountPaid:bookingitems.advanceAmountPaid,
          advancepaymentMode:bookingitems.advancepaymentMode,
          noOfAdults:bookingitems.noOfAdults,
          noOfChildren:bookingitems.noOfChildren,
          vendorName:vendorName
     }
     );
        
        await EmailHelper.sendHtmlEmail(
          d.userid.email,
            "Balance Payment Confirmation",
            content
        );
        } catch (errr) {
            console.log(errr, "Error while sending Email");
            return errr;
        }
      res.status(200).json({
          status: true,
          msg: "Success",
          data: bookingitems
      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
function formatTimestampToHHMM(timestamp) {
  return moment(new Date(timestamp)).format('hh:mm A');
}
router.post('/vendor/verify/shikara/payment', async (req, res) => {
  try {
      var { bookingId } = req.body;  
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      var d = await shikaraBookingModel.findOne({ _id: bookingId, status: "Active" }).populate({path:"shikaraid",populate:{path:"startingLocation"}}).populate("bookedbyid");
    //  console.log(d)
      //if(d.advancepaymentMode=="Guest" && d.balancepaymentStatus=="Success"){
       d.balancepaymentStatus="Verified"
     // }
      await d.save();


      try {
        var content = await EmailHelper.readEmailBookingSuccessTemplate("bookingbalancepayshikara",
        {
          id: d._id,
          shikaraName: d.shikaraid.shikaraName,
          name: d.bookedbyid.name,
          startTime: formatTimestampToHHMM(d.startTime),
          endTime: formatTimestampToHHMM(d.endTime),
          balanceAmount: d.balanceAmount,
          bookingTotal: d.bookingTotal,
          selectedDate: formatDate(d.selectedDate),
          bookingNo: d.bookingNo,
          pickUpLocation: d.shikaraid.startingLocation.name,
         
     }
     );
        
        await EmailHelper.sendHtmlEmail(
          d.bookedbyid.email,
            "Balance Payment Confirmation",
            content
        );
        } catch (errr) {
            console.log(errr, "Error while sending Email");
            return errr;
        }
      res.status(200).json({
          status: true,
          msg: "Success",
          data: d
      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.post("/vendor/block", adminAuth, async (req, res) => {
  try {
    var { userId } = req.body;
    if (Misc.isnullorempty(userId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide userId",
      });
      return;
    }

    var checkhouseboat = await userModel.findOne({
      _id: userId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "User Not found",
      });
      return;
    }

    checkhouseboat.verificationStatus = "Blocked";
    await checkhouseboat.save();

    res.status(200).json({
      status: true,
      data: checkhouseboat,
      msg: "Blocked Successfully",
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
router.post("/vendor/unblock", adminAuth, async (req, res) => {
  try {
    var { userId } = req.body;
    if (Misc.isnullorempty(userId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide userId",
      });
      return;
    }

    var checkhouseboat = await userModel.findOne({
      _id: userId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "User Not found",
      });
      return;
    }

    checkhouseboat.verificationStatus = "Verified";
    await checkhouseboat.save();

    res.status(200).json({
      status: true,
      data: checkhouseboat,
      msg: "Unblocked Successfully",
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
router.get("/vendor/blockedlist", adminAuth, async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query = { verificationStatus: "Blocked", status: "Active",role:"Vendor" };
    if (keyword) {
      query["$or"] = [{ name: { $regex: keyword, $options: "i" } }],
      {verificationStatus: "Blocked", status: "Active",role:"Vendor"}
    }
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
    // var data = await houseBoatModel
    //   .find(query)
    //   .sort("created_at").populate("vendorid").populate("userid")
    //   .skip((pageNo - 1) * limit)
    //   .limit(dataLimit);


    var data = await userModel.aggregate([
      { $match: query },
      {
        $lookup: {
          from: "usermodels",
          localField: "vendorid",
          foreignField: "_id",
          as: "vendorid",
        },
      },
      {
        $unwind: { path: "$vendorid", preserveNullAndEmptyArrays: true },
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
      msg: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});


/////////////////////////            SETTLEMENT             //////////////////////////////


router.post('/vendor/houseboat/settlement',vendorAuth, async (req, res) => {
  try {
      var { page, limit ,fromDate,toDate,tripType,keyword} = req.body;
      var pageNo = 1, dataLimit = 20;
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      var houseboatdata=await houseBoatModel.find({userid:req.user.id}).select("_id");
      var hbids=await houseboatdata.map(x=>x._id)
      var query={status: "Active" ,houseBoatId:{$in:hbids},paymentStatus:"Success"}
      if(tripType){
        query.tripType=tripType;
      }
       var query1={};
      if (keyword) {
        if (keyword) {
          query1["$or"] = [{"vendorName.name":{ $regex: keyword, $options: "i" }},{"houseBoatId.houseBoatName":{ $regex: keyword, $options: "i" }}];
        }
      }
      var frm = null;
      if (!Misc.isnullorempty(fromDate)) {
        frm = new Date(fromDate);
        frm.setHours(0, 0, 0, 0);
        query.startDate = { $gte: frm };
       
      }
      if (!Misc.isnullorempty(toDate)) {
        var todt = new Date(toDate);
        todt.setHours(24, 0, 0, 0);
        if (query.endDate === undefined) {
          query.endDate = { $lte: todt };
        } else {
          query.endDate = { $gte: frm, $lte: todt };
        }
      }
      var data = await houseboatBookingItemModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "houseboatmodels",
            localField: "houseBoatId",
            foreignField: "_id",
            as: "houseBoatId",
          },
        },
        {
          $unwind: { path: "$houseBoatId", preserveNullAndEmptyArrays: true },

        },
       // {$match:query1},
        {
          $lookup: {
            from: "usermodels",
            localField: "userid",
            foreignField: "_id",
            as: "userid",
          },
        },
        {
          $unwind: { path: "$userid", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "usermodels",
            localField: "vendorName",
            foreignField: "_id",
            as: "vendorName",
          },
        },
        {
          $unwind: { path: "$vendorName", preserveNullAndEmptyArrays: true },
        },
        {$match:query1},
        {
          $lookup: {
            from: "locationmodels",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $unwind: { path: "$location", preserveNullAndEmptyArrays: true },
        },
        {$sort:{created_at:-1}},
        { $skip: (pageNo - 1) * dataLimit },
        { $limit: dataLimit },
      ]);
      var count=await houseboatBookingItemModel.countDocuments(query);
      res.status(200).json({
          status: true,
          msg: "Data",
          data: data,
          totalLength: count,
          limit: limit,
          page: page

      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.post('/vendor/shikara/settlement',vendorAuth, async (req, res) => {
  try {
      var { page, limit,fromDate,toDate,keyword } = req.body;
      var pageNo = 1, dataLimit = 20;
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      var shikaradata=await shikaraModel.find({userid:req.user.id}).select("_id");
      var hbids=await shikaradata.map(x=>x._id)
      var query={status: "Active" ,shikaraid:{$in:hbids},/*paymentStatus:"Success"*/advancepaymentStatus:"Success"};
      var query1={};
      var frm = null;
      if (!Misc.isnullorempty(fromDate)) {
        frm = new Date(fromDate);
        frm.setHours(0, 0, 0, 0);
        query.selectedDate = { $gte: frm };
       
      }
      if (!Misc.isnullorempty(toDate)) {
        var todt = new Date(toDate);
        todt.setHours(24, 0, 0, 0);
        if (query.selectedDate === undefined) {
          query.selectedDate = { $lte: todt };
        } else {
          query.selectedDate = { $gte: frm, $lte: todt };
        }
      }
      if (keyword) {
        query1["shikaraid.shikaraName"] = { $regex: keyword, $options: "i" };
      }
      var data = await shikaraBookingModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "shikaramodels",
            localField: "shikaraid",
            foreignField: "_id",
            as: "shikaraid",
          },
        },
        {
          $unwind: { path: "$shikaraid", preserveNullAndEmptyArrays: true },

        },
        { $match: query1 },
        {
          $lookup: {
            from: "usermodels",
            localField: "userid",
            foreignField: "_id",
            as: "userid",
          },
        },
        {
          $unwind: { path: "$userid", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "usermodels",
            localField: "bookedbyid",
            foreignField: "_id",
            as: "bookedbyid",
          },
        },
        {
          $unwind: { path: "$bookedbyid", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "locationmodels",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $unwind: { path: "$location", preserveNullAndEmptyArrays: true },
        },
        {$sort:{created_at:-1}},
        { $skip: (pageNo - 1) * dataLimit },
        { $limit: dataLimit },
      ]);
      var count=await shikaraBookingModel.countDocuments(query);
      res.status(200).json({
          status: true,
          msg: "Data",
          data: data,
          totalLength: count,
          limit: limit,
          page: page

      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})

router.post('/vendor/verify/houseboat/settlement', async (req, res) => {
  try {
      var { bookingId } = req.body;  
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      var bookingitems=await houseboatBookingItemModel.findOne({_id:bookingId,status:"Active"}).populate("location").populate({path:"houseBoatId",populate:{path:"startingLocation"}}).populate("vendorName")
      if(Misc.isnullorempty(bookingitems)){
        res.status(200).json({
            status: false,
            msg: "Booking not found"
        })
        return
      }
        bookingitems.settlementStatus="Verified";
        bookingitems.settlementDate=Date.now();
        await bookingitems.save();
        
       var d = await houseboatBookingModel.findOne({ _id:bookingitems.houseboatBookId, status: "Active" }).populate("houseBoatIds").populate({path:"userid",populate:{path:"agentId"}})
       d.settlementStatus="Verified";
       d.settlementDate=Date.now();
       await d.save();
       
      res.status(200).json({
          status: true,
          msg: "Verified Success",
          data: bookingitems
      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.post('/vendor/verify/shikara/settlement', async (req, res) => {
  try {
      var { bookingId } = req.body;  
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      var bookingitems=await shikaraBookingModel.findOne({_id:bookingId,status:"Active"}).populate("location").populate({path:"shikaraid",populate:{path:"startingLocation"}});
      if(Misc.isnullorempty(bookingitems)){
        res.status(200).json({
            status: false,
            msg: "Booking not found"
        })
        return
      }

     // if(bookingitems.advancepaymentMode=="Guest" && bookingitems.balancepaymentStatus=="Success"){
        bookingitems.settlementStatus="Verified";
        bookingitems.settlementDate=Date.now();
        await bookingitems.save();
      //}
       
      res.status(200).json({
          status: true,
          msg: "Verified  Success",
          data: bookingitems
      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.post('/admin/upload/hbaccesspayreceipt', upload.fields([{ name: 'accessPayReceipt', maxCount: 1 }]), async (req, res) => {
  try {
      var { bookingId,  } = req.body;
      // console.log(req.body)
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      if (!Misc.isnullorempty(req.files)) {
          if (Misc.isnullorempty(req.files.accessPayReceipt)) {
              res.status(200).json({
                  status: false,
                  msg: "Please upload payment receipt."
              });
              return;
          }
      }
      var d = await houseboatBookingItemModel.findOne({_id: bookingId, status: "Active" }).populate("houseBoatId");
      if (Misc.isnullorempty(d)) {
          res.status(200).json({
              status: true,
              msg: "NO DATA FOUND",
              data: d
          });
          return;
      }
      var mainbookid = await houseboatBookingModel.findOne({ _id: d.houseboatBookId, status: "Active" });
      if (!Misc.isnullorempty(req.files)) {
          if (!Misc.isnullorempty(req.files.accessPayReceipt)) {
              if (req.files.accessPayReceipt.length > 0) {
                  isaccessPayReceipt = true
                  d.accessPayReceipt = req.files.accessPayReceipt[0].key;
                  mainbookid.accessPayReceipt = req.files.accessPayReceipt[0].key;
                  // await data.save()
              }
          }
      }
      d.settlementStatus="Success";
      mainbookid.settlementStatus="Success";
      await d.save();
      await mainbookid.save();
      res.status(200).json({
          status: true,
          msg: "Success",
          data: d
      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.post('/admin/upload/skaccesspayreceipt', upload.fields([{ name: 'accessPayReceipt', maxCount: 1 }]), async (req, res) => {
  try {
      var { bookingId,  } = req.body;
      // console.log(req.body)
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      if (!Misc.isnullorempty(req.files)) {
          if (Misc.isnullorempty(req.files.accessPayReceipt)) {
              res.status(200).json({
                  status: false,
                  msg: "Please upload payment receipt."
              });
              return;
          }
      }
      var d = await shikaraBookingModel.findOne({_id: bookingId, status: "Active" });
      if (Misc.isnullorempty(d)) {
          res.status(200).json({
              status: true,
              msg: "NO DATA FOUND",
              data: d
          });
          return;
      }
      if (!Misc.isnullorempty(req.files)) {
          if (!Misc.isnullorempty(req.files.accessPayReceipt)) {
              if (req.files.accessPayReceipt.length > 0) {
                  isaccessPayReceipt = true
                  d.accessPayReceipt = req.files.accessPayReceipt[0].key;
              }
          }
      }
      d.settlementStatus="Success";
      await d.save();
      res.status(200).json({
          status: true,
          msg: "Success",
          data: d
      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.post('/admin/houseboat/settlement',adminAuth, async (req, res) => {
  try {
      var { page, limit,fromDate,toDate,tripType,keyword, } = req.body;
      var pageNo = 1, dataLimit = 20;
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      var houseboatdata=await houseBoatModel.find({}).select("_id");
      var hbids=await houseboatdata.map(x=>x._id)
      var query={status:{$in:["Active","Cancelled"]} ,houseBoatId:{$in:hbids},paymentStatus:"Success"}
      if(tripType){
        query.tripType=tripType;
      }
       var query1={};
      if (keyword) {
        query1["$or"] = [{"vendorName.name":{ $regex: keyword, $options: "i" }},{"houseBoatId.houseBoatName":{ $regex: keyword, $options: "i" }}];
      }
      var frm = null;
      if (!Misc.isnullorempty(fromDate)) {
        frm = new Date(fromDate);
        frm.setHours(0, 0, 0, 0);
        query.startDate = { $gte: frm };
       
      }
      if (!Misc.isnullorempty(toDate)) {
        var todt = new Date(toDate);
        todt.setHours(24, 0, 0, 0);
        if (query.endDate === undefined) {
          query.endDate = { $lte: todt };
        } else {
          query.endDate = { $gte: frm, $lte: todt };
        }
      }
      var data = await houseboatBookingItemModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "houseboatmodels",
            localField: "houseBoatId",
            foreignField: "_id",
            as: "houseBoatId",
          },
        },
        {
          $unwind: { path: "$houseBoatId", preserveNullAndEmptyArrays: true },

        },
        {
          $lookup: {
            from: "usermodels",
            localField: "userid",
            foreignField: "_id",
            as: "userid",
          },
        },
        {
          $unwind: { path: "$userid", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "usermodels",
            localField: "vendorName",
            foreignField: "_id",
            as: "vendorName",
          },
        },
        {
          $unwind: { path: "$vendorName", preserveNullAndEmptyArrays: true },
        },
        {$match:query1},
        {
          $lookup: {
            from: "locationmodels",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $unwind: { path: "$location", preserveNullAndEmptyArrays: true },
        },
        {$sort:{created_at:-1}},
        { $skip: (pageNo - 1) * dataLimit },
        { $limit: dataLimit },
      ]);
      // data = JSON.parse(JSON.stringify(data))
      // var calcadvance=0;
      // var advAmount=0;
      // for(var i=0;i<data.length;i++){
      //   var balance = data[i].vendorNetAmount-data[i].advanceAmountPaid;
      //   data[i].accessPayBalance=balance;
      //   //10 % of totalAmount
      // var commission=data[i].houseBoatId.commissionPercentage;
      // var commissionValue=(commission/100);
      //   calcadvance=(commissionValue*data[i].totalAmount);
      //   advAmount=data[i].advanceAmountPaid-calcadvance;
      //   data[i].vendorBalance=advAmount;
      //   //save access pay balance and vendor balance
      //   await houseboatBookingItemModel.findOneAndUpdate({_id:data[i]._id},{accessPayBalance:balance},{vendorBalance:advAmount})
      //   await houseboatBookingModel.findOneAndUpdate({_id:data[i].houseboatBookId},{accessPayBalance:balance,vendorBalance:advAmount})
              
      // }
      var count=await houseboatBookingItemModel.countDocuments(query);
      res.status(200).json({
          status: true,
          msg: "Data",
          data: data,
          totalLength: count,
          limit: limit,
          page: page

      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.get('/download/excel/hbbooking',ifToken, async (req, res) => {
  try {
      var { fromDate,toDate,tripType,keyword, } = req.query;
      var houseboatdata;
      if(req.user.user.role=="Admin"){
        houseboatdata=await houseBoatModel.find({}).select("_id");
      }
      else if(req.user.user.role=="Vendor"){
        houseboatdata=await houseBoatModel.find({userid:req.user.id}).select("_id"); 
      }
     
      var hbids=await houseboatdata.map(x=>x._id)
      var query={status: {$in:["Active","Cancelled"]} ,houseBoatId:{$in:hbids},paymentStatus:"Success"}
      if(tripType){
        query.tripType=tripType;
      }
       var query1={};
      if (keyword) {
        query1["$or"] = [{"vendorName.name":{ $regex: keyword, $options: "i" }},{"houseBoatId.houseBoatName":{ $regex: keyword, $options: "i" }}];
      }
      var frm = null;
      if (!Misc.isnullorempty(fromDate)) {
        frm = new Date(fromDate);
        frm.setHours(0, 0, 0, 0);
        query.startDate = { $gte: frm };
       
      }
      if (!Misc.isnullorempty(toDate)) {
        var todt = new Date(toDate);
        todt.setHours(24, 0, 0, 0);
        if (query.endDate === undefined) {
          query.endDate = { $lte: todt };
        } else {
          query.endDate = { $gte: frm, $lte: todt };
        }
      }
      var data = await houseboatBookingItemModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "houseboatmodels",
            localField: "houseBoatId",
            foreignField: "_id",
            as: "houseBoatId",
          },
        },
        {
          $unwind: { path: "$houseBoatId", preserveNullAndEmptyArrays: true },

        },
        {
          $lookup: {
            from: "usermodels",
            localField: "userid",
            foreignField: "_id",
            as: "userid",
          },
        },
        {
          $unwind: { path: "$userid", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "usermodels",
            localField: "vendorName",
            foreignField: "_id",
            as: "vendorName",
          },
        },
        {
          $unwind: { path: "$vendorName", preserveNullAndEmptyArrays: true },
        },
        {$match:query1},
        {
          $lookup: {
            from: "locationmodels",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $unwind: { path: "$location", preserveNullAndEmptyArrays: true },
        },
        {$sort:{created_at:-1}},
        {
          $project: {
              HouseboatName: "$houseBoatId.houseBoatName", // Adjust these based on your actual field names
              // CustomerOrAgentName: { 
              //   $concat: [
              //     "$fullName",
              //     " (",
              //     { $ifNull: ["$userid.companyName", ""] }, // Include company name if available
              //     ")"
              //   ]
              // },
              CustomerOrAgentName:"$fullName",
              CompanyName: "$userid.companyName",
              BookedBy: "$bookingType",
              CheckInDate:"$startDate",
              CheckOutDate:"$endDate",
              TripType:"$tripType",
              NoOfRooms:"$totalRooms",
              TotalAmount:"$totalAmount",
              HouseboatTotalAmount:"$vendorNetAmount",
              AdvanceAmount:"$advanceAmountPaid",
              BalanceAmount:"$balancePayAmount",
              BalanceAmountMode:"$advancepaymentMode",
              BalanceAmountStatus:"$balancepaymentStatus",
              AccessPaymentBalance:"$vendorBalance"
          },
      },
      ]);
      data = JSON.parse(JSON.stringify(data))
      for(var i=0;i<data.length;i++){ 
        data[i].CheckInDate=moment(data[i].CheckInDate).format("DD MMM YYYY");
        data[i].CheckOutDate=moment(data[i].CheckOutDate).format("DD MMM YYYY");
     }
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Houseboat Settlement');

      // Add headers to the worksheet
      const headers = ['SL No.', 'Houseboat  Name', 'Customer / Agent Name','Company Name','Booked By','Check-In Date','Check-Out Date','Trip-Type','No.of Rooms','Total Amount(Rs.)','Houseboat Total Amount(Rs.)','Advance Amount(Rs.)','Balance Amount(Rs.)','Balance Amount Mode','Balance Amount Status','Access Payment Balance(Rs.)'] // Replace with your actual headers
      // worksheet.addRow(headers);
      const headerRow = worksheet.addRow(headers);
      headerRow.eachCell((cell) => {
      cell.alignment = { wrapText: true };
      cell.font = { bold: true };
      });
      var slNo = 1;
      data.forEach((row) => {
        const rowData = [
          slNo++,
          row.HouseboatName,
          row.CustomerOrAgentName,
          row.CompanyName,
          row.BookedBy,
          row.CheckInDate,
          row.CheckOutDate,
          row.TripType,
          row.NoOfRooms,
          row.TotalAmount,
          row.HouseboatTotalAmount,
          row.AdvanceAmount,
          row.BalanceAmount,
          row.BalanceAmountMode,
          row.BalanceAmountStatus,
          row.AccessPaymentBalance,
        ];
        const addedRow = worksheet.addRow(rowData);
      
        // Loop through each cell in the added row and adjust column widths
        addedRow.eachCell((cell, colNumber) => {
          const column = worksheet.getColumn(colNumber);
          const cellWidth = cell.value ? cell.value.toString().length + 2 : 10; // Add some padding
          column.width = Math.max(column.width || 0, cellWidth);
          
          cell.alignment = { wrapText: true, horizontal: 'center' };
        });
      });
  
      const columnSizes = {
        'SL No': 10,
        'Houseboat Name': 10,
        'Customer/Agent Name': 10,
        'Booked By': 10,
        'Check-In Date': 10,
        'Check-Out Date': 10,
        'Trip-Type': 10,
        'No.of Rooms': 10,
        'Total Amount':10,
        'Houseboat Total Amount':10,
        'Advance Amount':10,
        'Balance Amount':10,
        'Balance Amount Mode':10,
        'Balance Amount Status':10,
        'Access Payment Balance':10
        // Add more header names and sizes as needed
    };
      // Auto-size columns based on the predefined sizes
      worksheet.columns.forEach((column, index) => {
        const headerName = column.headers || ''; // Ensure headerName is a string
        const colWidth = columnSizes[headerName] || 15; // Default to 15 if size is not specified
        worksheet.getColumn(index + 1).width = colWidth;
      });
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=houseboat_settlement.xlsx');

      const buffer = await workbook.xlsx.writeBuffer();
      res.send(buffer);
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})


router.get('/download/excel/skbooking',ifToken,async (req, res) => {
  try {
      var { fromDate,toDate,keyword, } = req.query;
      var shikaradata;
      if(req.user.user.role=="Admin"){
        shikaradata=await shikaraModel.find({}).select("_id");
      }
      else if(req.user.user.role=="Vendor"){
        shikaradata=await shikaraModel.find({userid:req.user.id}).select("_id"); 
      }
      var hbids=await shikaradata.map(x=>x._id)
      var query={status: {$in:["Active","Cancelled"]} ,shikaraid:{$in:hbids},/*paymentStatus:"Success"*/advancepaymentStatus:"Success"};
      var query1={};
      var frm = null;
      if (!Misc.isnullorempty(fromDate)) {
        frm = new Date(fromDate);
        frm.setHours(0, 0, 0, 0);
        query.selectedDate = { $gte: frm };
       
      }
      if (!Misc.isnullorempty(toDate)) {
        var todt = new Date(toDate);
        todt.setHours(24, 0, 0, 0);
        if (query.selectedDate === undefined) {
          query.selectedDate = { $lte: todt };
        } else {
          query.selectedDate = { $gte: frm, $lte: todt };
        }
      }
      if (keyword) {
        query1["shikaraid.shikaraName"] = { $regex: keyword, $options: "i" };
      }
      var data = await shikaraBookingModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "shikaramodels",
            localField: "shikaraid",
            foreignField: "_id",
            as: "shikaraid",
          },
        },
        {
          $unwind: { path: "$shikaraid", preserveNullAndEmptyArrays: true },

        },
        {$match:query1},
        {
          $lookup: {
            from: "usermodels",
            localField: "bookedbyid",
            foreignField: "_id",
            as: "bookedbyid",
          },
        },
        {
          $unwind: { path: "$bookedbyid", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "locationmodels",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $unwind: { path: "$location", preserveNullAndEmptyArrays: true },
        },
        {$sort:{created_at:-1}},
        {
          $project: {
              ShikaraName: "$shikaraid.shikaraName", // Adjust these based on your actual field names
              CustomerOrAgentName: "$customerDetails.name",
            //  CustomerOrAgentName: { 
            //   $concat: [
            //     "$customerDetails.name",
            //     " (",
            //     { $ifNull: ["$bookedbyid.companyName", ""] }, // Include company name if available
            //     ")"
            //   ]
            // },
              companyName: "$bookedbyid.companyName",
              BookedBy: "$bookingType",
              checkinDate:"$selectedDate",
              CheckInTime:"$startTime",
              CheckOutTime:"$endTime",
              TotalAmount:"$bookingTotal",
              shikaraTotalAmount:"$vendorNetAmount",
              AdvanceAmount:"$advance",
              BalanceAmount:"$postBookingamount",
              BalanceAmountMode:"$advancepaymentMode",
              BalanceAmountStatus:"$balancepaymentStatus",
              AccessPaymentBalance:"$vendorBalance"
          },
      },
      ]);
      data = JSON.parse(JSON.stringify(data))
      for(var i=0;i<data.length;i++){ 
        data[i].checkinDate=moment(data[i].checkinDate).format("DD MMM YYYY");
        data[i].CheckInTime=moment(data[i].CheckInTime).format("hh:mm A");
        data[i].CheckOutTime=moment(data[i].CheckOutTime).format("hh:mm A");
     }
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Shikara Settlement');

      // Add headers to the worksheet
      const headers = ['SL No.', 'Shikara  Name', 'Customer / Agent Name','Company Name','Booked By','Check-In Date','Check-In Time','Check-Out Time','Total Amount(Rs.)','Shikara Total Amount(Rs.)','Advance Amount(Rs.)','Balance Amount(Rs.)','Balance Amount Mode','Balance Amount Status','Access Payment Balance(Rs.)'] // Replace with your actual headers
      // worksheet.addRow(headers);
      const headerRow = worksheet.addRow(headers);
      headerRow.eachCell((cell) => {
      cell.alignment = { wrapText: true };
      cell.font = { bold: true };
      });
      var slNo = 1;
      data.forEach((row) => {
        const rowData = [
          slNo++,
          row.ShikaraName,
          row.CustomerOrAgentName,
          row.companyName,
          row.BookedBy,
          row.checkinDate,
          row.CheckInTime,
          row.CheckOutTime,
          row.TotalAmount,
          row.shikaraTotalAmount,
          row.AdvanceAmount,
          row.BalanceAmount,
          row.BalanceAmountMode,
          row.BalanceAmountStatus,
          row.AccessPaymentBalance,
        ];
        const addedRow = worksheet.addRow(rowData);
      
        // Loop through each cell in the added row and adjust column widths
        addedRow.eachCell((cell, colNumber) => {
          const column = worksheet.getColumn(colNumber);
          const cellWidth = cell.value ? cell.value.toString().length + 2 : 10; // Add some padding
          column.width = Math.max(column.width || 0, cellWidth);
          
          cell.alignment = { wrapText: true, horizontal: 'center' };
        });
      });
  
      const columnSizes = {
        'SL No': 10,
        'Shikara Name': 10,
        'Customer/Agent Name': 10,
        'Booked By': 10,
        'Check-In Time': 10,
        'Check-Out Time': 10,
        'Total Amount':10,
        'Shikara Total Amount':10,
        'Advance Amount':10,
        'Balance Amount':10,
        'Balance Amount Mode':10,
        'Balance Amount Status':10,
        'Access Payment Balance':10
        // Add more header names and sizes as needed
    };
      // Auto-size columns based on the predefined sizes
      worksheet.columns.forEach((column, index) => {
        const headerName = column.headers || ''; // Ensure headerName is a string
        const colWidth = columnSizes[headerName] || 15; // Default to 15 if size is not specified
        worksheet.getColumn(index + 1).width = colWidth;
      });
      
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', 'attachment; filename=houseboat_settlement.xlsx');

      const buffer = await workbook.xlsx.writeBuffer();
      res.send(buffer);
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
router.post('/admin/shikara/settlement',adminAuth, async (req, res) => {
  try {
      var { page, limit,fromDate,toDate,keyword, } = req.body;
      var pageNo = 1, dataLimit = 20;
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      var shikaradata=await shikaraModel.find({}).select("_id");
      var hbids=await shikaradata.map(x=>x._id)
      var query={status: {$in:["Active","Cancelled"]} ,shikaraid:{$in:hbids},/*paymentStatus:"Success"*/advancepaymentStatus:"Success"};
      var query1={};
      var frm = null;
      if (!Misc.isnullorempty(fromDate)) {
        frm = new Date(fromDate);
        frm.setHours(0, 0, 0, 0);
        query.selectedDate = { $gte: frm };
       
      }
      if (!Misc.isnullorempty(toDate)) {
        var todt = new Date(toDate);
        todt.setHours(24, 0, 0, 0);
        if (query.selectedDate === undefined) {
          query.selectedDate = { $lte: todt };
        } else {
          query.selectedDate = { $gte: frm, $lte: todt };
        }
      }
      if (keyword) {
        query1["shikaraid.shikaraName"] = { $regex: keyword, $options: "i" };
      }
      var data = await shikaraBookingModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "shikaramodels",
            localField: "shikaraid",
            foreignField: "_id",
            as: "shikaraid",
          },
        },
        {
          $unwind: { path: "$shikaraid", preserveNullAndEmptyArrays: true },

        },
        {$match:query1},
        {
          $lookup: {
            from: "usermodels",
            localField: "bookedbyid",
            foreignField: "_id",
            as: "bookedbyid",
          },
        },
        {
          $unwind: { path: "$bookedbyid", preserveNullAndEmptyArrays: true },
        },
        {
          $lookup: {
            from: "locationmodels",
            localField: "location",
            foreignField: "_id",
            as: "location",
          },
        },
        {
          $unwind: { path: "$location", preserveNullAndEmptyArrays: true },
        },
        {$sort:{created_at:-1}},
        { $skip: (pageNo - 1) * dataLimit },
        { $limit: dataLimit },
      ]);
      data = JSON.parse(JSON.stringify(data))
      // var calcadvance=0;
      // var advAmount=0;
      // for(var i=0;i<data.length;i++){
      //   var balance = data[i].vendorNetAmount-data[i].postBookingamount;
      //   data[i].accessPayBalance=balance;
      //   //10 % of totalAmount
      //   var commission=data[i].shikaraid.commissionPercentage;
      //   var commissionValue=(commission/100);
      //   calcadvance=(commissionValue*data[i].totalAmount);
      //   advAmount=data[i].advanceAmountPaid-calcadvance;
      //   data[i].vendorBalance=advAmount;
      //   //save access pay balance
      //   await shikaraBookingModel.findOneAndUpdate({_id:data[i]._id},{accessPayBalance:balance},{vendorBalance:advAmount})
              
      // }
      var count=await shikaraBookingModel.countDocuments(query);
      res.status(200).json({
          status: true,
          msg: "Data",
          data: data,
          totalLength: count,
          limit: limit,
          page: page

      })
      return;
  } catch (err) {
      console.log(err)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }

})
module.exports = router;
