const express = require("express");
const router = express();
const mongoose = require("mongoose");

const Misc = require("../controllers/Misc");
const RateController = require('../controllers/rateHelper');

const ifToken = require("../middleware/ifToken");
const guestOrUser = require("../middleware/guestOrUser");

const houseBoatModel = require("../models/houseBoatModel");
const tripPackageModel = require("../models/tripPackageModel");
const houseboatBookingModel = require("../models/houseboatBookingModel");
const tripTypeModel = require("../models/tripTypeModel");
const houseboatBookingItemModel = require("../models/houseboatBookingItemModel");
const  reviewModel=require("../models/reviewModel");



//Search Report
router.post('/agent/houseboat/booking/filter',async(req,res)=>{
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
                        houseBoats[i].agentRate = getRate.rate;
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
                        houseBoats[i].agentRate = getRate.rate;
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
                        houseBoats[i].agentRate = getRate.rate;
                        result.push(houseBoats[i])
                    }
                }
            }
            if (result.length <= 0) {
                var houseBoatQueryMultiple = { status:"Active",houseBoatStatus: "Approved",location:new mongoose.Types.ObjectId(location),category : category, };
                if (houseBoatType === "Private") {
                    //coomented based on client requirement
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
                    //                 houseBoats[n].details[k].agentRate = getRate.rate;
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
                    //                     newResult[i][j].agentRate = getRate.rate;
                    //                     //result.push(houseBoats[n].details[k])
                    //                 }
                    //                 totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
                    //                 totalAmount += newResult[i][j].agentRate;
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
                                    hbs[k].agentRate = getRate.rate;
                                    hbs[k].extraPersonRate = getRate.extraPersonRate
                                    result.push(hbs[k])
                                }
                            }
                            var data = {}
                            var totalAmount = 0
                            var id = [];
                            for(var t=0;t<result.length;t++){
                                totalAmount  += result[t].agentRate;
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
                    else if(tripType == "OverNight"){
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
                                    hbs[k].agentRate = getRate.rate;
                                    hbs[k].extraPersonRate = getRate.extraPersonRate
                                    hbs[k].totalExtraPersonRate = 0; 
                                    totalAmount  += hbs[k].agentRate;
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
                                                    var houseBoatTotal = data.houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate
                                                    if(!Misc.isnullorempty(houseBoatTotal)){
                                                        data.houseBoatDetails[d].agentRate = houseBoatTotal;
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
                                                    var houseBoatTotal = data.houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate;
                                                    if(!Misc.isnullorempty(houseBoatTotal)){
                                                        data.houseBoatDetails[d].agentRate = houseBoatTotal;
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
                        houseBoats[i].agentRate = getRate.rate;
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
                        houseBoats[i].agentRate = getRate.rate;
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

//Details of search result
router.post('/agent/houseboatbooked/data',async(req,res)=>{
    try{
        var {page,limit,category,houseBoatType,location,tripType,numberofRooms,checkInDate,checkOutDate,children,adult,id} = req.body;
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
                // const eightDaysAhead = new Date(today);
                // eightDaysAhead.setDate(today.getDate() + 8);//8 Days ahead
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
                    //{$match:{$or:[{Reservations:{$exists:false}},{Bookings:{$exists:false}}]}}
                ])
                console.log(houseBoats)
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for (var i = 0; i < houseBoats.length; i++) {
                    var getRate = await RateController.CalculateDayCruisRate(houseBoats[i], includedDates, totalGuest)
                    if (getRate.status == true) {
                        houseBoats[i].agentRate = getRate.rate;
                        houseBoats[i].agentRateCommission = getRate.commissionAmount;
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
                console.log(houseBoats)
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for (var i = 0; i < houseBoats.length; i++) {
                    if ((Misc.isnullorempty(houseBoats[i].DayBookings)) && (Misc.isnullorempty(houseBoats[i].DayReservations))) {
                        continue;
                    }
                    var getRate = await RateController.CalculateNightStayRate(houseBoats[i], includedDates, totalGuest)
                    if (getRate.status == true) {
                        houseBoats[i].agentRate = getRate.rate;
                        houseBoats[i].agentRateCommission = getRate.commissionAmount;
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
                ])
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for (var i = 0; i < houseBoats.length; i++) {
                    var getRate = await RateController.CalculateOverNightStayRate(houseBoats[i], includedDates, totalGuest)
                    if (getRate.status == true) {
                        houseBoats[i].agentRate = getRate.rate;
                        houseBoats[i].agentRateCommission = getRate.commissionAmount;
                        result.push(houseBoats[i])
                    }
                }
            }
        }else{
            if(tripType == "DayCruise"){
                houseBoatQuery.totalRooms = {$gte:numberofRooms}
                var includedDates = await getDatesFiltered(startDateTime,endDateTime)
                const today = new Date();
                // const eightDaysAhead = new Date(today);
                // eightDaysAhead.setDate(today.getDate() + 8);
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
                                    //{ $eq: ["$houseBoatType","Sharing"]},
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
                                    { $eq: ["$houseBoatType","Sharing"]},
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
                        houseBoats[i].agentRate = getRate.rate;
                        houseBoats[i].agentRateCommission = getRate.commissionAmount;
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
                console.log("House boat for for overnight sharing ",houseBoats.length)
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                for(var i=0;i<houseBoats.length;i++){
                    var getRate = await RateController.CalculateOverNightStayRateSharing(houseBoats[i],includedDates,totalGuest,numberofRooms)
                    if(getRate.status == true){
                        houseBoats[i].agentRate = getRate.rate;
                        houseBoats[i].agentRateCommission = getRate.commissionAmount;

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

        //reviews of the houseboat
        var reviewData=await reviewModel.find({houseBoatId:id,status:"Active"}).populate("user").limit(5).sort({created_at:-1});
        res.status(200).json({
            status: true,
            agentRate:result[0].agentRate,
            agentRateCommission:result[0].agentRateCommission,
            data: result[0],
            tripDetails:result[0].tripDetails,
            page: pageNo,
            limit: dataLimit,
            reviews:reviewData,
            // totalLength:result.length,
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

router.get("/agent/houseboatbooking/multiple/view/old", async (req, res) => {
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
                // const eightDaysAhead = new Date(today);
                // eightDaysAhead.setDate(today.getDate() + 8);
                // if (includedDates[0] > eightDaysAhead) {
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
                                                $setIsSubset: [ "$reservedDates",includedDates ]
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
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                var houseBoat = [];
                for (var n = 0; n < houseBoats.length; n++) {
                    var result = [];
                    for (var k = 0; k < houseBoats[n].details.length; k++) {
                        var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
                        if (getRate.status == true) {
                            houseBoats[n].details[k].agentRate = getRate.rate;
                            houseBoats[n].details[k].agentCommissionAmount = getRate.commissionAmount;
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
                        var totalAmount = 0
                        var agentRateCommission = 0
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
                                newResult[i][j].agentRate = getRate.rate;
                                newResult[i][j].agentCommissionAmount = getRate.commissionAmount;
                                //result.push(houseBoats[n].details[k])
                            }
                            totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
                            totalAmount += newResult[i][j].agentRate;
                            agentRateCommission += newResult[i][j].agentCommissionAmount
                            id.push(newResult[i][j]._id)
                        }
                        data._id = id
                        data.totalAmount = totalAmount
                        data.agentRateCommission=agentRateCommission
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
                    amount: finalResult[0].totalAmount,
                    agentRateCommission:finalResult[0].agentRateCommission,
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
                            hbs[k].agentRate = getRate.rate;
                            hbs[k].agentCommissionAmount = getRate.commissionAmount;
                            hbs[k].extraPersonRate = getRate.extraPersonRate
                            result.push(hbs[k])
                        }
                    }
                    var data = {}
                    var totalAmount = 0
                    var agentRateCommission=0
                    var id = [];
                    for(var t=0;t<result.length;t++){
                        totalAmount  += result[t].agentRate;
                        agentRateCommission  += result[t].agentCommissionAmount;
                        id.push(result[t]._id)
                    }
                    data._id = id
                    data.totalAmount = totalAmount
                    data.agentRateCommission = agentRateCommission
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
                    amount:finalResult[0].totalAmount,
                    agentRateCommission:finalResult[0].agentRateCommission,
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
                                        $setIsSubset: [ includedDates,"$reservedDates" ]
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
                for (var h = 0; h < houseBoats.length; h++) {
                    for (var g = 0; g < houseBoats[h].details.length; g++) {
                        var numberOfRooms = houseBoats[h].details[g].totalRooms;
                        var numberOfMaxGuest = numberOfRooms * houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                        var numberOfMaxExtraGuest = numberOfRooms * houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                        houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                        houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                    }
                }
                var finalResult = [];

                for (var p = 0; p < houseBoats.length; p++) {
                    var result = [];
                    var totalGuestCanBeAccomadated = 0
                    var totalExtraGuestCanBeaccomadated = 0
                    var getMostSutableValue = await getCombinations(houseBoats[p].details, numberofRooms)
                    var hbs = getMostSutableValue;
                    var data = {}
                    var totalAmount = 0
                    var agentRateCommission=0
                    var id = [];
                    for (var k = 0; k < hbs.length; k++) {
                        totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms * hbs[k].totalRooms
                        totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms * hbs[k].totalRooms
                        var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                        hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                        hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms * hbs[k].totalRooms
                        var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k], includedDates, totalguests)
                        if (getRate.status == true) {
                            hbs[k].agentRate = getRate.rate;
                            hbs[k].agentCommissionAmount = getRate.commissionAmount;
                            hbs[k].extraPersonRate = getRate.extraPersonRate;
                            hbs[k].totalExtraPersonRate = 0;
                            totalAmount += hbs[k].agentRate;
                            agentRateCommission += hbs[k].agentCommissionAmount
                            id.push(hbs[k]._id)
                            result.push(hbs[k])
                        }
                    }
                    data._id = id
                    data.totalAmount = totalAmount
                    data.agentRateCommission = agentRateCommission
                    data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                    data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                    data.houseBoatDetails = result
                    const sumOfTotals = result.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                    if (sumOfTotals >= numberofRooms) {
                        if (totalGuestCanBeAccomadated >= adult) {
                            var totalRoomsFound = data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                            if (totalRoomsFound >= numberofRooms) {
                                finalResult.push(data)
                            }
                        } else {
                            //Calculations For additional Guests
                            var istrue = false
                            var additionalGuestAvailable = adult - totalGuestCanBeAccomadated
                            if (totalExtraGuestCanBeaccomadated < additionalGuestAvailable) {
                                console.log("Cant Accomadate these many extra guests")
                            } else {
                                var reminingAdditionalGuests = additionalGuestAvailable
                                var additionalAmount = 0;
                                for (var d = 0; d < data.houseBoatDetails.length; d++) {
                                    // if (reminingAdditionalGuests > 0) {
                                    //     if (data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated >= reminingAdditionalGuests) {
                                    //         additionalAmount += data.houseBoatDetails[d].extraPersonRate * reminingAdditionalGuests
                                    //         data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                    //         var houseBoatTotal = data[d].houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate
                                    //         data[d].houseBoatDetails[d].houseBoatTotal = houseBoatTotal;
                                    //         reminingAdditionalGuests = 0;
                                    //         istrue = true;
                                    //         break
                                    //     } else {
                                    //         additionalAmount += data.houseBoatDetails[d].extraPersonRate * data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                    //         data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                    //         var houseBoatTotal = data[d].houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate;
                                    //         data[d].houseBoatDetails[d].houseBoatTotal = houseBoatTotal;
                                    //         reminingAdditionalGuests = reminingAdditionalGuests - data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                    //     }
                                    // }
                                    if(reminingAdditionalGuests>0){
                                        if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                            additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                            data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                            var houseBoatTotal = data.houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate
                                            if(!Misc.isnullorempty(houseBoatTotal)){
                                                data.houseBoatDetails[d].agentRate = houseBoatTotal;
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
                                            var houseBoatTotal = data.houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate;
                                            if(!Misc.isnullorempty(houseBoatTotal)){
                                                data.houseBoatDetails[d].agentRate = houseBoatTotal;
                                            }
                                            if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                                data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                            }
                                            reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                        }
                                    }else {
                                        istrue = true
                                        break;
                                    }
                                }
                                if (!isNaN(additionalAmount)) {
                                    data.additionalAmount = additionalAmount;
                                    data.totalAmount += additionalAmount
                                }
                                if (istrue == true) {
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
                amount:finalResult[0].totalAmount,
                agentRateCommission:finalResult[0].agentRateCommission,
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

router.get("/agent/houseboatbooking/multiple/view", async (req, res) => {
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
                // const eightDaysAhead = new Date(today);
                // eightDaysAhead.setDate(today.getDate() + 8);
                // if (includedDates[0] > eightDaysAhead) {
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
                                                $setIsSubset: [ "$reservedDates",includedDates ]
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
                houseBoats = JSON.parse(JSON.stringify(houseBoats))
                var houseBoat = [];
                for (var n = 0; n < houseBoats.length; n++) {
                    var result = [];
                    for (var k = 0; k < houseBoats[n].details.length; k++) {
                        var getRate = await RateController.CalculateDayCruisRate(houseBoats[n].details[k], includedDates, houseBoats[n].details[k].tripDetails.maxPersonTrips)
                        if (getRate.status == true) {
                            houseBoats[n].details[k].agentRate = getRate.rate;
                            houseBoats[n].details[k].agentCommissionAmount = getRate.commissionAmount;
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
                        var totalAmount = 0
                        var agentRateCommission = 0
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
                                newResult[i][j].agentRate = getRate.rate;
                                newResult[i][j].agentCommissionAmount = getRate.commissionAmount;
                                //result.push(houseBoats[n].details[k])
                            }
                            totalGuestCanBeAccomadated += newResult[i][j].tripDetails.maxPersonTrips;
                            totalAmount += newResult[i][j].agentRate;
                            agentRateCommission += newResult[i][j].agentCommissionAmount
                            id.push(newResult[i][j]._id)
                        }
                        data._id = id
                        data.totalAmount = totalAmount
                        data.agentRateCommission=agentRateCommission
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
                    amount: finalResult[0].totalAmount,
                    agentRateCommission:finalResult[0].agentRateCommission,
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
                            hbs[k].agentRate = getRate.rate;
                            hbs[k].agentCommissionAmount = getRate.commissionAmount;
                            hbs[k].extraPersonRate = getRate.extraPersonRate
                            result.push(hbs[k])
                        }
                    }
                    var data = {}
                    var totalAmount = 0
                    var agentRateCommission=0
                    var id = [];
                    for(var t=0;t<result.length;t++){
                        totalAmount  += result[t].agentRate;
                        agentRateCommission  += result[t].agentCommissionAmount;
                        id.push(result[t]._id)
                    }
                    data._id = id
                    data.totalAmount = totalAmount
                    data.agentRateCommission = agentRateCommission
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
                    amount:finalResult[0].totalAmount,
                    agentRateCommission:finalResult[0].agentRateCommission,
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
                for (var h = 0; h < houseBoats.length; h++) {
                    for (var g = 0; g < houseBoats[h].details.length; g++) {
                        var numberOfRooms = houseBoats[h].details[g].totalRooms;
                        var numberOfMaxGuest = numberOfRooms * houseBoats[h].details[g].tripDetails.maxPersonPerRooms;
                        var numberOfMaxExtraGuest = numberOfRooms * houseBoats[h].details[g].tripDetails.extraPersonPerRooms;
                        houseBoats[h].details[g].numberOfMaxGuest = numberOfMaxGuest;
                        houseBoats[h].details[g].numberOfMaxExtraGuest = numberOfMaxExtraGuest;
                    }
                }
                var finalResult = [];

                for (var p = 0; p < houseBoats.length; p++) {
                    var result = [];
                    var totalGuestCanBeAccomadated = 0
                    var totalExtraGuestCanBeaccomadated = 0
                    var getMostSutableValue = await getCombinations(houseBoats[p].details, numberofRooms)
                    var hbs = getMostSutableValue;
                    var data = {}
                    var totalAmount = 0
                    var agentRateCommission=0
                    var id = [];
                    for (var k = 0; k < hbs.length; k++) {
                        totalGuestCanBeAccomadated += hbs[k].tripDetails.maxPersonPerRooms * hbs[k].totalRooms
                        totalExtraGuestCanBeaccomadated += hbs[k].tripDetails.extraPersonPerRooms * hbs[k].totalRooms
                        var totalguests = hbs[k].tripDetails.maxPersonPerRooms
                        hbs[k].tripDetails.totalGuestCanBeAccomadated = totalguests;
                        hbs[k].totalExtraGuestCanBeaccomadated = hbs[k].tripDetails.extraPersonPerRooms * hbs[k].totalRooms
                        var getRate = await RateController.CalculateOverNightStayRateCombination(hbs[k], includedDates, totalguests)
                        if (getRate.status == true) {
                            hbs[k].agentRate = getRate.rate;
                            hbs[k].agentCommissionAmount = getRate.commissionAmount;
                            hbs[k].extraPersonRate = getRate.extraPersonRate;
                            hbs[k].totalExtraPersonRate = 0;
                            totalAmount += hbs[k].agentRate;
                            agentRateCommission += hbs[k].agentCommissionAmount
                            id.push(hbs[k]._id)
                            result.push(hbs[k])
                        }
                    }
                    data._id = id
                    data.totalAmount = totalAmount
                    data.agentRateCommission = agentRateCommission
                    data.totalGuestCanBeAccomadated = totalGuestCanBeAccomadated;
                    data.totalExtraGuestCanBeaccomadated = totalExtraGuestCanBeaccomadated;
                    data.houseBoatDetails = result
                    const sumOfTotals = result.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                    if (sumOfTotals >= numberofRooms) {
                        if (totalGuestCanBeAccomadated >= adult) {
                            var totalRoomsFound = data.houseBoatDetails.reduce((accumulator, currentValue) => accumulator + currentValue.totalRooms, 0);
                            if (totalRoomsFound >= numberofRooms) {
                                finalResult.push(data)
                            }
                        } else {
                            //Calculations For additional Guests
                            var istrue = false
                            var additionalGuestAvailable = adult - totalGuestCanBeAccomadated
                            if (totalExtraGuestCanBeaccomadated < additionalGuestAvailable) {
                                console.log("Cant Accomadate these many extra guests")
                            } else {
                                var reminingAdditionalGuests = additionalGuestAvailable
                                var additionalAmount = 0;
                                for (var d = 0; d < data.houseBoatDetails.length; d++) {
                                    // if (reminingAdditionalGuests > 0) {
                                    //     if (data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated >= reminingAdditionalGuests) {
                                    //         additionalAmount += data.houseBoatDetails[d].extraPersonRate * reminingAdditionalGuests
                                    //         data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                    //         var houseBoatTotal = data[d].houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate
                                    //         data[d].houseBoatDetails[d].houseBoatTotal = houseBoatTotal;
                                    //         reminingAdditionalGuests = 0;
                                    //         istrue = true;
                                    //         break
                                    //     } else {
                                    //         additionalAmount += data.houseBoatDetails[d].extraPersonRate * data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                    //         data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated;
                                    //         var houseBoatTotal = data[d].houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate;
                                    //         data[d].houseBoatDetails[d].houseBoatTotal = houseBoatTotal;
                                    //         reminingAdditionalGuests = reminingAdditionalGuests - data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                    //     }
                                    // }
                                    if(reminingAdditionalGuests>0){
                                        if(data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated>=reminingAdditionalGuests){
                                            additionalAmount += data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                            data.houseBoatDetails[d].totalExtraPersonRate = data.houseBoatDetails[d].extraPersonRate*reminingAdditionalGuests
                                            var houseBoatTotal = data.houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate
                                            if(!Misc.isnullorempty(houseBoatTotal)){
                                                data.houseBoatDetails[d].agentRate = houseBoatTotal;
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
                                            var houseBoatTotal = data.houseBoatDetails[d].agentRate+data.houseBoatDetails[d].totalExtraPersonRate;
                                            if(!Misc.isnullorempty(houseBoatTotal)){
                                                data.houseBoatDetails[d].agentRate = houseBoatTotal;
                                            }
                                            if(Misc.isnullorempty(data.houseBoatDetails[d].totalExtraPersonRate )){
                                                data.houseBoatDetails[d].totalExtraPersonRate = 0;
                                            }
                                            reminingAdditionalGuests = reminingAdditionalGuests-data.houseBoatDetails[d].totalExtraGuestCanBeaccomadated
                                        }
                                    }else {
                                        istrue = true
                                        break;
                                    }
                                }
                                if (!isNaN(additionalAmount)) {
                                    data.additionalAmount = additionalAmount;
                                    data.totalAmount += additionalAmount
                                }
                                if (istrue == true) {
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
                amount:finalResult[0].totalAmount,
                agentRateCommission:finalResult[0].agentRateCommission,
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

  async function calculateDaysDifference(startDate, endDate) {
    var start = new Date(startDate);
    var end = new Date(endDate);
  
    var timeDifference = end - start;
  
    // Calculate the number of days
    var daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  
    // Return 1 if start and end dates are the same, otherwise return the calculated difference
    return daysDifference === 0 ? 1 : daysDifference;
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

module.exports = router;