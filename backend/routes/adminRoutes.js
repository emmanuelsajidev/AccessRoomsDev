const express = require("express");
const router = express();
var jwt = require("jsonwebtoken");
const Misc = require("../controllers/Misc");
const bcrypt = require("bcryptjs");
const tokenModel = require("../models/tokenModel");
// const userAuth = require('../middleware/userAuth');
const ifToken = require("../middleware/ifToken");
const randomstring = require("randomstring");
//const userModel = require('../models/userModel')
const { json } = require("body-parser");
const imageHelper = require("../controlize/imageHelperS3");
const upload = imageHelper.upload;
const multer = require("multer");
const userModel = require("../models/userModel");
const adminAuth = require("../middleware/adminAuth");
const agentModel = require("../models/agentModel");
const otpModel = require("../models/otpModel");
const EmailHelper = require("../controllers/Email");
const interactHelper = require("../controllers/interactHelper");
const shikaraBookingModel=require("../models/shikaraBookingModel");
const houseboatBookingModel=require("../models/houseboatBookingModel");
const houseboatBookingItemModel=require("../models/houseboatBookingItemModel");
const houseBoatModel=require("../models/houseBoatModel")
const tripTypeModel=require("../models/tripTypeModel");
const shikaraModel=require("../models/shikaraModel")


