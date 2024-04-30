const express = require("express");
const router = express();
var jwt = require("jsonwebtoken");
const Misc = require("../controllers/Misc");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer")
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
const shikaraBookingModel = require('../models/shikaraBookingModel')
const { check, validationResult } = require('express-validator');
const dateTime = require('../controllers/dateTime')
const tripTypeModel = require("../models/tripTypeModel");
const houseBoatModel = require("../models/houseBoatModel");
const houseboatBookingModel = require('../models/houseboatBookingModel');
const tripPackageModel = require("../models/tripPackageModel");
const locationModel = require("../models/locationModel")
const subLocationModel = require("../models/subLocationModel")
const ticketController = require('../controllers/ticketController');
const PaymentModel = require("../models/paymentModel");
const PaymentHelper = require("../controllers/phonePeHelper");
var shortid = require("shortid");
const houseboatBookingItemModel = require("../models/houseboatBookingItemModel");
const EmailHelper = require("../controllers/Email");
const interactHelper = require('../controllers/interactHelper');
var ResponceModel = require('../models/paymentResponceModel');
const paymentModel = require("../models/paymentModel");

const moment = require('moment');
const reservationModel = require("../models/reservationModel");
const guestOrUser = require("../middleware/guestOrUser");
const  reviewModel=require("../models/reviewModel");

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateUniqueId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueId = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueId += characters.charAt(randomIndex);
    }

    return uniqueId;
}

function getPaginatedData(data, page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
        status: true,
        msg: "Data",
        data: data.slice(startIndex, endIndex),
        page: page,
        limit: limit,
        length: data.length
    }
}
function formatDate(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}
function reduceMinute(timestamp) {
    const oneMinute = 60 * 1000; // 60 seconds * 1000 milliseconds
    return timestamp - oneMinute;
}
function addMinuteToTimestamp(timestamp) {
    // Convert timestamp to a Date object
    const date = new Date(timestamp);

    // Add one minute to the date
    date.setMinutes(date.getMinutes() + 1);

    // Return the updated timestamp
    return date.getTime();
}
// Function to format a timestamp to "YYYY-MM-DDTHH:mm:ss"
function formatTimestamp(timestamp) {
    return moment(timestamp).format('YYYY-MM-DDTHH:mm:ss');
}
async function generateshikaraBookingNo(userid) {
    var bills = await shikaraBookingModel.find({
       /* bookedbyid: userid,*/advancepaymentStatus: "Success",/* bookingType: "Agent",*/
        status: "Active",
    }).sort({ checkbookingNo: -1 }).limit(1);
    // console.log(bills,'bills')
    if (bills.length > 0) {
        if (bills[0].checkbookingNo) {
            if (bills[0].checkbookingNo <= 8) {
                var billnocheck = bills[0].checkbookingNo + 1;
                bookingNo = "KLSK0" + billnocheck
            }
            else {
                var billnocheck = bills[0].checkbookingNo + 1;
                bookingNo = "KLSK" + billnocheck
            }

        }
        else {
            console.log(2)
            bookingNo = "KLSK01"
        }
    }
    else {
        console.log(3)
        bookingNo = "KLSK01"
    }
    return bookingNo;
}

async function generateshikaraCustomerBookingNo(userid) {
    var bills = await shikaraBookingModel.find({
       /* bookedbyid: userid,*/advancepaymentStatus: "Success", /*bookingType: "Customer",*/
        status: "Active",
    }).sort({ checkbookingNo: -1 }).limit(1);
    // console.log(bills,'bills')
    if (bills.length > 0) {
        if (bills[0].checkbookingNo) {
            if (bills[0].checkbookingNo <= 8) {
                var billnocheck = bills[0].checkbookingNo + 1;
                bookingNo = "KLSK0" + billnocheck
            }
            else {
                var billnocheck = bills[0].checkbookingNo + 1;
                bookingNo = "KLSK" + billnocheck
            }

        }
        else {
            console.log(2)
            bookingNo = "KLSK01"
        }
    }
    else {
        console.log(3)
        bookingNo = "KLSK01"
    }
    return bookingNo;
}


