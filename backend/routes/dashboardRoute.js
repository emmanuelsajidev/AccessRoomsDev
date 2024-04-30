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
const houseBoatModel=require("../models/houseBoatModel");
const shikaraModel=require("../models/shikaraModel");
const houseboatBookingItemModel=require("../models/houseboatBookingItemModel");
const shikaraBookingModel=require('../models/shikaraBookingModel');
const reservationModel=require('../models/reservationModel');
//  for admin panel

router.post("/dashboard/count", adminAuth, async (req, res) => {
      try {
        
       
       var agentCount=await userModel.countDocuments({role:"Agent",level:4,status:"Active",verificationStatus:"Verified"});
       var vendorCount=await userModel.countDocuments({role:"Vendor",level:4,status:"Active",verificationStatus:"Verified"});
    
      //  var reservcount=await reservationModel.countDocuments({status:"Active",reservationStatus:"Reserved"});
       var HBreservcount=await reservationModel.countDocuments({status:"Active",reservationStatus:"Reserved",houseBoatId:{$ne:null}});
       var SKreservcount=await reservationModel.countDocuments({status:"Active",reservationStatus:"Reserved",shikaraId:{$ne:null}});
       var reservcount=HBreservcount+SKreservcount;
       var hbbookig=await houseboatBookingItemModel.countDocuments({status:"Active",paymentStatus:"Success"});
       var shikarabook=await shikaraBookingModel.countDocuments({status:"Active",advancepaymentStatus:"Success"});
       var totalbook=hbbookig+shikarabook;
       res.status(200).json({
          status: true,
          agentCount: agentCount,
          vendorCount:vendorCount,
          hbbookigCount:hbbookig,
          shikarabookCount:shikarabook,
          totalbooking:totalbook,
          reservationcount:reservcount,
          HBreservcount:HBreservcount,
          SKreservcount:SKreservcount,
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

//for web
router.post("/dashboard/data",vendorAuth, async (req, res) => {
      try {
        
       
       
     
      var query={status:"Active",paymentStatus:"Success"};
      var query1={status:"Active",advancepaymentStatus:"Success"}
      var hbdata = await houseboatBookingItemModel.aggregate([
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
        {$match:{"houseBoatId.userid":new mongoose.Types.ObjectId(req.user.id)}}
      ]);
      var shikdata = await shikaraBookingModel.aggregate([
        { $match: query1 },
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
        {$match:{"shikaraid.userid":new mongoose.Types.ObjectId(req.user.id)}}
      ]);
      var hbcount=hbdata.length;
      console.log(hbcount,"hbl");
      var shikcount=shikdata.length;
      var bookingCount=hbcount+shikcount;
       var reserveCount=await reservationModel.countDocuments({addedBy:req.user.id,reservationStatus:"Reserved",status:"Active"});


       var data=[
        {
          name:"Total Bookings",
          count:bookingCount
         },
        {
          name:"Reservations",
          count:reserveCount
       }
      ]
      var vendorData = await userModel
      .findOne({ _id: req.user.id, status: "Active" })
      .populate("vendorCategory");
      for(var i=0;i<vendorData.vendorCategory.length;i++){
        if(vendorData.vendorCategory[i].categoryType=="Shikara"){
          var shikaraCount=await shikaraModel.countDocuments({userid:req.user.id,status:"Active",shikaraStatus:"Approved"});
          data.push({
            name:"Shikaras",
            count:shikaraCount
          });
        }
        if(vendorData.vendorCategory[i].categoryType=="Houseboat"){
        var houseBoatCount=await houseBoatModel.countDocuments({userid:req.user.id,status:"Active",houseBoatStatus:"Approved"});
          data.push({
            name:"Houseboats",
            count:houseBoatCount
          });
       }
      }
     
     
        res.status(200).json({
          status: true,
          data:data,
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
//vendor dashboard bookings

router.post("/vendor/dashboard/recentbookings",vendorAuth, async (req, res) => {
  try {
    
  var query={status:"Active",paymentStatus:"Success"};
  var query1={"houseBoatId.userid":new mongoose.Types.ObjectId(req.user.id)}
  var query2={status:"Active",advancepaymentStatus:"Success"};
  var query3={"shikaraid.userid":new mongoose.Types.ObjectId(req.user.id)};
 
 var latestHouseboatBooking = await houseboatBookingItemModel.aggregate([
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
  { $match: query1 },
  {
    $lookup: {
        from: "sublocationmodels", // Adjust this based on your actual sublocation model name
        localField: "houseBoatId.startingLocation",
        foreignField: "_id",
        as: "houseBoatId.startingLocation",
    },
 },
 {
  $unwind: { path: "$houseBoatId.startingLocation", preserveNullAndEmptyArrays: true },
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
  $unwind: { path: "$houseBoatId.location", preserveNullAndEmptyArrays: true },
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
  { $match: query },
  {$sort:{created_at:-1}},
  {$limit:1}
]);
var latestShikaraBooking = await shikaraBookingModel.aggregate([
  { $match: query2 },
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
  { $match: query3 },
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
  {$sort:{created_at:-1}},
  { $limit: 1 } 
]);
  // Combine the results and send them as a response
  var latestBookings = {
      shikara: latestShikaraBooking[0],
      houseboat: latestHouseboatBooking[0]
  };
    res.status(200).json({
      status: true,
      data:latestBookings,
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


router.post("/vendor/dashboard/booking",vendorAuth, async (req, res) => {
  try {

    var vendorId = req.user.id;

    // Query to count total houseboat bookings with successful payment status
    var totalHBQuery = { status: "Active", paymentStatus: "Success", vendorName: vendorId };
    var totalHBCount = await houseboatBookingItemModel.countDocuments(totalHBQuery);

    // Query to count total shikara bookings with successful advance payment status
    var totalSKQuery = { status: "Active", advancepaymentStatus: "Success"};
    var totalSKQuery1={"shikaraid.userid":new mongoose.Types.ObjectId(vendorId)};
    var data = await shikaraBookingModel.aggregate([
      { $match: totalSKQuery },
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
      { $match: totalSKQuery1 },
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
      {$sort:{created_at:-1}},
    ]);
    var totalSKCount=data.length;

    // Query to count total houseboat bookings with successful payment status for all vendors
    var allTotalHBQuery = { status: "Active", paymentStatus: "Success" };
    var allTotalHBCount = await houseboatBookingItemModel.countDocuments(allTotalHBQuery);
    
    // Query to count total shikara bookings with successful advance payment status for all vendors
    var allTotalSKQuery = { status: "Active", advancepaymentStatus: "Success" };
    var allTotalSKCount = await shikaraBookingModel.countDocuments(allTotalSKQuery);


    // Calculate the percentages
    var hbPercentage = (totalHBCount / allTotalHBCount) * 100;
    var skPercentage = (totalSKCount / allTotalSKCount) * 100;
    
    // var data = [
    //   {
    //     name: "HouseBoat",
    //     count: totalHBCount,
    //     percentage: hbPercentage.toFixed(2) + "%"
    //   },
    //   {
    //     name: "Shikaras",
    //     count: totalSKCount,
    //     percentage: skPercentage.toFixed(2) + "%"
    //   }
    // ];
    var data=[];
    var vendorData = await userModel
    .findOne({ _id: req.user.id, status: "Active" })
    .populate("vendorCategory");
    for(var i=0;i<vendorData.vendorCategory.length;i++){
      if(vendorData.vendorCategory[i].categoryType=="Shikara"){
        data.push({
          name: "Shikaras",
          count: totalSKCount,
          percentage: skPercentage.toFixed(2) + "%"
        });
      }
      if(vendorData.vendorCategory[i].categoryType=="Houseboat"){
          data.push({
          name: "HouseBoat",
          count: totalHBCount,
          percentage: hbPercentage.toFixed(2) + "%"
        });
     }
    }
    res.status(200).json({
      status: true,
      data:data,
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