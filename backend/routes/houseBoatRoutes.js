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
// var s3controller = require("../controllers/s3controller");
// var upload1 = s3controller.upload;
const multer = require("multer");
const vendorCategoryModel = require("../models/vendorCategoryModel");
const adminAuth = require("../middleware/adminAuth");
const vendorAuth = require("../middleware/vendorAuth");
const houseBoatModel = require("../models/houseBoatModel");
const tripTypeModel = require("../models/tripTypeModel");
const tripPackageModel = require("../models/tripPackageModel");
const houseboatBookingItemModel = require("../models/houseboatBookingItemModel");
const  reviewModel=require("../models/reviewModel");
const reservationModel = require("../models/reservationModel");


router.post("/houseboat/add", vendorAuth, async (req, res) => {
  try {
    var {
      houseBoatName,
      totalRooms,
      category,
      facilities,
      addionalRules,
      expiryType,
      expiryDate,
      location,startingLocation
    } = req.body;
    if (Misc.isnullorempty(houseBoatName)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide HouseBoat Name",
      });
      return;
    }
    if (Misc.isnullorempty(category)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Category",
      });
      return;
    }
    if (Misc.isnullorempty(totalRooms)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Total Rooms",
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
    if (parseInt(totalRooms) <= 0) {
      res.status(200).json({
        status: false,
        msg: "Please provide total room greater than zero",
      });
      return;
    }
    if (!Misc.isnullorempty(expiryDate)) {
      var currentDateTime = new Date();
      var expiryDateTime = new Date(expiryDate);

      if (expiryDateTime < currentDateTime) {
        res.status(200).json({
          status: false,
          msg: "Expiry Date has already passed",
        });
        return;
      }
    }
    var checkname = await houseBoatModel.findOne({
      houseBoatName: { $regex: new RegExp("^" + houseBoatName + "$", "ig") },
      status: "Active",userid:req.user.id
    });
    if (!Misc.isnullorempty(checkname)) {
      res.status(200).json({
        status: false,
        msg: "House Boat Name Already Exist",
      });
      return;
    }
    var checkvendor = await vendorModel.findOne({
      userid: req.user.id,
      status: "Active",
    });
    var houseboat = new houseBoatModel({
      houseBoatName: houseBoatName,
      category: category,
      addionalRules: addionalRules,
      totalRooms: totalRooms,
      expiryType: expiryType,
      expiryDate: expiryDate,
      userid: req.user.id,
      vendorid: checkvendor._id,
      location:location,
      startingLocation:startingLocation
    });
   if(!Misc.isnullorempty(facilities.airCondition)){
    houseboat.facilities.airCondition = facilities.airCondition;
   }
   if(!Misc.isnullorempty(facilities.kettle)){
    houseboat.facilities.kettle = facilities.kettle;
   }
   if(!Misc.isnullorempty(facilities.parking)){
    houseboat.facilities.parking = facilities.parking;
   }
   if(!Misc.isnullorempty(facilities.restrooms)){
    houseboat.facilities.restrooms = facilities.restrooms;
   }
   if(!Misc.isnullorempty(facilities.lifeJacket)){
    houseboat.facilities.lifeJacket = facilities.lifeJacket;
   }
   if(!Misc.isnullorempty(facilities.wifi)){
    houseboat.facilities.wifi = facilities.wifi;
   }
   if(!Misc.isnullorempty(facilities.television)){
    houseboat.facilities.television = facilities.television;
   }
   if(!Misc.isnullorempty(facilities.swimmingPool)){
    houseboat.facilities.swimmingPool = facilities.swimmingPool;
   }
   if(!Misc.isnullorempty(facilities.powerbackup)){
    houseboat.facilities.powerbackup = facilities.powerbackup;
   }
   if(!Misc.isnullorempty(facilities.fireextinguisher)){
    houseboat.facilities.fireextinguisher = facilities.fireextinguisher;
   }

    await houseboat.save();

    res.status(200).json({
      status: true,
      data: houseboat,
      id: houseboat._id,
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

router.post("/houseboat/gallery", async (req, res) => {
  try {
    var { houseboatId } = req.body;
    if (Misc.isnullorempty(houseboatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide HouseBoat Id",
      });
      return;
    }
    var checkname = await houseBoatModel.findOne({
      _id: houseboatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkname)) {
      res.status(200).json({
        status: false,
        msg: "House Boat Not Found",
      });
      return;
    }
    var gallery = {
      fullImage: checkname.fullImage,
      upperImage: checkname.upperImage,
      interiorImage: checkname.interiorImage,
      roomImage: checkname.roomImage,
      propertyImages: checkname.propertyImages,
    };
    res.status(200).json({
      status: true,
      data: gallery,
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
router.post("/houseboat/image/delete", ifToken, async (req, res) => {
  try {
    var { houseboatId, fullImage, upperImage, interiorImage, roomImage } =
      req.body;
    if (Misc.isnullorempty(houseboatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide HouseBoat Id",
      });
      return;
    }
    var checkname = await houseBoatModel.findOne({
      _id: houseboatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkname)) {
      res.status(200).json({
        status: false,
        msg: "House Boat Not Found",
      });
      return;
    }
    if (!Misc.isnullorempty(fullImage)) {
      if (checkname.fullImage == fullImage) {
        checkname.fullImage = null;
      }
    }
    if (!Misc.isnullorempty(upperImage)) {
      if (checkname.upperImage == upperImage) {
        checkname.upperImage = null;
      }
    }
    if (!Misc.isnullorempty(interiorImage)) {
      if (checkname.interiorImage == interiorImage) {
        checkname.interiorImage = null;
      }
    }
    if (!Misc.isnullorempty(roomImage)) {
      if (checkname.roomImage == roomImage) {
        checkname.roomImage = null;
      }
    }
    await checkname.save();
    res.status(200).json({
      status: true,
      msg: "Image Removed",
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
router.post("/houseboat/propertyimage/delete", ifToken, async (req, res) => {
  try {
    var { houseboatId, propertyImages } = req.body;
    if (Misc.isnullorempty(houseboatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide HouseBoat Id",
      });
      return;
    }
    var checkname = await houseBoatModel.findOne({
      _id: houseboatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkname)) {
      res.status(200).json({
        status: false,
        msg: "House Boat Not Found",
      });
      return;
    }
    if (!Misc.isnullorempty(propertyImages)) {
      if (checkname.propertyImages == propertyImages) {
        checkname.propertyImages = null;
      }
    }
    await checkname.save();
    res.status(200).json({
      status: true,
      data: checkname,
      msg: "Image Removed",
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
//upload images and proofs
router.post(
  "/houseboat/proofupload",
  vendorAuth,
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

router.get("/houseboat/delete", vendorAuth, async (req, res) => {
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
   //check hb have bookings
   var hbbookings=await houseboatBookingItemModel.find({houseBoatId:id,status:"Active"});
   if(hbbookings.length>0){
    res.status(200).json({
      status: false,
      msg: "Can't delete.Houseboat have bookings",
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
router.post(
  "/houseboat/edit",
  vendorAuth,
  async (req, res) => {
    try {
      var { id, houseBoatName, category, facilities, totalRooms,location,startingLocation } = req.body;
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
router.get("/houseboat/getlist", vendorAuth, async (req, res) => {
  try {
    var { count, page, status,keyword } = req.query;
    var query = {
      status: "Active",
      userid: req.user.id,
      houseBoatStatus: { $in: ["Pending", "Approved","Blocked"] },
    };
    if (status) {
      query.houseBoatStatus = status;
    }
    if(keyword){
      query.houseBoatName = { $regex: keyword, $options: "i" };
    }
    if (Misc.isnullorempty(count)) count = 50;
    if (Misc.isnullorempty(page)) page = 1;
    var lm = parseInt(count);
    var pg = parseInt(page) * lm - lm;
    var data = [];
    var tot = await houseBoatModel.countDocuments(query);
    var totcount = tot;

    if (lm > 0) totcount = totcount / lm;
    totcount = Math.ceil(totcount);
    if (count == 0 && page == 0)
      data = await houseBoatModel.find(query).sort("-created_at");
    else
      data = await houseBoatModel
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

router.get("/houseboat/get", ifToken, async (req, res) => {
  try {
    var { id } = req.query;
    var query = { _id: id, status: "Active" };
    var data = await houseBoatModel.findOne(query).populate("location").populate("userid").populate("startingLocation");
    var trip = await tripTypeModel.find({ houseBoatId: id, status: "Active" }).sort({created_at:-1});
    trip = JSON.parse(JSON.stringify(trip));
    var package = await tripPackageModel.find({
      houseBoatId: id,
      status: "Active",packageType:{$in:["OffSeasonal","Seasonal"]}
    });
    for (var i = 0; i < trip.length; i++) {
      package = JSON.parse(JSON.stringify(package));
      var newitemlist = package.filter(
        (x) => JSON.stringify(x.tripTypeId) === JSON.stringify(trip[i]._id)
      );
      trip[i].package = newitemlist;
    }
    var reviewData=await reviewModel.find({houseBoatId:id,status:"Active"}).populate("user").limit(5).sort({created_at:-1});
    res.status(200).json({
      status: true,
      data: data,
      trip: trip,
      reviews:reviewData,
      msg: "Success",
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

////////////////////   TRIP  SECTION  ADD  //////////////////////////////
// function compareTimes(time1, time2) {
//   const [hours1, minutes1] = time1.split(":").map(Number);
//   const [hours2, minutes2] = time2.split(":").map(Number);

//   if (hours1 !== hours2) {
//     return hours1 - hours2;
//   }

//   return minutes1 - minutes2;
// }

router.post("/houseboat/trip/add", vendorAuth, async (req, res) => {
  try {
    var {
      houseBoatId,
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
      minPersonTrip,extraPersonPerRoom
    } = req.body;
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
      });
      return;
    }
    if (!Array.isArray(houseBoatType) || houseBoatType.length === 0) {
      res.status(200).json({
        status: false,
        msg: "HouseBoat Type must be a non-empty array",
      });
      return;
    }
    if (Misc.isnullorempty(tripType)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Trip Type",
      });
      return;
    }
    if (Misc.isnullorempty(checkInTime)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide CheckIn Time",
      });
      return;
    }
    if (Misc.isnullorempty(checkOutTime)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide CheckOut Time",
      });
      return;
    }
    if (Misc.isnullorempty(maxCapacityOfBoat)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Maximum Capacity Of Boat",
      });
      return;
    }
    // if (Misc.isnullorempty(minCapacityOfBoat)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide Minimum Capacity Of Boat",
    //   });
    //   return;
    // }
    if(!Misc.isnullorempty(minCapacityOfBoat)){
    if (parseInt(minCapacityOfBoat) <= 0) {
      res.status(200).json({
        status: false,
        msg: "Please Provide minimum capacity of boat greater than zero",
      });
      return;
    }
   }
    if (parseInt(maxCapacityOfBoat) <= 0) {
      res.status(200).json({
        status: false,
        msg: "Please Provide maximum capacity  of boat greater than zero",
      });
      return;
    }
    if (parseInt(maxPersonPerRoom) > parseInt(maxCapacityOfBoat)) {
      res.status(200).json({
        status: false,
        msg: "Maximum person per room should be less than maximum capacity of boat",
      });
      return;
    }
    if (parseInt(minCapacityOfBoat) > parseInt(maxCapacityOfBoat)) {
      res.status(200).json({
        status: false,
        msg: "Minimum capacity of boat should be less than maximum capacity of boat",
      });
      return;
    }
    if(Misc.isnullorempty(extraPersonPerRoom)){
      extraPersonPerRoom=0;
    }
    var checkname = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkname)) {
      res.status(200).json({
        status: false,
        msg: "House Boat Not found",
      });
      return;
    }
    if (!["DayCruise", "OverNight", "NightStay"].includes(tripType)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Trip Type",
      });
      return;
    }
    // var totalRooms = checkname.totalRooms || 0; // Assuming totalRooms is a property of checkname
    // var calculatedMaxCapacity = maxPersonPerRoom * totalRooms;
    // console.log("calculatedMaxCapacity", calculatedMaxCapacity);
    // if (calculatedMaxCapacity parseInt(maxCapacityOfBoat)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "maxPersonPerRoom * totalRooms should be equal to maxCapacityOfBoat",
    //   });
    //   return;
    // }
    
      // var calculatedMaxCapacityWithExtra = (parseInt(maxPersonPerRoom) +parseInt (extraPersonPerRoom) )* (totalRooms);
      // console.log("calculatedMaxCapacityWithExtra", calculatedMaxCapacityWithExtra);
      // if ( parseInt(maxCapacityOfBoat)>calculatedMaxCapacityWithExtra ) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "Mismatched MaxCapacityOfBoat",
      //   });
      //   return;
      // }
      // if (compareTimes(checkInTime, checkOutTime) >= 0) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "Check Out Time should be later than Check In Time ",
      //   });
      //   return;
      // }
    if (tripType == "OverNight") {
      // var totalRooms = checkname.totalRooms;
      // var checkseat = parseInt(maxPersonPerRoom) * parseInt(totalRooms);
      if (parseInt(extraPersonPerRoom) > parseInt(maxPersonPerRoom)) {
        res.status(200).json({
          status: false,
          msg: "Please provide no of extra person per room less than max personperroom",
        });
        return;
      }
      var houseboat = new tripTypeModel({
        houseBoatId: checkname._id,
        tripType: tripType,
        houseBoatType: houseBoatType,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        maxCapacityOfBoat: maxCapacityOfBoat,
        maxCapacityOfBoats: parseFloat(maxCapacityOfBoat),
        minCapacityOfBoat: minCapacityOfBoat,
        minCapacityOfBoats: parseFloat(minCapacityOfBoat),
        maxPersonPerRoom: maxPersonPerRoom,
        maxPersonPerRooms: parseFloat(maxPersonPerRoom),
        firstDayStartTime: firstDayStartTime,
        firstDayEndTime: firstDayEndTime,
        secondDayStartTime: secondDayStartTime,
        secondDayEndTime: secondDayEndTime,
        addionalRules: addionalRules,
        extraPersonPerRoom:extraPersonPerRoom,
        extraPersonPerRooms:parseFloat(extraPersonPerRoom)
      });

      houseboat.mealPlan.welcomeDrink = mealPlan.welcomeDrink;
      houseboat.mealPlan.lunch = mealPlan.lunch;
      houseboat.mealPlan.teaOrsnacks = mealPlan.teaOrsnacks;
      houseboat.mealPlan.dinner = mealPlan.dinner;
      houseboat.mealPlan.breakfast = mealPlan.breakfast;

      await houseboat.save();
      checkname.isOverNight = true;
      await checkname.save();
    } else if (tripType == "NightStay") {
      // var totalRooms = checkname.totalRooms;
      // var checkseat = parseInt(maxPersonPerRoom) * parseInt(totalRooms);
      if (parseInt(extraPersonPerRoom) > parseInt(maxPersonPerRoom)) {
        res.status(200).json({
          status: false,
          msg: "Please provide no of extra person per room less than max personperroom ",
        });
        return;
      }
      var houseboat = new tripTypeModel({
        houseBoatId: checkname._id,
        tripType: tripType,
        houseBoatType: houseBoatType,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        maxCapacityOfBoat: maxCapacityOfBoat,
        minCapacityOfBoat: minCapacityOfBoat,
        maxPersonPerRoom: maxPersonPerRoom,
        secondDayStartTime: secondDayStartTime,
        secondDayEndTime: secondDayEndTime,
        addionalRules: addionalRules,
        extraPersonPerRoom:extraPersonPerRoom,

        maxCapacityOfBoats: parseFloat(maxCapacityOfBoat),
        minCapacityOfBoats: parseFloat(minCapacityOfBoat),
        maxPersonPerRooms: parseFloat(maxPersonPerRoom),
        extraPersonPerRooms:parseFloat(extraPersonPerRoom),
      });

      houseboat.mealPlan.welcomeDrink = mealPlan.welcomeDrink;
      houseboat.mealPlan.lunch = mealPlan.lunch;
      houseboat.mealPlan.teaOrsnacks = mealPlan.teaOrsnacks;
      houseboat.mealPlan.dinner = mealPlan.dinner;
      houseboat.mealPlan.breakfast = mealPlan.breakfast;

      await houseboat.save();
      checkname.isNightStay = true;
      await checkname.save();
    } else {
        // if(parseInt(maxCapacityOfBoat)!=parseInt(maxPersonTrip)){
        //   res.status(200).json({
        //     status: false,
        //     msg: "maxCapacityOfBoat should be equal to maxPersonTrip",
        //   });
        //   return;
        // }
      //DayCruise
      var houseboat = new tripTypeModel({
        houseBoatId: checkname._id,
        tripType: "DayCruise",
        houseBoatType: houseBoatType,
        checkInTime: checkInTime,
        checkOutTime: checkOutTime,
        maxCapacityOfBoat: maxCapacityOfBoat,
        maxPersonTrip: maxPersonTrip,
        minPersonTrip: minPersonTrip,
        addionalRules: addionalRules,


        maxCapacityOfBoats: parseFloat(maxCapacityOfBoat),
        // minCapacityOfBoats: parseFloat(minCapacityOfBoat),
        // maxPersonPerRooms: parseFloat(maxPersonPerRoom),
        // extraPersonPerRooms:parseFloat(extraPersonPerRoom),
        minPersonTrips: parseFloat(minPersonTrip),
        maxPersonTrips: parseFloat(maxPersonTrip),
      });

      houseboat.mealPlan.welcomeDrink = mealPlan.welcomeDrink;
      houseboat.mealPlan.lunch = mealPlan.lunch;
      houseboat.mealPlan.teaOrsnacks = mealPlan.teaOrsnacks;
      houseboat.mealPlan.dinner = mealPlan.dinner;
      houseboat.mealPlan.breakfast = mealPlan.breakfast;

      await houseboat.save();
      checkname.isDayCriuse = true;
      await checkname.save();
    }
    res.status(200).json({
      status: true,
      data: houseboat,
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

router.post("/houseboat/trip/edit", vendorAuth, async (req, res) => {
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
    // if(Misc.isnullorempty(extraPersonPerRoom)){
    //   extraPersonPerRoom=0;
    // }
    // maxPersonPerRoom=parseInt(maxPersonPerRoom);
    // extraPersonPerRoom=parseInt(extraPersonPerRoom);
    // maxCapacityOfBoat=parseInt(maxCapacityOfBoat);
    // var calculatedMaxCapacityWithExtra = (maxPersonPerRoom +extraPersonPerRoom)* (checkboat.houseBoatId.totalRooms);
    // if ( maxCapacityOfBoat>calculatedMaxCapacityWithExtra ) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Mismatched MaxCapacityOfBoat",
    //   });
    //   return;
    // }
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
    // if (packageDetails) {
    //   if (hasDateConflict(packageDetails)) {
    //     return res.status(200).json({
    //       status: false,
    //       msg: "Date conflict found within the provided package details",
    //     });
    //   }

    //   const savedPackages = [];
    //   for (var i = 0; i < packageDetails.length; i++) {
    //     console.log(1);
    //     var checkpackage = await tripPackageModel.findOne({
    //       _id: packageDetails[i]._id,
    //       status: "Active",
    //     });
    //     if (!Misc.isnullorempty(checkpackage)) {
    //       res.status(200).json({
    //         status: false,
    //         msg: "Package Not Found",
    //       });
    //       return;
    //     }
    //     if (packageDetails[i].packageType == "Seasonal") {
    //       (checkpackage.packageType = "Seasonal"),
    //         (checkpackage.tripTypeId = checktrip._id),
    //         (checkpackage.houseBoatId = checktrip.houseBoatId),
    //         (checkpackage.startDate = packageDetails[i].startDate),
    //         (checkpackage.endDate = packageDetails[i].endDate),
    //         (checkpackage.customerRate = packageDetails[i].customerRate),
    //         (checkpackage.agentRate = packageDetails[i].agentRate),
    //         (checkpackage.customerExtraRate =
    //           packageDetails[i].customerExtraRate),
    //         (checkpackage.agentExtraRate = packageDetails[i].agentExtraRate),
    //         await checkpackage.save();
    //       savedPackages.push(checkpackage);
    //     } else {
    //       (checkpackage.packageType = "OffSeasonal"),
    //         (checkpackage.tripTypeId = checktrip._id),
    //         (checkpackage.houseBoatId = checktrip.houseBoatId),
    //         (checkpackage.startDate = packageDetails[i].startDate),
    //         (checkpackage.endDate = packageDetails[i].endDate),
    //         (checkpackage.customerRate = packageDetails[i].customerRate),
    //         (checkpackage.agentRate = packageDetails[i].agentRate),
    //         (checkpackage.customerExtraRate =
    //           packageDetails[i].customerExtraRate),
    //         (checkpackage.agentExtraRate = packageDetails[i].agentExtraRate),
    //         await checkpackage.save();
    //       savedPackages.push(checkpackage);
    //     }
    //   }
    // }
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

////////////////// TRIP PACKAGE //////////////////////////////

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

router.post("/houseboat/trip/package/add", vendorAuth, async (req, res) => {
  try {
    var { tripTypeId, packageDetails } = req.body;
    if (Misc.isnullorempty(tripTypeId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide tripTypeId",
      });
      return;
    }
    if (!Array.isArray(packageDetails)) {
      res.status(200).json({
        status: false,
        msg: "Package Details should be an array",
      });
      return;
    }
    var checktrip = await tripTypeModel.findOne({
      _id: tripTypeId,
      status: "Active",
    }).populate("houseBoatId");
    if (Misc.isnullorempty(checktrip)) {
      res.status(200).json({
        status: false,
        msg: "House Boat Trip Not found",
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
     var existingPackages = await tripPackageModel.find({
      tripTypeId: checktrip._id,packageType:{$in:["Seasonal","OffSeasonal"]},
      status: "Active",
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
            houseBoatId: checktrip.houseBoatId,
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
          var checkHB=await houseBoatModel.findOne({_id:checktrip.houseBoatId,status:"Active"});
          if(!Misc.isnullorempty(checkHB)){
            checkHB.hasPackage=true;
            await checkHB.save();
          }
          savedPackages.push(tripPackage);
      }
       else {
            var tripPackage = new tripPackageModel({
            packageType: "OffSeasonal",
            tripTypeId: checktrip._id,
            houseBoatId: checktrip.houseBoatId,
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
          var checkHB=await houseBoatModel.findOne({_id:checktrip.houseBoatId,status:"Active"});
          if(!Misc.isnullorempty(checkHB)){
            checkHB.hasPackage=true;
            await checkHB.save();
          }
          savedPackages.push(tripPackage);
        }
      }
    }
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

async function hasDateConflictCheck(houseBoatId, currentPackageId, newStartDate, newEndDate) {
  const existingPackages = await tripPackageModel.find({
    houseBoatId: houseBoatId,
    status: "Active",
    _id: { $ne: currentPackageId },
  });

  for (const existingPackage of existingPackages) {
    const startDateA = new Date(existingPackage.startDate);
    const endDateA = new Date(existingPackage.endDate);
    const startDateB = new Date(newStartDate);
    const endDateB = new Date(newEndDate);

    if (
      (startDateA <= startDateB && startDateB <= endDateA) ||
      (startDateA <= endDateB && endDateB <= endDateA) ||
      (startDateB <= startDateA && startDateA <= endDateB) ||
      (startDateB <= endDateA && endDateA <= endDateB)
    ) {
      return true; // Date conflict found
    }
  }
  return false; // No date conflict found
}
router.post("/houseboat/trip/package/edit", vendorAuth, async (req, res) => {
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
    }).populate("houseBoatId");
    if (Misc.isnullorempty(checktripPackage)) {
      res.status(200).json({
        status: false,
        msg: "House Boat Package Not found",
      });
      return;
    }
    const dateConflict = await hasDateConflictCheck(checktripPackage.houseBoatId, id, startDate, endDate);
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
router.post("/houseboat/trip/daycruise", vendorAuth, async (req, res) => {
  try {
    var { houseboatId } = req.body;
    if (Misc.isnullorempty(houseboatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseboatId",
      });
      return;
    }

    var query = {
      houseBoatId: houseboatId,
      tripType: "DayCruise",
      status: "Active",
    };
    var data = await tripTypeModel.findOne(query).populate("houseBoatId");

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
router.post("/houseboat/trip/nightstay", vendorAuth, async (req, res) => {
  try {
    var { houseboatId } = req.body;
    if (Misc.isnullorempty(houseboatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseboatId",
      });
      return;
    }
    var query = {
      houseBoatId: houseboatId,
      status: "Active",
      tripType: "NightStay",
    };

    var data = await tripTypeModel.findOne(query).populate("houseBoatId");

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
router.post("/houseboat/trip/overnight", vendorAuth, async (req, res) => {
  try {
    var { houseboatId } = req.body;
    if (Misc.isnullorempty(houseboatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseboatId",
      });
      return;
    }
    var query = {
      houseBoatId: houseboatId,
      status: "Active",
      tripType: "OverNight",
    };

    var data = await tripTypeModel.findOne(query).populate("houseBoatId");
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
//getlist of season and offseason
router.get("/houseboat/allpackages", vendorAuth, async (req, res) => {
  try {
    var { tripId, limit, page, packageType } = req.query;
    if (Misc.isnullorempty(tripId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Trip Id",
      });
      return;
    }
    var query = { tripTypeId: tripId, status: "Active",packageType: { $in: ["OffSeasonal","Seasonal"] } };
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
      .sort({created_at:-1})
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
//remove property image
router.post(
  "/houseboat/removeimagesingle",
  ifToken,
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
  "/houseboat/remove/roomimagesingle",
  ifToken,
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
      var allphotos = data.roomImage;
      if (position >= allphotos.length) {
        res.status(200).json({
          status: false,
          msg: "There are no image in the given position",
        });
        return;
      }
      allphotos.splice(position, 1);
      data.photos = allphotos;
      await houseBoatModel.findByIdAndUpdate(data._id, { roomImage: allphotos });
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
)

router.post(
  "/houseboat/remove/singleimage",
  ifToken,
  async (req, res) => {
    var { houseboatId, type } = req.body;
    try {
      if (Misc.isnullorempty(houseboatId) || Misc.isnullorempty(type)) {
        res.status(200).json({
          status: false,
          msg: "houseboatId & type are mandatory",
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

    //  // position--; //since index starts at 0 & position at 1
    //   var allphotos = data.propertyImages;
    //   if (position >= allphotos.length) {
    //     res.status(200).json({
    //       status: false,
    //       msg: "There are no image in the given position",
    //     });
    //     return;
    //   }
    //   allphotos.splice(position, 1);
    //   data.photos = allphotos;
    if(type=="fullImage"){
      data.fullImage=null;
    }
    if(type=="upperImage"){
      data.upperImage=null;
    }
    if(type=="interiorImage"){
      data.interiorImage=null;
    }
     await data.save();
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
//all house boats
router.get("/houseboat/all", adminAuth, async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query = { houseBoatStatus: "Pending", status: "Active" };
    if (keyword) {
      query["$or"] = [{ houseBoatName: { $regex: keyword, $options: "i" } }];
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
    //   .populate("vendorid").populate("userid").sort("created_at")
    //   .skip((pageNo - 1) * limit)
    //   .limit(dataLimit);



    var data = await houseBoatModel.aggregate([
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
    var totalLength = await houseBoatModel.countDocuments(query);
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
router.get("/vendor/name/list", adminAuth, async (req, res) => {
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
    var data = await userModel
      .find(query).select('name') 
      .sort({ created_at: -1 })
      .skip((pageNo - 1) * limit)
      .limit(dataLimit);
    
    var totalLength = await userModel.countDocuments({
      verificationStatus: "Verified",
      role: "Vendor",
      status: "Active",
      level: 4,
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
router.get("/houseboat/approvedlist", adminAuth, async (req, res) => {
  try {
    var { limit, page, keyword, houseBoatType,name } = req.query;
    var query = { houseBoatStatus: "Approved", status: "Active" };
    if (keyword) {
      //query["$or"] = [{ houseBoatName: { $regex: keyword, $options: "i" } }];
      query.houseBoatName = { $regex: keyword, $options: "i" };
    }
    if(houseBoatType){
      var hbIds=await tripTypeModel.distinct('houseBoatId',{houseBoatType:{$in:[houseBoatType]},status:"Active"});
      hbIds=hbIds.map(x=>(new mongoose.Types.ObjectId(x)))
      query._id={$in:hbIds}
    }
    if (name) {
      query.userid = new mongoose.Types.ObjectId(name);
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


    var data = await houseBoatModel.aggregate([
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
    var totalLength = await houseBoatModel.countDocuments(query);
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
// async function updateTripPackages(houseBoatId, commissionPercentage) {
//   try {
   
//     var tripPackages = await tripPackageModel.find({
//       houseBoatId: houseBoatId,status:"Active"
//     });
//     if(tripPackages.length>0){
//       for (var i = 0; i < tripPackages.length; i++) {
//         tripPackages[i].customerRateCommission = (tripPackages[i].customerRate*100)/(100+commissionPercentage);
//         console.log(tripPackages[i].customerRateCommission,"customerRateCommission")
//         tripPackages[i].agentRateCommission = (tripPackages[i].agentRate*100)/(100+commissionPercentage);
//         console.log(tripPackages[i].agentRateCommission,"agentExtraRateCommission")
//         tripPackages[i].commissionPercentage = commissionPercentage;
//         await tripPackages[i].save();
//       }
//     }
//   } catch (error) {
//     console.error("Error updating trip packages:", error);
//     throw error;
//   }
// }
//house boat approve
router.post("/houseboat/approve", adminAuth, async (req, res) => {
  try {
    var { houseBoatId ,commissionPercentage} = req.body;
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
      });
      return;
    }
    if (Misc.isnullorempty(commissionPercentage)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide commissionPercentage",
      });
      return;
    }
    var commissionPercentage = parseInt(req.body.commissionPercentage);
    if (commissionPercentage > 100 ) {
      res.status(200).json({
        status: false,
        msg: "commission percentage must be less than 100 ",
      });
      return;
    }
    if (commissionPercentage <=0 ) {
      res.status(200).json({
        status: false,
        msg: "commission percentage must be greater than 0",
      });
      return;
    }
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
      });
      return;
    }
    if(checkhouseboat.hasPackage == false){
      res.status(200).json({
        status: false,
        msg: "Can't approve this house boat without package",
      });
      return;
    }
    checkhouseboat.commissionPercentage=commissionPercentage;
    checkhouseboat.houseBoatStatus = "Approved";
    await checkhouseboat.save();
  // var commisionRate=await updateTripPackages(houseBoatId,commissionPercentage)
    res.status(200).json({
      status: true,
      data: checkhouseboat,
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
router.post("/houseboat/commission/edit", adminAuth, async (req, res) => {
  try {
    var { houseBoatId ,commissionPercentage} = req.body;
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
      });
      return;
    }
    if (Misc.isnullorempty(commissionPercentage)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide commissionPercentage",
      });
      return;
    }
    var commissionPercentage = parseInt(req.body.commissionPercentage);
    if (commissionPercentage > 100 ) {
      res.status(200).json({
        status: false,
        msg: "commission percentage must be less than 100 ",
      });
      return;
    }
    if (commissionPercentage <=0 ) {
      res.status(200).json({
        status: false,
        msg: "commission percentage must be greater than 0",
      });
      return;
    }
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
      });
      return;
    }
    if(checkhouseboat.hasPackage == false){
      res.status(200).json({
        status: false,
        msg: "Can't approve this house boat without package",
      });
      return;
    }
    checkhouseboat.commissionPercentage=commissionPercentage;
    await checkhouseboat.save();
  // var commisionRate=await updateTripPackages(houseBoatId,commissionPercentage)
    res.status(200).json({
      status: true,
      data: checkhouseboat,
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
router.post("/houseboat/block", adminAuth, async (req, res) => {
  try {
    var { houseBoatId } = req.body;
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
      });
      return;
    }
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
      });
      return;
    }
    checkhouseboat.houseBoatStatus = "Blocked";
    await checkhouseboat.save();

    res.status(200).json({
      status: true,
      data: checkhouseboat,
      msg: "Houseboat blocked",
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
router.get("/houseboat/blockedlist", adminAuth, async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query = { houseBoatStatus: "Blocked", status: "Active" };
    if (keyword) {
      query["$or"] = [{ houseBoatName: { $regex: keyword, $options: "i" } }];
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


    var data = await houseBoatModel.aggregate([
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
    var totalLength = await houseBoatModel.countDocuments({
      houseBoatStatus: "Blocked",
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
router.post("/houseboat/unblock", adminAuth, async (req, res) => {
  try {
    var { houseBoatId } = req.body;
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
      });
      return;
    }
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
      });
      return;
    }
    checkhouseboat.houseBoatStatus ="Approved";
    await checkhouseboat.save();

    res.status(200).json({
      status: true,
      data: checkhouseboat,
      msg: "Houseboat unblocked",
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
//house boat reject
router.post("/houseboat/reject", adminAuth, async (req, res) => {
  try {
    var { houseBoatId } = req.body;
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
      });
      return;
    }

    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
      });
      return;
    }

    checkhouseboat.houseBoatStatus = "Rejected";
    await checkhouseboat.save();

    res.status(200).json({
      status: true,
      data: checkhouseboat,
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
//house boat block
router.post("/houseboat/block", adminAuth, async (req, res) => {
  try {
    var { houseBoatId } = req.body;
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
      });
      return;
    }

    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
      });
      return;
    }

    checkhouseboat.houseBoatStatus = "Blocked";
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
router.get("/houseboat/package/delete", vendorAuth, async (req, res) => {
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
//package view by houseboat
router.post("/houseboat/package/data/old", vendorAuth, async (req, res) => {
  try {
    var {
      startDate,
      endDate,
      houseBoatId,
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
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
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
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
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
        houseBoatId: houseBoatId,
        tripTypeId: tripTypeId,packageType:"Special",
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
        //startDate: { $in: dates[i] },
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
          // numberOfRooms:checkpackage.numberOfRooms,
          _id:checkpackage._id,
          status: checkpackage.status 
         }
          if (checktrip.houseBoatType[0] === 'Sharing') {
          dat.numberOfRooms = checkhouseboat.totalRooms/* Fetch or calculate total rooms based on your logic */
          }
          else {
            dat.numberOfRooms=0;
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
          isAvailable:true,
          isEdit:false,
         // numberOfRooms:0,
          _id:null,
          status: "Active",
        }
        if ( checktrip.houseBoatType[0] === 'Sharing') {
          dat.numberOfRooms = checkhouseboat.totalRooms/* Fetch or calculate total rooms based on your logic */
          }
          else {
            dat.numberOfRooms=0;
          }
        dataArray.push(dat);
      }
      
    }
    res.status(200).json({
      status: true,
      data: dataArray,
      houseBoatType:checktrip.houseBoatType,
      commissionPercentage:checkhouseboat.commissionPercentage,
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
router.post("/houseboat/package/data/new", vendorAuth, async (req, res) => {
  try {
    var {
      startDate,
      endDate,
      houseBoatId,
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
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
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
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });                         //totalRooms
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
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
        houseBoatId: houseBoatId,
        tripTypeId: tripTypeId,
        packageType: "Special",
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
      });
      var dat = {}; // Moved variable declaration here

      if (checkpackage) {
        // If data is found for a date, add it to the dataArray
         dat = {
          date: currentDate,
          customerRate: checkpackage.customerRate ,
          customerExtraRate: checkpackage.customerExtraRate ,
          agentRate: checkpackage.agentRate ,
          agentExtraRate: checkpackage.agentExtraRate ,
          isAvailable: checkpackage.isAvailable, 
          isEdit:false,
          _id:checkpackage._id,
          status: checkpackage.status 
         };

        if (checktrip.houseBoatType.includes("Sharing")) {
          console.log("shating")
          var checkhbbooking = await houseboatBookingItemModel.findOne({
            houseBoatId: houseBoatId,
            tripType: checktrip.tripType,
            status: "Active",paymentStatus:"Success",
            startDate: { $lte: currentDate },                     
            endDate: { $gte: currentDate },
          });                                    //totalRooms
          if (checkhbbooking) 
          {
            console.log("shating1",checkhbbooking)
            console.log(checkhouseboat.totalRooms,"checkhouseboat.totalRooms")
            console.log(checkhbbooking.totalRooms,"checkhbbooking.totalRooms")
            dat.numberOfRooms = checkhouseboat.totalRooms - checkhbbooking.totalRooms;
            console.log(dat.numberOfRooms,"dat.numberOfRooms")
          }
          else
          {
            var checkReservation = await reservationModel.findOne({
              houseBoatId: houseBoatId,
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
              status: "Active",reservationStatus:"Reserved"             //totalRooms
           });
            if (checkReservation)
            {
                dat.numberOfRooms = checkhouseboat.totalRooms - checkReservation.totalRooms;
            } 
            else 
            {
                dat.numberOfRooms = checkhouseboat.totalRooms;
            }
         }   
        }
        if (checktrip.houseBoatType.includes("Private")) {
        console.log("private")
          var checkhbbooking = await houseboatBookingItemModel.findOne({
            houseBoatId: houseBoatId,
            tripType: checktrip.tripType,
            status: "Active",paymentStatus:"Success",
            startDate: { $lte: currentDate },
            endDate: { $gte: currentDate },
          });
          if (checkhbbooking) {
           // dat.numberOfRooms = checkhouseboat.totalRooms - checkhbbooking.totalRooms;
           dat.numberOfRooms=0;
          } else 
          {
            var checkReservation = await reservationModel.findOne({
              houseBoatId: houseBoatId,
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
              status: "Active",reservationStatus:"Reserved"
           });
            if (checkReservation)
            {
                //dat.numberOfRooms = checkhouseboat.totalRooms - checkReservation.totalRooms;
                dat.numberOfRooms=0;
            } 
            else 
            {
                dat.numberOfRooms = checkhouseboat.totalRooms;
            }
          }
        }
      } else {
        dat = {
          date: currentDate,
          customerRate:"",
          customerExtraRate:"",
          agentRate:"",
          agentExtraRate:"",
          isAvailable:true,
          isEdit:false,
          _id:null,
          status: "Active",
        };
        if (checktrip.houseBoatType.includes("Sharing")) {
          console.log("second")
          var checkhbbooking = await houseboatBookingItemModel.findOne({
            houseBoatId: houseBoatId,
            tripType: checktrip.tripType,
            status: "Active",paymentStatus:"Success",
            startDate: { $lte: currentDate },
            endDate: { $gte: currentDate },
          });
          if (checkhbbooking) 
          {
            dat.numberOfRooms = checkhouseboat.totalRooms - checkhbbooking.totalRooms;
          }
          else
          {
            var checkReservation = await reservationModel.findOne({
              houseBoatId: houseBoatId,
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
              status: "Active",reservationStatus:"Reserved"
           });
            if (checkReservation)
            {
                dat.numberOfRooms = checkhouseboat.totalRooms - checkReservation.totalRooms;
            } 
            else 
            {
                // If no reservation found, all rooms are available
                dat.numberOfRooms = checkhouseboat.totalRooms;
            }
          }
        }
         if (checktrip.houseBoatType.includes('Private')) {
        console.log("private")
          var checkhbbooking = await houseboatBookingItemModel.findOne({
            houseBoatId: houseBoatId,
            tripType: checktrip.tripType,
            status: "Active",paymentStatus:"Success",
            startDate: { $lte: currentDate },
            endDate: { $gte: currentDate },
          });
          console.log("checkhbbooking",checkhbbooking)
          if (checkhbbooking) {
            // dat.numberOfRooms = checkhouseboat.totalRooms - checkhbbooking.totalRooms;
            dat.numberOfRooms=0;
          } 
          else
          {
            var checkReservation = await reservationModel.findOne({
              houseBoatId: houseBoatId,
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
              status: "Active",reservationStatus:"Reserved"
           });
            if (checkReservation)
            {
              console.log("checkReservation",checkReservation)
              //  dat.numberOfRooms = checkhouseboat.totalRooms - checkReservation.totalRooms;
              dat.numberOfRooms=0;
            } 
            else 
            {
                dat.numberOfRooms = checkhouseboat.totalRooms;
            }
          }
        }
      }

      dataArray.push(dat);
    }

    res.status(200).json({
      status: true,
      data: dataArray,
      houseBoatType:checktrip.houseBoatType,
      commissionPercentage:checkhouseboat.commissionPercentage,
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
router.post("/houseboat/package/data", vendorAuth, async (req, res) => {
  try {
    var { startDate, endDate, houseBoatId, tripTypeId } = req.body;
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
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
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
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    }); //totalRooms
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
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
    var fromDateTime = new Date(startDate);
    var endDateTime = new Date(endDate);
    var dates = [];
    let currentDateObj = new Date(fromDateTime);

    while (currentDateObj <= endDateTime) {
      dates.push(currentDateObj.toISOString().split("T")[0]);
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    var dataArray = [];

    for (var i = 0; i < dates.length; i++) {
      var currentDate = dates[i];
      // Query in trippackagemodel for each date
      var checkpackage = await tripPackageModel.findOne({
        status: "Active",
        houseBoatId: houseBoatId,
        tripTypeId: tripTypeId,
        packageType: "Special",
        startDate: { $lte: currentDate },
        endDate: { $gte: currentDate },
      });
      var dat = {}; // Moved variable declaration here

      if (checkpackage) {
        // If data is found for a date, add it to the dataArray
        dat = {
          date: currentDate,
          customerRate: checkpackage.customerRate,
          customerExtraRate: checkpackage.customerExtraRate,
          agentRate: checkpackage.agentRate,
          agentExtraRate: checkpackage.agentExtraRate,
          isAvailable: checkpackage.isAvailable,
          isEdit: false,
          _id: checkpackage._id,
          status: checkpackage.status,
        };
        if (checktrip.houseBoatType.length == 1) {
          if (checktrip.houseBoatType.includes("Sharing")) {
            var checkhbbooking = await houseboatBookingItemModel.findOne({
              houseBoatId: houseBoatId,
              tripType: checktrip.tripType,
              status: "Active",
              houseBoatType: "Sharing",
              paymentStatus: "Success",
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
            });
            if (!Misc.isnullorempty(checkhbbooking)) {
              dat.numberOfRooms =
                checkhouseboat.totalRooms - checkhbbooking.totalRooms;
            } else {
              var checkReservation = await reservationModel.findOne({
                houseBoatId: houseBoatId,
                tripType: checktrip.tripType,
                startDate: { $lte: currentDate },
                endDate: { $gte: currentDate },
                houseBoatType: "Sharing",
                status: "Active",
                reservationStatus: "Reserved",
              });
              if (checkReservation) {
                dat.numberOfRooms =
                  checkhouseboat.totalRooms - checkReservation.totalRooms;
              } else {
                dat.numberOfRooms = checkhouseboat.totalRooms;
              }
            }
            dataArray.push(dat);
          } else if (checktrip.houseBoatType.includes("Private")) {
            var checkhbbooking = await houseboatBookingItemModel.findOne({
              houseBoatId: houseBoatId,
              tripType: checktrip.tripType,
              status: "Active",
              houseBoatType: "Private",
              paymentStatus: "Success",
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
            });
            if (!Misc.isnullorempty(checkhbbooking)) {
              dat.numberOfRooms = 0;
            } else {
              var checkReservation = await reservationModel.findOne({
                houseBoatId: houseBoatId,
                tripType: checktrip.tripType,
                startDate: { $lte: currentDate },
                endDate: { $gte: currentDate },
                houseBoatType: "Private",
                status: "Active",
                reservationStatus: "Reserved",
              });
              if (checkReservation) {
                dat.numberOfRooms = 0;
              } else {
                dat.numberOfRooms = checkhouseboat.totalRooms;
              }
            }
            dataArray.push(dat);
          }
        } else {
          if (checktrip.houseBoatType.length == 2) {
            //sharing and private
            var HBsharing = await houseboatBookingItemModel.findOne({
              houseBoatId: houseBoatId,
              tripType: checktrip.tripType,
              status: "Active",
              houseBoatType: "Sharing",
              paymentStatus: "Success",
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
            });
            if (HBsharing) {
              dat.numberOfRooms =
                checkhouseboat.totalRooms - HBsharing.totalRooms;
            } else {
              var HBreservation = await reservationModel.findOne({
                houseBoatId: houseBoatId,
                tripType: checktrip.tripType,
                status: "Active",
                reservationStatus: "Reserved",
                houseBoatType: "Sharing",
                startDate: { $lte: currentDate },
                endDate: { $gte: currentDate },
              });
              if (HBreservation) {
                dat.numberOfRooms =
                  checkhouseboat.totalRooms - HBreservation.totalRooms;
              } else {
                var HBprivatebooking = await houseboatBookingItemModel.findOne({
                  houseBoatId: houseBoatId,
                  tripType: checktrip.tripType,
                  status: "Active",
                  houseBoatType: "Private",
                  paymentStatus: "Success",
                  startDate: { $lte: currentDate },
                  endDate: { $gte: currentDate },
                });
                if (HBprivatebooking) {
                  dat.numberOfRooms =
                    checkhouseboat.totalRooms - HBprivatebooking.totalRooms;
                } else {
                  var HBprivatereservation = await reservationModel.findOne({
                    houseBoatId: houseBoatId,
                    tripType: checktrip.tripType,
                    status: "Active",
                    reservationStatus: "Reserved",
                    houseBoatType: "Private",
                    startDate: { $lte: currentDate },
                    endDate: { $gte: currentDate },
                  });
                  if (HBprivatereservation) {
                    dat.numberOfRooms =
                      checkhouseboat.totalRooms -
                      HBprivatereservation.totalRooms;
                  } else {
                    dat.numberOfRooms = checkhouseboat.totalRooms;
                  }
                }
              }
            }
          }
          dataArray.push(dat);
        }
      } else {
        dat = {
          date: currentDate,
          customerRate: "",
          customerExtraRate: "",
          agentRate: "",
          agentExtraRate: "",
          isAvailable: true,
          isEdit: false,
          _id: null,
          status: "Active",
        };
        if (checktrip.houseBoatType.length == 1) {
          if (checktrip.houseBoatType.includes("Sharing")) {
            var checkhbbooking = await houseboatBookingItemModel.findOne({
              houseBoatId: houseBoatId,
              tripType: checktrip.tripType,
              status: "Active",
              houseBoatType: "Sharing",
              paymentStatus: "Success",
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
            });
            if (!Misc.isnullorempty(checkhbbooking)) {
              dat.numberOfRooms =
                checkhouseboat.totalRooms - checkhbbooking.totalRooms;
            } else {
              var checkReservation = await reservationModel.findOne({
                houseBoatId: houseBoatId,
                tripType: checktrip.tripType,
                startDate: { $lte: currentDate },
                endDate: { $gte: currentDate },
                houseBoatType: "Sharing",
                status: "Active",
                reservationStatus: "Reserved",
              });
              if (checkReservation) {
                dat.numberOfRooms =
                  checkhouseboat.totalRooms - checkReservation.totalRooms;
              } else {
                dat.numberOfRooms = checkhouseboat.totalRooms;
              }
            }
            //  dataArray.push(dat);
          } else if (checktrip.houseBoatType.includes("Private")) {
            var checkhbbooking = await houseboatBookingItemModel.findOne({
              houseBoatId: houseBoatId,
              tripType: checktrip.tripType,
              status: "Active",
              houseBoatType: "Private",
              paymentStatus: "Success",
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
            });
            if (!Misc.isnullorempty(checkhbbooking)) {
              dat.numberOfRooms = 0;
            } else {
              var checkReservation = await reservationModel.findOne({
                houseBoatId: houseBoatId,
                tripType: checktrip.tripType,
                startDate: { $lte: currentDate },
                endDate: { $gte: currentDate },
                houseBoatType: "Private",
                status: "Active",
                reservationStatus: "Reserved",
              });
              if (checkReservation) {
                dat.numberOfRooms = 0;
              } else {
                dat.numberOfRooms = checkhouseboat.totalRooms;
              }
            }
            //dataArray.push(dat);
          }
        } else {
          if (checktrip.houseBoatType.length == 2) {
            //sharing and private
            var HBsharing = await houseboatBookingItemModel.findOne({
              houseBoatId: houseBoatId,
              tripType: checktrip.tripType,
              status: "Active",
              houseBoatType: "Sharing",
              paymentStatus: "Success",
              startDate: { $lte: currentDate },
              endDate: { $gte: currentDate },
            });
            if (HBsharing) {
              dat.numberOfRooms =
                checkhouseboat.totalRooms - HBsharing.totalRooms;
            } else {
              var HBreservation = await reservationModel.findOne({
                houseBoatId: houseBoatId,
                tripType: checktrip.tripType,
                status: "Active",
                reservationStatus: "Reserved",
                houseBoatType: "Sharing",
                startDate: { $lte: currentDate },
                endDate: { $gte: currentDate },
              });
              if (HBreservation) {
                dat.numberOfRooms =
                  checkhouseboat.totalRooms - HBreservation.totalRooms;
                dat.numberOfRooms =
                  checkhouseboat.totalRooms - HBreservation.totalRooms;
                console.log(dat.numberOfRooms, "dat.numberOfRooms*******");
                dat.numberOfRooms =
                  checkhouseboat.totalRooms - HBreservation.totalRooms;
                console.log(dat.numberOfRooms, "dat.numberOfRooms*******");
              } else {
                var HBprivatebooking = await houseboatBookingItemModel.findOne({
                  houseBoatId: houseBoatId,
                  tripType: checktrip.tripType,
                  status: "Active",
                  houseBoatType: "Private",
                  paymentStatus: "Success",
                  startDate: { $lte: currentDate },
                  endDate: { $gte: currentDate },
                });
                if (HBprivatebooking) {
                  dat.numberOfRooms =
                    checkhouseboat.totalRooms - HBprivatebooking.totalRooms;
                } else {
                  var HBprivatereservation = await reservationModel.findOne({
                    houseBoatId: houseBoatId,
                    tripType: checktrip.tripType,
                    status: "Active",
                    reservationStatus: "Reserved",
                    houseBoatType: "Private",
                    startDate: { $lte: currentDate },
                    endDate: { $gte: currentDate },
                  });
                  if (HBprivatereservation) {
                    dat.numberOfRooms =
                      checkhouseboat.totalRooms -
                      HBprivatereservation.totalRooms;
                  } else {
                    dat.numberOfRooms = checkhouseboat.totalRooms;
                  }
                }
              }
            }
          }
        }

        dataArray.push(dat);
      }
    }
    res.status(200).json({
      status: true,
      data: dataArray,
      houseBoatType: checktrip.houseBoatType,
      commissionPercentage: checkhouseboat.commissionPercentage,
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
//special rate add
router.post("/houseboat/specialrate/add/v1", vendorAuth, async (req, res) => {
  try {
    var {
      houseBoatId,packageDetails,tripTypeId,startDate,endDate,
    } = req.body;
    console.log(packageDetails,"packageDetails")
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
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
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
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
              houseBoatId:houseBoatId,
              startDate:packageDetails[i].date,  
              endDate: packageDetails[i].date,
              customerRate: packageDetails[i].customerRate,
              customerExtraRate:packageDetails[i].customerExtraRate,
              agentRate: packageDetails[i].agentRate,
              agentExtraRate:packageDetails[i].agentExtraRate,
              isAvailable: packageDetails[i].isAvailable,
              numberOfRooms:packageDetails[i].numberOfRooms,
              packageType: "Special",

              customerRateCommission:packageDetails[i].customerRateCommission,
              customerExtraRateCommission:packageDetails[i].customerExtraRateCommission,
              agentRateCommission:packageDetails[i].agentRateCommission,
              agentExtraRateCommission:packageDetails[i].agentExtraRateCommission
            });
            await tripPackage.save();
        }
        else if(packageDetails[i]._id!=null){
          await tripPackageModel.findOneAndUpdate(
            { _id: packageDetails[i]._id ,status:"Active"},   //check status also
            {
              $set: {
                tripTypeId:tripTypeId,
                houseBoatId:houseBoatId,
                startDate:packageDetails[i].date,  
                endDate: packageDetails[i].date,
                customerRate: packageDetails[i].customerRate,
                customerExtraRate:packageDetails[i].customerExtraRate,
                agentRate: packageDetails[i].agentRate,
                agentExtraRate:packageDetails[i].agentExtraRate,
                isAvailable: packageDetails[i].isAvailable,
                numberOfRooms:packageDetails[i].numberOfRooms,
                packageType: "Special",

                customerRateCommission:packageDetails[i].customerRateCommission,
                customerExtraRateCommission:packageDetails[i].customerExtraRateCommission,
                agentRateCommission:packageDetails[i].agentRateCommission,
                agentExtraRateCommission:packageDetails[i].agentExtraRateCommission
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
router.post("/houseboat/specialrate/add/v2original", vendorAuth, async (req, res) => {
  try {
    var {
      houseBoatId,packageDetails,tripTypeId,startDate,endDate,
    } = req.body;
    console.log(packageDetails,"packageDetails")
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
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
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
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
     // if(!(packageDetails[i].customerRate=="" && packageDetails[i].agentRate=="" )){
      if(packageDetails[i].isEdit==true){
          if(packageDetails[i]._id===null){
        
          var tripPackage = new tripPackageModel({
              tripTypeId:tripTypeId,
              houseBoatId:houseBoatId,
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

              //field name changes from front end
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
                houseBoatId:houseBoatId,
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
router.post("/houseboat/specialrate/add/latest", vendorAuth, async (req, res) => {
  try {
    var {
      houseBoatId,packageDetails,tripTypeId,startDate,endDate,
    } = req.body;
    console.log(packageDetails,"packageDetails")
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
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
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
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
     // if(!(packageDetails[i].customerRate=="" && packageDetails[i].agentRate=="" )){
      if(packageDetails[i].isEdit==true){
          if(packageDetails[i]._id===null){
        
          var tripPackage = new tripPackageModel({
              tripTypeId:tripTypeId,
              houseBoatId:houseBoatId,
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

              //field name changes from front end
              customerRateCommission:packageDetails[i].customerNetrate,
              agentRateCommission:packageDetails[i].agentNetrate,
            });
            await tripPackage.save();
        }
        else if(packageDetails[i]._id!=null){
            //check in trippackagemodel
            var checktripPackage = await tripPackageModel.findOne({
              _id: packageDetails[i]._id,status:"Active",isAvailable:false
            })
            if(!Misc.isnullorempty(checktripPackage)){
              //delete from trippackagemodel

              //check in bookingmodel 
              var checkbooking = await houseboatBookingItemModel.find({
                startDate:{$lte:packageDetails[i].date},endDate:{$gte:packageDetails[i].date},status:"Active",paymentStatus:"Success",houseBoatId:houseBoatId,tripType:checktrip.tripType
              })
              if(checkbooking.length>0){
                res.status(200).json({
                  status: false,
                  msg: "Already Bookings for this date",
                });
                return;
              }
              else{
                await tripPackageModel.deleteOne({ _id: packageDetails[i]._id,status:"Active",isAvailable:false})
              }
             
            }
            else{
              await tripPackageModel.findOneAndUpdate(
                { _id: packageDetails[i]._id ,status:"Active"},   //check status also
                {
                  $set: {
                    tripTypeId:tripTypeId,
                    houseBoatId:houseBoatId,
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
router.post("/houseboat/specialrate/add", vendorAuth, async (req, res) => {
  try {
    var {
      houseBoatId,packageDetails,tripTypeId,startDate,endDate,
    } = req.body;
    console.log(packageDetails,"packageDetails")
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
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
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
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
     // if(!(packageDetails[i].customerRate=="" && packageDetails[i].agentRate=="" )){
      if(packageDetails[i].isEdit==true){
          if(packageDetails[i]._id===null){
        
          var tripPackage = new tripPackageModel({
              tripTypeId:tripTypeId,
              houseBoatId:houseBoatId,
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

              //field name changes from front end
              customerRateCommission:packageDetails[i].customerNetrate,
              agentRateCommission:packageDetails[i].agentNetrate,
            });
            await tripPackage.save();
        }
        else if(packageDetails[i]._id!=null){
            //check in trippackagemodel
            var checktripPackage = await tripPackageModel.findOne({
              _id: packageDetails[i]._id,status:"Active",isAvailable:false
            })
            if(!Misc.isnullorempty(checktripPackage)){
              //delete from trippackagemodel
              await tripPackageModel.deleteOne({ _id: packageDetails[i]._id,status:"Active",isAvailable:false})
            }
            else{
              await tripPackageModel.findOneAndUpdate(
                { _id: packageDetails[i]._id ,status:"Active"},   //check status also
                {
                  $set: {
                    tripTypeId:tripTypeId,
                    houseBoatId:houseBoatId,
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
//only give houseboat special data
router.post("/houseboat/data", vendorAuth, async (req, res) => {
  try {
    var {
      houseBoatId,
    } = req.body;
    if (Misc.isnullorempty(houseBoatId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide houseBoatId",
      });
      return;
    }
    var checkhouseboat = await houseBoatModel.findOne({
      _id: houseBoatId,
      status: "Active",
    }).populate('location');
    if (Misc.isnullorempty(checkhouseboat)) {
      res.status(200).json({
        status: false,
        msg: "House Boat  Not found",
      });
      return;
    }
    var specialData={
      _id:houseBoatId,
      houseBoatName:checkhouseboat.houseBoatName,
      category:checkhouseboat.category,
      totalRooms:checkhouseboat.totalRooms,
      location:checkhouseboat.location
    }
   res.status(200).json({
      status: true,
      data:specialData,
      msg: "Data Fetched Successfully",
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