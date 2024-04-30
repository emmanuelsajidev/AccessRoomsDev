const express = require("express");
const router = express();
var jwt = require("jsonwebtoken");
const Misc = require("../controllers/Misc");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const tokenModel = require("../models/tokenModel");
const ifToken = require("../middleware/ifToken");
const userModel = require("../models/userModel");
const customerModel = require("../models/customerModel");
const otpModel = require("../models/otpModel");
const EmailHelper = require("../controllers/Email");
const interactHelper = require("../controllers/interactHelper");
const randomstring = require("randomstring");
const guestOrUser=require("../middleware/guestOrUser");
const houseboatBookingModel = require("../models/houseboatBookingModel");
const houseboatBookingItemModel = require("../models/houseboatBookingItemModel");
const shikaraBookingModel = require("../models/shikaraBookingModel");
const adminAuth = require("../middleware/adminAuth");



//create guestid
router.post("/generate/guestid", async (req, res) => {
  try {
    var data = new userModel({
      role: 'Guest',
      name:'guest',
      password:'password',
      status: 'Guest'
  });
  await data.save();
  console.log("guestId=",data._id)
  res.status(200).json({
      status: true,
      msg: "done",
      id: data._id
  })
  return;
} catch (e) {
  console.log(e)
  res.status(500).json({
      status: false,
      msg: "Something went wrong",
  });
}
});
router.post("/customer/register", async (req, res) => {
  var { phoneNumber, name, password, email,whatsappCountryCode } = req.body;

  try {
    if (Misc.isnullorempty(phoneNumber)) {
      res.status(200).json({
        status: false,
        msg: "phoneNumber is required",
      });
      return;
    }
    if (Misc.isnullorempty(name)) {
      res.status(200).json({
        status: false,
        msg: "name is required",
      });
      return;
    }
    if (Misc.isnullorempty(password)) {
      res.status(200).json({
        status: false,
        msg: "password is required",
      });
      return;
    }
    if (Misc.isnullorempty(whatsappCountryCode)) {
      res.status(200).json({
        status: false,
        msg: "CountryCode is required",
      });
      return;
    }
    if (Misc.isnullorempty(email)) {
      res.status(200).json({
        status: false,
        msg: "email is required",
      });
      return;
    }
    data = await userModel.findOne({
      phoneNumber: phoneNumber,
      status: "Active",
    });
    if (data) {
      res.status(200).json({
        status: false,
        msg: "phoneNumber already exist",
      });
      return;
    }
    data = await userModel.findOne({
      email: email, status: "Active",
    });
    if (data) {
      res.status(200).json({
        status: false,
        msg: "email already exist",
      });
      return;
    }
    //checks complete now time to save
    //step1 hash password
     var passwordHashed = bcrypt.hashSync(password, bcrypt.genSaltSync(10)); //done

    var usr = userModel({
      name: name,
      phoneNumber: phoneNumber,
      role: "Customer",
      password: passwordHashed,
      whatsappCountryCode:whatsappCountryCode,
      status: "Active",
      email: email,
    });
    await usr.save();

    var customer = customerModel({
      userid: usr._id,
    });
    await customer.save();
    res.status(200).json({
      status: true,
      msg: "Registered Successfully",
      user: usr,
      id: usr._id,
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal server error",
    });
  }
});