router.post('/filter/available/shikaras', async (req, res) => {
    try {
        var { selectedDate, startTime, endTime, location, memberCount, childrenCount, page, limit } = req.body;
        //console.log(req.body)
        const startHour = new Date(startTime).getHours()
        const startHourr = new Date(startTime)
        const endHourr = new Date(endTime)
        const endHour = new Date(endTime).getHours()
        var durationInHoursssss = (endHourr - startHourr) / (1000 * 60 * 60);


        const endDecimalTime =
            (endHourr.getHours() +
                endHourr.getMinutes() / 60 +
                endHourr.getSeconds() / 3600 +
                endHourr.getMilliseconds() / 3600000)


        const startDecimalTime =
            (startHourr.getHours() +
                startHourr.getMinutes() / 60 +
                startHourr.getSeconds() / 3600 +
                startHourr.getMilliseconds() / 3600000)


        var pageNo = 0,
            dataLimit = 0;


        const currrDate = new Date()
        const currentDate = currrDate.getDate()
        const currmonth = currrDate.getMonth() + 1
        const currYear = currrDate.getFullYear();
        var currentD = currYear + '-' + (currmonth < 10 ? '0' : '') + currmonth + '-' + (currentDate < 10 ? '0' : '') + currentDate;


        const sd = new Date(selectedDate)
        const sdDate = sd.getDate()
        const sdmonth = sd.getMonth() + 1
        const sdYear = sd.getFullYear();
        var selectedD = sdYear + '-' + (sdmonth < 10 ? '0' : '') + sdmonth + '-' + (sdDate < 10 ? '0' : '') + sdDate;


        if (currentD == selectedD) {
            const currentHour = currrDate.getHours();
            const currentMinute = currrDate.getMinutes();
            const currentTime = currentHour + currentMinute / 60;
            if (startDecimalTime < currentTime || endDecimalTime < currentTime) {
                res.status(200).json({
                    status: false,
                    msg: "Invalid time slots selected"
                })
                return
            }
        }
        if (Misc.isnullorempty(page) && Misc.isnullorempty(limit)) {
            res.status(200).json({
                status: false,
                msg: "Please provide page and limit"
            })
            return
        }
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
        if (!selectedDate) {
            res.status(200).json({
                status: false,
                msg: "selectedDate not provided"
            });
            return
        }
        selectedDate = new Date(selectedDate);
        if (!memberCount) {
            res.status(200).json({
                status: false,
                msg: "MemberCount not provided"
            });
            return
        }
        if (!location) {
            res.status(200).json({
                status: false,
                msg: "Location not provided"
            });
            return
        } if (Misc.isnullorempty(endTime)) {
            res.status(200).json({
                status: false,
                msg: "EndTime not provided"
            });
            return
        }
        if ((endHour < startHour)) {
            res.status(200).json({
                status: false,
                msg: "Invalid time slots."
            })
            return
        }
        if (startDecimalTime > 17.5 || startDecimalTime < 6) {
            res.status(200).json({
                status: false,
                msg: "Trip start time is 6 AM."
            });
            return
        }
        if (endDecimalTime > 17.5 || endDecimalTime < 6) {
            res.status(200).json({
                status: false,
                msg: "Trip end time limit is 5:30 PM."
            });
            return
        }
        if (Misc.isnullorempty(startTime)) {
            res.status(200).json({
                status: false,
                msg: "Trip startTime not provided."
            });
            return
        }
        var endtime = endTime

        var starttime = startTime
        var startTime = new Date(startTime);
        var endTime = new Date(endTime);
        var selectedDateStartEnd = await dateTime.getDateStartEnd(selectedDate);
        var squery = {
            status: "Active",
            advancepaymentStatus: "Success",
            selectedDate: {
                $gte: selectedDateStartEnd.dStart,
                $lte: selectedDateStartEnd.dEnd
            },
            $or: [
                {
                    $and: [
                        { startTime: { $gte: startTime, $lte: endTime } },
                        { endTime: { $gte: startTime, $lte: endTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $lte: startTime } },
                        { endTime: { $gte: startTime, $lte: endTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $gte: startTime, $lte: endTime } },
                        { endTime: { $gte: endTime } }
                    ]
                }
            ]
        };
        var shiks = await shikaraBookingModel.find(squery)
        // if(shiks){
        //     for(var i=0;i<shiks.length;i++){
        //         if(shiks[i].endTime == startTime && shiks[i].endTime < endTime)
        //     }
        // }
        if (!Misc.isnullorempty(shiks)) {
            const unwantedshikaras = shiks.map(x => new mongoose.Types.ObjectId(x.shikaraid))
            var availableShikarass = await shikaraModel.find({ _id: { $nin: unwantedshikaras }, status: "Active", shikaraStatus: "Approved"/*  totalSeats: { $gte: memberCount } */ })
            if (!Misc.isnullorempty(availableShikarass)) {
                var hoursshikaras = availableShikarass.map(x => new mongoose.Types.ObjectId(x._id))
                var availableShikarass = await tripTypeModel.find({ shikaraId: { $in: hoursshikaras }, minimumHours: { $lte: durationInHoursssss }, minCapacityOfBoats: { $lte: memberCount }, maxCapacityOfBoats: { $gte: memberCount } })
                var finalshiksss = availableShikarass.map(x => new mongoose.Types.ObjectId(x.shikaraId))
                var availableShikaras = await shikaraModel.find({ _id: { $in: finalshiksss } })
            }
        }
        else {
            var availableShikarass = await shikaraModel.find({/*_id:{$ne:unwantedshikaras},*/status: "Active", shikaraStatus: "Approved"/*  totalSeats: { $gte: memberCount } */ })
            if (!Misc.isnullorempty(availableShikarass)) {
                var hoursshikaras = availableShikarass.map(x => new mongoose.Types.ObjectId(x._id))
                var availableShikarass = await tripTypeModel.find({ shikaraId: { $in: hoursshikaras }, minimumHours: { $lte: durationInHoursssss }, minCapacityOfBoats: { $lte: memberCount }, maxCapacityOfBoats: { $gte: memberCount } }).populate("shikaraId")
                var finalshiksss = availableShikarass.map(x => new mongoose.Types.ObjectId(x.shikaraId))
                var availableShikaras = await shikaraModel.find({ _id: { $in: finalshiksss } })
            }
        }
        var arr = [];
        if (availableShikaras.length > 0) {
            for (var i = 0; i < availableShikaras.length; i++) {
                if (!Misc.isnullorempty(availableShikaras[i].location) /* && !Misc.isnullorempty(availableShikaras[i].startingLocation) */) {
                    if (!Misc.isnullorempty(availableShikaras[i].location._id) /* && !Misc.isnullorempty(availableShikaras[i].startingLocation._id) */) {
                        if ((availableShikaras[i].location._id == location)/*  && (availableShikaras[i].startingLocation._id == startingLocation) */) {
                            arr.push(availableShikaras[i])
                        }
                    }
                }
            }
        }
        ////////////////////////
        if (arr) {
            var checkInDate = selectedDate
            var reserve = arr.map(x => new mongoose.Types.ObjectId(x._id));
            // console.log("reserve", reserve)
            var checkInDateStartEnd = await dateTime.getDateStartEnd(checkInDate);
            var rquery = {
                status: "Active",
                shikaraId: { $in: reserve },
                checkInDate: {
                    $gte: checkInDateStartEnd.dStart,
                    $lte: checkInDateStartEnd.dEnd
                },
                $or: [
                    {
                        $and: [
                            { startTime: { $gte: startTime, $lte: endTime } },
                            { endTime: { $gte: startTime, $lte: endTime } }
                        ]
                    },
                    {
                        $and: [
                            { startTime: { $lte: startTime } },
                            { endTime: { $gte: startTime, $lte: endTime } }
                        ]
                    },
                    {
                        $and: [
                            { startTime: { $gte: startTime, $lte: endTime } },
                            { endTime: { $gte: endTime } }
                        ]
                    }
                ]
            };
            const reservecheck = await reservationModel.find(rquery)
            // console.log("reservecheck", reservecheck)
            if (!Misc.isnullorempty(reservecheck)) {
                var reserveids = reservecheck.map(x => new mongoose.Types.ObjectId(x.shikaraId));
                // console.log("reserve ids", reserveids)

                const reserveStrings = reserve.map(id => id.toString());
                const reserveIdsStrings = reserveids.map(id => id.toString());

                // Filter out common IDs
                var finalshikaraIds = reserveStrings.filter(id => !reserveIdsStrings.includes(id));



                //    var finalshikaraIds = reserve.filter(element => reserveids.indexOf(element) === -1);

                //    var finalshikaraIds = reserve.filter(element => !reserveids.includes(element));
                //var finalshikaraIds = reserve.filter(id => !reserveids.includes(id));
                // console.log("finalshikaraIds", finalshikaraIds)

            }
            else {
                var finalshikaraIds = reserve/*arr.map(x => new mongoose.Types.ObjectId(x._id));*/
                // console.log("else FInal shikids", finalshikaraIds)
            }
            ///////////////////////////////////////
            // if (arr) {
            // var finalshikaraIds = arr.map(x => new mongoose.Types.ObjectId(x._id));
            var query = { shikaraId: { $in: finalshikaraIds }, status: "Active", startDate: { $lte: selectedDate }, endDate: { $gte: selectedDate },isAvailable: true};
            var finalList = await tripPackageModel.find(query).populate("tripTypeId")

            if (finalList.length == 1 && finalList[0].packageType == "Special") {
                finalList = finalList
            }
            else {
                finalList = await tripPackageModel.aggregate([
                    {
                        $match: query
                    },
                    {
                        $lookup: {
                            from: "shikaramodels", // Replace with the actual name of your shikaraModel collection
                            localField: "shikaraId",
                            foreignField: "_id",
                            as: "shikaraId",
                        },
                    },
                    { $unwind: { path: "$shikaraId", preserveNullAndEmptyArrays: true } },
                    {
                        $group: {
                            _id: "$shikaraId",
                            count: { $sum: 1 },
                            documents: { $push: "$$ROOT" },
                        },
                    },
                    {
                        $project: {
                            _id: 0,
                            count: 1,
                            documents: {
                                $cond: {
                                    if: { $eq: ["$count", 1] },
                                    then: "$documents",
                                    else: {
                                        $filter: {
                                            input: "$documents",
                                            as: "doc",
                                            cond: { $eq: ["$$doc.packageType", "Special"] },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    {
                        $unwind: "$documents",
                    },
                    {
                        $replaceRoot: { newRoot: "$documents" },
                    },
                ])
            }
            console.log(finalList)
            finalList = await tripPackageModel.populate(finalList, { path: 'tripTypeId' });
            const resultList = [];
            finalList = JSON.parse(JSON.stringify(finalList));
            for (var i = 0; i < finalList.length; i++) {
                const customerRate = finalList[i].customerRate /** memberCount;*/
                const startTimeDate = new Date(starttime);
                const endTimeDate = new Date(endtime);
                var durationInHours = Math.ceil((endTimeDate - startTimeDate) / (1000 * 60 * 60));
                const totalRatee = finalList[i].agentRate /** memberCount;*/
                const totalAgentRate = totalRatee * durationInHours
                const totalcusRate = customerRate * durationInHours

                const bookedSeats = await shikaraBookingModel.countDocuments({
                    shikaraId: finalList[i].shikaraId._id,
                    selectedDate: selectedDate,
                    status: "Active",
                    $or: [
                        { $and: [{ startTime: { $lt: endTime.dStart } }, { endTime: { $gt: startTime.dStart } }] },
                        { $and: [{ startTime: { $lt: endTime.dEnd } }, { endTime: { $gt: startTime.dEnd } }] },
                        { $and: [{ startTime: { $gte: startTime.dStart }, endTime: { $lte: endTime.dEnd } }] }
                    ]
                });
                const availableSeats = finalList[i].shikaraId.totalSeats - bookedSeats;

                finalList[i].totalcusRate = totalcusRate;
                finalList[i].totalAgentRate = totalAgentRate;
                finalList[i].durationInHours = durationInHours;
                finalList[i].agentSaved = totalcusRate - totalAgentRate;
                finalList[i].availableSeats = availableSeats; // Adding available seats count to the response

            }
            if (finalList) {
                res.status(200).json({
                    status: true,
                    msg: 'List of shikaras found.',
                    data: finalList,
                    limit: limit,
                    page: page,
                    totalLength: finalList.length
                });
                return
            }
            else {
                res.status(200).json({
                    status: true,
                    msg: 'No shikaras found for the given requirements.',
                    data: arr
                });
                return;
            }
        }
        else {
            res.status(200).json({
                status: true,
                msg: 'No shikaras found for the given requirements.',
                data: arr
            });
            return;
        }
    }

    catch (err) {
        console.log(err);
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        });
    }
});

//Agent Side
//VIEW SINGLE SHIKARA
router.post('/view/shikara', async (req, res) => {
    try {
        var { shikaraid, memberCount, selectedDate, startTime, endTime } = req.body;
        //console.log(req.body)
        if (Misc.isnullorempty(startTime)) {
            res.status(200).json({
                status: false,
                msg: "Please provide startTime"
            })
            return
        }
        if (Misc.isnullorempty(endTime)) {
            res.status(200).json({
                status: false,
                msg: "Please provide endTime"
            })
            return
        }
        if (Misc.isnullorempty(memberCount)) {
            res.status(200).json({
                status: false,
                msg: "Please provide membercount"
            })
            return
        }
        if (Misc.isnullorempty(selectedDate)) {
            res.status(200).json({
                status: false,
                msg: "Please provide selectedDate"
            })
            return
        }
        if (Misc.isnullorempty(shikaraid)) {
            res.status(200).json({
                status: false,
                msg: "Please provide shikaraid"
            })
            return
        }
        var starttime = startTime;
        var endtime = endTime;
        const startTimeDate = new Date(starttime);
        const endTimeDate = new Date(endtime);
        const durationInHours = Math.ceil((endTimeDate - startTimeDate) / (1000 * 60 * 60));
        //console.log(durationInHours)
        startTime = await dateTime.getDateStartEnd(new Date(startTime));
        endTime = await dateTime.getDateStartEnd(new Date(endTime));
        //var d = await tripPackageModel.find({ shikaraId: shikaraid, status: "Active" }).populate("shikaraId").populate([{ path: "shikaraId", populate: { path: "vendorid", populate: { path: "userid" } } }, { path: "shikaraId", populate: { path: "location" } }, { path: "shikaraId", populate: { path: "startingLocation" } }])
        var query = { isAvailable: true, shikaraId: new mongoose.Types.ObjectId(shikaraid), status: "Active", startDate: { $lte: new Date(selectedDate) }, endDate: { $gte: new Date(selectedDate) } };
        var d = await tripPackageModel.find(query).populate("tripTypeId").populate([{ path: 'shikaraId', populate: { path: 'userid' } }]).populate([{ path: 'shikaraId', populate: { path: 'startingLocation' } }])
        console.log(d, "d")
        if (d.length == 1 && d[0].packageType == "Special") {
            console.log("hereee")
            d = d
        }
        else {
            var d = await tripPackageModel.aggregate([
                {
                    $match: query
                },
                {
                    $lookup: {
                        from: "shikaramodels", // Replace with the actual name of your shikaraModel collection
                        localField: "shikaraId",
                        foreignField: "_id",
                        as: "shikaraId",
                    },
                },
                { $unwind: { path: "$shikaraId", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "sublocationmodels", // Adjust this based on your actual sublocation model name
                        localField: "shikaraId.startingLocation",
                        foreignField: "_id",
                        as: "shikaraId.startingLocation",
                    },
                },
                { $unwind: { path: "$shikaraId.startingLocation", preserveNullAndEmptyArrays: true } },
                {
                    $lookup: {
                        from: "locationmodels", // Adjust this based on your actual sublocation model name
                        localField: "shikaraId.location",
                        foreignField: "_id",
                        as: "shikaraId.location",
                    },
                },
                { $unwind: { path: "$shikaraId.location", preserveNullAndEmptyArrays: true } },

                {
                    $lookup: {
                        from: "usermodels", // Adjust this based on your actual sublocation model name
                        localField: "shikaraId.userid",
                        foreignField: "_id",
                        as: "shikaraId.userid",
                    },
                },
                { $unwind: { path: "$shikaraId.userid", preserveNullAndEmptyArrays: true } },

                {
                    $group: {
                        _id: "$shikaraId",
                        count: { $sum: 1 },
                        documents: { $push: "$$ROOT" },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        count: 1,
                        documents: {
                            $cond: {
                                if: { $eq: ["$count", 1] },
                                then: "$documents",
                                else: {
                                    $filter: {
                                        input: "$documents",
                                        as: "doc",
                                        cond: { $eq: ["$$doc.packageType", "Special"] },
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    $unwind: "$documents",
                },
                {
                    $replaceRoot: { newRoot: "$documents" },
                },
            ])
            //console.log(d)
        }

        // return
        //console.log(d)
        if (d.length > 0) {
            if (!Misc.isnullorempty(d[0].agentRate)) {
                var agentrate =/* memberCount **/ d[0].agentRate * durationInHours
                var agentRateCommission = d[0].agentRateCommission * durationInHours
                // console.log(durationInHours)
                // console.log(d.agentRate)
                // console.log(agentrate)
            }
            if (!Misc.isnullorempty(d[0].customerRate)) {
                var custrate =/* memberCount **/ d[0].customerRate * durationInHours
                var customerRateCommission = d[0].customerRateCommission * durationInHours
            }
            var agentSaved = custrate - agentrate
            const bookedSeats = await shikaraBookingModel.countDocuments({
                shikaraId: d[0].shikaraId._id,
                selectedDate: selectedDate,
                status: "Active",
                $or: [
                    { $and: [{ startTime: { $lt: endTime.dStart } }, { endTime: { $gt: startTime.dStart } }] },
                    { $and: [{ startTime: { $lt: endTime.dEnd } }, { endTime: { $gt: startTime.dEnd } }] },
                    { $and: [{ startTime: { $gte: startTime.dStart }, endTime: { $lte: endTime.dEnd } }] }
                ]
            })
            var availableSeats = d[0].shikaraId.totalSeats - bookedSeats;
        }
        if (Misc.isnullorempty(d)) {
            res.status(200).json({
                status: true,
                msg: "NO DATA FOUND",
                data: d
            });
            return;
        }
        var startloc = await tripTypeModel.findOne({ shikaraId: shikaraid, status: "Active" })
        if (!Misc.isnullorempty(startloc)) {
            var startingloc = startloc.pickUpLocation
            var droploc = startloc.dropLocation
        }
        var reviewData=await reviewModel.find({shikaraId:shikaraid,status:"Active"}).populate("user").limit(5).sort({created_at:-1});
        res.status(200).json({
            status: true,
            msg: "Data",
            data: d[0],
            agentrate: agentrate,
            durationInHours: durationInHours,
            agentSaved: agentSaved,
            customerRate: custrate,
            agentRateCommission: agentRateCommission,
            customerRateCommission: customerRateCommission,
            availableSeats: availableSeats,
            startinglocation: startingloc,
            droplocation: droploc,
            tripDetails: startloc,
            reviews:reviewData
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

//ADD BOOKING
router.post('/shikara/agent/booking', ifToken, async (req, res) => {
    try {
        var { selectedDate, customerDetails, agentRateCommission, startTime, agentgetAmount, endTime, amount, bookedOn, location, /* startingLocation, */ shikaraid, memberCount, bookingType, bookingTotal, discount, additionalCharge, gstAmount, postBookingamount, balancePaymentMode, advance, advancepaymentMode, bookingNo, bookedbyid, childrenCount, agentDetails } = req.body;
        // console.log(req.body)
        if (Misc.isnullorempty(selectedDate)) {
            res.status(200).json({
                status: false,
                msg: "Please fill selectedDate."
            })
            return
        }
        /*   if (Misc.isnullorempty(startingLocation)) {
              res.status(200).json({
                  status: false,
                  msg: "Please fill startingLocation."
              })
              return
          } */
        if (Misc.isnullorempty(postBookingamount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill postBookingamount."
            })
            return
        }
        if (Misc.isnullorempty(startTime)) {
            res.status(200).json({
                status: false,
                msg: "Please fill startTime."
            })
            return
        }
        if (Misc.isnullorempty(endTime)) {
            res.status(200).json({
                status: false,
                msg: "Please fill endTime."
            })
            return
        }
        if (Misc.isnullorempty(amount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill amount."
            })
            return
        }
        if (Misc.isnullorempty(shikaraid)) {
            res.status(200).json({
                status: false,
                msg: "Please fill shikaraid."
            })
            return
        }
        if (Misc.isnullorempty(memberCount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill memberCount."
            })
            return
        }
        if (Misc.isnullorempty(bookingType)) {
            res.status(200).json({
                status: false,
                msg: "Please fill bookingType."
            })
            return
        }
        // if (Misc.isnullorempty(discount)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill discount."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(additionalCharge)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill additionalCharge."
        //     })
        //     return
        // }
        if (Misc.isnullorempty(gstAmount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill gstAmount."
            })
            return
        }
        // if (Misc.isnullorempty(childrenCount)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill childrenCount."
        //     })
        //     return
        // }
        if (Misc.isnullorempty(customerDetails)) {
            res.status(200).json({
                status: false,
                msg: "Please fill customerDetails."
            })
            return
        }
        if (Misc.isnullorempty(bookingTotal)) {
            res.status(200).json({
                status: false,
                msg: "Please fill bookingTotal."
            })
            return
        }
        if (Misc.isnullorempty(advancepaymentMode)) {
            res.status(200).json({
                status: false,
                msg: "Please fill advancepaymentMode."
            })
            return
        }
        if (Misc.isnullorempty(advance)) {
            res.status(200).json({
                status: false,
                msg: "Please fill advance."
            })
            return
        }
        const originalTimestamp = moment(endTime, 'YYYY-MM-DDTHH:mm:ss').valueOf();
        const reducedTimestamp = reduceMinute(originalTimestamp);
        const formattedTimestamp = formatTimestamp(reducedTimestamp);
        // console.log("endTime", endTime)
        // console.log("formattedTimestamp", formattedTimestamp)
        // return
        const timestamp = Date.now();
        //const randomString = generateRandomString(8);
        //var bookingNo = `${timestamp}_${randomString}`;
        // var bookingNo = generateUniqueId(8)
        var bookingNo = await generateshikaraBookingNo(req.user.id)
        var data1 = bookingNo.split("KLSK");
        var bookedOn = timestamp
        //var gstAmount = amount * 0.18
        //var bookingTotal = /*additionalCharge + gstAmount - discount*/amount
        let newshikbooking = new shikaraBookingModel({
            bookingType: "Agent",
            advancepaymentMode: advancepaymentMode,
            amount: amount,
            advance: advance,
            location: location,
            vendorNetAmount: agentRateCommission,
            bookingTotal: bookingTotal,
            discount: discount,
            agentgetAmount: agentgetAmount,
            additionalCharge: additionalCharge,
            gstAmount: gstAmount,
            bookedOn: bookedOn,
            selectedDate: selectedDate,
            //startingLocation: startingLocation,
            startTime: /* addMinuteToTimestamp(startTime) */startTime,
            postBookingamount: postBookingamount,
            // endTime: endTime,
            endTime: formattedTimestamp,
            customerDetails: customerDetails,
            shikaraid: shikaraid,
            childrenCount: childrenCount,
            //agentDetails: agentDetails,
            memberCount: memberCount,
            bookedbyid: req.user.id,
            bookingNo: bookingNo,
            checkbookingNo: data1[1],
        });
        await newshikbooking.save();



        //payment
        var txnid = shortid.generate();
        var clientId = shortid.generate();
        var pay = new PaymentModel({
          //  bookingId: newshikbooking._id,
            skBookingId:newshikbooking._id,
            //userId: userid,
            totalAmount: advance,
            paymentStatus: "Pending",
            initDate: Date.now(),
            phoneNumber: customerDetails.phoneNumber,
            email: customerDetails.email,
            txnid: txnid,
            clientId: clientId,
        });
        await pay.save();
        newshikbooking.paymentId = pay._id
        await newshikbooking.save()
        //var sucessurl = "https://agent.accessrooms.com/successPage?txnId=" + txnid+"&clientId="+clientId+"&paymentId="+pay._id;
        var sucessurl = "https://api.accessrooms.com/phonePe/paymentResponce"
        var isCustomer = false;
        var falilureurl = "https://agent.accessrooms.com/failurePage"
        var paymentStart = await PaymentHelper.startPaymentTest(
            advance,
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
            msg: "Payment Initiated",
            data: newshikbooking,
            url: paymentStart.data.instrumentResponse.redirectInfo.url
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

//--------------------------------------------------------------NO EDITS---------------------------------------------------------

//Phone Pe Payment Responce API
router.post('/phonePe/paymentResponce', async (req, res) => {
    try {
        //{"code":"PAYMENT_SUCCESS","merchantId":"PGTESTPAYUAT76","transactionId":"cz2ExUEn9","amount":"150000","providerReferenceId":"T2312131511321359708748","param1":"na","param2":"na","param3":"na","param4":"na","param5":"na","param6":"na","param7":"na","param8":"na","param9":"na","param10":"na","param11":"na","param12":"na","param13":"na","param14":"na","param15":"na","param16":"na","param17":"na","param18":"na","param19":"na","param20":"na","checksum":"2ec420101ce340d500564d384adb5625accf5354bedcfa4588a9a4d915c2dbd0###1"}}
        var { code, merchantId, transactionId, amount, providerReferenceId, param1, param2, param3, param4, param5, param6, param7, param8, param9, checksum } = req.body;
        // var respon = new ResponceModel({
        //     responce: req.body
        // })
        // await respon.save()
        // return;
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
                paymentDetails.status = "Success",
                    paymentDetails.success_time = new Date();

                await paymentDetails.save();
                var booking = await shikaraBookingModel.findOne({ paymentId: paymentDetails._id }).populate("bookedbyid").populate("location").populate("shikaraid").populate("shikaraid").populate([{ path: "shikaraid", populate: { path: "vendorid", populate: { path: "userid" } } }])
                var triptype = await tripTypeModel.findOne({ shikaraId: booking.shikaraid, status: "Active" })
                if (!Misc.isnullorempty(triptype)) {
                    var pickUpLocation = triptype.pickUpLocation
                    var dropLocation = triptype.dropLocation
                }
                if (!Misc.isnullorempty(booking)) {
                    // if (!Misc.isnullorempty(booking.paymentStatus)) {
                    //     if (booking.paymentStatus == "Initiate") {
                    //         booking.paymentStatus = "Success"
                    //     }
                    // }
                    if (!Misc.isnullorempty(booking.advancepaymentStatus)) {
                        if (booking.advancepaymentStatus == "Pending") {
                            booking.advancepaymentStatus = "Success"
                        }
                    }
                }
                //calculation
                var calcadvance = 0;
                var advAmount = 0;
                var balance = booking.vendorNetAmount - booking.postBookingamount;
                booking.accessPayBalance = balance;
                //10 % of totalAmount
               // var commission = booking.shikaraid.commissionPercentage;
                var commissionValue =(20 / 100);
                calcadvance =parseInt (commissionValue * booking.vendorNetAmount);
                advAmount = booking.advance - calcadvance;
                booking.vendorBalance = advAmount;
                await booking.save();

                //////////SEND MAIL////////////////
                var adminmail="accessroomsreservation@gmail.com";
                try {
                    var content = await EmailHelper.readEmailBookingSuccessTemplate("bookingsuccessagent", {
                        id: booking._id,
                        name: booking.bookedbyid.name,
                        balanceAmount: booking.postBookingamount,
                        bookingTotal: booking.bookingTotal,
                        endTime: formatDate(booking.endTime),
                        startTime: formatDate(booking.startTime),
                        location: booking.location.name,
                        selectedDate: formatDate(booking.selectedDate),
                        bookingNo: booking.bookingNo,
                        pickUpLocation: pickUpLocation,
                        dropLocation: dropLocation,
                        shikaraName: booking.shikaraid.shikaraName,
                        // bookingTotal: booking.bookingTotal,

                    });
                    var content2 = await EmailHelper.readEmailBookingSuccessTemplate("bookingsuccessvendor", {
                        id: booking._id,
                        name: booking.bookedbyid.name,
                        vendorname: booking.shikaraid.vendorid.userid.name,
                        balanceAmount: booking.postBookingamount,
                        bookingTotal: booking.bookingTotal,
                        endTime: formatDate(booking.endTime),
                        startTime: formatDate(booking.startTime),
                        location: booking.location.name,
                        selectedDate: formatDate(booking.selectedDate),
                        bookingNo: booking.bookingNo,
                        pickUpLocation: pickUpLocation,
                        dropLocation: dropLocation,
                        shikaraName: booking.shikaraid.shikaraName,
                        // bookingTotal: booking.bookingTotal,

                    });
                    var content3 = await EmailHelper.readEmailBookingSuccessTemplate("bookingskadmin", {
                        id: booking._id,
                        name: booking.bookedbyid.name,
                        vendorname: booking.shikaraid.vendorid.userid.name,
                        balanceAmount: booking.postBookingamount,
                        bookingTotal: booking.bookingTotal,
                        endTime: formatDate(booking.endTime),
                        startTime: formatDate(booking.startTime),
                        location: booking.location.name,
                        selectedDate: formatDate(booking.selectedDate),
                        bookingNo: booking.bookingNo,
                        pickUpLocation: pickUpLocation,
                        dropLocation: dropLocation,
                        shikaraName: booking.shikaraid.shikaraName,
                        // bookingTotal: booking.bookingTotal,

                    });
                    await EmailHelper.sendHtmlEmail(
                        booking.bookedbyid.email,
                        //"sajanjose31102000@gmail.com",
                        "Booking Confirmation Email",
                        content
                    );
                    await EmailHelper.sendHtmlEmail(
                        booking.shikaraid.vendorid.userid.email,
                        //"sajanjose31102000@gmail.com",
                        "Booking alert",
                        content2
                    );
                    await EmailHelper.sendHtmlEmail(
                        adminmail,
                        "Booking alert",
                        content3
                    );
                } catch (errr) {
                    console.log(errr, "Error while sending Email");
                    return errr;
                }







                const frontendURL = 'https://agent.accessrooms.com/shikarabookings';
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
        res.status(500).json({
            status: false,
            error: e,
            msg: "Internal server error"
        })
        return;
    }
})

router.post('/phonePe/paymentResponce/customer', async (req, res) => {
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
                var booking = await shikaraBookingModel.findOne({ paymentId: paymentDetails._id }).populate("bookedbyid").populate("location").populate("shikaraid").populate("shikaraid").populate([{ path: "shikaraid", populate: { path: "vendorid", populate: { path: "userid" } } }])
                var triptype = await tripTypeModel.findOne({ shikaraId: booking.shikaraid, status: "Active" })
                if (!Misc.isnullorempty(triptype)) {
                    var pickUpLocation = triptype.pickUpLocation
                    var dropLocation = triptype.dropLocation
                }
                if (!Misc.isnullorempty(booking)) {
                    // if (!Misc.isnullorempty(booking.paymentStatus)) {
                    //     if (booking.paymentStatus == "Initiate") {
                    //         booking.paymentStatus = "Success"
                    //     }
                    // }
                    if (!Misc.isnullorempty(booking.advancepaymentStatus)) {
                        if (booking.advancepaymentStatus == "Pending") {
                            booking.advancepaymentStatus = "Success"
                        }
                    }
                }
                var calcadvance = 0;
                var advAmount = 0;
                var balance = booking.vendorNetAmount - booking.postBookingamount;
                booking.accessPayBalance = balance;
                //10 % of totalAmount
               // var commission = booking.shikaraid.commissionPercentage;
                var commissionValue = (20 / 100);
                calcadvance =parseInt (commissionValue * booking.vendorNetAmount);
                advAmount = booking.advance - calcadvance;
                booking.vendorBalance = advAmount;
                await booking.save();
                var name = ""
                if (booking) {
                    if (booking.customerDetails) {
                        if (booking.customerDetails.name) {
                            name = booking.customerDetails.name
                        }
                    }
                    var postBookingamount = ""
                    if (booking.postBookingamount) {
                        postBookingamount = booking.postBookingamount
                    }
                    var bookingTotal = ""
                    if (booking.bookingTotal) {
                        bookingTotal = booking.bookingTotal
                    }
                    var endTime = ""
                    if (booking.endTime) {
                        endTime = booking.endTime
                    }
                    var startTime = ""
                    if (booking.startTime) {
                        startTime = booking.startTime
                    }
                    var locname = ""
                    if (booking.location) {
                        if (booking.location.name) {
                            locname = booking.endTime
                        }
                    }
                    var selectedDate = ""
                    if (booking.selectedDate) {
                        selectedDate = booking.selectedDate
                    }
                    var bookingNo = ""
                    if (booking.bookingNo) {
                        bookingNo = booking.bookingNo
                    }
                    var shikaraName = ""
                    if (booking.shikaraid) {
                        if (booking.shikaraid.shikaraName) {
                            shikaraName = booking.shikaraid.shikaraName
                        }
                    }
                }
                //////////SEND MAIL////////////////
                var adminmail="accessroomsreservation@gmail.com";
                try {
                    var content = await EmailHelper.readEmailBookingSuccessTemplate("bookingsuccesscustomer", {
                        name: name,
                        balanceAmount: postBookingamount,
                        bookingTotal: bookingTotal,
                        endTime: formatDate(endTime),
                        startTime: formatDate(startTime),
                        location: locname,
                        selectedDate: formatDate(selectedDate),
                        bookingNo: bookingNo,
                        pickUpLocation: pickUpLocation,
                        dropLocation: dropLocation,
                        shikaraName: shikaraName,
                        // bookingTotal: booking.bookingTotal,

                    });
                    var content2 = await EmailHelper.readEmailBookingSuccessTemplate("bookingsuccessvendor", {
                        name: booking.bookedbyid.name,
                        vendorname: booking.shikaraid.vendorid.userid.name,
                        balanceAmount: booking.postBookingamount,
                        bookingTotal: booking.bookingTotal,
                        endTime: formatDate(booking.endTime),
                        startTime: formatDate(booking.startTime),
                        location: booking.location.name,
                        selectedDate: formatDate(booking.selectedDate),
                        bookingNo: booking.bookingNo,
                        pickUpLocation: pickUpLocation,
                        dropLocation: dropLocation,
                        shikaraName: booking.shikaraid.shikaraName,
                        // bookingTotal: booking.bookingTotal,

                    });
                    var content3 = await EmailHelper.readEmailBookingSuccessTemplate("bookingskadmin", {
                        name: booking.bookedbyid.name,
                        vendorname: booking.shikaraid.vendorid.userid.name,
                        balanceAmount: booking.postBookingamount,
                        bookingTotal: booking.bookingTotal,
                        endTime: formatDate(booking.endTime),
                        startTime: formatDate(booking.startTime),
                        location: booking.location.name,
                        selectedDate: formatDate(booking.selectedDate),
                        bookingNo: booking.bookingNo,
                        pickUpLocation: pickUpLocation,
                        dropLocation: dropLocation,
                        shikaraName: booking.shikaraid.shikaraName,
                        // bookingTotal: booking.bookingTotal,

                    });
                    await EmailHelper.sendHtmlEmail(
                        booking.bookedbyid.email,
                        //"sajanjose31102000@gmail.com",
                        "Booking Confirmation Email",
                        content
                    );
                    await EmailHelper.sendHtmlEmail(
                        booking.shikaraid.vendorid.userid.email,
                        // "sajanjose31102000@gmail.com",
                        "Booking alert",
                        content2
                    );
                    await EmailHelper.sendHtmlEmail(
                        adminmail,
                        "Booking alert",
                        content3
                    );
                } catch (e) {
                    console.log(e, "Error while sending Email");
                }











                const frontendURL = 'https://accessrooms.com/successPage';
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
        var dta = JSON.stringify(e)
        res.status(500).json({
            status: false,
            error: dta,
            msg: "Internal server error",
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

//-------------------------------------------------------------------------------------------------------------------------------

//ADD BOOKING FINAL(CUSTOMER)
router.post('/shikara/customer/bookingfinal', /* ifToken, */ async (req, res) => {
    try {
        var { selectedDate, customerDetails, shikbookid, startTime, agentgetAmount, endTime, amount, bookedOn, location, /* startingLocation, */ shikaraid, memberCount, bookingType, bookingTotal, discount, additionalCharge, gstAmount, postBookingamount, balancePaymentMode, advance, advancepaymentMode, bookingNo, bookedbyid, childrenCount, agentDetails } = req.body;
        //console.log(req.body)
        if (Misc.isnullorempty(selectedDate)) {
            res.status(200).json({
                status: false,
                msg: "Please fill selectedDate."
            })
            return
        }
        /*  if (Misc.isnullorempty(startingLocation)) {
             res.status(200).json({
                 status: false,
                 msg: "Please fill startingLocation."
             })
             return
         } */
        if (Misc.isnullorempty(postBookingamount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill postBookingamount."
            })
            return
        }
        if (Misc.isnullorempty(startTime)) {
            res.status(200).json({
                status: false,
                msg: "Please fill startTime."
            })
            return
        }
        if (Misc.isnullorempty(endTime)) {
            res.status(200).json({
                status: false,
                msg: "Please fill endTime."
            })
            return
        }
        if (Misc.isnullorempty(amount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill amount."
            })
            return
        }
        if (Misc.isnullorempty(shikaraid)) {
            res.status(200).json({
                status: false,
                msg: "Please fill shikaraid."
            })
            return
        }
        if (Misc.isnullorempty(advance)) {
            res.status(200).json({
                status: false,
                msg: "Please provide advance."
            })
            return
        }
        if (Misc.isnullorempty(memberCount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill memberCount."
            })
            return
        }
        // if (Misc.isnullorempty(bookingType)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill bookingType."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(discount)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill discount."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(additionalCharge)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill additionalCharge."
        //     })
        //     return
        // }
        if (Misc.isnullorempty(gstAmount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill gstAmount."
            })
            return
        }
        if (Misc.isnullorempty(childrenCount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill childrenCount."
            })
            return
        }
        // if (Misc.isnullorempty(agentDetails)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill agentDetails."
        //     })
        //     return
        // }
        if (Misc.isnullorempty(bookingTotal)) {
            res.status(200).json({
                status: false,
                msg: "Please fill bookingTotal."
            })
            return
        }
        // if (Misc.isnullorempty(advancepaymentMode)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill advancepaymentMode."
        //     })
        //     return
        // }
        if (Misc.isnullorempty(advance)) {
            res.status(200).json({
                status: false,
                msg: "Please fill advance."
            })
            return
        }
        const timestamp = Date.now();
        //const randomString = generateRandomString(8);
        //var bookingNo = `${timestamp}_${randomString}`;
        //var bookedbyid = req.user.id;
        var bookedOn = timestamp
        //var gstAmount = amount * 0.18
        var bookingTotal = /*additionalCharge + gstAmount - discount*/amount
        var shikbook = await shikaraBookingModel.findOne({ _id: shikbookid })
        if (!Misc.isnullorempty(shikbook)) {
            shikbook.advance = advance,
                shikbook.bookingTotal = bookingTotal,
                shikbook.discount = discount,
                shikbook.additionalCharge = additionalCharge,
                shikbook.gstAmount = gstAmount,
                shikbook.advance = advance,
                shikbook.childrenCount = childrenCount,
                shikbook.bookedOn = bookedOn,
                shikbook.postBookingamount = postBookingamount,
                shikbook.customerDetails = customerDetails,
                shikbook.status = "Active"
            await shikbook.save();

            //payment
            var txnid = shortid.generate();
            var clientId = shortid.generate();
            var pay = new PaymentModel({
               // bookingId: shikbook._id,
                skBookingId:shikbook._id,
                //userId: userid,
                totalAmount: advance,
                paymentStatus: "Pending",
                initDate: Date.now(),
                phoneNumber: customerDetails.phoneNumber,
                email: customerDetails.email,
                txnid: txnid,
                clientId: clientId,
            });
            await pay.save();
            shikbook.paymentId = pay._id
            await shikbook.save()

            var sucessurl = "https://api.accessrooms.com/phonePe/paymentResponce/customer"
            var isCustomer = true;
            var falilureurl = "https://accessrooms.com/failurePage"
            var paymentStart = await PaymentHelper.startPaymentTest(
                advance,
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
                msg: "Payment Initiated",
                data: shikbook,
                url: paymentStart.data.instrumentResponse.redirectInfo.url
            });
            return;
        }
        else {
            res.status(200).json({
                status: false,
                msg: 'Booking not found',
                data: shikbook
            })
            return
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

//BOOKING SUMMARY
router.post('/booking/summary', /*ifToken, */async (req, res) => {
    try {
        var { totalAmount } = req.body;
        if (Misc.isnullorempty(totalAmount)) {
            res.status(200).json({
                status: false,
                msg: "Please provide totalAmount."
            })
            return
        }
        var gst = 0/*(1800 / totalAmount)*/
        var firstgst = 1;
        var secondgst = 1;
        var bookingTotal = totalAmount
        var advance = Math.ceil(totalAmount / 3.33) /* firstgst */
        var postBookingamount = bookingTotal - advance/*  (totalAmount / 2) * secondgst */


        res.status(200).json({
            status: true,
            msg: "Counts",
            bookingTotal: bookingTotal,
            advance: advance,
            gstAmount: gst,
            postBookingamount: postBookingamount




        })


    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }

})

//EMAIL TEST
// router.get('/test', /*ifToken, */async (req, res) => {
//     try {
//         const appid = "65928a88632f1226bd46e996";
//         var booking = await shikaraBookingModel.findOne({ _id: appid })

//         try {
//             var content = await EmailHelper.readEmailBookingSuccessTemplate("bookingsuccessagent", {
//                 id:"6cfe65rvr564vr864fe",
//                 name: booking.bookedbyid.name,
//                 balanceAmount: booking.postBookingamount,
//                 bookingTotal: booking.bookingTotal,
//                 endTime: formatDate(booking.endTime),
//                 startTime: formatDate(booking.startTime),
//                 //location: booking.location.name,
//                 selectedDate: formatDate(booking.selectedDate),
//                 bookingNo: booking.bookingNo,
//                 // pickUpLocation: pickUpLocation,
//                 // dropLocation: dropLocation,
//                // shikaraName: booking.shikaraid.shikaraName,
//                 // bookingTotal: booking.bookingTotal,

//             });
//             // var content2 = await EmailHelper.readEmailBookingSuccessTemplate("bookingsuccessvendor", {
//             //     name: booking.bookedbyid.name,
//             //     vendorname: booking.shikaraid.vendorid.userid.name,
//             //     balanceAmount: booking.postBookingamount,
//             //     bookingTotal: booking.bookingTotal,
//             //     endTime: formatDate(booking.endTime),
//             //     startTime: formatDate(booking.startTime),
//             //     location: booking.location.name,
//             //     selectedDate: formatDate(booking.selectedDate),
//             //     bookingNo: booking.bookingNo,
//             //     pickUpLocation: pickUpLocation,
//             //     dropLocation: dropLocation,
//             //     shikaraName: booking.shikaraid.shikaraName,
//             //     // bookingTotal: booking.bookingTotal,

//             // });
//             await EmailHelper.sendHtmlEmail(
//                 //booking.bookedbyid.email,
//                 "sajanjosekannanthara@gmail.com",
//                 "Booking Confirmation Email",
//                 content
//             );
//             // await EmailHelper.sendHtmlEmail(
//             //     // booking.shikaraid.vendorid.userid.email,
//             //     "sajanjose31102000@gmail.com",
//             //     "Booking alert",
//             //     content2
//             // );
//         } catch (errr) {
//             console.log(errr, "Error while sending Email");
//             return errr;
//         }
//         // Return success response
//         res.status(200).json({
//             status: true,
//             msg: "Success"
//         });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({
//             status: false,
//             msg: "Internal server error"
//         });
//     }
// });





//Customer side

router.post('/shikara/customer/booking', guestOrUser, async (req, res) => {
    try {
        var { shikaraid, bookedbyid, shikaraName, selectedDate, startTime, agentgetAmount, endTime, amount, bookedOn, location, /* startingLocation, */ shikaraid, memberCount, bookingType, bookingTotal, discount, additionalCharge, gstAmount, postBookingamount, balancePaymentMode, advance, advancepaymentMode, bookingNo, bookedbyid, childrenCount, agentDetails, customerRateCommission } = req.body;
        // console.log(req.body)
        var userid;
        if (req.headers.token) {
            userid = req.user.id;
            console.log(userid, "userid")
        } else if (req.headers.guestid) {
            userid = req.headers.guestid;
        } else {
            res.status(200).json({
                status: false,
                msg: "Id not provided."
            })
            return
        }
        if (Misc.isnullorempty(shikaraName)) {
            res.status(200).json({
                status: false,
                msg: "Please fill shikaraName."
            })
            return
        }
        if (Misc.isnullorempty(shikaraid)) {
            res.status(200).json({
                status: false,
                msg: "Please fill shikaraid."
            })
            return
        }
        if (Misc.isnullorempty(selectedDate)) {
            res.status(200).json({
                status: false,
                msg: "Please fill selectedDate."
            })
            return
        }
        // if (Misc.isnullorempty(postBookingamount)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill postBookingamount."
        //     })
        //     return
        // }
        if (Misc.isnullorempty(startTime)) {
            res.status(200).json({
                status: false,
                msg: "Please fill startTime."
            })
            return
        }
        if (Misc.isnullorempty(endTime)) {
            res.status(200).json({
                status: false,
                msg: "Please fill endTime."
            })
            return
        }
        if (Misc.isnullorempty(amount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill amount."
            })
            return
        }
        if (Misc.isnullorempty(shikaraid)) {
            res.status(200).json({
                status: false,
                msg: "Please fill shikaraid."
            })
            return
        }
        if (Misc.isnullorempty(memberCount)) {
            res.status(200).json({
                status: false,
                msg: "Please fill memberCount."
            })
            return
        }
        // if (Misc.isnullorempty(bookingType)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill bookingType."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(discount)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill discount."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(additionalCharge)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill additionalCharge."
        //     })
        //     return
        // }

        if (Misc.isnullorempty(bookedbyid)) {
            res.status(200).json({
                status: false,
                msg: "Please fill bookedbyid."
            })
            return
        }
        // if (Misc.isnullorempty(gstAmount)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill gstAmount."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(childrenCount)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill childrenCount."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(agentDetails)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill agentDetails."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(bookingTotal)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill bookingTotal."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(advancepaymentMode)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill advancepaymentMode."
        //     })
        //     return
        // }
        // if (Misc.isnullorempty(advance)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please fill advance."
        //     })
        //     return
        // }
        //const timestamp = Date.now();
        //const randomString = generateRandomString(8);
        //var bookingNo = `${timestamp}_${randomString}`;
        var bookingNo = await generateshikaraCustomerBookingNo(8)
        var data1 = bookingNo.split("KLSK");
        //var bookedbyid = req.user.id;
        //var bookedOn = timestamp
        //var gstAmount = amount * 0.18
        //var bookingTotal = /*additionalCharge + gstAmount - discount*/amount
        let newshikbooking = new shikaraBookingModel({
            bookingType: "Customer",
            //advancepaymentMode: advancepaymentMode,
            amount: amount,
            //advance: advance,
            location: location,
            //startingLocation: startingLocation,
            //bookingTotal: bookingTotal,
            //discount: discount,
            //agentgetAmount: agentgetAmount,
            //additionalCharge: additionalCharge,
            //gstAmount: gstAmount,
            //bookedOn: bookedOn,
            selectedDate: selectedDate,
            startTime: startTime,
            //postBookingamount: postBookingamount,
            endTime: endTime,
            shikaraid: shikaraid,
            childrenCount: childrenCount,
            //agentDetails: agentDetails,
            memberCount: memberCount,
            bookedbyid: userid,
            status: "Pending",
            bookingNo: bookingNo,
            checkbookingNo: data1[1],
            vendorNetAmount: customerRateCommission
        });
        await newshikbooking.save();
        res.status(200).json({
            status: true,
            msg: "Shikara booked succesfully.",
            data: newshikbooking,
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
router.post('/view/details', async (req, res) => {
    try {
        var { shikbookid } = req.body;
        //console.log(req.body)
        if (Misc.isnullorempty(shikbookid)) {
            res.status(200).json({
                status: false,
                msg: "Please provide shikbookid"
            })
            return
        }
        var d = await shikaraBookingModel.findOne({ _id: shikbookid, status: "Pending" }).populate("shikaraid").populate("location")/*.populate("startingLocation")/*.populate([{ path: "shikaraId", populate: { path: "vendorid", populate: { path: "userid" } } }])*/
        console.log(d)
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

//GET LOCATION NAME FROM ID
router.post('/location/name', async (req, res) => {
    try {
        var { locid, /* startlocid */ } = req.body;
        //console.log(req.body)
        if (Misc.isnullorempty(locid)) {
            res.status(200).json({
                status: false,
                msg: "Please provide locid"
            })
            return
        }
        // if (Misc.isnullorempty(startlocid)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: "Please provide startlocid"
        //     })
        //     return
        // }
        //var d = await subLocationModel.findOne({ _id: startlocid, status: "Active" }).populate("locationId")/*.populate([{ path: "shikaraId", populate: { path: "vendorid", populate: { path: "userid" } } }])*/
        var d = await locationModel.findOne({ _id: locid, status: "Active" })/*.populate("locationId")/*.populate([{ path: "shikaraId", populate: { path: "vendorid", populate: { path: "userid" } } }])*/

        // console.log(d)
        if (Misc.isnullorempty(d)) {
            res.status(200).json({
                status: true,
                msg: "NO DATA FOUND",
                data: d
                //sublocation: d,
                // location: e
            });
            return;
        }
        if (d.name) {
            var locationName = d.name
        }
        // if (d.name) {
        //     var sublocationName = d.name
        // }
        res.status(200).json({
            status: true,
            msg: "Location",
            data: locationName,
            //location: locationName,
            //sublocation:sublocationName
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

//VIEW SINGLE SHIKARA
router.post('/view/shikbook', async (req, res) => {
    try {
        var { shikbookid } = req.body;
        // console.log(req.body)
        if (Misc.isnullorempty(shikbookid)) {
            res.status(200).json({
                status: false,
                msg: "Please provide shikbookid"
            })
            return
        }
        var d = await shikaraBookingModel.findOne({ _id: shikbookid, status:{$in:["Active","Cancelled","Inactive"]} }).populate("shikaraid").populate("bookedbyid").populate([{ path: "shikaraid", populate: { path: "vendorid", populate: { path: "userid" } } }]).populate("location").populate([{ path: "shikaraid", populate: { path: "startingLocation" } }])
        // console.log(d)
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

//VIEW SINGLE SHIKARA
// router.post('/postpay/shikara', upload.fields([{ name: 'paymentReceipt', maxCount: 1 }]), async (req, res) => {
//     try {
//         var { shikbookid, balancePaymentMode } = req.body;
//         // console.log(req.body)
//         if (Misc.isnullorempty(shikbookid)) {
//             res.status(200).json({
//                 status: false,
//                 msg: "Please provide shikbookid"
//             })
//             return
//         }
//         if (!Misc.isnullorempty(req.files)) {
//             if (Misc.isnullorempty(req.files.paymentReceipt)) {
//                 res.status(200).json({
//                     status: false,
//                     msg: "Please upload payment receipt."
//                 });
//                 return;
//             }
//         }
//         var d = await shikaraBookingModel.findOne({ _id: shikbookid, status: "Active" }).populate("shikaraid")/*.populate([{ path: "shikaraId", populate: { path: "vendorid", populate: { path: "userid" } } }])*/
//         if (Misc.isnullorempty(d)) {
//             res.status(200).json({
//                 status: true,
//                 msg: "NO DATA FOUND",
//                 data: d
//             });
//             return;
//         }
//         d.balancePaymentMode = balancePaymentMode
//         if (!Misc.isnullorempty(req.files)) {
//             if (!Misc.isnullorempty(req.files.paymentReceipt)) {
//                 if (req.files.paymentReceipt.length > 0) {
//                     ispaymentReceipt = true
//                     d.paymentReceipt = req.files.paymentReceipt[0].key;
//                     // await data.save()
//                 }
//             }
//         }
//         await d.save();
//         res.status(200).json({
//             status: true,
//             msg: "Success",
//             data: d
//         })
//         return;
//     } catch (err) {
//         console.log(err)
//         res.status(500).json({
//             status: false,
//             msg: "Internal server error"
//         })
//     }

// })
router.post('/postpay/shikara', upload.fields([{ name: 'paymentReceipt', maxCount: 1 }]), async (req, res) => {
    try {
        var { shikbookid, balancePaymentMode } = req.body;
        // console.log(req.body)
        if (Misc.isnullorempty(shikbookid)) {
            res.status(200).json({
                status: false,
                msg: "Please provide shikbookid"
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
        var d = await shikaraBookingModel.findOne({ _id: shikbookid, status: "Active" }).populate("shikaraid")/*.populate([{ path: "shikaraId", populate: { path: "vendorid", populate: { path: "userid" } } }])*/
        if (Misc.isnullorempty(d)) {
            res.status(200).json({
                status: true,
                msg: "NO DATA FOUND",
                data: d
            });
            return;
        }
        console.log("postpay shikara", d)
        d.balancePaymentMode = balancePaymentMode;
        // d.balancepaymentStatus="Success";
        if (!Misc.isnullorempty(req.files)) {
            if (!Misc.isnullorempty(req.files.paymentReceipt)) {
                if (req.files.paymentReceipt.length > 0) {
                    ispaymentReceipt = true
                    d.paymentReceipt = req.files.paymentReceipt[0].key;
                    // await data.save()
                }
            }
        }
        d.balancepaymentStatus = "Success"
        await d.save()
        var dd = await shikaraBookingModel.findOne({ _id: shikbookid, status: "Active" }).populate("shikaraid")/*.populate([{ path: "shikaraId", populate: { path: "vendorid", populate: { path: "userid" } } }])*/

        console.log(dd, "d after")
        res.status(200).json({
            status: true,
            msg: "Success",
            data: dd
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
//VIEW ALL BOOKINGS
router.post('/view/allBookings', async (req, res) => {
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
        var d = await shikaraBookingModel.find({ status: "Active" }).sort({ created_at: -1 }).populate("bookedbyid").populate("shikaraid")/*.populate({ path: "categoryId", match: { status: "Active" } })*/.skip((pageNo - 1) * limit).limit(dataLimit)
        var totalLength = await shikaraBookingModel.countDocuments({ status: "Active" })
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
            totalBlogLength: totalLength,
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

//VIEW MY BOOKINGS
router.post('/my/allBookings', ifToken, async (req, res) => {
    try {
        var { page, limit, type, fromDate, toDate, status } = req.body;
        // console.log(req.body)
        var pageNo = 0, dataLimit = 0;
        if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
            page = parseInt(page);
            limit = parseInt(limit);
            if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        if (Misc.isnullorempty(type)) {
            res.status(200).json({
                status: false,
                msg: "Type is not provided."
            })
            return
        }
        var query1 = { status: "Active", bookedbyid: req.user.id, advancepaymentStatus: "Success" }
        var frm = null;
        if (!Misc.isnullorempty(fromDate)) {
            frm = new Date(fromDate);
            frm.setHours(0, 0, 0, 0);
            query1.selectedDate = { $gte: frm };

        }
        if (!Misc.isnullorempty(toDate)) {
            var todt = new Date(toDate);
            todt.setHours(24, 0, 0, 0);
            if (query1.selectedDate === undefined) {
                query1.selectedDate = { $lte: todt };
            } else {
                query1.selectedDate = { $gte: frm, $lte: todt };
            }
        }
        var currentDate = new Date();
        if (status) {
            if (status == "Active") {
                query1.bookedOn = { $lte: currentDate };
            }
            else if (status == "Inactive") {
                query1.bookedOn = { $gte: currentDate };
            }
            else if (status == "Cancelled") {
                query1.status = "Cancelled"
            }
        }
        if (type == "shikara") {
            var totalLength = await shikaraBookingModel.countDocuments(query1/* { status: "Active", bookedbyid: req.user.id, paymentStatus: "Success" } */)
            var d = await shikaraBookingModel.find(query1).sort({ created_at: -1 }).populate("bookedbyid").populate("shikaraid")/*.populate({ path: "categoryId", match: { status: "Active" } })*/.skip((pageNo - 1) * limit).limit(dataLimit)
        }
        else {
            var totalLength = await houseboatBookingModel.countDocuments({ status: "Active", addedBy: req.user.id, paymentStatus: "Success" })
            var d = await houseboatBookingModel.find({ status: "Active", addedBy: req.user.id, paymentStatus: "Success" }).sort({ created_at: -1 }).populate("bookedbyid").populate("shikaraid")/*.populate({ path: "categoryId", match: { status: "Active" } })*/.skip((pageNo - 1) * limit).limit(dataLimit)
        }
        //var arr[];
        //d = d.concat(dd)
        //console.log(d)

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
//customer view my  all bookings : HB & SK
router.post('/customer/my/allBookings', guestOrUser, async (req, res) => {
    try {
        var { page1, page2, limit1, limit2, type, cusid } = req.body;
        var userid;
        if (req.user) {
            userid = req.user.id;
        } else if (req.headers.guestid) {
            userid = req.headers.guestid;
        }
        var page1No = 0, dataLimit1 = 0, page2No = 0, dataLimit2 = 0;
        if (Misc.isnullorempty(page1)) {
            res.status(200).json({
                status: false,
                msg: "Please provide page"
            })
            return
        }
        if (Misc.isnullorempty(limit1)) {
            res.status(200).json({
                status: false,
                msg: "Please provide limit"
            })
            return
        }
        if ((!(Misc.isnullorempty(page1))) && (!(Misc.isnullorempty(limit1)))) {
            page1 = parseInt(page1);
            limit1 = parseInt(limit1);
            if ((typeof page1 === "number") && (typeof limit1 === "number") && (page1 > 0) && (limit1 > 0)) {
                page1No = page1;
                dataLimit1 = limit1;
            }
        }
        if (Misc.isnullorempty(page2)) {
            res.status(200).json({
                status: false,
                msg: "Please provide page"
            })
            return
        }
        if (Misc.isnullorempty(limit2)) {
            res.status(200).json({
                status: false,
                msg: "Please provide limit"
            })
            return
        }

        if ((!(Misc.isnullorempty(page2))) && (!(Misc.isnullorempty(limit2)))) {
            page2 = parseInt(page2);
            limit2 = parseInt(limit2);
            if ((typeof page2 === "number") && (typeof limit2 === "number") && (page2 > 0) && (limit2 > 0)) {
                page2No = page2;
                datalimit2 = limit2;
            }
        }
        if (Misc.isnullorempty(cusid)) {
            res.status(200).json({
                status: false,
                msg: "cusid is not provided."
            })
            return
        }
        var currentDate = new Date();
        // if (type == "shikara") {
        //     var totalLength = await shikaraBookingModel.countDocuments({ status: "Active", bookedbyid: cusid })
        //     var d = await shikaraBookingModel.find({ status: "Active", bookedbyid: cusid }).sort({ created_at: -1 }).populate("bookedbyid").populate("shikaraid")/*.populate({ path: "categoryId", match: { status: "Active" } }).skip((pageNo - 1) * limit).limit(dataLimit)*/
        // }
        // else {
        //     var totalLength = await houseboatBookingModel.countDocuments({ status: "Active", addedBy: req.user.id })
        //     var d = await houseboatBookingModel.find({ status: "Active", addedBy: cusid }).sort({ created_at: -1 }).populate("bookedbyid").populate("shikaraid")/*.populate({ path: "categoryId", match: { status: "Active" } }).skip((pageNo - 1) * limit).limit(dataLimit)*/
        // }
        //var arr[];
        //d = d.concat(dd)
        //console.log(d)
        // var totalLength = await houseboatBookingModel.countDocuments({ status: "Active", addedBy: req.user.id })

        const [shikbook, boatbook, shikbookexp, boatbookexp] = await Promise.all([
            shikaraBookingModel.find({ selectedDate: { $gte: currentDate }, status: "Active", bookedbyid: userid, advancepaymentStatus: "Success" , bookingType: "Customer"}).sort({ created_at: -1 }).populate("shikaraid"),
            houseboatBookingItemModel.find({ endDate: { $gte: currentDate }, status: "Active", userid: userid, paymentStatus: "Success", bookingType: "Customer" }).sort({ created_at: -1 }).populate("houseBoatId"),
            shikaraBookingModel.find({ selectedDate: { $lt: currentDate }, status: "Active", bookedbyid: userid, advancepaymentStatus: "Success", bookingType: "Customer" }).sort({ created_at: -1 }).populate("shikaraid"),
            houseboatBookingItemModel.find({ endDate: { $lt: currentDate }, status: "Active", userid: userid, paymentStatus: "Success", bookingType: "Customer" }).sort({ created_at: -1 }).populate("houseBoatId"),
        ])
        var combinedArray = [...shikbook, ...boatbook]
        combinedArray = getPaginatedData(combinedArray, page1, limit1)

        var combinedArray2 = [...shikbookexp, ...boatbookexp]
        combinedArray2 = getPaginatedData(combinedArray2, page1, limit1)



        if (Misc.isnullorempty(combinedArray) && Misc.isnullorempty(combinedArray2)) {
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
            current: combinedArray.data,
            currentLength: combinedArray.length,
            expired: combinedArray2.data,
            expiredLength: combinedArray2.length,
            limit1: limit1,
            page1: page1,
            // page2: page2,
            // limit2: limit2

        }
        )
        return;
    } catch (err) {
        console.log(err)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }

})
//AGENT DASHBOARD COUNTS
router.post('/counts/', ifToken, async (req, res) => {
    try {
        const [shikbook, boatbook, boat, shik, boatres, shikres] = await Promise.all([
            shikaraBookingModel.countDocuments({ status: "Active", bookedbyid: req.user.id, advancepaymentStatus: "Success" }),
            houseboatBookingItemModel.countDocuments({ status: "Active", userid: req.user.id, advancepaymentStatus: "Success" }),
            houseBoatModel.countDocuments({ status: "Active" }),
            shikaraModel.countDocuments({ status: "Active" }),
            houseboatBookingModel.countDocuments({ status: "Reserved", userid: req.user.id, advancepaymentStatus: "Success" }),
            shikaraBookingModel.countDocuments({ status: "Reserved", userid: req.user.id, advancepaymentStatus: "Success" })
        ])
        // console.log(req.user.id,"id")
        // console.log(shikbook,"shikbook")
        // console.log(shikbook,"shikbook")

        var totalBookings = shikbook + boatbook;
        // console.log("boatres",boatres)
        // console.log("shikres",shikres)
        var totalreservations = boatres + shikres
        res.status(200).json({
            status: true,
            msg: "Counts",
            totalBookings: totalBookings,
            totalHouseboats: boatbook,
            totalShikaras: shikbook,
            totalreservations: totalreservations,
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

//RECENT BOOKINGS
router.post('/recent/bookings', ifToken, async (req, res) => {
    try {
        const [shikara, houseboat] = await Promise.all([
            shikaraBookingModel.find({ status: "Active", bookedbyid: req.user.id }).sort({ created_at: - 1 }).limit(2),
            houseboatBookingModel.find({ status: "Active", userid: req.user.id }).sort({ created_at: - 1 }).limit(2)
        ])
        const combinedList = [...shikara, ...houseboat].sort((a, b) => b.created_at - a.created_at);
        res.status(200).json({
            status: true,
            msg: "Data",
            data: combinedList
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

router.get('/invoice/shikara/agent', async (req, res) => {
    try {
        const { id } = req.query;
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "Id not provided"
            })
            return
        }
        // var booking = await shikaraBookingModel.findOne({_id:id});
        var pdf = await ticketController.bookingTicketShikarapdf(id);
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

router.post('/list/blockdates/shikara', async (req, res) => {
    try {
        // const shikaraid = '657bf03738d41e4796f342cf'; // Replace with the actual shikaraid
        // const year = 2023; // Replace with the desired year
        // const month = 12;
        const { shikaraid, month, year } = req.body;
        var totalHours = 12
        const getminHours = await tripTypeModel.findOne({ shikaraId: shikaraid, status: "Active" });
        const minHours = getminHours.minimumHours;
        const result = await shikaraBookingModel.aggregate([
            {
                $match: {
                    status: "Active",
                    shikaraid: shikaraid/* mongoose.Types.ObjectId.createFromHexString()*/,
                    selectedDate: {
                        $gte: new Date(year, month - 1, 1), // Start of the month
                        $lt: new Date(year, month, 1) // Start of the next month
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$selectedDate' },
                        month: { $month: '$selectedDate' },
                        day: { $dayOfMonth: '$selectedDate' }
                    },
                    bookings: { $push: '$$ROOT' }
                }
            },
            {
                $project: {
                    _id: 0,
                    year: '$_id.year',
                    month: '$_id.month',
                    day: '$_id.day',
                    bookings: '$bookings'
                }
            },
            {
                $sort: {
                    year: 1,
                    month: 1,
                    day: 1
                }
            }
        ]);
        const reserve = await reservationModel.aggregate([
            {
                $match: {
                    status: "Active",
                    shikaraId: shikaraid/* mongoose.Types.ObjectId.createFromHexString()*/,
                    checkInDate: {
                        $gte: new Date(year, month - 1, 1),
                        $lt: new Date(year, month, 1)
                    }
                }
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$checkInDate' },
                        month: { $month: '$checkInDate' },
                        day: { $dayOfMonth: '$checkInDate' }
                    },
                    reservations: { $push: '$$ROOT' }
                }
            },
            // {
            //     $unwind: "$reservations" // Unwind the array after grouping
            // },
            {
                $project: {
                    _id: 0,
                    year: '$_id.year',
                    month: '$_id.month',
                    day: '$_id.day',
                    reservations: 1
                }
            },
            {
                $sort: {
                    year: 1,
                    month: 1,
                    day: 1
                }
            }
        ]);
        const combinedList = [...result, ...reserve];
        const resultWithTotalHours = combinedList.map(day => {
            const totalBookingHours = (day.bookings || []).reduce((acc, booking) => {
                if (booking.startTime && booking.endTime) {
                    const start = new Date(booking.startTime);
                    const end = new Date(booking.endTime);
                    const bookingHours = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
                    return acc + bookingHours;
                }
                return acc;
            }, 0);

            const totalReservationHours = (day.reservations || []).reduce((acc, reservation) => {
                if (reservation.startTime && reservation.endTime) {
                    const start = new Date(reservation.startTime);
                    const end = new Date(reservation.endTime);
                    const reservationHours = (end - start) / (1000 * 60 * 60); // Convert milliseconds to hours
                    return acc + reservationHours;
                }
                return acc;
            }, 0);

            const totalHours = totalBookingHours + totalReservationHours;

            return {
                ...day,
                totalHours
            };
        });

        // Combine the data with the same year, month, and day, and sum their totalHours
        const resultCombined = Object.values(resultWithTotalHours.reduce((acc, day) => {
            const key = `${day.year}-${day.month}-${day.day}`;
            if (!acc[key]) {
                acc[key] = { ...day };
            } else {
                acc[key].totalHours += day.totalHours;
            }
            return acc;
        }, {}));
        const resultWithFilteredHours = resultCombined.filter(day => ((day.totalHours >= totalHours) || (day.totalHours < minHours)));
        var arr = [];
        if (!Misc.isnullorempty(resultWithFilteredHours)) {
            for (var i = 0; i < resultWithFilteredHours.length; i++) {
                const formattedDate = `${resultWithFilteredHours[i].year}-${resultWithFilteredHours[i].month.toString().padStart(2, '0')}-${resultWithFilteredHours[i].day.toString().padStart(2, '0')}`;
                arr.push(formattedDate)
            }
        }
        res.status(200).json({
            status: true, msg: "result", data: arr
        })
        return
    } catch (e) {
        console.log(e)
        res.status(500).json({
            status: false,
            msg: "Internal server error"
        })
    }
})
module.exports = router;