const express = require("express");
const router = express();
var jwt = require("jsonwebtoken");
var shortid = require("shortid");
const Misc = require("../controllers/Misc");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const tokenModel = require("../models/tokenModel");
const ifToken = require("../middleware/ifToken");
const userModel = require("../models/userModel");
const houseBoatModel = require("../models/houseBoatModel");
const shikaraModel = require("../models/shikaraModel");
const tripPackageModel = require("../models/tripPackageModel");
const houseboatBookingModel = require("../models/houseboatBookingModel");
const tripTypeModel = require("../models/tripTypeModel");
const guestOrUser = require("../middleware/guestOrUser");
const EmailHelper = require("../controllers/Email");
const PaymentModel = require("../models/paymentModel");
const houseboatBookingItemModel = require("../models/houseboatBookingItemModel");
const randomstring = require("randomstring");
const PaymentHelper = require("../controllers/phonePeHelper");
const paymentModel = require("../models/paymentModel");
const shikaraBookingModel=require("../models/shikaraBookingModel")
const imageHelper = require("../controlize/imageHelperS3");
const upload = imageHelper.upload;
//const agentAuth = require("../middleware/agentAuth");
var ResponceModel = require('../models/paymentResponceModel');
const ticketController = require('../controllers/ticketController');
const RateController = require('../controllers/customerRateHelper');
const agentAuth = require("../middleware/agentAuth");
const  reviewModel=require("../models/reviewModel");
//const cron=require('node-cron');


async function generateUniqueId(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let uniqueId = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      uniqueId += characters.charAt(randomIndex);
  }
  uniqueId = "KL_" + uniqueId
  return uniqueId;
}


async function generateBookingNo(userid) {
  var bills = await houseboatBookingItemModel.find({/* userid:userid,*/
    status: "Active",paymentStatus:"Success",/*bookingType:"Agent"*/
  }) .sort({ checkbookingNo: -1 }).limit(1);
 // console.log(bills,'bills')
  if (bills.length > 0) {
            if(bills[0].checkbookingNo){
              if(bills[0].checkbookingNo<=8){
                var billnocheck = bills[0].checkbookingNo + 1;
                bookingNo="KLHB0"+billnocheck
              }
              else{
                var billnocheck = bills[0].checkbookingNo + 1;
                bookingNo="KLHB"+billnocheck
              }
               
          }
          else{
            console.log(2)
            bookingNo="KLHB01"
          }
  }
  else{
     console.log(3)
      bookingNo="KLHB01"      
  }
  return bookingNo;
}
async function generateCustomerBookingNo(userid) {
    var bills = await houseboatBookingItemModel.find({/* userid:userid,*/
      status: "Active",paymentStatus:"Success",/*bookingType:"Customer"*/
    }) .sort({ checkbookingNo: -1 }).limit(1);
   // console.log(bills,'bills')
    if (bills.length > 0) {
              if(bills[0].checkbookingNo){
                if(bills[0].checkbookingNo<=8){
                  var billnocheck = bills[0].checkbookingNo + 1;
                  bookingNo="KLHB0"+billnocheck
                }
                else{
                  var billnocheck = bills[0].checkbookingNo + 1;
                  bookingNo="KLHB"+billnocheck
                }
                 
            }
            else{
              console.log(2)
              bookingNo="KLHB01"
            }
    }
    else{
       console.log(3)
        bookingNo="KLHB01"      
    }
    return bookingNo;
  }
async function findCombinations(houseboats, targetRooms) {
  const result = [];

  async function backtrack(start, target, path) {
    if (target === 0) {
      result.push([...path]);
      return;
    }

    for (var i = start; i < houseboats.length; i++) {
      if (target >= houseboats[i].totalRooms) {
        path.push(houseboats[i]);
        backtrack(i + 1, target - houseboats[i].totalRooms, path);
        path.pop();
      }
    }
  }

  backtrack(0, targetRooms, []);
  return result;
}
async function getDates(startDate, endDate) {
  var dates = [];
  var d1 = new Date(startDate);
  d1.setHours(5, 30, 0, 0);
  d1 = new Date(d1);

  var d2 = new Date(endDate);
  d2.setHours(5, 30, 0, 0);
  d2 = new Date(d2);

  while (d1 < d2) {
    dates.push(new Date(d1));
    d1.setDate(d1.getDate() + 1);
  }

  return dates;
}

async function getDatesIncluded(startDate, endDate) {
  var dates = [];
  var d1 = new Date(startDate);
  d1.setHours(5, 30, 0, 0);
  d1 = new Date(d1);

  var d2 = new Date(endDate);
  d2.setHours(5, 30, 0, 0);
  d2 = new Date(d2);

  while (d1 <= d2) {
    dates.push(new Date(d1));
    d1.setDate(d1.getDate() + 1);
  }

  return dates;
}
async function calculateDaysDifference(startDate, endDate) {
  var start = new Date(startDate);
  var end = new Date(endDate);

  var timeDifference = end - start;

  // Calculate the number of days
  var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  // Return 1 if start and end dates are the same, otherwise return the calculated difference
  return daysDifference === 0 ? 1 : daysDifference;
}
//////////////////////       CUSTOMER SECTION         ////////////////////////
async function getDatesFiltered(startDate, endDate) {
  var dates = [];
  var d1 = new Date(startDate);
  d1.setHours(5, 30, 0, 0);
  d1 = new Date(d1);

  var d2 = new Date(endDate);
  d2.setHours(5, 30, 0, 0);
  d2 = new Date(d2);

  while (d1 <= d2) {
    dates.push(new Date(d1));
    d1.setDate(d1.getDate() + 1);
  }

  return dates;
}
async function getDates(startDate, endDate) {
  var dates = [];
  var d1 = new Date(startDate);
  d1.setHours(5, 30, 0, 0);
  d1 = new Date(d1);

  var d2 = new Date(endDate);
  d2.setHours(5, 30, 0, 0);
  d2 = new Date(d2);

  while (d1 < d2) {
    dates.push(new Date(d1));
    d1.setDate(d1.getDate() + 1);
  }

  return dates;
}
function getCombinations(data, totalGuests) {
  var remainingGuests = totalGuests;
  var combinations = [];

  while (remainingGuests > 0 && data.length > 0) {
      var nearestLowerValueObj = findNearestLowerValue(data, remainingGuests);

      if (Misc.isnullorempty(nearestLowerValueObj)) {
          break;
      }
      combinations.push(nearestLowerValueObj);

      // Remove the found object from the data array
      var indexToRemove = data.indexOf(nearestLowerValueObj);
      if (indexToRemove !== -1) {
          data.splice(indexToRemove, 1);
      }

      remainingGuests -= nearestLowerValueObj.totalRooms;
  }

  return combinations;
}


function findNearestLowerValue(arr, target) {
  const sortedArr = arr.slice().sort((a, b) => a.totalRooms - b.totalRooms);

  let result = null;

  for (const obj of sortedArr) {
      if (obj.totalRooms <= target) {
          result = obj;
      } else {
          break; // Stop iterating once we exceed the target value
      }
  }

  return result;
}

function getCombinationsOnDay(arr, total) {
  const result = [];
  const set = new Set();
  function generateCombinations(start, combination) {
    const sum = combination.reduce((acc, obj) => acc + obj.tripDetails.maxPersonTrips, 0);
    if (sum >= total) {
      const sortedCombination = combination
        .slice()
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
      const key = sortedCombination.map(obj => obj.name).join('-');
      if (!set.has(key)) {
        set.add(key);
        result.push(sortedCombination);
      }
      return;
    }
    for (let i = start; i < arr.length; i++) {
      const newCombination = [...combination, arr[i]];
      generateCombinations(i + 1, newCombination);
    }
  }
  generateCombinations(0, []);
  return result;
}

function getCombinationsOnRoomBasis(arr, total) {
  const result = [];
  const set = new Set();
  function generateCombinations(start, combination) {
    const sum = combination.reduce((acc, obj) => acc + obj.tripDetails.totalGuestCanBeAccomadated, 0);
    if (sum >= total) {
      const sortedCombination = combination
        .slice()
        .sort((a, b) => (a.name > b.name ? 1 : a.name < b.name ? -1 : 0));
      const key = sortedCombination.map(obj => obj.name).join('-');
      if (!set.has(key)) {
        set.add(key);
        result.push(sortedCombination);
      }
      return;
    }
    for (let i = start; i < arr.length; i++) {
      const newCombination = [...combination, arr[i]];
      generateCombinations(i + 1, newCombination);
    }
  }
  generateCombinations(0, []);
  return result;
}

// router.post('/houseboat/booking/filter/old',async(req,res)=>{
//   try{
//       var {page,limit,category,houseBoatType,location,tripType,numberofRooms,checkInDate,checkOutDate,children,adult} = req.body;
//       var pageNo = 1,dataLimit = 20;
//       if (!Misc.isnullorempty(page) && !Misc.isnullorempty(limit)) {
//           page = parseInt(page);
//           limit = parseInt(limit);qq
//           if (
//               typeof page === "number" &&
//               typeof limit === "number" &&
//               page > 0 &&
//               limit > 0
//           ) {
//               pageNo = page;
//               dataLimit = limit;
//           }
//       }
//       if (Misc.isnullorempty(category)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide Category",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(houseBoatType)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide houseBoatType",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(location)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide location",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(tripType)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide tripType",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(numberofRooms)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide numberofRooms",
//           });
//           return;
//       }
//       if (typeof numberofRooms != 'number'){
//           numberofRooms=parseInt(numberofRooms)
//       }
//       if(numberofRooms<=0){
//           res.status(200).json({
//               status:false,
//               msg:"Number of rooms should be greater than zero."
//           });
//           return;
//       }
//       if(numberofRooms>=50){
//           res.status(200).json({
//               status:false,
//               msg:"Please select a valid number of rooms."
//           });
//           return;
//       }
//       if (Misc.isnullorempty(checkInDate)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide checkInDate",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(checkOutDate)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide checkOutDate",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(adult)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide adult",
//           });
//           return;
//       }
//       if(typeof adult != 'number'){
//           adult = parseInt(adult);
//       }
//       if(adult<=0){
//           res.status(200).json({
//               status:false,
//               msg:"Please select atleast one adult guest."
//           });
//           return;
//       }
//       if(Misc.isnullorempty(children)){
//           children = 0
//       }else{
//           children = parseInt(children)
//       }
//       if(children<0){
//           res.status(200).json({
//               status:false,
//               msg:"Number of children should be a postive number."
//           });
//           return;
//       }
//       var totalGuest = adult;//Consider only the adults as valid guests
      
//       var startDateTime = new Date(checkInDate);
//       var endDateTime = new Date(checkOutDate);
//       var includedDates = await getDates(startDateTime,endDateTime)//It will Return all program included dates
     
//       var result = []
//       var houseBoatQuery = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category, };//House boat query setting
//       if (houseBoatType === "Private") {
//           //All Three Category DayCruis NightStay and OverNight 
//           if(tripType == "DayCruise"){
//               //Query For Day Cruis 
//               houseBoatQuery.totalRooms = {$gte:numberofRooms}//Condetions for total Rooms available
//               var includedDates = await getDatesFiltered(startDateTime,endDateTime)//Function returns the dates of booking it ignores the checkout date
//               const today = new Date();
//               const eightDaysAhead = new Date(today);
//               eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
//               if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
//                   console.log("In 8 Days")//If out side 8 days error shoud be generated
//                   res.status(200).json({
//                       status: true,
//                       data: [],
//                       page: pageNo,
//                       limit: dataLimit,
//                       totalLength:0,
//                       singleboat: true,
//                       msg: "success",
//                   });
//                   return;
//               }
//               const todayYear = today.getFullYear();
//               const todayMonth = today.getMonth();
//               const todayDate = today.getDate();
//               const today1PM = new Date(todayYear, todayMonth, todayDate, 13, 0, 0);
//               var dateToCheck = new Date(includedDates[0]);
//               //In day cruis if we are searching for today as start date we should check if it the current time is grater than 1PM error should be generated
//               if (
//                   dateToCheck.getFullYear() === todayYear &&
//                   dateToCheck.getMonth() === todayMonth &&
//                   dateToCheck.getDate() === todayDate &&
//                   today.getTime() > today1PM.getTime()
//               ){
//                   console.log("No Trip For Today")
//                   //Today trip start time is over ,Trip is already started
//                   res.status(200).json({
//                       status: true,
//                       data: [],
//                       page: pageNo,
//                       limit: dataLimit,
//                       totalLength:0,
//                       singleboat: true,
//                       msg: "success",
//                   });
//                   return;
//               }
//               houseBoatQuery.isDayCriuse = true;
//               var houseBoats = await houseBoatModel.aggregate([
//                   {$match:houseBoatQuery},
//                   {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                   {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                   {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                   {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                   {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$tripType","DayCruise"]},
//                                   { $in: ["Private", "$houseBoatType"] }
//                               ]
//                           }}
//                       }],as:"tripDetails"},
//                   },
//                   {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                   {$match:{tripDetails:{$exists:true},}},
//                   {$match:{"tripDetails.maxPersonTrips":{$gte:totalGuest}}},
//                   {$match:{"tripDetails.minPersonTrips":{$lte:totalGuest}}},
//                   {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   {
//                                       $or: [
//                                         { $eq: ["$tripType", "DayCruise"] },
//                                         { $eq: ["$tripType", "OverNight"] }
//                                       ]
//                                   },
//                                   { $eq: ["$paymentStatus", "Success"] },
//                                   {
//                                       $setIsSubset: [ "$bookedDates",includedDates]
//                                   },
//                               ]
//                           }}
//                       }],as:"Bookings"},
//                   },
//                   {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                   {$match:{Bookings:{$exists:false},}},
//                   {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   {
//                                       $or: [
//                                         { $eq: ["$tripType", "DayCruise"] },
//                                         { $eq: ["$tripType", "OverNight"] }
//                                       ]
//                                   },
//                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                   {
//                                       $setIsSubset: [ "$reservedDates",includedDates]
//                                   },
//                               ]
//                           }}
//                       }],as:"Reservations"},
//                   },
//                   {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                   {$match:{Reservations:{$exists:false},}},
//                   //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//               ])
//               /*
//               ---------------------CODE EXPLANATION----------------
//               houseBoatModel.aggregate([...]): This initiates the aggregation pipeline on the houseBoatModel collection.
//               {$match: houseBoatQuery}: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//               $lookup stages: These stages perform a left outer join to fetch related data from other collections (sublocationmodels, locationmodels, triptypemodels) based on specified fields (startingLocation, location, _id).
//               $unwind stages: These stages deconstruct arrays generated by the $lookup stages, ensuring each document has a single value or null for those fields.
//               $lookup and subsequent stages for tripDetails: These stages perform a nested lookup to retrieve specific trip details from the triptypemodels collection based on various criteria such as active status, trip type, and house boat type.
//               $match stages related to tripDetails: These stages filter the documents based on the existence of tripDetails, maximum and minimum person trips compared to totalGuest.
//               $lookup, $unwind, and $match stages for Bookings and Reservations: These stages check for active bookings and reservations for the house boats, considering specific criteria like active status, trip types (day cruise or overnight), successful payment status, and the presence of included dates within booked or reserved dates.
//               This pipeline essentially combines multiple stages to filter and match documents based on various conditions and relationships with related collections, ultimately aiming to retrieve houseBoatModel documents that meet the specified criteria for availability and booking status.
//               ---------------------------END-----------------------
//               */
//               houseBoats = JSON.parse(JSON.stringify(houseBoats))
//               for(var i=0;i<houseBoats.length;i++){
//                   //Calcuation for rate a function is called.
//                   var getRate = await RateController.CalculateDayCruisRate(houseBoats[i],includedDates,totalGuest)
//                   if(getRate.status == true){
//                     houseBoats[i].customerRate = getRate.rate;
//                     result.push(houseBoats[i])
//                 }
//               }
//           }else if(tripType == "NightStay"){
//               var includedDates = await getDates(startDateTime,endDateTime)
//               if(startDateTime.getTime()>endDateTime.getTime()){
//                   res.status(200).json({
//                       status:false,
//                       msg:"Invalid date selection, Please modify your search and try again."
//                   });
//                   return;
//               }
//               const today = new Date();
//               const todayYear = today.getFullYear();
//               const todayMonth = today.getMonth();
//               const todayDate = today.getDate();
//               const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
//               var dateTocheck = new Date(includedDates[0])
//               if (
//                   dateTocheck.getFullYear() === todayYear &&
//                   dateTocheck.getMonth() === todayMonth &&
//                   dateTocheck.getDate() === todayDate &&
//                   today.getTime() > today11PM.getTime()
//               ){
//                   console.log("No Trip For Today")
//                   res.status(200).json({
//                       status: true,
//                       data: [],
//                       page: pageNo,
//                       limit: dataLimit,
//                       totalLength:0,
//                       singleboat: true,
//                       msg: "success",
//                   });
//                   return;
//               }
//               houseBoatQuery.isNightStay = true;
//               houseBoatQuery.totalRooms = {$gte:numberofRooms}
//               var houseBoats = await houseBoatModel.aggregate([
//                   { $match: houseBoatQuery },
//                   { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//                   { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//                   { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//                   { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//                   {
//                       $lookup: {
//                           from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                           pipeline: [{
//                               $match: {
//                                   $expr: {
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $in: ["Private", "$houseBoatType"] }
//                                       ]
//                                   }
//                               }
//                           }], as: "tripDetails"
//                       },
//                   },
//                   { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//                   { $match: { tripDetails: { $exists: true }, } },
//                   { $match: { "tripDetails.maxCapacityOfBoats": { $gte: totalGuest } } },
//                   { $match: { "tripDetails.minCapacityOfBoats": { $lte: totalGuest } } },
//                   {
//                       $lookup: {
//                           from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                           pipeline: [{
//                               $match: {
//                                   $expr: {
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$paymentStatus", "Success"] },
//                                           {
//                                               $or: [{
//                                                   $and: [
//                                                       { $eq: ["$tripType", "NightStay"] },
//                                                       { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$endDate", startDateTime] }] }]
//                                               },
//                                               {
//                                                   $and: [
//                                                       { $eq: ["$tripType", "OverNight"] },
//                                                       { $and: [{ $lte: ["$endDateTime", "$endDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
//                                               },
//                                               ]
//                                           }
//                                       ]
//                                   }
//                               }
//                           }], as: "Bookings"
//                       },
//                   },
//                   { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//                   { $match: { Bookings: { $exists: false }, } },
//                   {
//                       $lookup: {
//                           from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                           pipeline: [{
//                               $match: {
//                                   $expr: {
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$reservationStatus", "Reserved"] },
//                                           {
//                                               $or: [{
//                                                   $and: [
//                                                       { $eq: ["$tripType", "NightStay"] },
//                                                       { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$checkOutDate", startDateTime] }] }]
//                                               },
//                                               {
//                                                   $and: [
//                                                       { $eq: ["$tripType", "OverNight"] },
//                                                       { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
//                                               },
//                                               ]
//                                           }
//                                       ]
//                                   }
//                               }
//                           }], as: "Reservations"
//                       },
//                   },
//                   { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//                   { $match: { Reservations: { $exists: false }, } },
//                   {
//                       $lookup: {
//                           from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                           pipeline: [{
//                               $match: {
//                                   $expr: {
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$paymentStatus", "Success"] },
//                                           { $eq: ["$tripType", "DayCruise"] },
//                                           {
//                                               $setIsSubset: [ includedDates,"$bookedDates" ]
//                                           }
//                                       ]
//                                   }
//                               }
//                           }], as: "DayBookings"
//                       },
//                   },
//                   { $unwind: { "path": "$DayBookings", preserveNullAndEmptyArrays: true } },
//                   {
//                       $lookup: {
//                           from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                           pipeline: [{
//                               $match: {
//                                   $expr: {
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$reservationStatus", "Reserved"] },
//                                           { $eq: ["$tripType", "DayCruise"] },
//                                           {
//                                               $setIsSubset: [ includedDates,"$reservedDates" ]
//                                           },
//                                       ]
//                                   }
//                               }
//                           }], as: "DayReservations"
//                       },
//                   },
//                   { $unwind: { "path": "$DayReservations", preserveNullAndEmptyArrays: true } },
//                   { $match: { $or: [{ DayBookings: { $exists: true } }, { DayReservations: { $exists: true } }] } }
//               ])
//               /*
//               ---------------------CODE EXPLANATION----------------
//               Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//               $lookup and $unwind stages: These stages fetch related data from other collections (sublocationmodels and locationmodels) and unwind arrays generated by the lookup, similar to the previous code.
//               $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "NightStay", and house boat type being "Private".
//               $match stages related to tripDetails: Filters documents based on the existence of tripDetails, maximum and minimum capacity of boats compared to totalGuest.
//               $lookup and $unwind stages for Bookings and Reservations: These stages check for active bookings and reservations considering various criteria such as active status, trip types (night stay or overnight), successful payment status, and date ranges for booking and reservation overlaps.
//               Additional $lookup, $unwind, and $match stages for DayBookings and DayReservations: These stages focus specifically on day cruise bookings and reservations, checking for active bookings/reservations, successful payment status, and date overlaps with included dates.
//               Final $match stage with $or condition: This line combines day cruise bookings and reservations to check for documents where either DayBookings or DayReservations exist, aiming to find availability for day cruises.
//               Overall, this pipeline aims to filter and match documents in the houseBoatModel collection based on various conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, focusing on both night stay and day cruise scenarios.
//               ---------------------------END-----------------------
//               */
//               houseBoats = JSON.parse(JSON.stringify(houseBoats))
//               for(var i=0;i<houseBoats.length;i++){
//                   if((Misc.isnullorempty(houseBoats[i].DayBookings))&&(Misc.isnullorempty(houseBoats[i].DayReservations))){
//                       continue;
//                   }
//                   var getRate = await RateController.CalculateNightStayRate(houseBoats[i],includedDates,totalGuest)
//                   if(getRate.status == true){
//                     houseBoats[i].customerRate = getRate.rate;
//                     result.push(houseBoats[i])
//                 }
//               }
//           }else{
//               var includedDates = await getDates(startDateTime,endDateTime)
//               if(startDateTime.getTime()>endDateTime.getTime()){
//                   res.status(200).json({
//                       status:false,
//                       msg:"Invalid date selection, Please modify your search and try again."
//                   });
//                   return;
//               }
//               const today = new Date();
//               const todayYear = today.getFullYear();
//               const todayMonth = today.getMonth();
//               const todayDate = today.getDate();
//               const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
//               var dateTocheck = new Date(includedDates[0])
//               if (
//                   dateTocheck.getFullYear() === todayYear &&
//                   dateTocheck.getMonth() === todayMonth &&
//                   dateTocheck.getDate() === todayDate &&
//                   today.getTime() > today2PM.getTime()
//               ){
//                   console.log("No Trip For Today")
//                   res.status(200).json({
//                       status: true,
//                       data: [],
//                       page: pageNo,
//                       limit: dataLimit,
//                       totalLength:0,
//                       singleboat: true,
//                       msg: "success",
//                   });
//                   return;
//               }
//               houseBoatQuery.isOverNight = true;
//               houseBoatQuery.totalRooms = {$gte:numberofRooms}
//               var houseBoats = await houseBoatModel.aggregate([
//                   {$match:houseBoatQuery},
//                   {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                   {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                   {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                   {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                   {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$tripType","OverNight"]},
//                                   { $in: ["Private", "$houseBoatType"] }
                                  
//                               ]
//                           }}
//                       }],as:"tripDetails"},
//                   },
//                   {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                   {$match:{tripDetails:{$exists:true},}},
//                   {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                   {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                   {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$paymentStatus", "Success"] },
//                                   {
//                                       $setIsSubset: [ "$bookedDates",includedDates]
//                                   },
//                               ]
//                           }}
//                       }],as:"Bookings"},
//                   },
//                   {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                   {$match:{Bookings:{$exists:false},}},
//                   {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                   {
//                                       $setIsSubset: [ includedDates,"$reservedDates" ]
//                                   },
//                               ]
//                           }}
//                       }],as:"Reservations"},
//                   },
//                   {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                   {$match:{Reservations:{$exists:false},}},
//               ])
//               /*
//               ---------------------CODE EXPLANATION----------------
//               Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//               $lookup and $unwind stages for locations: These stages fetch details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields and unwind arrays created by the lookup, similar to the previous examples.
//               $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "OverNight", and house boat type being "Private".
//               $match stages related to tripDetails: Filters documents based on the existence of tripDetails, maximum and minimum capacity of boats compared to totalGuest.
//               $lookup and subsequent stages for Bookings: These stages check for active bookings considering specific criteria such as active status, successful payment status, and the presence of included dates within booked dates.
//               $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where Bookings array doesn't exist.
//               $lookup and subsequent stages for Reservations: These stages check for active reservations considering criteria like active status, reservation status being "Reserved", and included dates within reserved dates.
//               $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where Reservations array doesn't exist.
//               This aggregation pipeline essentially aims to filter documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings, successful payments, and date overlaps, focusing specifically on "OverNight" trips. The final result should be a set of documents that meet these criteria and are available for bookings.
//               ---------------------------END-----------------------
//               */
//               houseBoats = JSON.parse(JSON.stringify(houseBoats))
//               for(var i=0;i<houseBoats.length;i++){
//                   var getRate = await RateController.CalculateOverNightStayRate(houseBoats[i],includedDates,totalGuest)
//                   if(getRate.status == true){
//                     houseBoats[i].customerRate = getRate.rate;
//                     result.push(houseBoats[i])
//                 }
//               }
//           }
//           if (result.length <= 0) {
//               var houseBoatQueryMultiple = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category, };
//               if (houseBoatType === "Private") {
//                   if (tripType == "DayCruise") {
//                       //houseBoatQuery.totalRooms = { $gte: numberofRooms }
//                       var includedDates = await getDatesFiltered(startDateTime, endDateTime)
//                       const today = new Date();
//                       const eightDaysAhead = new Date(today);
//                       eightDaysAhead.setDate(today.getDate() + 8);
//                       if(includedDates[0]>eightDaysAhead){
//                           console.log("In 8 Days")
//                           res.status(200).json({
//                           status: true,
//                           data: [],
//                           page: pageNo,
//                           limit: dataLimit,
//                           totalLength:0,
//                           singleboat: true,
//                           msg: "success",
//                       });
//                       return;
//                   }
//                   const todayYear = today.getFullYear();
//                   const todayMonth = today.getMonth();
//                   const todayDate = today.getDate();
//                   const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
//                   var dateToCheck = new Date(includedDates[0]);
//                   if (dateToCheck.getFullYear() === todayYear &&dateToCheck.getMonth() === todayMonth &&dateToCheck.getDate() === todayDate &&today.getTime() > today1PM.getTime()){
//                       console.log("No Trip For Today")
//                       res.status(200).json({
//                           status: true,
//                           data: [],
//                           page: pageNo,
//                           limit: dataLimit,
//                           totalLength:0,
//                           singleboat: true,
//                           msg: "success",
//                       });
//                       return;
//                   }
//                   houseBoatQueryMultiple.isDayCriuse = true;
//                       var vendorGroup = await houseBoatModel.aggregate([
//                           { $match: houseBoatQueryMultiple },
//                           { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//                           { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//                           { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//                           { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//                           {
//                               $lookup: {
//                                   from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                                   pipeline: [{
//                                       $match: {
//                                           $expr: {
//                                               $and: [
//                                                   { $eq: ["$status", "Active"] },
//                                                   { $eq: ["$tripType", "DayCruise"] },
//                                                   { $in: ["Private", "$houseBoatType"] }
//                                               ]
//                                           }
//                                       }
//                                   }], as: "tripDetails"
//                               },
//                           },
//                           { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//                           { $match: { tripDetails: { $exists: true }, } },
//                           { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
//                           // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
//                           { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
//                           {
//                               $lookup: {
//                                   from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                                   pipeline: [{
//                                       $match: {
//                                           $expr: {
//                                               $and: [
//                                                   { $eq: ["$status", "Active"] },
//                                                   {
//                                                       $or: [
//                                                           { $eq: ["$tripType", "DayCruise"] },
//                                                           { $eq: ["$tripType", "OverNight"] }
//                                                       ]
//                                                   },
//                                                   { $eq: ["$paymentStatus", "Success"] },
//                                                   {
//                                                       $setIsSubset: ["$bookedDates", includedDates]
//                                                   },
//                                               ]
//                                           }
//                                       }
//                                   }], as: "Bookings"
//                               },
//                           },
//                           { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//                           { $match: { Bookings: { $exists: false }, } },
//                           {
//                               $lookup: {
//                                   from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                                   pipeline: [{
//                                       $match: {
//                                           $expr: {
//                                               $and: [
//                                                   { $eq: ["$status", "Active"] },
//                                                   {
//                                                       $or: [
//                                                           { $eq: ["$tripType", "DayCruise"] },
//                                                           { $eq: ["$tripType", "OverNight"] }
//                                                       ]
//                                                   },
//                                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                                   {
//                                                       $setIsSubset: [ "$reservedDates",includedDates]
//                                                   },
//                                               ]
//                                           }
//                                       }
//                                   }], as: "Reservations"
//                               },
//                           },
//                           { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//                           { $match: { Reservations: { $exists: false }, } },
//                           { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                           { $match:{ totalboats:{$gt:1}}}
//                           //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//                       ])
//                       var locationGroup = await houseBoatModel.aggregate([
//                           { $match: houseBoatQueryMultiple },
//                           { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//                           { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//                           { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//                           { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//                           {
//                               $lookup: {
//                                   from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                                   pipeline: [{
//                                       $match: {
//                                           $expr: {
//                                               $and: [
//                                                   { $eq: ["$status", "Active"] },
//                                                   { $eq: ["$tripType", "DayCruise"] },
//                                                   { $in: ["Private", "$houseBoatType"] }
//                                               ]
//                                           }
//                                       }
//                                   }], as: "tripDetails"
//                               },
//                           },
//                           { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//                           { $match: { tripDetails: { $exists: true }, } },
//                           { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
//                           // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
//                           { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
//                           {
//                               $lookup: {
//                                   from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                                   pipeline: [{
//                                       $match: {
//                                           $expr: {
//                                               $and: [
//                                                   { $eq: ["$status", "Active"] },
//                                                   {
//                                                       $or: [
//                                                           { $eq: ["$tripType", "DayCruise"] },
//                                                           { $eq: ["$tripType", "OverNight"] }
//                                                       ]
//                                                   },
//                                                   { $eq: ["$paymentStatus", "Success"] },
//                                                   {
//                                                       $setIsSubset: ["$bookedDates", includedDates]
//                                                   },
//                                               ]
//                                           }
//                                       }
//                                   }], as: "Bookings"
//                               },
//                           },
//                           { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//                           { $match: { Bookings: { $exists: false }, } },
//                           {
//                               $lookup: {
//                                   from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                                   pipeline: [{
//                                       $match: {
//                                           $expr: {
//                                               $and: [
//                                                   { $eq: ["$status", "Active"] },
//                                                   {
//                                                       $or: [
//                                                           { $eq: ["$tripType", "DayCruise"] },
//                                                           { $eq: ["$tripType", "OverNight"] }
//                                                       ]
//                                                   },
//                                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                                   {
//                                                       $setIsSubset: [ includedDates,"$reservedDates" ]
//                                                   },
//                                               ]
//                                           }
//                                       }
//                                   }], as: "Reservations"
//                               },
//                           },
//                           { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//                           { $match: { Reservations: { $exists: false }, } },
//                           { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                           { $match:{ totalboats:{$gt:1}}}
//                           //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//                       ])
//                       var houseBoats = vendorGroup.concat(locationGroup)
//                       /*
//                       ---------------------CODE EXPLANATION----------------
//                       Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
//                       $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, unwinding arrays generated by the lookup, similar to previous examples.
//                       $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "DayCruise", and house boat type being "Private".
//                       $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence.
//                       Commented-out $match stage: Seems to have been commented out but might have been intended to filter based on the maximum number of person trips.
//                       $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria like active status, successful payment status, trip types (day cruise or overnight), and the presence of included dates within booked dates.
//                       $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where Bookings array doesn't exist.
//                       $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria like active status, reservation status being "Reserved", trip types (day cruise or overnight), and the presence of included dates within reserved dates.
//                       $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where Reservations array doesn't exist.
//                       Commented-out $match stage: A potential final match condition utilizing $or logic to find documents where either reservations or bookings don't exist.
//                       ---------------------------END-----------------------
//                       */
//                       houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                       var houseBoat = [];
//                       for(var n=0;n<houseBoats.length;n++){
//                           var result = [];
//                           for (var k = 0; k < houseBoats[n].details.length; k++) {
//                               var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
//                               if (getRate.status == true) {
//                                   houseBoats[n].details[k].customerRate = getRate.rate;
//                                   result.push(houseBoats[n].details[k])
//                               }
//                           }
//                           houseBoat.push({ _id: houseBoats[n]._id, boats: result,totalboats:houseBoats[n].totalboats });
//                       }
//                       var finalResult = [];
//                       for(var h =0;h<houseBoat.length;h++){
//                           var newResult = getCombinationsOnDay(houseBoat[h].boats, adult);
//                           for(var i=0;i<newResult.length;i++){
//                               var data = {}
//                               var totalAmount = 0
//                               var id = [];
//                               var totalGuestCanBeAccomadated = 0
//                               if (newResult[i].length <= 1) {
//                                   continue;
//                               }
//                               var totalRemiGuests = adult;
//                               for (var j = 0; j < newResult[i].length; j++) {
//                                   if(totalRemiGuests>=newResult[i][j].tripDetails.maxPersonTrips){
//                                       var guestsForCalculations = newResult[i][j].tripDetails.maxPersonTrips;
//                                       totalRemiGuests = totalRemiGuests-newResult[i][j].tripDetails.maxPersonTrips;
//                                   }else{
//                                       var guestsForCalculations = totalRemiGuests;
//                                       totalRemiGuests = 0;
//                                   }
//                                   var getRate = await RateController.CalculateDayCruisRate(newResult[i][j], includedDates,guestsForCalculations)
//                                   if (getRate.status == true) {
//                                       newResult[i][j].customerRate = getRate.rate;
//                                       //result.push(houseBoats[n].details[k])
//                                   }
//                                   totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
//                                   totalAmount += newResult[i][j].customerRate;
//                                   id.push(newResult[i][j]._id)
//                               }
//                               data._id = id
//                               data.totalAmount = totalAmount
//                               data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated
//                               data.houseBoatDetails = newResult[i]
//                               finalResult.push(data)
//                           }
//                       }
//                       function arraysEqual(arr1, arr2) {
//                           return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//                       }
//                       finalResult = finalResult.filter((obj, index, array) => {
//                           return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//                       });
//                       res.status(200).json({
//                           status: true,
//                           data: finalResult,
//                           page: pageNo,
//                           limit: dataLimit,
//                           totalLength: finalResult.length,
//                           singleboat: false,
//                           msg: "success",
//                       });
//                       return; 
//                   }
//                   else if(tripType == "NightStay"){
//                       var includedDates = await getDates(startDateTime,endDateTime)
//                       if(startDateTime.getTime()>endDateTime.getTime()){
//                           res.status(200).json({
//                               status:false,
//                               msg:"Invalid date selection, Please modify your search and try again."
//                           });
//                           return;
//                       }
//                       const today = new Date();
//                       const todayYear = today.getFullYear();
//                       const todayMonth = today.getMonth();
//                       const todayDate = today.getDate();
//                       const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
//                       var dateTocheck = new Date(includedDates[0])
//                       if (
//                           dateTocheck.getFullYear() === todayYear &&
//                           dateTocheck.getMonth() === todayMonth &&
//                           dateTocheck.getDate() === todayDate &&
//                           today.getTime() > today11PM.getTime()
//                       ){
//                           console.log("No Trip For Today")
//                           res.status(200).json({
//                               status: true,
//                               data: [],
//                               page: pageNo,
//                               limit: dataLimit,
//                               totalLength:0,
//                               singleboat: true,
//                               msg: "success",
//                           });
//                           return;
//                       }
//                       houseBoatQuery.isNightStay = true;
//                       //houseBoatQuery.totalRooms = {$gte:numberofRooms}
//                       var vendorGroup = await houseBoatModel.aggregate([
//                           {$match:houseBoatQuery},
//                           {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                           {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                           {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                           {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
//                           {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$tripType","NightStay"]},
//                                           { $in: ["Private", "$houseBoatType"] }
//                                       ]
//                                   }}
//                               }],as:"tripDetails"},
//                           },
//                           {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                           {$match:{tripDetails:{$exists:true},}},
//                           //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                           {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                           {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$paymentStatus", "Success"] },
//                                           {
//                                               $or: [{
//                                                   $and: [
//                                                       { $eq: ["$tripType", "NightStay"] },
//                                                       { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                                   },
//                                                   {
//                                                   $and: [
//                                                       { $eq: ["$tripType", "OverNight"] },
//                                                       { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                                   },
//                                               ]
//                                           }
//                                       ]
//                                   }}
//                               }],as:"Bookings"},
//                           },
//                           {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                           {$match:{Bookings:{$exists:false},}},
//                           {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$reservationStatus", "Reserved"] },
//                                           {
//                                               $or: [{
//                                                   $and: [
//                                                       { $eq: ["$tripType", "NightStay"] },
//                                                       { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                                   },
//                                                   {
//                                                   $and: [
//                                                       { $eq: ["$tripType", "OverNight"] },
//                                                       { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                                   },
//                                               ]
//                                           }
//                                       ]
//                                   }}
//                               }],as:"Reservations"},
//                           },
//                           {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                           {$match:{Reservations:{$exists:false},}},
//                           {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$paymentStatus", "Success"] },
//                                           { $eq: ["$tripType", "DayCruise"] },
//                                           {
//                                               $setIsSubset: [ includedDates,"$bookedDates" ]
//                                           }
//                                       ]
//                                   }}
//                               }],as:"DayBookings"},
//                           },
//                           {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//                           {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                           pipeline: [{
//                               $match: {$expr: { 
//                                   $and: [
//                                       { $eq: ["$status", "Active"] },
//                                       { $eq: ["$reservationStatus", "Reserved"] },
//                                       { $eq: ["$tripType", "DayCruise"] },
//                                       {
//                                           $setIsSubset: [ includedDates,"$reservedDates" ]
//                                       },
//                                   ]
//                               }}
//                           }],as:"DayReservations"},
//                       },
//                       {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//                       {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//                       {$group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                       {$match:{ totalboats:{$gt:1}}}
//                       ])
//                       var locationGroup = await houseBoatModel.aggregate([
//                           {$match:houseBoatQuery},
//                           {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                           {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                           {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                           {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
//                           {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$tripType","NightStay"]},
//                                           { $in: ["Private", "$houseBoatType"] }
//                                       ]
//                                   }}
//                               }],as:"tripDetails"},
//                           },
//                           {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                           {$match:{tripDetails:{$exists:true},}},
//                           //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                           {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                           {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$paymentStatus", "Success"] },
//                                           {
//                                               $or: [{
//                                                   $and: [
//                                                       { $eq: ["$tripType", "NightStay"] },
//                                                       { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                                   },
//                                                   {
//                                                   $and: [
//                                                       { $eq: ["$tripType", "OverNight"] },
//                                                       { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                                   },
//                                               ]
//                                           }
//                                       ]
//                                   }}
//                               }],as:"Bookings"},
//                           },
//                           {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                           {$match:{Bookings:{$exists:false},}},
//                           {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$reservationStatus", "Reserved"] },
//                                           {
//                                               $or: [{
//                                                   $and: [
//                                                       { $eq: ["$tripType", "NightStay"] },
//                                                       { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                                   },
//                                                   {
//                                                   $and: [
//                                                       { $eq: ["$tripType", "OverNight"] },
//                                                       { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                                   },
//                                               ]
//                                           }
//                                       ]
//                                   }}
//                               }],as:"Reservations"},
//                           },
//                           {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                           {$match:{Reservations:{$exists:false},}},
//                           {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$paymentStatus", "Success"] },
//                                           { $eq: ["$tripType", "DayCruise"] },
//                                           {
//                                               $setIsSubset: [ includedDates,"$bookedDates"]
//                                           }
//                                       ]
//                                   }}
//                               }],as:"DayBookings"},
//                           },
//                           {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//                           {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                           pipeline: [{
//                               $match: {$expr: { 
//                                   $and: [
//                                       { $eq: ["$status", "Active"] },
//                                       { $eq: ["$reservationStatus", "Reserved"] },
//                                       { $eq: ["$tripType", "DayCruise"] },
//                                       {
//                                           $setIsSubset: [ includedDates,"$reservedDates" ]
//                                       },
//                                   ]
//                               }}
//                           }],as:"DayReservations"},
//                       },
//                       {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//                       {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//                       {$group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                       {$match:{ totalboats:{$gt:1}}}
//                       ])
//                       var houseBoats = vendorGroup.concat(locationGroup)
//                       /*
//                       ---------------------CODE EXPLANATION----------------
//                       Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//                       $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, unwinding arrays generated by the lookup, which was described previously.
//                       $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "NightStay", and house boat type being "Private".
//                       $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
//                       $lookup and subsequent stages for Bookings: Checks for active night stay bookings considering criteria such as active status, successful payment status, trip types (night stay or overnight), and the presence of included dates within booked dates.
//                       $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
//                       $lookup and subsequent stages for Reservations: Checks for active night stay reservations considering criteria such as active status, reservation status being "Reserved", trip types (night stay or overnight), and the presence of included dates within reserved dates.
//                       $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
//                       Additional $lookup, $unwind, and $match stages for DayBookings and DayReservations: These stages specifically focus on day cruise bookings and reservations, using similar criteria and matching conditions to find availability for day cruises.
//                       Final $match stage with $or condition: This line combines day cruise bookings and reservations to find documents where either DayBookings or DayReservations exist, indicating availability for day cruises.
//                       This aggregation pipeline aims to filter documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, focusing on both night stays and day cruises with specific criteria for availability.
//                       ---------------------------END-----------------------
//                       */
//                       var finalResult = [];
//                       houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                       for(var h=0;h<houseBoats.length;h++){
//                           for(var g=0;g<houseBoats[h].details.length;g++){
//                               var numberOfRooms = houseBoats[h].details[g].totalRooms;
//                               var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
//                               var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
//                               houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
//                               houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
//                           }
//                       }
//                       for(var p=0;p<houseBoats.length;p++){
//                           var result = [];
//                           var totalGuestCanBeAccomadated = 0
//                           var totalExtraGuestCanBeaccomadated = 0
//                           var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
//                           var hbs = getMostSutableValue;
//                           const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                           for(var k =0;k<hbs.length;k++){
//                               totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
//                               totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                               var totalguests = hbs[k].tripDetails.maxPersonPerRooms
//                               hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
//                               hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                               var getRate = await RateController.CalculateNightStayRateCombination(hbs[k],includedDates,totalguests)
//                               if(getRate.status == true){
//                                   hbs[k].customerRate = getRate.rate;
//                                   hbs[k].extraPersonRate = getRate.extraPersonRate
//                                   result.push(hbs[k])
//                               }
//                           }
//                           var data = {}
//                           var totalAmount = 0
//                           var id = [];
//                           for(var t=0;t<result.length;t++){
//                               totalAmount  += result[t].customerRate;
//                               id.push(result[t]._id)
//                           }
//                           data._id = id
//                           data.totalAmount = totalAmount
//                           data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
//                           data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
//                           data.houseBoatDetails = result
//                           if(sumOfTotals>=numberofRooms){
//                               if(totalGuestCanBeAccomadated>=adult){
//                                   finalResult.push(data)
//                               }else{
//                                   //Calculations For additional Guests
//                                   var istrue = false
//                                    var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
//                                   if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
//                                       console.log("Cant Accomadate these many extra guests")
//                                   }else{
//                                       var reminingAdditionalGuests = additionalGuestAvailable
//                                       var additionalAmount = 0;
//                                       for(var d=0;d<data.houseBoatDetails.length;d++){
//                                           if(reminingAdditionalGuests>0){
//                                               if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                                                   additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                                   reminingAdditionalGuests = 0;
//                                               }else{
//                                                   additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                                   reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                                               }
//                                           }else{
//                                               istrue = true
//                                               break;
//                                           }
//                                       }
//                                       if (!isNaN(additionalAmount)){
//                                           data.additionalAmount = additionalAmount;
//                                           data.totalAmount +=additionalAmount
//                                       }
//                                       if(istrue == true){
//                                           finalResult.push(data)
//                                       }
//                                   }
//                               }
//                           }
//                       }
//                       function arraysEqual(arr1, arr2) {
//                           return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//                       }
//                       finalResult = finalResult.filter((obj, index, array) => {
//                           return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//                       });
//                       res.status(200).json({
//                           status:true,
//                           data: finalResult,
//                           page: pageNo,
//                           limit: dataLimit,
//                           totalLength:finalResult.length,
//                           singleboat: false,
//                           msg: "success",
//                       });
//                       return;
//                   }else{
//                       var includedDates = await getDates(startDateTime,endDateTime)
//                       if(startDateTime.getTime()>endDateTime.getTime()){
//                           res.status(200).json({
//                               status:false,
//                               msg:"Invalid date selection, Please modify your search and try again."
//                           });
//                           return;
//                       }
//                       const today = new Date();
//                       const todayYear = today.getFullYear();
//                       const todayMonth = today.getMonth();
//                       const todayDate = today.getDate();
//                       const today2PM = new Date(todayYear, todayMonth, todayDate, 2, 0, 0);
//                       var dateTocheck = new Date(includedDates[0])
//                       if (
//                           dateTocheck.getFullYear() === todayYear &&
//                           dateTocheck.getMonth() === todayMonth &&
//                           dateTocheck.getDate() === todayDate &&
//                           today.getTime() > today2PM.getTime()
//                       ) {
//                           console.log("No Trip For Today")
//                           res.status(200).json({
//                               status: true,
//                               data: [],
//                               page: pageNo,
//                               limit: dataLimit,
//                               totalLength: 0,
//                               singleboat: true,
//                               msg: "success",
//                           });
//                           return;
//                       }
//                       houseBoatQuery.isOverNight = true;
//                       //houseBoatQueryMultiple.totalRooms = {$gte:numberofRooms}
//                       var vendorWise = await houseBoatModel.aggregate([
//                           {$match:houseBoatQueryMultiple},
//                           {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                           {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                           {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                           {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                           {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$tripType","OverNight"]},
//                                           { $in: ["Private", "$houseBoatType"] }
                                          
//                                       ]
//                                   }}
//                               }],as:"tripDetails"},
//                           },
//                           {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                           {$match:{tripDetails:{$exists:true},}},
//                           {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
//                           // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                           {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                           {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$paymentStatus", "Success"] },
//                                           {
//                                               $setIsSubset: [ "$bookedDates",includedDates]
//                                           },
//                                       ]
//                                   }}
//                               }],as:"Bookings"},
//                           },
//                           {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                           {$match:{Bookings:{$exists:false},}},
//                           {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$reservationStatus", "Reserved"] },
//                                           {
//                                               $setIsSubset: [ includedDates,"$reservedDates"]
//                                           },
//                                       ]
//                                   }}
//                               }],as:"Reservations"},
//                           },
//                           {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                           {$match:{Reservations:{$exists:false},}},
//                           { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                           { $match:{ totalboats:{$gt:1}}}
//                       ])
//                       var locationWise = await houseBoatModel.aggregate([
//                           {$match:houseBoatQueryMultiple},
//                           {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                           {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                           {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                           {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                           {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$tripType","OverNight"]},
//                                           { $in: ["Private", "$houseBoatType"] }
                                          
//                                       ]
//                                   }}
//                               }],as:"tripDetails"},
//                           },
//                           {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                           {$match:{tripDetails:{$exists:true},}},
//                           {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
//                           // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                           {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                           {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$paymentStatus", "Success"] },
//                                           {
//                                               $setIsSubset: [ "$bookedDates",includedDates]
//                                           },
//                                       ]
//                                   }}
//                               }],as:"Bookings"},
//                           },
//                           {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                           {$match:{Bookings:{$exists:false},}},
//                           {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                               pipeline: [{
//                                   $match: {$expr: { 
//                                       $and: [
//                                           { $eq: ["$status", "Active"] },
//                                           { $eq: ["$reservationStatus", "Reserved"] },
//                                           {
//                                               $setIsSubset: [ includedDates,"$reservedDates" ]
//                                           },
//                                       ]
//                                   }}
//                               }],as:"Reservations"},
//                           },
//                           {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                           {$match:{Reservations:{$exists:false},}},
//                           { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                           { $match:{ totalboats:{$gt:1}}}
//                       ])
//                       houseBoats = vendorWise.concat(locationWise)
//                       /*
//                       ---------------------CODE EXPLANATION----------------
//                       Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
//                       $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, similar to the previous examples.
//                       $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "OverNight", and house boat type being "Private".
//                       $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
//                       $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates.
//                       $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
//                       $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates.
//                       $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
//                       This aggregation pipeline seems to focus on filtering documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, primarily focusing on overnight stays with specific criteria for availability.
//                       ---------------------------END-----------------------
//                       */
//                       houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                       for(var h=0;h<houseBoats.length;h++){
//                           for(var g=0;g<houseBoats[h].details.length;g++){
//                               var numberOfRooms = houseBoats[h].details[g].totalRooms;
//                               var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
//                               var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
//                               houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
//                               houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
//                           }
//                       }
//                       var finalResult = [];
                      
//                       for(var p=0;p<houseBoats.length;p++){
//                           var result = [];
//                           var totalGuestCanBeAccomadated = 0
//                           var totalExtraGuestCanBeaccomadated = 0
//                           var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
//                           var hbs = getMostSutableValue;
//                           const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                           for(var k =0;k<hbs.length;k++){
//                               totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
//                               totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                               var totalguests = hbs[k].tripDetails.maxPersonPerRooms
//                               hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
//                               hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                               var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k],includedDates,totalguests)
//                               if(getRate.status == true){
//                                   hbs[k].customerRate = getRate.rate;
//                                   hbs[k].extraPersonRate = getRate.extraPersonRate
//                                   result.push(hbs[k])
//                               }
//                           }
//                           var data = {}
//                           var totalAmount = 0
//                           var id = [];
//                           for(var t=0;t<result.length;t++){
//                               totalAmount  += result[t].customerRate;
//                               id.push(result[t]._id)
//                           }
//                           data._id = id
//                           data.totalAmount = totalAmount
//                           data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
//                           data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
//                           data.houseBoatDetails = result
//                           if(sumOfTotals>=numberofRooms){
//                               if(totalGuestCanBeAccomadated>=adult){
//                                   var totalRoomsFound =  data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                                   if(totalRoomsFound>=numberofRooms){
//                                       finalResult.push(data)
//                                   }
//                               }else{
//                                   //Calculations For additional Guests
//                                   var istrue = false
//                                    var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
//                                   if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
//                                       console.log("Cant Accomadate these many extra guests")
//                                   }else{
//                                       var reminingAdditionalGuests = additionalGuestAvailable
//                                       var additionalAmount = 0;
//                                       for(var d=0;d<data.houseBoatDetails.length;d++){
//                                           if(reminingAdditionalGuests>0){
//                                               if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                                                   additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                                   reminingAdditionalGuests = 0;
//                                                   istrue = true;
//                                                   break
//                                               }else{
//                                                   additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                                   reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                                               }
//                                           }else{
//                                               istrue = true
//                                               break;
//                                           }
//                                       }
//                                       if (!isNaN(additionalAmount)){
//                                           data.additionalAmount = additionalAmount;
//                                           data.totalAmount +=additionalAmount
//                                       }
//                                       if(istrue == true){
//                                           finalResult.push(data)
//                                       }
//                                   }
//                               }
//                           }
//                       }
//                       function arraysEqual(arr1, arr2) {
//                           return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//                       }
//                       finalResult = finalResult.filter((obj, index, array) => {
//                           return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//                       });
//                       // for(var f=0;f<finalResult.length;f++){
//                       //     v
//                       // }
//                       res.status(200).json({
//                           status:true,
//                           data: finalResult,
//                           page: pageNo,
//                           limit: dataLimit,
//                           totalLength:finalResult.length,
//                           singleboat: false,
//                           msg: "success",
//                       });
//                       return;
//                   }
//               }
//           } 
//       }else{
//           //This is for sharing Boat Booking
//           if(tripType == "DayCruise"){
//               houseBoatQuery.totalRooms = {$gte:numberofRooms}
//               var includedDates = await getDatesFiltered(startDateTime,endDateTime)
//               const today = new Date();
//               const eightDaysAhead = new Date(today);
//               eightDaysAhead.setDate(today.getDate() + 8);
//               if(includedDates[0]>eightDaysAhead){
//                   console.log("In 8 Days")
//                   res.status(200).json({
//                       status: true,
//                       data: [],
//                       page: pageNo,
//                       limit: dataLimit,
//                       totalLength:0,
//                       singleboat: true,
//                       msg: "success",
//                   });
//                   return;
//               }
//               const todayYear = today.getFullYear();
//               const todayMonth = today.getMonth();
//               const todayDate = today.getDate();
//               const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
//               var dateToCheck = new Date(includedDates[0])
//               if (
//                   dateToCheck.getFullYear() === todayYear &&
//                   dateToCheck.getMonth() === todayMonth &&
//                   dateToCheck.getDate() === todayDate &&
//                   today.getTime() > today1PM.getTime()
//               ){
//                   console.log("No Trip For Today")
//                   res.status(200).json({
//                       status: true,
//                       data: [],
//                       page: pageNo,
//                       limit: dataLimit,
//                       totalLength:0,
//                       singleboat: true,
//                       msg: "success",
//                   });
//                   return;
//               }
//               houseBoatQuery.isDayCriuse = true;
//               var houseBoats = await houseBoatModel.aggregate([
//                   {$match:houseBoatQuery},
//                   {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                   {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                   {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                   {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                   {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$tripType","DayCruise"]},
//                                   { $in: ["Sharing", "$houseBoatType"] }
//                               ]
//                           }}
//                       }],as:"tripDetails"},
//                   },
//                   {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                   {$match:{tripDetails:{$exists:true},}},
//                   {$match:{"tripDetails.maxPersonTrips":{$gte:totalGuest}}},
//                   {$match:{"tripDetails.minPersonTrips":{$lte:totalGuest}}},
//                   {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   {
//                                       $or: [
//                                         { $eq: ["$tripType", "DayCruise"] },
//                                         { $eq: ["$tripType", "OverNight"] }
//                                       ]
//                                   },
//                                   { $eq: ["$paymentStatus", "Success"] },
//                                   {
//                                       $setIsSubset: [ "$bookedDates",includedDates]
//                                   },
//                               ]
//                           }}
//                       }],as:"Bookings"},
//                   },
//                   {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                   {$match:{Bookings:{$exists:false},}},
//                   {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   {
//                                       $or: [
//                                         { $eq: ["$tripType", "DayCruise"] },
//                                         { $eq: ["$tripType", "OverNight"] }
//                                       ]
//                                   },
//                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                   {
//                                       $setIsSubset: [ includedDates,"$reservedDates" ]
//                                   },
//                               ]
//                           }}
//                       }],as:"Reservations"},
//                   },
//                   {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                   {$match:{Reservations:{$exists:false},}},
//                   //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//               ])
//               /*
//               ---------------------CODE EXPLANATION----------------
//               Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//               $lookup Stages for Location Models: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, respectively.
//               $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "DayCruise", and house boat type being "Sharing".
//               $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence, maximum and minimum person trips compared to totalGuest.
//               $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates for both "DayCruise" and "OverNight" trip types.
//               $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
//               $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates for both "DayCruise" and "OverNight" trip types.
//               $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
//               It seems like the final commented out $match stage might be intended to filter for documents where either Reservations or Bookings arrays do not exist. However, it's currently commented out and not active in the aggregation pipeline.   
//               ---------------------------END-----------------------
//               */
//               //As Of Now We Did Not Need DayCruis Boat To Be Booked in Sharing Category
//               result = [];
//           }else if(tripType == "NightStay"){
//               var includedDates = await getDates(startDateTime,endDateTime)
//               if(startDateTime.getTime()>endDateTime.getTime()){
//                   res.status(200).json({
//                       status:false,
//                       msg:"Invalid date selection, Please modify your search and try again."
//                   });
//                   return;
//               }
//               const today = new Date();
//               const todayYear = today.getFullYear();
//               const todayMonth = today.getMonth();
//               const todayDate = today.getDate();
//               const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
//               var dateTocheck = new Date(includedDates[0])
//               if (
//                   dateTocheck.getFullYear() === todayYear &&
//                   dateTocheck.getMonth() === todayMonth &&
//                   dateTocheck.getDate() === todayDate &&
//                   today.getTime() > today11PM.getTime()
//               ){
//                   console.log("No Trip For Today")
//                   res.status(200).json({
//                       status: true,
//                       data: [],
//                       page: pageNo,
//                       limit: dataLimit,
//                       totalLength:0,
//                       singleboat: true,
//                       msg: "success",
//                   });
//                   return;
//               }
//               houseBoatQuery.isNightStay = true;
//               houseBoatQuery.totalRooms = {$gte:numberofRooms}
//               var houseBoats = await houseBoatModel.aggregate([
//                   {$match:houseBoatQuery},
//                   {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
//                   {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                   {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                   {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                   {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                   {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$tripType","NightStay"]},
//                                   { $in: ["Sharing", "$houseBoatType"] }
//                               ]
//                           }}
//                       }],as:"tripDetails"},
//                   },
//                   {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                   {$match:{tripDetails:{$exists:true},}},
//                   {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                   //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                   {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$tripType", "NightStay"] },
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$houseBoatType","Private"]},
//                                   { $eq: ["$paymentStatus", "Success"] },
//                                   {
//                                       $or: [{
//                                           $and: [
//                                               { $eq: ["$tripType", "NightStay"] },
//                                               { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                           },
//                                           {
//                                           $and: [
//                                               { $eq: ["$tripType", "OverNight"] },
//                                               { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                           },
//                                       ]
//                                   }
//                               ]
//                           }}
//                       }],as:"Bookings"},
//                   },
//                   {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                   {$match:{Bookings:{$exists:false},}},
//                   {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$tripType", "NightStay"] },
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$houseBoatType","Private"]},
//                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                   {
//                                       $or: [{
//                                           $and: [
//                                               { $eq: ["$tripType", "NightStay"] },
//                                               { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                           },
//                                           {
//                                           $and: [
//                                               { $eq: ["$tripType", "OverNight"] },
//                                               { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                           },
//                                       ]
//                                   }
//                               ]
//                           }}
//                       }],as:"Reservations"},
//                   },
//                   {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                   {$match:{Reservations:{$exists:false},}},
//                   {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$paymentStatus", "Success"] },
//                                   { $eq: ["$tripType", "DayCruise"] },
//                                   {
//                                       $setIsSubset: [ includedDates,"$bookedDates" ]
//                                   }
//                               ]
//                           }}
//                       }],as:"DayBookings"},
//                   },
//                   {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//                   {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                   { $eq: ["$tripType", "DayCruise"] },
//                                   {
//                                       $setIsSubset: [ includedDates,"$reservedDates" ]
//                                   },
//                               ]
//                           }}
//                       }],as:"DayReservations"},
//                   },
//                   {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//                   {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//                   //Check for already Booking in sharing category exists
//                   {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$houseBoatType","NightStay"]},
//                                   { $eq: ["$houseBoatType","Sharing"]},
//                                   { $eq: ["$paymentStatus", "Success"] },
//                                   {
//                                       $setIsSubset: [ "$bookedDates",includedDates]
//                                   },
//                               ]
//                           }}
//                       },{
//                           $group: {
//                               _id: "$houseBoatId",
//                               totalRoomsBooked: {$sum: "$totalRooms"},
//                               totalGuestsBooked: {$sum: "$noOfAdults"},
//                               sharedHouseboat: {$push: "$$ROOT"}
//                           }
//                       }],as:"SharedBookings"},
//                   },
//                   {
//                       $addFields: {
//                           SharedBookings: {
//                               $cond: {
//                                   if: {$eq: ["$SharedBookings", []]},
//                                   then: [[]],
//                                   else: "$SharedBookings"
//                               }
//                           }
//                       }
//                   },
//                   {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
//                   {
//                       $addFields: {
//                           noOfRoomsBookedShared: {
//                               $cond: {
//                                   if: {$eq: ["$SharedBookings", []]},
//                                   then: 0,
//                                   else: "$SharedBookings.totalRoomsBooked"
//                               }
//                           },
//                           noOfGuestsBookedShared: {
//                               $cond: {
//                                   if: {$eq: ["$SharedBookings", []]},
//                                   then: 0,
//                                   else: "$SharedBookings.totalGuestsBooked"
//                               }
//                           }
//                       }
//                   },
//                   {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$houseBoatType","Sharing"]},
//                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                   {
//                                       $setIsSubset: [ includedDates,"$reservedDates" ]
//                                   },
//                               ]
//                           }}
//                       },{
//                           $group: {
//                               _id: "$houseBoatId",
//                               totalRoomsBooked: {$sum: "$totalRooms"},
//                               totalGuestsBooked: {$sum: "$totalGuests"},
//                               sharedHouseboat: {$push: "$$ROOT"}
//                           }
//                       }],as:"SharedReservations"},
//                   },
//                   {
//                       $addFields: {
//                           SharedReservations: {
//                               $cond: {
//                                   if: {$eq: ["$SharedReservations", []]},
//                                   then: [[]],
//                                   else: "$SharedReservations"
//                               }
//                           }
//                       }
//                   },
//                   {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
//                   {
//                       $addFields: {
//                           noOfRoomsBookedReserved: {
//                               $cond: {
//                                   if: {$eq: ["$SharedReservations", []]},
//                                   then: 0,
//                                   else: "$SharedReservations.totalRoomsBooked"
//                               }
//                           },
//                           noOfGuestsBookedReserved: {
//                               $cond: {
//                                   if: {$eq: ["$SharedReservations", []]},
//                                   then: 0,
//                                   else: "$SharedReservations.totalGuestsBooked"
//                               }
//                           }
//                       }
//                   },
//                   {
//                       $addFields: {
//                           noOfRoomsBooked: {
//                               $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
//                           },
//                           noOfGuestsBooked: {
//                               $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
//                           }
//                       }
//                   },
//                   {
//                       $addFields: {
//                           totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
//                           totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
//                       }
//                   },
//                   {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
//                   {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

//               ])
//               /*
//               ---------------------CODE EXPLANATION----------------
//               Initial Match and Add Fields: Filtering documents based on houseBoatQuery and adding new fields noOfGuestsBooked and noOfRoomsBooked with default values of 0.
//               Lookup Stages for Location Details: Fetching related location details from sublocationmodels and locationmodels.
//               Trip Details Lookup and Matching: Fetching specific trip details for "NightStay" and "Sharing" types. Filtering for active status and existence of trip details. Also filtering based on maximum capacity of boats.
//               Bookings Lookup and Matching: Checking for active bookings considering criteria like successful payment status, type of house boat being "Private", and date range compatibility for both "NightStay" and "OverNight" types.
//               Reservations Lookup and Matching: Similar to bookings but for reservations, checking for active reserved status based on similar criteria for both "NightStay" and "OverNight" types.
//               Lookup and Grouping for Shared Bookings: Checking for active shared houseboat bookings. Grouping by houseBoatId, calculating total rooms and guests booked, and creating an array of shared houseboat details.
//               Unwinding and Adding Fields for Shared Bookings: Extracting fields and calculating the number of rooms and guests booked for shared houseboats.
//               Lookup and Grouping for Shared Reservations: Similar to shared bookings but for reservations of shared houseboats.
//               Unwinding and Adding Fields for Shared Reservations: Extracting fields and calculating the number of rooms and guests reserved for shared houseboats.
//               Final Calculations and Matching: Calculating the available rooms and guests considering the booked/shared rooms and guests, and then matching for the required number of rooms and guests.
//               The entire pipeline aims to find available houseboats for a given number of guests and rooms, considering bookings, reservations, and shared bookings/reservations. It filters available houseboats based on the required capacity and availability for the specified date range.
//               ---------------------------END-----------------------
//               */
//               houseBoats = JSON.parse(JSON.stringify(houseBoats))
//               for(var i=0;i<houseBoats.length;i++){
//                   var getRate = await RateController.CalculateNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
//                   if(getRate.status == true){
//                       houseBoats[i].customerRate = getRate.rate;
//                       result.push(houseBoats[i])
//                   }
//               }
//           }else{
//               var includedDates = await getDates(startDateTime,endDateTime)
//               if(startDateTime.getTime()>endDateTime.getTime()){
//                   res.status(200).json({
//                       status:false,
//                       msg:"Invalid date selection, Please modify your search and try again."
//                   });
//                   return;
//               }
//               const today = new Date();
//               const todayYear = today.getFullYear();
//               const todayMonth = today.getMonth();
//               const todayDate = today.getDate();
//               const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
//               var dateTocheck = new Date(includedDates[0])
//               if (
//                   dateTocheck.getFullYear() === todayYear &&
//                   dateTocheck.getMonth() === todayMonth &&
//                   dateTocheck.getDate() === todayDate &&
//                   today.getTime() > today2PM.getTime()
//               ){
//                   console.log("No Trip For Today")
//                   res.status(200).json({
//                       status: true,
//                       data: [],
//                       page: pageNo,
//                       limit: dataLimit,
//                       totalLength:0,
//                       singleboat: true,
//                       msg: "success",
//                   });
//                   return;
//               }
//               houseBoatQuery.isOverNight = true;
//               houseBoatQuery.totalRooms = {$gte:numberofRooms}
//               var houseBoats = await houseBoatModel.aggregate([
//                   {$match:houseBoatQuery},
//                   {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
//                   {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                   {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                   {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                   {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                   {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$tripType","OverNight"]},
//                                   { $in: ["Sharing", "$houseBoatType"] }
                                  
//                               ]
//                           }}
//                       }],as:"tripDetails"},
//                   },
//                   {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                   {$match:{tripDetails:{$exists:true},}},
//                   {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                   //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                   {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["houseBoatType","Private"]},
//                                   { $eq: ["$paymentStatus", "Success"] },
//                                   {
//                                       $setIsSubset: [ "$bookedDates",includedDates]
//                                   },
//                               ]
//                           }}
//                       }],as:"Bookings"},
//                   },
//                   {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                   {$match:{Bookings:{$exists:false},}},
//                   {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["houseBoatType","Private"]},
//                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                   {
//                                       $setIsSubset: [ includedDates,"$reservedDates" ]
//                                   },
//                               ]
//                           }}
//                       }],as:"Reservations"},
//                   },
//                   {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                   {$match:{Reservations:{$exists:false},}},
//                   //Check for already Booking in sharing category exist
//                   {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$houseBoatType","Sharing"]},
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$paymentStatus", "Success"] },
//                                   {
//                                       $setIsSubset: [ "$bookedDates",includedDates]
//                                   },
//                               ]
//                           }}
//                       },{
//                           $group: {
//                               _id: "$houseBoatId",
//                               totalRoomsBooked: {$sum: "$totalRooms"},
//                               totalGuestsBooked: {$sum: "$noOfAdults"},
//                               sharedHouseboat: {$push: "$$ROOT"}
//                           }
//                       }],as:"SharedBookings"},
//                   },
//                   {
//                       $addFields: {
//                           SharedBookings: {
//                               $cond: {
//                                   if: {$eq: ["$SharedBookings", []]},
//                                   then: [[]],
//                                   else: "$SharedBookings"
//                               }
//                           }
//                       }
//                   },
//                   {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
//                   {
//                       $addFields: {
//                           noOfRoomsBookedShared: {
//                               $cond: {
//                                   if: {$eq: ["$SharedBookings", []]},
//                                   then: 0,
//                                   else: "$SharedBookings.totalRoomsBooked"
//                               }
//                           },
//                           noOfGuestsBookedShared: {
//                               $cond: {
//                                   if: {$eq: ["$SharedBookings", []]},
//                                   then: 0,
//                                   else: "$SharedBookings.totalGuestsBooked"
//                               }
//                           }
//                       }
//                   },
//                   {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                       pipeline: [{
//                           $match: {$expr: { 
//                               $and: [
//                                   { $eq: ["$status", "Active"] },
//                                   { $eq: ["$houseBoatType","Sharing"]},
//                                   { $eq: ["$reservationStatus", "Reserved"] },
//                                   {
//                                       $setIsSubset: [ includedDates,"$reservedDates" ]
//                                   },
//                               ]
//                           }}
//                       },{
//                           $group: {
//                               _id: "$houseBoatId",
//                               totalRoomsBooked: {$sum: "$totalRooms"},
//                               totalGuestsBooked: {$sum: "$totalGuests"},
//                               sharedHouseboat: {$push: "$$ROOT"}
//                           }
//                       }],as:"SharedReservations"},
//                   },
//                   {
//                       $addFields: {
//                           SharedReservations: {
//                               $cond: {
//                                   if: {$eq: ["$SharedReservations", []]},
//                                   then: [[]],
//                                   else: "$SharedReservations"
//                               }
//                           }
//                       }
//                   },
//                   {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
//                   {
//                       $addFields: {
//                           noOfRoomsBookedReserved: {
//                               $cond: {
//                                   if: {$eq: ["$SharedReservations", []]},
//                                   then: 0,
//                                   else: "$SharedReservations.totalRoomsBooked"
//                               }
//                           },
//                           noOfGuestsBookedReserved: {
//                               $cond: {
//                                   if: {$eq: ["$SharedReservations", []]},
//                                   then: 0,
//                                   else: "$SharedReservations.totalGuestsBooked"
//                               }
//                           }
//                       }
//                   },
//                   {
//                       $addFields: {
//                           noOfRoomsBooked: {
//                               $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
//                           },
//                           noOfGuestsBooked: {
//                               $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
//                           }
//                       }
//                   },
//                   {
//                       $addFields: {
//                           totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
//                           totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
//                       }
//                   },
//                   // {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
//                   // {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

//               ])
//               /*
//               ---------------------CODE EXPLANATION----------------
//               Initial Match & Field Addition:Filters houseboats based on the provided query and adds two initial fields for guest and room counts.
//               Lookup & Unwinding:Looks up and unwinds sublocationmodels and locationmodels to get the starting location and location details.
//               Trip Type Filtering:Matches triptypemodels where the status is Active, tripType is OverNight, and houseBoatType includes Sharing.
//               Filters the documents based on maxCapacityOfBoats to accommodate the total number of guests.
//               Private Bookings Check:Looks for successful Private houseboat bookings that match the provided bookedDates.
//               Private Reservations Check:Searches for Private houseboat reservations that match the provided reservedDates.
//               Shared Bookings Lookup:Looks for successful Sharing houseboat bookings that match the provided bookedDates.
//               Groups and sums the booked rooms and guests for each houseboat ID.
//               Conditional Field Addition for Shared Bookings:Uses $cond to conditionally assign values or an empty array based on whether SharedBookings exists.
//               Shared Reservations Lookup:Searches for Sharing houseboat reservations that match the provided reservedDates.
//               Groups and sums the reserved rooms and guests for each houseboat ID.
//               Conditional Field Addition for Shared Reservations:Similar to Shared Bookings, uses $cond to conditionally assign values or an empty array based on whether SharedReservations exists.
//               Calculation of Booked Rooms and Guests:Adds up the booked rooms and guests from Shared Bookings and Reservations.
//               Available Rooms and Guest Capacity Calculation:Calculates the available rooms and guests by subtracting booked rooms and guests from the total rooms and maximum guest capacity respectively.
//               Final Matching:Filters the houseboats based on the available rooms and guest capacity to ensure it meets the required criteria (numberofRooms and totalGuest).
//               This aggregation pipeline checks both private and shared bookings and reservations for available houseboats, considering different criteria, and calculates available rooms and guest capacities for each.
//               ---------------------------END-----------------------
//               */
//               houseBoats = JSON.parse(JSON.stringify(houseBoats))
//               for(var i=0;i<houseBoats.length;i++){
//                   //Commented the below due to no need to check minimum capacity of boat for first booking
//                   // if((houseBoats[i].SharedReservations.length<=0)&&(houseBoats[i].SharedBookings.length<=0)){
//                   //     if(houseBoats[i].tripDetails.minCapacityOfBoats>totalGuest){
//                   //         continue;
//                   //     }
//                   // }
//                   var getRate = await RateController.CalculateOverNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
//                   if(getRate.status == true){
//                       houseBoats[i].customerRate = getRate.rate;
//                       result.push(houseBoats[i])
//                   }
//               }
//           }
//       }
//       res.status(200).json({
//           status: true,
//           data: result,
//           page: pageNo,
//           limit: dataLimit,
//           totalLength:result.length,
//           singleboat: true,
//           msg: "success",
//       });
//       return;
//   } catch (e) {
//       console.log(e);
//       res.status(500).json({
//           status: false,
//           msg: "Something went wrong",
//           e,
//       });
//   }
// })

//customer hb filter
// router.post('/houseboat/booking/filter/v1',async(req,res)=>{
//     try{
//         var {page,limit,category,houseBoatType,location,tripType,numberofRooms,checkInDate,checkOutDate,children,adult} = req.body;
//         var pageNo = 1,dataLimit = 20;
//         if (!Misc.isnullorempty(page) && !Misc.isnullorempty(limit)) {
//             page = parseInt(page);
//             limit = parseInt(limit);
//             if (
//                 typeof page === "number" &&
//                 typeof limit === "number" &&
//                 page > 0 &&
//                 limit > 0
//             ) {
//                 pageNo = page;
//                 dataLimit = limit;
//             }
//         }
//         if (Misc.isnullorempty(category)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide Category",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(houseBoatType)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide houseBoatType",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(location)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide location",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(tripType)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide tripType",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(numberofRooms)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide numberofRooms",
//             });
//             return;
//         }
//         if (typeof numberofRooms != 'number'){
//             numberofRooms=parseInt(numberofRooms)
//         }
//         if(numberofRooms<=0){
//             res.status(200).json({
//                 status:false,
//                 msg:"Number of rooms should be greater than zero."
//             });
//             return;
//         }
//         if(numberofRooms>=50){
//             res.status(200).json({
//                 status:false,
//                 msg:"Please select a valid number of rooms."
//             });
//             return;
//         }
//         if (Misc.isnullorempty(checkInDate)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide checkInDate",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(checkOutDate)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide checkOutDate",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(adult)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide adult",
//             });
//             return;
//         }
//         if(typeof adult != 'number'){
//             adult = parseInt(adult);
//         }
//         if(adult<=0){
//             res.status(200).json({
//                 status:false,
//                 msg:"Please select atleast one adult guest."
//             });
//             return;
//         }
//         if(Misc.isnullorempty(children)){
//             children = 0
//         }else{
//             children = parseInt(children)
//         }
//         if(children<0){
//             res.status(200).json({
//                 status:false,
//                 msg:"Number of child should be a postive number."
//             });
//             return;
//         }
//         var totalGuest = adult;//Consider only the adults as valid guests
        
//         var startDateTime = new Date(checkInDate);
//         var endDateTime = new Date(checkOutDate);
//         var includedDates = await getDates(startDateTime,endDateTime)//It will Return all program included dates
       
//         var result = []
//         var houseBoatQuery = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category, };//House boat query setting
//         if (houseBoatType === "Private") {
//             //All Three Category DayCruis NightStay and OverNight 
//             if(tripType == "DayCruise"){
//                 //Query For Day Cruis 
//                 houseBoatQuery.totalRooms = {$gte:numberofRooms}//Condetions for total Rooms available
//                 var includedDates = await getDatesFiltered(startDateTime,endDateTime)//Function returns the dates of booking it ignores the checkout date
//                 const today = new Date();
//                 const eightDaysAhead = new Date(today);
//                 eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
//                 if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
//                     console.log("In 8 Days")//If out side 8 days error shoud be generated
//                     res.status(200).json({
//                         status: true,
//                         data: [],
//                         page: pageNo,
//                         limit: dataLimit,
//                         totalLength:0,
//                         singleboat: true,
//                         msg: "success",
//                     });
//                     return;
//                 }
//                 const todayYear = today.getFullYear();
//                 const todayMonth = today.getMonth();
//                 const todayDate = today.getDate();
//                 const today1PM = new Date(todayYear, todayMonth, todayDate, 13, 0, 0);
//                 var dateToCheck = new Date(includedDates[0]);
//                 //In day cruis if we are searching for today as start date we should check if it the current time is grater than 1PM error should be generated
//                 if (
//                     dateToCheck.getFullYear() === todayYear &&
//                     dateToCheck.getMonth() === todayMonth &&
//                     dateToCheck.getDate() === todayDate &&
//                     today.getTime() > today1PM.getTime()
//                 ){
//                     console.log("No Trip For Today")
//                     //Today trip start time is over ,Trip is already started
//                     res.status(200).json({
//                         status: true,
//                         data: [],
//                         page: pageNo,
//                         limit: dataLimit,
//                         totalLength:0,
//                         singleboat: true,
//                         msg: "success",
//                     });
//                     return;
//                 }
//                 houseBoatQuery.isDayCriuse = true;
//                 var houseBoats = await houseBoatModel.aggregate([
//                     {$match:houseBoatQuery},
//                     {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                     {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                     {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                     {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                     {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$tripType","DayCruise"]},
//                                     { $in: ["Private", "$houseBoatType"] }
//                                 ]
//                             }}
//                         }],as:"tripDetails"},
//                     },
//                     {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                     {$match:{tripDetails:{$exists:true},}},
//                     {$match:{"tripDetails.maxPersonTrips":{$gte:totalGuest}}},
//                     {$match:{"tripDetails.minPersonTrips":{$lte:totalGuest}}},
//                     {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     {
//                                         $or: [
//                                           { $eq: ["$tripType", "DayCruise"] },
//                                           { $eq: ["$tripType", "OverNight"] }
//                                         ]
//                                     },
//                                     { $eq: ["$paymentStatus", "Success"] },
//                                     {
//                                         $setIsSubset: [ "$bookedDates",includedDates]
//                                     },
//                                 ]
//                             }}
//                         }],as:"Bookings"},
//                     },
//                     {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                     {$match:{Bookings:{$exists:false},}},
//                     {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     {
//                                         $or: [
//                                           { $eq: ["$tripType", "DayCruise"] },
//                                           { $eq: ["$tripType", "OverNight"] }
//                                         ]
//                                     },
//                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                     {
//                                         $setIsSubset: [ "$reservedDates",includedDates]
//                                     },
//                                 ]
//                             }}
//                         }],as:"Reservations"},
//                     },
//                     {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                     {$match:{Reservations:{$exists:false},}},
//                     //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//                 ])
//                 /*
//                 ---------------------CODE EXPLANATION----------------
//                 houseBoatModel.aggregate([...]): This initiates the aggregation pipeline on the houseBoatModel collection.
//                 {$match: houseBoatQuery}: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//                 $lookup stages: These stages perform a left outer join to fetch related data from other collections (sublocationmodels, locationmodels, triptypemodels) based on specified fields (startingLocation, location, _id).
//                 $unwind stages: These stages deconstruct arrays generated by the $lookup stages, ensuring each document has a single value or null for those fields.
//                 $lookup and subsequent stages for tripDetails: These stages perform a nested lookup to retrieve specific trip details from the triptypemodels collection based on various criteria such as active status, trip type, and house boat type.
//                 $match stages related to tripDetails: These stages filter the documents based on the existence of tripDetails, maximum and minimum person trips compared to totalGuest.
//                 $lookup, $unwind, and $match stages for Bookings and Reservations: These stages check for active bookings and reservations for the house boats, considering specific criteria like active status, trip types (day cruise or overnight), successful payment status, and the presence of included dates within booked or reserved dates.
//                 This pipeline essentially combines multiple stages to filter and match documents based on various conditions and relationships with related collections, ultimately aiming to retrieve houseBoatModel documents that meet the specified criteria for availability and booking status.
//                 ---------------------------END-----------------------
//                 */
//                 houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                 for(var i=0;i<houseBoats.length;i++){
//                     //Calcuation for rate a function is called.
//                     var getRate = await RateController.CalculateDayCruisRate(houseBoats[i],includedDates,totalGuest)
//                     if(getRate.status == true){
//                         houseBoats[i].customerRate = getRate.rate;
//                         result.push(houseBoats[i])
//                     }
//                 }
//             }else if(tripType == "NightStay"){
//                 var includedDates = await getDates(startDateTime,endDateTime)
//                 if(startDateTime.getTime()>endDateTime.getTime()){
//                     res.status(200).json({
//                         status:false,
//                         msg:"Invalid date selection, Please modify your search and try again."
//                     });
//                     return;
//                 }
//                 const today = new Date();
//                 const todayYear = today.getFullYear();
//                 const todayMonth = today.getMonth();
//                 const todayDate = today.getDate();
//                 const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
//                 var dateTocheck = new Date(includedDates[0])
//                 if (
//                     dateTocheck.getFullYear() === todayYear &&
//                     dateTocheck.getMonth() === todayMonth &&
//                     dateTocheck.getDate() === todayDate &&
//                     today.getTime() > today11PM.getTime()
//                 ){
//                     console.log("No Trip For Today")
//                     res.status(200).json({
//                         status: true,
//                         data: [],
//                         page: pageNo,
//                         limit: dataLimit,
//                         totalLength:0,
//                         singleboat: true,
//                         msg: "success",
//                     });
//                     return;
//                 }
//                 houseBoatQuery.isNightStay = true;
//                 houseBoatQuery.totalRooms = {$gte:numberofRooms}
//                 var houseBoats = await houseBoatModel.aggregate([
//                     { $match: houseBoatQuery },
//                     { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//                     { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//                     { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//                     { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//                     {
//                         $lookup: {
//                             from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                             pipeline: [{
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $in: ["Private", "$houseBoatType"] }
//                                         ]
//                                     }
//                                 }
//                             }], as: "tripDetails"
//                         },
//                     },
//                     { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//                     { $match: { tripDetails: { $exists: true }, } },
//                     { $match: { "tripDetails.maxCapacityOfBoats": { $gte: totalGuest } } },
//                     { $match: { "tripDetails.minCapacityOfBoats": { $lte: totalGuest } } },
//                     {
//                         $lookup: {
//                             from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                             pipeline: [{
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$paymentStatus", "Success"] },
//                                             {
//                                                 $or: [{
//                                                     $and: [
//                                                         { $eq: ["$tripType", "NightStay"] },
//                                                         { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$endDate", startDateTime] }] }]
//                                                 },
//                                                 {
//                                                     $and: [
//                                                         { $eq: ["$tripType", "OverNight"] },
//                                                         { $and: [{ $lte: ["$endDateTime", "$endDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
//                                                 },
//                                                 ]
//                                             }
//                                         ]
//                                     }
//                                 }
//                             }], as: "Bookings"
//                         },
//                     },
//                     { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//                     { $match: { Bookings: { $exists: false }, } },
//                     {
//                         $lookup: {
//                             from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                             pipeline: [{
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$reservationStatus", "Reserved"] },
//                                             {
//                                                 $or: [{
//                                                     $and: [
//                                                         { $eq: ["$tripType", "NightStay"] },
//                                                         { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$checkOutDate", startDateTime] }] }]
//                                                 },
//                                                 {
//                                                     $and: [
//                                                         { $eq: ["$tripType", "OverNight"] },
//                                                         { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
//                                                 },
//                                                 ]
//                                             }
//                                         ]
//                                     }
//                                 }
//                             }], as: "Reservations"
//                         },
//                     },
//                     { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//                     { $match: { Reservations: { $exists: false }, } },
//                     {
//                         $lookup: {
//                             from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                             pipeline: [{
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$paymentStatus", "Success"] },
//                                             { $eq: ["$tripType", "DayCruise"] },
//                                             {
//                                                 $setIsSubset: [ includedDates,"$bookedDates" ]
//                                             }
//                                         ]
//                                     }
//                                 }
//                             }], as: "DayBookings"
//                         },
//                     },
//                     { $unwind: { "path": "$DayBookings", preserveNullAndEmptyArrays: true } },
//                     {
//                         $lookup: {
//                             from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                             pipeline: [{
//                                 $match: {
//                                     $expr: {
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$reservationStatus", "Reserved"] },
//                                             { $eq: ["$tripType", "DayCruise"] },
//                                             {
//                                                 $setIsSubset: [ includedDates,"$reservedDates" ]
//                                             },
//                                         ]
//                                     }
//                                 }
//                             }], as: "DayReservations"
//                         },
//                     },
//                     { $unwind: { "path": "$DayReservations", preserveNullAndEmptyArrays: true } },
//                     { $match: { $or: [{ DayBookings: { $exists: true } }, { DayReservations: { $exists: true } }] } }
//                 ])
//                 /*
//                 ---------------------CODE EXPLANATION----------------
//                 Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//                 $lookup and $unwind stages: These stages fetch related data from other collections (sublocationmodels and locationmodels) and unwind arrays generated by the lookup, similar to the previous code.
//                 $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "NightStay", and house boat type being "Private".
//                 $match stages related to tripDetails: Filters documents based on the existence of tripDetails, maximum and minimum capacity of boats compared to totalGuest.
//                 $lookup and $unwind stages for Bookings and Reservations: These stages check for active bookings and reservations considering various criteria such as active status, trip types (night stay or overnight), successful payment status, and date ranges for booking and reservation overlaps.
//                 Additional $lookup, $unwind, and $match stages for DayBookings and DayReservations: These stages focus specifically on day cruise bookings and reservations, checking for active bookings/reservations, successful payment status, and date overlaps with included dates.
//                 Final $match stage with $or condition: This line combines day cruise bookings and reservations to check for documents where either DayBookings or DayReservations exist, aiming to find availability for day cruises.
//                 Overall, this pipeline aims to filter and match documents in the houseBoatModel collection based on various conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, focusing on both night stay and day cruise scenarios.
//                 ---------------------------END-----------------------
//                 */
//                 houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                 for(var i=0;i<houseBoats.length;i++){
//                     if((Misc.isnullorempty(houseBoats[i].DayBookings))&&(Misc.isnullorempty(houseBoats[i].DayReservations))){
//                         continue;
//                     }
//                     var getRate = await RateController.CalculateNightStayRate(houseBoats[i],includedDates,totalGuest)
//                     if(getRate.status == true){
//                         houseBoats[i].customerRate = getRate.rate;
//                         result.push(houseBoats[i])
//                     }
//                 }
//             }else{
//                 var includedDates = await getDates(startDateTime,endDateTime)
//                 if(startDateTime.getTime()>endDateTime.getTime()){
//                     res.status(200).json({
//                         status:false,
//                         msg:"Invalid date selection, Please modify your search and try again."
//                     });
//                     return;
//                 }
//                 const today = new Date();
//                 const todayYear = today.getFullYear();
//                 const todayMonth = today.getMonth();
//                 const todayDate = today.getDate();
//                 const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
//                 var dateTocheck = new Date(includedDates[0])
//                 if (
//                     dateTocheck.getFullYear() === todayYear &&
//                     dateTocheck.getMonth() === todayMonth &&
//                     dateTocheck.getDate() === todayDate &&
//                     today.getTime() > today2PM.getTime()
//                 ){
//                     console.log("No Trip For Today")
//                     res.status(200).json({
//                         status: true,
//                         data: [],
//                         page: pageNo,
//                         limit: dataLimit,
//                         totalLength:0,
//                         singleboat: true,
//                         msg: "success",
//                     });
//                     return;
//                 }
//                 houseBoatQuery.isOverNight = true;
//                 houseBoatQuery.totalRooms = {$gte:numberofRooms}
//                 var houseBoats = await houseBoatModel.aggregate([
//                     {$match:houseBoatQuery},
//                     {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                     {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                     {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                     {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                     {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$tripType","OverNight"]},
//                                     { $in: ["Private", "$houseBoatType"] }
                                    
//                                 ]
//                             }}
//                         }],as:"tripDetails"},
//                     },
//                     {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                     {$match:{tripDetails:{$exists:true},}},
//                     {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                     {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                     {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$paymentStatus", "Success"] },
//                                     {
//                                         $setIsSubset: [ "$bookedDates",includedDates]
//                                     },
//                                 ]
//                             }}
//                         }],as:"Bookings"},
//                     },
//                     {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                     {$match:{Bookings:{$exists:false},}},
//                     {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                     {
//                                         $setIsSubset: [ includedDates,"$reservedDates" ]
//                                     },
//                                 ]
//                             }}
//                         }],as:"Reservations"},
//                     },
//                     {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                     {$match:{Reservations:{$exists:false},}},
//                 ])
//                 /*
//                 ---------------------CODE EXPLANATION----------------
//                 Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//                 $lookup and $unwind stages for locations: These stages fetch details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields and unwind arrays created by the lookup, similar to the previous examples.
//                 $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "OverNight", and house boat type being "Private".
//                 $match stages related to tripDetails: Filters documents based on the existence of tripDetails, maximum and minimum capacity of boats compared to totalGuest.
//                 $lookup and subsequent stages for Bookings: These stages check for active bookings considering specific criteria such as active status, successful payment status, and the presence of included dates within booked dates.
//                 $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where Bookings array doesn't exist.
//                 $lookup and subsequent stages for Reservations: These stages check for active reservations considering criteria like active status, reservation status being "Reserved", and included dates within reserved dates.
//                 $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where Reservations array doesn't exist.
//                 This aggregation pipeline essentially aims to filter documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings, successful payments, and date overlaps, focusing specifically on "OverNight" trips. The final result should be a set of documents that meet these criteria and are available for bookings.
//                 ---------------------------END-----------------------
//                 */
//                 houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                 for(var i=0;i<houseBoats.length;i++){
//                     var getRate = await RateController.CalculateOverNightStayRate(houseBoats[i],includedDates,totalGuest)
//                     if(getRate.status == true){
//                         houseBoats[i].customerRate = getRate.rate;
//                         result.push(houseBoats[i])
//                     }
//                 }
//             }
//             if (result.length <= 0) {
//                 var houseBoatQueryMultiple = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category, };
//                 if (houseBoatType === "Private") {
//                     if (tripType == "DayCruise") {
//                         //houseBoatQuery.totalRooms = { $gte: numberofRooms }
//                         var includedDates = await getDatesFiltered(startDateTime, endDateTime)
//                         const today = new Date();
//                         const eightDaysAhead = new Date(today);
//                         eightDaysAhead.setDate(today.getDate() + 8);
//                         if(includedDates[0]>eightDaysAhead){
//                             console.log("In 8 Days")
//                             res.status(200).json({
//                             status: true,
//                             data: [],
//                             page: pageNo,
//                             limit: dataLimit,
//                             totalLength:0,
//                             singleboat: true,
//                             msg: "success",
//                         });
//                         return;
//                     }
//                     const todayYear = today.getFullYear();
//                     const todayMonth = today.getMonth();
//                     const todayDate = today.getDate();
//                     const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
//                     var dateToCheck = new Date(includedDates[0]);
//                     if (dateToCheck.getFullYear() === todayYear &&dateToCheck.getMonth() === todayMonth &&dateToCheck.getDate() === todayDate &&today.getTime() > today1PM.getTime()){
//                         console.log("No Trip For Today")
//                         res.status(200).json({
//                             status: true,
//                             data: [],
//                             page: pageNo,
//                             limit: dataLimit,
//                             totalLength:0,
//                             singleboat: true,
//                             msg: "success",
//                         });
//                         return;
//                     }
//                     houseBoatQueryMultiple.isDayCriuse = true;
//                         var vendorGroup = await houseBoatModel.aggregate([
//                             { $match: houseBoatQueryMultiple },
//                             { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//                             { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//                             { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//                             { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//                             {
//                                 $lookup: {
//                                     from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                                     pipeline: [{
//                                         $match: {
//                                             $expr: {
//                                                 $and: [
//                                                     { $eq: ["$status", "Active"] },
//                                                     { $eq: ["$tripType", "DayCruise"] },
//                                                     { $in: ["Private", "$houseBoatType"] }
//                                                 ]
//                                             }
//                                         }
//                                     }], as: "tripDetails"
//                                 },
//                             },
//                             { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//                             { $match: { tripDetails: { $exists: true }, } },
//                             { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
//                             // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
//                             { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
//                             {
//                                 $lookup: {
//                                     from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                                     pipeline: [{
//                                         $match: {
//                                             $expr: {
//                                                 $and: [
//                                                     { $eq: ["$status", "Active"] },
//                                                     {
//                                                         $or: [
//                                                             { $eq: ["$tripType", "DayCruise"] },
//                                                             { $eq: ["$tripType", "OverNight"] }
//                                                         ]
//                                                     },
//                                                     { $eq: ["$paymentStatus", "Success"] },
//                                                     {
//                                                         $setIsSubset: ["$bookedDates", includedDates]
//                                                     },
//                                                 ]
//                                             }
//                                         }
//                                     }], as: "Bookings"
//                                 },
//                             },
//                             { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//                             { $match: { Bookings: { $exists: false }, } },
//                             {
//                                 $lookup: {
//                                     from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                                     pipeline: [{
//                                         $match: {
//                                             $expr: {
//                                                 $and: [
//                                                     { $eq: ["$status", "Active"] },
//                                                     {
//                                                         $or: [
//                                                             { $eq: ["$tripType", "DayCruise"] },
//                                                             { $eq: ["$tripType", "OverNight"] }
//                                                         ]
//                                                     },
//                                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                                     {
//                                                         $setIsSubset: [ "$reservedDates",includedDates]
//                                                     },
//                                                 ]
//                                             }
//                                         }
//                                     }], as: "Reservations"
//                                 },
//                             },
//                             { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//                             { $match: { Reservations: { $exists: false }, } },
//                             { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                             { $match:{ totalboats:{$gt:1}}}
//                             //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//                         ])
//                         var locationGroup = await houseBoatModel.aggregate([
//                             { $match: houseBoatQueryMultiple },
//                             { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//                             { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//                             { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//                             { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//                             {
//                                 $lookup: {
//                                     from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                                     pipeline: [{
//                                         $match: {
//                                             $expr: {
//                                                 $and: [
//                                                     { $eq: ["$status", "Active"] },
//                                                     { $eq: ["$tripType", "DayCruise"] },
//                                                     { $in: ["Private", "$houseBoatType"] }
//                                                 ]
//                                             }
//                                         }
//                                     }], as: "tripDetails"
//                                 },
//                             },
//                             { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//                             { $match: { tripDetails: { $exists: true }, } },
//                             { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
//                             // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
//                             { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
//                             {
//                                 $lookup: {
//                                     from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                                     pipeline: [{
//                                         $match: {
//                                             $expr: {
//                                                 $and: [
//                                                     { $eq: ["$status", "Active"] },
//                                                     {
//                                                         $or: [
//                                                             { $eq: ["$tripType", "DayCruise"] },
//                                                             { $eq: ["$tripType", "OverNight"] }
//                                                         ]
//                                                     },
//                                                     { $eq: ["$paymentStatus", "Success"] },
//                                                     {
//                                                         $setIsSubset: ["$bookedDates", includedDates]
//                                                     },
//                                                 ]
//                                             }
//                                         }
//                                     }], as: "Bookings"
//                                 },
//                             },
//                             { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//                             { $match: { Bookings: { $exists: false }, } },
//                             {
//                                 $lookup: {
//                                     from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                                     pipeline: [{
//                                         $match: {
//                                             $expr: {
//                                                 $and: [
//                                                     { $eq: ["$status", "Active"] },
//                                                     {
//                                                         $or: [
//                                                             { $eq: ["$tripType", "DayCruise"] },
//                                                             { $eq: ["$tripType", "OverNight"] }
//                                                         ]
//                                                     },
//                                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                                     {
//                                                         $setIsSubset: [ includedDates,"$reservedDates" ]
//                                                     },
//                                                 ]
//                                             }
//                                         }
//                                     }], as: "Reservations"
//                                 },
//                             },
//                             { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//                             { $match: { Reservations: { $exists: false }, } },
//                             { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                             { $match:{ totalboats:{$gt:1}}}
//                             //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//                         ])
//                         var houseBoats = vendorGroup.concat(locationGroup)
//                         /*
//                         ---------------------CODE EXPLANATION----------------
//                         Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
//                         $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, unwinding arrays generated by the lookup, similar to previous examples.
//                         $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "DayCruise", and house boat type being "Private".
//                         $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence.
//                         Commented-out $match stage: Seems to have been commented out but might have been intended to filter based on the maximum number of person trips.
//                         $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria like active status, successful payment status, trip types (day cruise or overnight), and the presence of included dates within booked dates.
//                         $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where Bookings array doesn't exist.
//                         $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria like active status, reservation status being "Reserved", trip types (day cruise or overnight), and the presence of included dates within reserved dates.
//                         $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where Reservations array doesn't exist.
//                         Commented-out $match stage: A potential final match condition utilizing $or logic to find documents where either reservations or bookings don't exist.
//                         ---------------------------END-----------------------
//                         */
//                         houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                         var houseBoat = [];
//                         for(var n=0;n<houseBoats.length;n++){
//                             var result = [];
//                             for (var k = 0; k < houseBoats[n].details.length; k++) {
//                                 var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
//                                 if (getRate.status == true) {
//                                     houseBoats[n].details[k].customerRate = getRate.rate;
//                                     result.push(houseBoats[n].details[k])
//                                 }
//                             }
//                             houseBoat.push({ _id: houseBoats[n]._id, boats: result,totalboats:houseBoats[n].totalboats });
//                         }
//                         var finalResult = [];
//                         for(var h =0;h<houseBoat.length;h++){
//                             var newResult = getCombinationsOnDay(houseBoat[h].boats, adult);
//                             for(var i=0;i<newResult.length;i++){
//                                 var data = {}
//                                 var totalAmount = 0
//                                 var id = [];
//                                 var totalGuestCanBeAccomadated = 0
//                                 if (newResult[i].length <= 1) {
//                                     continue;
//                                 }
//                                 var totalRemiGuests = adult;
//                                 for (var j = 0; j < newResult[i].length; j++) {
//                                     if(totalRemiGuests>=newResult[i][j].tripDetails.maxPersonTrips){
//                                         var guestsForCalculations = newResult[i][j].tripDetails.maxPersonTrips;
//                                         totalRemiGuests = totalRemiGuests-newResult[i][j].tripDetails.maxPersonTrips;
//                                     }else{
//                                         var guestsForCalculations = totalRemiGuests;
//                                         totalRemiGuests = 0;
//                                     }
//                                     var getRate = await RateController.CalculateDayCruisRate(newResult[i][j], includedDates,guestsForCalculations)
//                                     if (getRate.status == true) {
//                                         newResult[i][j].customerRate = getRate.rate;
//                                         //result.push(houseBoats[n].details[k])
//                                     }
//                                     totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
//                                     totalAmount += newResult[i][j].customerRate;
//                                     id.push(newResult[i][j]._id)
//                                 }
//                                 data._id = id
//                                 data.totalAmount = totalAmount
//                                 data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated
//                                 data.houseBoatDetails = newResult[i]
//                                 finalResult.push(data)
//                             }
//                         }
//                         function arraysEqual(arr1, arr2) {
//                             return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//                         }
//                         finalResult = finalResult.filter((obj, index, array) => {
//                             return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//                         });
//                         res.status(200).json({
//                             status: true,
//                             data: finalResult,
//                             page: pageNo,
//                             limit: dataLimit,
//                             totalLength: finalResult.length,
//                             singleboat: false,
//                             msg: "success",
//                         });
//                         return; 
//                     }
//                     else if(tripType == "NightStay"){
//                         var includedDates = await getDates(startDateTime,endDateTime)
//                         if(startDateTime.getTime()>endDateTime.getTime()){
//                             res.status(200).json({
//                                 status:false,
//                                 msg:"Invalid date selection, Please modify your search and try again."
//                             });
//                             return;
//                         }
//                         const today = new Date();
//                         const todayYear = today.getFullYear();
//                         const todayMonth = today.getMonth();
//                         const todayDate = today.getDate();
//                         const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
//                         var dateTocheck = new Date(includedDates[0])
//                         if (
//                             dateTocheck.getFullYear() === todayYear &&
//                             dateTocheck.getMonth() === todayMonth &&
//                             dateTocheck.getDate() === todayDate &&
//                             today.getTime() > today11PM.getTime()
//                         ){
//                             console.log("No Trip For Today")
//                             res.status(200).json({
//                                 status: true,
//                                 data: [],
//                                 page: pageNo,
//                                 limit: dataLimit,
//                                 totalLength:0,
//                                 singleboat: true,
//                                 msg: "success",
//                             });
//                             return;
//                         }
//                         houseBoatQuery.isNightStay = true;
//                         //houseBoatQuery.totalRooms = {$gte:numberofRooms}
//                         var vendorGroup = await houseBoatModel.aggregate([
//                             {$match:houseBoatQuery},
//                             {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                             {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                             {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                             {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
//                             {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$tripType","NightStay"]},
//                                             { $in: ["Private", "$houseBoatType"] }
//                                         ]
//                                     }}
//                                 }],as:"tripDetails"},
//                             },
//                             {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                             {$match:{tripDetails:{$exists:true},}},
//                             //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                             {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                             {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$paymentStatus", "Success"] },
//                                             {
//                                                 $or: [{
//                                                     $and: [
//                                                         { $eq: ["$tripType", "NightStay"] },
//                                                         { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                                     },
//                                                     {
//                                                     $and: [
//                                                         { $eq: ["$tripType", "OverNight"] },
//                                                         { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                                     },
//                                                 ]
//                                             }
//                                         ]
//                                     }}
//                                 }],as:"Bookings"},
//                             },
//                             {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                             {$match:{Bookings:{$exists:false},}},
//                             {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$reservationStatus", "Reserved"] },
//                                             {
//                                                 $or: [{
//                                                     $and: [
//                                                         { $eq: ["$tripType", "NightStay"] },
//                                                         { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                                     },
//                                                     {
//                                                     $and: [
//                                                         { $eq: ["$tripType", "OverNight"] },
//                                                         { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                                     },
//                                                 ]
//                                             }
//                                         ]
//                                     }}
//                                 }],as:"Reservations"},
//                             },
//                             {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                             {$match:{Reservations:{$exists:false},}},
//                             {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$paymentStatus", "Success"] },
//                                             { $eq: ["$tripType", "DayCruise"] },
//                                             {
//                                                 $setIsSubset: [ includedDates,"$bookedDates" ]
//                                             }
//                                         ]
//                                     }}
//                                 }],as:"DayBookings"},
//                             },
//                             {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//                             {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                             pipeline: [{
//                                 $match: {$expr: { 
//                                     $and: [
//                                         { $eq: ["$status", "Active"] },
//                                         { $eq: ["$reservationStatus", "Reserved"] },
//                                         { $eq: ["$tripType", "DayCruise"] },
//                                         {
//                                             $setIsSubset: [ includedDates,"$reservedDates" ]
//                                         },
//                                     ]
//                                 }}
//                             }],as:"DayReservations"},
//                         },
//                         {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//                         {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//                         {$group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                         {$match:{ totalboats:{$gt:1}}}
//                         ])
//                         var locationGroup = await houseBoatModel.aggregate([
//                             {$match:houseBoatQuery},
//                             {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                             {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                             {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                             {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
//                             {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$tripType","NightStay"]},
//                                             { $in: ["Private", "$houseBoatType"] }
//                                         ]
//                                     }}
//                                 }],as:"tripDetails"},
//                             },
//                             {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                             {$match:{tripDetails:{$exists:true},}},
//                             //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                             {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                             {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$paymentStatus", "Success"] },
//                                             {
//                                                 $or: [{
//                                                     $and: [
//                                                         { $eq: ["$tripType", "NightStay"] },
//                                                         { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                                     },
//                                                     {
//                                                     $and: [
//                                                         { $eq: ["$tripType", "OverNight"] },
//                                                         { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                                     },
//                                                 ]
//                                             }
//                                         ]
//                                     }}
//                                 }],as:"Bookings"},
//                             },
//                             {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                             {$match:{Bookings:{$exists:false},}},
//                             {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$reservationStatus", "Reserved"] },
//                                             {
//                                                 $or: [{
//                                                     $and: [
//                                                         { $eq: ["$tripType", "NightStay"] },
//                                                         { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                                     },
//                                                     {
//                                                     $and: [
//                                                         { $eq: ["$tripType", "OverNight"] },
//                                                         { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                                     },
//                                                 ]
//                                             }
//                                         ]
//                                     }}
//                                 }],as:"Reservations"},
//                             },
//                             {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                             {$match:{Reservations:{$exists:false},}},
//                             {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$paymentStatus", "Success"] },
//                                             { $eq: ["$tripType", "DayCruise"] },
//                                             {
//                                                 $setIsSubset: [ includedDates,"$bookedDates"]
//                                             }
//                                         ]
//                                     }}
//                                 }],as:"DayBookings"},
//                             },
//                             {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//                             {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                             pipeline: [{
//                                 $match: {$expr: { 
//                                     $and: [
//                                         { $eq: ["$status", "Active"] },
//                                         { $eq: ["$reservationStatus", "Reserved"] },
//                                         { $eq: ["$tripType", "DayCruise"] },
//                                         {
//                                             $setIsSubset: [ includedDates,"$reservedDates" ]
//                                         },
//                                     ]
//                                 }}
//                             }],as:"DayReservations"},
//                         },
//                         {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//                         {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//                         {$group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                         {$match:{ totalboats:{$gt:1}}}
//                         ])
//                         var houseBoats = vendorGroup.concat(locationGroup)
//                         /*
//                         ---------------------CODE EXPLANATION----------------
//                         Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//                         $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, unwinding arrays generated by the lookup, which was described previously.
//                         $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "NightStay", and house boat type being "Private".
//                         $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
//                         $lookup and subsequent stages for Bookings: Checks for active night stay bookings considering criteria such as active status, successful payment status, trip types (night stay or overnight), and the presence of included dates within booked dates.
//                         $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
//                         $lookup and subsequent stages for Reservations: Checks for active night stay reservations considering criteria such as active status, reservation status being "Reserved", trip types (night stay or overnight), and the presence of included dates within reserved dates.
//                         $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
//                         Additional $lookup, $unwind, and $match stages for DayBookings and DayReservations: These stages specifically focus on day cruise bookings and reservations, using similar criteria and matching conditions to find availability for day cruises.
//                         Final $match stage with $or condition: This line combines day cruise bookings and reservations to find documents where either DayBookings or DayReservations exist, indicating availability for day cruises.
//                         This aggregation pipeline aims to filter documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, focusing on both night stays and day cruises with specific criteria for availability.
//                         ---------------------------END-----------------------
//                         */
//                         var finalResult = [];
//                         houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                         for(var h=0;h<houseBoats.length;h++){
//                             for(var g=0;g<houseBoats[h].details.length;g++){
//                                 var numberOfRooms = houseBoats[h].details[g].totalRooms;
//                                 var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
//                                 var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
//                                 houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
//                                 houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
//                             }
//                         }
//                         for(var p=0;p<houseBoats.length;p++){
//                             var result = [];
//                             var totalGuestCanBeAccomadated = 0
//                             var totalExtraGuestCanBeaccomadated = 0
//                             var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
//                             var hbs = getMostSutableValue;
//                             const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                             for(var k =0;k<hbs.length;k++){
//                                 totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
//                                 totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                                 var totalguests = hbs[k].tripDetails.maxPersonPerRooms
//                                 hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
//                                 hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                                 var getRate = await RateController.CalculateNightStayRateCombination(hbs[k],includedDates,totalguests)
//                                 if(getRate.status == true){
//                                     hbs[k].customerRate = getRate.rate;
//                                     hbs[k].extraPersonRate = getRate.extraPersonRate
//                                     result.push(hbs[k])
//                                 }
//                             }
//                             var data = {}
//                             var totalAmount = 0
//                             var id = [];
//                             for(var t=0;t<result.length;t++){
//                                 totalAmount  += result[t].customerRate;
//                                 id.push(result[t]._id)
//                             }
//                             data._id = id
//                             data.totalAmount = totalAmount
//                             data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
//                             data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
//                             data.houseBoatDetails = result
//                             if(sumOfTotals>=numberofRooms){
//                                 if(totalGuestCanBeAccomadated>=adult){
//                                     finalResult.push(data)
//                                 }else{
//                                     //Calculations For additional Guests
//                                     var istrue = false
//                                      var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
//                                     if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
//                                         console.log("Cant Accomadate these many extra guests")
//                                     }else{
//                                         var reminingAdditionalGuests = additionalGuestAvailable
//                                         var additionalAmount = 0;
//                                         for(var d=0;d<data.houseBoatDetails.length;d++){
//                                             if(reminingAdditionalGuests>0){
//                                                 if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                                                     additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                                     reminingAdditionalGuests = 0;
//                                                 }else{
//                                                     additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                                     reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                                                 }
//                                             }else{
//                                                 istrue = true
//                                                 break;
//                                             }
//                                         }
//                                         if (!isNaN(additionalAmount)){
//                                             data.additionalAmount = additionalAmount;
//                                             data.totalAmount +=additionalAmount
//                                         }
//                                         if(istrue == true){
//                                             finalResult.push(data)
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                         function arraysEqual(arr1, arr2) {
//                             return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//                         }
//                         finalResult = finalResult.filter((obj, index, array) => {
//                             return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//                         });
//                         res.status(200).json({
//                             status:true,
//                             data: finalResult,
//                             page: pageNo,
//                             limit: dataLimit,
//                             totalLength:finalResult.length,
//                             singleboat: false,
//                             msg: "success",
//                         });
//                         return;
//                     }else{
//                         var includedDates = await getDates(startDateTime,endDateTime)
//                         if(startDateTime.getTime()>endDateTime.getTime()){
//                             res.status(200).json({
//                                 status:false,
//                                 msg:"Invalid date selection, Please modify your search and try again."
//                             });
//                             return;
//                         }
//                         const today = new Date();
//                         const todayYear = today.getFullYear();
//                         const todayMonth = today.getMonth();
//                         const todayDate = today.getDate();
//                         const today2PM = new Date(todayYear, todayMonth, todayDate, 2, 0, 0);
//                         var dateTocheck = new Date(includedDates[0])
//                         if (
//                             dateTocheck.getFullYear() === todayYear &&
//                             dateTocheck.getMonth() === todayMonth &&
//                             dateTocheck.getDate() === todayDate &&
//                             today.getTime() > today2PM.getTime()
//                         ) {
//                             console.log("No Trip For Today")
//                             res.status(200).json({
//                                 status: true,
//                                 data: [],
//                                 page: pageNo,
//                                 limit: dataLimit,
//                                 totalLength: 0,
//                                 singleboat: true,
//                                 msg: "success",
//                             });
//                             return;
//                         }
//                         houseBoatQuery.isOverNight = true;
//                         //houseBoatQueryMultiple.totalRooms = {$gte:numberofRooms}
//                         var vendorWise = await houseBoatModel.aggregate([
//                             {$match:houseBoatQueryMultiple},
//                             {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                             {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                             {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                             {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                             {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$tripType","OverNight"]},
//                                             { $in: ["Private", "$houseBoatType"] }
                                            
//                                         ]
//                                     }}
//                                 }],as:"tripDetails"},
//                             },
//                             {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                             {$match:{tripDetails:{$exists:true},}},
//                             {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
//                             // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                             {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                             {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$paymentStatus", "Success"] },
//                                             {
//                                                 $setIsSubset: [ "$bookedDates",includedDates]
//                                             },
//                                         ]
//                                     }}
//                                 }],as:"Bookings"},
//                             },
//                             {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                             {$match:{Bookings:{$exists:false},}},
//                             {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$reservationStatus", "Reserved"] },
//                                             {
//                                                 $setIsSubset: [ includedDates,"$reservedDates"]
//                                             },
//                                         ]
//                                     }}
//                                 }],as:"Reservations"},
//                             },
//                             {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                             {$match:{Reservations:{$exists:false},}},
//                             { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                             { $match:{ totalboats:{$gt:1}}}
//                         ])
//                         var locationWise = await houseBoatModel.aggregate([
//                             {$match:houseBoatQueryMultiple},
//                             {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                             {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                             {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                             {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                             {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$tripType","OverNight"]},
//                                             { $in: ["Private", "$houseBoatType"] }
                                            
//                                         ]
//                                     }}
//                                 }],as:"tripDetails"},
//                             },
//                             {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                             {$match:{tripDetails:{$exists:true},}},
//                             {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
//                             // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                             {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                             {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$paymentStatus", "Success"] },
//                                             {
//                                                 $setIsSubset: [ "$bookedDates",includedDates]
//                                             },
//                                         ]
//                                     }}
//                                 }],as:"Bookings"},
//                             },
//                             {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                             {$match:{Bookings:{$exists:false},}},
//                             {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                                 pipeline: [{
//                                     $match: {$expr: { 
//                                         $and: [
//                                             { $eq: ["$status", "Active"] },
//                                             { $eq: ["$reservationStatus", "Reserved"] },
//                                             {
//                                                 $setIsSubset: [ includedDates,"$reservedDates" ]
//                                             },
//                                         ]
//                                     }}
//                                 }],as:"Reservations"},
//                             },
//                             {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                             {$match:{Reservations:{$exists:false},}},
//                             { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                             { $match:{ totalboats:{$gt:1}}}
//                         ])
//                         houseBoats = vendorWise.concat(locationWise)
//                         /*
//                         ---------------------CODE EXPLANATION----------------
//                         Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
//                         $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, similar to the previous examples.
//                         $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "OverNight", and house boat type being "Private".
//                         $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
//                         $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates.
//                         $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
//                         $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates.
//                         $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
//                         This aggregation pipeline seems to focus on filtering documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, primarily focusing on overnight stays with specific criteria for availability.
//                         ---------------------------END-----------------------
//                         */
//                         houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                         for(var h=0;h<houseBoats.length;h++){
//                             for(var g=0;g<houseBoats[h].details.length;g++){
//                                 var numberOfRooms = houseBoats[h].details[g].totalRooms;
//                                 var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
//                                 var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
//                                 houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
//                                 houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
//                             }
//                         }
//                         var finalResult = [];
                        
//                         for(var p=0;p<houseBoats.length;p++){
//                             var result = [];
//                             var totalGuestCanBeAccomadated = 0
//                             var totalExtraGuestCanBeaccomadated = 0
//                             var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
//                             var hbs = getMostSutableValue;
//                             for(var k =0;k<hbs.length;k++){
//                                 totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
//                                 totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                                 var totalguests = hbs[k].tripDetails.maxPersonPerRooms
//                                 hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
//                                 hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                                 var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k],includedDates,totalguests)
//                                 if(getRate.status == true){
//                                     hbs[k].customerRate = getRate.rate;
//                                     hbs[k].extraPersonRate = getRate.extraPersonRate
//                                     result.push(hbs[k])
//                                 }
//                             }
//                             var data = {}
//                             var totalAmount = 0
//                             var id = [];
//                             for(var t=0;t<result.length;t++){
//                                 totalAmount  += result[t].customerRate;
//                                 id.push(result[t]._id)
//                             }
//                             data._id = id
//                             data.totalAmount = totalAmount
//                             data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
//                             data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
//                             data.houseBoatDetails = result
//                             const sumOfTotals = result.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                             if(sumOfTotals>=numberofRooms){
//                                 if(totalGuestCanBeAccomadated>=adult){
//                                     var totalRoomsFound =  data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                                     if(totalRoomsFound>=numberofRooms){
//                                         finalResult.push(data)
//                                     }
//                                 }else{
//                                     //Calculations For additional Guests
//                                     var istrue = false
//                                      var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
//                                     if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
//                                         console.log("Cant Accomadate these many extra guests")
//                                     }else{
//                                         var reminingAdditionalGuests = additionalGuestAvailable
//                                         var additionalAmount = 0;
//                                         for(var d=0;d<data.houseBoatDetails.length;d++){
//                                             if(reminingAdditionalGuests>0){
//                                                 if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                                                     additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                                     reminingAdditionalGuests = 0;
//                                                     istrue = true;
//                                                     break
//                                                 }else{
//                                                     additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                                     reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                                                 }
//                                             }else{
//                                                 istrue = true
//                                                 break;
//                                             }
//                                         }
//                                         if (!isNaN(additionalAmount)){
//                                             data.additionalAmount = additionalAmount;
//                                             data.totalAmount +=additionalAmount
//                                         }
//                                         if(istrue == true){
//                                             finalResult.push(data)
//                                         }
//                                     }
//                                 }
//                             }
//                         }
//                         function arraysEqual(arr1, arr2) {
//                             return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//                         }
//                         finalResult = finalResult.filter((obj, index, array) => {
//                             return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//                         });
//                         // for(var f=0;f<finalResult.length;f++){
//                         //     v
//                         // }
//                         res.status(200).json({
//                             status:true,
//                             data: finalResult,
//                             page: pageNo,
//                             limit: dataLimit,
//                             totalLength:finalResult.length,
//                             singleboat: false,
//                             msg: "success",
//                         });
//                         return;
//                     }
//                 }
//             } 
//         }else{
//             //This is for sharing Boat Booking
//             if(tripType == "DayCruise"){
//                 houseBoatQuery.totalRooms = {$gte:numberofRooms}
//                 var includedDates = await getDatesFiltered(startDateTime,endDateTime)
//                 const today = new Date();
//                 const eightDaysAhead = new Date(today);
//                 eightDaysAhead.setDate(today.getDate() + 8);
//                 if(includedDates[0]>eightDaysAhead){
//                     console.log("In 8 Days")
//                     res.status(200).json({
//                         status: true,
//                         data: [],
//                         page: pageNo,
//                         limit: dataLimit,
//                         totalLength:0,
//                         singleboat: true,
//                         msg: "success",
//                     });
//                     return;
//                 }
//                 const todayYear = today.getFullYear();
//                 const todayMonth = today.getMonth();
//                 const todayDate = today.getDate();
//                 const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
//                 var dateToCheck = new Date(includedDates[0])
//                 if (
//                     dateToCheck.getFullYear() === todayYear &&
//                     dateToCheck.getMonth() === todayMonth &&
//                     dateToCheck.getDate() === todayDate &&
//                     today.getTime() > today1PM.getTime()
//                 ){
//                     console.log("No Trip For Today")
//                     res.status(200).json({
//                         status: true,
//                         data: [],
//                         page: pageNo,
//                         limit: dataLimit,
//                         totalLength:0,
//                         singleboat: true,
//                         msg: "success",
//                     });
//                     return;
//                 }
//                 houseBoatQuery.isDayCriuse = true;
//                 var houseBoats = await houseBoatModel.aggregate([
//                     {$match:houseBoatQuery},
//                     {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                     {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                     {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                     {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                     {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$tripType","DayCruise"]},
//                                     { $in: ["Sharing", "$houseBoatType"] }
//                                 ]
//                             }}
//                         }],as:"tripDetails"},
//                     },
//                     {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                     {$match:{tripDetails:{$exists:true},}},
//                     {$match:{"tripDetails.maxPersonTrips":{$gte:totalGuest}}},
//                     {$match:{"tripDetails.minPersonTrips":{$lte:totalGuest}}},
//                     {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     {
//                                         $or: [
//                                           { $eq: ["$tripType", "DayCruise"] },
//                                           { $eq: ["$tripType", "OverNight"] }
//                                         ]
//                                     },
//                                     { $eq: ["$paymentStatus", "Success"] },
//                                     {
//                                         $setIsSubset: [ "$bookedDates",includedDates]
//                                     },
//                                 ]
//                             }}
//                         }],as:"Bookings"},
//                     },
//                     {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                     {$match:{Bookings:{$exists:false},}},
//                     {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     {
//                                         $or: [
//                                           { $eq: ["$tripType", "DayCruise"] },
//                                           { $eq: ["$tripType", "OverNight"] }
//                                         ]
//                                     },
//                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                     {
//                                         $setIsSubset: [ includedDates,"$reservedDates" ]
//                                     },
//                                 ]
//                             }}
//                         }],as:"Reservations"},
//                     },
//                     {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                     {$match:{Reservations:{$exists:false},}},
//                     //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//                 ])
//                 /*
//                 ---------------------CODE EXPLANATION----------------
//                 Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
//                 $lookup Stages for Location Models: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, respectively.
//                 $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "DayCruise", and house boat type being "Sharing".
//                 $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence, maximum and minimum person trips compared to totalGuest.
//                 $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates for both "DayCruise" and "OverNight" trip types.
//                 $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
//                 $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates for both "DayCruise" and "OverNight" trip types.
//                 $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
//                 It seems like the final commented out $match stage might be intended to filter for documents where either Reservations or Bookings arrays do not exist. However, it's currently commented out and not active in the aggregation pipeline.   
//                 ---------------------------END-----------------------
//                 */
//                 //As Of Now We Did Not Need DayCruis Boat To Be Booked in Sharing Category
//                 result = [];
//             }else if(tripType == "NightStay"){
//                 var includedDates = await getDates(startDateTime,endDateTime)
//                 if(startDateTime.getTime()>endDateTime.getTime()){
//                     res.status(200).json({
//                         status:false,
//                         msg:"Invalid date selection, Please modify your search and try again."
//                     });
//                     return;
//                 }
//                 const today = new Date();
//                 const todayYear = today.getFullYear();
//                 const todayMonth = today.getMonth();
//                 const todayDate = today.getDate();
//                 const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
//                 var dateTocheck = new Date(includedDates[0])
//                 if (
//                     dateTocheck.getFullYear() === todayYear &&
//                     dateTocheck.getMonth() === todayMonth &&
//                     dateTocheck.getDate() === todayDate &&
//                     today.getTime() > today11PM.getTime()
//                 ){
//                     console.log("No Trip For Today")
//                     res.status(200).json({
//                         status: true,
//                         data: [],
//                         page: pageNo,
//                         limit: dataLimit,
//                         totalLength:0,
//                         singleboat: true,
//                         msg: "success",
//                     });
//                     return;
//                 }
//                 houseBoatQuery.isNightStay = true;
//                 houseBoatQuery.totalRooms = {$gte:numberofRooms}
//                 var houseBoats = await houseBoatModel.aggregate([
//                     {$match:houseBoatQuery},
//                     {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
//                     {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                     {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                     {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                     {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                     {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$tripType","NightStay"]},
//                                     { $in: ["Sharing", "$houseBoatType"] }
//                                 ]
//                             }}
//                         }],as:"tripDetails"},
//                     },
//                     {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                     {$match:{tripDetails:{$exists:true},}},
//                     {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                     //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                     {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$tripType", "NightStay"] },
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$houseBoatType","Private"]},
//                                     { $eq: ["$paymentStatus", "Success"] },
//                                     {
//                                         $or: [{
//                                             $and: [
//                                                 { $eq: ["$tripType", "NightStay"] },
//                                                 { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                             },
//                                             {
//                                             $and: [
//                                                 { $eq: ["$tripType", "OverNight"] },
//                                                 { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                             },
//                                         ]
//                                     }
//                                 ]
//                             }}
//                         }],as:"Bookings"},
//                     },
//                     {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                     {$match:{Bookings:{$exists:false},}},
//                     {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$tripType", "NightStay"] },
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$houseBoatType","Private"]},
//                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                     {
//                                         $or: [{
//                                             $and: [
//                                                 { $eq: ["$tripType", "NightStay"] },
//                                                 { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                             },
//                                             {
//                                             $and: [
//                                                 { $eq: ["$tripType", "OverNight"] },
//                                                 { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                             },
//                                         ]
//                                     }
//                                 ]
//                             }}
//                         }],as:"Reservations"},
//                     },
//                     {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                     {$match:{Reservations:{$exists:false},}},
//                     {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$paymentStatus", "Success"] },
//                                     { $eq: ["$tripType", "DayCruise"] },
//                                     {
//                                         $setIsSubset: [ includedDates,"$bookedDates" ]
//                                     }
//                                 ]
//                             }}
//                         }],as:"DayBookings"},
//                     },
//                     {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//                     {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                     { $eq: ["$tripType", "DayCruise"] },
//                                     {
//                                         $setIsSubset: [ includedDates,"$reservedDates" ]
//                                     },
//                                 ]
//                             }}
//                         }],as:"DayReservations"},
//                     },
//                     {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//                     {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//                     //Check for already Booking in sharing category exists
//                     {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$houseBoatType","NightStay"]},
//                                     { $eq: ["$houseBoatType","Sharing"]},
//                                     { $eq: ["$paymentStatus", "Success"] },
//                                     {
//                                         $setIsSubset: [ "$bookedDates",includedDates]
//                                     },
//                                 ]
//                             }}
//                         },{
//                             $group: {
//                                 _id: "$houseBoatId",
//                                 totalRoomsBooked: {$sum: "$totalRooms"},
//                                 totalGuestsBooked: {$sum: "$noOfAdults"},
//                                 sharedHouseboat: {$push: "$$ROOT"}
//                             }
//                         }],as:"SharedBookings"},
//                     },
//                     {
//                         $addFields: {
//                             SharedBookings: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedBookings", []]},
//                                     then: [[]],
//                                     else: "$SharedBookings"
//                                 }
//                             }
//                         }
//                     },
//                     {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
//                     {
//                         $addFields: {
//                             noOfRoomsBookedShared: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedBookings", []]},
//                                     then: 0,
//                                     else: "$SharedBookings.totalRoomsBooked"
//                                 }
//                             },
//                             noOfGuestsBookedShared: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedBookings", []]},
//                                     then: 0,
//                                     else: "$SharedBookings.totalGuestsBooked"
//                                 }
//                             }
//                         }
//                     },
//                     {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$houseBoatType","Sharing"]},
//                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                     {
//                                         $setIsSubset: [ includedDates,"$reservedDates" ]
//                                     },
//                                 ]
//                             }}
//                         },{
//                             $group: {
//                                 _id: "$houseBoatId",
//                                 totalRoomsBooked: {$sum: "$totalRooms"},
//                                 totalGuestsBooked: {$sum: "$totalGuests"},
//                                 sharedHouseboat: {$push: "$$ROOT"}
//                             }
//                         }],as:"SharedReservations"},
//                     },
//                     {
//                         $addFields: {
//                             SharedReservations: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedReservations", []]},
//                                     then: [[]],
//                                     else: "$SharedReservations"
//                                 }
//                             }
//                         }
//                     },
//                     {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
//                     {
//                         $addFields: {
//                             noOfRoomsBookedReserved: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedReservations", []]},
//                                     then: 0,
//                                     else: "$SharedReservations.totalRoomsBooked"
//                                 }
//                             },
//                             noOfGuestsBookedReserved: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedReservations", []]},
//                                     then: 0,
//                                     else: "$SharedReservations.totalGuestsBooked"
//                                 }
//                             }
//                         }
//                     },
//                     {
//                         $addFields: {
//                             noOfRoomsBooked: {
//                                 $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
//                             },
//                             noOfGuestsBooked: {
//                                 $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
//                             }
//                         }
//                     },
//                     {
//                         $addFields: {
//                             totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
//                             totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
//                         }
//                     },
//                     {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
//                     {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

//                 ])
//                 /*
//                 ---------------------CODE EXPLANATION----------------
//                 Initial Match and Add Fields: Filtering documents based on houseBoatQuery and adding new fields noOfGuestsBooked and noOfRoomsBooked with default values of 0.
//                 Lookup Stages for Location Details: Fetching related location details from sublocationmodels and locationmodels.
//                 Trip Details Lookup and Matching: Fetching specific trip details for "NightStay" and "Sharing" types. Filtering for active status and existence of trip details. Also filtering based on maximum capacity of boats.
//                 Bookings Lookup and Matching: Checking for active bookings considering criteria like successful payment status, type of house boat being "Private", and date range compatibility for both "NightStay" and "OverNight" types.
//                 Reservations Lookup and Matching: Similar to bookings but for reservations, checking for active reserved status based on similar criteria for both "NightStay" and "OverNight" types.
//                 Lookup and Grouping for Shared Bookings: Checking for active shared houseboat bookings. Grouping by houseBoatId, calculating total rooms and guests booked, and creating an array of shared houseboat details.
//                 Unwinding and Adding Fields for Shared Bookings: Extracting fields and calculating the number of rooms and guests booked for shared houseboats.
//                 Lookup and Grouping for Shared Reservations: Similar to shared bookings but for reservations of shared houseboats.
//                 Unwinding and Adding Fields for Shared Reservations: Extracting fields and calculating the number of rooms and guests reserved for shared houseboats.
//                 Final Calculations and Matching: Calculating the available rooms and guests considering the booked/shared rooms and guests, and then matching for the required number of rooms and guests.
//                 The entire pipeline aims to find available houseboats for a given number of guests and rooms, considering bookings, reservations, and shared bookings/reservations. It filters available houseboats based on the required capacity and availability for the specified date range.
//                 ---------------------------END-----------------------
//                 */
//                 houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                 for(var i=0;i<houseBoats.length;i++){
//                     var getRate = await RateController.CalculateNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
//                     if(getRate.status == true){
//                         houseBoats[i].customerRate = getRate.rate;
//                         result.push(houseBoats[i])
//                     }
//                 }
//             }else{
//                 var includedDates = await getDates(startDateTime,endDateTime)
//                 if(startDateTime.getTime()>endDateTime.getTime()){
//                     res.status(200).json({
//                         status:false,
//                         msg:"Invalid date selection, Please modify your search and try again."
//                     });
//                     return;
//                 }
//                 const today = new Date();
//                 const todayYear = today.getFullYear();
//                 const todayMonth = today.getMonth();
//                 const todayDate = today.getDate();
//                 const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
//                 var dateTocheck = new Date(includedDates[0])
//                 if (
//                     dateTocheck.getFullYear() === todayYear &&
//                     dateTocheck.getMonth() === todayMonth &&
//                     dateTocheck.getDate() === todayDate &&
//                     today.getTime() > today2PM.getTime()
//                 ){
//                     console.log("No Trip For Today")
//                     res.status(200).json({
//                         status: true,
//                         data: [],
//                         page: pageNo,
//                         limit: dataLimit,
//                         totalLength:0,
//                         singleboat: true,
//                         msg: "success",
//                     });
//                     return;
//                 }
//                 houseBoatQuery.isOverNight = true;
//                 houseBoatQuery.totalRooms = {$gte:numberofRooms}
//                 var houseBoats = await houseBoatModel.aggregate([
//                     {$match:houseBoatQuery},
//                     {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
//                     {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                     {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                     {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                     {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                     {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$tripType","OverNight"]},
//                                     { $in: ["Sharing", "$houseBoatType"] }
                                    
//                                 ]
//                             }}
//                         }],as:"tripDetails"},
//                     },
//                     {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                     {$match:{tripDetails:{$exists:true},}},
//                     {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                     //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                     {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["houseBoatType","Private"]},
//                                     { $eq: ["$paymentStatus", "Success"] },
//                                     {
//                                         $setIsSubset: [ "$bookedDates",includedDates]
//                                     },
//                                 ]
//                             }}
//                         }],as:"Bookings"},
//                     },
//                     {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                     {$match:{Bookings:{$exists:false},}},
//                     {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["houseBoatType","Private"]},
//                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                     {
//                                         $setIsSubset: [ includedDates,"$reservedDates" ]
//                                     },
//                                 ]
//                             }}
//                         }],as:"Reservations"},
//                     },
//                     {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                     {$match:{Reservations:{$exists:false},}},
//                     //Check for already Booking in sharing category exist
//                     {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$houseBoatType","Sharing"]},
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$paymentStatus", "Success"] },
//                                     {
//                                         $setIsSubset: [ "$bookedDates",includedDates]
//                                     },
//                                 ]
//                             }}
//                         },{
//                             $group: {
//                                 _id: "$houseBoatId",
//                                 totalRoomsBooked: {$sum: "$totalRooms"},
//                                 totalGuestsBooked: {$sum: "$noOfAdults"},
//                                 sharedHouseboat: {$push: "$$ROOT"}
//                             }
//                         }],as:"SharedBookings"},
//                     },
//                     {
//                         $addFields: {
//                             SharedBookings: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedBookings", []]},
//                                     then: [[]],
//                                     else: "$SharedBookings"
//                                 }
//                             }
//                         }
//                     },
//                     {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
//                     {
//                         $addFields: {
//                             noOfRoomsBookedShared: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedBookings", []]},
//                                     then: 0,
//                                     else: "$SharedBookings.totalRoomsBooked"
//                                 }
//                             },
//                             noOfGuestsBookedShared: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedBookings", []]},
//                                     then: 0,
//                                     else: "$SharedBookings.totalGuestsBooked"
//                                 }
//                             }
//                         }
//                     },
//                     {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                         pipeline: [{
//                             $match: {$expr: { 
//                                 $and: [
//                                     { $eq: ["$status", "Active"] },
//                                     { $eq: ["$houseBoatType","Sharing"]},
//                                     { $eq: ["$reservationStatus", "Reserved"] },
//                                     {
//                                         $setIsSubset: [ includedDates,"$reservedDates" ]
//                                     },
//                                 ]
//                             }}
//                         },{
//                             $group: {
//                                 _id: "$houseBoatId",
//                                 totalRoomsBooked: {$sum: "$totalRooms"},
//                                 totalGuestsBooked: {$sum: "$totalGuests"},
//                                 sharedHouseboat: {$push: "$$ROOT"}
//                             }
//                         }],as:"SharedReservations"},
//                     },
//                     {
//                         $addFields: {
//                             SharedReservations: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedReservations", []]},
//                                     then: [[]],
//                                     else: "$SharedReservations"
//                                 }
//                             }
//                         }
//                     },
//                     {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
//                     {
//                         $addFields: {
//                             noOfRoomsBookedReserved: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedReservations", []]},
//                                     then: 0,
//                                     else: "$SharedReservations.totalRoomsBooked"
//                                 }
//                             },
//                             noOfGuestsBookedReserved: {
//                                 $cond: {
//                                     if: {$eq: ["$SharedReservations", []]},
//                                     then: 0,
//                                     else: "$SharedReservations.totalGuestsBooked"
//                                 }
//                             }
//                         }
//                     },
//                     {
//                         $addFields: {
//                             noOfRoomsBooked: {
//                                 $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
//                             },
//                             noOfGuestsBooked: {
//                                 $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
//                             }
//                         }
//                     },
//                     {
//                         $addFields: {
//                             totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
//                             totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
//                         }
//                     },
//                     // {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
//                     // {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

//                 ])
//                 /*
//                 ---------------------CODE EXPLANATION----------------
//                 Initial Match & Field Addition:Filters houseboats based on the provided query and adds two initial fields for guest and room counts.
//                 Lookup & Unwinding:Looks up and unwinds sublocationmodels and locationmodels to get the starting location and location details.
//                 Trip Type Filtering:Matches triptypemodels where the status is Active, tripType is OverNight, and houseBoatType includes Sharing.
//                 Filters the documents based on maxCapacityOfBoats to accommodate the total number of guests.
//                 Private Bookings Check:Looks for successful Private houseboat bookings that match the provided bookedDates.
//                 Private Reservations Check:Searches for Private houseboat reservations that match the provided reservedDates.
//                 Shared Bookings Lookup:Looks for successful Sharing houseboat bookings that match the provided bookedDates.
//                 Groups and sums the booked rooms and guests for each houseboat ID.
//                 Conditional Field Addition for Shared Bookings:Uses $cond to conditionally assign values or an empty array based on whether SharedBookings exists.
//                 Shared Reservations Lookup:Searches for Sharing houseboat reservations that match the provided reservedDates.
//                 Groups and sums the reserved rooms and guests for each houseboat ID.
//                 Conditional Field Addition for Shared Reservations:Similar to Shared Bookings, uses $cond to conditionally assign values or an empty array based on whether SharedReservations exists.
//                 Calculation of Booked Rooms and Guests:Adds up the booked rooms and guests from Shared Bookings and Reservations.
//                 Available Rooms and Guest Capacity Calculation:Calculates the available rooms and guests by subtracting booked rooms and guests from the total rooms and maximum guest capacity respectively.
//                 Final Matching:Filters the houseboats based on the available rooms and guest capacity to ensure it meets the required criteria (numberofRooms and totalGuest).
//                 This aggregation pipeline checks both private and shared bookings and reservations for available houseboats, considering different criteria, and calculates available rooms and guest capacities for each.
//                 ---------------------------END-----------------------
//                 */
//                 houseBoats = JSON.parse(JSON.stringify(houseBoats))
//                 for(var i=0;i<houseBoats.length;i++){
//                     //Commented the below due to no need to check minimum capacity of boat for first booking
//                     // if((houseBoats[i].SharedReservations.length<=0)&&(houseBoats[i].SharedBookings.length<=0)){
//                     //     if(houseBoats[i].tripDetails.minCapacityOfBoats>totalGuest){
//                     //         continue;
//                     //     }
//                     // }
//                     var getRate = await RateController.CalculateOverNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
//                     if(getRate.status == true){
//                         houseBoats[i].customerRate = getRate.rate;
//                         result.push(houseBoats[i])
//                     }
//                 }
//             }
//         }
//         res.status(200).json({
//             status: true,
//             data: result,
//             page: pageNo,
//             limit: dataLimit,
//             totalLength:result.length,
//             singleboat: true,
//             msg: "success",
//         });
//         return;
//     } catch (e) {
//         console.log(e);
//         res.status(500).json({
//             status: false,
//             msg: "Something went wrong",
//             e,
//         });
//     }
// })

//CUSTOMER HB FILTER-SEARCH
router.post('/houseboat/booking/filter/renu',async(req,res)=>{
    try{
        var {page,limit,category,houseBoatType,location,tripType,numberofRooms,checkInDate,checkOutDate,children,adult} = req.body;
        var pageNo = 1,dataLimit = 20;
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
        if (Misc.isnullorempty(category)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide Category",
            });
            return;
        }
        if (Misc.isnullorempty(houseBoatType)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide HouseBoat Type",
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
        if (Misc.isnullorempty(tripType)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide Trip Type",
            });
            return;
        }
        if (Misc.isnullorempty(numberofRooms)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide NumberofRooms",
            });
            return;
        }
        if (typeof numberofRooms != 'number'){
            numberofRooms=parseInt(numberofRooms)
        }
        if(numberofRooms<=0){
            res.status(200).json({
                status:false,
                msg:"Number of rooms should be greater than zero."
            });
            return;
        }
        if(numberofRooms>=50){
            res.status(200).json({
                status:false,
                msg:"Please select a valid number of rooms."
            });
            return;
        }
        if (Misc.isnullorempty(checkInDate)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide checkIn Date",
            });
            return;
        }
        if (Misc.isnullorempty(checkOutDate)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide checkOut Date",
            });
            return;
        }
        if (Misc.isnullorempty(adult)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide Adult",
            });
            return;
        }
        if(typeof adult != 'number'){
            adult = parseInt(adult);
        }
        if(adult<=0){
            res.status(200).json({
                status:false,
                msg:"Please select atleast one adult guest."
            });
            return;
        }
        if(Misc.isnullorempty(children)){
            children = 0
        }else{
            children = parseInt(children)
        }
        if(children<0){
            res.status(200).json({
                status:false,
                msg:"Number of child should be a postive number."
            });
            return;
        }
        var totalGuest = adult;//Consider only the adults as valid guests
        
        var startDateTime = new Date(checkInDate);
        var endDateTime = new Date(checkOutDate);
        var includedDates = await getDates(startDateTime,endDateTime)//It will Return all program included dates
       
        var result = []
        var houseBoatQuery = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category, };//House boat query setting
        if (houseBoatType === "Private") {
            //All Three Category DayCruis NightStay and OverNight 
            if(tripType == "DayCruise"){
                //Query For Day Cruis 
                houseBoatQuery.totalRooms = {$gte:numberofRooms}//Condetions for total Rooms available
                var includedDates = await getDatesFiltered(startDateTime,endDateTime)//Function returns the dates of booking it ignores the checkout date
                const today = new Date();
                // const eightDaysAhead = new Date(today);
                // eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
                // if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                //     console.log("In 8 Days")//If out side 8 days error shoud be generated
                //     res.status(200).json({
                //         status: true,
                //         data: [],
                //         page: pageNo,
                //         limit: dataLimit,
                //         totalLength:0,
                //         singleboat: true,
                //         msg: "success",
                //     });
                //     return;
                // }
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today1PM = new Date(todayYear, todayMonth, todayDate, 13, 0, 0);
                var dateToCheck = new Date(includedDates[0]);
                //In day cruis if we are searching for today as start date we should check if it the current time is grater than 1PM error should be generated
                if (
                    dateToCheck.getFullYear() === todayYear &&
                    dateToCheck.getMonth() === todayMonth &&
                    dateToCheck.getDate() === todayDate &&
                    today.getTime() > today1PM.getTime()
                ){
                    console.log("No Trip For Today")
                    //Today trip start time is over ,Trip is already started
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isDayCriuse = true;
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","DayCruise"]},
                                    { $in: ["Private", "$houseBoatType"] }
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxPersonTrips":{$gte:totalGuest}}},
                    {$match:{"tripDetails.minPersonTrips":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    {
                                        $or: [
                                          { $eq: ["$tripType", "DayCruise"] },
                                          { $eq: ["$tripType", "OverNight"] }
                                        ]
                                    },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    {
                                        $or: [
                                          { $eq: ["$tripType", "DayCruise"] },
                                          { $eq: ["$tripType", "OverNight"] }
                                        ]
                                    },
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ "$reservedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                    //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
                ])
                /*
                ---------------------CODE EXPLANATION----------------
                houseBoatModel.aggregate([...]): This initiates the aggregation pipeline on the houseBoatModel collection.
                {$match: houseBoatQuery}: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                $lookup stages: These stages perform a left outer join to fetch related data from other collections (sublocationmodels, locationmodels, triptypemodels) based on specified fields (startingLocation, location, _id).
                $unwind stages: These stages deconstruct arrays generated by the $lookup stages, ensuring each document has a single value or null for those fields.
                $lookup and subsequent stages for tripDetails: These stages perform a nested lookup to retrieve specific trip details from the triptypemodels collection based on various criteria such as active status, trip type, and house boat type.
                $match stages related to tripDetails: These stages filter the documents based on the existence of tripDetails, maximum and minimum person trips compared to totalGuest.
                $lookup, $unwind, and $match stages for Bookings and Reservations: These stages check for active bookings and reservations for the house boats, considering specific criteria like active status, trip types (day cruise or overnight), successful payment status, and the presence of included dates within booked or reserved dates.
                This pipeline essentially combines multiple stages to filter and match documents based on various conditions and relationships with related collections, ultimately aiming to retrieve houseBoatModel documents that meet the specified criteria for availability and booking status.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    //Calcuation for rate a function is called.
                    var getRate = await RateController.CalculateDayCruisRate(houseBoats[i],includedDates,totalGuest)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }else if(tripType == "NightStay"){
                var includedDates = await getDates(startDateTime,endDateTime)
                if(startDateTime.getTime()>endDateTime.getTime()){
                    res.status(200).json({
                        status:false,
                        msg:"Invalid date selection, Please modify your search and try again."
                    });
                    return;
                }
                const today = new Date();
                const eightDaysAhead = new Date(today);
                eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
                if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                    console.log("In 8 Days")//If out side 8 days error shoud be generated
                    res.status(200).json({
                        status: false,
                        msg: "Please refresh your page..........",
                    });
                    return;
                }
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
                var dateTocheck = new Date(includedDates[0])
                if (
                    dateTocheck.getFullYear() === todayYear &&
                    dateTocheck.getMonth() === todayMonth &&
                    dateTocheck.getDate() === todayDate &&
                    today.getTime() > today11PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isNightStay = true;
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var houseBoats = await houseBoatModel.aggregate([
                    { $match: houseBoatQuery },
                    { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                    { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                    { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                    { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                    {
                        $lookup: {
                            from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $in: ["Private", "$houseBoatType"] }
                                        ]
                                    }
                                }
                            }], as: "tripDetails"
                        },
                    },
                    { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                    { $match: { tripDetails: { $exists: true }, } },
                    { $match: { "tripDetails.maxCapacityOfBoats": { $gte: totalGuest } } },
                    { $match: { "tripDetails.minCapacityOfBoats": { $lte: totalGuest } } },
                    {
                        $lookup: {
                            from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$endDate", startDateTime] }] }]
                                                },
                                                {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$endDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
                                                },
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }], as: "Bookings"
                        },
                    },
                    { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                    { $match: { Bookings: { $exists: false }, } },
                    {
                        $lookup: {
                            from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$checkOutDate", startDateTime] }] }]
                                                },
                                                {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
                                                },
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }], as: "Reservations"
                        },
                    },
                    { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                    { $match: { Reservations: { $exists: false }, } },
                    {
                        $lookup: {
                            from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            { $eq: ["$tripType", "DayCruise"] },
                                            {
                                                $setIsSubset: [ includedDates,"$bookedDates" ]
                                            }
                                        ]
                                    }
                                }
                            }], as: "DayBookings"
                        },
                    },
                    { $unwind: { "path": "$DayBookings", preserveNullAndEmptyArrays: true } },
                    {
                        $lookup: {
                            from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            { $eq: ["$tripType", "DayCruise"] },
                                            {
                                                $setIsSubset: [ includedDates,"$reservedDates" ]
                                            },
                                        ]
                                    }
                                }
                            }], as: "DayReservations"
                        },
                    },
                    { $unwind: { "path": "$DayReservations", preserveNullAndEmptyArrays: true } },
                    { $match: { $or: [{ DayBookings: { $exists: true } }, { DayReservations: { $exists: true } }] } }
                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                $lookup and $unwind stages: These stages fetch related data from other collections (sublocationmodels and locationmodels) and unwind arrays generated by the lookup, similar to the previous code.
                $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "NightStay", and house boat type being "Private".
                $match stages related to tripDetails: Filters documents based on the existence of tripDetails, maximum and minimum capacity of boats compared to totalGuest.
                $lookup and $unwind stages for Bookings and Reservations: These stages check for active bookings and reservations considering various criteria such as active status, trip types (night stay or overnight), successful payment status, and date ranges for booking and reservation overlaps.
                Additional $lookup, $unwind, and $match stages for DayBookings and DayReservations: These stages focus specifically on day cruise bookings and reservations, checking for active bookings/reservations, successful payment status, and date overlaps with included dates.
                Final $match stage with $or condition: This line combines day cruise bookings and reservations to check for documents where either DayBookings or DayReservations exist, aiming to find availability for day cruises.
                Overall, this pipeline aims to filter and match documents in the houseBoatModel collection based on various conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, focusing on both night stay and day cruise scenarios.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    if((Misc.isnullorempty(houseBoats[i].DayBookings))&&(Misc.isnullorempty(houseBoats[i].DayReservations))){
                        continue;
                    }
                    var getRate = await RateController.CalculateNightStayRate(houseBoats[i],includedDates,totalGuest)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }else{
                var includedDates = await getDates(startDateTime,endDateTime)
                if(startDateTime.getTime()>endDateTime.getTime()){
                    res.status(200).json({
                        status:false,
                        msg:"Invalid date selection, Please modify your search and try again."
                    });
                    return;
                }
                const today = new Date();
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
                var dateTocheck = new Date(includedDates[0])
                if (
                    dateTocheck.getFullYear() === todayYear &&
                    dateTocheck.getMonth() === todayMonth &&
                    dateTocheck.getDate() === todayDate &&
                    today.getTime() > today2PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isOverNight = true;
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","OverNight"]},
                                    { $in: ["Private", "$houseBoatType"] }
                                    
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                    {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                $lookup and $unwind stages for locations: These stages fetch details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields and unwind arrays created by the lookup, similar to the previous examples.
                $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "OverNight", and house boat type being "Private".
                $match stages related to tripDetails: Filters documents based on the existence of tripDetails, maximum and minimum capacity of boats compared to totalGuest.
                $lookup and subsequent stages for Bookings: These stages check for active bookings considering specific criteria such as active status, successful payment status, and the presence of included dates within booked dates.
                $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where Bookings array doesn't exist.
                $lookup and subsequent stages for Reservations: These stages check for active reservations considering criteria like active status, reservation status being "Reserved", and included dates within reserved dates.
                $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where Reservations array doesn't exist.
                This aggregation pipeline essentially aims to filter documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings, successful payments, and date overlaps, focusing specifically on "OverNight" trips. The final result should be a set of documents that meet these criteria and are available for bookings.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    var getRate = await RateController.CalculateOverNightStayRate(houseBoats[i],includedDates,totalGuest)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }
            if (result.length <= 0) {
                var houseBoatQueryMultiple = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category, };
                if (houseBoatType === "Private") {
                    if (tripType == "DayCruise") {
                        //houseBoatQuery.totalRooms = { $gte: numberofRooms }
                        var includedDates = await getDatesFiltered(startDateTime, endDateTime)
                        const today = new Date();
                    //     const eightDaysAhead = new Date(today);
                    //     eightDaysAhead.setDate(today.getDate() + 8);
                    //     if(includedDates[0]>eightDaysAhead){
                    //         console.log("In 8 Days")
                    //         res.status(200).json({
                    //         status: true,
                    //         data: [],
                    //         page: pageNo,
                    //         limit: dataLimit,
                    //         totalLength:0,
                    //         singleboat: true,
                    //         msg: "success",
                    //     });
                    //     return;
                    // }
                    const todayYear = today.getFullYear();
                    const todayMonth = today.getMonth();
                    const todayDate = today.getDate();
                    const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
                    var dateToCheck = new Date(includedDates[0]);
                    if (dateToCheck.getFullYear() === todayYear &&dateToCheck.getMonth() === todayMonth &&dateToCheck.getDate() === todayDate &&today.getTime() > today1PM.getTime()){
                        console.log("No Trip For Today")
                        res.status(200).json({
                            status: true,
                            data: [],
                            page: pageNo,
                            limit: dataLimit,
                            totalLength:0,
                            singleboat: true,
                            msg: "success",
                        });
                        return;
                    }
                    houseBoatQueryMultiple.isDayCriuse = true;
                        var vendorGroup = await houseBoatModel.aggregate([
                            { $match: houseBoatQueryMultiple },
                            { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                            { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                            { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                            { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                            {
                                $lookup: {
                                    from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                                    pipeline: [{
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$status", "Active"] },
                                                    { $eq: ["$tripType", "DayCruise"] },
                                                    { $in: ["Private", "$houseBoatType"] }
                                                ]
                                            }
                                        }
                                    }], as: "tripDetails"
                                },
                            },
                            { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                            { $match: { tripDetails: { $exists: true }, } },
                            { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
                            // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
                            { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
                            {
                                $lookup: {
                                    from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                                    pipeline: [{
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$status", "Active"] },
                                                    {
                                                        $or: [
                                                            { $eq: ["$tripType", "DayCruise"] },
                                                            { $eq: ["$tripType", "OverNight"] }
                                                        ]
                                                    },
                                                    { $eq: ["$paymentStatus", "Success"] },
                                                    {
                                                        $setIsSubset: ["$bookedDates", includedDates]
                                                    },
                                                ]
                                            }
                                        }
                                    }], as: "Bookings"
                                },
                            },
                            { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                            { $match: { Bookings: { $exists: false }, } },
                            {
                                $lookup: {
                                    from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                                    pipeline: [{
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$status", "Active"] },
                                                    {
                                                        $or: [
                                                            { $eq: ["$tripType", "DayCruise"] },
                                                            { $eq: ["$tripType", "OverNight"] }
                                                        ]
                                                    },
                                                    { $eq: ["$reservationStatus", "Reserved"] },
                                                    {
                                                        $setIsSubset: [ "$reservedDates",includedDates]
                                                    },
                                                ]
                                            }
                                        }
                                    }], as: "Reservations"
                                },
                            },
                            { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                            { $match: { Reservations: { $exists: false }, } },
                            { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                            { $match:{ totalboats:{$gt:1}}}
                            //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
                        ])
                        var locationGroup = await houseBoatModel.aggregate([
                            { $match: houseBoatQueryMultiple },
                            { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                            { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                            { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                            { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                            {
                                $lookup: {
                                    from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                                    pipeline: [{
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$status", "Active"] },
                                                    { $eq: ["$tripType", "DayCruise"] },
                                                    { $in: ["Private", "$houseBoatType"] }
                                                ]
                                            }
                                        }
                                    }], as: "tripDetails"
                                },
                            },
                            { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                            { $match: { tripDetails: { $exists: true }, } },
                            { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
                            // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
                            { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
                            {
                                $lookup: {
                                    from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                                    pipeline: [{
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$status", "Active"] },
                                                    {
                                                        $or: [
                                                            { $eq: ["$tripType", "DayCruise"] },
                                                            { $eq: ["$tripType", "OverNight"] }
                                                        ]
                                                    },
                                                    { $eq: ["$paymentStatus", "Success"] },
                                                    {
                                                        $setIsSubset: ["$bookedDates", includedDates]
                                                    },
                                                ]
                                            }
                                        }
                                    }], as: "Bookings"
                                },
                            },
                            { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                            { $match: { Bookings: { $exists: false }, } },
                            {
                                $lookup: {
                                    from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                                    pipeline: [{
                                        $match: {
                                            $expr: {
                                                $and: [
                                                    { $eq: ["$status", "Active"] },
                                                    {
                                                        $or: [
                                                            { $eq: ["$tripType", "DayCruise"] },
                                                            { $eq: ["$tripType", "OverNight"] }
                                                        ]
                                                    },
                                                    { $eq: ["$reservationStatus", "Reserved"] },
                                                    {
                                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                                    },
                                                ]
                                            }
                                        }
                                    }], as: "Reservations"
                                },
                            },
                            { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                            { $match: { Reservations: { $exists: false }, } },
                            { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                            { $match:{ totalboats:{$gt:1}}}
                            //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
                        ])
                        var houseBoats = vendorGroup.concat(locationGroup)
                        /*
                        ---------------------CODE EXPLANATION----------------
                        Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
                        $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, unwinding arrays generated by the lookup, similar to previous examples.
                        $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "DayCruise", and house boat type being "Private".
                        $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence.
                        Commented-out $match stage: Seems to have been commented out but might have been intended to filter based on the maximum number of person trips.
                        $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria like active status, successful payment status, trip types (day cruise or overnight), and the presence of included dates within booked dates.
                        $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where Bookings array doesn't exist.
                        $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria like active status, reservation status being "Reserved", trip types (day cruise or overnight), and the presence of included dates within reserved dates.
                        $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where Reservations array doesn't exist.
                        Commented-out $match stage: A potential final match condition utilizing $or logic to find documents where either reservations or bookings don't exist.
                        ---------------------------END-----------------------
                        */
                        houseBoats = JSON.parse(JSON.stringify(houseBoats))
                        var houseBoat = [];
                        for(var n=0;n<houseBoats.length;n++){
                            var result = [];
                            for (var k = 0; k < houseBoats[n].details.length; k++) {
                                var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
                                if (getRate.status == true) {
                                    houseBoats[n].details[k].customerRate = getRate.rate;
                                    result.push(houseBoats[n].details[k])
                                }
                            }
                            houseBoat.push({ _id: houseBoats[n]._id, boats: result,totalboats:houseBoats[n].totalboats });
                        }
                        var finalResult = [];
                        for(var h =0;h<houseBoat.length;h++){
                            var newResult = getCombinationsOnDay(houseBoat[h].boats, adult);
                            for(var i=0;i<newResult.length;i++){
                                var data = {}
                                var totalAmount = 0
                                var id = [];
                                var totalGuestCanBeAccomadated = 0
                                if (newResult[i].length <= 1) {
                                    continue;
                                }
                                var totalRemiGuests = adult;
                                for (var j = 0; j < newResult[i].length; j++) {
                                    if(totalRemiGuests>=newResult[i][j].tripDetails.maxPersonTrips){
                                        var guestsForCalculations = newResult[i][j].tripDetails.maxPersonTrips;
                                        totalRemiGuests = totalRemiGuests-newResult[i][j].tripDetails.maxPersonTrips;
                                    }else{
                                        var guestsForCalculations = totalRemiGuests;
                                        totalRemiGuests = 0;
                                    }
                                    var getRate = await RateController.CalculateDayCruisRate(newResult[i][j], includedDates,guestsForCalculations)
                                    if (getRate.status == true) {
                                        newResult[i][j].customerRate = getRate.rate;
                                        //result.push(houseBoats[n].details[k])
                                    }
                                    totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
                                    totalAmount += newResult[i][j].customerRate;
                                    id.push(newResult[i][j]._id)
                                }
                                data._id = id
                                data.totalAmount = totalAmount
                                data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated
                                data.houseBoatDetails = newResult[i]
                                finalResult.push(data)
                            }
                        }
                        function arraysEqual(arr1, arr2) {
                            return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
                        }
                        finalResult = finalResult.filter((obj, index, array) => {
                            return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
                        });
                        res.status(200).json({
                            status: true,
                            data: finalResult,
                            page: pageNo,
                            limit: dataLimit,
                            totalLength: finalResult.length,
                            singleboat: false,
                            msg: "success",
                        });
                        return; 
                    }
                    else if(tripType == "NightStay"){
                        var includedDates = await getDates(startDateTime,endDateTime)
                        if(startDateTime.getTime()>endDateTime.getTime()){
                            res.status(200).json({
                                status:false,
                                msg:"Invalid date selection, Please modify your search and try again."
                            });
                            return;
                        }
                        const today = new Date();
                        const eightDaysAhead = new Date(today);
                        eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
                        if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                            console.log("In 8 Days")//If out side 8 days error shoud be generated
                            res.status(200).json({
                                status: false,
                                msg: "Please refresh your page..........",
                            });
                            return;
                        }
                        const todayYear = today.getFullYear();
                        const todayMonth = today.getMonth();
                        const todayDate = today.getDate();
                        const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
                        var dateTocheck = new Date(includedDates[0])
                        if (
                            dateTocheck.getFullYear() === todayYear &&
                            dateTocheck.getMonth() === todayMonth &&
                            dateTocheck.getDate() === todayDate &&
                            today.getTime() > today11PM.getTime()
                        ){
                            console.log("No Trip For Today")
                            res.status(200).json({
                                status: true,
                                data: [],
                                page: pageNo,
                                limit: dataLimit,
                                totalLength:0,
                                singleboat: true,
                                msg: "success",
                            });
                            return;
                        }
                        houseBoatQuery.isNightStay = true;
                        //houseBoatQuery.totalRooms = {$gte:numberofRooms}
                        var vendorGroup = await houseBoatModel.aggregate([
                            {$match:houseBoatQuery},
                            {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                            {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                            {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType","NightStay"]},
                                            { $in: ["Private", "$houseBoatType"] }
                                        ]
                                    }}
                                }],as:"tripDetails"},
                            },
                            {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                            {$match:{tripDetails:{$exists:true},}},
                            //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                            {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                                    },
                                                    {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                                    },
                                                ]
                                            }
                                        ]
                                    }}
                                }],as:"Bookings"},
                            },
                            {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                            {$match:{Bookings:{$exists:false},}},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                                    },
                                                    {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                                    },
                                                ]
                                            }
                                        ]
                                    }}
                                }],as:"Reservations"},
                            },
                            {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                            {$match:{Reservations:{$exists:false},}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            { $eq: ["$tripType", "DayCruise"] },
                                            {
                                                $setIsSubset: [ includedDates,"$bookedDates" ]
                                            }
                                        ]
                                    }}
                                }],as:"DayBookings"},
                            },
                            {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                            pipeline: [{
                                $match: {$expr: { 
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        { $eq: ["$reservationStatus", "Reserved"] },
                                        { $eq: ["$tripType", "DayCruise"] },
                                        {
                                            $setIsSubset: [ includedDates,"$reservedDates" ]
                                        },
                                    ]
                                }}
                            }],as:"DayReservations"},
                        },
                        {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
                        {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
                        {$group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                        {$match:{ totalboats:{$gt:1}}}
                        ])
                        var locationGroup = await houseBoatModel.aggregate([
                            {$match:houseBoatQuery},
                            {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                            {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                            {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType","NightStay"]},
                                            { $in: ["Private", "$houseBoatType"] }
                                        ]
                                    }}
                                }],as:"tripDetails"},
                            },
                            {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                            {$match:{tripDetails:{$exists:true},}},
                            //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                            {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                                    },
                                                    {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                                    },
                                                ]
                                            }
                                        ]
                                    }}
                                }],as:"Bookings"},
                            },
                            {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                            {$match:{Bookings:{$exists:false},}},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                                    },
                                                    {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                                    },
                                                ]
                                            }
                                        ]
                                    }}
                                }],as:"Reservations"},
                            },
                            {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                            {$match:{Reservations:{$exists:false},}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            { $eq: ["$tripType", "DayCruise"] },
                                            {
                                                $setIsSubset: [ includedDates,"$bookedDates"]
                                            }
                                        ]
                                    }}
                                }],as:"DayBookings"},
                            },
                            {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                            pipeline: [{
                                $match: {$expr: { 
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        { $eq: ["$reservationStatus", "Reserved"] },
                                        { $eq: ["$tripType", "DayCruise"] },
                                        {
                                            $setIsSubset: [ includedDates,"$reservedDates" ]
                                        },
                                    ]
                                }}
                            }],as:"DayReservations"},
                        },
                        {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
                        {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
                        {$group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                        {$match:{ totalboats:{$gt:1}}}
                        ])
                        var houseBoats = vendorGroup.concat(locationGroup)
                        /*
                        ---------------------CODE EXPLANATION----------------
                        Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                        $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, unwinding arrays generated by the lookup, which was described previously.
                        $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "NightStay", and house boat type being "Private".
                        $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
                        $lookup and subsequent stages for Bookings: Checks for active night stay bookings considering criteria such as active status, successful payment status, trip types (night stay or overnight), and the presence of included dates within booked dates.
                        $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
                        $lookup and subsequent stages for Reservations: Checks for active night stay reservations considering criteria such as active status, reservation status being "Reserved", trip types (night stay or overnight), and the presence of included dates within reserved dates.
                        $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
                        Additional $lookup, $unwind, and $match stages for DayBookings and DayReservations: These stages specifically focus on day cruise bookings and reservations, using similar criteria and matching conditions to find availability for day cruises.
                        Final $match stage with $or condition: This line combines day cruise bookings and reservations to find documents where either DayBookings or DayReservations exist, indicating availability for day cruises.
                        This aggregation pipeline aims to filter documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, focusing on both night stays and day cruises with specific criteria for availability.
                        ---------------------------END-----------------------
                        */
                        var finalResult = [];
                        houseBoats = JSON.parse(JSON.stringify(houseBoats))
                        for(var h=0;h<houseBoats.length;h++){
                            for(var g=0;g<houseBoats[h].details.length;g++){
                                var numberOfRooms = houseBoats[h].details[g].totalRooms;
                                var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                                var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                                houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                                houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                            }
                        }
                        for(var p=0;p<houseBoats.length;p++){
                            var result = [];
                            var totalGuestCanBeAccomadated = 0
                            var totalExtraGuestCanBeaccomadated = 0
                            var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
                            var hbs = getMostSutableValue;
                            const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                            for(var k =0;k<hbs.length;k++){
                                totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
                                totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                                var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                                hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                                hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                                var getRate = await RateController.CalculateNightStayRateCombination(hbs[k],includedDates,totalguests)
                                if(getRate.status == true){
                                    hbs[k].customerRate = getRate.rate;
                                    hbs[k].extraPersonRate = getRate.extraPersonRate
                                    result.push(hbs[k])
                                }
                            }
                            var data = {}
                            var totalAmount = 0
                            var id = [];
                            for(var t=0;t<result.length;t++){
                                totalAmount  += result[t].customerRate;
                                id.push(result[t]._id)
                            }
                            data._id = id
                            data.totalAmount = totalAmount
                            data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                            data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                            data.houseBoatDetails = result
                            if(sumOfTotals>=numberofRooms){
                                if(totalGuestCanBeAccomadated>=adult){
                                    finalResult.push(data)
                                }else{
                                    //Calculations For additional Guests
                                    var istrue = false
                                     var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
                                    if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
                                        console.log("Cant Accomadate these many extra guests")
                                    }else{
                                        var reminingAdditionalGuests = additionalGuestAvailable
                                        var additionalAmount = 0;
                                        for(var d=0;d<data.houseBoatDetails.length;d++){
                                            if(reminingAdditionalGuests>0){
                                                if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                                    additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                                    reminingAdditionalGuests = 0;
                                                }else{
                                                    additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                                    reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                                }
                                            }else{
                                                istrue = true
                                                break;
                                            }
                                        }
                                        if (!isNaN(additionalAmount)){
                                            data.additionalAmount = additionalAmount;
                                            data.totalAmount +=additionalAmount
                                        }
                                        if(istrue == true){
                                            finalResult.push(data)
                                        }
                                    }
                                }
                            }
                        }
                        function arraysEqual(arr1, arr2) {
                            return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
                        }
                        finalResult = finalResult.filter((obj, index, array) => {
                            return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
                        });
                        res.status(200).json({
                            status:true,
                            data: finalResult,
                            page: pageNo,
                            limit: dataLimit,
                            totalLength:finalResult.length,
                            singleboat: false,
                            msg: "success",
                        });
                        return;
                    }else{
                        var includedDates = await getDates(startDateTime,endDateTime)
                        if(startDateTime.getTime()>endDateTime.getTime()){
                            res.status(200).json({
                                status:false,
                                msg:"Invalid date selection, Please modify your search and try again."
                            });
                            return;
                        }
                        const today = new Date();
                        const todayYear = today.getFullYear();
                        const todayMonth = today.getMonth();
                        const todayDate = today.getDate();
                        const today2PM = new Date(todayYear, todayMonth, todayDate, 2, 0, 0);
                        var dateTocheck = new Date(includedDates[0])
                        if (
                            dateTocheck.getFullYear() === todayYear &&
                            dateTocheck.getMonth() === todayMonth &&
                            dateTocheck.getDate() === todayDate &&
                            today.getTime() > today2PM.getTime()
                        ) {
                            console.log("No Trip For Today")
                            res.status(200).json({
                                status: true,
                                data: [],
                                page: pageNo,
                                limit: dataLimit,
                                totalLength: 0,
                                singleboat: true,
                                msg: "success",
                            });
                            return;
                        }
                        houseBoatQuery.isOverNight = true;
                        //houseBoatQueryMultiple.totalRooms = {$gte:numberofRooms}
                        var vendorWise = await houseBoatModel.aggregate([
                            {$match:houseBoatQueryMultiple},
                            {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                            {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                            {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                            {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType","OverNight"]},
                                            { $in: ["Private", "$houseBoatType"] }
                                            
                                        ]
                                    }}
                                }],as:"tripDetails"},
                            },
                            {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                            {$match:{tripDetails:{$exists:true},}},
                            {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
                            // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                            {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $setIsSubset: [ "$bookedDates",includedDates]
                                            },
                                        ]
                                    }}
                                }],as:"Bookings"},
                            },
                            {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                            {$match:{Bookings:{$exists:false},}},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $setIsSubset: [ includedDates,"$reservedDates"]
                                            },
                                        ]
                                    }}
                                }],as:"Reservations"},
                            },
                            {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                            {$match:{Reservations:{$exists:false},}},
                            { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                            { $match:{ totalboats:{$gt:1}}}
                        ])
                        var locationWise = await houseBoatModel.aggregate([
                            {$match:houseBoatQueryMultiple},
                            {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                            {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                            {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                            {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType","OverNight"]},
                                            { $in: ["Private", "$houseBoatType"] }
                                            
                                        ]
                                    }}
                                }],as:"tripDetails"},
                            },
                            {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                            {$match:{tripDetails:{$exists:true},}},
                            {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
                            // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                            {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $setIsSubset: [ "$bookedDates",includedDates]
                                            },
                                        ]
                                    }}
                                }],as:"Bookings"},
                            },
                            {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                            {$match:{Bookings:{$exists:false},}},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $setIsSubset: [ includedDates,"$reservedDates" ]
                                            },
                                        ]
                                    }}
                                }],as:"Reservations"},
                            },
                            {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                            {$match:{Reservations:{$exists:false},}},
                            { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                            { $match:{ totalboats:{$gt:1}}}
                        ])
                        houseBoats = vendorWise.concat(locationWise)
                        /*
                        ---------------------CODE EXPLANATION----------------
                        Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
                        $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, similar to the previous examples.
                        $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "OverNight", and house boat type being "Private".
                        $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
                        $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates.
                        $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
                        $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates.
                        $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
                        This aggregation pipeline seems to focus on filtering documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, primarily focusing on overnight stays with specific criteria for availability.
                        ---------------------------END-----------------------
                        */
                        houseBoats = JSON.parse(JSON.stringify(houseBoats))
                        for(var h=0;h<houseBoats.length;h++){
                            for(var g=0;g<houseBoats[h].details.length;g++){
                                var numberOfRooms = houseBoats[h].details[g].totalRooms;
                                var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                                var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                                houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                                houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                            }
                        }
                        var finalResult = [];
                        
                        for(var p=0;p<houseBoats.length;p++){
                            var result = [];
                            var totalGuestCanBeAccomadated = 0
                            var totalExtraGuestCanBeaccomadated = 0
                            var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
                            var hbs = getMostSutableValue;
                            for(var k =0;k<hbs.length;k++){
                                totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
                                totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                                var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                                hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                                hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                                var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k],includedDates,totalguests)
                                if(getRate.status == true){
                                    hbs[k].customerRate = getRate.rate;
                                    hbs[k].extraPersonRate = getRate.extraPersonRate
                                    result.push(hbs[k])
                                }
                            }
                            var data = {}
                            var totalAmount = 0
                            var id = [];
                            for(var t=0;t<result.length;t++){
                                totalAmount  += result[t].customerRate;
                                id.push(result[t]._id)
                            }
                            data._id = id
                            data.totalAmount = totalAmount
                            data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                            data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                            data.houseBoatDetails = result
                            const sumOfTotals = result.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                            if(sumOfTotals>=numberofRooms){
                                if(totalGuestCanBeAccomadated>=adult){
                                    var totalRoomsFound =  data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                                    if(totalRoomsFound>=numberofRooms){
                                        finalResult.push(data)
                                    }
                                }else{
                                    //Calculations For additional Guests
                                    var istrue = false
                                     var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
                                    if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
                                        console.log("Cant Accomadate these many extra guests")
                                    }else{
                                        var reminingAdditionalGuests = additionalGuestAvailable
                                        var additionalAmount = 0;
                                        for(var d=0;d<data.houseBoatDetails.length;d++){
                                            // if(reminingAdditionalGuests>0){
                                            //     if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                            //         additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                            //         reminingAdditionalGuests = 0;
                                            //         istrue = true;
                                            //         break
                                            //     }else{
                                            //         additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                            //         reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                            //     }
                                            // }
                                            if(reminingAdditionalGuests>0){
                                                if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                                    additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                                    data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                                    var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate
                                                    if(!Misc.isnullorempty(houseBoatTotal)){
                                                        data.houseBoatDetails[d].customerRate = houseBoatTotal;
                                                    }
                                                    if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                                        data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                                    }
                                                    reminingAdditionalGuests = 0;
                                                    istrue = true;
                                                    break
                                                }else{
                                                    additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                                    data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                                    var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate;
                                                    if(!Misc.isnullorempty(houseBoatTotal)){
                                                        data.houseBoatDetails[d].customerRate = houseBoatTotal;
                                                    }
                                                    if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                                        data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                                    }
                                                    reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                                }
                                            }
                                            else{
                                                istrue = true
                                                break;
                                            }
                                        }
                                        if (!isNaN(additionalAmount)){
                                            data.additionalAmount = additionalAmount;
                                            data.totalAmount +=additionalAmount
                                        }
                                        if(istrue == true){
                                            finalResult.push(data)
                                        }
                                    }
                                }
                            }
                        }
                        function arraysEqual(arr1, arr2) {
                            return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
                        }
                        finalResult = finalResult.filter((obj, index, array) => {
                            return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
                        });
                        // for(var f=0;f<finalResult.length;f++){
                        //     v
                        // }
                        res.status(200).json({
                            status:true,
                            data: finalResult,
                            page: pageNo,
                            limit: dataLimit,
                            totalLength:finalResult.length,
                            singleboat: false,
                            msg: "success",
                        });
                        return;
                    }
                }
            } 
        }else{
            //This is for sharing Boat Booking
            if(tripType == "DayCruise"){
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var includedDates = await getDatesFiltered(startDateTime,endDateTime)
                const today = new Date();
                // const eightDaysAhead = new Date(today);
                // eightDaysAhead.setDate(today.getDate() + 8);
                // if(includedDates[0]>eightDaysAhead){
                //     console.log("In 8 Days")
                //     res.status(200).json({
                //         status: true,
                //         data: [],
                //         page: pageNo,
                //         limit: dataLimit,
                //         totalLength:0,
                //         singleboat: true,
                //         msg: "success",
                //     });
                //     return;
                // }
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
                var dateToCheck = new Date(includedDates[0])
                if (
                    dateToCheck.getFullYear() === todayYear &&
                    dateToCheck.getMonth() === todayMonth &&
                    dateToCheck.getDate() === todayDate &&
                    today.getTime() > today1PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isDayCriuse = true;
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","DayCruise"]},
                                    { $in: ["Sharing", "$houseBoatType"] }
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxPersonTrips":{$gte:totalGuest}}},
                    {$match:{"tripDetails.minPersonTrips":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    {
                                        $or: [
                                          { $eq: ["$tripType", "DayCruise"] },
                                          { $eq: ["$tripType", "OverNight"] }
                                        ]
                                    },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    {
                                        $or: [
                                          { $eq: ["$tripType", "DayCruise"] },
                                          { $eq: ["$tripType", "OverNight"] }
                                        ]
                                    },
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                    //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                $lookup Stages for Location Models: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, respectively.
                $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "DayCruise", and house boat type being "Sharing".
                $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence, maximum and minimum person trips compared to totalGuest.
                $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates for both "DayCruise" and "OverNight" trip types.
                $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
                $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates for both "DayCruise" and "OverNight" trip types.
                $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
                It seems like the final commented out $match stage might be intended to filter for documents where either Reservations or Bookings arrays do not exist. However, it's currently commented out and not active in the aggregation pipeline.   
                ---------------------------END-----------------------
                */
                //As Of Now We Did Not Need DayCruis Boat To Be Booked in Sharing Category
                result = [];
            }else if(tripType == "NightStay"){
                var includedDates = await getDates(startDateTime,endDateTime)
                if(startDateTime.getTime()>endDateTime.getTime()){
                    res.status(200).json({
                        status:false,
                        msg:"Invalid date selection, Please modify your search and try again."
                    });
                    return;
                }
                const today = new Date();
                const eightDaysAhead = new Date(today);
                eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
                if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                    console.log("In 8 Days")//If out side 8 days error shoud be generated
                    res.status(200).json({
                        status: false,
                        msg: "Please refresh your page..........",
                    });
                    return;
                }
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
                var dateTocheck = new Date(includedDates[0])
                if (
                    dateTocheck.getFullYear() === todayYear &&
                    dateTocheck.getMonth() === todayMonth &&
                    dateTocheck.getDate() === todayDate &&
                    today.getTime() > today11PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isNightStay = true;
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","NightStay"]},
                                    { $in: ["Sharing", "$houseBoatType"] }
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                    //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$tripType", "NightStay"] },
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$houseBoatType","Private"]},
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $or: [{
                                            $and: [
                                                { $eq: ["$tripType", "NightStay"] },
                                                { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                            },
                                            {
                                            $and: [
                                                { $eq: ["$tripType", "OverNight"] },
                                                { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                            },
                                        ]
                                    }
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$tripType", "NightStay"] },
                                    { $eq: ["$status", "Active"] },
                                  //  { $eq: ["$houseBoatType","Private"]},
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $or: [{
                                            $and: [
                                                { $eq: ["$tripType", "NightStay"] },
                                                { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                            },
                                            {
                                            $and: [
                                                { $eq: ["$tripType", "OverNight"] },
                                                { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                            },
                                        ]
                                    }
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    { $eq: ["$tripType", "DayCruise"] },
                                    {
                                        $setIsSubset: [ includedDates,"$bookedDates" ]
                                    }
                                ]
                            }}
                        }],as:"DayBookings"},
                    },
                    {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    { $eq: ["$tripType", "DayCruise"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        }],as:"DayReservations"},
                    },
                    {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
                    {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
                    //Check for already Booking in sharing category exists
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$houseBoatType","NightStay"]},
                                    { $eq: ["$houseBoatType","Sharing"]},
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        },{
                            $group: {
                                _id: "$houseBoatId",
                                totalRoomsBooked: {$sum: "$totalRooms"},
                                totalGuestsBooked: {$sum: "$noOfAdults"},
                                sharedHouseboat: {$push: "$$ROOT"}
                            }
                        }],as:"SharedBookings"},
                    },
                    {
                        $addFields: {
                            SharedBookings: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: [[]],
                                    else: "$SharedBookings"
                                }
                            }
                        }
                    },
                    {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
                    {
                        $addFields: {
                            noOfRoomsBookedShared: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: 0,
                                    else: "$SharedBookings.totalRoomsBooked"
                                }
                            },
                            noOfGuestsBookedShared: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: 0,
                                    else: "$SharedBookings.totalGuestsBooked"
                                }
                            }
                        }
                    },
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                  //  { $eq: ["$houseBoatType","Sharing"]},
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        },{
                            $group: {
                                _id: "$houseBoatId",
                                totalRoomsBooked: {$sum: "$totalRooms"},
                                totalGuestsBooked: {$sum: "$totalGuests"},
                                sharedHouseboat: {$push: "$$ROOT"}
                            }
                        }],as:"SharedReservations"},
                    },
                    {
                        $addFields: {
                            SharedReservations: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: [[]],
                                    else: "$SharedReservations"
                                }
                            }
                        }
                    },
                    {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
                    {
                        $addFields: {
                            noOfRoomsBookedReserved: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: 0,
                                    else: "$SharedReservations.totalRoomsBooked"
                                }
                            },
                            noOfGuestsBookedReserved: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: 0,
                                    else: "$SharedReservations.totalGuestsBooked"
                                }
                            }
                        }
                    },
                    {
                        $addFields: {
                            noOfRoomsBooked: {
                                $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
                            },
                            noOfGuestsBooked: {
                                $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
                            }
                        }
                    },
                    {
                        $addFields: {
                            totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
                            totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
                        }
                    },
                    {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
                    {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial Match and Add Fields: Filtering documents based on houseBoatQuery and adding new fields noOfGuestsBooked and noOfRoomsBooked with default values of 0.
                Lookup Stages for Location Details: Fetching related location details from sublocationmodels and locationmodels.
                Trip Details Lookup and Matching: Fetching specific trip details for "NightStay" and "Sharing" types. Filtering for active status and existence of trip details. Also filtering based on maximum capacity of boats.
                Bookings Lookup and Matching: Checking for active bookings considering criteria like successful payment status, type of house boat being "Private", and date range compatibility for both "NightStay" and "OverNight" types.
                Reservations Lookup and Matching: Similar to bookings but for reservations, checking for active reserved status based on similar criteria for both "NightStay" and "OverNight" types.
                Lookup and Grouping for Shared Bookings: Checking for active shared houseboat bookings. Grouping by houseBoatId, calculating total rooms and guests booked, and creating an array of shared houseboat details.
                Unwinding and Adding Fields for Shared Bookings: Extracting fields and calculating the number of rooms and guests booked for shared houseboats.
                Lookup and Grouping for Shared Reservations: Similar to shared bookings but for reservations of shared houseboats.
                Unwinding and Adding Fields for Shared Reservations: Extracting fields and calculating the number of rooms and guests reserved for shared houseboats.
                Final Calculations and Matching: Calculating the available rooms and guests considering the booked/shared rooms and guests, and then matching for the required number of rooms and guests.
                The entire pipeline aims to find available houseboats for a given number of guests and rooms, considering bookings, reservations, and shared bookings/reservations. It filters available houseboats based on the required capacity and availability for the specified date range.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    var getRate = await RateController.CalculateNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }else{
                var includedDates = await getDates(startDateTime,endDateTime)
                if(startDateTime.getTime()>endDateTime.getTime()){
                    res.status(200).json({
                        status:false,
                        msg:"Invalid date selection, Please modify your search and try again."
                    });
                    return;
                }
                const today = new Date();
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
                var dateTocheck = new Date(includedDates[0])
                if (
                    dateTocheck.getFullYear() === todayYear &&
                    dateTocheck.getMonth() === todayMonth &&
                    dateTocheck.getDate() === todayDate &&
                    today.getTime() > today2PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isOverNight = true;
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","OverNight"]},
                                    { $in: ["Sharing", "$houseBoatType"] }
                                    
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                    //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["houseBoatType","Private"]},
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                  //  { $eq: ["houseBoatType","Private"]},
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                    //Check for already Booking in sharing category exist
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$houseBoatType","Sharing"]},
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        },{
                            $group: {
                                _id: "$houseBoatId",
                                totalRoomsBooked: {$sum: "$totalRooms"},
                                totalGuestsBooked: {$sum: "$noOfAdults"},
                                sharedHouseboat: {$push: "$$ROOT"}
                            }
                        }],as:"SharedBookings"},
                    },
                    {
                        $addFields: {
                            SharedBookings: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: [[]],
                                    else: "$SharedBookings"
                                }
                            }
                        }
                    },
                    {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
                    {
                        $addFields: {
                            noOfRoomsBookedShared: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: 0,
                                    else: "$SharedBookings.totalRoomsBooked"
                                }
                            },
                            noOfGuestsBookedShared: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: 0,
                                    else: "$SharedBookings.totalGuestsBooked"
                                }
                            }
                        }
                    },
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                  //  { $eq: ["$houseBoatType","Sharing"]},
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        },{
                            $group: {
                                _id: "$houseBoatId",
                                totalRoomsBooked: {$sum: "$totalRooms"},
                                totalGuestsBooked: {$sum: "$totalGuests"},
                                sharedHouseboat: {$push: "$$ROOT"}
                            }
                        }],as:"SharedReservations"},
                    },
                    {
                        $addFields: {
                            SharedReservations: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: [[]],
                                    else: "$SharedReservations"
                                }
                            }
                        }
                    },
                    {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
                    {
                        $addFields: {
                            noOfRoomsBookedReserved: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: 0,
                                    else: "$SharedReservations.totalRoomsBooked"
                                }
                            },
                            noOfGuestsBookedReserved: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: 0,
                                    else: "$SharedReservations.totalGuestsBooked"
                                }
                            }
                        }
                    },
                    {
                        $addFields: {
                            noOfRoomsBooked: {
                                $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
                            },
                            noOfGuestsBooked: {
                                $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
                            }
                        }
                    },
                    {
                        $addFields: {
                            totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
                            totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
                        }
                    },
                    // {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
                    // {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial Match & Field Addition:Filters houseboats based on the provided query and adds two initial fields for guest and room counts.
                Lookup & Unwinding:Looks up and unwinds sublocationmodels and locationmodels to get the starting location and location details.
                Trip Type Filtering:Matches triptypemodels where the status is Active, tripType is OverNight, and houseBoatType includes Sharing.
                Filters the documents based on maxCapacityOfBoats to accommodate the total number of guests.
                Private Bookings Check:Looks for successful Private houseboat bookings that match the provided bookedDates.
                Private Reservations Check:Searches for Private houseboat reservations that match the provided reservedDates.
                Shared Bookings Lookup:Looks for successful Sharing houseboat bookings that match the provided bookedDates.
                Groups and sums the booked rooms and guests for each houseboat ID.
                Conditional Field Addition for Shared Bookings:Uses $cond to conditionally assign values or an empty array based on whether SharedBookings exists.
                Shared Reservations Lookup:Searches for Sharing houseboat reservations that match the provided reservedDates.
                Groups and sums the reserved rooms and guests for each houseboat ID.
                Conditional Field Addition for Shared Reservations:Similar to Shared Bookings, uses $cond to conditionally assign values or an empty array based on whether SharedReservations exists.
                Calculation of Booked Rooms and Guests:Adds up the booked rooms and guests from Shared Bookings and Reservations.
                Available Rooms and Guest Capacity Calculation:Calculates the available rooms and guests by subtracting booked rooms and guests from the total rooms and maximum guest capacity respectively.
                Final Matching:Filters the houseboats based on the available rooms and guest capacity to ensure it meets the required criteria (numberofRooms and totalGuest).
                This aggregation pipeline checks both private and shared bookings and reservations for available houseboats, considering different criteria, and calculates available rooms and guest capacities for each.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    //Commented the below due to no need to check minimum capacity of boat for first booking
                    // if((houseBoats[i].SharedReservations.length<=0)&&(houseBoats[i].SharedBookings.length<=0)){
                    //     if(houseBoats[i].tripDetails.minCapacityOfBoats>totalGuest){
                    //         continue;
                    //     }
                    // }
                    var getRate = await RateController.CalculateOverNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }
        }
        res.status(200).json({
            status: true,
            data: result,
            page: pageNo,
            limit: dataLimit,
            totalLength:result.length,
            singleboat: true,
            msg: "success",
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
})
router.post('/houseboat/booking/filter',async(req,res)=>{
    try{
        var {page,limit,category,houseBoatType,location,tripType,numberofRooms,checkInDate,checkOutDate,children,adult,} = req.body;
        var pageNo = 1,dataLimit = 20;
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
        if (Misc.isnullorempty(category)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide Category",
            });
            return;
        }
        if (Misc.isnullorempty(houseBoatType)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide HouseBoat Type",
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
        if (Misc.isnullorempty(tripType)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide Trip Type",
            });
            return;
        }
        if (Misc.isnullorempty(numberofRooms)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide NumberofRooms",
            });
            return;
        }
        if (typeof numberofRooms != 'number'){
            numberofRooms=parseInt(numberofRooms)
        }
        if(numberofRooms<=0){
            res.status(200).json({
                status:false,
                msg:"Number of rooms should be greater than zero."
            });
            return;
        }
        if(numberofRooms>=50){
            res.status(200).json({
                status:false,
                msg:"Please select a valid number of rooms."
            });
            return;
        }
        if (Misc.isnullorempty(checkInDate)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide checkIn Date",
            });
            return;
        }
        if (Misc.isnullorempty(checkOutDate)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide checkOut Date",
            });
            return;
        }
        if (Misc.isnullorempty(adult)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide Adult",
            });
            return;
        }
        if(typeof adult != 'number'){
            adult = parseInt(adult);
        }
        if(adult<=0){
            res.status(200).json({
                status:false,
                msg:"Please select atleast one adult guest."
            });
            return;
        }
        if(Misc.isnullorempty(children)){
            children = 0
        }else{
            children = parseInt(children)
        }
        if(children<0){
            res.status(200).json({
                status:false,
                msg:"Number of students should be a postive number."
            });
            return;
        }
        var totalGuest = adult;//Consider only the adults as valid guests
        
        var startDateTime = new Date(checkInDate);
        var endDateTime = new Date(checkOutDate);
        var includedDates = await getDates(startDateTime,endDateTime)//It will Return all program included dates
       
        var result = []
        var houseBoatQuery = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category, };//House boat query setting
        if (houseBoatType === "Private") {
            //All Three Category DayCruis NightStay and OverNight 
            if(tripType == "DayCruise"){
                //Query For Day Cruis 
                houseBoatQuery.totalRooms = {$gte:numberofRooms}//Condetions for total Rooms available
                var includedDates = await getDatesFiltered(startDateTime,endDateTime)//Function returns the dates of booking it ignores the checkout date
                const today = new Date();
                // const eightDaysAhead = new Date(today);
                // eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
                // if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                //     console.log("In 8 Days")//If out side 8 days error shoud be generated
                //     res.status(200).json({
                //         status: true,
                //         data: [],
                //         page: pageNo,
                //         limit: dataLimit,
                //         totalLength:0,
                //         singleboat: true,
                //         msg: "success",
                //     });
                //     return;
                // }
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today1PM = new Date(todayYear, todayMonth, todayDate, 13, 0, 0);
                var dateToCheck = new Date(includedDates[0]);
                //In day cruis if we are searching for today as start date we should check if it the current time is grater than 1PM error should be generated
                if (
                    dateToCheck.getFullYear() === todayYear &&
                    dateToCheck.getMonth() === todayMonth &&
                    dateToCheck.getDate() === todayDate &&
                    today.getTime() > today1PM.getTime()
                ){
                    console.log("No Trip For Today")
                    //Today trip start time is over ,Trip is already started
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isDayCriuse = true;
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","DayCruise"]},
                                    { $in: ["Private", "$houseBoatType"] }
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxPersonTrips":{$gte:totalGuest}}},
                    {$match:{"tripDetails.minPersonTrips":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    {
                                        $or: [
                                          { $eq: ["$tripType", "DayCruise"] },
                                          { $eq: ["$tripType", "OverNight"] }
                                        ]
                                    },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    {
                                        $or: [
                                          { $eq: ["$tripType", "DayCruise"] },
                                          { $eq: ["$tripType", "OverNight"] }
                                        ]
                                    },
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ "$reservedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                    //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
                ])
                /*
                ---------------------CODE EXPLANATION----------------
                houseBoatModel.aggregate([...]): This initiates the aggregation pipeline on the houseBoatModel collection.
                {$match: houseBoatQuery}: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                $lookup stages: These stages perform a left outer join to fetch related data from other collections (sublocationmodels, locationmodels, triptypemodels) based on specified fields (startingLocation, location, _id).
                $unwind stages: These stages deconstruct arrays generated by the $lookup stages, ensuring each document has a single value or null for those fields.
                $lookup and subsequent stages for tripDetails: These stages perform a nested lookup to retrieve specific trip details from the triptypemodels collection based on various criteria such as active status, trip type, and house boat type.
                $match stages related to tripDetails: These stages filter the documents based on the existence of tripDetails, maximum and minimum person trips compared to totalGuest.
                $lookup, $unwind, and $match stages for Bookings and Reservations: These stages check for active bookings and reservations for the house boats, considering specific criteria like active status, trip types (day cruise or overnight), successful payment status, and the presence of included dates within booked or reserved dates.
                This pipeline essentially combines multiple stages to filter and match documents based on various conditions and relationships with related collections, ultimately aiming to retrieve houseBoatModel documents that meet the specified criteria for availability and booking status.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    //Calcuation for rate a function is called.
                    var getRate = await RateController.CalculateDayCruisRate(houseBoats[i],includedDates,totalGuest)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }else if(tripType == "NightStay"){
                var includedDates = await getDates(startDateTime,endDateTime)
                if(startDateTime.getTime()>endDateTime.getTime()){
                    res.status(200).json({
                        status:false,
                        msg:"Invalid date selection, Please modify your search and try again."
                    });
                    return;
                }
                const today = new Date();
                const eightDaysAhead = new Date(today);
                eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
                if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                    console.log("In 8 Days")//If out side 8 days error shoud be generated
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
                var dateTocheck = new Date(includedDates[0])
                if (
                    dateTocheck.getFullYear() === todayYear &&
                    dateTocheck.getMonth() === todayMonth &&
                    dateTocheck.getDate() === todayDate &&
                    today.getTime() > today11PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isNightStay = true;
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var houseBoats = await houseBoatModel.aggregate([
                    { $match: houseBoatQuery },
                    { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                    { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                    { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                    { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                    {
                        $lookup: {
                            from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $in: ["Private", "$houseBoatType"] }
                                        ]
                                    }
                                }
                            }], as: "tripDetails"
                        },
                    },
                    { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                    { $match: { tripDetails: { $exists: true }, } },
                    { $match: { "tripDetails.maxCapacityOfBoats": { $gte: totalGuest } } },
                    { $match: { "tripDetails.minCapacityOfBoats": { $lte: totalGuest } } },
                    {
                        $lookup: {
                            from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$endDate", startDateTime] }] }]
                                                },
                                                {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$endDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
                                                },
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }], as: "Bookings"
                        },
                    },
                    { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                    { $match: { Bookings: { $exists: false }, } },
                    {
                        $lookup: {
                            from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$checkOutDate", startDateTime] }] }]
                                                },
                                                {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
                                                },
                                                ]
                                            }
                                        ]
                                    }
                                }
                            }], as: "Reservations"
                        },
                    },
                    { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                    { $match: { Reservations: { $exists: false }, } },
                    {
                        $lookup: {
                            from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            { $eq: ["$tripType", "DayCruise"] },
                                            {
                                                $setIsSubset: [ includedDates,"$bookedDates" ]
                                            }
                                        ]
                                    }
                                }
                            }], as: "DayBookings"
                        },
                    },
                    { $unwind: { "path": "$DayBookings", preserveNullAndEmptyArrays: true } },
                    {
                        $lookup: {
                            from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                            pipeline: [{
                                $match: {
                                    $expr: {
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            { $eq: ["$tripType", "DayCruise"] },
                                            {
                                                $setIsSubset: [ includedDates,"$reservedDates" ]
                                            },
                                        ]
                                    }
                                }
                            }], as: "DayReservations"
                        },
                    },
                    { $unwind: { "path": "$DayReservations", preserveNullAndEmptyArrays: true } },
                    { $match: { $or: [{ DayBookings: { $exists: true } }, { DayReservations: { $exists: true } }] } }
                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                $lookup and $unwind stages: These stages fetch related data from other collections (sublocationmodels and locationmodels) and unwind arrays generated by the lookup, similar to the previous code.
                $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "NightStay", and house boat type being "Private".
                $match stages related to tripDetails: Filters documents based on the existence of tripDetails, maximum and minimum capacity of boats compared to totalGuest.
                $lookup and $unwind stages for Bookings and Reservations: These stages check for active bookings and reservations considering various criteria such as active status, trip types (night stay or overnight), successful payment status, and date ranges for booking and reservation overlaps.
                Additional $lookup, $unwind, and $match stages for DayBookings and DayReservations: These stages focus specifically on day cruise bookings and reservations, checking for active bookings/reservations, successful payment status, and date overlaps with included dates.
                Final $match stage with $or condition: This line combines day cruise bookings and reservations to check for documents where either DayBookings or DayReservations exist, aiming to find availability for day cruises.
                Overall, this pipeline aims to filter and match documents in the houseBoatModel collection based on various conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, focusing on both night stay and day cruise scenarios.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    if((Misc.isnullorempty(houseBoats[i].DayBookings))&&(Misc.isnullorempty(houseBoats[i].DayReservations))){
                        continue;
                    }
                    var getRate = await RateController.CalculateNightStayRate(houseBoats[i],includedDates,totalGuest)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }else{
                var includedDates = await getDates(startDateTime,endDateTime)
                if(startDateTime.getTime()>endDateTime.getTime()){
                    res.status(200).json({
                        status:false,
                        msg:"Invalid date selection, Please modify your search and try again."
                    });
                    return;
                }
                const today = new Date();
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
                var dateTocheck = new Date(includedDates[0])
                if (
                    dateTocheck.getFullYear() === todayYear &&
                    dateTocheck.getMonth() === todayMonth &&
                    dateTocheck.getDate() === todayDate &&
                    today.getTime() > today2PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isOverNight = true;
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","OverNight"]},
                                    { $in: ["Private", "$houseBoatType"] }
                                    
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                    {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                $lookup and $unwind stages for locations: These stages fetch details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields and unwind arrays created by the lookup, similar to the previous examples.
                $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "OverNight", and house boat type being "Private".
                $match stages related to tripDetails: Filters documents based on the existence of tripDetails, maximum and minimum capacity of boats compared to totalGuest.
                $lookup and subsequent stages for Bookings: These stages check for active bookings considering specific criteria such as active status, successful payment status, and the presence of included dates within booked dates.
                $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where Bookings array doesn't exist.
                $lookup and subsequent stages for Reservations: These stages check for active reservations considering criteria like active status, reservation status being "Reserved", and included dates within reserved dates.
                $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where Reservations array doesn't exist.
                This aggregation pipeline essentially aims to filter documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings, successful payments, and date overlaps, focusing specifically on "OverNight" trips. The final result should be a set of documents that meet these criteria and are available for bookings.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    var getRate = await RateController.CalculateOverNightStayRate(houseBoats[i],includedDates,totalGuest)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }
            if (result.length <= 0) {
                var houseBoatQueryMultiple = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category, };
                if (houseBoatType === "Private") {
                    // if (tripType == "DayCruise") {
                    //     //houseBoatQuery.totalRooms = { $gte: numberofRooms }
                    //     var includedDates = await getDatesFiltered(startDateTime, endDateTime)
                    //     const today = new Date();
                    //     //const eightDaysAhead = new Date(today);
                    // //     eightDaysAhead.setDate(today.getDate() + 8);
                    // //     if(includedDates[0]>eightDaysAhead){
                    // //         console.log("In 8 Days")
                    // //         res.status(200).json({
                    // //         status: true,
                    // //         data: [],
                    // //         page: pageNo,
                    // //         limit: dataLimit,
                    // //         totalLength:0,
                    // //         singleboat: true,
                    // //         msg: "success",
                    // //     });
                    // //     return;
                    // // }
                    // const todayYear = today.getFullYear();
                    // const todayMonth = today.getMonth();
                    // const todayDate = today.getDate();
                    // const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
                    // var dateToCheck = new Date(includedDates[0]);
                    // if (dateToCheck.getFullYear() === todayYear &&dateToCheck.getMonth() === todayMonth &&dateToCheck.getDate() === todayDate &&today.getTime() > today1PM.getTime()){
                    //     console.log("No Trip For Today")
                    //     res.status(200).json({
                    //         status: true,
                    //         data: [],
                    //         page: pageNo,
                    //         limit: dataLimit,
                    //         totalLength:0,
                    //         singleboat: true,
                    //         msg: "success",
                    //     });
                    //     return;
                    // }
                    // houseBoatQueryMultiple.isDayCriuse = true;
                    //     var vendorGroup = await houseBoatModel.aggregate([
                    //         { $match: houseBoatQueryMultiple },
                    //         { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                    //         { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                    //         { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                    //         { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                    //         {
                    //             $lookup: {
                    //                 from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                    //                 pipeline: [{
                    //                     $match: {
                    //                         $expr: {
                    //                             $and: [
                    //                                 { $eq: ["$status", "Active"] },
                    //                                 { $eq: ["$tripType", "DayCruise"] },
                    //                                 { $in: ["Private", "$houseBoatType"] }
                    //                             ]
                    //                         }
                    //                     }
                    //                 }], as: "tripDetails"
                    //             },
                    //         },
                    //         { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                    //         { $match: { tripDetails: { $exists: true }, } },
                    //         { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
                    //         // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
                    //         { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
                    //         {
                    //             $lookup: {
                    //                 from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                    //                 pipeline: [{
                    //                     $match: {
                    //                         $expr: {
                    //                             $and: [
                    //                                 { $eq: ["$status", "Active"] },
                    //                                 {
                    //                                     $or: [
                    //                                         { $eq: ["$tripType", "DayCruise"] },
                    //                                         { $eq: ["$tripType", "OverNight"] }
                    //                                     ]
                    //                                 },
                    //                                 { $eq: ["$paymentStatus", "Success"] },
                    //                                 {
                    //                                     $setIsSubset: ["$bookedDates", includedDates]
                    //                                 },
                    //                             ]
                    //                         }
                    //                     }
                    //                 }], as: "Bookings"
                    //             },
                    //         },
                    //         { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                    //         { $match: { Bookings: { $exists: false }, } },
                    //         {
                    //             $lookup: {
                    //                 from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                    //                 pipeline: [{
                    //                     $match: {
                    //                         $expr: {
                    //                             $and: [
                    //                                 { $eq: ["$status", "Active"] },
                    //                                 {
                    //                                     $or: [
                    //                                         { $eq: ["$tripType", "DayCruise"] },
                    //                                         { $eq: ["$tripType", "OverNight"] }
                    //                                     ]
                    //                                 },
                    //                                 { $eq: ["$reservationStatus", "Reserved"] },
                    //                                 {
                    //                                     $setIsSubset: [ "$reservedDates",includedDates]
                    //                                 },
                    //                             ]
                    //                         }
                    //                     }
                    //                 }], as: "Reservations"
                    //             },
                    //         },
                    //         { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                    //         { $match: { Reservations: { $exists: false }, } },
                    //         { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                    //         { $match:{ totalboats:{$gt:1}}}
                    //         //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
                    //     ])
                    //     var locationGroup = await houseBoatModel.aggregate([
                    //         { $match: houseBoatQueryMultiple },
                    //         { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                    //         { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                    //         { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                    //         { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                    //         {
                    //             $lookup: {
                    //                 from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                    //                 pipeline: [{
                    //                     $match: {
                    //                         $expr: {
                    //                             $and: [
                    //                                 { $eq: ["$status", "Active"] },
                    //                                 { $eq: ["$tripType", "DayCruise"] },
                    //                                 { $in: ["Private", "$houseBoatType"] }
                    //                             ]
                    //                         }
                    //                     }
                    //                 }], as: "tripDetails"
                    //             },
                    //         },
                    //         { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                    //         { $match: { tripDetails: { $exists: true }, } },
                    //         { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
                    //         // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
                    //         { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
                    //         {
                    //             $lookup: {
                    //                 from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                    //                 pipeline: [{
                    //                     $match: {
                    //                         $expr: {
                    //                             $and: [
                    //                                 { $eq: ["$status", "Active"] },
                    //                                 {
                    //                                     $or: [
                    //                                         { $eq: ["$tripType", "DayCruise"] },
                    //                                         { $eq: ["$tripType", "OverNight"] }
                    //                                     ]
                    //                                 },
                    //                                 { $eq: ["$paymentStatus", "Success"] },
                    //                                 {
                    //                                     $setIsSubset: ["$bookedDates", includedDates]
                    //                                 },
                    //                             ]
                    //                         }
                    //                     }
                    //                 }], as: "Bookings"
                    //             },
                    //         },
                    //         { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                    //         { $match: { Bookings: { $exists: false }, } },
                    //         {
                    //             $lookup: {
                    //                 from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                    //                 pipeline: [{
                    //                     $match: {
                    //                         $expr: {
                    //                             $and: [
                    //                                 { $eq: ["$status", "Active"] },
                    //                                 {
                    //                                     $or: [
                    //                                         { $eq: ["$tripType", "DayCruise"] },
                    //                                         { $eq: ["$tripType", "OverNight"] }
                    //                                     ]
                    //                                 },
                    //                                 { $eq: ["$reservationStatus", "Reserved"] },
                    //                                 {
                    //                                     $setIsSubset: [ includedDates,"$reservedDates" ]
                    //                                 },
                    //                             ]
                    //                         }
                    //                     }
                    //                 }], as: "Reservations"
                    //             },
                    //         },
                    //         { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                    //         { $match: { Reservations: { $exists: false }, } },
                    //         { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                    //         { $match:{ totalboats:{$gt:1}}}
                    //         //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
                    //     ])
                    //     var houseBoats = vendorGroup.concat(locationGroup)
                    //     /*
                    //     ---------------------CODE EXPLANATION----------------
                    //     Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
                    //     $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, unwinding arrays generated by the lookup, similar to previous examples.
                    //     $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "DayCruise", and house boat type being "Private".
                    //     $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence.
                    //     Commented-out $match stage: Seems to have been commented out but might have been intended to filter based on the maximum number of person trips.
                    //     $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria like active status, successful payment status, trip types (day cruise or overnight), and the presence of included dates within booked dates.
                    //     $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where Bookings array doesn't exist.
                    //     $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria like active status, reservation status being "Reserved", trip types (day cruise or overnight), and the presence of included dates within reserved dates.
                    //     $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where Reservations array doesn't exist.
                    //     Commented-out $match stage: A potential final match condition utilizing $or logic to find documents where either reservations or bookings don't exist.
                    //     ---------------------------END-----------------------
                    //     */
                    //     houseBoats = JSON.parse(JSON.stringify(houseBoats))
                    //     var houseBoat = [];
                    //     for(var n=0;n<houseBoats.length;n++){
                    //         var result = [];
                    //         for (var k = 0; k < houseBoats[n].details.length; k++) {
                    //             var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
                    //             if (getRate.status == true) {
                    //                 houseBoats[n].details[k].customerRate = getRate.rate;
                    //                 result.push(houseBoats[n].details[k])
                    //             }
                    //         }
                    //         houseBoat.push({ _id: houseBoats[n]._id, boats: result,totalboats:houseBoats[n].totalboats });
                    //     }
                    //     var finalResult = [];
                    //     for(var h =0;h<houseBoat.length;h++){
                    //         var newResult = getCombinationsOnDay(houseBoat[h].boats, adult);
                    //         for(var i=0;i<newResult.length;i++){
                    //             var data = {}
                    //             var totalAmount = 0
                    //             var id = [];
                    //             var totalGuestCanBeAccomadated = 0
                    //             if (newResult[i].length <= 1) {
                    //                 continue;
                    //             }
                    //             var totalRemiGuests = adult;
                    //             for (var j = 0; j < newResult[i].length; j++) {
                    //                 if(totalRemiGuests>=newResult[i][j].tripDetails.maxPersonTrips){
                    //                     var guestsForCalculations = newResult[i][j].tripDetails.maxPersonTrips;
                    //                     totalRemiGuests = totalRemiGuests-newResult[i][j].tripDetails.maxPersonTrips;
                    //                 }else{
                    //                     var guestsForCalculations = totalRemiGuests;
                    //                     totalRemiGuests = 0;
                    //                 }
                    //                 var getRate = await RateController.CalculateDayCruisRate(newResult[i][j], includedDates,guestsForCalculations)
                    //                 if (getRate.status == true) {
                    //                     newResult[i][j].customerRate = getRate.rate;
                    //                     //result.push(houseBoats[n].details[k])
                    //                 }
                    //                 totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
                    //                 totalAmount += newResult[i][j].customerRate;
                    //                 id.push(newResult[i][j]._id)
                    //             }
                    //             data._id = id
                    //             data.totalAmount = totalAmount
                    //             data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated
                    //             data.houseBoatDetails = newResult[i]
                    //             finalResult.push(data)
                    //         }
                    //     }
                    //     function arraysEqual(arr1, arr2) {
                    //         return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
                    //     }
                    //     finalResult = finalResult.filter((obj, index, array) => {
                    //         return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
                    //     });
                    //     res.status(200).json({
                    //         status: true,
                    //         data: finalResult,
                    //         page: pageNo,
                    //         limit: dataLimit,
                    //         totalLength: finalResult.length,
                    //         singleboat: false,
                    //         msg: "success",
                    //     });
                    //     return; 
                    // }
                    if(tripType == "NightStay"){
                        var includedDates = await getDates(startDateTime,endDateTime)
                        if(startDateTime.getTime()>endDateTime.getTime()){
                            res.status(200).json({
                                status:false,
                                msg:"Invalid date selection, Please modify your search and try again."
                            });
                            return;
                        }
                        const today = new Date();
                        const eightDaysAhead = new Date(today);
                        eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
                        if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                            console.log("In 8 Days")//If out side 8 days error shoud be generated
                            res.status(200).json({
                                status: true,
                                data: [],
                                page: pageNo,
                                limit: dataLimit,
                                totalLength:0,
                                singleboat: true,
                                msg: "success",
                            });
                            return;
                        }
                        const todayYear = today.getFullYear();
                        const todayMonth = today.getMonth();
                        const todayDate = today.getDate();
                        const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
                        var dateTocheck = new Date(includedDates[0])
                        if (
                            dateTocheck.getFullYear() === todayYear &&
                            dateTocheck.getMonth() === todayMonth &&
                            dateTocheck.getDate() === todayDate &&
                            today.getTime() > today11PM.getTime()
                        ){
                            console.log("No Trip For Today")
                            res.status(200).json({
                                status: true,
                                data: [],
                                page: pageNo,
                                limit: dataLimit,
                                totalLength:0,
                                singleboat: true,
                                msg: "success",
                            });
                            return;
                        }
                        houseBoatQuery.isNightStay = true;
                        //houseBoatQuery.totalRooms = {$gte:numberofRooms}
                        var vendorGroup = await houseBoatModel.aggregate([
                            {$match:houseBoatQuery},
                            {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                            {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                            {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType","NightStay"]},
                                            { $in: ["Private", "$houseBoatType"] }
                                        ]
                                    }}
                                }],as:"tripDetails"},
                            },
                            {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                            {$match:{tripDetails:{$exists:true},}},
                            //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                            {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                                    },
                                                    {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                                    },
                                                ]
                                            }
                                        ]
                                    }}
                                }],as:"Bookings"},
                            },
                            {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                            {$match:{Bookings:{$exists:false},}},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                                    },
                                                    {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                                    },
                                                ]
                                            }
                                        ]
                                    }}
                                }],as:"Reservations"},
                            },
                            {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                            {$match:{Reservations:{$exists:false},}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            { $eq: ["$tripType", "DayCruise"] },
                                            {
                                                $setIsSubset: [ includedDates,"$bookedDates" ]
                                            }
                                        ]
                                    }}
                                }],as:"DayBookings"},
                            },
                            {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                            pipeline: [{
                                $match: {$expr: { 
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        { $eq: ["$reservationStatus", "Reserved"] },
                                        { $eq: ["$tripType", "DayCruise"] },
                                        {
                                            $setIsSubset: [ includedDates,"$reservedDates" ]
                                        },
                                    ]
                                }}
                            }],as:"DayReservations"},
                        },
                        {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
                        {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
                        {$group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                        {$match:{ totalboats:{$gt:1}}}
                        ])
                        var locationGroup = await houseBoatModel.aggregate([
                            {$match:houseBoatQuery},
                            {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                            {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                            {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType","NightStay"]},
                                            { $in: ["Private", "$houseBoatType"] }
                                        ]
                                    }}
                                }],as:"tripDetails"},
                            },
                            {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                            {$match:{tripDetails:{$exists:true},}},
                            //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                            {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                                    },
                                                    {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                                    },
                                                ]
                                            }
                                        ]
                                    }}
                                }],as:"Bookings"},
                            },
                            {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                            {$match:{Bookings:{$exists:false},}},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $or: [{
                                                    $and: [
                                                        { $eq: ["$tripType", "NightStay"] },
                                                        { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                                    },
                                                    {
                                                    $and: [
                                                        { $eq: ["$tripType", "OverNight"] },
                                                        { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                                    },
                                                ]
                                            }
                                        ]
                                    }}
                                }],as:"Reservations"},
                            },
                            {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                            {$match:{Reservations:{$exists:false},}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            { $eq: ["$tripType", "DayCruise"] },
                                            {
                                                $setIsSubset: [ includedDates,"$bookedDates"]
                                            }
                                        ]
                                    }}
                                }],as:"DayBookings"},
                            },
                            {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                            pipeline: [{
                                $match: {$expr: { 
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        { $eq: ["$reservationStatus", "Reserved"] },
                                        { $eq: ["$tripType", "DayCruise"] },
                                        {
                                            $setIsSubset: [ includedDates,"$reservedDates" ]
                                        },
                                    ]
                                }}
                            }],as:"DayReservations"},
                        },
                        {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
                        {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
                        {$group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                        {$match:{ totalboats:{$gt:1}}}
                        ])
                        var houseBoats = vendorGroup.concat(locationGroup)
                        /*
                        ---------------------CODE EXPLANATION----------------
                        Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                        $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, unwinding arrays generated by the lookup, which was described previously.
                        $lookup for tripDetails: Fetches trip details from the triptypemodels collection based on specific criteria like active status, trip type being "NightStay", and house boat type being "Private".
                        $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
                        $lookup and subsequent stages for Bookings: Checks for active night stay bookings considering criteria such as active status, successful payment status, trip types (night stay or overnight), and the presence of included dates within booked dates.
                        $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
                        $lookup and subsequent stages for Reservations: Checks for active night stay reservations considering criteria such as active status, reservation status being "Reserved", trip types (night stay or overnight), and the presence of included dates within reserved dates.
                        $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
                        Additional $lookup, $unwind, and $match stages for DayBookings and DayReservations: These stages specifically focus on day cruise bookings and reservations, using similar criteria and matching conditions to find availability for day cruises.
                        Final $match stage with $or condition: This line combines day cruise bookings and reservations to find documents where either DayBookings or DayReservations exist, indicating availability for day cruises.
                        This aggregation pipeline aims to filter documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, focusing on both night stays and day cruises with specific criteria for availability.
                        ---------------------------END-----------------------
                        */
                        var finalResult = [];
                        houseBoats = JSON.parse(JSON.stringify(houseBoats))
                        for(var h=0;h<houseBoats.length;h++){
                            for(var g=0;g<houseBoats[h].details.length;g++){
                                var numberOfRooms = houseBoats[h].details[g].totalRooms;
                                var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                                var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                                houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                                houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                            }
                        }
                        for(var p=0;p<houseBoats.length;p++){
                            var result = [];
                            var totalGuestCanBeAccomadated = 0
                            var totalExtraGuestCanBeaccomadated = 0
                            var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
                            var hbs = getMostSutableValue;
                            const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                            for(var k =0;k<hbs.length;k++){
                                totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
                                totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                                var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                                hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                                hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                                var getRate = await RateController.CalculateNightStayRateCombination(hbs[k],includedDates,totalguests)
                                if(getRate.status == true){
                                    hbs[k].customerRate = getRate.rate;
                                    hbs[k].extraPersonRate = getRate.extraPersonRate
                                    result.push(hbs[k])
                                }
                            }
                            var data = {}
                            var totalAmount = 0
                            var id = [];
                            for(var t=0;t<result.length;t++){
                                totalAmount  += result[t].customerRate;
                                id.push(result[t]._id)
                            }
                            data._id = id
                            data.totalAmount = totalAmount
                            data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                            data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                            data.houseBoatDetails = result
                            if(sumOfTotals>=numberofRooms){
                                if(totalGuestCanBeAccomadated>=adult){
                                    finalResult.push(data)
                                }else{
                                    //Calculations For additional Guests
                                    var istrue = false
                                     var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
                                    if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
                                        console.log("Cant Accomadate these many extra guests")
                                    }else{
                                        var reminingAdditionalGuests = additionalGuestAvailable
                                        var additionalAmount = 0;
                                        for(var d=0;d<data.houseBoatDetails.length;d++){
                                            if(reminingAdditionalGuests>0){
                                                if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                                    additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                                    reminingAdditionalGuests = 0;
                                                }else{
                                                    additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                                    reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                                }
                                            }else{
                                                istrue = true
                                                break;
                                            }
                                        }
                                        if (!isNaN(additionalAmount)){
                                            data.additionalAmount = additionalAmount;
                                            data.totalAmount +=additionalAmount
                                        }
                                        if(istrue == true){
                                            finalResult.push(data)
                                        }
                                    }
                                }
                            }
                        }
                        function arraysEqual(arr1, arr2) {
                            return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
                        }
                        finalResult = finalResult.filter((obj, index, array) => {
                            return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
                        });
                        res.status(200).json({
                            status:true,
                            data: finalResult,
                            page: pageNo,
                            limit: dataLimit,
                            totalLength:finalResult.length,
                            singleboat: false,
                            msg: "success",
                        });
                        return;
                    }
                    else if(tripType=="OverNight"){
                        var includedDates = await getDates(startDateTime,endDateTime)
                        if(startDateTime.getTime()>endDateTime.getTime()){
                            res.status(200).json({
                                status:false,
                                msg:"Invalid date selection, Please modify your search and try again."
                            });
                            return;
                        }
                        const today = new Date();
                        const todayYear = today.getFullYear();
                        const todayMonth = today.getMonth();
                        const todayDate = today.getDate();
                        const today2PM = new Date(todayYear, todayMonth, todayDate, 2, 0, 0);
                        var dateTocheck = new Date(includedDates[0])
                        if (
                            dateTocheck.getFullYear() === todayYear &&
                            dateTocheck.getMonth() === todayMonth &&
                            dateTocheck.getDate() === todayDate &&
                            today.getTime() > today2PM.getTime()
                        ) {
                            console.log("No Trip For Today")
                            res.status(200).json({
                                status: true,
                                data: [],
                                page: pageNo,
                                limit: dataLimit,
                                totalLength: 0,
                                singleboat: true,
                                msg: "success",
                            });
                            return;
                        }
                        houseBoatQuery.isOverNight = true;
                        //houseBoatQueryMultiple.totalRooms = {$gte:numberofRooms}
                        var vendorWise = await houseBoatModel.aggregate([
                            {$match:houseBoatQueryMultiple},
                            {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                            {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                            {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                            {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType","OverNight"]},
                                            { $in: ["Private", "$houseBoatType"] }
                                            
                                        ]
                                    }}
                                }],as:"tripDetails"},
                            },
                            {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                            {$match:{tripDetails:{$exists:true},}},
                            {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
                            // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                            {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $setIsSubset: [ "$bookedDates",includedDates]
                                            },
                                        ]
                                    }}
                                }],as:"Bookings"},
                            },
                            {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                            {$match:{Bookings:{$exists:false},}},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $setIsSubset: [ includedDates,"$reservedDates"]
                                            },
                                        ]
                                    }}
                                }],as:"Reservations"},
                            },
                            {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                            {$match:{Reservations:{$exists:false},}},
                            { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                            { $match:{ totalboats:{$gt:1}}}
                        ])
                        var locationWise = await houseBoatModel.aggregate([
                            {$match:houseBoatQueryMultiple},
                            {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                            {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                            {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                            {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                            {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$tripType","OverNight"]},
                                            { $in: ["Private", "$houseBoatType"] }
                                            
                                        ]
                                    }}
                                }],as:"tripDetails"},
                            },
                            {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                            {$match:{tripDetails:{$exists:true},}},
                            {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
                            // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                            {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                            {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$paymentStatus", "Success"] },
                                            {
                                                $setIsSubset: [ "$bookedDates",includedDates]
                                            },
                                        ]
                                    }}
                                }],as:"Bookings"},
                            },
                            {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                            {$match:{Bookings:{$exists:false},}},
                            {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                                pipeline: [{
                                    $match: {$expr: { 
                                        $and: [
                                            { $eq: ["$status", "Active"] },
                                            { $eq: ["$reservationStatus", "Reserved"] },
                                            {
                                                $setIsSubset: [ includedDates,"$reservedDates" ]
                                            },
                                        ]
                                    }}
                                }],as:"Reservations"},
                            },
                            {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                            {$match:{Reservations:{$exists:false},}},
                            { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                            { $match:{ totalboats:{$gt:1}}}
                        ])
                        houseBoats = vendorWise.concat(locationWise)
                        /*
                        ---------------------CODE EXPLANATION----------------
                        Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
                        $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, similar to the previous examples.
                        $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "OverNight", and house boat type being "Private".
                        $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
                        $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates.
                        $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
                        $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates.
                        $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
                        This aggregation pipeline seems to focus on filtering documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, primarily focusing on overnight stays with specific criteria for availability.
                        ---------------------------END-----------------------
                        */
                        houseBoats = JSON.parse(JSON.stringify(houseBoats))
                        for(var h=0;h<houseBoats.length;h++){
                            for(var g=0;g<houseBoats[h].details.length;g++){
                                var numberOfRooms = houseBoats[h].details[g].totalRooms;
                                var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                                var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                                houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                                houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                            }
                        }
                        var finalResult = [];
                        
                        for(var p=0;p<houseBoats.length;p++){
                            var result = [];
                            var totalGuestCanBeAccomadated = 0
                            var totalExtraGuestCanBeaccomadated = 0
                            var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
                            var hbs = getMostSutableValue;
                            var data = {}
                            var totalAmount = 0
                            var id = [];
                            for(var k =0;k<hbs.length;k++){
                                totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
                                totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                                var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                                hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                                hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                                var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k],includedDates,totalguests)
                                if(getRate.status == true){
                                    hbs[k].customerRate = getRate.rate;
                                    hbs[k].extraPersonRate = getRate.extraPersonRate
                                    hbs[k].totalExtraPersonRate = 0; 
                                    totalAmount  += hbs[k].customerRate;
                                    id.push( hbs[k]._id)
                                    result.push(hbs[k])
                                }
                            }
                            data._id = id
                            data.totalAmount = totalAmount
                            data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                            data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                            data.houseBoatDetails = result
                            const sumOfTotals = result.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                            if(sumOfTotals>=numberofRooms){
                                if(totalGuestCanBeAccomadated>=adult){
                                    var totalRoomsFound =  data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                                    if(totalRoomsFound>=numberofRooms){
                                        finalResult.push(data)
                                    }
                                }else{
                                    //Calculations For additional Guests
                                    var istrue = false
                                     var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
                                    if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
                                        console.log("Cant Accomadate these many extra guests")
                                    }else{
                                        var reminingAdditionalGuests = additionalGuestAvailable
                                        var additionalAmount = 0;
                                        for(var d=0;d<data.houseBoatDetails.length;d++){
                                            if(reminingAdditionalGuests>0){
                                                if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                                    additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                                    data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                                    var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate
                                                    if(!Misc.isnullorempty(houseBoatTotal)){
                                                        data.houseBoatDetails[d].customerRate = houseBoatTotal;
                                                    }
                                                    if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                                        data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                                    }
                                                    reminingAdditionalGuests = 0;
                                                    istrue = true;
                                                    break
                                                }else{
                                                    additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                                    data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                                    var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate;
                                                    if(!Misc.isnullorempty(houseBoatTotal)){
                                                        data.houseBoatDetails[d].customerRate = houseBoatTotal;
                                                    }
                                                    if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                                        data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                                    }
                                                    reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                                }
                                            }else{
                                                istrue = true
                                                break;
                                            }
                                        }
                                        if (!isNaN(additionalAmount)){
                                            data.additionalAmount = additionalAmount;
                                            data.totalAmount +=additionalAmount
                                        }
                                        if(istrue == true){
                                            finalResult.push(data)
                                        }
                                    }
                                }
                            }
                        }
                        function arraysEqual(arr1, arr2) {
                            return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
                        }
                        finalResult = finalResult.filter((obj, index, array) => {
                            return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
                        });
                        // for(var f=0;f<finalResult.length;f++){
                        //     v
                        // }
                        res.status(200).json({
                            status:true,
                            data: finalResult,
                            page: pageNo,
                            limit: dataLimit,
                            totalLength:finalResult.length,
                            singleboat: false,
                            msg: "success",
                        });
                        return;
                    }
                }
            } 
        }else{
            //This is for sharing Boat Booking
            if(tripType == "DayCruise"){
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var includedDates = await getDatesFiltered(startDateTime,endDateTime)
                const today = new Date();
                // const eightDaysAhead = new Date(today);
                // eightDaysAhead.setDate(today.getDate() + 8);
                // if(includedDates[0]>eightDaysAhead){
                //     console.log("In 8 Days")
                //     res.status(200).json({
                //         status: true,
                //         data: [],
                //         page: pageNo,
                //         limit: dataLimit,
                //         totalLength:0,
                //         singleboat: true,
                //         msg: "success",
                //     });
                //     return;
                // }
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
                var dateToCheck = new Date(includedDates[0])
                if (
                    dateToCheck.getFullYear() === todayYear &&
                    dateToCheck.getMonth() === todayMonth &&
                    dateToCheck.getDate() === todayDate &&
                    today.getTime() > today1PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isDayCriuse = true;
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","DayCruise"]},
                                    { $in: ["Sharing", "$houseBoatType"] }
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxPersonTrips":{$gte:totalGuest}}},
                    {$match:{"tripDetails.minPersonTrips":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    {
                                        $or: [
                                          { $eq: ["$tripType", "DayCruise"] },
                                          { $eq: ["$tripType", "OverNight"] }
                                        ]
                                    },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    {
                                        $or: [
                                          { $eq: ["$tripType", "DayCruise"] },
                                          { $eq: ["$tripType", "OverNight"] }
                                        ]
                                    },
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                    //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQuery.
                $lookup Stages for Location Models: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, respectively.
                $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "DayCruise", and house boat type being "Sharing".
                $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence, maximum and minimum person trips compared to totalGuest.
                $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates for both "DayCruise" and "OverNight" trip types.
                $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
                $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates for both "DayCruise" and "OverNight" trip types.
                $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
                It seems like the final commented out $match stage might be intended to filter for documents where either Reservations or Bookings arrays do not exist. However, it's currently commented out and not active in the aggregation pipeline.   
                ---------------------------END-----------------------
                */
                //As Of Now We Did Not Need DayCruis Boat To Be Booked in Sharing Category
                result = [];
            }else if(tripType == "NightStay"){
                var includedDates = await getDates(startDateTime,endDateTime)
                if(startDateTime.getTime()>endDateTime.getTime()){
                    res.status(200).json({
                        status:false,
                        msg:"Invalid date selection, Please modify your search and try again."
                    });
                    return;
                }
                const today = new Date();
                const eightDaysAhead = new Date(today);
                eightDaysAhead.setDate(today.getDate() + 8);
                if(includedDates[0]>eightDaysAhead){
                    console.log("In 8 Days")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
                var dateTocheck = new Date(includedDates[0])
                if (
                    dateTocheck.getFullYear() === todayYear &&
                    dateTocheck.getMonth() === todayMonth &&
                    dateTocheck.getDate() === todayDate &&
                    today.getTime() > today11PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isNightStay = true;
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","NightStay"]},
                                    { $in: ["Sharing", "$houseBoatType"] }
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                    //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$tripType", "NightStay"] },
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$houseBoatType","Private"]},
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $or: [{
                                            $and: [
                                                { $eq: ["$tripType", "NightStay"] },
                                                { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                            },
                                            {
                                            $and: [
                                                { $eq: ["$tripType", "OverNight"] },
                                                { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                            },
                                        ]
                                    }
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$tripType", "NightStay"] },
                                    { $eq: ["$status", "Active"] },
                                   // { $eq: ["$houseBoatType","Private"]},
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $or: [{
                                            $and: [
                                                { $eq: ["$tripType", "NightStay"] },
                                                { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                            },
                                            {
                                            $and: [
                                                { $eq: ["$tripType", "OverNight"] },
                                                { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                            },
                                        ]
                                    }
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    { $eq: ["$tripType", "DayCruise"] },
                                    {
                                        $setIsSubset: [ includedDates,"$bookedDates" ]
                                    }
                                ]
                            }}
                        }],as:"DayBookings"},
                    },
                    {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    { $eq: ["$tripType", "DayCruise"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        }],as:"DayReservations"},
                    },
                    {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
                    {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
                    //Check for already Booking in sharing category exists
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$houseBoatType","NightStay"]},
                                    { $eq: ["$houseBoatType","Sharing"]},
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        },{
                            $group: {
                                _id: "$houseBoatId",
                                totalRoomsBooked: {$sum: "$totalRooms"},
                                totalGuestsBooked: {$sum: "$noOfAdults"},
                                sharedHouseboat: {$push: "$$ROOT"}
                            }
                        }],as:"SharedBookings"},
                    },
                    {
                        $addFields: {
                            SharedBookings: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: [[]],
                                    else: "$SharedBookings"
                                }
                            }
                        }
                    },
                    {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
                    {
                        $addFields: {
                            noOfRoomsBookedShared: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: 0,
                                    else: "$SharedBookings.totalRoomsBooked"
                                }
                            },
                            noOfGuestsBookedShared: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: 0,
                                    else: "$SharedBookings.totalGuestsBooked"
                                }
                            }
                        }
                    },
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    // { $eq: ["$houseBoatType","Sharing"]},
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        },{
                            $group: {
                                _id: "$houseBoatId",
                                totalRoomsBooked: {$sum: "$totalRooms"},
                                totalGuestsBooked: {$sum: "$totalGuests"},
                                sharedHouseboat: {$push: "$$ROOT"}
                            }
                        }],as:"SharedReservations"},
                    },
                    {
                        $addFields: {
                            SharedReservations: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: [[]],
                                    else: "$SharedReservations"
                                }
                            }
                        }
                    },
                    {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
                    {
                        $addFields: {
                            noOfRoomsBookedReserved: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: 0,
                                    else: "$SharedReservations.totalRoomsBooked"
                                }
                            },
                            noOfGuestsBookedReserved: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: 0,
                                    else: "$SharedReservations.totalGuestsBooked"
                                }
                            }
                        }
                    },
                    {
                        $addFields: {
                            noOfRoomsBooked: {
                                $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
                            },
                            noOfGuestsBooked: {
                                $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
                            }
                        }
                    },
                    {
                        $addFields: {
                            totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
                            totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
                        }
                    },
                    {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
                    {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial Match and Add Fields: Filtering documents based on houseBoatQuery and adding new fields noOfGuestsBooked and noOfRoomsBooked with default values of 0.
                Lookup Stages for Location Details: Fetching related location details from sublocationmodels and locationmodels.
                Trip Details Lookup and Matching: Fetching specific trip details for "NightStay" and "Sharing" types. Filtering for active status and existence of trip details. Also filtering based on maximum capacity of boats.
                Bookings Lookup and Matching: Checking for active bookings considering criteria like successful payment status, type of house boat being "Private", and date range compatibility for both "NightStay" and "OverNight" types.
                Reservations Lookup and Matching: Similar to bookings but for reservations, checking for active reserved status based on similar criteria for both "NightStay" and "OverNight" types.
                Lookup and Grouping for Shared Bookings: Checking for active shared houseboat bookings. Grouping by houseBoatId, calculating total rooms and guests booked, and creating an array of shared houseboat details.
                Unwinding and Adding Fields for Shared Bookings: Extracting fields and calculating the number of rooms and guests booked for shared houseboats.
                Lookup and Grouping for Shared Reservations: Similar to shared bookings but for reservations of shared houseboats.
                Unwinding and Adding Fields for Shared Reservations: Extracting fields and calculating the number of rooms and guests reserved for shared houseboats.
                Final Calculations and Matching: Calculating the available rooms and guests considering the booked/shared rooms and guests, and then matching for the required number of rooms and guests.
                The entire pipeline aims to find available houseboats for a given number of guests and rooms, considering bookings, reservations, and shared bookings/reservations. It filters available houseboats based on the required capacity and availability for the specified date range.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    var getRate = await RateController.CalculateNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }else{
                var includedDates = await getDates(startDateTime,endDateTime)
                if(startDateTime.getTime()>endDateTime.getTime()){
                    res.status(200).json({
                        status:false,
                        msg:"Invalid date selection, Please modify your search and try again."
                    });
                    return;
                }
                const today = new Date();
                const todayYear = today.getFullYear();
                const todayMonth = today.getMonth();
                const todayDate = today.getDate();
                const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
                var dateTocheck = new Date(includedDates[0])
                if (
                    dateTocheck.getFullYear() === todayYear &&
                    dateTocheck.getMonth() === todayMonth &&
                    dateTocheck.getDate() === todayDate &&
                    today.getTime() > today2PM.getTime()
                ){
                    console.log("No Trip For Today")
                    res.status(200).json({
                        status: true,
                        data: [],
                        page: pageNo,
                        limit: dataLimit,
                        totalLength:0,
                        singleboat: true,
                        msg: "success",
                    });
                    return;
                }
                houseBoatQuery.isOverNight = true;
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var houseBoats = await houseBoatModel.aggregate([
                    {$match:houseBoatQuery},
                    {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
                    {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                    {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                    {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                    {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                    {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$tripType","OverNight"]},
                                    { $in: ["Sharing", "$houseBoatType"] }
                                    
                                ]
                            }}
                        }],as:"tripDetails"},
                    },
                    {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                    {$match:{tripDetails:{$exists:true},}},
                    {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                    //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["houseBoatType","Private"]},
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        }],as:"Bookings"},
                    },
                    {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                    {$match:{Bookings:{$exists:false},}},
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                  //  { $eq: ["houseBoatType","Private"]},
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        }],as:"Reservations"},
                    },
                    {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                    {$match:{Reservations:{$exists:false},}},
                    //Check for already Booking in sharing category exist
                    {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$houseBoatType","Sharing"]},
                                    { $eq: ["$status", "Active"] },
                                    { $eq: ["$paymentStatus", "Success"] },
                                    {
                                        $setIsSubset: [ "$bookedDates",includedDates]
                                    },
                                ]
                            }}
                        },{
                            $group: {
                                _id: "$houseBoatId",
                                totalRoomsBooked: {$sum: "$totalRooms"},
                                totalGuestsBooked: {$sum: "$noOfAdults"},
                                sharedHouseboat: {$push: "$$ROOT"}
                            }
                        }],as:"SharedBookings"},
                    },
                    {
                        $addFields: {
                            SharedBookings: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: [[]],
                                    else: "$SharedBookings"
                                }
                            }
                        }
                    },
                    {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
                    {
                        $addFields: {
                            noOfRoomsBookedShared: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: 0,
                                    else: "$SharedBookings.totalRoomsBooked"
                                }
                            },
                            noOfGuestsBookedShared: {
                                $cond: {
                                    if: {$eq: ["$SharedBookings", []]},
                                    then: 0,
                                    else: "$SharedBookings.totalGuestsBooked"
                                }
                            }
                        }
                    },
                    {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                        pipeline: [{
                            $match: {$expr: { 
                                $and: [
                                    { $eq: ["$status", "Active"] },
                                   // { $eq: ["$houseBoatType","Sharing"]},
                                    { $eq: ["$reservationStatus", "Reserved"] },
                                    {
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
                                    },
                                ]
                            }}
                        },{
                            $group: {
                                _id: "$houseBoatId",
                                totalRoomsBooked: {$sum: "$totalRooms"},
                                totalGuestsBooked: {$sum: "$totalGuests"},
                                sharedHouseboat: {$push: "$$ROOT"}
                            }
                        }],as:"SharedReservations"},
                    },
                    {
                        $addFields: {
                            SharedReservations: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: [[]],
                                    else: "$SharedReservations"
                                }
                            }
                        }
                    },
                    {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
                    {
                        $addFields: {
                            noOfRoomsBookedReserved: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: 0,
                                    else: "$SharedReservations.totalRoomsBooked"
                                }
                            },
                            noOfGuestsBookedReserved: {
                                $cond: {
                                    if: {$eq: ["$SharedReservations", []]},
                                    then: 0,
                                    else: "$SharedReservations.totalGuestsBooked"
                                }
                            }
                        }
                    },
                    {
                        $addFields: {
                            noOfRoomsBooked: {
                                $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
                            },
                            noOfGuestsBooked: {
                                $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
                            }
                        }
                    },
                    {
                        $addFields: {
                            totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
                            totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
                        }
                    },
                    // {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
                    // {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

                ])
                /*
                ---------------------CODE EXPLANATION----------------
                Initial Match & Field Addition:Filters houseboats based on the provided query and adds two initial fields for guest and room counts.
                Lookup & Unwinding:Looks up and unwinds sublocationmodels and locationmodels to get the starting location and location details.
                Trip Type Filtering:Matches triptypemodels where the status is Active, tripType is OverNight, and houseBoatType includes Sharing.
                Filters the documents based on maxCapacityOfBoats to accommodate the total number of guests.
                Private Bookings Check:Looks for successful Private houseboat bookings that match the provided bookedDates.
                Private Reservations Check:Searches for Private houseboat reservations that match the provided reservedDates.
                Shared Bookings Lookup:Looks for successful Sharing houseboat bookings that match the provided bookedDates.
                Groups and sums the booked rooms and guests for each houseboat ID.
                Conditional Field Addition for Shared Bookings:Uses $cond to conditionally assign values or an empty array based on whether SharedBookings exists.
                Shared Reservations Lookup:Searches for Sharing houseboat reservations that match the provided reservedDates.
                Groups and sums the reserved rooms and guests for each houseboat ID.
                Conditional Field Addition for Shared Reservations:Similar to Shared Bookings, uses $cond to conditionally assign values or an empty array based on whether SharedReservations exists.
                Calculation of Booked Rooms and Guests:Adds up the booked rooms and guests from Shared Bookings and Reservations.
                Available Rooms and Guest Capacity Calculation:Calculates the available rooms and guests by subtracting booked rooms and guests from the total rooms and maximum guest capacity respectively.
                Final Matching:Filters the houseboats based on the available rooms and guest capacity to ensure it meets the required criteria (numberofRooms and totalGuest).
                This aggregation pipeline checks both private and shared bookings and reservations for available houseboats, considering different criteria, and calculates available rooms and guest capacities for each.
                ---------------------------END-----------------------
                */
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    //Commented the below due to no need to check minimum capacity of boat for first booking
                    // if((houseBoats[i].SharedReservations.length<=0)&&(houseBoats[i].SharedBookings.length<=0)){
                    //     if(houseBoats[i].tripDetails.minCapacityOfBoats>totalGuest){
                    //         continue;
                    //     }
                    // }
                    var getRate = await RateController.CalculateOverNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
                    if(getRate.status == true){
                        houseBoats[i].customerRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }
        }
        res.status(200).json({
            status: true,
            data: result,
            page: pageNo,
            limit: dataLimit,
            totalLength:result.length,
            singleboat: true,
            msg: "success",
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
})

//list the 10 housebaot images
router.get("/houseboat/booking/getlist/old", async (req, res) => {
  try {
    var query = {
      $and: [
        { status: "Active" },
        { houseBoatId: { $exists: true, $ne: null } }
      ]
    };

    var data = await tripPackageModel
      .find(query)
      .populate("houseBoatId")
      .sort("-created_at")
      .limit(10);
    data = data.filter(item => item.houseBoatId !== null && item.status === "Active");
    res.status(200).json({
      status: true,
      data: data,
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
router.get("/houseboat/booking/getlist", async (req, res) => {
  try {
   var query={status:"Active",houseBoatStatus:"Approved",hasPackage:true}
    var data = await houseBoatModel
      .find(query).populate("location")
      .sort("-created_at")
      .limit(10);
    res.status(200).json({
      status: true,
      data: data,
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
router.get("/shikara/booking/getlist", async (req, res) => {
  try {
    var query = { status: "Active", shikaraId: { $exists: true } };

    var data = await tripPackageModel
      .find(query)
      .populate("shikaraId")
      .sort("-created_at")
      .limit(10);

    res.status(200).json({
      status: true,
      data: data,
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
//houseboat single view
router.get("/houseboatbooking/get/old", async (req, res) => {
  try {
    var { id, tripType, children, adult, checkInDate, checkOutDate } =
      req.query;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Id",
      });
      return;
    }
    if (Misc.isnullorempty(tripType)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide tripType",
      });
      return;
    }
    var query = { _id: id, status: "Active" };
    var data = await houseBoatModel
      .findOne(query)
      .populate("location")
      .populate("userid");
    if (Misc.isnullorempty(data)) {
      res.status(200).json({
        status: true,
        msg: "Houseboat not found",
      });
      return;
    }
    var trip = await tripTypeModel.findOne({
      houseBoatId: data._id,
      tripType: tripType,
      status: "Active",
    });
    if (Misc.isnullorempty(trip)) {
      res.status(200).json({
        status: true,
        msg: "Houseboat trip not found",
      });
      return;
    }
    var query2 = { status: "Active", houseBoatId: data._id };
    var query1 = {};
    if (tripType) {
      query1["tripTypeId.tripType"] = tripType;
    }
    //  if(houseBoatType){
    //             query1['tripTypeId.houseBoatType']=houseBoatType;
    // }

    var frm = new Date(checkInDate);
    frm.setHours(0, 0, 0, 0);
    var todt = new Date(checkOutDate);
    todt.setHours(24, 0, 0, 0);
    //query2.startDate = { $gte: frm, $lte: todt };
    query2.startDate={ $lt:todt  };
    query2.endDate= { $gt: frm };
    var filteredPackages = await tripPackageModel.aggregate([
      { $match: query2 },
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
          from: "triptypemodels",
          localField: "tripTypeId",
          foreignField: "_id",
          as: "tripTypeId",
        },
      },
      {
        $unwind: { path: "$tripTypeId", preserveNullAndEmptyArrays: true },
      },
      { $match: query1 },
      {
        $group: {
          _id: "$houseBoatId",
          count: { $sum: 1 },
          items: { $push: "$$ROOT" },
        },
      },
      // { $skip: (pageNo - 1) * dataLimit },
      // { $limit: dataLimit },
    ]);
    var selectedDates = await getDates(frm, todt);
    filteredPackages = JSON.parse(JSON.stringify(filteredPackages));
    console.log("filteredPackages", filteredPackages);
    var totalMemberCount = parseInt(adult) + parseInt(children); //adult+children
    var result = [];
    if (filteredPackages.length > 0) {
      for (var i = 0; i < filteredPackages.length; i++) {
        var noOfDays = selectedDates.length;
        console.log("noOfDays", noOfDays);
        if (filteredPackages[i].items.length == 1) {
          console.log("enter length 1");
          if (
            filteredPackages[i].items[0].tripTypeId.tripType === "DayCriuse"
          ) {
            console.log("first enter");
            filteredPackages[i]._id.customerRate =
              filteredPackages[i]._id.customerRate *
              noOfDays *
              totalMemberCount;
          }
          if (
            filteredPackages[i].items[0].tripTypeId.tripType === "OverNight" ||
            filteredPackages[i].items[0].tripTypeId.tripType === "NightStay"
          ) {
            console.log("second enter");
            var amount =
              filteredPackages[i].items[0].customerRate *
              noOfDays *
              filteredPackages[i]._id.totalRooms;
            console.log(amount, "amount");
            var extrapersonAmount =
              filteredPackages[i].items[0].tripTypeId.extraPersonPerRoom *
              filteredPackages[i].items[0].customerExtraRate *
              noOfDays;
            console.log(extrapersonAmount, "extrapersonAmount");
            filteredPackages[i]._id.customerRate = amount + extrapersonAmount;
            console.log(filteredPackages[i]._id.customerRate, "customerRate");
          }
        } else if (filteredPackages[i].items.length > 1) {
          var specialPackages = [],
            otherPackages = [];
          filteredPackages[i].items = filteredPackages[i].items.map((x) => {
            if (x.packageType == "Special") {
              specialPackages.push(x);
            } else {
              otherPackages.push(x);
            }
            return x;
          });
          var newtotal = 0;
          if (specialPackages.length > 0) {
            console.log("entering specail", specialPackages.length);
            noOfDays = noOfDays - specialPackages.length;
            console.log(specialPackages, "special");
            specialPackages = specialPackages.map((x) => {
              if (
                x.tripTypeId.tripType === "OverNight" ||
                x.tripTypeId.tripType === "NightStay"
              ) {
                var amount =
                  x.customerRate * noOfDays * x.houseBoatId.totalRooms;
                console.log(amount, "amount");
                var extrapersonAmount =
                  x.tripTypeId.extraPersonPerRoom *
                  x.customerExtraRate *
                  noOfDays;
                console.log(extrapersonAmount, "extar persona amount");
                var total = amount + extrapersonAmount;
                newtotal = newtotal + total;
                filteredPackages[i]._id.customerRate = newtotal;
                console.log(filteredPackages[i]._id.customerRate, "CUS***");
              }

              if (x.tripTypeId.tripType === "DayCriuse") {
                x.customerRate = x.customerRate * noOfDays * totalMemberCount;
                filteredPackages[i]._id.customerRate += x.customerRate;
                console.log("day customer", x.customerRate);
              }

              return x;
            });
          }
          if (otherPackages.length > 0) {
            noOfDays = noOfDays - otherPackages.length;
            console.log(otherPackages, "special");
            otherPackages = otherPackages.map((x) => {
              if (
                x.tripTypeId.tripType === "OverNight" ||
                x.tripTypeId.tripType === "NightStay"
              ) {
                var amount =
                  x.customerRate * noOfDays * x.houseBoatId.totalRooms;
                console.log(amount, "amount");
                var extrapersonAmount =
                  x.tripTypeId.extraPersonPerRoom *
                  x.customerExtraRate *
                  noOfDays;
                console.log(extrapersonAmount, "extar persona amount");
                var total = amount + extrapersonAmount;
                newtotal = newtotal + total;
                filteredPackages[i]._id.customerRate = newtotal;
                console.log(filteredPackages[i]._id.customerRate, "CUS***");
              }

              if (x.tripTypeId.tripType === "DayCriuse") {
                x.customerRate = x.customerRate * noOfDays * totalMemberCount;
                filteredPackages[i]._id.customerRate += x.customerRate;
                console.log("day customer", x.customerRate);
              }

              return x;
            });
          }
        }
        result.push(filteredPackages[i]._id);
      }
    }
    var totalCustomerRate = 0;
    for (var i = 0; i < result.length; i++) {
      totalCustomerRate += result[i].customerRate;
    }
    res.status(200).json({
      status: true,
      data: data,
      trip: trip,
      customerRate: totalCustomerRate,
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


router.get('/houseboatbooking/get',async(req,res)=>{
  try{
      var {page,limit,category,houseBoatType,location,tripType,numberofRooms,checkInDate,checkOutDate,children,adult,id} = req.query;
      var pageNo = 1,dataLimit = 20;
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
      if(Misc.isnullorempty(id)){
          res.status(200).json({
              status:false,
              msg:"Invalid house boat details."
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
      if (Misc.isnullorempty(houseBoatType)) {
          res.status(200).json({
              status: false,
              msg: "Please Provide houseBoatType",
          });
          return;
      }
      if (Misc.isnullorempty(location)) {
          res.status(200).json({
              status: false,
              msg: "Please Provide location",
          });
          return;
      }
      if (Misc.isnullorempty(tripType)) {
          res.status(200).json({
              status: false,
              msg: "Please Provide tripType",
          });
          return;
      }
      if (Misc.isnullorempty(numberofRooms)) {
          res.status(200).json({
              status: false,
              msg: "Please Provide numberofRooms",
          });
          return;
      }
      if (typeof numberofRooms != 'number'){
          numberofRooms=parseInt(numberofRooms)
      }
      if(numberofRooms<=0){
          res.status(200).json({
              status:false,
              msg:"Number of rooms should be greater than zero."
          });
          return;
      }
      if(numberofRooms>=50){
          res.status(200).json({
              status:false,
              msg:"Please select a valid number of rooms."
          });
          return;
      }
      if (Misc.isnullorempty(checkInDate)) {
          res.status(200).json({
              status: false,
              msg: "Please Provide checkInDate",
          });
          return;
      }
      if (Misc.isnullorempty(checkOutDate)) {
          res.status(200).json({
              status: false,
              msg: "Please Provide checkOutDate",
          });
          return;
      }
      if (Misc.isnullorempty(adult)) {
          res.status(200).json({
              status: false,
              msg: "Please Provide adult",
          });
          return;
      }
      if(typeof adult != 'number'){
          adult = parseInt(adult);
      }
      if(adult<=0){
          res.status(200).json({
              status:false,
              msg:"Please select atleast one adult guest."
          });
          return;
      }
      if(Misc.isnullorempty(children)){
          children = 0
      }else{
          children = parseInt(children)
      }
      if(children<0){
          res.status(200).json({
              status:false,
              msg:"Number of students should be a postive number."
          });
          return;
      }
      var totalGuest = adult;
      
      var startDateTime = new Date(checkInDate);
      var endDateTime = new Date(checkOutDate);
      var includedDates = await getDates(startDateTime,endDateTime)
      if(startDateTime.getTime()>endDateTime.getTime()){
          res.status(200).json({
              status:false,
              msg:"Invalid date selection, Please modify your search and try again."
          });
          return;
      }
      var result = []
      var houseBoatQuery = { status: "Active", houseBoatStatus: "Approved", location: new mongoose.Types.ObjectId(location), category: category, _id: new mongoose.Types.ObjectId(id) };
      if (houseBoatType === "Private") {
          if (tripType == "DayCruise") {
              houseBoatQuery.totalRooms = { $gte: numberofRooms }
              var includedDates = await getDatesFiltered(startDateTime, endDateTime)
              const today = new Date();
            //   const eightDaysAhead = new Date(today);
            //   eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
              // if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
              //     console.log("In 8 Days")//If out side 8 days error shoud be generated
              //     res.status(200).json({
              //         status: false,
              //         msg: "Please refresh your page..........",
              //     });
              //     return;
              // }
              const todayYear = today.getFullYear();
              const todayMonth = today.getMonth();
              const todayDate = today.getDate();
              const today1PM = new Date(todayYear, todayMonth, todayDate, 13, 0, 0);
              var dateToCheck = new Date(includedDates[0]);
              //In day cruis if we are searching for today as start date we should check if it the current time is grater than 1PM error should be generated
              if (
                  dateToCheck.getFullYear() === todayYear &&
                  dateToCheck.getMonth() === todayMonth &&
                  dateToCheck.getDate() === todayDate &&
                  today.getTime() > today1PM.getTime()
              ){
                  console.log("No Trip For Today")
                  //Today trip start time is over ,Trip is already started
                  res.status(200).json({
                      status: false,
                      msg: "Please refresh your page..........",
                  });
                  return;
              }
              houseBoatQuery.isDayCriuse = true;
              var houseBoats = await houseBoatModel.aggregate([
                  { $match: houseBoatQuery },
                  { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                  { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                  { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                  { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                  { $lookup: { from: "usermodels", localField: "userid", foreignField: "_id", as: "userid", }, },
                  { $unwind: { "path": "$userid", preserveNullAndEmptyArrays: true } },
                  {
                      $lookup: {
                          from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$status", "Active"] },
                                          { $eq: ["$tripType", "DayCruise"] },
                                          { $in: ["Private", "$houseBoatType"] }
                                      ]
                                  }
                              }
                          }], as: "tripDetails"
                      },
                  },
                  { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                  { $match: { tripDetails: { $exists: true }, } },
                  { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
                  { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
                  {
                      $lookup: {
                          from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$status", "Active"] },
                                          {
                                              $or: [
                                                  { $eq: ["$tripType", "DayCruise"] },
                                                  { $eq: ["$tripType", "OverNight"] }
                                              ]
                                          },
                                          { $eq: ["$paymentStatus", "Success"] },
                                          {
                                              $setIsSubset: ["$bookedDates", includedDates]
                                          },
                                      ]
                                  }
                              }
                          }], as: "Bookings"
                      },
                  },
                  { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                  { $match: { Bookings: { $exists: false }, } },
                  {
                      $lookup: {
                          from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$status", "Active"] },
                                          {
                                              $or: [
                                                  { $eq: ["$tripType", "DayCruise"] },
                                                  { $eq: ["$tripType", "OverNight"] }
                                              ]
                                          },
                                          { $eq: ["$reservationStatus", "Reserved"] },
                                          {
                                              $setIsSubset: [includedDates, "$reservedDates"]
                                          },
                                      ]
                                  }
                              }
                          }], as: "Reservations"
                      },
                  },
                  { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                  { $match: { Reservations: { $exists: false }, } },
                  //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
              ])
              console.log(houseBoats)
              houseBoats = JSON.parse(JSON.stringify(houseBoats))
              for (var i = 0; i < houseBoats.length; i++) {
                  var getRate = await RateController.CalculateDayCruisRate(houseBoats[i], includedDates, totalGuest)
                  if (getRate.status == true) {
                      houseBoats[i].customerRate = getRate.rate;
                      houseBoats[i].customerRateCommission = getRate.commissionAmount;
                      result.push(houseBoats[i])
                  }
              }
          } else if (tripType == "NightStay") {
              var includedDates = await getDates(startDateTime, endDateTime)
              if (startDateTime.getTime() > endDateTime.getTime()) {
                  res.status(200).json({
                      status: false,
                      msg: "Invalid date selection, Please modify your search and try again."
                  });
                  return;
              }
              const today = new Date();
              const eightDaysAhead = new Date(today);
              eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
              if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                  console.log("In 8 Days")//If out side 8 days error shoud be generated
                  res.status(200).json({
                      status: false,
                      msg: "Please refresh your page..........",
                  });
                  return;
              }
              const todayYear = today.getFullYear();
              const todayMonth = today.getMonth();
              const todayDate = today.getDate();
              const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
              var dateTocheck = new Date(includedDates[0])
              if (
                  dateTocheck.getFullYear() === todayYear &&
                  dateTocheck.getMonth() === todayMonth &&
                  dateTocheck.getDate() === todayDate &&
                  today.getTime() > today11PM.getTime()
              ){
                  console.log("No Trip For Today")
                  res.status(200).json({
                      status: false,
                      msg: "Please refresh your page..........",
                  });
                  return;
              }
              houseBoatQuery.isNightStay = true;
              houseBoatQuery.totalRooms = { $gte: numberofRooms }
              var houseBoats = await houseBoatModel.aggregate([
                  { $match: houseBoatQuery },
                  { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                  { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                  { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                  { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                  { $lookup: { from: "usermodels", localField: "userid", foreignField: "_id", as: "userid", }, },
                  { $unwind: { "path": "$userid", preserveNullAndEmptyArrays: true } },
                  {
                      $lookup: {
                          from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$status", "Active"] },
                                          { $eq: ["$tripType", "NightStay"] },
                                          { $in: ["Private", "$houseBoatType"] }
                                      ]
                                  }
                              }
                          }], as: "tripDetails"
                      },
                  },
                  { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                  { $match: { tripDetails: { $exists: true }, } },
                  { $match: { "tripDetails.maxCapacityOfBoats": { $gte: totalGuest } } },
                  { $match: { "tripDetails.minCapacityOfBoats": { $lte: totalGuest } } },
                  {
                      $lookup: {
                          from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$tripType", "NightStay"] },
                                          { $eq: ["$status", "Active"] },
                                          { $eq: ["$paymentStatus", "Success"] },
                                          {
                                              $or: [{
                                                  $and: [
                                                      { $eq: ["$tripType", "NightStay"] },
                                                      { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$endDate", startDateTime] }] }]
                                              },
                                              {
                                                  $and: [
                                                      { $eq: ["$tripType", "OverNight"] },
                                                      { $and: [{ $lte: ["$endDateTime", "$endDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
                                              },
                                              ]
                                          }
                                      ]
                                  }
                              }
                          }], as: "Bookings"
                      },
                  },
                  { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                  { $match: { Bookings: { $exists: false }, } },
                  {
                      $lookup: {
                          from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$tripType", "NightStay"] },
                                          { $eq: ["$status", "Active"] },
                                          { $eq: ["$reservationStatus", "Reserved"] },
                                          {
                                              $or: [{
                                                  $and: [
                                                      { $eq: ["$tripType", "NightStay"] },
                                                      { $and: [{ $lte: ["$startDate", endDateTime] }, { $gte: ["$checkOutDate", startDateTime] }] }]
                                              },
                                              {
                                                  $and: [
                                                      { $eq: ["$tripType", "OverNight"] },
                                                      { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] }, { $gte: ["$startDateTime", "$startDate"] }] }]
                                              },
                                              ]
                                          }
                                      ]
                                  }
                              }
                          }], as: "Reservations"
                      },
                  },
                  { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                  { $match: { Reservations: { $exists: false }, } },
                  {
                      $lookup: {
                          from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$status", "Active"] },
                                          { $eq: ["$paymentStatus", "Success"] },
                                          { $eq: ["$tripType", "DayCruise"] },
                                          {
                                              $setIsSubset: [includedDates, "$bookedDates"]
                                          }
                                      ]
                                  }
                              }
                          }], as: "DayBookings"
                      },
                  },
                  { $unwind: { "path": "$DayBookings", preserveNullAndEmptyArrays: true } },
                  {
                      $lookup: {
                          from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$status", "Active"] },
                                          { $eq: ["$reservationStatus", "Reserved"] },
                                          { $eq: ["$tripType", "DayCruise"] },
                                          {
                                              $setIsSubset: [includedDates, "$reservedDates"]
                                          },
                                      ]
                                  }
                              }
                          }], as: "DayReservations"
                      },
                  },
                  { $unwind: { "path": "$DayReservations", preserveNullAndEmptyArrays: true } },
                  { $match: { $or: [{ DayBookings: { $exists: true } }, { DayReservations: { $exists: true } }] } }
              ])
              console.log(houseBoats)
              houseBoats = JSON.parse(JSON.stringify(houseBoats))
              for (var i = 0; i < houseBoats.length; i++) {
                  if ((Misc.isnullorempty(houseBoats[i].DayBookings)) && (Misc.isnullorempty(houseBoats[i].DayReservations))) {
                      continue;
                  }
                  var getRate = await RateController.CalculateNightStayRate(houseBoats[i], includedDates, totalGuest)
                  if (getRate.status == true) {
                      houseBoats[i].customerRate = getRate.rate;
                      houseBoats[i].customerRateCommission = getRate.commissionAmount;
                      result.push(houseBoats[i])
                  }
              }
          } else {
              var includedDates = await getDates(startDateTime, endDateTime)
              if (startDateTime.getTime() > endDateTime.getTime()) {
                  res.status(200).json({
                      status: false,
                      msg: "Invalid date selection, Please modify your search and try again."
                  });
                  return;
              }
              const today = new Date();
              const todayYear = today.getFullYear();
              const todayMonth = today.getMonth();
              const todayDate = today.getDate();
              const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
              var dateTocheck = new Date(includedDates[0])
              if (
                  dateTocheck.getFullYear() === todayYear &&
                  dateTocheck.getMonth() === todayMonth &&
                  dateTocheck.getDate() === todayDate &&
                  today.getTime() > today2PM.getTime()
              ){
                  console.log("No Trip For Today")
                  res.status(200).json({
                      status: false,
                      msg: "Please refresh your page..........",
                  });
                  return;
              }
              houseBoatQuery.isOverNight = true;
              houseBoatQuery.totalRooms = { $gte: numberofRooms }
              var houseBoats = await houseBoatModel.aggregate([
                  { $match: houseBoatQuery },
                  { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                  { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                  { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                  { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                  { $lookup: { from: "usermodels", localField: "userid", foreignField: "_id", as: "userid", }, },
                  { $unwind: { "path": "$userid", preserveNullAndEmptyArrays: true } },
                  {
                      $lookup: {
                          from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$status", "Active"] },
                                          { $eq: ["$tripType", "OverNight"] },
                                          { $in: ["Private", "$houseBoatType"] }

                                      ]
                                  }
                              }
                          }], as: "tripDetails"
                      },
                  },
                  { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                  { $match: { tripDetails: { $exists: true }, } },
                  { $match: { "tripDetails.maxCapacityOfBoats": { $gte: totalGuest } } },
                  { $match: { "tripDetails.minCapacityOfBoats": { $lte: totalGuest } } },
                  {
                      $lookup: {
                          from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$status", "Active"] },
                                          { $eq: ["$paymentStatus", "Success"] },
                                          {
                                              $setIsSubset: ["$bookedDates", includedDates]
                                          },
                                      ]
                                  }
                              }
                          }], as: "Bookings"
                      },
                  },
                  { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                  { $match: { Bookings: { $exists: false }, } },
                  {
                      $lookup: {
                          from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                          pipeline: [{
                              $match: {
                                  $expr: {
                                      $and: [
                                          { $eq: ["$status", "Active"] },
                                          { $eq: ["$reservationStatus", "Reserved"] },
                                          {
                                              $setIsSubset: [includedDates, "$reservedDates"]
                                          },
                                      ]
                                  }
                              }
                          }], as: "Reservations"
                      },
                  },
                  { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                  { $match: { Reservations: { $exists: false }, } },
              ])
              houseBoats = JSON.parse(JSON.stringify(houseBoats))
              for (var i = 0; i < houseBoats.length; i++) {
                  var getRate = await RateController.CalculateOverNightStayRate(houseBoats[i], includedDates, totalGuest)
                  if (getRate.status == true) {
                      houseBoats[i].customerRate = getRate.rate;
                      houseBoats[i].customerRateCommission = getRate.commissionAmount;
                      result.push(houseBoats[i])
                  }
              }
          }
      }else{
          if(tripType == "DayCruise"){
              houseBoatQuery.totalRooms = {$gte:numberofRooms}
              var includedDates = await getDatesFiltered(startDateTime,endDateTime)
              const today = new Date();
            //   const eightDaysAhead = new Date(today);
            //   eightDaysAhead.setDate(today.getDate() + 8);
              // if(includedDates[0]>eightDaysAhead){
              //     console.log("In 8 Days")
              //     res.status(200).json({
              //         status: false,
              //         msg: "Please refresh your page..........",
              //     });
              //     return;
              // }
              const todayYear = today.getFullYear();
              const todayMonth = today.getMonth();
              const todayDate = today.getDate();
              const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
              var dateToCheck = new Date(includedDates[0])
              if (
                  dateToCheck.getFullYear() === todayYear &&
                  dateToCheck.getMonth() === todayMonth &&
                  dateToCheck.getDate() === todayDate &&
                  today.getTime() > today1PM.getTime()
              ){
                  console.log("No Trip For Today")
                  res.status(200).json({
                      status: false,
                      msg: "Please refresh your page..........",
                  });
                  return;
              }
              houseBoatQuery.isDayCriuse = true;
              var houseBoats = await houseBoatModel.aggregate([
                  {$match:houseBoatQuery},
                  {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                  {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                  {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                  {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                  {$lookup: { from: "usermodels", localField: "userid", foreignField: "_id", as: "userid", }, },
                  {$unwind: { "path": "$userid", preserveNullAndEmptyArrays: true } },
                  {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$tripType","DayCruise"]},
                                  { $in: ["Sharing", "$houseBoatType"] }
                              ]
                          }}
                      }],as:"tripDetails"},
                  },
                  {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                  {$match:{tripDetails:{$exists:true},}},
                  {$match:{"tripDetails.maxPersonTrips":{$gte:totalGuest}}},
                  {$match:{"tripDetails.minPersonTrips":{$lte:totalGuest}}},
                  {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  {
                                      $or: [
                                        { $eq: ["$tripType", "DayCruise"] },
                                        { $eq: ["$tripType", "OverNight"] }
                                      ]
                                  },
                                  { $eq: ["$paymentStatus", "Success"] },
                                  {
                                      $setIsSubset: [ "$bookedDates",includedDates]
                                  },
                              ]
                          }}
                      }],as:"Bookings"},
                  },
                  {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                  {$match:{Bookings:{$exists:false},}},
                  {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  {
                                      $or: [
                                        { $eq: ["$tripType", "DayCruise"] },
                                        { $eq: ["$tripType", "OverNight"] }
                                      ]
                                  },
                                  { $eq: ["$reservationStatus", "Reserved"] },
                                  {
                                      $setIsSubset: [ includedDates,"$reservedDates"]
                                  },
                              ]
                          }}
                      }],as:"Reservations"},
                  },
                  {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                  {$match:{Reservations:{$exists:false},}},
                  //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
              ])
              console.log(houseBoats)
              result = [];
          }else if(tripType == "NightStay"){
              var includedDates = await getDates(startDateTime,endDateTime)
              if(startDateTime.getTime()>endDateTime.getTime()){
                  res.status(200).json({
                      status:false,
                      msg:"Invalid date selection, Please modify your search and try again."
                  });
                  return;
              }
              if(startDateTime.getTime()>endDateTime.getTime()){
                  res.status(200).json({
                      status:false,
                      msg:"Invalid date selection, Please modify your search and try again."
                  });
                  return;
              }
              const today = new Date();
              const eightDaysAhead = new Date(today);
              eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
              if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                  console.log("In 8 Days")//If out side 8 days error shoud be generated
                  res.status(200).json({
                      status: false,
                      msg: "Please refresh your page..........",
                  });
                  return;
              }
              const todayYear = today.getFullYear();
              const todayMonth = today.getMonth();
              const todayDate = today.getDate();
              const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
              var dateTocheck = new Date(includedDates[0])
              if (
                  dateTocheck.getFullYear() === todayYear &&
                  dateTocheck.getMonth() === todayMonth &&
                  dateTocheck.getDate() === todayDate &&
                  today.getTime() > today11PM.getTime()
              ){
                  console.log("No Trip For Today")
                  res.status(200).json({
                      status: false,
                      msg: "Please refresh your page..........",
                  });
                  return;
              }
              houseBoatQuery.isNightStay = true;
              houseBoatQuery.totalRooms = {$gte:numberofRooms}
              var houseBoats = await houseBoatModel.aggregate([
                  {$match:houseBoatQuery},
                  {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
                  {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                  {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                  {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                  {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                  {$lookup: { from: "usermodels", localField: "userid", foreignField: "_id", as: "userid", }, },
                  {$unwind: { "path": "$userid", preserveNullAndEmptyArrays: true } },
                  {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$tripType","NightStay"]},
                                  { $in: ["Sharing", "$houseBoatType"] }
                              ]
                          }}
                      }],as:"tripDetails"},
                  },
                  {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                  {$match:{tripDetails:{$exists:true},}},
                  {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                  //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                  {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$tripType", "NightStay"] },
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$houseBoatType","Private"]},
                                  { $eq: ["$paymentStatus", "Success"] },
                                  {
                                      $or: [{
                                          $and: [
                                              { $eq: ["$tripType", "NightStay"] },
                                              { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                          },
                                          {
                                          $and: [
                                              { $eq: ["$tripType", "OverNight"] },
                                              { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                          },
                                      ]
                                  }
                              ]
                          }}
                      }],as:"Bookings"},
                  },
                  {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                  {$match:{Bookings:{$exists:false},}},
                  {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$tripType", "NightStay"] },
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$houseBoatType","Private"]},
                                  { $eq: ["$reservationStatus", "Reserved"] },
                                  {
                                      $or: [{
                                          $and: [
                                              { $eq: ["$tripType", "NightStay"] },
                                              { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                          },
                                          {
                                          $and: [
                                              { $eq: ["$tripType", "OverNight"] },
                                              { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                          },
                                      ]
                                  }
                              ]
                          }}
                      }],as:"Reservations"},
                  },
                  {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                  {$match:{Reservations:{$exists:false},}},
                  {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$paymentStatus", "Success"] },
                                  //{ $eq: ["$houseBoatType","Sharing"]},
                                  { $eq: ["$tripType", "DayCruise"] },
                                  {
                                      $setIsSubset: [includedDates, "$bookedDates"]
                                  }
                              ]
                          }}
                      }],as:"DayBookings"},
                  },
                  {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                  {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$reservationStatus", "Reserved"] },
                                  //{ $eq: ["$houseBoatType","Sharing"]},
                                  { $eq: ["$tripType", "DayCruise"] },
                                  {
                                      $setIsSubset: [includedDates,"$reservedDates" ]
                                  },
                              ]
                          }}
                      }],as:"DayReservations"},
                  },
                  {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
                  {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
                  //Check for already Booking in sharing category exists
                  {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$houseBoatType","NightStay"]},
                                  { $eq: ["$houseBoatType","Sharing"]},
                                  { $eq: ["$paymentStatus", "Success"] },
                                  {
                                      $setIsSubset: [ "$bookedDates",includedDates]
                                  },
                              ]
                          }}
                      },{
                          $group: {
                              _id: "$houseBoatId",
                              totalRoomsBooked: {$sum: "$totalRooms"},
                              totalGuestsBooked: {$sum: "$noOfAdults"},
                              sharedHouseboat: {$push: "$$ROOT"}
                          }
                      }],as:"SharedBookings"},
                  },
                  {
                      $addFields: {
                          SharedBookings: {
                              $cond: {
                                  if: {$eq: ["$SharedBookings", []]},
                                  then: [[]],
                                  else: "$SharedBookings"
                              }
                          }
                      }
                  },
                  {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
                  {
                      $addFields: {
                          noOfRoomsBookedShared: {
                              $cond: {
                                  if: {$eq: ["$SharedBookings", []]},
                                  then: 0,
                                  else: "$SharedBookings.totalRoomsBooked"
                              }
                          },
                          noOfGuestsBookedShared: {
                              $cond: {
                                  if: {$eq: ["$SharedBookings", []]},
                                  then: 0,
                                  else: "$SharedBookings.totalGuestsBooked"
                              }
                          }
                      }
                  },
                  {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$houseBoatType","Sharing"]},
                                  { $eq: ["$reservationStatus", "Reserved"] },
                                  {
                                      $setIsSubset: [ includedDates,"$reservedDates"]
                                  },
                              ]
                          }}
                      },{
                          $group: {
                              _id: "$houseBoatId",
                              totalRoomsBooked: {$sum: "$totalRooms"},
                              totalGuestsBooked: {$sum: "$totalGuests"},
                              sharedHouseboat: {$push: "$$ROOT"}
                          }
                      }],as:"SharedReservations"},
                  },
                  {
                      $addFields: {
                          SharedReservations: {
                              $cond: {
                                  if: {$eq: ["$SharedReservations", []]},
                                  then: [[]],
                                  else: "$SharedReservations"
                              }
                          }
                      }
                  },
                  {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
                  {
                      $addFields: {
                          noOfRoomsBookedReserved: {
                              $cond: {
                                  if: {$eq: ["$SharedReservations", []]},
                                  then: 0,
                                  else: "$SharedReservations.totalRoomsBooked"
                              }
                          },
                          noOfGuestsBookedReserved: {
                              $cond: {
                                  if: {$eq: ["$SharedReservations", []]},
                                  then: 0,
                                  else: "$SharedReservations.totalGuestsBooked"
                              }
                          }
                      }
                  },
                  {
                      $addFields: {
                          noOfRoomsBooked: {
                              $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
                          },
                          noOfGuestsBooked: {
                              $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
                          }
                      }
                  },
                  {
                      $addFields: {
                          totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
                          totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
                      }
                  },
                  {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
                  {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

              ])
              console.log("House Boat On Sharing On Night Stay ",houseBoats.length)
              houseBoats = JSON.parse(JSON.stringify(houseBoats))
              for(var i=0;i<houseBoats.length;i++){
                  // if((houseBoats[i].SharedReservations.length<=0)&&(houseBoats[i].SharedBookings.length<=0)){
                  //     if(houseBoats[i].tripDetails.minCapacityOfBoats>totalGuest){
                  //         continue;
                  //     }
                  // }
                  var getRate = await RateController.CalculateNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
                  if(getRate.status == true){
                      houseBoats[i].customerRate = getRate.rate;
                      houseBoats[i].customerRateCommission = getRate.commissionAmount;
                      result.push(houseBoats[i])
                  }
              }
          }else{
              var includedDates = await getDates(startDateTime,endDateTime)
              if(startDateTime.getTime()>endDateTime.getTime()){
                  res.status(200).json({
                      status:false,
                      msg:"Invalid date selection, Please modify your search and try again."
                  });
                  return;
              }
              const today = new Date();
              const todayYear = today.getFullYear();
              const todayMonth = today.getMonth();
              const todayDate = today.getDate();
              const today2PM = new Date(todayYear, todayMonth, todayDate, 14, 0, 0);
              var dateTocheck = new Date(includedDates[0])
              if (
                  dateTocheck.getFullYear() === todayYear &&
                  dateTocheck.getMonth() === todayMonth &&
                  dateTocheck.getDate() === todayDate &&
                  today.getTime() > today2PM.getTime()
              ){
                  console.log("No Trip For Today")
                  res.status(200).json({
                      status: false,
                      msg: "Please refresh your page..........",
                  });
                  return;
              }
              houseBoatQuery.isOverNight = true;
              houseBoatQuery.totalRooms = {$gte:numberofRooms}
              var houseBoats = await houseBoatModel.aggregate([
                  {$match:houseBoatQuery},
                  {$addFields: {noOfGuestsBooked: 0,noOfRoomsBooked: 0}},
                  {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                  {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                  {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                  {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                  { $lookup: { from: "usermodels", localField: "userid", foreignField: "_id", as: "userid", }, },
                  { $unwind: { "path": "$userid", preserveNullAndEmptyArrays: true } },
                  {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$tripType","OverNight"]},
                                  { $in: ["Sharing", "$houseBoatType"] }
                                  
                              ]
                          }}
                      }],as:"tripDetails"},
                  },
                  {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                  {$match:{tripDetails:{$exists:true},}},
                  {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                  //{$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                  {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["houseBoatType","Private"]},
                                  { $eq: ["$paymentStatus", "Success"] },
                                  {
                                      $setIsSubset: [ "$bookedDates",includedDates]
                                  },
                              ]
                          }}
                      }],as:"Bookings"},
                  },
                  {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                  {$match:{Bookings:{$exists:false},}},
                  {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["houseBoatType","Private"]},
                                  { $eq: ["$reservationStatus", "Reserved"] },
                                  {
                                      $setIsSubset: [ includedDates,"$reservedDates"]
                                  },
                              ]
                          }}
                      }],as:"Reservations"},
                  },
                  {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                  {$match:{Reservations:{$exists:false},}},
                  //Check for already Booking in sharing category exist
                  {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["houseBoatType","Sharing"]},
                                  { $eq: ["$paymentStatus", "Success"] },
                                  {
                                      $setIsSubset: [ "$bookedDates",includedDates]
                                  },
                              ]
                          }}
                      },{
                          $group: {
                              _id: "$houseBoatId",
                              totalRoomsBooked: {$sum: "$totalRooms"},
                              totalGuestsBooked: {$sum: "$noOfAdults"},
                              sharedHouseboat: {$push: "$$ROOT"}
                          }
                      }],as:"SharedBookings"},
                  },
                  {
                      $addFields: {
                          SharedBookings: {
                              $cond: {
                                  if: {$eq: ["$SharedBookings", []]},
                                  then: [[]],
                                  else: "$SharedBookings"
                              }
                          }
                      }
                  },
                  {$unwind:{"path":"$SharedBookings", preserveNullAndEmptyArrays: true }},
                  {
                      $addFields: {
                          noOfRoomsBookedShared: {
                              $cond: {
                                  if: {$eq: ["$SharedBookings", []]},
                                  then: 0,
                                  else: "$SharedBookings.totalRoomsBooked"
                              }
                          },
                          noOfGuestsBookedShared: {
                              $cond: {
                                  if: {$eq: ["$SharedBookings", []]},
                                  then: 0,
                                  else: "$SharedBookings.totalGuestsBooked"
                              }
                          }
                      }
                  },
                  {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                      pipeline: [{
                          $match: {$expr: { 
                              $and: [
                                  { $eq: ["$status", "Active"] },
                                  { $eq: ["$houseBoatType","Sharing"]},
                                  { $eq: ["$reservationStatus", "Reserved"] },
                                  {
                                      $setIsSubset: [ includedDates,"$reservedDates"]
                                  },
                              ]
                          }}
                      },{
                          $group: {
                              _id: "$houseBoatId",
                              totalRoomsBooked: {$sum: "$totalRooms"},
                              totalGuestsBooked: {$sum: "$totalGuests"},
                              sharedHouseboat: {$push: "$$ROOT"}
                          }
                      }],as:"SharedReservations"},
                  },
                  {
                      $addFields: {
                          SharedReservations: {
                              $cond: {
                                  if: {$eq: ["$SharedReservations", []]},
                                  then: [[]],
                                  else: "$SharedReservations"
                              }
                          }
                      }
                  },
                  {$unwind:{"path":"$SharedReservations", preserveNullAndEmptyArrays: true }},
                  {
                      $addFields: {
                          noOfRoomsBookedReserved: {
                              $cond: {
                                  if: {$eq: ["$SharedReservations", []]},
                                  then: 0,
                                  else: "$SharedReservations.totalRoomsBooked"
                              }
                          },
                          noOfGuestsBookedReserved: {
                              $cond: {
                                  if: {$eq: ["$SharedReservations", []]},
                                  then: 0,
                                  else: "$SharedReservations.totalGuestsBooked"
                              }
                          }
                      }
                  },
                  {
                      $addFields: {
                          noOfRoomsBooked: {
                              $add: ["$noOfRoomsBookedShared", "$noOfRoomsBookedReserved"]
                          },
                          noOfGuestsBooked: {
                              $add: ["$noOfGuestsBookedShared", "$noOfGuestsBookedReserved"]
                          }
                      }
                  },
                  {
                      $addFields: {
                          totalRoomsAvailable: { $subtract: ["$totalRooms", "$noOfRoomsBooked"] },
                          totalGuestsCanAccomadated: { $subtract: ["$tripDetails.maxCapacityOfBoats", "$noOfGuestsBooked"] }
                      }
                  },
                  {$match:{"totalRoomsAvailable":{$gte:numberofRooms}}},
                  {$match:{"totalGuestsCanAccomadated":{$gte:totalGuest}}},

              ])
              console.log("House boat for for overnight sharing ",houseBoats.length)
              houseBoats = JSON.parse(JSON.stringify(houseBoats))
              for(var i=0;i<houseBoats.length;i++){
                  var getRate = await RateController.CalculateOverNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
                  if(getRate.status == true){
                      houseBoats[i].customerRate = getRate.rate;
                      houseBoats[i].customerRateCommission = getRate.commissionAmount;
                      result.push(houseBoats[i])
                  }
              }
          }
      }
      if (result.length <= 0) {
          res.status(200).json({
              status:false,
              msg:"Please refresh page.........."
          });
          return;
      }
      var reviewData=await reviewModel.find({houseBoatId:id,status:"Active"}).populate("user").limit(5).sort({created_at:-1})
      res.status(200).json({
          status: true,
          customerRate:result[0].customerRate,
          customerRateCommission:result[0].customerRateCommission,
          data: result[0],
          tripDetails:result[0].tripDetails,
          page: pageNo,
          limit: dataLimit,
          // totalLength:result.length,
          reviews:reviewData,
          singleboat: true,
          msg: "success",
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
})
//multiple houseboat view
// router.get("/houseboatbooking/multiple/view/old", async (req, res) => {
//   try {
//       var {id,tripType,category,houseBoatType,location,numberofRooms,checkInDate,checkOutDate,children,adult} = req.query;
//       if (!Array.isArray(id)) {
//               res.status(200).json({
//               status: false,
//               msg: "Id must be an array",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(tripType)) {
//           res.status(200).json({
//               status: true,
//               msg: "Please Provide  Trip Type",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(category)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide Category",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(houseBoatType)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide houseBoatType",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(location)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide location",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(tripType)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide tripType",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(numberofRooms)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide numberofRooms",
//           });
//           return;
//       }
//       if (typeof numberofRooms != 'number'){
//           numberofRooms=parseInt(numberofRooms)
//       }
//       if(numberofRooms<=0){
//           res.status(200).json({
//               status:false,
//               msg:"Number of rooms should be greater than zero."
//           });
//           return;
//       }
//       if(numberofRooms>=50){
//           res.status(200).json({
//               status:false,
//               msg:"Please select a valid number of rooms."
//           });
//           return;
//       }
//       if (Misc.isnullorempty(checkInDate)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide checkInDate",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(checkOutDate)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide checkOutDate",
//           });
//           return;
//       }
//       if (Misc.isnullorempty(adult)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please Provide adult",
//           });
//           return;
//       }
//       if(typeof adult != 'number'){
//           adult = parseInt(adult);
//       }
//       if(adult<=0){
//           res.status(200).json({
//               status:false,
//               msg:"Please select atleast one adult guest."
//           });
//           return;
//       }
//       if(Misc.isnullorempty(children)){
//           children = 0
//       }else{
//           children = parseInt(children)
//       }
//       if(children<0){
//           res.status(200).json({
//               status:false,
//               msg:"Number of students should be a postive number."
//           });
//           return;
//       }
//       var totalGuest = adult;
//       var startDateTime = new Date(checkInDate);
//       var endDateTime = new Date(checkOutDate);
//       var includedDates = await getDates(startDateTime,endDateTime)
//       if(startDateTime.getTime()>endDateTime.getTime()){
//           res.status(200).json({
//               status:false,
//               msg:"Invalid date selection, Please modify your search and try again."
//           });
//           return;
//       }
//       var result = []
//       var ids = await id.map(x=>new mongoose.Types.ObjectId(x))
//       var houseBoatQueryMultiple = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category,_id:{$in:ids} };
//       if (houseBoatType === "Private") {
//         if (tripType == "DayCruise") {
//           //houseBoatQuery.totalRooms = { $gte: numberofRooms }
//           var includedDates = await getDatesFiltered(startDateTime, endDateTime)
//           houseBoatQueryMultiple.isDayCriuse = true;
//           const today = new Date();
//         //   const eightDaysAhead = new Date(today);
//         //   eightDaysAhead.setDate(today.getDate() + 8);
//         //   if (includedDates[0] > eightDaysAhead) {
//         //       console.log("In 8 Days")
//         //       res.status(200).json({
//         //           status: false,
//         //           msg: "Please refresh your page..........",
//         //       });
//         //       return;
//         //   }
//           const todayYear = today.getFullYear();
//           const todayMonth = today.getMonth();
//           const todayDate = today.getDate();
//           const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
//           var dateToCheck = new Date(includedDates[0]);
//           if (dateToCheck.getFullYear() === todayYear && dateToCheck.getMonth() === todayMonth && dateToCheck.getDate() === todayDate && today.getTime() > today1PM.getTime()) {
//               console.log("No Trip For Today")
//               res.status(200).json({
//                   status: false,
//                   msg: "Please refresh your page..........",
//               });
//               return;
//           }
//           var vendorGroup = await houseBoatModel.aggregate([
//               { $match: houseBoatQueryMultiple },
//               { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//               { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//               { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//               { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//               {$lookup: {from: "usermodels",localField: "userid",foreignField: "_id",as: "userid",},},
//               {$unwind: {"path":"$userid", preserveNullAndEmptyArrays: true }},
//               {
//                   $lookup: {
//                       from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                       pipeline: [{
//                           $match: {
//                               $expr: {
//                                   $and: [
//                                       { $eq: ["$status", "Active"] },
//                                       { $eq: ["$tripType", "DayCruise"] },
//                                       { $in: ["Private", "$houseBoatType"] }
//                                   ]
//                               }
//                           }
//                       }], as: "tripDetails"
//                   },
//               },
//               { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//               { $match: { tripDetails: { $exists: true }, } },
//               // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
//               { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
//                { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
//               {
//                   $lookup: {
//                       from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                       pipeline: [{
//                           $match: {
//                               $expr: {
//                                   $and: [
//                                       { $eq: ["$status", "Active"] },
//                                       {
//                                           $or: [
//                                               { $eq: ["$tripType", "DayCruise"] },
//                                               { $eq: ["$tripType", "OverNight"] }
//                                           ]
//                                       },
//                                       { $eq: ["$paymentStatus", "Success"] },
//                                       {
//                                           $setIsSubset: ["$bookedDates", includedDates]
//                                       },
//                                   ]
//                               }
//                           }
//                       }], as: "Bookings"
//                   },
//               },
//               { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//               { $match: { Bookings: { $exists: false }, } },
//               {
//                   $lookup: {
//                       from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                       pipeline: [{
//                           $match: {
//                               $expr: {
//                                   $and: [
//                                       { $eq: ["$status", "Active"] },
//                                       {
//                                           $or: [
//                                               { $eq: ["$tripType", "DayCruise"] },
//                                               { $eq: ["$tripType", "OverNight"] }
//                                           ]
//                                       },
//                                       { $eq: ["$reservationStatus", "Reserved"] },
//                                       {
//                                           $setIsSubset: [includedDates, "$reservedDates"]
//                                       },
//                                   ]
//                               }
//                           }
//                       }], as: "Reservations"
//                   },
//               },
//               { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//               { $match: { Reservations: { $exists: false }, } },
//               { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//               { $match:{ totalboats:{$gt:1}}}
//               //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//           ])
//           var locationGroup = await houseBoatModel.aggregate([
//               { $match: houseBoatQueryMultiple },
//               { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//               { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//               { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//               { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//               {
//                   $lookup: {
//                       from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                       pipeline: [{
//                           $match: {
//                               $expr: {
//                                   $and: [
//                                       { $eq: ["$status", "Active"] },
//                                       { $eq: ["$tripType", "DayCruise"] },
//                                       { $in: ["Private", "$houseBoatType"] }
//                                   ]
//                               }
//                           }
//                       }], as: "tripDetails"
//                   },
//               },
//               { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//               { $match: { tripDetails: { $exists: true }, } },
//               { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
//               // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
//               { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
//               {
//                   $lookup: {
//                       from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                       pipeline: [{
//                           $match: {
//                               $expr: {
//                                   $and: [
//                                       { $eq: ["$status", "Active"] },
//                                       {
//                                           $or: [
//                                               { $eq: ["$tripType", "DayCruise"] },
//                                               { $eq: ["$tripType", "OverNight"] }
//                                           ]
//                                       },
//                                       { $eq: ["$paymentStatus", "Success"] },
//                                       {
//                                           $setIsSubset: ["$bookedDates", includedDates]
//                                       },
//                                   ]
//                               }
//                           }
//                       }], as: "Bookings"
//                   },
//               },
//               { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//               { $match: { Bookings: { $exists: false }, } },
//               {
//                   $lookup: {
//                       from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                       pipeline: [{
//                           $match: {
//                               $expr: {
//                                   $and: [
//                                       { $eq: ["$status", "Active"] },
//                                       {
//                                           $or: [
//                                               { $eq: ["$tripType", "DayCruise"] },
//                                               { $eq: ["$tripType", "OverNight"] }
//                                           ]
//                                       },
//                                       { $eq: ["$reservationStatus", "Reserved"] },
//                                       {
//                                           $setIsSubset: [includedDates, "$reservedDates"]
//                                       },
//                                   ]
//                               }
//                           }
//                       }], as: "Reservations"
//                   },
//               },
//               { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//               { $match: { Reservations: { $exists: false }, } },
//               { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//               { $match:{ totalboats:{$gt:1}}}
//               //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//           ])
//           var houseBoats = vendorGroup.concat(locationGroup)
//           houseBoats = JSON.parse(JSON.stringify(houseBoats))
//           var houseBoat = [];
//           for (var n = 0; n < houseBoats.length; n++) {
//               var result = [];
//               for (var k = 0; k < houseBoats[n].details.length; k++) {
//                   var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
//                   if (getRate.status == true) {
//                       houseBoats[n].details[k].agentRate = getRate.rate;
//                       result.push(houseBoats[n].details[k])
//                   }
//               }
//               houseBoat.push({ _id: houseBoats[n]._id, boats: result, totalboats: houseBoats[n].totalboats });
//           }
//           var finalResult = [];
//           for (var h = 0; h < houseBoat.length; h++) {
//               var newResult = getCombinationsOnDay(houseBoat[h].boats, adult);
//               for (var i = 0; i < newResult.length; i++) {
//                   var data = {}
//                   var totalAmount = 0
//                   var id = [];
//                   var totalGuestCanBeAccomadated = 0
//                   if (newResult[i].length <= 1) {
//                       continue;
//                   }
//                   var totalRemiGuests = adult;
//                   for (var j = 0; j < newResult[i].length; j++) {
//                       if (totalRemiGuests >= newResult[i][j].tripDetails.maxPersonTrips) {
//                           var guestsForCalculations = newResult[i][j].tripDetails.maxPersonTrips;
//                           totalRemiGuests = totalRemiGuests - newResult[i][j].tripDetails.maxPersonTrips;
//                       } else {
//                           var guestsForCalculations = totalRemiGuests;
//                           totalRemiGuests = 0;
//                       }
//                       var getRate = await RateController.CalculateDayCruisRate(newResult[i][j], includedDates, guestsForCalculations)
//                       if (getRate.status == true) {
//                           newResult[i][j].agentRate = getRate.rate;
//                           //result.push(houseBoats[n].details[k])
//                       }
//                       totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
//                       totalAmount += newResult[i][j].agentRate;
//                       id.push(newResult[i][j]._id)
//                   }
//                   data._id = id
//                   data.totalAmount = totalAmount
//                   data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated
//                   data.houseBoatDetails = newResult[i]
//                   finalResult.push(data)
//               }
//           }
//           function arraysEqual(arr1, arr2) {
//               return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//           }
//           finalResult = finalResult.filter((obj, index, array) => {
//               return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//           });

//           res.status(200).json({
//               status: true,
//               data: finalResult[0].houseBoatDetails,
//               customerRate: finalResult[0].totalAmount,
//               totalLength: finalResult.length,
//               singleboat: false,
//               msg: "success",
//           });
//           return;
//       }
//       else if(tripType == "NightStay"){
//           var includedDates = await getDates(startDateTime,endDateTime)
//           if(startDateTime.getTime()>endDateTime.getTime()){
//               res.status(200).json({
//                   status:false,
//                   msg:"Invalid date selection, Please modify your search and try again."
//               });
//               return;
//           }
//           const today = new Date();
//           const eightDaysAhead = new Date(today);
//           eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
//           if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
//               console.log("In 8 Days")//If out side 8 days error shoud be generated
//               res.status(200).json({
//                   status: false,
//                   msg: "Please refresh your page..........",
//               });
//               return;
//           }
//           const todayYear = today.getFullYear();
//           const todayMonth = today.getMonth();
//           const todayDate = today.getDate();
//           const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
//           var dateTocheck = new Date(includedDates[0])
//           if (
//               dateTocheck.getFullYear() === todayYear &&
//               dateTocheck.getMonth() === todayMonth &&
//               dateTocheck.getDate() === todayDate &&
//               today.getTime() > today11PM.getTime()
//           ) {
//               console.log("No Trip For Today")
//               res.status(200).json({
//                   status: false,
//                   msg: "Please refresh your page..........",
//               });
//               return;
//           }
//           houseBoatQuery.isNightStay = true;
//           //houseBoatQuery.totalRooms = {$gte:numberofRooms}
//           var vendorGroup = await houseBoatModel.aggregate([
//               {$match:houseBoatQuery},
//               {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//               {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//               {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//               {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
//               {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$tripType","NightStay"]},
//                               { $in: ["Private", "$houseBoatType"] }
//                           ]
//                       }}
//                   }],as:"tripDetails"},
//               },
//               {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//               {$match:{tripDetails:{$exists:true},}},
//               //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//               {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//               {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$tripType", "NightStay"] },
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$paymentStatus", "Success"] },
//                               {
//                                   $or: [{
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                       },
//                                       {
//                                       $and: [
//                                           { $eq: ["$tripType", "OverNight"] },
//                                           { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                       },
//                                   ]
//                               }
//                           ]
//                       }}
//                   }],as:"Bookings"},
//               },
//               {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//               {$match:{Bookings:{$exists:false},}},
//               {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$tripType", "NightStay"] },
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$reservationStatus", "Reserved"] },
//                               {
//                                   $or: [{
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                       },
//                                       {
//                                       $and: [
//                                           { $eq: ["$tripType", "OverNight"] },
//                                           { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                       },
//                                   ]
//                               }
//                           ]
//                       }}
//                   }],as:"Reservations"},
//               },
//               {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//               {$match:{Reservations:{$exists:false},}},
//               {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$paymentStatus", "Success"] },
//                               { $eq: ["$tripType", "DayCruise"] },
//                               {
//                                   $setIsSubset: [includedDates, "$bookedDates"]
//                               }
//                           ]
//                       }}
//                   }],as:"DayBookings"},
//               },
//               {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//               {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//               pipeline: [{
//                   $match: {$expr: { 
//                       $and: [
//                           { $eq: ["$status", "Active"] },
//                           { $eq: ["$reservationStatus", "Reserved"] },
//                           { $eq: ["$tripType", "DayCruise"] },
//                           {
//                               $setIsSubset: [includedDates,"$reservedDates" ]
//                           },
//                       ]
//                   }}
//               }],as:"DayReservations"},
//           },
//           {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//           {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//           {$group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//           {$match:{ totalboats:{$gt:1}}}
//           ])
//           var locationGroup = await houseBoatModel.aggregate([
//               {$match:houseBoatQuery},
//               {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//               {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//               {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//               {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
//               {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$tripType","NightStay"]},
//                               { $in: ["Private", "$houseBoatType"] }
//                           ]
//                       }}
//                   }],as:"tripDetails"},
//               },
//               {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//               {$match:{tripDetails:{$exists:true},}},
//               //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//               {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//               {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$tripType", "NightStay"] },
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$paymentStatus", "Success"] },
//                               {
//                                   $or: [{
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                       },
//                                       {
//                                       $and: [
//                                           { $eq: ["$tripType", "OverNight"] },
//                                           { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                       },
//                                   ]
//                               }
//                           ]
//                       }}
//                   }],as:"Bookings"},
//               },
//               {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//               {$match:{Bookings:{$exists:false},}},
//               {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$tripType", "NightStay"] },
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$reservationStatus", "Reserved"] },
//                               {
//                                   $or: [{
//                                       $and: [
//                                           { $eq: ["$tripType", "NightStay"] },
//                                           { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                       },
//                                       {
//                                       $and: [
//                                           { $eq: ["$tripType", "OverNight"] },
//                                           { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                       },
//                                   ]
//                               }
//                           ]
//                       }}
//                   }],as:"Reservations"},
//               },
//               {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//               {$match:{Reservations:{$exists:false},}},
//               {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$paymentStatus", "Success"] },
//                               { $eq: ["$tripType", "DayCruise"] },
//                               {
//                                   $setIsSubset: [includedDates, "$bookedDates"]
//                               }
//                           ]
//                       }}
//                   }],as:"DayBookings"},
//               },
//               {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//               {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//               pipeline: [{
//                   $match: {$expr: { 
//                       $and: [
//                           { $eq: ["$status", "Active"] },
//                           { $eq: ["$reservationStatus", "Reserved"] },
//                           { $eq: ["$tripType", "DayCruise"] },
//                           {
//                               $setIsSubset: [includedDates,"$reservedDates" ]
//                           },
//                       ]
//                   }}
//               }],as:"DayReservations"},
//           },
//           {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//           {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//           {$group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//           {$match:{ totalboats:{$gt:1}}}
//           ])
//           var houseBoats = vendorGroup.concat(locationGroup)
//           houseBoats = JSON.parse(JSON.stringify(houseBoats))
//           for(var h=0;h<houseBoats.length;h++){
//               for(var g=0;g<houseBoats[h].details.length;g++){
//                   var numberOfRooms = houseBoats[h].details[g].totalRooms;
//                   var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
//                   var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
//                   houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
//                   houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
//               }
//           }
//           for(var p=0;p<houseBoats.length;p++){
//               var result = [];
//               var totalGuestCanBeAccomadated = 0
//               var totalExtraGuestCanBeaccomadated = 0
//               var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
//               var hbs = getMostSutableValue;
//               const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//               for(var k =0;k<hbs.length;k++){
//                   totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
//                   totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                   var totalguests = hbs[k].tripDetails.maxPersonPerRooms
//                   hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
//                   hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                   var getRate = await RateController.CalculateNightStayRateCombination(hbs[k],includedDates,totalguests)
//                   if(getRate.status == true){
//                       hbs[k].agentRate = getRate.rate;
//                       hbs[k].extraPersonRate = getRate.extraPersonRate
//                       result.push(hbs[k])
//                   }
//               }
//               var data = {}
//               var totalAmount = 0
//               var id = [];
//               for(var t=0;t<result.length;t++){
//                   totalAmount  += result[t].agentRate;
//                   id.push(result[t]._id)
//               }
//               data._id = id
//               data.totalAmount = totalAmount
//               data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
//               data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
//               data.houseBoatDetails = result
//               if(sumOfTotals>=numberofRooms){
//                   if(totalGuestCanBeAccomadated>=adult){
//                       finalResult.push(data)
//                   }else{
//                       //Calculations For additional Guests
//                       var istrue = false
//                        var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
//                       if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
//                           console.log("Cant Accomadate these many extra guests")
//                       }else{
//                           var reminingAdditionalGuests = additionalGuestAvailable
//                           var additionalAmount = 0;
//                           for(var d=0;d<data.houseBoatDetails.length;d++){
//                               if(reminingAdditionalGuests>0){
//                                   if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                                       additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                       reminingAdditionalGuests = 0;
//                                       istrue = true;
//                                       break
//                                   }else{
//                                       additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                       reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                                   }
//                               }else{
//                                   istrue = true
//                                   break;
//                               }
//                           }
//                           if (!isNaN(additionalAmount)){
//                               data.additionalAmount = additionalAmount;
//                               data.totalAmount +=additionalAmount
//                           }
//                           if(istrue == true){
//                               finalResult.push(data)
//                           }
//                       }
//                   }
//               }
//           }
//           function arraysEqual(arr1, arr2) {
//               return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//           }
//           finalResult = finalResult.filter((obj, index, array) => {
//               return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//           });
//           res.status(200).json({
//               status:true,
//               data: finalResult[0].houseBoatDetails,
//               customerRate:finalResult[0].totalAmount,
//               totalLength:finalResult.length,
//               singleboat: false,
//               msg: "success",
//           });
//           return;
//       }else{
//           var includedDates = await getDates(startDateTime,endDateTime)
//           if(startDateTime.getTime()>endDateTime.getTime()){
//               res.status(200).json({
//                   status:false,
//                   msg:"Invalid date selection, Please modify your search and try again."
//               });
//               return;
//           }
//           const today = new Date();
//           const todayYear = today.getFullYear();
//           const todayMonth = today.getMonth();
//           const todayDate = today.getDate();
//           const today2PM = new Date(todayYear, todayMonth, todayDate, 2, 0, 0);
//           var dateTocheck = new Date(includedDates[0])
//           if (
//               dateTocheck.getFullYear() === todayYear &&
//               dateTocheck.getMonth() === todayMonth &&
//               dateTocheck.getDate() === todayDate &&
//               today.getTime() > today2PM.getTime()
//           ) {
//               console.log("No Trip For Today")
//               res.status(200).json({
//                   status: false,
//                   msg: "Please refresh your page..........",
//               });
//               return;
//           }
//           houseBoatQueryMultiple.isOverNight = true;
//           //houseBoatQueryMultiple.totalRooms = {$gte:numberofRooms}
//           var vendorWise = await houseBoatModel.aggregate([
//               {$match:houseBoatQueryMultiple},
//               {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//               {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//               {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//               {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//               {$lookup: {from: "usermodels",localField: "userid",foreignField: "_id",as: "userid",},},
//               {$unwind: {"path":"$userid", preserveNullAndEmptyArrays: true }},
//               {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$tripType","OverNight"]},
//                               { $in: ["Private", "$houseBoatType"] }
                              
//                           ]
//                       }}
//                   }],as:"tripDetails"},
//               },
//               {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//               {$match:{tripDetails:{$exists:true},}},
//               {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
//               // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//               {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//               {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$paymentStatus", "Success"] },
//                               {
//                                   $setIsSubset: [ "$bookedDates",includedDates]
//                               },
//                           ]
//                       }}
//                   }],as:"Bookings"},
//               },
//               {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//               {$match:{Bookings:{$exists:false},}},
//               {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$reservationStatus", "Reserved"] },
//                               {
//                                   $setIsSubset: [ includedDates,"$reservedDates"]
//                               },
//                           ]
//                       }}
//                   }],as:"Reservations"},
//               },
//               {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//               {$match:{Reservations:{$exists:false},}},
//               { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//               { $match:{ totalboats:{$gt:1}}}
//           ])
//           var locationWise = await houseBoatModel.aggregate([
//               {$match:houseBoatQueryMultiple},
//               {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//               {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//               {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//               {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//               {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$tripType","OverNight"]},
//                               { $in: ["Private", "$houseBoatType"] }
                              
//                           ]
//                       }}
//                   }],as:"tripDetails"},
//               },
//               {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//               {$match:{tripDetails:{$exists:true},}},
//               {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
//               // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//               {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//               {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$paymentStatus", "Success"] },
//                               {
//                                   $setIsSubset: [ "$bookedDates",includedDates]
//                               },
//                           ]
//                       }}
//                   }],as:"Bookings"},
//               },
//               {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//               {$match:{Bookings:{$exists:false},}},
//               {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                   pipeline: [{
//                       $match: {$expr: { 
//                           $and: [
//                               { $eq: ["$status", "Active"] },
//                               { $eq: ["$reservationStatus", "Reserved"] },
//                               {
//                                   $setIsSubset: [ includedDates,"$reservedDates"]
//                               },
//                           ]
//                       }}
//                   }],as:"Reservations"},
//               },
//               {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//               {$match:{Reservations:{$exists:false},}},
//               { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//               { $match:{ totalboats:{$gt:1}}}
//           ])
//           houseBoats = vendorWise.concat(locationWise)
//           /*
//           ---------------------CODE EXPLANATION----------------
//           Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
//           $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, similar to the previous examples.
//           $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "OverNight", and house boat type being "Private".
//           $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
//           $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates.
//           $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
//           $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates.
//           $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
//           This aggregation pipeline seems to focus on filtering documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, primarily focusing on overnight stays with specific criteria for availability.
//           ---------------------------END-----------------------
//           */
//           houseBoats = JSON.parse(JSON.stringify(houseBoats))
//           for(var h=0;h<houseBoats.length;h++){
//               for(var g=0;g<houseBoats[h].details.length;g++){
//                   var numberOfRooms = houseBoats[h].details[g].totalRooms;
//                   var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
//                   var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
//                   houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
//                   houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
//               }
//           }
//           var finalResult = [];
          
//           for(var p=0;p<houseBoats.length;p++){
//               var result = [];
//               var totalGuestCanBeAccomadated = 0
//               var totalExtraGuestCanBeaccomadated = 0
//               var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
//               var hbs = getMostSutableValue;
//               const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//               for(var k =0;k<hbs.length;k++){
//                   totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
//                   totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                   var totalguests = hbs[k].tripDetails.maxPersonPerRooms
//                   hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
//                   hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                   var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k],includedDates,totalguests)
//                   if(getRate.status == true){
//                       hbs[k].agentRate = getRate.rate;
//                       hbs[k].extraPersonRate = getRate.extraPersonRate
//                       result.push(hbs[k])
//                   }
//               }
//               var data = {}
//               var totalAmount = 0
//               var id = [];
//               for(var t=0;t<result.length;t++){
//                   totalAmount  += result[t].agentRate;
//                   id.push(result[t]._id)
//               }
//               data._id = id
//               data.totalAmount = totalAmount
//               data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
//               data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
//               data.houseBoatDetails = result
//               if(sumOfTotals>=numberofRooms){
//                   if(totalGuestCanBeAccomadated>=adult){
//                       var totalRoomsFound =  data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                       if(totalRoomsFound>=numberofRooms){
//                           finalResult.push(data)
//                       }
//                   }else{
//                       //Calculations For additional Guests
//                       var istrue = false
//                        var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
//                       if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
//                           console.log("Cant Accomadate these many extra guests")
//                       }else{
//                           var reminingAdditionalGuests = additionalGuestAvailable
//                           var additionalAmount = 0;
//                           for(var d=0;d<data.houseBoatDetails.length;d++){
//                             //   if(reminingAdditionalGuests>0){
//                             //       if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                             //           additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                             //           reminingAdditionalGuests = 0;
//                             //           istrue = true;
//                             //           break
//                             //       }else{
//                             //           additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                             //           reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                             //       }
//                             //   }
//                             if(reminingAdditionalGuests>0){
//                                 if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                                     additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                     data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                     var houseBoatTotal = data.houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate
//                                     if(!Misc.isnullorempty(houseBoatTotal)){
//                                         data.houseBoatDetails[d].agentRate = houseBoatTotal;
//                                     }
//                                     if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
//                                         data.houseBoatDetails[d].totalExtraPersonRate = 0;
//                                     }
//                                     reminingAdditionalGuests = 0;
//                                     istrue = true;
//                                     break
//                                 }else{
//                                     additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                     data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                     var houseBoatTotal = data.houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate;
//                                     if(!Misc.isnullorempty(houseBoatTotal)){
//                                         data.houseBoatDetails[d].agentRate = houseBoatTotal;
//                                     }
//                                     if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
//                                         data.houseBoatDetails[d].totalExtraPersonRate = 0;
//                                     }
//                                     reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                                 }
//                             }
//                               else{
//                                   istrue = true
//                                   break;
//                               }
//                           }
//                           if (!isNaN(additionalAmount)){
//                               data.additionalAmount = additionalAmount;
//                               data.totalAmount +=additionalAmount
//                           }
//                           if(istrue == true){
//                               finalResult.push(data)
//                           }
//                       }
//                   }
//               }
//           }
//           function arraysEqual(arr1, arr2) {
//               return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//           }
//           finalResult = finalResult.filter((obj, index, array) => {
//               return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//           });
//           res.status(200).json({
//           status:true,
//           data: finalResult[0].houseBoatDetails,
//           customerRate:finalResult[0].totalAmount,
//           totalLength:finalResult.length,
//           singleboat: false,
//           msg: "success",
//       });
//       return;
//       }
//       }
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       status: false,
//       msg: "Something went wrong",
//       e,
//     });
//   }
// });
// router.get("/houseboatbooking/multiple/view/v1", async (req, res) => {
//     try {
//         var {id,tripType,category,houseBoatType,location,numberofRooms,checkInDate,checkOutDate,children,adult} = req.query;
//         if (!Array.isArray(id)) {
//                 res.status(200).json({
//                 status: false,
//                 msg: "Id must be an array",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(tripType)) {
//             res.status(200).json({
//                 status: true,
//                 msg: "Please Provide  Trip Type",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(category)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide Category",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(houseBoatType)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide houseBoatType",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(location)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide location",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(tripType)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide tripType",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(numberofRooms)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide numberofRooms",
//             });
//             return;
//         }
//         if (typeof numberofRooms != 'number'){
//             numberofRooms=parseInt(numberofRooms)
//         }
//         if(numberofRooms<=0){
//             res.status(200).json({
//                 status:false,
//                 msg:"Number of rooms should be greater than zero."
//             });
//             return;
//         }
//         if(numberofRooms>=50){
//             res.status(200).json({
//                 status:false,
//                 msg:"Please select a valid number of rooms."
//             });
//             return;
//         }
//         if (Misc.isnullorempty(checkInDate)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide checkInDate",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(checkOutDate)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide checkOutDate",
//             });
//             return;
//         }
//         if (Misc.isnullorempty(adult)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please Provide adult",
//             });
//             return;
//         }
//         if(typeof adult != 'number'){
//             adult = parseInt(adult);
//         }
//         if(adult<=0){
//             res.status(200).json({
//                 status:false,
//                 msg:"Please select atleast one adult guest."
//             });
//             return;
//         }
//         if(Misc.isnullorempty(children)){
//             children = 0
//         }else{
//             children = parseInt(children)
//         }
//         if(children<0){
//             res.status(200).json({
//                 status:false,
//                 msg:"Number of students should be a postive number."
//             });
//             return;
//         }
//         var totalGuest = adult;
//         var startDateTime = new Date(checkInDate);
//         var endDateTime = new Date(checkOutDate);
//         var includedDates = await getDates(startDateTime,endDateTime)
//         if(startDateTime.getTime()>endDateTime.getTime()){
//             res.status(200).json({
//                 status:false,
//                 msg:"Invalid date selection, Please modify your search and try again."
//             });
//             return;
//         }
//         var result = []
//         var ids = await id.map(x=>new mongoose.Types.ObjectId(x))
//         var houseBoatQueryMultiple = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category,_id:{$in:ids} };
//         if (houseBoatType === "Private") {
//           if (tripType == "DayCruise") {
//             //houseBoatQuery.totalRooms = { $gte: numberofRooms }
//             var includedDates = await getDatesFiltered(startDateTime, endDateTime)
//             houseBoatQueryMultiple.isDayCriuse = true;
//             const today = new Date();
//           //   const eightDaysAhead = new Date(today);
//           //   eightDaysAhead.setDate(today.getDate() + 8);
//           //   if (includedDates[0] > eightDaysAhead) {
//           //       console.log("In 8 Days")
//           //       res.status(200).json({
//           //           status: false,
//           //           msg: "Please refresh your page..........",
//           //       });
//           //       return;
//           //   }
//             const todayYear = today.getFullYear();
//             const todayMonth = today.getMonth();
//             const todayDate = today.getDate();
//             const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
//             var dateToCheck = new Date(includedDates[0]);
//             if (dateToCheck.getFullYear() === todayYear && dateToCheck.getMonth() === todayMonth && dateToCheck.getDate() === todayDate && today.getTime() > today1PM.getTime()) {
//                 console.log("No Trip For Today")
//                 res.status(200).json({
//                     status: false,
//                     msg: "Please refresh your page..........",
//                 });
//                 return;
//             }
//             var vendorGroup = await houseBoatModel.aggregate([
//                 { $match: houseBoatQueryMultiple },
//                 { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//                 { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//                 { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//                 { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//                 {$lookup: {from: "usermodels",localField: "userid",foreignField: "_id",as: "userid",},},
//                 {$unwind: {"path":"$userid", preserveNullAndEmptyArrays: true }},
//                 {
//                     $lookup: {
//                         from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                         pipeline: [{
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ["$status", "Active"] },
//                                         { $eq: ["$tripType", "DayCruise"] },
//                                         { $in: ["Private", "$houseBoatType"] }
//                                     ]
//                                 }
//                             }
//                         }], as: "tripDetails"
//                     },
//                 },
//                 { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//                 { $match: { tripDetails: { $exists: true }, } },
//                 // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
//                 { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
//                  { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
//                 {
//                     $lookup: {
//                         from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                         pipeline: [{
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ["$status", "Active"] },
//                                         {
//                                             $or: [
//                                                 { $eq: ["$tripType", "DayCruise"] },
//                                                 { $eq: ["$tripType", "OverNight"] }
//                                             ]
//                                         },
//                                         { $eq: ["$paymentStatus", "Success"] },
//                                         {
//                                             $setIsSubset: ["$bookedDates", includedDates]
//                                         },
//                                     ]
//                                 }
//                             }
//                         }], as: "Bookings"
//                     },
//                 },
//                 { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//                 { $match: { Bookings: { $exists: false }, } },
//                 {
//                     $lookup: {
//                         from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                         pipeline: [{
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ["$status", "Active"] },
//                                         {
//                                             $or: [
//                                                 { $eq: ["$tripType", "DayCruise"] },
//                                                 { $eq: ["$tripType", "OverNight"] }
//                                             ]
//                                         },
//                                         { $eq: ["$reservationStatus", "Reserved"] },
//                                         {
//                                             $setIsSubset: [includedDates, "$reservedDates"]
//                                         },
//                                     ]
//                                 }
//                             }
//                         }], as: "Reservations"
//                     },
//                 },
//                 { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//                 { $match: { Reservations: { $exists: false }, } },
//                 { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                 { $match:{ totalboats:{$gt:1}}}
//                 //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//             ])
//             var locationGroup = await houseBoatModel.aggregate([
//                 { $match: houseBoatQueryMultiple },
//                 { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
//                 { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
//                 { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
//                 { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
//                 {
//                     $lookup: {
//                         from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
//                         pipeline: [{
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ["$status", "Active"] },
//                                         { $eq: ["$tripType", "DayCruise"] },
//                                         { $in: ["Private", "$houseBoatType"] }
//                                     ]
//                                 }
//                             }
//                         }], as: "tripDetails"
//                     },
//                 },
//                 { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
//                 { $match: { tripDetails: { $exists: true }, } },
//                 { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
//                 // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
//                 { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
//                 {
//                     $lookup: {
//                         from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
//                         pipeline: [{
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ["$status", "Active"] },
//                                         {
//                                             $or: [
//                                                 { $eq: ["$tripType", "DayCruise"] },
//                                                 { $eq: ["$tripType", "OverNight"] }
//                                             ]
//                                         },
//                                         { $eq: ["$paymentStatus", "Success"] },
//                                         {
//                                             $setIsSubset: ["$bookedDates", includedDates]
//                                         },
//                                     ]
//                                 }
//                             }
//                         }], as: "Bookings"
//                     },
//                 },
//                 { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
//                 { $match: { Bookings: { $exists: false }, } },
//                 {
//                     $lookup: {
//                         from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
//                         pipeline: [{
//                             $match: {
//                                 $expr: {
//                                     $and: [
//                                         { $eq: ["$status", "Active"] },
//                                         {
//                                             $or: [
//                                                 { $eq: ["$tripType", "DayCruise"] },
//                                                 { $eq: ["$tripType", "OverNight"] }
//                                             ]
//                                         },
//                                         { $eq: ["$reservationStatus", "Reserved"] },
//                                         {
//                                             $setIsSubset: [includedDates, "$reservedDates"]
//                                         },
//                                     ]
//                                 }
//                             }
//                         }], as: "Reservations"
//                     },
//                 },
//                 { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
//                 { $match: { Reservations: { $exists: false }, } },
//                 { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                 { $match:{ totalboats:{$gt:1}}}
//                 //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
//             ])
//             var houseBoats = vendorGroup.concat(locationGroup)
//             houseBoats = JSON.parse(JSON.stringify(houseBoats))
//             var houseBoat = [];
//             for (var n = 0; n < houseBoats.length; n++) {
//                 var result = [];
//                 for (var k = 0; k < houseBoats[n].details.length; k++) {
//                     var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
//                     if (getRate.status == true) {
//                         houseBoats[n].details[k].customerRate = getRate.rate;
//                         result.push(houseBoats[n].details[k])
//                     }
//                 }
//                 houseBoat.push({ _id: houseBoats[n]._id, boats: result, totalboats: houseBoats[n].totalboats });
//             }
//             var finalResult = [];
//             for (var h = 0; h < houseBoat.length; h++) {
//                 var newResult = getCombinationsOnDay(houseBoat[h].boats, adult);
//                 for (var i = 0; i < newResult.length; i++) {
//                     var data = {}
//                     var totalAmount = 0
//                     var id = [];
//                     var totalGuestCanBeAccomadated = 0
//                     if (newResult[i].length <= 1) {
//                         continue;
//                     }
//                     var totalRemiGuests = adult;
//                     for (var j = 0; j < newResult[i].length; j++) {
//                         if (totalRemiGuests >= newResult[i][j].tripDetails.maxPersonTrips) {
//                             var guestsForCalculations = newResult[i][j].tripDetails.maxPersonTrips;
//                             totalRemiGuests = totalRemiGuests - newResult[i][j].tripDetails.maxPersonTrips;
//                         } else {
//                             var guestsForCalculations = totalRemiGuests;
//                             totalRemiGuests = 0;
//                         }
//                         var getRate = await RateController.CalculateDayCruisRate(newResult[i][j], includedDates, guestsForCalculations)
//                         if (getRate.status == true) {
//                             newResult[i][j].customerRate = getRate.rate;
//                             //result.push(houseBoats[n].details[k])
//                         }
//                         totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
//                         totalAmount += newResult[i][j].customerRate;
//                         id.push(newResult[i][j]._id)
//                     }
//                     data._id = id
//                     data.totalAmount = totalAmount
//                     data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated
//                     data.houseBoatDetails = newResult[i]
//                     finalResult.push(data)
//                 }
//             }
//             function arraysEqual(arr1, arr2) {
//                 return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//             }
//             finalResult = finalResult.filter((obj, index, array) => {
//                 return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//             });
  
//             res.status(200).json({
//                 status: true,
//                 data: finalResult[0].houseBoatDetails,
//                 customerRate: finalResult[0].totalAmount,
//                 totalLength: finalResult.length,
//                 singleboat: false,
//                 msg: "success",
//             });
//             return;
//         }
//         else if(tripType == "NightStay"){
//             var includedDates = await getDates(startDateTime,endDateTime)
//             if(startDateTime.getTime()>endDateTime.getTime()){
//                 res.status(200).json({
//                     status:false,
//                     msg:"Invalid date selection, Please modify your search and try again."
//                 });
//                 return;
//             }
//             const today = new Date();
//             const eightDaysAhead = new Date(today);
//             eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
//             if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
//                 console.log("In 8 Days")//If out side 8 days error shoud be generated
//                 res.status(200).json({
//                     status: false,
//                     msg: "Please refresh your page..........",
//                 });
//                 return;
//             }
//             const todayYear = today.getFullYear();
//             const todayMonth = today.getMonth();
//             const todayDate = today.getDate();
//             const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
//             var dateTocheck = new Date(includedDates[0])
//             if (
//                 dateTocheck.getFullYear() === todayYear &&
//                 dateTocheck.getMonth() === todayMonth &&
//                 dateTocheck.getDate() === todayDate &&
//                 today.getTime() > today11PM.getTime()
//             ) {
//                 console.log("No Trip For Today")
//                 res.status(200).json({
//                     status: false,
//                     msg: "Please refresh your page..........",
//                 });
//                 return;
//             }
//             houseBoatQuery.isNightStay = true;
//             //houseBoatQuery.totalRooms = {$gte:numberofRooms}
//             var vendorGroup = await houseBoatModel.aggregate([
//                 {$match:houseBoatQuery},
//                 {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                 {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                 {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                 {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
//                 {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$tripType","NightStay"]},
//                                 { $in: ["Private", "$houseBoatType"] }
//                             ]
//                         }}
//                     }],as:"tripDetails"},
//                 },
//                 {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                 {$match:{tripDetails:{$exists:true},}},
//                 //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                 {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                 {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$tripType", "NightStay"] },
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$paymentStatus", "Success"] },
//                                 {
//                                     $or: [{
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                         },
//                                         {
//                                         $and: [
//                                             { $eq: ["$tripType", "OverNight"] },
//                                             { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                         },
//                                     ]
//                                 }
//                             ]
//                         }}
//                     }],as:"Bookings"},
//                 },
//                 {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                 {$match:{Bookings:{$exists:false},}},
//                 {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$tripType", "NightStay"] },
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$reservationStatus", "Reserved"] },
//                                 {
//                                     $or: [{
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                         },
//                                         {
//                                         $and: [
//                                             { $eq: ["$tripType", "OverNight"] },
//                                             { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                         },
//                                     ]
//                                 }
//                             ]
//                         }}
//                     }],as:"Reservations"},
//                 },
//                 {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                 {$match:{Reservations:{$exists:false},}},
//                 {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$paymentStatus", "Success"] },
//                                 { $eq: ["$tripType", "DayCruise"] },
//                                 {
//                                     $setIsSubset: [includedDates, "$bookedDates"]
//                                 }
//                             ]
//                         }}
//                     }],as:"DayBookings"},
//                 },
//                 {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//                 {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                 pipeline: [{
//                     $match: {$expr: { 
//                         $and: [
//                             { $eq: ["$status", "Active"] },
//                             { $eq: ["$reservationStatus", "Reserved"] },
//                             { $eq: ["$tripType", "DayCruise"] },
//                             {
//                                 $setIsSubset: [includedDates,"$reservedDates" ]
//                             },
//                         ]
//                     }}
//                 }],as:"DayReservations"},
//             },
//             {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//             {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//             {$group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//             {$match:{ totalboats:{$gt:1}}}
//             ])
//             var locationGroup = await houseBoatModel.aggregate([
//                 {$match:houseBoatQuery},
//                 {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                 {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                 {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                 {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
//                 {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$tripType","NightStay"]},
//                                 { $in: ["Private", "$houseBoatType"] }
//                             ]
//                         }}
//                     }],as:"tripDetails"},
//                 },
//                 {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                 {$match:{tripDetails:{$exists:true},}},
//                 //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                 {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                 {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$tripType", "NightStay"] },
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$paymentStatus", "Success"] },
//                                 {
//                                     $or: [{
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
//                                         },
//                                         {
//                                         $and: [
//                                             { $eq: ["$tripType", "OverNight"] },
//                                             { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                         },
//                                     ]
//                                 }
//                             ]
//                         }}
//                     }],as:"Bookings"},
//                 },
//                 {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                 {$match:{Bookings:{$exists:false},}},
//                 {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$tripType", "NightStay"] },
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$reservationStatus", "Reserved"] },
//                                 {
//                                     $or: [{
//                                         $and: [
//                                             { $eq: ["$tripType", "NightStay"] },
//                                             { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
//                                         },
//                                         {
//                                         $and: [
//                                             { $eq: ["$tripType", "OverNight"] },
//                                             { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
//                                         },
//                                     ]
//                                 }
//                             ]
//                         }}
//                     }],as:"Reservations"},
//                 },
//                 {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                 {$match:{Reservations:{$exists:false},}},
//                 {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$paymentStatus", "Success"] },
//                                 { $eq: ["$tripType", "DayCruise"] },
//                                 {
//                                     $setIsSubset: [includedDates, "$bookedDates"]
//                                 }
//                             ]
//                         }}
//                     }],as:"DayBookings"},
//                 },
//                 {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
//                 {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                 pipeline: [{
//                     $match: {$expr: { 
//                         $and: [
//                             { $eq: ["$status", "Active"] },
//                             { $eq: ["$reservationStatus", "Reserved"] },
//                             { $eq: ["$tripType", "DayCruise"] },
//                             {
//                                 $setIsSubset: [includedDates,"$reservedDates" ]
//                             },
//                         ]
//                     }}
//                 }],as:"DayReservations"},
//             },
//             {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
//             {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
//             {$group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//             {$match:{ totalboats:{$gt:1}}}
//             ])
//             var houseBoats = vendorGroup.concat(locationGroup)
//             houseBoats = JSON.parse(JSON.stringify(houseBoats))
//             for(var h=0;h<houseBoats.length;h++){
//                 for(var g=0;g<houseBoats[h].details.length;g++){
//                     var numberOfRooms = houseBoats[h].details[g].totalRooms;
//                     var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
//                     var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
//                     houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
//                     houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
//                 }
//             }
//             for(var p=0;p<houseBoats.length;p++){
//                 var result = [];
//                 var totalGuestCanBeAccomadated = 0
//                 var totalExtraGuestCanBeaccomadated = 0
//                 var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
//                 var hbs = getMostSutableValue;
//                 const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                 for(var k =0;k<hbs.length;k++){
//                     totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
//                     totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                     var totalguests = hbs[k].tripDetails.maxPersonPerRooms
//                     hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
//                     hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                     var getRate = await RateController.CalculateNightStayRateCombination(hbs[k],includedDates,totalguests)
//                     if(getRate.status == true){
//                         hbs[k].customerRate = getRate.rate;
//                         hbs[k].extraPersonRate = getRate.extraPersonRate
//                         result.push(hbs[k])
//                     }
//                 }
//                 var data = {}
//                 var totalAmount = 0
//                 var id = [];
//                 for(var t=0;t<result.length;t++){
//                     totalAmount  += result[t].customerRate;
//                     id.push(result[t]._id)
//                 }
//                 data._id = id
//                 data.totalAmount = totalAmount
//                 data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
//                 data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
//                 data.houseBoatDetails = result
//                 if(sumOfTotals>=numberofRooms){
//                     if(totalGuestCanBeAccomadated>=adult){
//                         finalResult.push(data)
//                     }else{
//                         //Calculations For additional Guests
//                         var istrue = false
//                          var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
//                         if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
//                             console.log("Cant Accomadate these many extra guests")
//                         }else{
//                             var reminingAdditionalGuests = additionalGuestAvailable
//                             var additionalAmount = 0;
//                             for(var d=0;d<data.houseBoatDetails.length;d++){
//                                 if(reminingAdditionalGuests>0){
//                                     if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                                         additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                         reminingAdditionalGuests = 0;
//                                         istrue = true;
//                                         break
//                                     }else{
//                                         additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                         reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                                     }
//                                 }else{
//                                     istrue = true
//                                     break;
//                                 }
//                             }
//                             if (!isNaN(additionalAmount)){
//                                 data.additionalAmount = additionalAmount;
//                                 data.totalAmount +=additionalAmount
//                             }
//                             if(istrue == true){
//                                 finalResult.push(data)
//                             }
//                         }
//                     }
//                 }
//             }
//             function arraysEqual(arr1, arr2) {
//                 return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//             }
//             finalResult = finalResult.filter((obj, index, array) => {
//                 return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//             });
//             res.status(200).json({
//                 status:true,
//                 data: finalResult[0].houseBoatDetails,
//                 customerRate:finalResult[0].totalAmount,
//                 totalLength:finalResult.length,
//                 singleboat: false,
//                 msg: "success",
//             });
//             return;
//         }else{
//             var includedDates = await getDates(startDateTime,endDateTime)
//             if(startDateTime.getTime()>endDateTime.getTime()){
//                 res.status(200).json({
//                     status:false,
//                     msg:"Invalid date selection, Please modify your search and try again."
//                 });
//                 return;
//             }
//             const today = new Date();
//             const todayYear = today.getFullYear();
//             const todayMonth = today.getMonth();
//             const todayDate = today.getDate();
//             const today2PM = new Date(todayYear, todayMonth, todayDate, 2, 0, 0);
//             var dateTocheck = new Date(includedDates[0])
//             if (
//                 dateTocheck.getFullYear() === todayYear &&
//                 dateTocheck.getMonth() === todayMonth &&
//                 dateTocheck.getDate() === todayDate &&
//                 today.getTime() > today2PM.getTime()
//             ) {
//                 console.log("No Trip For Today")
//                 res.status(200).json({
//                     status: false,
//                     msg: "Please refresh your page..........",
//                 });
//                 return;
//             }
//             houseBoatQueryMultiple.isOverNight = true;
//             //houseBoatQueryMultiple.totalRooms = {$gte:numberofRooms}
//             var vendorWise = await houseBoatModel.aggregate([
//                 {$match:houseBoatQueryMultiple},
//                 {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                 {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                 {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                 {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                 {$lookup: {from: "usermodels",localField: "userid",foreignField: "_id",as: "userid",},},
//                 {$unwind: {"path":"$userid", preserveNullAndEmptyArrays: true }},
//                 {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$tripType","OverNight"]},
//                                 { $in: ["Private", "$houseBoatType"] }
                                
//                             ]
//                         }}
//                     }],as:"tripDetails"},
//                 },
//                 {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                 {$match:{tripDetails:{$exists:true},}},
//                 {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
//                 // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                 {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                 {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$paymentStatus", "Success"] },
//                                 {
//                                     $setIsSubset: [ "$bookedDates",includedDates]
//                                 },
//                             ]
//                         }}
//                     }],as:"Bookings"},
//                 },
//                 {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                 {$match:{Bookings:{$exists:false},}},
//                 {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$reservationStatus", "Reserved"] },
//                                 {
//                                     $setIsSubset: [ includedDates,"$reservedDates"]
//                                 },
//                             ]
//                         }}
//                     }],as:"Reservations"},
//                 },
//                 {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                 {$match:{Reservations:{$exists:false},}},
//                 { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                 { $match:{ totalboats:{$gt:1}}}
//             ])
//             var locationWise = await houseBoatModel.aggregate([
//                 {$match:houseBoatQueryMultiple},
//                 {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
//                 {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
//                 {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
//                 {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
//                 {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$tripType","OverNight"]},
//                                 { $in: ["Private", "$houseBoatType"] }
                                
//                             ]
//                         }}
//                     }],as:"tripDetails"},
//                 },
//                 {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
//                 {$match:{tripDetails:{$exists:true},}},
//                 {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
//                 // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
//                 {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
//                 {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$paymentStatus", "Success"] },
//                                 {
//                                     $setIsSubset: [ "$bookedDates",includedDates]
//                                 },
//                             ]
//                         }}
//                     }],as:"Bookings"},
//                 },
//                 {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
//                 {$match:{Bookings:{$exists:false},}},
//                 {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
//                     pipeline: [{
//                         $match: {$expr: { 
//                             $and: [
//                                 { $eq: ["$status", "Active"] },
//                                 { $eq: ["$reservationStatus", "Reserved"] },
//                                 {
//                                     $setIsSubset: [ includedDates,"$reservedDates"]
//                                 },
//                             ]
//                         }}
//                     }],as:"Reservations"},
//                 },
//                 {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
//                 {$match:{Reservations:{$exists:false},}},
//                 { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
//                 { $match:{ totalboats:{$gt:1}}}
//             ])
//             houseBoats = vendorWise.concat(locationWise)
//             /*
//             ---------------------CODE EXPLANATION----------------
//             Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
//             $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, similar to the previous examples.
//             $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "OverNight", and house boat type being "Private".
//             $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
//             $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates.
//             $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
//             $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates.
//             $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
//             This aggregation pipeline seems to focus on filtering documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, primarily focusing on overnight stays with specific criteria for availability.
//             ---------------------------END-----------------------
//             */
//             houseBoats = JSON.parse(JSON.stringify(houseBoats))
//             for(var h=0;h<houseBoats.length;h++){
//                 for(var g=0;g<houseBoats[h].details.length;g++){
//                     var numberOfRooms = houseBoats[h].details[g].totalRooms;
//                     var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
//                     var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
//                     houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
//                     houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
//                 }
//             }
//             var finalResult = [];
            
//             for(var p=0;p<houseBoats.length;p++){
//                 var result = [];
//                 var totalGuestCanBeAccomadated = 0
//                 var totalExtraGuestCanBeaccomadated = 0
//                 var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
//                 var hbs = getMostSutableValue;
//                 const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                 for(var k =0;k<hbs.length;k++){
//                     totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
//                     totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                     var totalguests = hbs[k].tripDetails.maxPersonPerRooms
//                     hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
//                     hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
//                     var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k],includedDates,totalguests)
//                     if(getRate.status == true){
//                         hbs[k].customerRate = getRate.rate;
//                         hbs[k].extraPersonRate = getRate.extraPersonRate
//                         result.push(hbs[k])
//                     }
//                 }
//                 var data = {}
//                 var totalAmount = 0
//                 var id = [];
//                 for(var t=0;t<result.length;t++){
//                     totalAmount  += result[t].customerRate;
//                     id.push(result[t]._id)
//                 }
//                 data._id = id
//                 data.totalAmount = totalAmount
//                 data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
//                 data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
//                 data.houseBoatDetails = result
//                 if(sumOfTotals>=numberofRooms){
//                     if(totalGuestCanBeAccomadated>=adult){
//                         var totalRoomsFound =  data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
//                         if(totalRoomsFound>=numberofRooms){
//                             finalResult.push(data)
//                         }
//                     }else{
//                         //Calculations For additional Guests
//                         var istrue = false
//                          var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
//                         if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
//                             console.log("Cant Accomadate these many extra guests")
//                         }else{
//                             var reminingAdditionalGuests = additionalGuestAvailable
//                             var additionalAmount = 0;
//                             for(var d=0;d<data.houseBoatDetails.length;d++){
//                               //   if(reminingAdditionalGuests>0){
//                               //       if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                               //           additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                               //           reminingAdditionalGuests = 0;
//                               //           istrue = true;
//                               //           break
//                               //       }else{
//                               //           additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                               //           reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                               //       }
//                               //   }
//                               if(reminingAdditionalGuests>0){
//                                   if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
//                                       additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                       data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
//                                       var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate
//                                       if(!Misc.isnullorempty(houseBoatTotal)){
//                                           data.houseBoatDetails[d].customerRate = houseBoatTotal;
//                                       }
//                                       if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
//                                           data.houseBoatDetails[d].totalExtraPersonRate = 0;
//                                       }
//                                       reminingAdditionalGuests = 0;
//                                       istrue = true;
//                                       break
//                                   }else{
//                                       additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                       data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
//                                       var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate;
//                                       if(!Misc.isnullorempty(houseBoatTotal)){
//                                           data.houseBoatDetails[d].customerRate = houseBoatTotal;
//                                       }
//                                       if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
//                                           data.houseBoatDetails[d].totalExtraPersonRate = 0;
//                                       }
//                                       reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
//                                   }
//                               }
//                                 else{
//                                     istrue = true
//                                     break;
//                                 }
//                             }
//                             if (!isNaN(additionalAmount)){
//                                 data.additionalAmount = additionalAmount;
//                                 data.totalAmount +=additionalAmount
//                             }
//                             if(istrue == true){
//                                 finalResult.push(data)
//                             }
//                         }
//                     }
//                 }
//             }
//             function arraysEqual(arr1, arr2) {
//                 return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
//             }
//             finalResult = finalResult.filter((obj, index, array) => {
//                 return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
//             });
//             res.status(200).json({
//             status:true,
//             data: finalResult[0].houseBoatDetails,
//             customerRate:finalResult[0].totalAmount,
//             totalLength:finalResult.length,
//             singleboat: false,
//             msg: "success",
//         });
//         return;
//         }
//         }
//     } catch (e) {
//       console.log(e);
//       res.status(500).json({
//         status: false,
//         msg: "Something went wrong",
//         e,
//       });
//     }
//   });

  router.get("/houseboatbooking/multiple/view/v2", async (req, res) => {
    try {
        var {id,tripType,category,houseBoatType,location,numberofRooms,checkInDate,checkOutDate,children,adult} = req.query;
        if (!Array.isArray(id)) {
                res.status(200).json({
                status: false,
                msg: "Id must be an array",
            });
            return;
        }
        if (Misc.isnullorempty(tripType)) {
            res.status(200).json({
                status: true,
                msg: "Please Provide  Trip Type",
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
        if (Misc.isnullorempty(houseBoatType)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide houseBoatType",
            });
            return;
        }
        if (Misc.isnullorempty(location)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide location",
            });
            return;
        }
        if (Misc.isnullorempty(tripType)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide tripType",
            });
            return;
        }
        if (Misc.isnullorempty(numberofRooms)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide numberofRooms",
            });
            return;
        }
        if (typeof numberofRooms != 'number'){
            numberofRooms=parseInt(numberofRooms)
        }
        if(numberofRooms<=0){
            res.status(200).json({
                status:false,
                msg:"Number of rooms should be greater than zero."
            });
            return;
        }
        if(numberofRooms>=50){
            res.status(200).json({
                status:false,
                msg:"Please select a valid number of rooms."
            });
            return;
        }
        if (Misc.isnullorempty(checkInDate)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide checkInDate",
            });
            return;
        }
        if (Misc.isnullorempty(checkOutDate)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide checkOutDate",
            });
            return;
        }
        if (Misc.isnullorempty(adult)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide adult",
            });
            return;
        }
        if(typeof adult != 'number'){
            adult = parseInt(adult);
        }
        if(adult<=0){
            res.status(200).json({
                status:false,
                msg:"Please select atleast one adult guest."
            });
            return;
        }
        if(Misc.isnullorempty(children)){
            children = 0
        }else{
            children = parseInt(children)
        }
        if(children<0){
            res.status(200).json({
                status:false,
                msg:"Number of students should be a postive number."
            });
            return;
        }
        var totalGuest = adult;
        var startDateTime = new Date(checkInDate);
        var endDateTime = new Date(checkOutDate);
        var includedDates = await getDates(startDateTime,endDateTime)
        if(startDateTime.getTime()>endDateTime.getTime()){
            res.status(200).json({
                status:false,
                msg:"Invalid date selection, Please modify your search and try again."
            });
            return;
        }
        var result = []
        var ids = await id.map(x=>new mongoose.Types.ObjectId(x))
        var houseBoatQueryMultiple = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category,_id:{$in:ids} };
        if (houseBoatType === "Private") {
          if (tripType == "DayCruise") {
            //houseBoatQuery.totalRooms = { $gte: numberofRooms }
            var includedDates = await getDatesFiltered(startDateTime, endDateTime)
            houseBoatQueryMultiple.isDayCriuse = true;
            const today = new Date();
          //   const eightDaysAhead = new Date(today);
          //   eightDaysAhead.setDate(today.getDate() + 8);
          //   if (includedDates[0] > eightDaysAhead) {
          //       console.log("In 8 Days")
          //       res.status(200).json({
          //           status: false,
          //           msg: "Please refresh your page..........",
          //       });
          //       return;
          //   }
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
            const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
            var dateToCheck = new Date(includedDates[0]);
            if (dateToCheck.getFullYear() === todayYear && dateToCheck.getMonth() === todayMonth && dateToCheck.getDate() === todayDate && today.getTime() > today1PM.getTime()) {
                console.log("No Trip For Today")
                res.status(200).json({
                    status: false,
                    msg: "Please refresh your page..........",
                });
                return;
            }
            var vendorGroup = await houseBoatModel.aggregate([
                { $match: houseBoatQueryMultiple },
                { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                {$lookup: {from: "usermodels",localField: "userid",foreignField: "_id",as: "userid",},},
                {$unwind: {"path":"$userid", preserveNullAndEmptyArrays: true }},
                {
                    $lookup: {
                        from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        { $eq: ["$tripType", "DayCruise"] },
                                        { $in: ["Private", "$houseBoatType"] }
                                    ]
                                }
                            }
                        }], as: "tripDetails"
                    },
                },
                { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                { $match: { tripDetails: { $exists: true }, } },
                // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
                { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
                 { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
                 {
                    $lookup: {
                        from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        {
                                            $or: [
                                                { $eq: ["$tripType", "DayCruise"] },
                                                { $eq: ["$tripType", "OverNight"] }
                                            ]
                                        },
                                        { $eq: ["$paymentStatus", "Success"] },
                                        {
                                            $setIsSubset: ["$bookedDates", includedDates]
                                        },
                                    ]
                                }
                            }
                        }], as: "Bookings"
                    },
                },
                { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                { $match: { Bookings: { $exists: false }, } },
                {
                    $lookup: {
                        from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        {
                                            $or: [
                                                { $eq: ["$tripType", "DayCruise"] },
                                                { $eq: ["$tripType", "OverNight"] }
                                            ]
                                        },
                                        { $eq: ["$reservationStatus", "Reserved"] },
                                        {
                                            $setIsSubset: [includedDates, "$reservedDates"]
                                        },
                                    ]
                                }
                            }
                        }], as: "Reservations"
                    },
                },
                { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                { $match: { Reservations: { $exists: false }, } },
                { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                { $match:{ totalboats:{$gt:1}}}
                //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
            ])
            var locationGroup = await houseBoatModel.aggregate([
                { $match: houseBoatQueryMultiple },
                { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        { $eq: ["$tripType", "DayCruise"] },
                                        { $in: ["Private", "$houseBoatType"] }
                                    ]
                                }
                            }
                        }], as: "tripDetails"
                    },
                },
                { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                { $match: { tripDetails: { $exists: true }, } },
                { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
                // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
                { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
                {
                    $lookup: {
                        from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        {
                                            $or: [
                                                { $eq: ["$tripType", "DayCruise"] },
                                                { $eq: ["$tripType", "OverNight"] }
                                            ]
                                        },
                                        { $eq: ["$paymentStatus", "Success"] },
                                        {
                                            $setIsSubset: ["$bookedDates", includedDates]
                                        },
                                    ]
                                }
                            }
                        }], as: "Bookings"
                    },
                },
                { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                { $match: { Bookings: { $exists: false }, } },
                {
                    $lookup: {
                        from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        {
                                            $or: [
                                                { $eq: ["$tripType", "DayCruise"] },
                                                { $eq: ["$tripType", "OverNight"] }
                                            ]
                                        },
                                        { $eq: ["$reservationStatus", "Reserved"] },
                                        {
                                            $setIsSubset: [includedDates, "$reservedDates"]
                                        },
                                    ]
                                }
                            }
                        }], as: "Reservations"
                    },
                },
                { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                { $match: { Reservations: { $exists: false }, } },
                { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                { $match:{ totalboats:{$gt:1}}}
                //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
            ])
            var houseBoats = vendorGroup.concat(locationGroup)
            houseBoats = JSON.parse(JSON.stringify(houseBoats))
            var houseBoat = [];
            for (var n = 0; n < houseBoats.length; n++) {
                var result = [];
                for (var k = 0; k < houseBoats[n].details.length; k++) {
                    var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
                    if (getRate.status == true) {
                        houseBoats[n].details[k].customerRate = getRate.rate;
                        houseBoats[n].details[k].customerCommissionAmount = getRate.commissionAmount;
                        result.push(houseBoats[n].details[k])
                    }
                }
                houseBoat.push({ _id: houseBoats[n]._id, boats: result, totalboats: houseBoats[n].totalboats });
            }
            var finalResult = [];
            for (var h = 0; h < houseBoat.length; h++) {
                var newResult = getCombinationsOnDay(houseBoat[h].boats, adult);
                for (var i = 0; i < newResult.length; i++) {
                    var data = {}
                    var totalAmount = 0;
                    var customerRateCommission=0;
                    var id = [];
                    var totalGuestCanBeAccomadated = 0
                    if (newResult[i].length <= 1) {
                        continue;
                    }
                    var totalRemiGuests = adult;
                    for (var j = 0; j < newResult[i].length; j++) {
                        if (totalRemiGuests >= newResult[i][j].tripDetails.maxPersonTrips) {
                            var guestsForCalculations = newResult[i][j].tripDetails.maxPersonTrips;
                            totalRemiGuests = totalRemiGuests - newResult[i][j].tripDetails.maxPersonTrips;
                        } else {
                            var guestsForCalculations = totalRemiGuests;
                            totalRemiGuests = 0;
                        }
                        var getRate = await RateController.CalculateDayCruisRate(newResult[i][j], includedDates, guestsForCalculations)
                        if (getRate.status == true) {
                            newResult[i][j].customerRate = getRate.rate;
                            newResult[i][j].customerCommissionAmount = getRate.commissionAmount;
                            //result.push(houseBoats[n].details[k])
                        }
                        totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
                        totalAmount += newResult[i][j].customerRate;
                        customerRateCommission +=newResult[i][j].customerCommissionAmount;
                        id.push(newResult[i][j]._id)
                    }
                    data._id = id
                    data.totalAmount = totalAmount
                    data.customerRateCommission=customerRateCommission
                    data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated
                    data.houseBoatDetails = newResult[i]
                    finalResult.push(data)
                }
            }
            function arraysEqual(arr1, arr2) {
                return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
            }
            finalResult = finalResult.filter((obj, index, array) => {
                return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
            });
  
            res.status(200).json({
                status: true,
                data: finalResult[0].houseBoatDetails,
                customerRate: finalResult[0].totalAmount,
                customerRateCommission:finalResult[0].customerRateCommission,
                totalLength: finalResult.length,
                singleboat: false,
                msg: "success",
            });
            return;
        }
        else if(tripType == "NightStay"){
            var includedDates = await getDates(startDateTime,endDateTime)
            if(startDateTime.getTime()>endDateTime.getTime()){
                res.status(200).json({
                    status:false,
                    msg:"Invalid date selection, Please modify your search and try again."
                });
                return;
            }
            const today = new Date();
            const eightDaysAhead = new Date(today);
            eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
            if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                console.log("In 8 Days")//If out side 8 days error shoud be generated
                res.status(200).json({
                    status: false,
                    msg: "Please refresh your page..........",
                });
                return;
            }
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
            const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
            var dateTocheck = new Date(includedDates[0])
            if (
                dateTocheck.getFullYear() === todayYear &&
                dateTocheck.getMonth() === todayMonth &&
                dateTocheck.getDate() === todayDate &&
                today.getTime() > today11PM.getTime()
            ) {
                console.log("No Trip For Today")
                res.status(200).json({
                    status: false,
                    msg: "Please refresh your page..........",
                });
                return;
            }
            houseBoatQuery.isNightStay = true;
            //houseBoatQuery.totalRooms = {$gte:numberofRooms}
            var vendorGroup = await houseBoatModel.aggregate([
                {$match:houseBoatQuery},
                {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
                {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$tripType","NightStay"]},
                                { $in: ["Private", "$houseBoatType"] }
                            ]
                        }}
                    }],as:"tripDetails"},
                },
                {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                {$match:{tripDetails:{$exists:true},}},
                //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$tripType", "NightStay"] },
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                {
                                    $or: [{
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                        },
                                        {
                                        $and: [
                                            { $eq: ["$tripType", "OverNight"] },
                                            { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                        },
                                    ]
                                }
                            ]
                        }}
                    }],as:"Bookings"},
                },
                {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                {$match:{Bookings:{$exists:false},}},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$tripType", "NightStay"] },
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$reservationStatus", "Reserved"] },
                                {
                                    $or: [{
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                        },
                                        {
                                        $and: [
                                            { $eq: ["$tripType", "OverNight"] },
                                            { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                        },
                                    ]
                                }
                            ]
                        }}
                    }],as:"Reservations"},
                },
                {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                {$match:{Reservations:{$exists:false},}},
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                { $eq: ["$tripType", "DayCruise"] },
                                {
                                    $setIsSubset: [includedDates, "$bookedDates"]
                                }
                            ]
                        }}
                    }],as:"DayBookings"},
                },
                {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                pipeline: [{
                    $match: {$expr: { 
                        $and: [
                            { $eq: ["$status", "Active"] },
                            { $eq: ["$reservationStatus", "Reserved"] },
                            { $eq: ["$tripType", "DayCruise"] },
                            {
                                $setIsSubset: [includedDates,"$reservedDates" ]
                            },
                        ]
                    }}
                }],as:"DayReservations"},
            },
            {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
            {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
            {$group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
            {$match:{ totalboats:{$gt:1}}}
            ])
            var locationGroup = await houseBoatModel.aggregate([
                {$match:houseBoatQuery},
                {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
                {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$tripType","NightStay"]},
                                { $in: ["Private", "$houseBoatType"] }
                            ]
                        }}
                    }],as:"tripDetails"},
                },
                {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                {$match:{tripDetails:{$exists:true},}},
                //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$tripType", "NightStay"] },
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                {
                                    $or: [{
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                        },
                                        {
                                        $and: [
                                            { $eq: ["$tripType", "OverNight"] },
                                            { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                        },
                                    ]
                                }
                            ]
                        }}
                    }],as:"Bookings"},
                },
                {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                {$match:{Bookings:{$exists:false},}},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$tripType", "NightStay"] },
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$reservationStatus", "Reserved"] },
                                {
                                    $or: [{
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                        },
                                        {
                                        $and: [
                                            { $eq: ["$tripType", "OverNight"] },
                                            { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                        },
                                    ]
                                }
                            ]
                        }}
                    }],as:"Reservations"},
                },
                {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                {$match:{Reservations:{$exists:false},}},
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                { $eq: ["$tripType", "DayCruise"] },
                                {
                                    $setIsSubset: [includedDates, "$bookedDates"]
                                }
                            ]
                        }}
                    }],as:"DayBookings"},
                },
                {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                pipeline: [{
                    $match: {$expr: { 
                        $and: [
                            { $eq: ["$status", "Active"] },
                            { $eq: ["$reservationStatus", "Reserved"] },
                            { $eq: ["$tripType", "DayCruise"] },
                            {
                                $setIsSubset: [includedDates,"$reservedDates" ]
                            },
                        ]
                    }}
                }],as:"DayReservations"},
            },
            {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
            {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
            {$group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
            {$match:{ totalboats:{$gt:1}}}
            ])
            var houseBoats = vendorGroup.concat(locationGroup)
            houseBoats = JSON.parse(JSON.stringify(houseBoats))
            for(var h=0;h<houseBoats.length;h++){
                for(var g=0;g<houseBoats[h].details.length;g++){
                    var numberOfRooms = houseBoats[h].details[g].totalRooms;
                    var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                    var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                    houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                    houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                }
            }
            for(var p=0;p<houseBoats.length;p++){
                var result = [];
                var totalGuestCanBeAccomadated = 0
                var totalExtraGuestCanBeaccomadated = 0
                var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
                var hbs = getMostSutableValue;
                const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                for(var k =0;k<hbs.length;k++){
                    totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
                    totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                    var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                    hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                    hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                    var getRate = await RateController.CalculateNightStayRateCombination(hbs[k],includedDates,totalguests)
                    if(getRate.status == true){
                        hbs[k].customerRate = getRate.rate;
                        hbs[k].customerCommissionAmount = getRate.commissionAmount;
                        hbs[k].extraPersonRate = getRate.extraPersonRate
                        result.push(hbs[k])
                    }
                }
                var data = {}
                var totalAmount = 0
                var customerRateCommission=0;
                var id = [];
                for(var t=0;t<result.length;t++){
                    totalAmount  += result[t].customerRate;
                    customerRateCommission +=result[t].customerCommissionAmount;
                    id.push(result[t]._id)
                }
                data._id = id
                data.totalAmount = totalAmount
                data.customerRateCommission=customerRateCommission
                data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                data.houseBoatDetails = result
                if(sumOfTotals>=numberofRooms){
                    if(totalGuestCanBeAccomadated>=adult){
                        finalResult.push(data)
                    }else{
                        //Calculations For additional Guests
                        var istrue = false
                         var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
                        if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
                            console.log("Cant Accomadate these many extra guests")
                        }else{
                            var reminingAdditionalGuests = additionalGuestAvailable
                            var additionalAmount = 0;
                            for(var d=0;d<data.houseBoatDetails.length;d++){
                                if(reminingAdditionalGuests>0){
                                    if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                        additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                        reminingAdditionalGuests = 0;
                                        istrue = true;
                                        break
                                    }else{
                                        additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                        reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                    }
                                }else{
                                    istrue = true
                                    break;
                                }
                            }
                            if (!isNaN(additionalAmount)){
                                data.additionalAmount = additionalAmount;
                                data.totalAmount +=additionalAmount
                            }
                            if(istrue == true){
                                finalResult.push(data)
                            }
                        }
                    }
                }
            }
            function arraysEqual(arr1, arr2) {
                return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
            }
            finalResult = finalResult.filter((obj, index, array) => {
                return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
            });
            res.status(200).json({
                status:true,
                data: finalResult[0].houseBoatDetails,
                customerRate:finalResult[0].totalAmount,
                customerRateCommission:finalResult[0].customerRateCommission,
                totalLength:finalResult.length,
                singleboat: false,
                msg: "success",
            });
            return;
        }else{
            var includedDates = await getDates(startDateTime,endDateTime)
            if(startDateTime.getTime()>endDateTime.getTime()){
                res.status(200).json({
                    status:false,
                    msg:"Invalid date selection, Please modify your search and try again."
                });
                return;
            }
            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
            const today2PM = new Date(todayYear, todayMonth, todayDate, 2, 0, 0);
            var dateTocheck = new Date(includedDates[0])
            if (
                dateTocheck.getFullYear() === todayYear &&
                dateTocheck.getMonth() === todayMonth &&
                dateTocheck.getDate() === todayDate &&
                today.getTime() > today2PM.getTime()
            ) {
                console.log("No Trip For Today")
                res.status(200).json({
                    status: false,
                    msg: "Please refresh your page..........",
                });
                return;
            }
            houseBoatQueryMultiple.isOverNight = true;
            //houseBoatQueryMultiple.totalRooms = {$gte:numberofRooms}
            var vendorWise = await houseBoatModel.aggregate([
                {$match:houseBoatQueryMultiple},
                {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "usermodels",localField: "userid",foreignField: "_id",as: "userid",},},
                {$unwind: {"path":"$userid", preserveNullAndEmptyArrays: true }},
                {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$tripType","OverNight"]},
                                { $in: ["Private", "$houseBoatType"] }
                                
                            ]
                        }}
                    }],as:"tripDetails"},
                },
                {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                {$match:{tripDetails:{$exists:true},}},
                {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
                // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                {
                                    $setIsSubset: [ "$bookedDates",includedDates]
                                },
                            ]
                        }}
                    }],as:"Bookings"},
                },
                {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                {$match:{Bookings:{$exists:false},}},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$reservationStatus", "Reserved"] },
                                {
                                    $setIsSubset: [ includedDates,"$reservedDates"]
                                },
                            ]
                        }}
                    }],as:"Reservations"},
                },
                {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                {$match:{Reservations:{$exists:false},}},
                { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                { $match:{ totalboats:{$gt:1}}}
            ])
            var locationWise = await houseBoatModel.aggregate([
                {$match:houseBoatQueryMultiple},
                {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$tripType","OverNight"]},
                                { $in: ["Private", "$houseBoatType"] }
                                
                            ]
                        }}
                    }],as:"tripDetails"},
                },
                {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                {$match:{tripDetails:{$exists:true},}},
                {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
                // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                {
                                    $setIsSubset: [ "$bookedDates",includedDates]
                                },
                            ]
                        }}
                    }],as:"Bookings"},
                },
                {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                {$match:{Bookings:{$exists:false},}},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$reservationStatus", "Reserved"] },
                                {
                                    $setIsSubset: [ includedDates,"$reservedDates"]
                                },
                            ]
                        }}
                    }],as:"Reservations"},
                },
                {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                {$match:{Reservations:{$exists:false},}},
                { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                { $match:{ totalboats:{$gt:1}}}
            ])
            houseBoats = vendorWise.concat(locationWise)
            /*
            ---------------------CODE EXPLANATION----------------
            Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
            $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, similar to the previous examples.
            $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "OverNight", and house boat type being "Private".
            $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
            $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates.
            $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
            $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates.
            $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
            This aggregation pipeline seems to focus on filtering documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, primarily focusing on overnight stays with specific criteria for availability.
            ---------------------------END-----------------------
            */
            houseBoats = JSON.parse(JSON.stringify(houseBoats))
            for(var h=0;h<houseBoats.length;h++){
                for(var g=0;g<houseBoats[h].details.length;g++){
                    var numberOfRooms = houseBoats[h].details[g].totalRooms;
                    var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                    var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                    houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                    houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                }
            }
            var finalResult = [];
            
            for(var p=0;p<houseBoats.length;p++){
                var result = [];
                var totalGuestCanBeAccomadated = 0
                var totalExtraGuestCanBeaccomadated = 0
                var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
                var hbs = getMostSutableValue;
                const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                for(var k =0;k<hbs.length;k++){
                    totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
                    totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                    var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                    hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                    hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                    var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k],includedDates,totalguests)
                    if(getRate.status == true){
                        hbs[k].customerRate = getRate.rate;
                        hbs[k].customerCommissionAmount = getRate.commissionAmount;
                        hbs[k].extraPersonRate = getRate.extraPersonRate
                        result.push(hbs[k])
                    }
                }
                var data = {}
                var totalAmount = 0
                var customerRateCommission=0
                var id = [];
                for(var t=0;t<result.length;t++){
                    totalAmount  += result[t].customerRate;
                    customerRateCommission +=result[t].customerCommissionAmount;
                    id.push(result[t]._id)
                }
                data._id = id
                data.totalAmount = totalAmount
                data.customerRateCommission=customerRateCommission
                data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                data.houseBoatDetails = result
                if(sumOfTotals>=numberofRooms){
                    if(totalGuestCanBeAccomadated>=adult){
                        var totalRoomsFound =  data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                        if(totalRoomsFound>=numberofRooms){
                            finalResult.push(data)
                        }
                    }else{
                        //Calculations For additional Guests
                        var istrue = false
                         var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
                        if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
                            console.log("Cant Accomadate these many extra guests")
                        }else{
                            var reminingAdditionalGuests = additionalGuestAvailable
                            var additionalAmount = 0;
                            for(var d=0;d<data.houseBoatDetails.length;d++){
                              //   if(reminingAdditionalGuests>0){
                              //       if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                              //           additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                              //           reminingAdditionalGuests = 0;
                              //           istrue = true;
                              //           break
                              //       }else{
                              //           additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                              //           reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                              //       }
                              //   }
                              if(reminingAdditionalGuests>0){
                                  if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                      additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                      data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                      var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate
                                      if(!Misc.isnullorempty(houseBoatTotal)){
                                          data.houseBoatDetails[d].customerRate = houseBoatTotal;
                                      }
                                      if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                          data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                      }
                                      reminingAdditionalGuests = 0;
                                      istrue = true;
                                      break
                                  }else{
                                      additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                      data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                      var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate;
                                      if(!Misc.isnullorempty(houseBoatTotal)){
                                          data.houseBoatDetails[d].customerRate = houseBoatTotal;
                                      }
                                      if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                          data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                      }
                                      reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                  }
                              }
                                else{
                                    istrue = true
                                    break;
                                }
                            }
                            if (!isNaN(additionalAmount)){
                                data.additionalAmount = additionalAmount;
                                data.totalAmount +=additionalAmount
                            }
                            if(istrue == true){
                                finalResult.push(data)
                            }
                        }
                    }
                }
            }
            function arraysEqual(arr1, arr2) {
                return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
            }
            finalResult = finalResult.filter((obj, index, array) => {
                return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
            });
            res.status(200).json({
            status:true,
            data: finalResult[0].houseBoatDetails,
            customerRate:finalResult[0].totalAmount,
            customerRateCommission:finalResult[0].customerRateCommission,
            totalLength:finalResult.length,
            singleboat: false,
            msg: "success",
        });
        return;
        }
        }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        status: false,
        msg: "Something went wrong",
        e,
      });
    }
  });


  router.get("/houseboatbooking/multiple/view", async (req, res) => {
    try {
        var {id,tripType,category,houseBoatType,location,numberofRooms,checkInDate,checkOutDate,children,adult} = req.query;
        if (!Array.isArray(id)) {
                res.status(200).json({
                status: false,
                msg: "Id must be an array",
            });
            return;
        }
        if (Misc.isnullorempty(tripType)) {
            res.status(200).json({
                status: true,
                msg: "Please Provide  Trip Type",
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
        if (Misc.isnullorempty(houseBoatType)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide houseBoatType",
            });
            return;
        }
        if (Misc.isnullorempty(location)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide location",
            });
            return;
        }
        if (Misc.isnullorempty(tripType)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide tripType",
            });
            return;
        }
        if (Misc.isnullorempty(numberofRooms)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide numberofRooms",
            });
            return;
        }
        if (typeof numberofRooms != 'number'){
            numberofRooms=parseInt(numberofRooms)
        }
        if(numberofRooms<=0){
            res.status(200).json({
                status:false,
                msg:"Number of rooms should be greater than zero."
            });
            return;
        }
        if(numberofRooms>=50){
            res.status(200).json({
                status:false,
                msg:"Please select a valid number of rooms."
            });
            return;
        }
        if (Misc.isnullorempty(checkInDate)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide checkInDate",
            });
            return;
        }
        if (Misc.isnullorempty(checkOutDate)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide checkOutDate",
            });
            return;
        }
        if (Misc.isnullorempty(adult)) {
            res.status(200).json({
                status: false,
                msg: "Please Provide adult",
            });
            return;
        }
        if(typeof adult != 'number'){
            adult = parseInt(adult);
        }
        if(adult<=0){
            res.status(200).json({
                status:false,
                msg:"Please select atleast one adult guest."
            });
            return;
        }
        if(Misc.isnullorempty(children)){
            children = 0
        }else{
            children = parseInt(children)
        }
        if(children<0){
            res.status(200).json({
                status:false,
                msg:"Number of students should be a postive number."
            });
            return;
        }
        var totalGuest = adult;
        var startDateTime = new Date(checkInDate);
        var endDateTime = new Date(checkOutDate);
        var includedDates = await getDates(startDateTime,endDateTime)
        if(startDateTime.getTime()>endDateTime.getTime()){
            res.status(200).json({
                status:false,
                msg:"Invalid date selection, Please modify your search and try again."
            });
            return;
        }
        var result = []
        var ids = await id.map(x=>new mongoose.Types.ObjectId(x))
        var houseBoatQueryMultiple = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category,_id:{$in:ids} };
        if (houseBoatType === "Private") {
          if (tripType == "DayCruise") {
            //houseBoatQuery.totalRooms = { $gte: numberofRooms }
            var includedDates = await getDatesFiltered(startDateTime, endDateTime)
            houseBoatQueryMultiple.isDayCriuse = true;
            const today = new Date();
          //   const eightDaysAhead = new Date(today);
          //   eightDaysAhead.setDate(today.getDate() + 8);
          //   if (includedDates[0] > eightDaysAhead) {
          //       console.log("In 8 Days")
          //       res.status(200).json({
          //           status: false,
          //           msg: "Please refresh your page..........",
          //       });
          //       return;
          //   }
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
            const today1PM = new Date(todayYear, todayMonth, todayDate, 1, 0, 0);
            var dateToCheck = new Date(includedDates[0]);
            if (dateToCheck.getFullYear() === todayYear && dateToCheck.getMonth() === todayMonth && dateToCheck.getDate() === todayDate && today.getTime() > today1PM.getTime()) {
                console.log("No Trip For Today")
                res.status(200).json({
                    status: false,
                    msg: "Please refresh your page..........",
                });
                return;
            }
            var vendorGroup = await houseBoatModel.aggregate([
                { $match: houseBoatQueryMultiple },
                { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                {$lookup: {from: "usermodels",localField: "userid",foreignField: "_id",as: "userid",},},
                {$unwind: {"path":"$userid", preserveNullAndEmptyArrays: true }},
                {
                    $lookup: {
                        from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        { $eq: ["$tripType", "DayCruise"] },
                                        { $in: ["Private", "$houseBoatType"] }
                                    ]
                                }
                            }
                        }], as: "tripDetails"
                    },
                },
                { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                { $match: { tripDetails: { $exists: true }, } },
                // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
                { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
                 { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
                 {
                    $lookup: {
                        from: "reviewmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                              status:"Active",houseBoatId:{$in:ids}
                            }
                        }], as: "reviews"
                    },
                },
                 {
                    $lookup: {
                        from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        {
                                            $or: [
                                                { $eq: ["$tripType", "DayCruise"] },
                                                { $eq: ["$tripType", "OverNight"] }
                                            ]
                                        },
                                        { $eq: ["$paymentStatus", "Success"] },
                                        {
                                            $setIsSubset: ["$bookedDates", includedDates]
                                        },
                                    ]
                                }
                            }
                        }], as: "Bookings"
                    },
                },
                { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                { $match: { Bookings: { $exists: false }, } },
                {
                    $lookup: {
                        from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        {
                                            $or: [
                                                { $eq: ["$tripType", "DayCruise"] },
                                                { $eq: ["$tripType", "OverNight"] }
                                            ]
                                        },
                                        { $eq: ["$reservationStatus", "Reserved"] },
                                        {
                                            $setIsSubset: [includedDates, "$reservedDates"]
                                        },
                                    ]
                                }
                            }
                        }], as: "Reservations"
                    },
                },
                { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                { $match: { Reservations: { $exists: false }, } },
                { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                { $match:{ totalboats:{$gt:1}}}
                //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
            ])
            var locationGroup = await houseBoatModel.aggregate([
                { $match: houseBoatQueryMultiple },
                { $lookup: { from: "sublocationmodels", localField: "startingLocation", foreignField: "_id", as: "startingLocation", }, },
                { $unwind: { "path": "$startingLocation", preserveNullAndEmptyArrays: true } },
                { $lookup: { from: "locationmodels", localField: "location", foreignField: "_id", as: "location", }, },
                { $unwind: { "path": "$location", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "triptypemodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        { $eq: ["$tripType", "DayCruise"] },
                                        { $in: ["Private", "$houseBoatType"] }
                                    ]
                                }
                            }
                        }], as: "tripDetails"
                    },
                },
                { $unwind: { "path": "$tripDetails", preserveNullAndEmptyArrays: true } },
                { $match: { tripDetails: { $exists: true }, } },
                { $sort:{"tripDetails.maxCapacityOfBoat":-1}},
                // { $match: { "tripDetails.maxPersonTrips": { $gte: totalGuest } } },
                { $match: { "tripDetails.minPersonTrips": { $lte: totalGuest } } },
                {
                    $lookup: {
                        from: "reviewmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                              status:"Active",houseBoatId:{$in:ids}
                            }
                        }], as: "reviews"
                    },
                },
                {
                    $lookup: {
                        from: "houseboatbookingitemmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        {
                                            $or: [
                                                { $eq: ["$tripType", "DayCruise"] },
                                                { $eq: ["$tripType", "OverNight"] }
                                            ]
                                        },
                                        { $eq: ["$paymentStatus", "Success"] },
                                        {
                                            $setIsSubset: ["$bookedDates", includedDates]
                                        },
                                    ]
                                }
                            }
                        }], as: "Bookings"
                    },
                },
                { $unwind: { "path": "$Bookings", preserveNullAndEmptyArrays: true } },
                { $match: { Bookings: { $exists: false }, } },
                {
                    $lookup: {
                        from: "reservationmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                                $expr: {
                                    $and: [
                                        { $eq: ["$status", "Active"] },
                                        {
                                            $or: [
                                                { $eq: ["$tripType", "DayCruise"] },
                                                { $eq: ["$tripType", "OverNight"] }
                                            ]
                                        },
                                        { $eq: ["$reservationStatus", "Reserved"] },
                                        {
                                            $setIsSubset: [includedDates, "$reservedDates"]
                                        },
                                    ]
                                }
                            }
                        }], as: "Reservations"
                    },
                },
                { $unwind: { "path": "$Reservations", preserveNullAndEmptyArrays: true } },
                { $match: { Reservations: { $exists: false }, } },
                { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                { $match:{ totalboats:{$gt:1}}}
                //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
            ])
            var houseBoats = vendorGroup.concat(locationGroup)
            houseBoats = JSON.parse(JSON.stringify(houseBoats))
            var houseBoat = [];
            for (var n = 0; n < houseBoats.length; n++) {
                var result = [];
                for (var k = 0; k < houseBoats[n].details.length; k++) {
                    var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
                    if (getRate.status == true) {
                        houseBoats[n].details[k].customerRate = getRate.rate;
                        houseBoats[n].details[k].customerCommissionAmount = getRate.commissionAmount;
                        result.push(houseBoats[n].details[k])
                    }
                }
                houseBoat.push({ _id: houseBoats[n]._id, boats: result, totalboats: houseBoats[n].totalboats });
            }
            var finalResult = [];
            for (var h = 0; h < houseBoat.length; h++) {
                var newResult = getCombinationsOnDay(houseBoat[h].boats, adult);
                for (var i = 0; i < newResult.length; i++) {
                    var data = {}
                    var totalAmount = 0;
                    var customerRateCommission=0;
                    var id = [];
                    var totalGuestCanBeAccomadated = 0
                    if (newResult[i].length <= 1) {
                        continue;
                    }
                    var totalRemiGuests = adult;
                    for (var j = 0; j < newResult[i].length; j++) {
                        if (totalRemiGuests >= newResult[i][j].tripDetails.maxPersonTrips) {
                            var guestsForCalculations = newResult[i][j].tripDetails.maxPersonTrips;
                            totalRemiGuests = totalRemiGuests - newResult[i][j].tripDetails.maxPersonTrips;
                        } else {
                            var guestsForCalculations = totalRemiGuests;
                            totalRemiGuests = 0;
                        }
                        var getRate = await RateController.CalculateDayCruisRate(newResult[i][j], includedDates, guestsForCalculations)
                        if (getRate.status == true) {
                            newResult[i][j].customerRate = getRate.rate;
                            newResult[i][j].customerCommissionAmount = getRate.commissionAmount;
                            //result.push(houseBoats[n].details[k])
                        }
                        totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
                        totalAmount += newResult[i][j].customerRate;
                        customerRateCommission +=newResult[i][j].customerCommissionAmount;
                        id.push(newResult[i][j]._id)
                    }
                    data._id = id
                    data.totalAmount = totalAmount
                    data.customerRateCommission=customerRateCommission
                    data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated
                    data.houseBoatDetails = newResult[i]
                    finalResult.push(data)
                }
            }
            function arraysEqual(arr1, arr2) {
                return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
            }
            finalResult = finalResult.filter((obj, index, array) => {
                return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
            });
  
            res.status(200).json({
                status: true,
                data: finalResult[0].houseBoatDetails,
                customerRate: finalResult[0].totalAmount,
                customerRateCommission:finalResult[0].customerRateCommission,
                totalLength: finalResult.length,
                singleboat: false,
                msg: "success",
            });
            return;
        }
        else if(tripType == "NightStay"){
            var includedDates = await getDates(startDateTime,endDateTime)
            if(startDateTime.getTime()>endDateTime.getTime()){
                res.status(200).json({
                    status:false,
                    msg:"Invalid date selection, Please modify your search and try again."
                });
                return;
            }
            const today = new Date();
            const eightDaysAhead = new Date(today);
            eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
            if(includedDates[0]>eightDaysAhead){//Checking for the check in date is in between 8 days
                console.log("In 8 Days")//If out side 8 days error shoud be generated
                res.status(200).json({
                    status: false,
                    msg: "Please refresh your page..........",
                });
                return;
            }
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
            const today11PM = new Date(todayYear, todayMonth, todayDate, 23, 0, 0);
            var dateTocheck = new Date(includedDates[0])
            if (
                dateTocheck.getFullYear() === todayYear &&
                dateTocheck.getMonth() === todayMonth &&
                dateTocheck.getDate() === todayDate &&
                today.getTime() > today11PM.getTime()
            ) {
                console.log("No Trip For Today")
                res.status(200).json({
                    status: false,
                    msg: "Please refresh your page..........",
                });
                return;
            }
            houseBoatQuery.isNightStay = true;
            //houseBoatQuery.totalRooms = {$gte:numberofRooms}
            var vendorGroup = await houseBoatModel.aggregate([
                {$match:houseBoatQuery},
                {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
                {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$tripType","NightStay"]},
                                { $in: ["Private", "$houseBoatType"] }
                            ]
                        }}
                    }],as:"tripDetails"},
                },
                {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                {$match:{tripDetails:{$exists:true},}},
                //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                {
                    $lookup: {
                        from: "reviewmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                              status:"Active",houseBoatId:{$in:ids}
                            }
                        }], as: "reviews"
                    },
                },
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$tripType", "NightStay"] },
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                {
                                    $or: [{
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                        },
                                        {
                                        $and: [
                                            { $eq: ["$tripType", "OverNight"] },
                                            { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                        },
                                    ]
                                }
                            ]
                        }}
                    }],as:"Bookings"},
                },
                {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                {$match:{Bookings:{$exists:false},}},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$tripType", "NightStay"] },
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$reservationStatus", "Reserved"] },
                                {
                                    $or: [{
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                        },
                                        {
                                        $and: [
                                            { $eq: ["$tripType", "OverNight"] },
                                            { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                        },
                                    ]
                                }
                            ]
                        }}
                    }],as:"Reservations"},
                },
                {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                {$match:{Reservations:{$exists:false},}},
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                { $eq: ["$tripType", "DayCruise"] },
                                {
                                    $setIsSubset: [includedDates, "$bookedDates"]
                                }
                            ]
                        }}
                    }],as:"DayBookings"},
                },
                {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                pipeline: [{
                    $match: {$expr: { 
                        $and: [
                            { $eq: ["$status", "Active"] },
                            { $eq: ["$reservationStatus", "Reserved"] },
                            { $eq: ["$tripType", "DayCruise"] },
                            {
                                $setIsSubset: [includedDates,"$reservedDates" ]
                            },
                        ]
                    }}
                }],as:"DayReservations"},
            },
            {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
            {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
            {$group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
            {$match:{ totalboats:{$gt:1}}}
            ])
            var locationGroup = await houseBoatModel.aggregate([
                {$match:houseBoatQuery},
                {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                {$unwind: {"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                {$unwind: {"path":"$location", preserveNullAndEmptyArrays: true }},
                {$lookup: {from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$tripType","NightStay"]},
                                { $in: ["Private", "$houseBoatType"] }
                            ]
                        }}
                    }],as:"tripDetails"},
                },
                {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                {$match:{tripDetails:{$exists:true},}},
                //{$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                {
                    $lookup: {
                        from: "reviewmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                              status:"Active",houseBoatId:{$in:ids}
                            }
                        }], as: "reviews"
                    },
                },
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$tripType", "NightStay"] },
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                {
                                    $or: [{
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$endDate", startDateTime] }]}]
                                        },
                                        {
                                        $and: [
                                            { $eq: ["$tripType", "OverNight"] },
                                            { $and: [{ $lte: ["$endDateTime", "$endDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                        },
                                    ]
                                }
                            ]
                        }}
                    }],as:"Bookings"},
                },
                {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                {$match:{Bookings:{$exists:false},}},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$tripType", "NightStay"] },
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$reservationStatus", "Reserved"] },
                                {
                                    $or: [{
                                        $and: [
                                            { $eq: ["$tripType", "NightStay"] },
                                            { $and: [{ $lte: ["$startDate", endDateTime] },{ $gte: ["$checkOutDate", startDateTime] }]}]
                                        },
                                        {
                                        $and: [
                                            { $eq: ["$tripType", "OverNight"] },
                                            { $and: [{ $lte: ["$endDateTime", "$checkOutDate"] },{ $gte: ["$startDateTime", "$startDate"] }]}]
                                        },
                                    ]
                                }
                            ]
                        }}
                    }],as:"Reservations"},
                },
                {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                {$match:{Reservations:{$exists:false},}},
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                { $eq: ["$tripType", "DayCruise"] },
                                {
                                    $setIsSubset: [includedDates, "$bookedDates"]
                                }
                            ]
                        }}
                    }],as:"DayBookings"},
                },
                {$unwind:{"path":"$DayBookings", preserveNullAndEmptyArrays: true }},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                pipeline: [{
                    $match: {$expr: { 
                        $and: [
                            { $eq: ["$status", "Active"] },
                            { $eq: ["$reservationStatus", "Reserved"] },
                            { $eq: ["$tripType", "DayCruise"] },
                            {
                                $setIsSubset: [includedDates,"$reservedDates" ]
                            },
                        ]
                    }}
                }],as:"DayReservations"},
            },
            {$unwind:{"path":"$DayReservations", preserveNullAndEmptyArrays: true }},
            {$match:{$or:[{DayBookings:{$exists:true}},{DayReservations:{$exists:true}}]}},
            {$group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
            {$match:{ totalboats:{$gt:1}}}
            ])
            var houseBoats = vendorGroup.concat(locationGroup)
            houseBoats = JSON.parse(JSON.stringify(houseBoats))
            for(var h=0;h<houseBoats.length;h++){
                for(var g=0;g<houseBoats[h].details.length;g++){
                    var numberOfRooms = houseBoats[h].details[g].totalRooms;
                    var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                    var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                    houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                    houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                }
            }
            for(var p=0;p<houseBoats.length;p++){
                var result = [];
                var totalGuestCanBeAccomadated = 0
                var totalExtraGuestCanBeaccomadated = 0
                var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
                var hbs = getMostSutableValue;
                const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                for(var k =0;k<hbs.length;k++){
                    totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
                    totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                    var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                    hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                    hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                    var getRate = await RateController.CalculateNightStayRateCombination(hbs[k],includedDates,totalguests)
                    if(getRate.status == true){
                        hbs[k].customerRate = getRate.rate;
                        hbs[k].customerCommissionAmount = getRate.commissionAmount;
                        hbs[k].extraPersonRate = getRate.extraPersonRate
                        result.push(hbs[k])
                    }
                }
                var data = {}
                var totalAmount = 0
                var customerRateCommission=0;
                var id = [];
                for(var t=0;t<result.length;t++){
                    totalAmount  += result[t].customerRate;
                    customerRateCommission +=result[t].customerCommissionAmount;
                    id.push(result[t]._id)
                }
                data._id = id
                data.totalAmount = totalAmount
                data.customerRateCommission=customerRateCommission
                data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                data.houseBoatDetails = result
                if(sumOfTotals>=numberofRooms){
                    if(totalGuestCanBeAccomadated>=adult){
                        finalResult.push(data)
                    }else{
                        //Calculations For additional Guests
                        var istrue = false
                         var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
                        if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
                            console.log("Cant Accomadate these many extra guests")
                        }else{
                            var reminingAdditionalGuests = additionalGuestAvailable
                            var additionalAmount = 0;
                            for(var d=0;d<data.houseBoatDetails.length;d++){
                                if(reminingAdditionalGuests>0){
                                    if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                        additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                        reminingAdditionalGuests = 0;
                                        istrue = true;
                                        break
                                    }else{
                                        additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                        reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                    }
                                }else{
                                    istrue = true
                                    break;
                                }
                            }
                            if (!isNaN(additionalAmount)){
                                data.additionalAmount = additionalAmount;
                                data.totalAmount +=additionalAmount
                            }
                            if(istrue == true){
                                finalResult.push(data)
                            }
                        }
                    }
                }
            }
            function arraysEqual(arr1, arr2) {
                return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
            }
            finalResult = finalResult.filter((obj, index, array) => {
                return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
            });
            res.status(200).json({
                status:true,
                data: finalResult[0].houseBoatDetails,
                customerRate:finalResult[0].totalAmount,
                customerRateCommission:finalResult[0].customerRateCommission,
                totalLength:finalResult.length,
                singleboat: false,
                msg: "success",
            });
            return;
        }else{
            var includedDates = await getDates(startDateTime,endDateTime)
            if(startDateTime.getTime()>endDateTime.getTime()){
                res.status(200).json({
                    status:false,
                    msg:"Invalid date selection, Please modify your search and try again."
                });
                return;
            }
            const today = new Date();
            const todayYear = today.getFullYear();
            const todayMonth = today.getMonth();
            const todayDate = today.getDate();
            const today2PM = new Date(todayYear, todayMonth, todayDate, 2, 0, 0);
            var dateTocheck = new Date(includedDates[0])
            if (
                dateTocheck.getFullYear() === todayYear &&
                dateTocheck.getMonth() === todayMonth &&
                dateTocheck.getDate() === todayDate &&
                today.getTime() > today2PM.getTime()
            ) {
                console.log("No Trip For Today")
                res.status(200).json({
                    status: false,
                    msg: "Please refresh your page..........",
                });
                return;
            }
            houseBoatQueryMultiple.isOverNight = true;
            //houseBoatQueryMultiple.totalRooms = {$gte:numberofRooms}
            var vendorWise = await houseBoatModel.aggregate([
                {$match:houseBoatQueryMultiple},
                {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "usermodels",localField: "userid",foreignField: "_id",as: "userid",},},
                {$unwind: {"path":"$userid", preserveNullAndEmptyArrays: true }},
                {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$tripType","OverNight"]},
                                { $in: ["Private", "$houseBoatType"] }
                                
                            ]
                        }}
                    }],as:"tripDetails"},
                },
                {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                {$match:{tripDetails:{$exists:true},}},
                {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
                // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                {
                    $lookup: {
                        from: "reviewmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                              status:"Active",houseBoatId:{$in:ids}
                            }
                        }], as: "reviews"
                    },
                },
               // { $unwind: { "path": "$reviews", preserveNullAndEmptyArrays: true } },
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                {
                                    $setIsSubset: [ "$bookedDates",includedDates]
                                },
                            ]
                        }}
                    }],as:"Bookings"},
                },
                {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                {$match:{Bookings:{$exists:false},}},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$reservationStatus", "Reserved"] },
                                {
                                    $setIsSubset: [ includedDates,"$reservedDates"]
                                },
                            ]
                        }}
                    }],as:"Reservations"},
                },
                {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                {$match:{Reservations:{$exists:false},}},
                { $group: {_id: "$vendorid",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                { $match:{ totalboats:{$gt:1}}}
            ])
            var locationWise = await houseBoatModel.aggregate([
                {$match:houseBoatQueryMultiple},
                {$lookup: {from: "sublocationmodels",localField: "startingLocation",foreignField: "_id",as: "startingLocation",},},
                {$unwind:{"path":"$startingLocation", preserveNullAndEmptyArrays: true }},
                {$lookup: {from: "locationmodels",localField: "location",foreignField: "_id",as: "location",},},
                {$unwind:{"path":"$location", preserveNullAndEmptyArrays: true }},
                {$lookup:{from:"triptypemodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$tripType","OverNight"]},
                                { $in: ["Private", "$houseBoatType"] }
                                
                            ]
                        }}
                    }],as:"tripDetails"},
                },
                {$unwind:{"path":"$tripDetails", preserveNullAndEmptyArrays: true }},
                {$match:{tripDetails:{$exists:true},}},
                {$sort:{"tripDetails.maxCapacityOfBoats":-1}},
                // {$match:{"tripDetails.maxCapacityOfBoats":{$gte:totalGuest}}},
                {$match:{"tripDetails.minCapacityOfBoats":{$lte:totalGuest}}},
                {
                    $lookup: {
                        from: "reviewmodels", localField: "_id", foreignField: "houseBoatId",
                        pipeline: [{
                            $match: {
                              status:"Active",houseBoatId:{$in:ids}
                            }
                        }], as: "reviews"
                    },
                },
               // { $unwind: { "path": "$reviews", preserveNullAndEmptyArrays: true } },
                {$lookup:{from:"houseboatbookingitemmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$paymentStatus", "Success"] },
                                {
                                    $setIsSubset: [ "$bookedDates",includedDates]
                                },
                            ]
                        }}
                    }],as:"Bookings"},
                },
                {$unwind:{"path":"$Bookings", preserveNullAndEmptyArrays: true }},
                {$match:{Bookings:{$exists:false},}},
                {$lookup:{from:"reservationmodels",localField:"_id",foreignField:"houseBoatId" ,
                    pipeline: [{
                        $match: {$expr: { 
                            $and: [
                                { $eq: ["$status", "Active"] },
                                { $eq: ["$reservationStatus", "Reserved"] },
                                {
                                    $setIsSubset: [ includedDates,"$reservedDates"]
                                },
                            ]
                        }}
                    }],as:"Reservations"},
                },
                {$unwind:{"path":"$Reservations", preserveNullAndEmptyArrays: true }},
                {$match:{Reservations:{$exists:false},}},
                { $group: {_id: "$startingLocation",totalboats: { $sum: 1 },details: { $push: "$$ROOT" }}},
                { $match:{ totalboats:{$gt:1}}}
            ])
            houseBoats = vendorWise.concat(locationWise)
            /*
            ---------------------CODE EXPLANATION----------------
            Initial $match Stage: Filters documents in the houseBoatModel collection based on the provided houseBoatQueryMultiple.
            $lookup and $unwind stages for locations: Fetches details from related collections (sublocationmodels and locationmodels) based on startingLocation and location fields, similar to the previous examples.
            $lookup for tripDetails: Retrieves trip details from the triptypemodels collection based on specific criteria: active status, trip type being "OverNight", and house boat type being "Private".
            $unwind and $match stages related to tripDetails: Unwinds the tripDetails array and filters documents based on its existence and minimum capacity of boats compared to totalGuest.
            $lookup and subsequent stages for Bookings: Checks for active bookings considering criteria such as active status, successful payment status, and the presence of included dates within booked dates.
            $unwind and $match stages for Bookings: Unwinds the Bookings array and filters documents where the Bookings array doesn't exist.
            $lookup and subsequent stages for Reservations: Checks for active reservations considering criteria such as active status, reservation status being "Reserved", and the presence of included dates within reserved dates.
            $unwind and $match stages for Reservations: Unwinds the Reservations array and filters documents where the Reservations array doesn't exist.
            This aggregation pipeline seems to focus on filtering documents in the houseBoatModel collection based on specific conditions related to trip types, capacities, active bookings/reservations, successful payments, and date overlaps, primarily focusing on overnight stays with specific criteria for availability.
            ---------------------------END-----------------------
            */
            houseBoats = JSON.parse(JSON.stringify(houseBoats))
            for(var h=0;h<houseBoats.length;h++){
                for(var g=0;g<houseBoats[h].details.length;g++){
                    var numberOfRooms = houseBoats[h].details[g].totalRooms;
                    var numberOfMaxGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                    var numberOfMaxExtraGuest = numberOfRooms*houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                    houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                    houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                }
            }
            var finalResult = [];
            
            for(var p=0;p<houseBoats.length;p++){
                var result = [];
                var totalGuestCanBeAccomadated = 0
                var totalExtraGuestCanBeaccomadated = 0
                var getMostSutableValue = await getCombinations(houseBoats[p].details,numberofRooms)
                var hbs = getMostSutableValue;
                const sumOfTotals = hbs.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                for(var k =0;k<hbs.length;k++){
                    totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms*hbs[k].totalRooms
                    totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                    var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                    hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                    hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms*hbs[k].totalRooms
                    var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k],includedDates,totalguests)
                    if(getRate.status == true){
                        hbs[k].customerRate = getRate.rate;
                        hbs[k].customerCommissionAmount = getRate.commissionAmount;
                        hbs[k].extraPersonRate = getRate.extraPersonRate
                        result.push(hbs[k])
                    }
                }
                var data = {}
                var totalAmount = 0
                var customerRateCommission=0
                var id = [];
                for(var t=0;t<result.length;t++){
                    totalAmount  += result[t].customerRate;
                    customerRateCommission +=result[t].customerCommissionAmount;
                    id.push(result[t]._id)
                }
                data._id = id
                data.totalAmount = totalAmount
                data.customerRateCommission=customerRateCommission
                data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                data.houseBoatDetails = result
                if(sumOfTotals>=numberofRooms){
                    if(totalGuestCanBeAccomadated>=adult){
                        var totalRoomsFound =  data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                        if(totalRoomsFound>=numberofRooms){
                            finalResult.push(data)
                        }
                    }else{
                        //Calculations For additional Guests
                        var istrue = false
                         var additionalGuestAvailable  = adult-totalGuestCanBeAccomadated
                        if(totalExtraGuestCanBeaccomadated<additionalGuestAvailable){
                            console.log("Cant Accomadate these many extra guests")
                        }else{
                            var reminingAdditionalGuests = additionalGuestAvailable
                            var additionalAmount = 0;
                            for(var d=0;d<data.houseBoatDetails.length;d++){
                              //   if(reminingAdditionalGuests>0){
                              //       if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                              //           additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                              //           reminingAdditionalGuests = 0;
                              //           istrue = true;
                              //           break
                              //       }else{
                              //           additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                              //           reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                              //       }
                              //   }
                              if(reminingAdditionalGuests>0){
                                  if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                      additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                      data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                      var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate
                                      if(!Misc.isnullorempty(houseBoatTotal)){
                                          data.houseBoatDetails[d].customerRate = houseBoatTotal;
                                      }
                                      if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                          data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                      }
                                      reminingAdditionalGuests = 0;
                                      istrue = true;
                                      break
                                  }else{
                                      additionalAmount += data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                      data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                      var houseBoatTotal = data.houseBoatDetails[d].customerRate+data.houseBoatDetails[d].totalExtraPersonRate;
                                      if(!Misc.isnullorempty(houseBoatTotal)){
                                          data.houseBoatDetails[d].customerRate = houseBoatTotal;
                                      }
                                      if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                          data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                      }
                                      reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                  }
                              }
                                else{
                                    istrue = true
                                    break;
                                }
                            }
                            if (!isNaN(additionalAmount)){
                                data.additionalAmount = additionalAmount;
                                data.totalAmount +=additionalAmount
                            }
                            if(istrue == true){
                                finalResult.push(data)
                            }
                        }
                    }
                }
            }
            function arraysEqual(arr1, arr2) {
                return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index]);
            }
            finalResult = finalResult.filter((obj, index, array) => {
                return !array.slice(0, index).some(prevObj => arraysEqual(obj._id, prevObj._id));
            });
            res.status(200).json({
            status:true,
            data: finalResult[0].houseBoatDetails,
            customerRate:finalResult[0].totalAmount,
            customerRateCommission:finalResult[0].customerRateCommission,
            totalLength:finalResult.length,
            singleboat: false,
            msg: "success",
        });
        return;
        }
        }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        status: false,
        msg: "Something went wrong",
        e,
      });
    }
  });
router.get("/houseboat/all/getlist", async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query = { houseBoatId: { $exists: true }, status: "Active" };
    if (keyword) {
      query["$or"] = [{ houseBoatName: { $regex: keyword, $options: "i" } }];
    }
    var pageNo = 1,
      dataLimit = 20;
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
      .populate({ path: "houseBoatId", match: { status: "Active" } })
      .sort("created_at")
      .skip((pageNo - 1) * limit)
      .limit(dataLimit);
    data = await data.filter((x) => x.houseBoatId != null);
    var count = await tripPackageModel
      .find(query)
      .populate({ path: "houseBoatId", match: { status: "Active" } });
    res.status(200).json({
      status: true,
      data: data,
      page: pageNo,
      limit: dataLimit,
      totalLength: count.length,
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
router.get("/shikara/all/getlist", async (req, res) => {
  try {
    var { limit, page, keyword } = req.query;
    var query = { shikaraId: { $exists: true }, status: "Active" };
    if (keyword) {
      query["$or"] = [{ houseBoatName: { $regex: keyword, $options: "i" } }];
    }
    var pageNo = 1,
      dataLimit = 20;
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
      .populate({ path: "shikaraId", match: { status: "Active" } })
      .sort("created_at")
      .skip((pageNo - 1) * limit)
      .limit(dataLimit);
    data = await data.filter((x) => x.shikaraId != null);
    var count = await tripPackageModel
      .find(query)
      .populate({ path: "shikaraId", match: { status: "Active" } });
    res.status(200).json({
      status: true,
      data: data,
      page: pageNo,
      limit: dataLimit,
      totalLength: count.length,
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

//customer hb booking

router.post("/houseboat/booknow", guestOrUser, async (req, res) => {
  try {
    var userid;
    if (req.user) {
      userid = req.user.id;
    } else if (req.headers.guestid) {
      userid = req.headers.guestid;
    }
    var {
      id,
      totalRooms,
      startDate,
      endDate,
      location,
      totalRooms,
      adult,
      children,
      tripType,
      houseBoatType,
      category,
      totalAmount,
      totalCommissionAmount,bookingInfo
    } = req.body;
    if (!Array.isArray(id) || id.length == 0) {
      res.status(200).json({
        status: false,
        msg: "houseBoatId must be a non-empty array",
      });
      return;
    }
    if (Misc.isnullorempty(totalRooms)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  totalRooms",
      });
      return;
    }
    if (Misc.isnullorempty(startDate)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  startDate",
      });
      return;
    }
    if (Misc.isnullorempty(endDate)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  endDate",
      });
      return;
    }
    if (Misc.isnullorempty(location)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  location",
      });
      return;
    }
    if (Misc.isnullorempty(adult)) {
      res.status(200).json({
        status: false,
        msg: "Please provide adult",
      });
      return;
    }
    if (Misc.isnullorempty(tripType)) {
      res.status(200).json({
        status: false,
        msg: "Please provide tripType",
      });
      return;
    }
    if (Misc.isnullorempty(houseBoatType)) {
      res.status(200).json({
        status: false,
        msg: "Please provide houseBoatType",
      });
      return;
    }
    if (Misc.isnullorempty(category)) {
      res.status(200).json({
        status: false,
        msg: "Please provide category",
      });
      return;
    }
    if (Misc.isnullorempty(totalAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  totalAmount",
      });
      return;
    }
    if(Misc.isnullorempty(children)){
        children = 0;
  }
  else{
        children = parseInt(children)
  }
    //check already booked this hb for the same date
    var vendorid=[];
    for(var i=0;i<id.length;i++){
        var Checkboat=await houseBoatModel.findOne({_id:id[i],status:"Active",houseBoatStatus:"Approved"});
        if(Misc.isnullorempty(Checkboat)){
            res.status(200).json({
                status: false,
                msg: "houseboat not found"
            })
            return;
        }
        vendorid.push(Checkboat.userid)
    }
    var includedDate = []
    includedDate = await getDatesIncluded(startDate,endDate)
    if(tripType!="DayCruise"){
      if(includedDate.length>1){
        includedDate.pop();
      }
  }
    var totalMemberCount = parseInt(adult) + parseInt(children);
    // var advanceAmount = 0.3 * totalAmount;
    // var payableAmount = advanceAmount;
    // var balanceAmount=totalAmount-advanceAmount;
    var advanceAmount=Math.ceil(totalAmount * (30 / 100))
    var payableAmount = advanceAmount;
    var calcbalance=Math.ceil(totalAmount-advanceAmount)
    var balanceAmount=calcbalance;
    var bookingNo = await generateCustomerBookingNo(userid);
    var data1 =bookingNo.split("KLHB");
    var booknow = new houseboatBookingModel({
      houseBoatIds: id,
      vendorIds:vendorid,
      bookedDates:includedDate,
      startDate: startDate,
      endDate: endDate,
      location: location,
      noOfChildren: children,
      noOfAdults: adult,
      totalRooms: totalRooms,
      totalGuests: totalMemberCount,
      tripType: tripType,
      houseBoatType: houseBoatType,
      category: category,
      bookingType: "Customer",
      bookingNo: bookingNo,
      checkbookingNo:data1[1],
      bookingDate: Date.now(),
      totalAmount: totalAmount,
      advanceAmountPaid:advanceAmount ,
      payableAmount: payableAmount,
      balancePayAmount:balanceAmount,
      userid: userid,
      vendorNetAmount:totalCommissionAmount
    });
    await booknow.save();
    if(id.length==1){
      booknow.bookCategory="Single"
    }
    if(id.length>1){
      booknow.bookCategory="Combination"
    }
    await booknow.save();

    for (var i = 0; i < id.length; i++) {
      var houseboatdata = await houseBoatModel.findOne({
        _id: id[i],
        status: "Active",
        houseBoatStatus: "Approved",
      });
      var trip = await tripTypeModel.findOne({
        houseBoatId: houseboatdata._id,
        tripType: tripType,
        status: "Active",
      });
    //  console.log(trip);
      //if(!Misc.isnullorempty(houseboatdata)){
      var houseboatitems = new houseboatBookingItemModel({
        houseboatBookId: booknow._id,
        houseBoatId: houseboatdata._id,
        bookCategory:booknow.bookCategory,
        vendorName: houseboatdata.userid,
        startDate: startDate,
        endDate: endDate,
        category: category,
        bookingNo: bookingNo,
        checkbookingNo:booknow.checkbookingNo,
        bookedDates:includedDate,
        noOfChildren: children,
        noOfAdults: adult,
        bookingType: "Customer",
        houseBoatName: houseboatdata.houseBoatName,
        location: houseboatdata.location,
        totalRooms:totalRooms,
        totalGuests: totalMemberCount,
        houseBoatType: houseBoatType,
        tripType: tripType,
        bookingDate: Date.now(),
        totalAmount: totalAmount,
        advanceAmountPaid: advanceAmount,
        payableAmount: payableAmount,
        balancePayAmount:balanceAmount,
        vendorNetAmount:totalCommissionAmount
      });

      //}
      await houseboatitems.save();
      if (id.length > 1) {
        var bookingInfoItem = bookingInfo.find(info => info._id === id[i]);
        if (bookingInfoItem) {
            houseboatitems.totalAmount = bookingInfoItem.customerRate;
            houseboatitems.advanceAmountPaid = advanceAmount / id.length;
            houseboatitems.payableAmount = payableAmount / id.length;
            houseboatitems.balancePayAmount = balanceAmount / id.length;
            houseboatitems.vendorNetAmount = bookingInfoItem.customerCommissionAmount;
        }
     }
    await houseboatitems.save();
    }
    res.status(200).json({
      status: true,
      data: booknow,
      msg: "Booked successfully",
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

router.post("/customer/houseboatbooked/pending/view", async (req, res) => {
  try {
    var { id } = req.body;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide BookingId",
      });
      return;
    }
    var data = await houseboatBookingModel
      .findOne({ _id: id, bookingStatus: "Pending", status: "Active" })
      .populate("location")
      .populate("houseBoatIds");
    if (Misc.isnullorempty(data)) {
      res.status(200).json({
        status: false,
        msg: "Booking not found",
      });
      return;
    }

    res.status(200).json({
      status: true,
      data: data,
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
// router.post("/customer/houseboat/checkout/old", async (req, res) => {
//   try {
//     var {
//       guestid,
//       bookingId,
//       fullName,
//       email,
//       phoneNumber,
//       address,
//       totalAmount,
//       gstAmount,
//       advanceAmount,
//       payableAmount,
//     } = req.body;
//     var userid;
//     if (req.user) {
//       userid = req.user.id;
//     } else if (req.guestid) {
//       userid = req.guestid;
//     }
//     if (Misc.isnullorempty(bookingId)) {
//       res.status(200).json({
//         status: false,
//         msg: "Please Provide  bookingId",
//       });
//       return;
//     }
//     if (Misc.isnullorempty(fullName)) {
//       res.status(200).json({
//         status: false,
//         msg: "Please Provide  fullName",
//       });
//       return;
//     }
//     if (Misc.isnullorempty(email)) {
//       res.status(200).json({
//         status: false,
//         msg: "Please Provide  email",
//       });
//       return;
//     }
//     if (Misc.isnullorempty(phoneNumber)) {
//       res.status(200).json({
//         status: false,
//         msg: "Please Provide  phoneNumber",
//       });
//       return;
//     }
//     if (Misc.isnullorempty(address)) {
//       res.status(200).json({
//         status: false,
//         msg: "Please Provide  address",
//       });
//       return;
//     }
//     if (Misc.isnullorempty(totalAmount)) {
//       res.status(200).json({
//         status: false,
//         msg: "Please Provide  totalAmount",
//       });
//       return;
//     }
//     if (Misc.isnullorempty(gstAmount)) {
//       res.status(200).json({
//         status: false,
//         msg: "Please Provide  gstAmount",
//       });
//       return;
//     }
//     if (Misc.isnullorempty(advanceAmount)) {
//       res.status(200).json({
//         status: false,
//         msg: "Please Provide  advanceAmount",
//       });
//       return;
//     }
//     if (Misc.isnullorempty(payableAmount)) {
//       res.status(200).json({
//         status: false,
//         msg: "Please Provide  payableAmount",
//       });
//       return;
//     }
//     var bookings = await houseboatBookingModel.findOne({
//       _id: bookingId,
//       bookingStatus: "Pending",
//       status: "Active",
//     });
//     if (Misc.isnullorempty(bookings)) {
//       res.status(200).json({
//         status: false,
//         msg: "Booking not found",
//       });
//       return;
//     }

//     //check customer exist
//     var checkuseremail = await userModel.findOne({
//       email: email,
//       status: "Active",
//     });
//     if (!Misc.isnullorempty(checkuseremail)) {
//       res.status(200).json({
//         status: false,
//         msg: "Email Already Exist",
//       });
//       return;
//     }
//     var checkuserPhone = await userModel.findOne({
//       phoneNumber: phoneNumber,
//       status: "Active",
//     });
//     if (!Misc.isnullorempty(checkuserPhone)) {
//       res.status(200).json({
//         status: false,
//         msg: "Phone Already Exist",
//       });
//       return;
//     }

//     var otp = await randomstring.generate({ length: 4, charset: "numeric" });
//     var passwordHashed = bcrypt.hashSync(otp, bcrypt.genSaltSync(10)); //done

//     //create usermodel
//     var user = new userModel({
//       name: fullName,
//       email: email,
//       phoneNumber: phoneNumber,
//       address: address,
//       password: passwordHashed,
//       role: "Customer",
//       status: "Active",
//     });
//     await user.save();

//     // try {
//     //   var content = await EmailHelper.readEmailTemplate("login", {
//     //     phoneNumber: phoneNumber,
//     //     password: otp,
//     //   });
//     //   await EmailHelper.sendHtmlEmail(
//     //     email,
//     //     "Credentials for Access Rooms",
//     //     content
//     //   );
//     // } catch (e) {
//     //   console.log(e, "Error while sending Email");
//     // }

//     //update with previous data
//     (bookings.fullName = fullName),
//       (bookings.email = email),
//       (bookings.phoneNumber = phoneNumber),
//       (bookings.address = address),
//       (bookings.bookingDate = Date.now()),
//       (bookings.totalAmount = totalAmount),
//       (bookings.gstAmount = gstAmount),
//       (bookings.advanceAmountPaid = 0),
//       (bookings.payableAmount = payableAmount),
//       //  bookings.userid= req.user.id,
//       await bookings.save();

//     var txnid = shortid.generate();
//     var clientId = shortid.generate();
//     var pay = new PaymentModel({
//       bookingId: bookings._id,
//       //userId: userid,
//       totalAmount: payableAmount,
//       paymentStatus: "Pending",
//       initDate: Date.now(),
//       phoneNumber: phoneNumber,
//       email: email,
//       txnid: txnid,
//       clientId: clientId,
//     });
//     await pay.save();
//     var sucessurl = "https://accessrooms.com/successPage?txnId=" + txnid+"&clientId="+clientId+"&paymentId="+pay._id;
//     var falilureurl = "https://accessrooms.com/failurePage"
//     var paymentStart = await PaymentHelper.startPaymentTest(
//       payableAmount,
//       clientId,
//       txnid,
//       pay._id,
//       sucessurl,
//       falilureurl
//     );
//     // var paymentStart = await PaymentHelper.startPaymentTest(
//     //   payableAmount,
//     //   clientId,
//     //   txnid,
//     //   pay._id
//     // );
//     console.log(paymentStart,"payment start");
//     //   return
//     // if(Misc.isnullorempty(paymentStart.data.instrumentResponse)){
//     //   res.status(200).json({
//     //     status: false,
//     //     msg: "Something went wrong",
//     //   });
//     //   return;
//     // }
//     // if(Misc.isnullorempty(paymentStart.data.instrumentResponse)){
//     //   res.status(200).json({
//     //     status: false,
//     //     msg: "Something went wrong",
//     //   });
//     //   return;
//     // }
//     res.status(200).json({
//       status: true,
//       data: bookings,
//       msg: "Payment initiated",
//       //url:paymentStart,
//     url:paymentStart.data.instrumentResponse.redirectInfo.url
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       status: false,
//       msg: "Something went wrong",
//       e,
//     });
//   }
// });

router.post("/customer/houseboat/checkout", guestOrUser, async (req, res) => {
  try {
    var userid;
    if (req.user) {
      userid = req.user.id;
    } else if (req.headers.guestid) {
      userid = req.headers.guestid;
    }
    var {
      bookingId,
      fullName,
      email,
      phoneNumber,
      address,
      totalAmount,
      gstAmount,
      advanceAmount,
      payableAmount,
      advancepaymentMode
    } = req.body;

    if (Misc.isnullorempty(bookingId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  bookingId",
      });
      return;
    }
    if (Misc.isnullorempty(fullName)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  fullName",
      });
      return;
    }
    if (Misc.isnullorempty(email)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  email",
      });
      return;
    }
    if (Misc.isnullorempty(phoneNumber)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  phoneNumber",
      });
      return;
    }
    if (Misc.isnullorempty(address)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  address",
      });
      return;
    }
    if (Misc.isnullorempty(totalAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  totalAmount",
      });
      return;
    }
    if (Misc.isnullorempty(gstAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  gstAmount",
      });
      return;
    }
    if (Misc.isnullorempty(advanceAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  advanceAmount",
      });
      return;
    }
    if (Misc.isnullorempty(payableAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  payableAmount",
      });
      return;
    }
    if (Misc.isnullorempty(phoneNumber) || !/^\d{7,15}$/.test(phoneNumber)) {
        res.status(200).json({
            status: false,
            msg: "Invalid phoneNumber. It should have 7 to 15 digits."
        });
        return;
    }
    var bookings = await houseboatBookingModel.findOne({
      _id: bookingId,
      bookingStatus: "Pending",
      status: "Active",
    });
    if (Misc.isnullorempty(bookings)) {
      res.status(200).json({
        status: false,
        msg: "Booking not found",
      });
      return;
    }

    //update with previous data
    (bookings.fullName = fullName),
      (bookings.email = email),
      (bookings.phoneNumber = phoneNumber),
      (bookings.address = address),
      (bookings.bookingDate = Date.now()),
      (bookings.userid = userid),
      (bookings.advancepaymentMode = advancepaymentMode);
    await bookings.save();
    var checkbookitems = await houseboatBookingItemModel.find({
      houseboatBookId: bookings._id,
      status: "Active",
    }).populate("houseBoatId");
    for (var i = 0; i < checkbookitems.length; i++) {
      (checkbookitems[i].fullName = fullName),
        (checkbookitems[i].email = email),
        (checkbookitems[i].phoneNumber = phoneNumber),
        (checkbookitems[i].address = address),
        (checkbookitems[i].bookingDate = Date.now()),
        (checkbookitems[i].userid = userid),
        (checkbookitems[i].commissionPercentage = checkbookitems[i].houseBoatId.commissionPercentage),
        (checkbookitems[i].advancepaymentMode = advancepaymentMode);
      await checkbookitems[i].save();
      //console.log(checkbookitems[i],"checkout");
    }


    var itemIds = checkbookitems.map(item => item._id);
    var txnid = shortid.generate();
    var clientId = shortid.generate();
    var pay = new PaymentModel({
    //  bookingId: bookings._id,
      hbBookingId:itemIds,
      //userId: userid,
      totalAmount: payableAmount,
      paymentStatus: "Pending",
      initDate: Date.now(),
      phoneNumber: phoneNumber,

      email: email,
      txnid: txnid,
      clientId: clientId,
    });
    await pay.save();
    bookings.paymentId = pay._id;
    await bookings.save();
    console.log(pay);
    var recheckitems = await houseboatBookingItemModel.find({
      houseboatBookId: bookings._id,
      status: "Active",
    });
    for (var k = 0; k < recheckitems.length; k++) {
      recheckitems[k].paymentId = pay._id;
      await recheckitems[k].save();
    }
    // var sucessurl = "https://vendor.accessrooms.com/successPage?txnId=" + txnid+"&clientId="+clientId+"&paymentId="+pay._id;
    var sucessurl =
      "https://api.accessrooms.com/phonePe/paymentResponce/customer/houseBoat";
    var isCustomer = true;
    var falilureurl = "https://accessrooms.com/failurePage";
    var paymentStart = await PaymentHelper.startPaymentTest(
      payableAmount,
      clientId,
      txnid,
      pay._id,
      sucessurl,
      falilureurl,
      isCustomer
    );
    console.log(paymentStart);
    res.status(200).json({
      status: true,
      data: bookings,
      msg: "Payment initiated",
      url: paymentStart.data.instrumentResponse.redirectInfo.url,
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
router.get("/bookeddata/list", async (req, res) => {
  try {
    var { id, triptype } = req.query;

    var data = await houseboatBookingModel
      .findOne({ bookingType: "Customer", _id: id, status: "Active" })
      .populate("location")
      .populate("houseBoatIds");
    res.status(200).json({
      status: true,
      data: data,
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

router.post("/customer/houseboatbooked/data", async (req, res) => {
  try {
    var { id } = req.body;
    if(Misc.isnullorempty(id)){
      res.status(200).json({
        status: false,
        msg: "Please provide id.",
      });
      return;
    }

    var data = await houseboatBookingItemModel
      .findOne({ bookingType: "Customer", _id: id, status: "Active" })
      .populate("houseBoatId")
      .populate("location");
    res.status(200).json({
      status: true,
      data: data,
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





router.post('/customer/my/bookings',ifToken, async (req, res) => {
  try {
      var { page, limit } = req.body;
      var pageNo = 0, dataLimit = 0;
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      var d = await houseboatBookingModel.find({ status: "Active" ,userid:req.user.id}).sort({ created_at: -1 }).populate("userid").populate("houseBoatIds").skip((pageNo - 1) * limit).limit(dataLimit)
      var totalLength = await houseboatBookingModel.countDocuments({ status: "Active" })
      if (Misc.isnullorempty(d)) {
          res.status(200).json({
              status: true,
              msg: "NO DATA FOUND",
              data: d
          });
          return;
      }

      res.status(200).json({
          status: true,
          msg: "Data",
          data: d,
          totalLength: totalLength,
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

router.post('/customer/my/bookings/details', async (req, res) => {
  try {
      var { bookingId } = req.body;
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      var d = await houseboatBookingModel.findOne({ _id: bookingId, status: "Active" }).populate("houseBoatIds").populate({path:"userid",populate:{path:"vendorId"}})

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
router.post('/customer/houseboat/paybalance', upload.fields([{ name: 'paymentReceipt', maxCount: 1 }]), async (req, res) => {
  try {
      var { bookingId, balancePaymentMode } = req.body;
      // console.log(req.body)
      if (Misc.isnullorempty(bookingId)) {
          res.status(200).json({
              status: false,
              msg: "Please provide bookingId"
          })
          return
      }
      if (!Misc.isnullorempty(req.files)) {
          if (Misc.isnullorempty(req.files.paymentReceipt)) {
              res.status(200).json({
                  status: false,
                  msg: "Please upload payment receipt."
              });
              return;
          }
      }
      var d = await shikaraBookingModel.findOne({ _id: bookingId, status: "Active" }).populate("houseBoatIds");
      if (Misc.isnullorempty(d)) {
          res.status(200).json({
              status: true,
              msg: "NO DATA FOUND",
              data: d
          });
          return;
      }
      d.balancePaymentMode = balancePaymentMode
      if (!Misc.isnullorempty(req.files)) {
          if (!Misc.isnullorempty(req.files.paymentReceipt)) {
              if (req.files.paymentReceipt.length > 0) {
                  ispaymentReceipt = true
                  d.paymentReceipt = req.files.paymentReceipt[0].key;
                  // await data.save()
              }
          }
      }
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

////////////////////////     AGENT SECTION        ///////////////////////////

router.post("/agent/houseboat/booknow/old", agentAuth, async (req, res) => {
  try {
    var userid;
    if (req.user) {
      userid = req.user.id;
    }
    var {
      id,
      totalRooms,
      checkInDate,
      checkOutDate,
      location,
      adult,
      children,
      tripType,
      houseBoatType,
      category,
      totalAmount,
      totalCommissionAmount,bookingInfo
    } = req.body;
    // console.log(req.body, "req.body");
    if (!Array.isArray(id) || id.length == 0) {
      res.status(200).json({
        status: false,
        msg: "id must be a non-empty array",
      });
      return;
    }
    if (Misc.isnullorempty(totalRooms)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  totalRooms",
      });
      return;
    }
    if (Misc.isnullorempty(checkInDate)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  checkInDate",
      });
      return;
    }
    if (Misc.isnullorempty(checkOutDate)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  checkOutDate",
      });
      return;
    }
    if (Misc.isnullorempty(location)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  location",
      });
      return;
    }
    if (Misc.isnullorempty(adult)) {
      res.status(200).json({
        status: false,
        msg: "Please provide adult",
      });
      return;
    }
    if (Misc.isnullorempty(tripType)) {
      res.status(200).json({
        status: false,
        msg: "Please provide tripType",
      });
      return;
    }
    if (Misc.isnullorempty(houseBoatType)) {
      res.status(200).json({
        status: false,
        msg: "Please provide houseBoatType",
      });
      return;
    }
    if (Misc.isnullorempty(category)) {
      res.status(200).json({
        status: false,
        msg: "Please provide category",
      });
      return;
    }
    if (Misc.isnullorempty(totalAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please provide  totalAmount",
      });
      return;
    }
   var vendorid=[];
    for(var i=0;i<id.length;i++){
        var Checkboat=await houseBoatModel.findOne({_id:id[i],status:"Active",houseBoatStatus:"Approved"});
        if(Misc.isnullorempty(Checkboat)){
            res.status(200).json({
                status: false,
                msg: "houseboat not found"
            })
            return;
        }
        vendorid.push(Checkboat.userid)
    }
    var includedDate = []
    includedDate = await getDatesIncluded(checkInDate,checkOutDate)
    if(tripType!="DayCruise"){
      if(includedDate.length>1){
        includedDate.pop();
      }
  }
  //30 percentage of totalamount taken as advance amount
   // var advanceAmount =math.floor(0.3 * totalAmount);
    var advanceAmount=Math.ceil(totalAmount * (30 / 100))
    var payableAmount = advanceAmount;
    var calcbalance=Math.ceil(totalAmount-advanceAmount)
    var balanceAmount=calcbalance;
    var bookingNo =await  generateBookingNo(userid);
    var data1 =bookingNo.split("KLHB");
    var booknow = new houseboatBookingModel({
      houseBoatIds: id,   //houseboatids
      vendorIds:vendorid,
      startDate: checkInDate,
      endDate: checkOutDate,
      bookedDates:includedDate,
      location: location,
      totalRooms: totalRooms,
      noOfAdults: adult,
      noOfChildren: children,
      tripType: tripType,
      houseBoatType: houseBoatType,
      category: category,
      bookingType: "Agent",
      bookingNo: bookingNo,
      checkbookingNo:data1[1],
      bookingDate: Date.now(),
      totalAmount: totalAmount,
      advanceAmountPaid: advanceAmount,
      payableAmount: payableAmount,
      balancePayAmount:balanceAmount,
      userid: userid,
      vendorNetAmount:totalCommissionAmount
    });
    await booknow.save();
    booknow.totalGuests= booknow.noOfAdults+booknow.noOfChildren;
    if(id.length==1){
      booknow.bookCategory="Single"
    }
    if(id.length>1){
      booknow.bookCategory="Combination"
    }
    // if (houseboatdata.vendorId) {
    //   booknow.vendorIds.push(houseboatdata.vendorId);
    // }
    await booknow.save();

    for (var i = 0; i < id.length; i++) {
      var houseboatdata = await houseBoatModel.findOne({
        _id: id[i],
        status: "Active",
        houseBoatStatus: "Approved",
      });
      console.log(houseboatdata,"houseboatdata")
      var trip = await tripTypeModel.findOne({
        houseBoatId: houseboatdata._id,
        tripType: tripType,
        status: "Active",
      });
   //   console.log(trip);
      //if(!Misc.isnullorempty(houseboatdata)){
      var houseboatitems = new houseboatBookingItemModel({
        userid:userid,
        bookedDates:includedDate,
        vendorId: houseboatdata.userid,
        vendorName: houseboatdata.userid,
        houseboatBookId: booknow._id,
        bookingType:"Agent",
        houseBoatId: houseboatdata._id,
        houseBoatName: houseboatdata.houseBoatName,
        bookCategory:booknow.bookCategory,
        startDate:booknow.startDate,
        endDate:booknow.endDate,
        location: houseboatdata.location,
        totalRooms: totalRooms,
        totalGuests: booknow.totalGuests,
        noOfAdults:booknow.noOfAdults,
        noOfChildren:booknow.noOfChildren,
        tripType: tripType,
        houseBoatType: houseBoatType,
        category: houseboatdata.category,
        bookingNo:booknow.bookingNo,
        checkbookingNo:booknow.checkbookingNo,
        bookingDate: Date.now(),
        totalAmount: totalAmount,
        advanceAmountPaid: advanceAmount,
        payableAmount: payableAmount,
        balancePayAmount:balanceAmount,
        vendorNetAmount:totalCommissionAmount
      });

      //}
      await houseboatitems.save();
      //console.log(houseboatitems,"items");
    }
    res.status(200).json({
      status: true,
      data: booknow,
      msg: "Booked successfully",
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


router.post("/agent/houseboat/booknow", agentAuth, async (req, res) => {
    try {
      var userid;
      if (req.user) {
        userid = req.user.id;
      }
      var {
        id,
        totalRooms,
        checkInDate,
        checkOutDate,
        location,
        adult,
        children,
        tripType,
        houseBoatType,
        category,
        totalAmount,
        totalCommissionAmount,bookingInfo
      } = req.body;
      // console.log(req.body, "req.body");
      if (!Array.isArray(id) || id.length == 0) {
        res.status(200).json({
          status: false,
          msg: "id must be a non-empty array",
        });
        return;
      }
      if (Misc.isnullorempty(totalRooms)) {
        res.status(200).json({
          status: false,
          msg: "Please provide  totalRooms",
        });
        return;
      }
      if (Misc.isnullorempty(checkInDate)) {
        res.status(200).json({
          status: false,
          msg: "Please provide  checkInDate",
        });
        return;
      }
      if (Misc.isnullorempty(checkOutDate)) {
        res.status(200).json({
          status: false,
          msg: "Please provide  checkOutDate",
        });
        return;
      }
      if (Misc.isnullorempty(location)) {
        res.status(200).json({
          status: false,
          msg: "Please provide  location",
        });
        return;
      }
      if (Misc.isnullorempty(adult)) {
        res.status(200).json({
          status: false,
          msg: "Please provide adult",
        });
        return;
      }
      if (Misc.isnullorempty(tripType)) {
        res.status(200).json({
          status: false,
          msg: "Please provide tripType",
        });
        return;
      }
      if (Misc.isnullorempty(houseBoatType)) {
        res.status(200).json({
          status: false,
          msg: "Please provide houseBoatType",
        });
        return;
      }
      if (Misc.isnullorempty(category)) {
        res.status(200).json({
          status: false,
          msg: "Please provide category",
        });
        return;
      }
      if (Misc.isnullorempty(totalAmount)) {
        res.status(200).json({
          status: false,
          msg: "Please provide  totalAmount",
        });
        return;
      }
      if(Misc.isnullorempty(children)){
            children = 0;
      }
      else{
            children = parseInt(children)
      }
     var vendorid=[];
      for(var i=0;i<id.length;i++){
          var Checkboat=await houseBoatModel.findOne({_id:id[i],status:"Active",houseBoatStatus:"Approved"});
          if(Misc.isnullorempty(Checkboat)){
              res.status(200).json({
                  status: false,
                  msg: "houseboat not found"
              })
              return;
          }
          vendorid.push(Checkboat.userid)
      }
      var includedDate = []
      includedDate = await getDatesIncluded(checkInDate,checkOutDate)
      if(tripType!="DayCruise"){
        if(includedDate.length>1){
          includedDate.pop();
        }
    }
    //30 percentage of totalamount taken as advance amount
     // var advanceAmount =math.floor(0.3 * totalAmount);
      var advanceAmount=Math.ceil(totalAmount * (30 / 100))
      var payableAmount = advanceAmount;
      var calcbalance=Math.ceil(totalAmount-advanceAmount)
      var balanceAmount=calcbalance;
      var bookingNo =await  generateBookingNo(userid);
      var data1 =bookingNo.split("KLHB");
      var booknow = new houseboatBookingModel({
        houseBoatIds: id,   //houseboatids
        vendorIds:vendorid,
        startDate: checkInDate,
        endDate: checkOutDate,
        bookedDates:includedDate,
        location: location,
        totalRooms: totalRooms,
        noOfAdults: adult,
        noOfChildren: children,
        tripType: tripType,
        houseBoatType: houseBoatType,
        category: category,
        bookingType: "Agent",
        bookingNo: bookingNo,
        checkbookingNo:data1[1],
        bookingDate: Date.now(),
        totalAmount: totalAmount,
        advanceAmountPaid: advanceAmount,
        payableAmount: payableAmount,
        balancePayAmount:balanceAmount,
        userid: userid,
        vendorNetAmount:totalCommissionAmount
      });
      await booknow.save();
      booknow.totalGuests= booknow.noOfAdults+booknow.noOfChildren;
      if(id.length==1){
        booknow.bookCategory="Single"
      }
      if(id.length>1){
        booknow.bookCategory="Combination"
      }
      // if (houseboatdata.vendorId) {
      //   booknow.vendorIds.push(houseboatdata.vendorId);
      // }
      await booknow.save();
   
      for (var i = 0; i < id.length; i++) {
        var houseboatdata = await houseBoatModel.findOne({
          _id: id[i],
          status: "Active",
          houseBoatStatus: "Approved",
        });
        var trip = await tripTypeModel.findOne({
          houseBoatId: houseboatdata._id,
          tripType: tripType,
          status: "Active",
        });
       
        //if(!Misc.isnullorempty(houseboatdata)){
        var houseboatitems = new houseboatBookingItemModel({
          userid:userid,
          bookedDates:includedDate,
          vendorId: houseboatdata.userid,
          vendorName: houseboatdata.userid,
          houseboatBookId: booknow._id,
          bookingType:"Agent",
          houseBoatId: houseboatdata._id,
          houseBoatName: houseboatdata.houseBoatName,
          bookCategory:booknow.bookCategory,
          startDate:booknow.startDate,
          endDate:booknow.endDate,
          location: houseboatdata.location,
          totalRooms: totalRooms,
          totalGuests: booknow.totalGuests,
          noOfAdults:booknow.noOfAdults,
          noOfChildren:booknow.noOfChildren,
          tripType: tripType,
          houseBoatType: houseBoatType,
          category: houseboatdata.category,
          bookingNo:booknow.bookingNo,
          checkbookingNo:booknow.checkbookingNo,
          bookingDate: Date.now(),
          totalAmount: totalAmount,
          advanceAmountPaid: advanceAmount,
          payableAmount: payableAmount,
          balancePayAmount:balanceAmount,
          vendorNetAmount:totalCommissionAmount
        });

        await houseboatitems.save();

        if (id.length > 1) {
            var bookingInfoItem = bookingInfo.find(info => info._id === id[i]);
            if (bookingInfoItem) {
                houseboatitems.totalAmount = bookingInfoItem.agentRate;
                houseboatitems.advanceAmountPaid = advanceAmount / id.length;
                houseboatitems.payableAmount = payableAmount / id.length;
                houseboatitems.balancePayAmount = balanceAmount / id.length;
                houseboatitems.vendorNetAmount = bookingInfoItem.agentCommissionAmount;
            }
        }
    
        await houseboatitems.save();
       // console.log(houseboatitems,"houseboatitems")
    }
      res.status(200).json({
        status: true,
        data: booknow,
        msg: "Booked successfully",
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

router.post("/agent/houseboatbooked/view", ifToken, async (req, res) => {
  try {
    var { id } = req.body;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide BookingId",
      });
      return;
    }
    var data = await houseboatBookingModel
      .findOne({ _id: id, bookingStatus: "Pending", status: "Active" })
      .populate("location")
      .populate("houseBoatIds");

    var hbData=await houseBoatModel.findOne({_id:{$in:data.houseBoatIds},houseBoatStatus:"Approved",status:"Active"});
    if(hbData){
     var tripdata=await tripTypeModel.findOne({houseBoatId:hbData._id,tripType:data.tripType,status:"Active"});
    }
    

    res.status(200).json({
      status: true,
      data: data,
      tripDetails:tripdata,
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
// router.post(
//   "/agent/houseboat/booknow/confirm/old",
//   ifToken,
//   async (req, res) => {
//     try {
//       var {
//         bookingId,
//         fullName,
//         email,
//         phoneNumber,
//         address,
//         totalAmount,
//         gstAmount,
//         advanceAmount,
//         payableAmount,
//       } = req.body;
//       if (Misc.isnullorempty(bookingId)) {
//         res.status(200).json({
//           status: false,
//           msg: "Please Provide  bookingId",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(fullName)) {
//         res.status(200).json({
//           status: false,
//           msg: "Please Provide  fullName",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(email)) {
//         res.status(200).json({
//           status: false,
//           msg: "Please Provide  email",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(phoneNumber)) {
//         res.status(200).json({
//           status: false,
//           msg: "Please Provide  phoneNumber",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(address)) {
//         res.status(200).json({
//           status: false,
//           msg: "Please Provide  address",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(totalAmount)) {
//         res.status(200).json({
//           status: false,
//           msg: "Please Provide  totalAmount",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(gstAmount)) {
//         res.status(200).json({
//           status: false,
//           msg: "Please Provide  gstAmount",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(advanceAmount)) {
//         res.status(200).json({
//           status: false,
//           msg: "Please Provide  advanceAmount",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(payableAmount)) {
//         res.status(200).json({
//           status: false,
//           msg: "Please Provide  payableAmount",
//         });
//         return;
//       }
//       var bookings = await houseboatBookingModel.findone({
//         _id: bookingId,
//         bookingStatus: "Pending",
//         status: "Active",
//       });
//       if (!Misc.isnullorempty(bookings)) {
//         res.status(200).json({
//           status: false,
//           msg: "Booking not found",
//         });
//         return;
//       }
//       //update with previous data
//       (bookings.fullName = fullName),
//         (bookings.email = email),
//         (bookings.phoneNumber = phoneNumber),
//         (bookings.address = address),
//         (bookings.bookingDate = Date.now()),
//         (bookings.totalAmount = totalAmount),
//         (bookings.gstAmount = gstAmount),
//         (bookings.advanceAmountPaid = advanceAmount),
//         (bookings.payableAmount = payableAmount),
//         (bookings.userid = req.user.id),
//         await booknow.save();
//       //Create a txnId
//       var txnid = shortid.generate();
//       var clientId = shortid.generate();
//       var pay = new PaymentModel({
//         bookingId: booknow._id,
//         userId: req.user.id,
//         totalAmount: payableAmount,
//         paymentStatus: "Pending",
//         initDate: Date.now(),
//         phoneNumber: phoneNumber,
//         email: email,
//         txnid: txnid,
//         clientId: clientId,
//       });
//       await pay.save();
//       // var paymentStart = await PaymentHelper.startPaymentTest(payableAmount,clientId,txnid,pay._id)
//       // console.log(paymentStart)
//       // //Create payment model, TXNID,userId,totalAmount,bookingid,paymentStatus,initDate,complteDate,mid,
//       // res.status(200).json({
//       //   status: true,
//       //   data: data,
//       //   msg: "Booked successfully",
//       // });
//       var paymentStart = await PaymentHelper.startPaymentTest(
//         payableAmount,
//         clientId,
//         txnid,
//         pay._id
//       );
//       console.log(paymentStart.data.instrumentResponse);
//       if (Misc.isnullorempty(paymentStart.data.instrumentResponse)) {
//         res.status(200).json({
//           status: false,
//           msg: "Something went wrong",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(paymentStart.data.instrumentResponse)) {
//         res.status(200).json({
//           status: false,
//           msg: "Something went wrong",
//         });
//         return;
//       }
//       if (Misc.isnullorempty(paymentStart.data.instrumentResponse)) {
//         res.status(200).json({
//           status: false,
//           msg: "Something went wrong",
//         });
//         return;
//       }
//       res.status(200).json({
//         status: true,
//         msg: "Payment initiated",
//         url: paymentStart.data.instrumentResponse.redirectInfo.url,
//       });
//     } catch (e) {
//       console.log(e);
//       res.status(500).json({
//         status: false,
//         msg: "Something went wrong",
//         e,
//       });
//     }
//   }
// );

router.post("/agent/houseboat/checkout",agentAuth, async (req, res) => {
  try {
    var {
      bookingId,
      fullName,
      email,
      phoneNumber,
      address,
      totalAmount,
      gstAmount,
      advanceAmount,
      payableAmount,advancepaymentMode
    } = req.body;

    if (Misc.isnullorempty(bookingId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  bookingId",
      });
      return;
    }
    if (Misc.isnullorempty(fullName)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  fullName",
      });
      return;
    }
    if (Misc.isnullorempty(email)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  email",
      });
      return;
    }
    if (Misc.isnullorempty(phoneNumber)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  phoneNumber",
      });
      return;
    }
    if (Misc.isnullorempty(address)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  address",
      });
      return;
    }
    if (Misc.isnullorempty(totalAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  totalAmount",
      });
      return;
    }
    if (Misc.isnullorempty(gstAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  gstAmount",
      });
      return;
    }
    if (Misc.isnullorempty(advanceAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  advanceAmount",
      });
      return;
    }
    if (Misc.isnullorempty(payableAmount)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  payableAmount",
      });
      return;
    }
    var bookings = await houseboatBookingModel.findOne({
      _id: bookingId,
      bookingStatus: "Pending",
      status: "Active",
    });
    if (Misc.isnullorempty(bookings)) {
      res.status(200).json({
        status: false,
        msg: "Booking not found",
      });
      return;
    }

    //update with previous data
      (bookings.fullName = fullName),
      (bookings.email = email),
      (bookings.phoneNumber = phoneNumber),
      (bookings.address = address),
      (bookings.bookingDate = Date.now()),
      (bookings.userid = req.user.id),
      bookings.advancepaymentMode=advancepaymentMode;
      await bookings.save();
    var checkbookitems=await houseboatBookingItemModel.find({houseboatBookId:bookings._id,status:"Active"}).populate("houseBoatId");
      for(var i=0;i<checkbookitems.length;i++){
        (checkbookitems[i].fullName = fullName),
          (checkbookitems[i].email = email),
          (checkbookitems[i].phoneNumber = phoneNumber),
          (checkbookitems[i].address = address),
          (checkbookitems[i].bookingDate = Date.now()),
          (checkbookitems[i].userid = req.user.id),
          (checkbookitems[i].commissionPercentage = checkbookitems[i].houseBoatId.commissionPercentage),
          checkbookitems[i].advancepaymentMode=advancepaymentMode;
          await checkbookitems[i].save();
      }


    var itemIds = checkbookitems.map(item => item._id);
    var txnid = shortid.generate();
    var clientId = shortid.generate();
    var pay = new PaymentModel({
      //bookingId: bookings._id,
      hbBookingId:itemIds,
      //userId: userid,
      totalAmount: payableAmount,
      paymentStatus: "Pending",
      initDate: Date.now(),
      phoneNumber: phoneNumber,
      email: email,
      txnid: txnid,
      clientId: clientId,
    });
    await pay.save();
    bookings.paymentId=pay._id;
    await bookings.save();
    var recheckitems=await houseboatBookingItemModel.find({houseboatBookId:bookings._id,status:"Active"});
    for(var k=0;k<recheckitems.length;k++){
      recheckitems[k].paymentId=pay._id;
      await recheckitems[k].save();
    }
   // var sucessurl = "https://vendor.accessrooms.com/successPage?txnId=" + txnid+"&clientId="+clientId+"&paymentId="+pay._id;
   var sucessurl = "https://api.accessrooms.com/phonePe/paymentResponce/agent"
   var isCustomer = false;
   var falilureurl = "https://agent.accessrooms.com/failurePage"
    var paymentStart = await PaymentHelper.startPaymentTest(
      payableAmount,
      clientId,
      txnid,
      pay._id,
      sucessurl,
      falilureurl,
      isCustomer
    );
    console.log(paymentStart);
    res.status(200).json({
      status: true,
      data: bookings,
      msg: "Payment initiated",
      url: paymentStart.data.instrumentResponse.redirectInfo.url
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








//////////////////////////////////////////////////////////////////////////////////

//Phone Pe Payment Responce API
function formatDate(timestamp) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
router.post('/phonePe/paymentResponce/agent', async (req, res) => {
  try {
      //{"code":"PAYMENT_SUCCESS","merchantId":"PGTESTPAYUAT76","transactionId":"cz2ExUEn9","amount":"150000","providerReferenceId":"T2312131511321359708748","param1":"na","param2":"na","param3":"na","param4":"na","param5":"na","param6":"na","param7":"na","param8":"na","param9":"na","param10":"na","param11":"na","param12":"na","param13":"na","param14":"na","param15":"na","param16":"na","param17":"na","param18":"na","param19":"na","param20":"na","checksum":"2ec420101ce340d500564d384adb5625accf5354bedcfa4588a9a4d915c2dbd0###1"}}
      var { code, merchantId, transactionId, amount, providerReferenceId, param1, param2, param3, param4, param5, param6, param7, param8, param9, checksum } = req.body;
      if (Misc.isnullorempty(code)) {
          //return to fail page
          const frontendURL = 'https://agent.accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      if (Misc.isnullorempty(merchantId)) {
          //return to fail page
          const frontendURL = 'https://agent.accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      if (Misc.isnullorempty(transactionId)) {
          //return to fail page
          const frontendURL = 'https://agent.accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      if (Misc.isnullorempty(amount)) {
          //return to fail page
          const frontendURL = 'https://agent.accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      var paymentDetails = await PaymentModel.findOne({ txnid: transactionId })
      console.log(paymentDetails,"paymentdetails")
      if (Misc.isnullorempty(paymentDetails)) {
          //return to fail page
          const frontendURL = 'https://agent.accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      if (code == "PAYMENT_SUCCESS") {
          if (code == "PAYMENT_SUCCESS") {
              paymentDetails.status = "Success",
              paymentDetails.success_time = new Date();
             
              await paymentDetails.save();
              var calcadvance=0;
              var advAmount=0;
              var booking = await houseboatBookingModel.findOne({ paymentId: paymentDetails._id }).populate("location").populate("userid");
              var bookingitems=await houseboatBookingItemModel.find({houseboatBookId:booking._id,status:"Active"}).populate("location").populate({path:"houseBoatId",populate:{path:"startingLocation"}}).populate("vendorName")
              if (!Misc.isnullorempty(booking)) {
                  if (!Misc.isnullorempty(booking.paymentStatus)) {
                      if (booking.paymentStatus == "Initiate") {
                          booking.paymentStatus = "Success"
                      }
                  }
                  if (!Misc.isnullorempty(booking.advancepaymentStatus)) {
                      if (booking.advancepaymentStatus == "Pending") {
                          booking.advancepaymentStatus = "Success"
                      }
                  }
                  //update amounts
                  var balance = booking.vendorNetAmount-booking.advanceAmountPaid;
                  booking.accessPayBalance=balance;
                  //10 % of totalAmount
                  calcadvance=(.1*booking.vendorNetAmount);
                  advAmount=booking.advanceAmountPaid-calcadvance;
                  booking.vendorBalance=advAmount;
                  await booking.save();
                  if (bookingitems.length>0) {
                      for (var i = 0; i < bookingitems.length; i++) {
                          if (!Misc.isnullorempty(bookingitems[i].paymentStatus)) {
                              if (bookingitems[i].paymentStatus == "Initiate") {
                                  bookingitems[i].paymentStatus = "Success"
                              }
                          }
                          if (!Misc.isnullorempty(bookingitems[i].advancepaymentStatus)) {
                              if (bookingitems[i].advancepaymentStatus == "Pending") {
                                  bookingitems[i].advancepaymentStatus = "Success"
                              }
                          }
                          var balance = bookingitems[i].vendorNetAmount-bookingitems[i].advanceAmountPaid;
                          bookingitems[i].accessPayBalance=balance;   
                          //10 % of totalAmount
                          var commission=bookingitems[i].houseBoatId.commissionPercentage;
                          var commissionValue=(commission/100);
                          calcadvance=(commissionValue*bookingitems[i].vendorNetAmount);
                          advAmount=bookingitems[i].advanceAmountPaid-calcadvance;
                          bookingitems[i].vendorBalance=advAmount;
                          await bookingitems[i].save();


            // var selecteddates=bookingitems[i].bookedDates.map(x=>{return formatDate(x)}).join(", ");
             //get the vendor emails from vendorName
             var vendordata=bookingitems[i].vendorName.email;
             var vendorName=bookingitems[i].vendorName.name;
             var adminmail="accessroomsreservation@gmail.com";
              try {
                var content = await EmailHelper.readEmailBookingSuccessTemplate("bookinghbagent",
                {
                  houseBoatName: bookingitems[i].houseBoatId.houseBoatName,
                  name: bookingitems[i].fullName,
                  agentName:booking.userid.name,
                  phoneNumber:bookingitems[i].phoneNumber,
                  balanceAmount: bookingitems[i].balancePayAmount,
                  bookingTotal: bookingitems[i].totalAmount,
                  category:bookingitems[i].houseBoatId.category,
                  // endTime: formatDate(bookingitems[i].endDate),
                  // startTime: formatDate(bookingitems[i].startDate),
                  checkinDate:formatDate(bookingitems[i].startDate),
                  checkoutDate:formatDate(bookingitems[i].endDate),
                 // totalGuests:bookingitems[i].totalGuests,
                  noOfAdults:bookingitems[i].noOfAdults,
                  noOfChildren:bookingitems[i].noOfChildren,
                  houseBoatType:bookingitems[i].houseBoatType,
                  tripType:bookingitems[i].tripType,
                  location: bookingitems[i].location.name,
                  selectedDate: formatDate(bookingitems[i].bookingDate),
                  bookingNo: bookingitems[i].bookingNo,
                  totalRooms:bookingitems[i].totalRooms,
                  pickUpLocation: bookingitems[i].houseBoatId.startingLocation.name,
                  //dropLocation: dropLocation,
                  balancePaymentMode:bookingitems[i].advancepaymentMode,
                  advanceAmountPaid:bookingitems[i].advanceAmountPaid,
                 
             }
             );
                var content2 = await EmailHelper.readEmailBookingSuccessTemplate("bookinghbvendor",
                {
                  houseBoatName: bookingitems[i].houseBoatId.houseBoatName,
                  name: bookingitems[i].fullName,
                  phoneNumber:bookingitems[i].phoneNumber,
                  balanceAmount: bookingitems[i].balancePayAmount,
                  bookingTotal: bookingitems[i].vendorNetAmount,
                  category:bookingitems[i].houseBoatId.category,
                  // endTime: formatDate(bookingitems[i].endDate),
                  // startTime: formatDate(bookingitems[i].startDate),
                  checkinDate:formatDate(bookingitems[i].startDate),
                  checkoutDate:formatDate(bookingitems[i].endDate),
                 // totalGuests:bookingitems[i].totalGuests,
                  noOfAdults:bookingitems[i].noOfAdults,
                  noOfChildren:bookingitems[i].noOfChildren,
                  houseBoatType:bookingitems[i].houseBoatType,
                  tripType:bookingitems[i].tripType,
                  location: bookingitems[i].location.name,
                  selectedDate: formatDate(bookingitems[i].bookingDate),
                  bookingNo: bookingitems[i].bookingNo,
                  totalRooms:bookingitems[i].totalRooms,
                  pickUpLocation: bookingitems[i].houseBoatId.startingLocation.name,
                  //dropLocation: dropLocation,
                  vendorName:vendorName,
                  balancePaymentMode:bookingitems[i].advancepaymentMode,
                  advanceAmountPaid:bookingitems[i].advanceAmountPaid,
                });
                var content3 = await EmailHelper.readEmailBookingSuccessTemplate("bookinghbadmin",
                {
                  houseBoatName: bookingitems[i].houseBoatId.houseBoatName,
                  name: bookingitems[i].fullName,
                  phoneNumber:bookingitems[i].phoneNumber,
                  balanceAmount: bookingitems[i].balancePayAmount,
                  bookingTotal: bookingitems[i].vendorNetAmount,
                  bookinghbTotal:bookingitems[i].totalAmount,
                  category:bookingitems[i].houseBoatId.category,
                  // endTime: formatDate(bookingitems[i].endDate),
                  // startTime: formatDate(bookingitems[i].startDate),
                  checkinDate:formatDate(bookingitems[i].startDate),
                  checkoutDate:formatDate(bookingitems[i].endDate),
                 // totalGuests:bookingitems[i].totalGuests,
                  noOfAdults:bookingitems[i].noOfAdults,
                  noOfChildren:bookingitems[i].noOfChildren,
                  houseBoatType:bookingitems[i].houseBoatType,
                  tripType:bookingitems[i].tripType,
                  location: bookingitems[i].location.name,
                  selectedDate: formatDate(bookingitems[i].bookingDate),
                  bookingNo: bookingitems[i].bookingNo,
                  totalRooms:bookingitems[i].totalRooms,
                  pickUpLocation: bookingitems[i].houseBoatId.startingLocation.name,
                  //dropLocation: dropLocation,
                  vendorName:vendorName,
                  balancePaymentMode:bookingitems[i].advancepaymentMode,
                  advanceAmountPaid:bookingitems[i].advanceAmountPaid,
                });
                await EmailHelper.sendHtmlEmail(
                    booking.userid.email,
                    "Booking Confirmation Email",
                    content
                );
                await EmailHelper.sendHtmlEmail(
                    vendordata,
                    "Booking Alert",
                    content2
                );
                await EmailHelper.sendHtmlEmail(
                    adminmail,
                    "Booking Alert",
                    content3
                );
            } catch (errr) {
                console.log(errr, "Error while sending Email");
                return errr;
            }
                    }
                 }
              }
             // const frontendURL = 'https://agent.accessrooms.com/successPage';
              const frontendURL = 'https://agent.accessrooms.com/houseboatbookings';
              res.redirect(302, frontendURL);
              return;
          }
          else {
              const frontendURL = 'https://agent.accessrooms.com/failurePage';
              res.redirect(302, frontendURL);
              return;
          }
      } else {
          const frontendURL = 'https://agent.accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }

  } catch (e) {
    console.log(e)
      res.status(500).json({
          status: false,
          error: e,
          msg: "Internal server error"
      })
      return;
  }
})
router.post('/phonePe/paymentResponce/customer/houseBoat', async (req, res) => {
  try {
      //{"code":"PAYMENT_SUCCESS","merchantId":"PGTESTPAYUAT76","transactionId":"cz2ExUEn9","amount":"150000","providerReferenceId":"T2312131511321359708748","param1":"na","param2":"na","param3":"na","param4":"na","param5":"na","param6":"na","param7":"na","param8":"na","param9":"na","param10":"na","param11":"na","param12":"na","param13":"na","param14":"na","param15":"na","param16":"na","param17":"na","param18":"na","param19":"na","param20":"na","checksum":"2ec420101ce340d500564d384adb5625accf5354bedcfa4588a9a4d915c2dbd0###1"}}
      var { code, merchantId, transactionId, amount, providerReferenceId, param1, param2, param3, param4, param5, param6, param7, param8, param9, checksum } = req.body;
      if (Misc.isnullorempty(code)) {
          //return to fail page
          const frontendURL = 'https://accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      if (Misc.isnullorempty(merchantId)) {
          //return to fail page
          const frontendURL = 'https://accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      if (Misc.isnullorempty(transactionId)) {
          //return to fail page
          const frontendURL = 'https://accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      if (Misc.isnullorempty(amount)) {
          //return to fail page
          const frontendURL = 'https://accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      var paymentDetails = await PaymentModel.findOne({ txnid: transactionId })
      if (Misc.isnullorempty(paymentDetails)) {
          //return to fail page
          const frontendURL = 'https://accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }
      if (code == "PAYMENT_SUCCESS") {
          if (code == "PAYMENT_SUCCESS") {
              paymentDetails.status = "Success",
              paymentDetails.success_time = new Date();
              
              await paymentDetails.save();
              var calcadvance=0;
              var advAmount=0;

              var booking = await houseboatBookingModel.findOne({ paymentId: paymentDetails._id }).populate("userid");
              var bookingitems=await houseboatBookingItemModel.find({houseboatBookId:booking._id,status:"Active"}).populate("location").populate({path:"houseBoatId",populate:{path:"startingLocation"}}).populate("vendorName")
              if (!Misc.isnullorempty(booking)) {
                  if (!Misc.isnullorempty(booking.paymentStatus)) {
                      if (booking.paymentStatus == "Initiate") {
                          booking.paymentStatus = "Success"
                      }
                  }
                  if (!Misc.isnullorempty(booking.advancepaymentStatus)) {
                      if (booking.advancepaymentStatus == "Pending") {
                          booking.advancepaymentStatus = "Success"
                      }
                  }
                  var balance = booking.vendorNetAmount-booking.advanceAmountPaid;
                  booking.accessPayBalance=balance;
                  //10 % of totalAmount
                  calcadvance=(.1*booking.vendorNetAmount);
                  advAmount=booking.advanceAmountPaid-calcadvance;
                  booking.vendorBalance=advAmount;
                  await booking.save();
                  if (bookingitems.length>0) {
                      for (var i = 0; i < bookingitems.length; i++) {
                          if (!Misc.isnullorempty(bookingitems[i].paymentStatus)) {
                              if (bookingitems[i].paymentStatus == "Initiate") {
                                  bookingitems[i].paymentStatus = "Success"
                              }
                          }
                          if (!Misc.isnullorempty(bookingitems[i].advancepaymentStatus)) {
                              if (bookingitems[i].advancepaymentStatus == "Pending") {
                                  bookingitems[i].advancepaymentStatus = "Success"
                              }
                          }
                          var balance = bookingitems[i].vendorNetAmount-bookingitems[i].advanceAmountPaid;
                          bookingitems[i].accessPayBalance=balance;
                          //10 % of totalAmount
                          var commission=bookingitems[i].houseBoatId.commissionPercentage;
                          var commissionValue=(commission/100);
                          calcadvance=(commissionValue*bookingitems[i].vendorNetAmount);
                          advAmount=bookingitems.advanceAmountPaid-calcadvance;
                          bookingitems.vendorBalance=advAmount;
                          await bookingitems[i].save();


             //var selecteddates=bookingitems[i].bookedDates.map(x=>{return formatDate(x)}).join(", ");
             //get the vendor emails from vendorName
             var vendordata=bookingitems[i].vendorName.email;
             var vendorName=bookingitems[i].vendorName.name;
             var adminmail="accessroomsreservation@gmail.com";
              try {
                var content = await EmailHelper.readEmailBookingSuccessTemplate("bookinghbcustomer",
                {
                  houseBoatName: bookingitems[i].houseBoatId.houseBoatName,
                  name: bookingitems[i].fullName,
                 // customerName:bookingitems[i].fullName,
                  phoneNumber:bookingitems[i].phoneNumber,
                  balanceAmount: bookingitems[i].balancePayAmount,
                  bookingTotal: bookingitems[i].totalAmount,
                  category:bookingitems[i].houseBoatId.category,
                  // endTime: formatDate(bookingitems[i].endDate),
                  // startTime: formatDate(bookingitems[i].startDate),
                  checkinDate:formatDate(bookingitems[i].startDate),
                  checkoutDate:formatDate(bookingitems[i].endDate),
                  //totalGuests:bookingitems[i].totalGuests,
                  noOfAdults:bookingitems[i].noOfAdults,
                  noOfChildren:bookingitems[i].noOfChildren,
                  houseBoatType:bookingitems[i].houseBoatType,
                  tripType:bookingitems[i].tripType,
                  location: bookingitems[i].location.name,
                  selectedDate: formatDate(bookingitems[i].bookingDate),
                  bookingNo: bookingitems[i].bookingNo,
                  totalRooms:bookingitems[i].totalRooms,
                  pickUpLocation: bookingitems[i].houseBoatId.startingLocation.name,
                  //dropLocation: dropLocation,
                  advanceAmountPaid:bookingitems[i].advanceAmountPaid,
                 
             }
             );
                var content2 = await EmailHelper.readEmailBookingSuccessTemplate("bookinghbCustomerVendor",
                {
                  houseBoatName: bookingitems[i].houseBoatId.houseBoatName,
                  name: bookingitems[i].fullName,
                  phoneNumber:bookingitems[i].phoneNumber,
                  balanceAmount: bookingitems[i].balancePayAmount,
                  bookingTotal: bookingitems[i].vendorNetAmount,
                  category:bookingitems[i].houseBoatId.category,
                  // endTime: formatDate(bookingitems[i].endDate),
                  // startTime: formatDate(bookingitems[i].startDate),
                  checkinDate:formatDate(bookingitems[i].startDate),
                  checkoutDate:formatDate(bookingitems[i].endDate),
                  //totalGuests:bookingitems[i].totalGuests,
                  noOfAdults:bookingitems[i].noOfAdults,
                  noOfChildren:bookingitems[i].noOfChildren,
                  houseBoatType:bookingitems[i].houseBoatType,
                  tripType:bookingitems[i].tripType,
                  location: bookingitems[i].location.name,
                  selectedDate: formatDate(bookingitems[i].bookingDate),
                  bookingNo: bookingitems[i].bookingNo,
                  totalRooms:bookingitems[i].totalRooms,
                  pickUpLocation: bookingitems[i].houseBoatId.startingLocation.name,
                  //dropLocation: dropLocation,
                  vendorName:vendorName,
                  advanceAmountPaid:bookingitems[i].advanceAmountPaid,
                });
                var content3 = await EmailHelper.readEmailBookingSuccessTemplate("bookinghbadmincustomer",
                {
                  houseBoatName: bookingitems[i].houseBoatId.houseBoatName,
                  name: bookingitems[i].fullName,
                  phoneNumber:bookingitems[i].phoneNumber,
                  balanceAmount: bookingitems[i].balancePayAmount,
                  bookingTotal: bookingitems[i].vendorNetAmount,
                  bookinghbTotal: bookingitems[i].totalAmount,
                  category:bookingitems[i].houseBoatId.category,
                  // endTime: formatDate(bookingitems[i].endDate),
                  // startTime: formatDate(bookingitems[i].startDate),
                  checkinDate:formatDate(bookingitems[i].startDate),
                  checkoutDate:formatDate(bookingitems[i].endDate),
                  //totalGuests:bookingitems[i].totalGuests,
                  noOfAdults:bookingitems[i].noOfAdults,
                  noOfChildren:bookingitems[i].noOfChildren,
                  houseBoatType:bookingitems[i].houseBoatType,
                  tripType:bookingitems[i].tripType,
                  location: bookingitems[i].location.name,
                  selectedDate: formatDate(bookingitems[i].bookingDate),
                  bookingNo: bookingitems[i].bookingNo,
                  totalRooms:bookingitems[i].totalRooms,
                  pickUpLocation: bookingitems[i].houseBoatId.startingLocation.name,
                  //dropLocation: dropLocation,
                  vendorName:vendorName,
                  advanceAmountPaid:bookingitems[i].advanceAmountPaid,
                });
                await EmailHelper.sendHtmlEmail(
                    booking.email,
                    "Booking Confirmation Email",
                    content
                );
                await EmailHelper.sendHtmlEmail(
                    vendordata,
                    "Booking Alert",
                    content2
                );
                await EmailHelper.sendHtmlEmail(
                    adminmail,
                    "Booking Alert",
                    content3
                );
                } catch (errr) {
                    console.log(errr, "Error while sending Email");
                    return errr;
                }
                    }
                  }
                }
              const frontendURL = 'https://accessrooms.com/mybookings';
              res.redirect(302, frontendURL);
              return;
          }
          else {
              const frontendURL = 'https://accessrooms.com/failurePage';
              res.redirect(302, frontendURL);
              return;
          }
      } else {
          const frontendURL = 'https://accessrooms.com/failurePage';
          res.redirect(302, frontendURL);
          return;
      }

  } catch (e) {
    console.log(e)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
      return;
  }
})

router.get('/getpay', async (req, res) => {
  try {
      var transId = "cz2ExUEn9"
      var pay = await PaymentModel.findOne({ txnid: transId })
      console.log(pay)
      const frontendURL = 'https://agent.accessrooms.com/failurePage';
      res.redirect(302, frontendURL);
  } catch (err) {
      console.log(err)
  }
})

/////////////////////////////////////////////////////////////////////////////////



router.get("/test/payment", async (req, res) => {
  try {
    var { phoneNumber, email } = req.query;
    var payableAmount = 1000;
    var txnid = shortid.generate();
    var clientId = shortid.generate();
    var pay = new PaymentModel({
      totalAmount: payableAmount,
      paymentStatus: "Pending",
      initDate: Date.now(),
      phoneNumber: phoneNumber,
      email: email,
      txnid: txnid,
      clientId: clientId,
    });
    await pay.save();
    var paymentStart = await PaymentHelper.startPaymentTest(
      payableAmount,
      clientId,
      txnid,
      pay._id
    );
    console.log(paymentStart.data.instrumentResponse);
    if (Misc.isnullorempty(paymentStart.data.instrumentResponse)) {
      res.status(200).json({
        status: false,
        msg: "Something went wrong",
      });
      return;
    }
    if (Misc.isnullorempty(paymentStart.data.instrumentResponse)) {
      res.status(200).json({
        status: false,
        msg: "Something went wrong",
      });
      return;
    }
    if (Misc.isnullorempty(paymentStart.data.instrumentResponse)) {
      res.status(200).json({
        status: false,
        msg: "Something went wrong",
      });
      return;
    }
    res.status(200).json({
      status: true,
      msg: "Payment initiated",
      url: paymentStart.data.instrumentResponse.redirectInfo.url,
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


router.post('/payment/phonepe/success/production',async(req,res)=>{
  try{
    console.log(req)
  }catch(e){
    console.log(e)
  }
})

router.post('/agent/my/bookings',ifToken, async (req, res) => {
  try {
      var { page, limit,fromDate,toDate,status } = req.body;
      var pageNo = 1, dataLimit =20;
      if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
          page = parseInt(page);
          limit = parseInt(limit);
          if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
              pageNo = page;
              dataLimit = limit;
          }
      }
      // var d = await houseboatBookingModel.find({ status: "Active" ,userid:req.user.id}).sort({ created_at: -1 }).populate("userid").populate("houseBoatIds").populate("vendorIds").skip((pageNo - 1) * limit).limit(dataLimit)
      // var totalLength = await houseboatBookingModel.countDocuments({ status: "Active" ,userid:req.user.id})
      // var d = await houseboatBookingItemModel.find({ status: "Active" ,userid:req.user.id}).sort({ created_at: -1 }).populate("userid").populate("houseBoatId").populate("vendorName").populate("location").skip((pageNo - 1) * limit).limit(dataLimit);
      
      // var totalLength = await houseboatBookingItemModel.countDocuments({ status: "Active" ,userid:req.user.id})
      // if (Misc.isnullorempty(d)) {
      //     res.status(200).json({
      //         status: true,
      //         msg: "NO DATA FOUND",
      //         data: d
      //     });
      //     return;
      // }
      userid=new mongoose.Types.ObjectId(req.user.id);
      var query1={status:"Active",userid:userid,paymentStatus:"Success"};
      var frm = null;
      // if (!Misc.isnullorempty(fromDate)) {
      //   frm = new Date(fromDate);
      //   frm.setHours(0, 0, 0, 0);
      //   query1.startDate = { $gte: frm };
      // }
      // if (!Misc.isnullorempty(toDate)) {
      //   var todt = new Date(toDate);
      //   todt.setHours(24, 0, 0, 0);
      //   if (query1.endDate === undefined) {
      //     query1.endDate = { $lte: todt };
      //   } else {
      //     query1.endDate = { $gte: frm, $lte: todt };
      //   }
      // }
      var frm = null;
      if (!Misc.isnullorempty(fromDate)) {
        frm = new Date(fromDate);
        frm.setHours(0, 0, 0, 0);
        query1.startDate = { $gte: frm };
       
      }
      if (!Misc.isnullorempty(toDate)) {
        var todt = new Date(toDate);
        todt.setHours(24, 0, 0, 0);
        if (query1.endDate === undefined) {
          query1.endDate = { $lte: todt };
        } else {
          query1.endDate = { $gte: frm, $lte: todt };
        }
      }
      var currentDate=new Date();
      if(status){
        if(status=="Active"){
          query1.bookingDate={ $lte: currentDate };
        }
        else if(status=="Inactive"){
          query1.bookingDate={ $gte: currentDate };
        }
        else if(status=="Cancelled"){
          query1.status="Cancelled";
        }
      }
      var data = await houseboatBookingItemModel.aggregate([
        { $match: query1 },
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
      //check hb is blocked or not
      data=JSON.parse(JSON.stringify(data))
      for(var i=0;i<data.length;i++){
        if(data[i].houseBoatId.houseBoatStatus=="Blocked"){
            data[i].hbStatus=true;
        }
        else{
            data[i].hbStatus=false;
        }
       
      }
      var count=await houseboatBookingItemModel.countDocuments(query1);
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

router.post('/agent/my/bookings/details/old', async (req, res) => {
    try {
        var { bookingId } = req.body;
        if (Misc.isnullorempty(bookingId)) {
            res.status(200).json({
                status: false,
                msg: "Please provide bookingId"
            })
            return
        }
        // var query={_id:bookingId}
        //var d = await houseboatBookingModel.findOne({ _id: bookingId, status: "Active" }).populate("houseBoatIds").populate({path:"userid",populate:{path:"agentId"}}).populate("vendorIds")
  
  
        var d = await houseboatBookingModel
        .findOne({ _id: bookingId, status: "Active" })
        .populate({
          path: "houseBoatIds",
          populate: [
            {
              path: "startingLocation",
              model: "subLocationModel", // Adjust the model name accordingly
            },
            {
              path: "location",
              model: "locationModel", // Adjust the model name accordingly
            },
          ],
        })
        .populate({
          path: "userid",
          populate: {
            path: "agentId",
            model: "agentModel", // Adjust the model name accordingly
          },
        })
       // .populate("vendorIds");
       .populate({
        path: "vendorIds",
        populate: {
          path: "vendorId",
          model: "vendorModel", // Adjust the model name accordingly
        },
      })
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
router.post('/agent/my/bookings/details', async (req, res) => {
    try {
        var { bookingId } = req.body;
        if (Misc.isnullorempty(bookingId)) {
            res.status(200).json({
                status: false,
                msg: "Please provide bookingId"
            })
            return
        }
        // var query={_id:bookingId}
        //var d = await houseboatBookingModel.findOne({ _id: bookingId, status: "Active" }).populate("houseBoatIds").populate({path:"userid",populate:{path:"agentId"}}).populate("vendorIds")
  
  
        var d = await houseboatBookingItemModel
        .findOne({ _id: bookingId, status:{$in:["Active","Cancelled","Inactive"]} })
        .populate({
          path: "houseBoatId",
          populate: [
            {
              path: "startingLocation",
              model: "subLocationModel", // Adjust the model name accordingly
            },
            {
              path: "location",
              model: "locationModel", // Adjust the model name accordingly
            },
          ],
        })
        .populate({
          path: "userid",
          populate: {
            path: "agentId",
            model: "agentModel", // Adjust the model name accordingly
          },
        })
       .populate({
        path: "vendorName",
        populate: {
          path: "vendorId",
          model: "vendorModel", // Adjust the model name accordingly
        },
      })
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

// router.post('/agent/houseboat/paybalance', upload.fields([{ name: 'paymentReceipt', maxCount: 1 }]), async (req, res) => {
//   try {
//       var { bookingId, balancePaymentMode } = req.body;
//       // console.log(req.body)
//       if (Misc.isnullorempty(bookingId)) {
//           res.status(200).json({
//               status: false,
//               msg: "Please provide bookingId"
//           })
//           return
//       }
//       if (!Misc.isnullorempty(req.files)) {
//           if (Misc.isnullorempty(req.files.paymentReceipt)) {
//               res.status(200).json({
//                   status: false,
//                   msg: "Please upload payment receipt."
//               });
//               return;
//           }
//       }
//       var d = await houseboatBookingItemModel.findOne({ houseboatBookId: bookingId, status: "Active" }).populate("houseBoatId");
//       if (Misc.isnullorempty(d)) {
//           res.status(200).json({
//               status: true,
//               msg: "NO DATA FOUND",
//               data: d
//           });
//           return;
//       }
//       var  mainbookid=await houseboatBookingModel.findOne({ _id: d.houseboatBookId, status: "Active" });
//       d.balancePaymentMode = balancePaymentMode;
//       if (!Misc.isnullorempty(req.files)) {
//           if (!Misc.isnullorempty(req.files.paymentReceipt)) {
//               if (req.files.paymentReceipt.length > 0) {
//                   ispaymentReceipt = true
//                   d.paymentReceipt = req.files.paymentReceipt[0].key;
//                   mainbookid.paymentReceipt = req.files.paymentReceipt[0].key;
//                   // await data.save()
//               }
//           }
//       }
//       d.balancepaymentStatus="Success";
//       mainbookid.balancepaymentStatus="Success";
//       await d.save();
//       await mainbookid.save();
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
//reservation cancellation
router.get("/houseboat/booking/cancel",ifToken, async (req, res) => {
  try {
    var { bookingId } = req.query;
    if (Misc.isnullorempty(bookingId)) {
      res.status(200).json({
        status: false,
        msg: "bookingId is required",
      });
      return;
    }
    var data = await houseboatBookingItemModel.findOne({ houseboatBookId: bookingId, status: "Active" });
    if (Misc.isnullorempty(data)) {
      res.status(200).json({
        status: false,
        msg: "data not found",
      });
      return;
    }
    var d=await houseboatBookingModel.findOne({ _id: bookingId, status: "Active" });
    data.status = "Cancelled";
    d.status = "Cancelled";
    await data.save();
    res.status(200).json({
      status: true,
      msg: "Booking  Cancelled ",
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
router.get("/shikara/booking/cancel",ifToken, async (req, res) => {
  try {
    var { bookingId } = req.query;
    if (Misc.isnullorempty(bookingId)) {
      res.status(200).json({
        status: false,
        msg: "bookingId is required",
      });
      return;
    }
    var data = await shikaraBookingModel.findOne({ _id: bookingId, status: "Active" });
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
      msg: "Booking  Cancelled ",
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




router.get('/get/ticket/houseboat', async (req, res) => {
  try {
     var {id}=req.query;
      var booking = await houseboatBookingItemModel.findOne({_id:id,paymentStatus:"Success",status:"Active"});
      console.log(booking,"booking")
      var pdf = await ticketController.bookingTicketHouseboatpdf(booking._id);
      var filename = "ticket.pdf";
      res.writeHead(200, {
          'Content-Type': 'application/pdf',
      });
      pdf.pipe(res);
      pdf.end();
  } catch (e) {
      console.log(e)
      res.status(500).json({
          status: false,
          msg: "Internal server error"
      })
  }
})

// async function ReviewscheduleEmail() {
//     try {
//         console.log("Review email scheduler started");

//         // Schedule a task to run every hour
//         cron.schedule('0 * * * *', async () => {
//             var currentDate = new Date();

//             var bookings = await houseboatBookingItemModel.find({
//                 endDate: { $gt: currentDate }, // Check if end date is after current date
//                 reviewEmailSent: false // Check if review email has not been sent yet
//             }).populate("userid");

//             // Send review email for each booking
//             for (var booking of bookings) {
//                 var guest = booking.userid;

//                 // Send review email
//                 var content = await EmailHelper.readEmailTemplate('review', { Username: bookings[i].guest.name, guestid: bookings[i].userid._id })
//                 await EmailHelper.sendemail(bookings[i].guest.email, "Review", content)
//                 // Update booking to mark review email as sent
//                 await houseboatBookingItemModel.findByIdAndUpdate(booking._id, { reviewEmailSent: true });
//             }
//         }, {
//             scheduled: true,
//             timezone: "Asia/Kolkata"
//         });
//     } catch (error) {
//         console.error("Error in review email scheduler:", error);
//     }
// }
module.exports = router;