async function UpdateGuestCart(userid, guestId) {
  try {
    var MyAllCart = await houseboatBookingItemModel.find({ status: "Active", userid: userid })
    console.log("MyAllCart=", MyAllCart)
    var MyAllCartGuest = await houseboatBookingItemModel.find({ status: "Active", userid: guestId })
    console.log("MyAllCartGuest=", MyAllCartGuest)

    // Combine both arrays and create a Set to store unique user IDs
    var uniqueUserIds = new Set([...MyAllCart.map(item => item.userid), ...MyAllCartGuest.map(item => item.userid)])

    // Convert the Set back to an array
    var uniqueUserIdsArray = [...uniqueUserIds]

    if (uniqueUserIdsArray.length > 0) {
      // Update only if there are unique user IDs
      await houseboatBookingItemModel.updateMany({ userid: guestId, status: "Active" }, { $set: { userid: userid } })
    }
    var MyAllSKCart = await shikaraBookingModel.find({ status: "Active", bookedbyid: userid })
    //console.log("MyAllSKCart=", MyAllSKCart)
    var MyAllCartSKGuest = await shikaraBookingModel.find({ status: "Active", bookedbyid: guestId })
   // console.log("MyAllCartSKGuest=", MyAllCartSKGuest)

    // Combine both arrays and create a Set to store unique user IDs
    var uniqueUserIds1 = new Set([...MyAllCart.map(item => item.userid), ...MyAllCartGuest.map(item => item.userid)])

    // Convert the Set back to an array
    var uniqueUserIdsArray1 = [...uniqueUserIds1]

    if (uniqueUserIdsArray1.length > 0) {
      // Update only if there are unique user IDs
      await shikaraBookingModel.updateMany({ bookedbyid: guestId, status: "Active" }, { $set: { bookedbyid: userid } })
    }
    return { status: true };
  } catch (e) {
    return { status: false }
  }
}
router.post("/customer/login",async (req, res) => {
  var { phoneNumber, password ,guestid} = req.body;
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
      phoneNumber: phoneNumber,
      status: "Active",
      role: "Customer"
    });
    if (Misc.isnullorempty(d)) {
      res.status(200).json({
        status: false,
        msg: "Invalid phone number",
      });
      return;
    }
    var cmpr = await bcrypt.compare(password, d.password)
    if (cmpr) {
      var token = jwt.sign({ id: d._id, phoneNumber: d.phoneNumber }, "shhhhh");
      var tokendata = new tokenModel({
        name: d._id,
        token: token,
        role: d.role,
      });
      await tokendata.save();
      


      if(!Misc.isnullorempty(guestid)){
        console.log("guestid****=",guestid)
        await UpdateGuestCart(d._id,guestid);
    }
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
async function sendOtp1(phoneNumber, email, uid, name, countrycode) {
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
router.post("/customer/forgot/password", async (req, res) => {
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
    }
    const otpResult = await sendOtp1(
      d.phoneNumber,
      d.email,
      d._id,
      d.name,
      d.whatsappCountryCode
    );

    res.status(200).json({
      status: true,
      msg: "Otp send successfully",
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

router.post("/customer/reset/password", async (req, res) => {
  try {
    var {  password,otp ,phoneNumber,email} =
      req.body;
  
    if (Misc.isnullorempty(password)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Password",
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
    }
    var phoneOTP = await otpModel.findOne({ uid: d._id, otp: otp });
    if (Misc.isnullorempty(phoneOTP)) {
      res.status(200).json({
        status: false,
        msg: "Invalid OTP",
      });
      return;
    }
    var encryptedPassword = await bcrypt.hash(password, 10);
    d.password = encryptedPassword;
    d.email = email;

    await d.save();
    var token = jwt.sign(
      {
        id: d._id,
        phoneNumber: d.phoneNumber,
      },
      "shhhhh"
    );
    var tokendata = new tokenModel({
      name: d._id,
      token: token,
      role: d.role,
    });
    await tokendata.save();
    // checkuser.isPassword = true;
    // checkuser.is_phone_verified = true;
    // await checkuser.save();
    res.status(200).json({
      status: true,
      msg: "Successfully Updated Password",
      data: d,
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
router.get("/customer/mybookings",guestOrUser, async (req, res) => {
  try {
    var { count, page  } = req.query;
    var query = {
      status: "Active",userid:req.user.id
    };
    if (Misc.isnullorempty(count)) count = 50;
    if (Misc.isnullorempty(page)) page = 1;
    var lm = parseInt(count);
    var pg = parseInt(page) * lm - lm;
    var data = [];
    var tot = await houseboatBookingModel.countDocuments(query);
    var totcount = tot;

    if (lm > 0) totcount = totcount / lm;
    totcount = Math.ceil(totcount);
    if (count == 0 && page == 0)
      data = await houseboatBookingModel.find(query).sort("-created_at");
    else
      data = await houseboatBookingModel
        .find(query)
        .sort("-created_at")
        .skip(pg)
        .limit(lm);

    res.status(200).json({
      status: true,
      data: data,
      pages: totcount,
      count: tot,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});

router.get('/customer/logout', ifToken, async (req, res) => {
  try {
      var id = req.user.id
      if (Misc.isnullorempty(id)) {
          res.status(200).json({
              status: false,
              msg: "id not provided"
          });
          return;
      }
      var data = await tokenModel.findOneAndRemove({name:id})
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

//get list of customer
router.get("/customer/getlist", adminAuth, async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query={role: "Customer", status: "Active"}
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
        ],
        role: "Customer",
        status: "Active"
      };
    }
    
    var data = await userModel.aggregate([
      { $match: query },
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

//customer booking cancellation
router.get("/customer/houseboat/booking/cancel", ifToken, async (req, res) => {
  try {
      var { id } = req.query;
      if (Misc.isnullorempty(id)) {
          res.status(200).json({
              status: false,
              msg: "Id is required",
          });
          return;
      }
      var data = await houseboatBookingItemModel.findOne({ _id: id, status: "Active",bookingType:"Customer" });
      if (Misc.isnullorempty(data)) {
          res.status(200).json({
              status: false,
              msg: "data not found",
          });
          return;
      }
      var checkinmainhbmodel=await houseboatBookingModel.findOne({ _id: data.houseboatBookId, status: "Active",bookingType:"Customer" });
      if(Misc.isnullorempty(checkinmainhbmodel)){
          res.status(200).json({
              status: false,
              msg: "data not found",
          });
          return;
      }
      data.status = "Cancelled";
      await data.save();
      checkinmainhbmodel.status = "Cancelled";
      await checkinmainhbmodel.save();
      res.status(200).json({
          status: true,
          msg: "Booking Cancelled ",
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
router.get("/customer/shikara/booking/cancel", ifToken, async (req, res) => {
  try {
      var { id } = req.query;
      if (Misc.isnullorempty(id)) {
          res.status(200).json({
              status: false,
              msg: "Id is required",
          });
          return;
      }
      var data = await shikaraBookingModel.findOne({ _id: id, status: "Active",bookingType:"Customer" });
      if (Misc.isnullorempty(data)) {
          res.status(200).json({
              status: false,
              msg: "data not found",
          });
          return;
      }
     
      data.status = "Cancelled";
      await data.save();
      res.status(200).json({
          status: true,
          msg: "Booking Cancelled ",
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



router.get("/customer/profile", ifToken, async (req, res) => {
  try {
    var data = await userModel
      .findOne({ _id: req.user.id, status: "Active",role:"Customer" });
    res.status(200).json({
      status: true,
      msg: "User profile",
      data: data
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
router.post("/customer/edit", ifToken, async (req, res) => {
  try {
    var { name, id, email } = req.body;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var edit = await userModel.findOne({
      _id: id,role:"Customer",
      status: "Active",
    });
    if (Misc.isnullorempty(edit)) {
      res.status(200).json({
        status: false,
        msg: "data not found",
      });
      return;
    }

    if (!Misc.isnullorempty(name)) {
      edit.name = name;
    }
    if (!Misc.isnullorempty(email)) {
      edit.email = email;
    }
    await edit.save();
    res.status(200).json({
      status: true,
      msg: "Updated Successfully",
      data: edit,
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
module.exports = router;