//REGISTRATION ADMIN
router.post("/admin/registration", async (req, res) => {
  try {
    var {
      name,
      phoneNumber,
      address,
      picode,
      district,
      state,
      country,
      password,
      email,
    } = req.body;

    if (Misc.isnullorempty(name)) {
      res.status(200).json({
        status: false,
        msg: "name not provided.",
      });
      return;
    }
    if (Misc.isnullorempty(email)) {
      res.status(200).json({
        status: false,
        msg: "email not provided.",
      });
      return;
    }
    if (Misc.isnullorempty(password)) {
      res.status(200).json({
        status: false,
        msg: "password not provided.",
      });
      return;
    }
    if (Misc.isnullorempty(phoneNumber)) {
      res.status(200).json({
        status: false,
        msg: "phoneNumber not provided.",
      });
      return;
    }
    // if (Misc.isnullorempty(address)) {
    //     res.status(200).json({
    //         status: false,
    //         msg: "address not provided."
    //     });
    //     return;
    // }
    // if (Misc.isnullorempty(picode)) {
    //     res.status(200).json({
    //         status: false,
    //         msg: "picode not provided."
    //     });
    //     return;
    // }
    // if (Misc.isnullorempty(district)) {
    //     res.status(200).json({
    //         status: false,
    //         msg: "district not provided."
    //     });
    //     return;
    // }
    // if (Misc.isnullorempty(state)) {
    //     res.status(200).json({
    //         status: false,
    //         msg: "state not provided."
    //     });
    //     return;
    // }
    // if (Misc.isnullorempty(country)) {
    //     res.status(200).json({
    //         status: false,
    //         msg: "country not provided."
    //     });
    //     return;
    // }
    var full = await userModel.find({ phoneNumber: phoneNumber });
    if (!Misc.isnullorempty(full)) {
      res.status(200).json({
        status: true,
        msg: "This user already exists.",
      });
      return;
    }
    var encryptedPassword = await bcrypt.hash(password, 10);
    var d = new userModel({
      phoneNumber: phoneNumber,
      name: name,
      email: email,
      address: address,
      picode: picode,
      country: country,
      district: district,
      state: state,
      password: encryptedPassword,
      //level: 1,
      role: "Admin",
    });
    await d.save();
    // var dd = new vendorModel({
    //     userid: d._id
    // })
    // await dd.save()
    res.status(200).json({
      status: true,
      msg: "sucess.",
      data: d,
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

router.post("/user/sendotp", ifToken, async (req, res) => {
  try {
    var { phoneNumber, email, name, countrycode } = req.body;
    if (Misc.isnullorempty(phoneNumber)) {
      res.status(200).json({
        status: true,
        msg: "Please Provide PhoneNumber",
      });
      return;
    }
    if (Misc.isnullorempty(email)) {
      res.status(200).json({
        status: true,
        msg: "Please Provide Email",
      });
      return;
    }
    if (Misc.isnullorempty(name)) {
      res.status(200).json({
        status: true,
        msg: "Please Provide Name",
      });
      return;
    }
    if (Misc.isnullorempty(countrycode)) {
      res.status(200).json({
        status: true,
        msg: "Please Provide countrycode",
      });
      return;
    }
    if (Misc.isnullorempty(name)) {
      name = "User";
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
    var otp = await randomstring.generate({ length: 4, charset: "numeric" });
    console.log(otp, "First Step Generate Otp");
    var error, alreadyExists;
    var user = await userModel.findOne({
      status: "Active",
      _id: { $ne: req.user.id },
      phoneNumber: phoneNumber,
    });
    if (!Misc.isnullorempty(user)) {
      res.status(200).json({
        status: false,
        msg: "User Already Verified",
      });
      return;
    }
    //otp =1234;
    if (Misc.isnullorempty(user)) {
      try {
        var phoneOTP = await otpModel
          .findOne({ uid: req.user.id })
          .sort({ create_date: -1 });
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
        console.log(ex);
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
    res.status(200).json({
      status: true,
      alreadyExists: alreadyExists,
      msg: "OTP send successfully",
      error: error,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong!",
    });
  }
});

// Function to send OTP via email and WhatsApp
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
router.post("/forgot/password", async (req, res) => {
  try {
    var { email, phoneNumber } = req.body;
    if (Misc.isnullorempty(email) && Misc.isnullorempty(phoneNumber)) {
      res.status(200).json({
        status: false,
        msg: "Please provide either email or phoneNumber",
      });
      return;
    }
    if (email) {
      var d = await userModel.findOne({ email: email, status: "Active" });
      if (Misc.isnullorempty(d)) {
        res.status(200).json({
          status: false,
          msg: "Invalid Email.",
        });
        return;
      }
      //check the user level also if it is vendor
      if (!Misc.isnullorempty(d)) {
        if (d.level == 0) {
          res.status(200).json({
            status: false,
            msg: "This user is not allowed to reset the password since its level is 0.",
          });
          return;
        }
      }
    }
    if (phoneNumber) {
      var d = await userModel.findOne({
        phoneNumber: phoneNumber,
        status: "Active",
      });
      if (Misc.isnullorempty(d)) {
        res.status(200).json({
          status: false,
          msg: "Invalid PhoneNumber.",
        });
        return;
      }
      //check the user level also if it is vendor
      if (!Misc.isnullorempty(d)) {
        if (d.level == 0) {
          res.status(200).json({
            status: false,
            msg: "This user is not allowed to reset the password since its level is 0.",
          });
          return;
        }
      }
    }
    const otpResult = await sendOtp(
      d.phoneNumber,
      d.email,
      d._id,
      d.name,
      d.whatsappCountryCode
    );

    res.status(200).json({
      status: true,
      msg: "Success",
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
router.post("/admin/login", async (req, res) => {
  var { phoneNumber, password ,guestid} = req.body;
  console.log(req.body);
  try {
    if (Misc.isnullorempty(phoneNumber)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide PhoneNumber",
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
    var d = await userModel.findOne({
      $or: [{ whatsappNumber: phoneNumber }, { phoneNumber: phoneNumber }],
      status: "Active",
      role: "Admin",
    });
    if (Misc.isnullorempty(d)) {
      res.status(200).json({
        status: false,
        msg: "Invalid phone number",
      });
      return;
    }
    if (await bcrypt.compare(password, d.password)) {
      var token = jwt.sign({ id: d._id, phoneNumber: d.phoneNumber }, "shhhhh");
      var tokendata = new tokenModel({
        name: d._id,
        token: token,
        role: d.role,
      });
      await tokendata.save();
      res.status(200).json({
        status: true,
        msg: "Login Success",
        data: d,
        token: token,
      });
      return;
    } else {
      res.status(200).json({
        status: false,
        msg: "Wrong Password.",
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      msg: "Internal server error",
    });
  }
});
//VENDOR LOGIN
router.post("/login/", async (req, res) => {
  var { phoneNumber, password } = req.body;
  console.log(req.body);
  try {
    if (Misc.isnullorempty(phoneNumber)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide PhoneNumber",
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
    var d = await userModel
      .findOne({ phoneNumber: phoneNumber, status: "Active",role:"Vendor" })
      .populate("vendorCategory");
    if (Misc.isnullorempty(d)) {
      res.status(200).json({
        status: false,
        msg: "Invalid phone number",
      });
      return;
    }
    if (!Misc.isnullorempty(d)) {
      if (d.level == 0) {
        res.status(200).json({
          status: false,
          msg: "Vendor at level 0 cannot log in.Please continue to register as vendor",
        });
        return;
      }
    }
    if (await bcrypt.compare(password, d.password)) {
      var token = jwt.sign({ id: d._id, phoneNumber: d.phoneNumber }, "shhhhh");
      var tokendata = new tokenModel({
        name: d._id,
        token: token,
        role: d.role,
      });
      await tokendata.save();
      res.status(200).json({
        status: true,
        msg: "Login Success",
        data: d,
        token: token,
      });
      return;
    } else {
      res.status(200).json({
        status: false,
        msg: "Wrong Password.",
      });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      msg: "Internal server error",
    });
  }
});

router.post("/login/new", async (req, res) => {
  var { otp, password } = req.body;
  console.log(req.body);
  try {
    if (Misc.isnullorempty(otp)) {
      res.status(200).json({
        status: false,
        msg: "otp is not provided",
      });
      return;
    }
    if (Misc.isnullorempty(password)) {
      res.status(200).json({
        status: false,
        msg: "password is not provided",
      });
      return;
    }
    var checkotp = await otpModel
      .findOne({ otp: otp })
      .sort({ create_date: -1 });
    console.log(checkotp, "checkotp");
    if (Misc.isnullorempty(checkotp)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Otp",
      });
      return;
    }

    var checkuser = await userModel.findOne({
      _id: checkotp.uid,
      status: "Active",
    });
    if (Misc.isnullorempty(checkuser)) {
      res.status(200).json({
        status: false,
        msg: "Invalid User",
      });
      return;
    }
    var encryptedPassword = await bcrypt.hash(password, 10);
    checkuser.password = encryptedPassword;
    var token = jwt.sign(
      { id: checkuser._id, phoneNumber: checkuser.phoneNumber },
      "shhhhh"
    );
    var tokendata = new tokenModel({
      name: checkuser._id,
      token: token,
      role: checkuser.role,
    });
    await tokendata.save();
    await checkuser.save();

    res.status(200).json({
      status: true,
      msg: "Login Success",
      data: checkuser,
      token: token,
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
//VERIFY
router.get("/token/authenticate", adminAuth, async (req, res) => {
  try {
    res.status(200).json({
      status: true,
      msg: "User Authenticated Successfully",
    });
    return;
  } catch (e) {
    res.status(200).json({
      status: false,
      msg: "Something went wrong",
    });
    return;
  }
});

//LOGOUT
router.get("/logout/", adminAuth, async (req, res) => {
  try {
    //var id = req.user.id
    // if (Misc.isnullorempty(id)) {
    //     res.status(200).json({
    //         status: false,
    //         msg: "id not provided"
    //     });
    //     return;
    // }
    var data = await tokenModel.deleteOne({ name: req.user.id });
    // console.log(data)
    res.status(200).json({
      status: true,
      msg: "logout success",
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
router.post('/admin/all/houseboat/bookings',adminAuth, async (req, res) => {
  try {
      var { page, limit ,keyword,fromDate,toDate,status,payedBy} = req.body;
      var pageNo = 0, dataLimit = 0;
    //  console.log(req.user.id)
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      var houseboatdata=await houseBoatModel.find({status:"Active"}).select("_id");
      var hbids=await houseboatdata.map(x=>x._id)
      var query={status: "Active" ,houseBoatId:{$in:hbids},paymentStatus:"Success"};
      var query1={};
      if (keyword) {
        query1["houseBoatId.houseBoatName"] = { $regex: keyword, $options: "i" };
      }
        var currentDate=new Date();
        if(status){
          if(status=="Active"){
            query.endDate={ $gte: currentDate };
          }
          else if(status=="Inactive"){
            query.endDate={ $lte: currentDate };
          }
          else if(status=="Cancelled"){
            query.status="Cancelled";
          }
        }
        if(payedBy){
          if(payedBy=="Agent"){
            query.bookingType="Agent";
          }
          else if(payedBy=="Customer"){
            query.bookingType="Customer";
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
router.post('/admin/all/shikara/bookings',adminAuth, async (req, res) => {
  try {
      var { page, limit,fromDate,toDate,keyword,status,payedBy } = req.body;
      var pageNo = 0, dataLimit = 0;
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      var shikaradata=await shikaraModel.find({status:"Active"}).select("_id");
      var sids=await shikaradata.map(x=>x._id)
      var query={status: "Active" ,shikaraid:{$in:sids},/*paymentStatus:"Success"*/advancepaymentStatus:"Success"};
      var query1={};
      if (keyword) {
          query1["shikaraid.shikaraName"] = { $regex: keyword, $options: "i" };
      }
      var currentDate=new Date();
      if(status){
        if(status=="Active"){
          query.selectedDate={ $gte: currentDate };
        }
        else if(status=="Inactive"){
          query.selectedDate={ $lte: currentDate };
        }
        else if(status=="Cancelled"){
          query.status="Cancelled";
        }
      }
      if(payedBy){
        if(payedBy=="Agent"){
          query.bookingType="Agent";
        }
        else if(payedBy=="Customer"){
          query.bookingType="Customer";
        }
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
      //var count=await shikaraBookingModel.countDocuments(query);
      var count = await shikaraBookingModel.aggregate([
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

router.post("/admin/houseboat/trip/edit", adminAuth, async (req, res) => {
  try {
    var {
      tripId,
      tripType,
      addionalRules,
      houseBoatType,
      checkInTime,
      checkOutTime,
      maxCapacityOfBoat,
      minCapacityOfBoat,
      mealPlan,
      maxPersonPerRoom,
      firstDayStartTime,
      firstDayEndTime,
      secondDayStartTime,
      secondDayEndTime,
      maxPersonTrip,
      minPersonTrip,
      extraPersonPerRoom,
    } = req.body;
    var checkboat = await tripTypeModel.findOne({
      _id: tripId,
      status: "Active",
    }).populate("houseBoatId");
    if (Misc.isnullorempty(checkboat)) {
      res.status(200).json({
        status: false,
        msg: "Trip Details  Not Found",
      });
      return;
    }
    if(Misc.isnullorempty(extraPersonPerRoom)){
      extraPersonPerRoom=0;
    }
    maxPersonPerRoom=parseInt(maxPersonPerRoom);
    extraPersonPerRoom=parseInt(extraPersonPerRoom);
    maxCapacityOfBoat=parseInt(maxCapacityOfBoat);
    var calculatedMaxCapacityWithExtra = (maxPersonPerRoom +extraPersonPerRoom)* (checkboat.houseBoatId.totalRooms);
    if ( maxCapacityOfBoat>calculatedMaxCapacityWithExtra ) {
      res.status(200).json({
        status: false,
        msg: "Mismatched MaxCapacityOfBoat",
      });
      return;
    }
    if (tripType) {
      checkboat.tripType = tripType;
    }
    if (houseBoatType) {
      if (!Array.isArray(houseBoatType) || houseBoatType.length === 0) {
        res.status(200).json({
          status: false,
          msg: "HouseBoat Type must be a non-empty array",
        });
        return;
      }
      checkboat.houseBoatType = houseBoatType;
    }
    if (addionalRules) {
      checkboat.addionalRules = addionalRules;
    }
    if (checkInTime) {
      checkboat.checkInTime = checkInTime;
    }
    if (checkOutTime) {
      checkboat.checkOutTime = checkOutTime;
    }
    if (maxCapacityOfBoat) {
      checkboat.maxCapacityOfBoat = maxCapacityOfBoat;
      checkboat.maxCapacityOfBoats = parseFloat(maxCapacityOfBoat);

    }
    if (minCapacityOfBoat) {
      checkboat.minCapacityOfBoat = minCapacityOfBoat;
      checkboat.minCapacityOfBoats = parseFloat(minCapacityOfBoat);
    }
   
      if (!Misc.isnullorempty(mealPlan.welcomeDrink)) {
        checkboat.mealPlan.welcomeDrink = mealPlan.welcomeDrink;
      }
      if (!Misc.isnullorempty(mealPlan.lunch)) {
        checkboat.mealPlan.lunch = mealPlan.lunch;
      }
      if (!Misc.isnullorempty(mealPlan.teaOrsnacks)) {
        checkboat.mealPlan.teaOrsnacks = mealPlan.teaOrsnacks;
      }
      if (!Misc.isnullorempty(mealPlan.dinner)) {
        checkboat.mealPlan.dinner = mealPlan.dinner;
      }
      if (!Misc.isnullorempty(mealPlan.breakfast)) {
        checkboat.mealPlan.breakfast = mealPlan.breakfast;
      } 
    if (maxPersonPerRoom) {
      checkboat.maxPersonPerRoom = maxPersonPerRoom;
      checkboat.maxPersonPerRooms = parseFloat(maxPersonPerRoom);

    }
    if (firstDayStartTime) {
      checkboat.firstDayStartTime = firstDayStartTime;
    }
    if (firstDayEndTime) {
      checkboat.firstDayEndTime = firstDayEndTime;
    }
    if (secondDayStartTime) {
      checkboat.secondDayStartTime = secondDayStartTime;
    }
    if (secondDayEndTime) {
      checkboat.secondDayEndTime = secondDayEndTime;
    }
    if (maxPersonTrip) {
      checkboat.maxPersonTrip = maxPersonTrip;
      checkboat.maxPersonTrips = parseFloat(maxPersonTrip);
    }
    if (minPersonTrip) {
      checkboat.minPersonTrip = minPersonTrip;
      checkboat.minPersonTrips = parseFloat(minPersonTrip);
    }
    if(extraPersonPerRoom){
      checkboat.extraPersonPerRoom = extraPersonPerRoom;
      checkboat.extraPersonPerRooms = parseFloat(extraPersonPerRoom);
    }

    await checkboat.save();
    res.status(200).json({
      status: true,
      data: checkboat,
      msg: "Updated Successfully",
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
router.post('/admin/houseboat/bookings/details', async (req, res) => {
  try {
      var { bookingId } = req.body;  //houseboatBookId is given from frontend
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      var d = await houseboatBookingModel.findOne({ _id: bookingId, status: "Active" }).populate("houseBoatIds").populate({path:"userid",populate:{path:"agentId"}})

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
router.post('/admin/shikara/bookings/details', async (req, res) => {
  try {
      var { bookingId } = req.body;
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      var d = await shikaraBookingModel.findOne({ _id: bookingId, status: "Active" }).populate("shikaraid");
      console.log(d)
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

});
router.post(
  "/admin/shikara/edit",
  adminAuth,
  async (req, res) => {
    try {
      var { id, shikaraName, totalSeats, facilities,addionalRules,location ,startingLocation} = req.body;
      var checkboat = await shikaraModel.findOne({
        _id: id,
        status: "Active",
      });
      if (Misc.isnullorempty(checkboat)) {
        res.status(200).json({
          status: false,
          msg: "Boat Details Not Found",
        });
        return;
      }
       var recheckname=shikaraName.trim();
        if (Misc.isnullorempty(recheckname)){
          res.status(200).json({
            status: false,
            msg: "Please Provide Name"
          });
          return;
        }

        if (shikaraName) {
        var catrgyname = await shikaraModel.findOne({ _id:{$ne:id}, shikaraName:recheckname, status: "Active" })
        if (!Misc.isnullorempty(catrgyname)) {
          console.log(12)
          res.status(200).json({
            status: false,
            msg: "name already there"
          });
          return;
        }
        checkboat.shikaraName = shikaraName;
      }
      if (totalSeats) {
        if (parseInt(totalSeats) <= 0) {
          res.status(200).json({
            status: false,
            msg: "Total seats should be greater than zero",
          });
          return;
        }
        checkboat.totalSeats = totalSeats;
      }
      if (!Misc.isnullorempty(facilities.airCondition)) {
        checkboat.facilities.airCondition = facilities.airCondition;
      }
      if (!Misc.isnullorempty(facilities.towels)) {
        checkboat.facilities.towels = facilities.towels;
      }
      if (!Misc.isnullorempty(facilities.parking)) {
        checkboat.facilities.parking = facilities.parking;
      }
      if (!Misc.isnullorempty(facilities.restrooms)) {
        checkboat.facilities.restrooms = facilities.restrooms;
      }
      if (!Misc.isnullorempty(facilities.lifeJacket)) {
        checkboat.facilities.lifeJacket = facilities.lifeJacket;
      }
      if (!Misc.isnullorempty(facilities.wifi)) {
        checkboat.facilities.wifi = facilities.wifi;
      }
      if (!Misc.isnullorempty(facilities.television)) {
        checkboat.facilities.television = facilities.television;
      }
      if (!Misc.isnullorempty(facilities.toilet)) {
        checkboat.facilities.toilet = facilities.toilet;
      }
      if (addionalRules) {
        checkboat.addionalRules = addionalRules;
      }
      if (location) {
        checkboat.location = location;
      }
      if (startingLocation) {
        checkboat.startingLocation = startingLocation;
      }
      await checkboat.save();

      res.status(200).json({
        status: true,
        data: checkboat,
        msg: "Updated Successfully",
      });
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: false,
        msg: "Internal server error",
      });
    }
  }
);
router.post(
  "/admin/houseboat/edit",
  adminAuth,
  async (req, res) => {
    try {
      var { id, houseBoatName, category, facilities, totalRooms,location,startingLocation } = req.body;
      if(Misc.isnullorempty(id)){
        res.status(200).json({
          status: false,
          msg: "Please Provide Id"
        });
        return;
      }
      var checkboat = await houseBoatModel.findOne({
        _id: id,
        status: "Active",
      });
      if (Misc.isnullorempty(checkboat)) {
        res.status(200).json({
          status: false,
          msg: "Boat Details Not Found",
        });
        return;
      }
        // console.log(typeof houseBoatName);
        var recheckname=houseBoatName.trim();
        if (Misc.isnullorempty(recheckname)){
          res.status(200).json({
            status: false,
            msg: "Please Provide Name"
          });
          return;
        }

        if (houseBoatName) {
        var catrgyname = await houseBoatModel.findOne({ _id:{$ne:id}, houseBoatName:recheckname, status: "Active" })
        if (!Misc.isnullorempty(catrgyname)) {
          console.log(12)
          res.status(200).json({
            status: false,
            msg: "houseboat name already there"
          });
          return;
        }
        checkboat.houseBoatName = houseBoatName;
      }
      if (category) {
        checkboat.category = category;
      }
      if (totalRooms) {
        if (parseInt(totalRooms) <= 0) {
          res.status(200).json({
            status: false,
            msg: "Total room should be greater than zero",
          });
          return;
        }
        checkboat.totalRooms = totalRooms;
      }
      if (!Misc.isnullorempty(facilities.airCondition)) {
        checkboat.facilities.airCondition = facilities.airCondition;
      }
      if (!Misc.isnullorempty(facilities.kettle)) {
        checkboat.facilities.kettle = facilities.kettle;
      }
      if (!Misc.isnullorempty(facilities.parking)) {
        checkboat.facilities.parking = facilities.parking;
      }
      if (!Misc.isnullorempty(facilities.restrooms)) {
        checkboat.facilities.restrooms = facilities.restrooms;
      }
      if (!Misc.isnullorempty(facilities.lifeJacket)) {
        checkboat.facilities.lifeJacket = facilities.lifeJacket;
      }
      if (!Misc.isnullorempty(facilities.wifi)) {
        checkboat.facilities.wifi = facilities.wifi;
      }
      if (!Misc.isnullorempty(facilities.television)) {
        checkboat.facilities.television = facilities.television;
      }
      if (!Misc.isnullorempty(facilities.swimmingPool)) {
        checkboat.facilities.swimmingPool = facilities.swimmingPool;
      }
      if (!Misc.isnullorempty(facilities.powerbackup)) {
        checkboat.facilities.powerbackup = facilities.powerbackup;
      }
      if (!Misc.isnullorempty(facilities.fireextinguisher)) {
        checkboat.facilities.fireextinguisher = facilities.fireextinguisher;
      }
      if (location) {
        checkboat.location = location;
      }
      if (startingLocation) {
        checkboat.startingLocation = startingLocation;
      }
      await checkboat.save();

      res.status(200).json({
        status: true,
        data: checkboat,
        msg: "Updated Successfully",
      });
      return;
    } catch (err) {
      console.log(err);
      res.status(500).json({
        status: false,
        msg: "Internal server error",
      });
    }
  }
);
router.post(
  "/admin/houseboat/proofupload",
  adminAuth,
  upload.fields([
    { name: "propertyImages", maxCount: 10 },
    { name: "boatLicenseProof", maxCount: 1 },
    { name: "leaseProof", maxCount: 1 },
    { name: "fullImage", maxCount: 1},
    { name: "upperImage", maxCount: 1},
    { name: "interiorImage", maxCount: 1},
    { name: "roomImage", maxCount: 10 },
    { name: "coverImage", maxCount: 1},
  ]),
  async (req, res) => {
    try {
      // if (Object.keys(req.files).length < 1) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "Empty field",
      //   });
      //   return;
      // }
      // if (!(req.files.leaseProof)) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "leaseProof is empty",
      //   });
      //   return;
      // }
      // if (!(req.files.boatLicenseProof)) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "license proof is empty",
      //   });
      //   return;
      // }

      const { id } = req.body;
      data = await houseBoatModel.findById(id);
      if (!data) {
        res.status(200).json({
          status: false,
          msg: "failed to find  data",
        });
        return;
      }
      if (req.files.propertyImages) {
        if (req.files.propertyImages.length > 0) {
          var len = req.files["propertyImages"].length;
          var photo = [];
          if (data.propertyImages) photo = data.propertyImages;
          for (var i = 0; i < len; i++) {
            req.files["propertyImages"][i].key =
              req.files["propertyImages"][i].key;
            photo.push(req.files["propertyImages"][i].key);
            if (req.files["propertyImages"][i].size > 5000000) {
              res.status(200).json({
                status: false,
                msg: "file must be less than 5MB",
              });
              return;
            }
          }
          if (photo) {
            data.propertyImages = photo;
          }
          await data.save();
        }
      }
      if (req.files) {
        if (req.files.boatLicenseProof) {
          data.boatLicenseProof = req.files.boatLicenseProof[0].key;
        }
        await data.save();
      }
      if (req.files) {
        if (req.files.leaseProof) {
          data.leaseProof = req.files.leaseProof[0].key;
        }
        await data.save();
      }
      if (req.files) {
        if (req.files.fullImage) {
          data.fullImage = req.files.fullImage[0].key;
        }
        await data.save();
    }
      if (req.files) {
        if (req.files.upperImage) {
          data.upperImage = req.files.upperImage[0].key;
        }
        await data.save();
    }
      if (req.files) {
          if (req.files.interiorImage) {
            data.interiorImage = req.files.interiorImage[0].key;
          }
          await data.save();
      }
      if (req.files.roomImage) {
        if (req.files.roomImage.length > 0) {
          var len = req.files["roomImage"].length;
          var photo = [];
          if (data.roomImage) photo = data.roomImage;
          for (var i = 0; i < len; i++) {
            req.files["roomImage"][i].key =
              req.files["roomImage"][i].key;
            photo.push(req.files["roomImage"][i].key);
            if (req.files["roomImage"][i].size > 5000000) {
              res.status(200).json({
                status: false,
                msg: "file must be less than 5MB",
              });
              return;
            }
          }
          if (photo) {
            data.roomImage = photo;
          }
          await data.save();
        }
      }
      if (req.files) {
        if (req.files.coverImage) {
          data.coverImage = req.files.coverImage[0].key;
        }
        await data.save();
      }
      res.status(200).json({
        status: true,
        id: data._id,
        data: data,
        msg: "images updated",
      });

      return;
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: false,
        msg: "internal server error",
      });
      return;
    }
  }
);
router.post(
  "/admin/houseboat/removeimagesingle",
  adminAuth,
  async (req, res) => {
    var { houseboatId, position } = req.body;
    try {
      if (Misc.isnullorempty(houseboatId) || Misc.isnullorempty(position)) {
        res.status(200).json({
          status: false,
          msg: "houseboatId & position are mandatory",
        });
        return;
      }

      var data = await houseBoatModel.findOne({_id:houseboatId,status:"Active"});
      if (!data) {
        res.status(200).json({
          status: false,
          msg: "failed to find houseboat",
        });
        return;
      }

     // position--; //since index starts at 0 & position at 1
      var allphotos = data.propertyImages;
      if (position >= allphotos.length) {
        res.status(200).json({
          status: false,
          msg: "There are no image in the given position",
        });
        return;
      }
      allphotos.splice(position, 1);
      data.photos = allphotos;
      await houseBoatModel.findByIdAndUpdate(data._id, { propertyImages: allphotos });
      res.status(200).json({
        status: true,
        id: data._id,
        msg: "image removed",
      });
    } catch (e) {
      res.status(200).json({
        status: false,
        msg: "internal server error",
      });
    }
  }
);
router.post(
  "/admin/shikara/propertyimage/upload",
  adminAuth,
  upload.fields([{ name: "propertyImages", maxCount: 10 }, { name: "boatLicenseProof", maxCount: 1 }, { name: "leaseProof", maxCount: 1 },{ name: "coverImage", maxCount: 1 }]),
  async (req, res) => {

    try {
      // if (Object.keys(req.files).length < 1) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "Empty field",
      //   });
      //   return;
      // }
      // if (!(req.files.leaseProof)) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "Empty leaseProof",
      //   });
      //   return;
      // }
      // if (!(req.files.boatLicenseProof)) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "Empty boatLicenseProof",
      //   });
      //   return;
      // }

      const { id } = req.body;
      data = await shikaraModel.findById(id);
      if (!data) {
        res.status(200).json({
          status: false,
          msg: "failed to find  data",
        });
        return;
      }
      if(req.files.propertyImages){
         if( req.files.propertyImages.length > 0){
          var len = req.files["propertyImages"].length;
          var photo = [];
          if (data.propertyImages)
            photo = data.propertyImages;
          for (var i = 0; i < len; i++) {
            req.files["propertyImages"][i].key = req.files["propertyImages"][i].key;
            photo.push(req.files["propertyImages"][i].key);
            if (req.files["propertyImages"][i].size > 5000000) {
              res.status(200).json({
                status: false,
                msg: "file must be less than 5MB",
              });
              return;
            }
      }
      if (photo) {
        data.propertyImages = photo;
      }
      await data.save();
       }
    }
      if (req.files) {
        if (req.files.boatLicenseProof) {
          data.boatLicenseProof = req.files.boatLicenseProof[0].key
        }
        await data.save()
      }
      if (req.files) {
        if (req.files.leaseProof) {
          data.leaseProof = req.files.leaseProof[0].key
        }
        await data.save()
      }
      if (req.files) {
        if (req.files.coverImage) {
          console.log(34567)
          data.coverImage = req.files.coverImage[0].key
        }
        // else{
        //   data.coverImage="";
        // }
        await data.save()
      }
      res.status(200).json({
        status: true,
        id: data._id,
        data: data,
        msg: "images updated",
      });

      return;
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: false,
        msg: "internal server error",
      });
      return;
    }
  }
);
router.post(
  "/admin/shikara/removeimagesingle",
  adminAuth,
  async (req, res) => {
    var { shikaraId, position } = req.body;
    try {
      if (Misc.isnullorempty(shikaraId) || Misc.isnullorempty(position)) {
        res.status(200).json({
          status: false,
          msg: "shikaraId & position are mandatory",
        });
        return;
      }

      var data = await shikaraModel.findOne({_id:shikaraId,status:"Active"});
      if (!data) {
        res.status(200).json({
          status: false,
          msg: "failed to find shikara",
        });
        return;
      }

     // position--; //since index starts at 0 & position at 1
      var allphotos = data.propertyImages;
      if (position >= allphotos.length) {
        res.status(200).json({
          status: false,
          msg: "There are no image in the given position",
        });
        return;
      }
      allphotos.splice(position, 1);
      data.photos = allphotos;
      await shikaraModel.findByIdAndUpdate(data._id, { propertyImages: allphotos });
      res.status(200).json({
        status: true,
        id: data._id,
        msg: "image removed",
      });
    } catch (e) {
      res.status(200).json({
        status: false,
        msg: "internal server error",
      });
    }
  }
);
router.get("/admin/houseboat/delete", adminAuth, async (req, res) => {
  try {
    var { id } = req.query;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var houseboat = await houseBoatModel.findOne({ _id: id, status: "Active" });
    if (Misc.isnullorempty(houseboat)) {
      res.status(200).json({
        status: false,
        msg: "data not found",
      });
      return;
    }

    houseboat.status = "Deleted";
    await houseboat.save();
    res.status(200).json({
      status: true,
      msg: "Deleted",
      data: houseboat,
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
router.get("/admin/shikara/delete", adminAuth, async (req, res) => {
  try {
    var { id } = req.query;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var houseboat = await shikaraModel.findOne({ _id: id, status: "Active" });
    if (Misc.isnullorempty(houseboat)) {
      res.status(200).json({
        status: false,
        msg: "data not found",
      });
      return;
    }

    houseboat.status = "Deleted";
    await houseboat.save();
    res.status(200).json({
      status: true,
      msg: "Deleted",
      data: houseboat,
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
async function getPieChartData() {
  try {
    // Assuming you have the total booking count
    var totalhbBookingCount = await houseboatBookingItemModel.countDocuments({ status: "Active",paymentStatus:"Success" });
    var totalskBookingCount = await shikaraBookingModel.countDocuments({advancepaymentStatus:"Success" , status: "Active" });
    
    var totalCount=totalhbBookingCount+totalskBookingCount;

    var hbCount = await houseboatBookingItemModel.countDocuments({ status: "Active",paymentStatus:"Success" });
    var shiakraCount = await shikaraBookingModel.countDocuments({ status: "Active",advancepaymentStatus:"Success" });
  
    // Calculate percentages
    var shiakraPercentage = totalCount !== 0 ? (shiakraCount / totalCount) * 100 : 0;
    var hbPercentage = totalCount !== 0 ? (hbCount / totalCount) * 100 : 0;

    //  shiakraPercentage = (shiakraCount/ totalCount) * 100;
    //  hbPercentage = (hbCount / totalCount) * 100;

    var pieChartData = [
      { name: "Shikara", percentage: shiakraPercentage },
      { name: "HB", percentage: hbPercentage },
    ];

    return { status: true, data: pieChartData };
  } catch (e) {
    return { status: false, error: e.message };
  }
}
async function getPieChartUserCount() {
  try {
   
    var totalCount = await userModel.countDocuments({verificationStatus:"Verified" ,role:{$in:["Vendor","Agent"]}, status: "Active" });
    
    var vendorCount = await userModel.countDocuments({ status: "Active",verificationStatus:"Verified",role:"Vendor" });
    var agentCount = await userModel.countDocuments({ status: "Active",verificationStatus:"Verified" ,role:"Agent" });
  
    
    //  vendorPercentage = (vendorCount/ totalCount) * 100;
    //  agentPercentage = (agentCount / totalCount) * 100;
    var vendorPercentage = totalCount !== 0 ? (vendorCount / totalCount) * 100 : 0;
    var agentPercentage = totalCount !== 0 ? (agentCount / totalCount) * 100 : 0;

    var pieChartData = [
      { name: "Vendor", percentage: vendorPercentage },
      { name: "Agent", percentage: agentPercentage },
    ];

    return { status: true, data: pieChartData };
  } catch (e) {
    return { status: false, error: e.message };
  }
}
async function getPieChartHBTripType() {
  try {
  var totalhbBookingCount = await houseboatBookingItemModel.countDocuments({ status: "Active",paymentStatus:"Success" ,tripType:{$in:["DayCruise","NightStay","OverNight"]}});
  console.log(totalhbBookingCount,"totalhbBookingCount");
    var hbDayCount = await houseboatBookingItemModel.countDocuments({ status: "Active",paymentStatus:"Success" ,tripType:"DayCruise"});
    var hbNightCount = await houseboatBookingItemModel.countDocuments({ status: "Active",paymentStatus:"Success" ,tripType:"NightStay"});
    var hbOvernightCount=await houseboatBookingItemModel.countDocuments({ status: "Active",paymentStatus:"Success" ,tripType:"OverNight"});
    // Calculate percentages
    var hbDayPercentage = totalhbBookingCount !== 0 ? (hbDayCount / totalhbBookingCount) * 100 : 0;
    var hbNightPercentage = totalhbBookingCount !== 0 ? (hbNightCount / totalhbBookingCount) * 100 : 0;
    var hbOvernightPercentage = totalhbBookingCount !== 0 ? (hbOvernightCount / totalhbBookingCount) * 100 : 0;


    var pieChartData = [
      { name: "HBDay", percentage: hbDayPercentage },
      { name: "HBNight", percentage: hbNightPercentage },
      { name: "HBOverNight", percentage: hbOvernightPercentage },
    ];

    return { status: true, data: pieChartData };
  } catch (e) {
    return { status: false, error: e.message };
  }
}
async function getPieHBCustomerOrAgent() {
  try {
   var totalhbBookingCount = await houseboatBookingItemModel.countDocuments({ status: "Active",paymentStatus:"Success"});
    var hbCustomer = await houseboatBookingItemModel.countDocuments({ status: "Active",paymentStatus:"Success" ,bookingType:"Customer"});
    var hbAgent = await houseboatBookingItemModel.countDocuments({ status: "Active",paymentStatus:"Success" ,bookingType:"Agent"});
  
  
    var pieChartData = [
      { name: "HBCustomer", count: hbCustomer },
      { name: "HBAgent", count: hbAgent },
    ];

    return { status: true, data: pieChartData };
  } catch (e) {
    return { status: false, error: e.message };
  }
}
//admin panel dashboard graph
router.post("/dashboard/graph", async (req, res) => {
  try {
    
    var data=await getPieChartData();
    var data2=await getPieChartUserCount();
    var data3=await getPieChartHBTripType();
    var data4=await getPieHBCustomerOrAgent();
    res.status(200).json({
      status: true,
      BookingData: data,
      UserData: data2,
      hbTripData:data3,
      hbCustomerOrAgentData:data4,
      msg: "Success",
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
module.exports = router;
