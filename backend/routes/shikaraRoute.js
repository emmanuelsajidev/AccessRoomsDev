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
const adminAuth = require("../middleware/adminAuth");
const vendorAuth = require("../middleware/vendorAuth");
const shikaraModel = require("../models/shikaraModel");
const tripTypeModel = require("../models/tripTypeModel");
const tripPackageModel = require("../models/tripPackageModel")
const houseBoatModel = require("../models/houseBoatModel")
const  reviewModel=require("../models/reviewModel");

router.post("/shikara/add", vendorAuth, async (req, res) => {
  try {
    var {
      shikaraName,
      totalSeats,
      facilities,
      addionalRules,
      expiryType,
      expiryDate,location,startingLocation
    } = req.body;
    if (Misc.isnullorempty(shikaraName)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Shikara Name",
      });
      return;
    }
    if (Misc.isnullorempty(totalSeats)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide totalSeats",
      });
      return;
    }
    if (Misc.isnullorempty(location)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Location",
      });
      return;
    }
    if(parseInt(totalSeats)<=0){
      res.status(200).json({
        status: false,
        msg: "Please provide total seats greater than zero",
      });
      return;
    }
    if(expiryDate){
      const currentDateTime = new Date();
      const expiryDateTime = new Date(expiryDate);

      if (expiryDateTime <currentDateTime) {
        res.status(200).json({
          status: false,
          msg: "Expiry Date has already passed",
        });
        return;
      }
    }
    var checkshikara = await shikaraModel.findOne({
      shikaraName: { $regex: new RegExp("^" + shikaraName + "$", "ig") },
      status: "Active",userid:req.user.id
    });
    if (!Misc.isnullorempty(checkshikara)) {
      res.status(200).json({
        status: false,
        msg: "Shikara Name Already Exist",
      });
      return;
    }
    var checkvendor = await vendorModel.findOne({ userid: req.user.id, status: "Active" });

    var shikara = new shikaraModel({
      shikaraName: shikaraName,
      totalSeats: totalSeats,
      addionalRules: addionalRules,
      expiryType: expiryType,
      expiryDate: expiryDate,
      userid: req.user.id,
      vendorid: checkvendor._id,
      location:location,
      startingLocation:startingLocation
    });

    shikara.facilities.airCondition = facilities.airCondition;
    shikara.facilities.towels = facilities.towels;
    shikara.facilities.parking = facilities.parking;
    shikara.facilities.restrooms = facilities.restrooms;
    shikara.facilities.lifeJacket = facilities.lifeJacket;
    shikara.facilities.wifi = facilities.wifi;
    shikara.facilities.television = facilities.television;
    shikara.facilities.toilet = facilities.toilet;


    await shikara.save();

    res.status(200).json({
      status: true,
      data: shikara,
      msg: "Added Successfully",
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

router.get("/shikara/delete", vendorAuth, async (req, res) => {
  try {
    var { id } = req.query;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var shikara = await shikaraModel.findOne({ _id: id, status: "Active" });
    if (Misc.isnullorempty(shikara)) {
      res.status(200).json({
        status: false,
        msg: "data not found",
      });
      return;
    }

    shikara.status = "Deleted";
    await shikara.save();
    res.status(200).json({
      status: true,
      msg: "Deleted",
      data: shikara,
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

router.get("/shikara/getlist", vendorAuth, async (req, res) => {5 
  try {
    var { count, page, category,keyword } = req.query;
    var query = { status: "Active",shikaraStatus:{$in:["Approved","Pending","Blocked"]},userid:req.user.id };
    if (category) {
      query.category = category;
    }
    if(keyword){
      query.shikaraName = { $regex: keyword, $options: "i" };
    }
    if (Misc.isnullorempty(count)) count = 50;
    if (Misc.isnullorempty(page)) page = 1;
    var lm = parseInt(count);
    var pg = parseInt(page) * lm - lm;
    var data = [];
    var tot = await shikaraModel.countDocuments(query);
    var totcount = tot;

    if (lm > 0) totcount = totcount / lm;
    totcount = Math.ceil(totcount);
    if (count == 0 && page == 0){
      data = await shikaraModel.find(query).sort("-created_at");
    }
    else
      data = await shikaraModel
        .find(query)
        .sort("-created_at")
        .skip(pg)
        .limit(lm);
        //check if any shikara has any packages
      for(var i=0;i<data.length;i++){
        var packagecheck=await tripPackageModel.find({shikaraId:data[i]._id,status:"Active"});
        if(packagecheck.length>0){
          data[i].hasPackage=true;
        }else{
         data[i].hasPackage=false;
        }
      }
 
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
router.get("/shikara/all", adminAuth,async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query={shikaraStatus:"Pending",status:'Active'};
    if (keyword) {
      query['$or'] = [
          { shikaraName: { "$regex": (keyword), "$options": "i" } },
      ],
      {shikaraStatus:"Pending",status:'Active'};
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
    var data=await  shikaraModel.find(query).populate("userid").skip((pageNo - 1) * limit).limit(dataLimit).sort({ created_at: -1 });
    var totalLength=await  shikaraModel.countDocuments(query);
      res.status(200).json({
        status: true,
        data: data,
        page: pageNo,
        limit: dataLimit,
        totalLength:totalLength,
        msg:"Success"
      });

  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});
router.get("/shikara/approvedlist", adminAuth,async (req, res) => {
  try {
    var { limit, page, keyword,name } = req.query;
    var query={shikaraStatus:"Approved",status:'Active'};
    if (keyword) {
      query['$or'] = [
          { shikaraName: { "$regex": (keyword), "$options": "i" } },
      ],
      {shikaraStatus:"Approved",status:'Active'}
    }
    if(name){
      query.userid=new mongoose.Types.ObjectId(name);
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
    var data=await  shikaraModel.find(query).populate("userid").skip((pageNo - 1) * limit).limit(dataLimit).sort({ created_at: -1 });
    var totalLength=await  shikaraModel.countDocuments(query)
      res.status(200).json({
        status: true,
        data: data,
        page: pageNo,
        limit: dataLimit,
        totalLength:totalLength,
        msg:"Success"
      });

  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});
router.post("/shikara/approve", adminAuth, async (req, res) => {
  try {
    var {
      shikaraId
    } = req.body;
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide shikaraId",
      });
      return;
    }
  
    var checkshikara = await shikaraModel.findOne({
      _id:shikaraId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkshikara)) {
      res.status(200).json({
        status: false,
        msg: "Shikara  Not found",
      });
      return;
    }
    
     checkshikara.shikaraStatus="Approved";
     await checkshikara.save();

    res.status(200).json({
      status: true,
      data: checkshikara,
      msg: "Approved Successfully",
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
router.post("/shikara/reject", adminAuth, async (req, res) => {
  try {
    var {
      shikaraId
    } = req.body;
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide shikaraId",
      });
      return;
    }
  
    var checkshikara = await shikaraModel.findOne({
      _id:shikaraId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkshikara)) {
      res.status(200).json({
        status: false,
        msg: "Shikara  Not found",
      });
      return;
    }
    
     checkshikara.shikaraStatus="Rejected";
     await checkshikara.save();

    res.status(200).json({
      status: true,
      data: checkshikara,
      msg: "Rejected Successfully",
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
router.get("/shikara/get", ifToken, async (req, res) => {
  try {
    var { id } = req.query;
    var query = { _id:id,status: "Active" };
   var data = await shikaraModel.findOne(query).populate("location").populate("userid").populate("startingLocation");
   var trip=await tripTypeModel.findOne({shikaraId:id,status:"Active"});
   if (!trip) {
    // If no trip record found, set trip to an empty object
    trip = {};
   }
   trip= JSON.parse(JSON.stringify(trip));
   var packagedata=await tripPackageModel.find({shikaraId:id,status:"Active",packageType:{$in:["Seasonal","OffSeasonal"]}}).sort({created_at:-1});
    packagedata= JSON.parse(JSON.stringify(packagedata))
    if (packagedata.length > 0) {
      var newitemlist = packagedata.filter(
        (x) => JSON.stringify(x.tripTypeId) === JSON.stringify(trip._id)
      );
      trip.package = newitemlist;
     }
     var reviewData=await reviewModel.find({shikaraId:id,status:"Active"}).populate("user").limit(5).sort({created_at:-1});
    res.status(200).json({
      status: true,
      data: data,
      trip:trip,
      reviews:reviewData,
      msg:"Success"
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
router.post("/shikara/gallery", async (req, res) => {
  try {
    var { shikaraId } = req.body;
    if(Misc.isnullorempty(shikaraId)){
      res.status(200).json({
        status: false,
        msg: "Please Provide Id",
      });
      return;
    }
    var checkshikara=await shikaraModel.findOne({_id:shikaraId,status:"Active"});
    if(Misc.isnullorempty(checkshikara)){
      res.status(200).json({
        status: false,
        msg: "Shikara  Not found",
      });
      return;
    }
   var gallery={
    propertyImages:checkshikara.propertyImages
   }
  
    res.status(200).json({
      status: true,
      data: gallery,
      msg:"Success"
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
router.post(
  "/shikara/propertyimage/upload",
  vendorAuth,
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
  "/shikara/removeimagesingle",
  vendorAuth,
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
//////////////////// TRIP SECTION ADD ////////////////////////////
router.post("/shikara/trip/add", vendorAuth, async (req, res) => {
  try {
    var {
      shikaraId, maxCapacityOfBoat, minCapacityOfBoat, pickUpLocation, dropLocation, minimumHour
    } = req.body;
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide shikaraId",
      });
      return;
    }
    if (Misc.isnullorempty(maxCapacityOfBoat)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Max Capacity",
      });
      return;
    }
    if (Misc.isnullorempty(minCapacityOfBoat)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Minimum Capacity",
      });
      return;
    }
    if (Misc.isnullorempty(minimumHour)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Minimum Hour",
      });
      return;
    }
    // if (Misc.isnullorempty(pickUpLocation)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide PickUp Location",
    //   });
    //   return;
    // }
    // if (Misc.isnullorempty(dropLocation)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide Drop Location",
    //   });
    //   return;
    // }
    if(parseInt(maxCapacityOfBoat)<=0){
      res.status(200).json({
        status: false,
        msg: "Please provide maximum capacity of boat greater than zero",
      });
      return;
    }
    
    if(parseInt(minCapacityOfBoat)<=0){
      res.status(200).json({
        status: false,
        msg: "Please provide minimum capacity of boat greater than zero",
      });
      return;
    }
    if (parseInt(minCapacityOfBoat) >=parseInt(maxCapacityOfBoat)) {
      res.status(200).json({
        status: false,
        msg: "Minimum capacity of boat should be less than maximum capacity of boat",
      });
      return;
    }
    if(parseInt(minimumHour)<=0){
      res.status(200).json({
        status: false,
        msg: "Please provide minimumHour of boat greater than zero",
      });
      return;
    }
    var checkname = await shikaraModel.findOne({
      _id: shikaraId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkname)) {
      res.status(200).json({
        status: false,
        msg: "Shikara Not found",
      });
      return;
    }
    //check triptype is already added for a houseboat
    var checktrip = await tripTypeModel.findOne({
      shikaraId: shikaraId,
      status: "Active",
    });
    if (!Misc.isnullorempty(checktrip)) {
        res.status(200).json({
        status: false,
        msg: "Trip has already added for this shikara",
      });
      return;
    }

    var shikara = new tripTypeModel({
      shikaraId: checkname._id,
      maxCapacityOfBoat: maxCapacityOfBoat,
      minCapacityOfBoat: minCapacityOfBoat,
      maxCapacityOfBoats: parseFloat(maxCapacityOfBoat),
      minCapacityOfBoats: parseFloat(minCapacityOfBoat),
      pickUpLocation: pickUpLocation,
      dropLocation: dropLocation,
      minimumHour: minimumHour,
      minimumHours: parseFloat(minimumHour)
    });
    await shikara.save();
    checkname.isComplete=true;
    await checkname.save();

    res.status(200).json({
      status: true,
      data: shikara,
      msg: "Added Successfully",
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

/////////////////// Shikara Package //////////////
function hasDateConflict(packageDetails) {
  for (let i = 0; i < packageDetails.length; i++) {
    for (let j = i + 1; j < packageDetails.length; j++) {
      const packageA = packageDetails[i];
      const packageB = packageDetails[j];

      const startDateA = new Date(packageA.startDate);
      const endDateA = new Date(packageA.endDate);

      const startDateB = new Date(packageB.startDate);
      const endDateB = new Date(packageB.endDate);

      // Check for date conflict
      if (
        (startDateA <= startDateB && startDateB <= endDateA) ||
        (startDateA <= endDateB && endDateB <= endDateA) ||
        (startDateB <= startDateA && startDateA <= endDateB) ||
        (startDateB <= endDateA && endDateA <= endDateB)
      ) {
        return true; // Date conflict found
      }
    }
  }
  return false; // No date conflict found
}
router.post("/shikara/trip/package/add", vendorAuth, async (req, res) => {
  try {
    var {
      tripTypeId, packageDetails
    } = req.body;
    if (Misc.isnullorempty(tripTypeId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide tripTypeId",
      });
      return;
    }
    if (!Array.isArray(packageDetails) || packageDetails.length === 0) {
      res.status(200).json({
        status: false,
        msg: "Package Details should be a non-empty array",
      });
      return;
    }
    var pack = [];
    if(packageDetails.length>0){
      for(var j=0;j<packageDetails.length;j++){
        if(packageDetails[j].packageType=="Seasonal"){
          console.log("season")
          if ((Misc.isnullorempty(packageDetails[j].startDate)) ||(Misc.isnullorempty(packageDetails[j].endDate)) || (Misc.isnullorempty(packageDetails[j].customerRate)) ||(Misc.isnullorempty(packageDetails[j].agentRate))) {
            continue;
          }
        }
       else if(packageDetails[j].packageType=="OffSeasonal"){
          if ((Misc.isnullorempty(packageDetails[j].startDate)) ||(Misc.isnullorempty(packageDetails[j].endDate)) || (Misc.isnullorempty(packageDetails[j].customerRate)) ||(Misc.isnullorempty(packageDetails[j].agentRate))) {
              // res.status(200).json({
              //   status: false,
              //   msg: "Please provide package details",
              // });
              // return;
              continue
            }
        }
        pack.push(packageDetails[j])
      }
    }
    if(pack.length<=0){
      res.status(200).json({
          status: false,
          msg: "Please provide package details",
        });
        return;
    }
    packageDetails=pack;
    var checktrip = await tripTypeModel.findOne({
      _id: tripTypeId,
      status: "Active",
    });
    if (Misc.isnullorempty(checktrip)) {
      res.status(200).json({
        status: false,
        msg: "Trip Not found",
      });
      return;
    }
    if (hasDateConflict(packageDetails)) {
      return res.status(200).json({
        status: false,
        msg: "Date conflict found within the provided package details",
      });
    }

   // Check for date conflicts with existing packages
    const existingPackages = await tripPackageModel.find({
     tripTypeId: checktrip._id,
     status: "Active",packageType:{$in:["Seasonal","OffSeasonal"]},
     $or: packageDetails.map((pkg) => ({
       $and: [
         { startDate: { $lte: pkg.endDate } },
         { endDate: { $gte: pkg.startDate } },
       ],
     })),
   });

   if (existingPackages.length > 0) {
     return res.status(200).json({
       status: false,
       msg: "Existing packages already have conflicting date ranges",
     });
   }
    const savedPackages = [];
    for (var i = 0; i < packageDetails.length; i++) {
      if (!(Misc.isnullorempty(packageDetails[i].startDate) && Misc.isnullorempty(packageDetails[i].endDate))) {
        console.log(2)
        // Check if the start date is not less than the current date
        var currentDate =new Date();
        currentDate.setDate(currentDate.getDate() - 1);
        var packageStartDate = new Date(packageDetails[i].startDate);
        if (packageStartDate.getTime() < currentDate) {
          return res.status(200).json({
            status: false,
            msg: "Start date should not be less than the current date",
          });
        }
         // Check if the end date is not less than the start date
        var packageEndDate = new Date(packageDetails[i].endDate);
       if (packageEndDate.getTime() < packageStartDate.getTime()) {
          return res.status(200).json({
            status: false,
            msg: "End date should not be less than the start date",
          });
        }
      if (packageDetails[i].packageType == "Seasonal") {
        var tripPackage = new tripPackageModel({
          packageType: "Seasonal",
          tripTypeId: checktrip._id,
          shikaraId: checktrip.shikaraId,
          startDate: packageDetails[i].startDate,
          endDate: packageDetails[i].endDate,
          customerRate: packageDetails[i].customerRate,
          agentRate: packageDetails[i].agentRate,
          customerExtraRate: packageDetails[i].customerExtraRate,
          agentExtraRate: packageDetails[i].agentExtraRate,


          customerRateCommission:packageDetails[i].customerRateCommission,
          customerExtraRateCommission:packageDetails[i].customerExtraRateCommission,
          agentRateCommission:packageDetails[i].agentRateCommission,
          agentExtraRateCommission:packageDetails[i].agentExtraRateCommission
        });
        await tripPackage.save();
        savedPackages.push(tripPackage);
          
      }
      else {
      
        var tripPackage = new tripPackageModel({
          packageType: "OffSeasonal",
          tripTypeId: checktrip._id,
          shikaraId: checktrip.shikaraId,
          startDate: packageDetails[i].startDate,
          endDate: packageDetails[i].endDate,
          customerRate: packageDetails[i].customerRate,
          agentRate: packageDetails[i].agentRate,
          customerExtraRate: packageDetails[i].customerExtraRate,
          agentExtraRate: packageDetails[i].agentExtraRate,


          customerRateCommission:packageDetails[i].customerRateCommission,
          customerExtraRateCommission:packageDetails[i].customerExtraRateCommission,
          agentRateCommission:packageDetails[i].agentRateCommission,
          agentExtraRateCommission:packageDetails[i].agentExtraRateCommission
        });
        await tripPackage.save();
        savedPackages.push(tripPackage);
      }
      }
    }
      var shikara=await shikaraModel.findOne({_id:checktrip.shikaraId,status:"Active"});
      shikara.isComplete=true;
      shikara.hasPackage=true;
      await shikara.save();

      res.status(200).json({
      status: true,
      data: savedPackages,
      msg: "Added Successfully",
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
  "/shikara/edit",
  vendorAuth,
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
router.post("/shikara/block", adminAuth, async (req, res) => {
  try {
    var { shikaraId } = req.body;
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide shikaraId",
      });
      return;
    }
    var checkhouseboat = await shikaraModel.findOne({
      _id: shikaraId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "Shikara  Not found",
      });
      return;
    }
    checkhouseboat.shikaraStatus = "Blocked";
    await checkhouseboat.save();

    res.status(200).json({
      status: true,
      data: checkhouseboat,
      msg: "Shikara blocked",
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
router.post("/shikara/unblock", adminAuth, async (req, res) => {
  try {
    var { shikaraId } = req.body;
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide shikaraId",
      });
      return;
    }
    var checkhouseboat = await shikaraModel.findOne({
      _id: shikaraId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "Shikara  Not found",
      });
      return;
    }
    checkhouseboat.shikaraStatus = "Approved";
    await checkhouseboat.save();

    res.status(200).json({
      status: true,
      data: checkhouseboat,
      msg: "Shikara unblocked",
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
router.get("/shikara/blockedlist", adminAuth, async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query = { shikaraStatus: "Blocked", status: "Active" };
    if (keyword) {
      query["$or"] = [{ shikaraName: { $regex: keyword, $options: "i" } }];
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


    var data = await shikaraModel.aggregate([
      { $match: query },
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
    var totalLength = await shikaraModel.countDocuments({
      shikaraStatus: "Blocked",
      status: "Active",
    });
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
router.post("/shikara/trip/details", vendorAuth, async (req, res) => {
  try {
    var { shikaraId } = req.body;
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide shikaraId",
      });
      return;
    }
    var query = {
      shikaraId: shikaraId,
      status: "Active",
    };
    var data = await tripTypeModel.findOne(query).populate("shikaraId");

    res.status(200).json({
      status: true,
      data: data,
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
router.post("/shikara/trip/package/edit", vendorAuth, async (req, res) => {
  try {
    var { id,startDate,endDate,customerRate,customerExtraRate,agentRate,agentExtraRate } = req.body;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Id",
      });
      return;
    }
    
    var checktripPackage = await tripPackageModel.findOne({
      _id: id,
      status: "Active",
    }).populate("shikaraId");
    if (Misc.isnullorempty(checktripPackage)) {
      res.status(200).json({
        status: false,
        msg: "Package Not found",
      });
      return;
    }
    const dateConflict = await hasDateConflictCheck(checktripPackage.shikaraId, id, startDate, endDate);
    if (dateConflict) {
      res.status(200).json({
        status: false,
        msg: "Date conflict found with other packages",
      });
      return;
    }

      if(startDate){
        checktripPackage.startDate=startDate;
      }
      if(endDate){
        checktripPackage.endDate=endDate;
      }
      if(customerRate){
        checktripPackage.customerRate=customerRate;
      }
      if(customerExtraRate){
        checktripPackage.customerExtraRate=customerExtraRate;
      }
      if(agentRate){
        checktripPackage.agentRate=agentRate
      }
      if(agentExtraRate){
        checktripPackage.agentExtraRate=agentExtraRate
      }
    await checktripPackage.save();
   
    res.status(200).json({
      status: true,
      data: checktripPackage,
      msg: "Added Successfully",
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


router.post("/shikara/trip/edit", vendorAuth, async (req, res) => {
  try {
    var { tripId,maxCapacityOfBoat,minCapacityOfBoat,pickUpLocation,dropLocation,minimumHour } = req.body;
    if (Misc.isnullorempty(tripId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Id",
      });
      return;
    }
    
    var checktripPackage = await tripTypeModel.findOne({
      _id: tripId,
      status: "Active",
    }).populate("shikaraId");
    if (Misc.isnullorempty(checktripPackage)) {
      res.status(200).json({
        status: false,
        msg: "Trip Not found",
      });
      return;
    }

      if(!Misc.isnullorempty(maxCapacityOfBoat) ){
        if (parseInt(maxCapacityOfBoat)<=0) {
          res.status(200).json({
            status: false,
            msg: "Maximum capacity of boat should be greater than zero",
          });
          return;
        }
        checktripPackage.maxCapacityOfBoat =maxCapacityOfBoat ;
        checktripPackage.maxCapacityOfBoats =parseFloat(maxCapacityOfBoat) ;
      }
      if(!Misc.isnullorempty(minCapacityOfBoat) ){
        if (parseInt(minCapacityOfBoat) <=0) {
          res.status(200).json({
            status: false,
            msg: "Minimum capacity of boat should be greater than zero",
          });
          return;
        }
        else if(parseInt(minCapacityOfBoat)>=parseInt(maxCapacityOfBoat)){
          res.status(200).json({
            status: false,
            msg: "Minimum capacity of boat should be less than maximum capacity of boat",
          });
          return;
        }
        checktripPackage.minCapacityOfBoat =minCapacityOfBoat ;
        checktripPackage.minCapacityOfBoats = parseFloat(minCapacityOfBoat) ;
      }
      // if(!Misc.isnullorempty(pickUpLocation) ){
      //   checktripPackage.pickUpLocation =pickUpLocation ;
      // }
      // if(!Misc.isnullorempty(dropLocation)){
      //   checktripPackage.dropLocation=dropLocation;
      // }
      if(!Misc.isnullorempty(minimumHour)){
        if(parseInt(minimumHour)<=0){
          res.status(200).json({
            status: false,
            msg: "Please provide minimumHour of boat greater than zero",
          });
          return;
        }
        checktripPackage.minimumHour=minimumHour;
        checktripPackage.minimumHours = parseFloat(minimumHour);
      }
    await checktripPackage.save();
   
    res.status(200).json({
      status: true,
      data: checktripPackage,
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
router.get("/shikara/allpackages", vendorAuth, async (req, res) => {
  try {
    var { tripId, limit, page, packageType ,shikaraId} = req.query;
    if (Misc.isnullorempty(tripId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Trip Id",
      });
      return;
    }
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide ShikaraId",
      });
      return;
    }
    var query = { tripTypeId: tripId,shikaraId:shikaraId, status: "Active" ,packageType: { $in: ["OffSeasonal","Seasonal"] }};
    // if (keyword) {
    //   query['$or'] = [
    //       { houseBoatName: { "$regex": (keyword), "$options": "i" } },
    //   ]
    // }
    if (packageType) {
      query.packageType = packageType;
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
    var data = await tripPackageModel
      .find(query)
      .sort("created_at")
      .skip((pageNo - 1) * limit)
      .limit(dataLimit);
    var totalLength = await tripPackageModel.countDocuments({
     tripTypeId: tripId,
      status: "Active",
    });
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
router.get("/shikara/package/delete", vendorAuth, async (req, res) => {
  try {
    var { id } = req.query;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var shikara = await tripPackageModel.findOne({ _id: id, status: "Active" });
    if (Misc.isnullorempty(shikara)) {
      res.status(200).json({
        status: false,
        msg: "data not found",
      });
      return;
    }

    shikara.status = "Deleted";
    await shikara.save();
    res.status(200).json({
      status: true,
      msg: "Deleted",
      data: shikara,
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

router.post("/shikara/package/data", vendorAuth, async (req, res) => {
  try {
    var {
      startDate,
      endDate,
      shikaraId,
      tripTypeId,
    } = req.body;
    if (Misc.isnullorempty(startDate)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Start Date",
      });
      return;
    }
    if (Misc.isnullorempty(endDate)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide End Date",
      });
      return;
    }
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide shikaraId",
      });
      return;
    }
    if (Misc.isnullorempty(tripTypeId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide TripType Id",
      });
      return;
    }
    var fromDateTime = new Date(startDate);
    var endDateTime = new Date(endDate);
    var dates = [];
    let currentDateObj = new Date(fromDateTime);

    while (currentDateObj <= endDateTime) {
      dates.push(currentDateObj.toISOString().split('T')[0]);
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

     var dataArray = [];

    for (var i = 0; i < dates.length; i++) {
      var currentDate = dates[i];
      // Query in trippackagemodel for each date
      var checkpackage = await tripPackageModel.findOne({
        status: "Active",
        shikaraId: shikaraId,
        tripTypeId: tripTypeId,
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },packageType:"Special"
      });
      if (checkpackage) {
        // If data is found for a date, add it to the dataArray
         var dat={
          date: currentDate,
          customerRate: checkpackage.customerRate ,
          customerExtraRate: checkpackage.customerExtraRate ,
          agentRate: checkpackage.agentRate ,
          agentExtraRate: checkpackage.agentExtraRate ,
          isAvailable: checkpackage.isAvailable, 
          isEdit:false,
          numberOfRooms:checkpackage.numberOfRooms,
          numberOfRooms:0,
          _id:checkpackage._id,
          status: checkpackage.status 
         }
        dataArray.push(dat);
      } 
      else {
          var dat={
          date:currentDate,
          customerRate:"",
          customerExtraRate:"",
          agentRate:"",
          agentExtraRate:"",
          isAvailable: true,
          isEdit:false,
          numberOfRooms:0,
          _id:null,
          status: "Active",
        }
        dataArray.push(dat);
      }
      
    }
    res.status(200).json({
      status: true,
      data: dataArray,
      msg: "Success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      msg: "Internal server error",
    });
  }
});

router.post("/shikara/specialrate/add/old", vendorAuth, async (req, res) => {
  try {
    var {
      shikaraId,packageDetails,tripTypeId,startDate,endDate,
    } = req.body;
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide shikaraId",
      });
      return;
    }
    if (!Array.isArray(packageDetails) || packageDetails.length === 0) {
      res.status(200).json({
        status: false,
        msg: "packageDetails must be a non-empty array",
      });
      return;
    }
    if (Misc.isnullorempty(tripTypeId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide tripTypeId",
      });
      return;
    }
    if (Misc.isnullorempty(startDate)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide startDate",
      });
      return;
    }
    if (Misc.isnullorempty(endDate)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide endDate",
      });
      return;
    }
    var checkhouseboat = await shikaraModel.findOne({
      _id: shikaraId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "Shikara  Not found",
      });
      return;
    }

    var checktrip = await tripTypeModel.findOne({
      _id: tripTypeId,
      status: "Active",
    });
    if (Misc.isnullorempty(checktrip)) {
      res.status(200).json({
        status: false,
        msg: "House Boat Trip Not found",
      });
      return;
    }
    
   for(var i=0;i<packageDetails.length;i++){
      if(!(packageDetails[i].customerRate=="" && packageDetails[i].agentRate=="" )){
         if(packageDetails[i]._id===null){
        
          var tripPackage = new tripPackageModel({
              tripTypeId:tripTypeId,
              shikaraId:shikaraId,
              startDate:packageDetails[i].date,  
              endDate: packageDetails[i].date,
              customerRate: packageDetails[i].customerRate,
              customerExtraRate:packageDetails[i].customerExtraRate,
              agentRate: packageDetails[i].agentRate,
              agentExtraRate:packageDetails[i].agentExtraRate,
              isAvailable: packageDetails[i].isAvailable,
              numberOfRooms:packageDetails[i].numberOfRooms,
              packageType: "Special",

              // customerRateCommission:packageDetails[i].customerRateCommission,
              // customerExtraRateCommission:packageDetails[i].customerExtraRateCommission,
              // agentRateCommission:packageDetails[i].agentRateCommission,
              // agentExtraRateCommission:packageDetails[i].agentExtraRateCommission
              customerRateCommission:packageDetails[i].customerNetrate,
              agentRateCommission:packageDetails[i].agentNetrate,
           
            });
            await tripPackage.save();
        }
        else if(packageDetails[i]._id!=null){
          await tripPackageModel.findOneAndUpdate(
            { _id: packageDetails[i]._id ,status:"Active"},   //check status also
            {
              $set: {
                tripTypeId:tripTypeId,
                shikaraId:shikaraId,
                startDate:packageDetails[i].date,  
                endDate: packageDetails[i].date,
                customerRate: packageDetails[i].customerRate,
                customerExtraRate:packageDetails[i].customerExtraRate,
                agentRate: packageDetails[i].agentRate,
                agentExtraRate:packageDetails[i].agentExtraRate,
                isAvailable: packageDetails[i].isAvailable,
                numberOfRooms:packageDetails[i].numberOfRooms,
                packageType: "Special",

                // customerRateCommission:packageDetails[i].customerRateCommission,
                // customerExtraRateCommission:packageDetails[i].customerExtraRateCommission,
                // agentRateCommission:packageDetails[i].agentRateCommission,
                // agentExtraRateCommission:packageDetails[i].agentExtraRateCommission
                customerRateCommission:packageDetails[i].customerNetrate,
                agentRateCommission:packageDetails[i].agentNetrate,
              }})
             }
        }   
    } 
   res.status(200).json({
      status: true,
      msg: "Added Successfully",
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

router.post("/shikara/specialrate/add", vendorAuth, async (req, res) => {
  try {
    var {
      shikaraId,packageDetails,tripTypeId,startDate,endDate,
    } = req.body;
    if (Misc.isnullorempty(shikaraId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide shikaraId",
      });
      return;
    }
    if (!Array.isArray(packageDetails) || packageDetails.length === 0) {
      res.status(200).json({
        status: false,
        msg: "packageDetails must be a non-empty array",
      });
      return;
    }
    if (Misc.isnullorempty(tripTypeId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide tripTypeId",
      });
      return;
    }
    if (Misc.isnullorempty(startDate)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide startDate",
      });
      return;
    }
    if (Misc.isnullorempty(endDate)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide endDate",
      });
      return;
    }
    var checkhouseboat = await shikaraModel.findOne({
      _id: shikaraId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "Shikara  Not found",
      });
      return;
    }

    var checktrip = await tripTypeModel.findOne({
      _id: tripTypeId,
      status: "Active",
    });
    if (Misc.isnullorempty(checktrip)) {
      res.status(200).json({
        status: false,
        msg: "House Boat Trip Not found",
      });
      return;
    }
    
   for(var i=0;i<packageDetails.length;i++){
      //if(!(packageDetails[i].customerRate=="" && packageDetails[i].agentRate=="" )){
        if(packageDetails[i].isEdit==true){
            if(packageDetails[i]._id===null){
        
          var tripPackage = new tripPackageModel({
              tripTypeId:tripTypeId,
              shikaraId:shikaraId,
              startDate:packageDetails[i].date,  
              endDate: packageDetails[i].date,
              customerRate: packageDetails[i].customerRate,
              customerExtraRate:packageDetails[i].customerExtraRate,
              agentRate: packageDetails[i].agentRate,
              agentExtraRate:packageDetails[i].agentExtraRate,
              isAvailable: packageDetails[i].isAvailable,
              numberOfRooms:packageDetails[i].numberOfRooms,
              packageType: "Special",

              // customerRateCommission:packageDetails[i].customerRateCommission,
              // customerExtraRateCommission:packageDetails[i].customerExtraRateCommission,
              // agentRateCommission:packageDetails[i].agentRateCommission,
              // agentExtraRateCommission:packageDetails[i].agentExtraRateCommission
              customerRateCommission:packageDetails[i].customerNetrate,
              agentRateCommission:packageDetails[i].agentNetrate,
           
            });
            await tripPackage.save();
        }
        else if(packageDetails[i]._id!=null){
          await tripPackageModel.findOneAndUpdate(
            { _id: packageDetails[i]._id ,status:"Active"},   //check status also
            {
              $set: {
                tripTypeId:tripTypeId,
                shikaraId:shikaraId,
                startDate:packageDetails[i].date,  
                endDate: packageDetails[i].date,
                customerRate: packageDetails[i].customerRate,
                customerExtraRate:packageDetails[i].customerExtraRate,
                agentRate: packageDetails[i].agentRate,
                agentExtraRate:packageDetails[i].agentExtraRate,
                isAvailable: packageDetails[i].isAvailable,
                numberOfRooms:packageDetails[i].numberOfRooms,
                packageType: "Special",

                // customerRateCommission:packageDetails[i].customerRateCommission,
                // customerExtraRateCommission:packageDetails[i].customerExtraRateCommission,
                // agentRateCommission:packageDetails[i].agentRateCommission,
                // agentExtraRateCommission:packageDetails[i].agentExtraRateCommission
                customerRateCommission:packageDetails[i].customerNetrate,
                agentRateCommission:packageDetails[i].agentNetrate,
              }})
             }
        }   
    } 
   res.status(200).json({
      status: true,
      msg: "Added Successfully",
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
// router.get('/update/test',async(req,res)=>{
//   try{
//     var data = await tripTypeModel.find()
//     for(var i=0;i<data.length;i++){
//       console.log(i)
//       if(!Misc.isnullorempty(data[i].maxCapacityOfBoat)){
//         data[i].maxCapacityOfBoats = parseFloat(data[i].maxCapacityOfBoat)
//       }
//       if(!Misc.isnullorempty(data[i].minCapacityOfBoat)){
//         data[i].minCapacityOfBoats = parseFloat(data[i].minCapacityOfBoat)
//       }
//       if(!Misc.isnullorempty(data[i].maxPersonPerRoom)){
//         data[i].maxPersonPerRooms = parseFloat(data[i].maxPersonPerRoom)
//       }
//       if(!Misc.isnullorempty(data[i].extraPersonPerRoom)){
//         data[i].extraPersonPerRooms = parseFloat(data[i].extraPersonPerRoom)
//       }
//       if(!Misc.isnullorempty(data[i].maxPersonTrip)){
//         data[i].maxPersonTrips = parseFloat(data[i].maxPersonTrip)
//       }
//       if(!Misc.isnullorempty(data[i].minPersonTrip)){
//         data[i].minPersonTrips = parseFloat(data[i].minPersonTrip)
//       }
//       if(!Misc.isnullorempty(data[i].minimumHour)){
//         data[i].minimumHours = parseFloat(data[i].minimumHour)
//       }
//       console.log(data[i]._id)
//       //await data[i].save()
//     }
//     console.log("Sucess")
//   }catch(e){
//     console.log(e)
//   }
// })

module.exports = router;