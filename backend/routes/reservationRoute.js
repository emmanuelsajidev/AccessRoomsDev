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
const houseBoatModel = require("../models/houseBoatModel");
const tripTypeModel = require("../models/tripTypeModel");
const tripPackageModel = require("../models/tripPackageModel");
const houseboatBookingModel = require("../models/houseboatBookingModel");
const houseboatBookingItemModel = require("../models/houseboatBookingItemModel");
const reservationModel = require("../models/reservationModel");
const shikaraBookingModel = require("../models/shikaraBookingModel");
const shikaraModel = require("../models/shikaraModel");
const moment = require('moment');
// router.get('/rev',async(req,res)=>{
//     try{
//         let data=await reservationModel.updateMany({},{$set:{status:"Deleted"}});
//     }
//     catch(e){console.log(e)}
// }
// )

router.post('/agent/houseboat/paybalance', upload.fields([{ name: 'paymentReceipt', maxCount: 1 }]), async (req, res) => {
    try {
        var { bookingId, balancepaymentMode } = req.body;
        console.log(req.body)
        if (Misc.isnullorempty(bookingId)) {
            res.status(200).json({
                status: false,
                msg: "Please provide bookingId"
            })
            return
        }
        if (!Misc.isnullorempty(req.files)) {
            if (Misc.isnullorempty(req.files.paymentReceipt.length<0)) {
                res.status(200).json({
                    status: false,
                    msg: "Please upload payment receipt."
                });
                return;
            }
        }
        var d = await houseboatBookingItemModel.findOne({ _id: bookingId, status: "Active" }).populate("houseBoatId");
        if (Misc.isnullorempty(d)) {
            res.status(200).json({
                status: true,
                msg: "NO DATA FOUND",
                data: d
            });
            return;
        }
        var mainbookid = await houseboatBookingModel.findOne({ _id: d.houseboatBookId, status: "Active" });
        d.balancePaymentMode = balancepaymentMode;
        if (!Misc.isnullorempty(req.files)) {
            if (!Misc.isnullorempty(req.files.paymentReceipt)) {
                if (req.files.paymentReceipt.length > 0) {
                    ispaymentReceipt = true
                    d.paymentReceipt = req.files.paymentReceipt[0].key;
                    mainbookid.paymentReceipt = req.files.paymentReceipt[0].key;
                    // await data.save()
                }
            }
        }
        d.balancepaymentStatus = "Success";
        mainbookid.balancepaymentStatus = "Success";
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

async function generateUniqueId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let uniqueId = '';

    for (var i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        uniqueId += characters.charAt(randomIndex);
    }
    uniqueId = "KL_" + uniqueId
    return uniqueId;
}


//route for reservation no in houseboat
router.post(
    "/reservation/generatenumber",
    async (req, res) => {
        try {

            var reservation = await generateUniqueId(8);

            res.status(200).json({
                status: true,
                reservationNo: reservation,
                msg: "Success",
            });
            return;
        } catch (e) {
            console.log(e);
            res.status(500).json({
                status: false,
                msg: "Something went wrong",
            });
        }
    }
);
var generateDatesArray = (startDate, endDate) => {
    var datesArray = [];
    var currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        datesArray.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
};
//houseboat details
router.post('/reservation/blocked/dates', async (req, res) => {
    try {
        var { houseBoatId, tripType, month } = req.body;
        if (Misc.isnullorempty(houseBoatId)) {
            res.status(400).json({
                status: false,
                msg: "Please provide houseBoatId"
            });
            return;
        }
        var houseBoats = await houseBoatModel.findOne({ _id: houseBoatId ,status:"Active",houseBoatStatus:"Approved"});
        if (Misc.isnullorempty(houseBoats)) {
            res.status(200).json({
                status: false,
                msg: "Invalid house boat details."
            });
            return;
        }
        var mnth = month;
        if (Misc.isnullorempty(month)) {
            var today = new Date()
            var currentMonth = today.getMonth() + 1;
            var year = today.getFullYear();
            month = currentMonth + 1 + "-" + year
        } else {
            var dats = month.split('-')
            month = dats[1] + "-" + dats[0]
        }
        if (Misc.isnullorempty(tripType)) {
            tripType = "DayCruise"
        }
        if (tripType == "DayCruise") {
            var allResersvationsInDayCruise = await reservationModel.find({ houseBoatId: houseBoatId, reservationStatus: "Reserved", status: "Active", tripType: { $ne: "NightStay" } });
            var allBookingsInDayCruise = await houseboatBookingItemModel.find({ houseBoatId: houseBoatId, paymentStatus: "Success", status: "Active", tripType: { $in: ["DayCruise", "OverNight"] } });
            var reservedDates = await allResersvationsInDayCruise.map(x => x.reservedDates)
            var bookedDates = await allBookingsInDayCruise.map(x => x.bookedDates)
            var result = reservedDates.concat(bookedDates);
            result = [].concat(...result);
        } else if (tripType == "NightStay") {
            var allDates = getAllDatesInMonth(month);
            var allResersvationsInDayCruise = await reservationModel.find({ houseBoatId: houseBoatId, reservationStatus: "Reserved", status: "Active", tripType: { $in: ["DayCruise"] }, reservedDates: { $in: allDates } });
            var allBookingsInDayCruise = await houseboatBookingItemModel.find({ houseBoatId: houseBoatId, paymentStatus: "Success", status: "Active", tripType: { $in: ["DayCruise"] }, bookedDates: { $in: allDates } });
            var reservedDates = await allResersvationsInDayCruise.map(x => x.reservedDates)
            var bookedDates = await allBookingsInDayCruise.map(x => x.bookedDates)
            var result = reservedDates.concat(bookedDates);
            result = [].concat(...result);
            var allResersvationsInNightStay = await reservationModel.find({ houseBoatId: houseBoatId, reservationStatus: "Reserved", status: "Active", tripType: { $in: ["NightStay"] }, reservedDates: { $in: allDates } });
            var allBookingsInNightStay = await houseboatBookingItemModel.find({ houseBoatId: houseBoatId, paymentStatus: "Success", status: "Active", tripType: { $in: ["NightStay"] }, bookedDates: { $in: allDates } });
            var reservedDatesInNight = await allResersvationsInNightStay.map(x => x.reservedDates)
            var bookedDatesInNight = await allBookingsInNightStay.map(x => x.bookedDates)
            var allDa = bookedDatesInNight.concat(reservedDatesInNight);
            allDa = [].concat(...allDa);
            result = result.map(x => x.toString())
            var fnalResult = await allDates.filter(x => !result.includes(x));
            result = fnalResult.map(x => new Date(x))
            result = result.concat(allDa)
        } else {
            var allResersvationsInDayCruise = await reservationModel.find({ houseBoatId: houseBoatId, reservationStatus: "Reserved", status: "Active", tripType: { $in: ["NightStay", "OverNight", "DayCruise"] } });
            var allBookingsInDayCruise = await houseboatBookingItemModel.find({ houseBoatId: houseBoatId, paymentStatus: "Success", status: "Active", tripType: { $in: ["NightStay", "OverNight", "DayCruise"] } });
            var reservedDates = await allResersvationsInDayCruise.map(x => x.reservedDates)
            var bookedDates = await allBookingsInDayCruise.map(x => x.bookedDates)
            var result = reservedDates.concat(bookedDates);
            result = [].concat(...result);
        }
        result = result.map(x => x.toISOString().split('T')[0])
        res.status(200).json({
            status: true,
            data: result,
            tripType: tripType,
            msg: "Success",
        });
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: "Internal server error."
        });
        return;
    }
})

//blocked dates -in reservation edit 
router.post('/reservation/blocked/dates/edit', async (req, res) => {
    try {
        var { houseBoatId, tripType, month,reservationId } = req.body;
        if (Misc.isnullorempty(houseBoatId)) {
            res.status(400).json({
                status: false,
                msg: "Please provide houseBoatId"
            });
            return;
        }
        if (Misc.isnullorempty(reservationId)) {
            res.status(400).json({
                status: false,
                msg: "Please provide reservationId"
            });
            return;
        }
        var houseBoats = await houseBoatModel.findOne({ _id: houseBoatId ,status:"Active",houseBoatStatus:"Approved"});
        if (Misc.isnullorempty(houseBoats)) {
            res.status(200).json({
                status: false,
                msg: "Invalid house boat details."
            });
            return;
        }
        var mnth = month;
        if (Misc.isnullorempty(month)) {
            var today = new Date()
            var currentMonth = today.getMonth() + 1;
            var year = today.getFullYear();
            month = currentMonth + 1 + "-" + year
        } else {
            var dats = month.split('-')
            month = dats[1] + "-" + dats[0]
        }
        if (Misc.isnullorempty(tripType)) {
            tripType = "DayCruise"
        }
        if (tripType == "DayCruise") {
            var resrvedData=await reservationModel.findOne({ status:'Active',_id:reservationId});
            var rDates=resrvedData.reservedDates;
            var allResersvationsInDayCruise = await reservationModel.find({ houseBoatId: houseBoatId, reservationStatus: "Reserved", status: "Active", tripType: { $ne: "NightStay" } });
            var allBookingsInDayCruise = await houseboatBookingItemModel.find({ houseBoatId: houseBoatId, paymentStatus: "Success", status: "Active", tripType: { $in: ["DayCruise", "OverNight"] } });
            var reservedDates = await allResersvationsInDayCruise.map(x => x.reservedDates)
            var bookedDates = await allBookingsInDayCruise.map(x => x.bookedDates)
            var result = reservedDates.concat(bookedDates);
            result = [].concat(...result);
            for(var i=0;i<rDates.length;i++){
                result = result.filter(x => x.toString() != rDates[i].toString())
            }
        } else if (tripType == "NightStay") {
            var allDates = getAllDatesInMonth(month);
            var resrvedData=await reservationModel.findOne({ status:'Active',_id:reservationId});
            var rDates=resrvedData.reservedDates;
            var allResersvationsInDayCruise = await reservationModel.find({ houseBoatId: houseBoatId, reservationStatus: "Reserved", status: "Active", tripType: { $in: ["DayCruise"] }, reservedDates: { $in: allDates } });
            var allBookingsInDayCruise = await houseboatBookingItemModel.find({ houseBoatId: houseBoatId, paymentStatus: "Success", status: "Active", tripType: { $in: ["DayCruise"] }, bookedDates: { $in: allDates } });
            var reservedDates = await allResersvationsInDayCruise.map(x => x.reservedDates)
            var bookedDates = await allBookingsInDayCruise.map(x => x.bookedDates)
            var result = reservedDates.concat(bookedDates); 
            result = [].concat(...result);
            var allResersvationsInNightStay = await reservationModel.find({ houseBoatId: houseBoatId, reservationStatus: "Reserved", status: "Active", tripType: { $in: ["NightStay"] }, reservedDates: { $in: allDates } });
            var allBookingsInNightStay = await houseboatBookingItemModel.find({ houseBoatId: houseBoatId, paymentStatus: "Success", status: "Active", tripType: { $in: ["NightStay"] }, bookedDates: { $in: allDates } });
            var reservedDatesInNight = await allResersvationsInNightStay.map(x => x.reservedDates)
            var bookedDatesInNight = await allBookingsInNightStay.map(x => x.bookedDates)
            var allDa = bookedDatesInNight.concat(reservedDatesInNight);
            allDa = [].concat(...allDa);
            result = result.map(x => x.toString())
            var fnalResult = await allDates.filter(x => !result.includes(x));
            result = fnalResult.map(x => new Date(x))
            result = result.concat(allDa)
            for(var i=0;i<rDates.length;i++){
                result = result.filter(x => x.toString() != rDates[i].toString())
            }
        } else {
            var resrvedData=await reservationModel.findOne({ status:'Active',_id:reservationId});
            var rDates=resrvedData.reservedDates;
            var allResersvationsInDayCruise = await reservationModel.find({ houseBoatId: houseBoatId, reservationStatus: "Reserved", status: "Active", tripType: { $in: ["NightStay", "OverNight", "DayCruise"] } });
            var allBookingsInDayCruise = await houseboatBookingItemModel.find({ houseBoatId: houseBoatId, paymentStatus: "Success", status: "Active", tripType: { $in: ["NightStay", "OverNight", "DayCruise"] } });
            var reservedDates = await allResersvationsInDayCruise.map(x => x.reservedDates)
            var bookedDates = await allBookingsInDayCruise.map(x => x.bookedDates)
            var result = reservedDates.concat(bookedDates);
            result = [].concat(...result);
            for(var i=0;i<rDates.length;i++){
                result = result.filter(x => x.toString() != rDates[i].toString())
            }
        }
        result = result.map(x => x.toISOString().split('T')[0])
        res.status(200).json({
            status: true,
            data: result,
            tripType: tripType,
            msg: "Success",
        });
        return;
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            msg: "Internal server error."
        });
        return;
    }
})
function getAllDatesInMonth(input) {
    const [month, year] = input.split('-').map(Number);
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const datesArray = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
        const dateWithoutTime = new Date(d);
        dateWithoutTime.setHours(5, 30, 0, 0);
        datesArray.push(dateWithoutTime.toString());
    }

    return datesArray;
}

function filterDuplicatesFromArray(arr1, arr2) {
    const combinedArray = arr1.concat(arr2);
    const uniqueItems = new Set(combinedArray);

    return Array.from(uniqueItems);
}

function getNext200Days() {
    const today = new Date();
    const daysArray = [];

    for (let i = 0; i < 200; i++) {
        const nextDate = new Date(today);
        nextDate.setDate(today.getDate() + i);
        nextDate.setHours(5, 30, 0, 0);
        daysArray.push(nextDate.toString());
    }

    return daysArray;
}
router.post('/reservation/houseboat', vendorAuth, async (req, res) => {
    try {
        var { houseBoatId, selectedDate, tripType, houseBoatType, category, totalRooms, totalGuests, rate, extraPersonRate, bookingMode, agentName, guestName, guestPhoneNumber, advancePayment, totalPayableAmount, balancePayedBy, reservationNo,balanceAmount } = req.body;
       // console.log(selectedDate)
        if (Misc.isnullorempty(houseBoatId)) {
            res.status(200).json({
                status: false,
                msg: "Please provide houseBoatId"
            })
            return
        }
        if (Misc.isnullorempty(tripType)) {
            res.status(200).json({
                status: false,
                msg: "Please provide tripType"
            })
            return
        }
        //check selected is an array  and length greater than 0
        if (!Array.isArray(selectedDate) || selectedDate.length === 0) {
            res.status(200).json({
                status: false,
                msg: "Please provide Dates"
            })
            return
        }
        var mongooseDates = selectedDate.map(date => moment(date, 'DD-MM-YYYY').format('YYYY-MM-DD'));
        var formattedDates = mongooseDates.map(x => new Date(x));

        if (Misc.isnullorempty(reservationNo)) {
            res.status(200).json({
                status: false,
                msg: "Please provide reservationNo"
            })
            return
        }
        var checkhouseboat = await houseBoatModel.findOne({ _id: houseBoatId, houseBoatStatus: "Approved", status: "Active" });
        if (Misc.isnullorempty(checkhouseboat)) {
            res.status(200).json({
                status: false,
                msg: "Houseboat not found"
            })
            return;
        }
        if (!Misc.isnullorempty(totalRooms)) {
            totalRooms = parseInt(totalRooms)
            if (totalRooms > checkhouseboat.totalRooms) {
                res.status(200).json({
                    status: false,
                    msg: "Room not available"
                })
                return;
            }
        }
        var checktrip=await tripTypeModel.findOne({ tripType: tripType, status: "Active" ,houseBoatId:checkhouseboat._id});
        if (Misc.isnullorempty(checktrip)) {
            res.status(200).json({
                status: false,
                msg: tripType + "  trip details is not added for this houseboat"
            })
            return;
        }
        //check thishouseboat is already reserved in same date
        var checkreservation = await reservationModel.findOne({ houseBoatId: checkhouseboat._id, tripType: tripType, selectedDate: formattedDates, status: "Active", reservationStatus: "Reserved" });
        if (!Misc.isnullorempty(checkreservation)) {
            res.status(200).json({
                status: false,
                msg: "Houseboat already reserved in this date"
            })
            return;
        }

            if(tripType=="OverNight" || tripType=="NightStay"){
                var lastDate = formattedDates[formattedDates.length - 1];
                var checkoutDate = new Date(lastDate);
                checkoutDate.setDate(lastDate.getDate() + 1);
                // console.log(checkoutDate, "checkoutDate")
            }
            if(tripType=="DayCruise"){
                var lastDate = formattedDates[formattedDates.length - 1];
                var checkoutDate = new Date(lastDate);
            }

            var checkindateCopy=formattedDates[0];
            var dateObject = new Date(checkindateCopy);
            var cIndatecopy = dateObject.toISOString().split('T')[0];
            var cOutdatecopy=checkoutDate.toISOString().split('T')[0];


        var reservation = new reservationModel(
            {

                houseBoatId: checkhouseboat._id,
                houseboatName:checkhouseboat.houseBoatName,
                selectedDate: formattedDates,
                checkInDate: formattedDates[0],
                checkOutDate: checkoutDate,
                checkInDateCopy: cIndatecopy,
                checkOutDateCopy:cOutdatecopy,
                tripType: tripType,
                houseBoatType: houseBoatType,
                category: category,
                totalRooms: totalRooms,
                totalGuests: totalGuests,
                rate: rate,
                extraPersonRate: extraPersonRate,
                bookingMode: bookingMode,
                agentName: agentName,
                guestName: guestName,
                guestPhoneNumber: guestPhoneNumber,
                advancePayment: advancePayment,
                totalPayableAmount: totalPayableAmount,
                balanceAmount:balanceAmount,
                balancePayedBy: balancePayedBy,
                reservationDate: new Date(),
                reservationNo: reservationNo,
                addedBy: req.user.id,
                reservedDates: formattedDates
            })
        await reservation.save()
        res.status(200).json({
            status: true,
            data: reservation,
            msg: "Reservation completed successfully",
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

//get all reservation for houseboats

router.get('/reservation/all/houseboat', vendorAuth, async (req, res) => {
    try {
        var { page, limit,fromDate,toDate,keyword  } = req.query;
        var query={ status: "Active", addedBy:new mongoose.Types.ObjectId(req.user.id), houseBoatId: { $ne: null }, reservationStatus: "Reserved" };
        var query1={};
        if (keyword) {
            query1["houseBoatId.houseBoatName"] = { $regex: keyword, $options: "i" };
        }
        var pageNo = 1, dataLimit = 20;
        if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
            page = parseInt(page);
            limit = parseInt(limit);
            if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        // var data = await reservationModel.find({ status: "Active", addedBy: req.user.id, houseBoatId: { $ne: null }, reservationStatus: "Reserved" })
        //     .populate({
        //         path: 'houseBoatId',
        //         populate: [
        //             { path: 'location' },
        //             { path: 'startingLocation' }
        //         ]
        //     }).sort({ created_at: -1 }).skip((pageNo - 1) * limit).limit(dataLimit);
        var frm = null;
        if (!Misc.isnullorempty(fromDate)) {
          frm = new Date(fromDate);
          frm.setHours(0, 0, 0, 0);
          query.checkInDate = { $gte: frm };
         
        }
        if (!Misc.isnullorempty(toDate)) {
          var todt = new Date(toDate);
          todt.setHours(24, 0, 0, 0);
          if (query.checkOutDate === undefined) {
            query.checkOutDate = { $lte: todt };
          } else {
            query.checkOutDate = { $gte: frm, $lte: todt };
          }
        }
        var data = await reservationModel.aggregate([
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
            // {
            //   $lookup: {
            //     from: "usermodels",
            //     localField: "userid",
            //     foreignField: "_id",
            //     as: "userid",
            //   },
            // },
            // {
            //   $unwind: { path: "$userid", preserveNullAndEmptyArrays: true },
            // },
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
        //var totalLength = await reservationModel.countDocuments({ status: "Active",addedBy: req.user.id, houseBoatId: { $ne: null }, reservationStatus: "Reserved" });
        var totalLength = await reservationModel.aggregate([
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
            data: data,
            totalLength: totalLength.length,
            limit: limit,
            page: page,
            msg: "Success",
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
router.get('/admin/reservation/all/houseboat', adminAuth, async (req, res) => {
    try {
        var { page, limit,fromDate,toDate,keyword } = req.query;
        var query={ status: "Active", houseBoatId: { $ne: null }, reservationStatus: "Reserved" }
        var query1={};
        if (keyword) {
            query1["houseBoatId.houseBoatName"] = { $regex: keyword, $options: "i" };
        }
        var pageNo = 1, dataLimit = 10;
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
        var frm = null;
        if (!Misc.isnullorempty(fromDate)) {
          frm = new Date(fromDate);
          frm.setHours(0, 0, 0, 0);
          query.checkInDate = { $gte: frm };
         
        }
        if (!Misc.isnullorempty(toDate)) {
          var todt = new Date(toDate);
          todt.setHours(24, 0, 0, 0);
          if (query.checkOutDate === undefined) {
            query.checkOutDate = { $lte: todt };
          } else {
            query.checkOutDate = { $gte: frm, $lte: todt };
          }
        }
        var data = await reservationModel.aggregate([
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
            // {
            //   $lookup: {
            //     from: "usermodels",
            //     localField: "userid",
            //     foreignField: "_id",
            //     as: "userid",
            //   },
            // },
            // {
            //   $unwind: { path: "$userid", preserveNullAndEmptyArrays: true },
            // },
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

       // var totalLength = await reservationModel.countDocuments({ status: "Active", houseBoatId: { $ne: null }, reservationStatus: "Reserved" });
       var totalLength = await reservationModel.aggregate([
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
        $unwind: { path: "$houseBoatId.startingLocation", preserveNullAndEmptyArrays: true },
       },
    //     {
    //       $lookup: {
    //           from: "locationmodels", // Adjust this based on your actual sublocation model name
    //           localField: "houseBoatId.location",
    //           foreignField: "_id",
    //           as: "houseBoatId.location",
    //       },
    //   },
    //    {
    //       $unwind: { path: "$houseBoatId.location", preserveNullAndEmptyArrays: true },
    //     },
        
      ]);
        res.status(200).json({
            status: true,
            data: data,
            totalLength: totalLength.length,
            page: pageNo,
            limit: dataLimit,
            msg: "Success",
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
//single reservation view
router.post("/reservation/houseboat/view", vendorAuth, async (req, res) => {
    try {
        var { id } = req.body

        var reservedata = await reservationModel.findOne({ _id: id, status: "Active" }).populate("houseBoatId");
        if (Misc.isnullorempty(reservedata)) {
            res.status(200).json({
                status: false,
                msg: "Data not found",
            });
            return;
        }
        res.status(200).json({
            status: true,
            data: reservedata,
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
//reservation/houseboat/edit
router.post('/reservation/houseboat/edit/old', vendorAuth, async (req, res) => {
    try {

        var { id, houseBoatId, selectedDate, tripType, houseBoatType, category, totalRooms, totalGuests, rate, extraPersonRate, bookingMode, agentName, guestName, guestPhoneNumber, advancePayment, totalPayableAmount, balancePayedBy } = req.body;
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "Please provide id",
            })
            return;
        }
        var reservation = await reservationModel.findOne({ _id: id, status: "Active" });
        if (Misc.isnullorempty(reservation)) {
            res.status(200).json({
                status: false,
                msg: "Data not found",
            })
            return;
        }
        if (totalRooms <= 0 || totalGuests <= 0) {
            res.status(200).json({
                status: false,
                msg: "Total rooms and total guests must be greater than 0.",
            });
            return;
        }
        if (selectedDate) {
            reservation.selectedDate = selectedDate;
            reservation.checkInDate = selectedDate[0];
            reservation.checkOutDate = selectedDate[1];
            reservation.checkInDateCopy = selectedDate[0];
            reservation.checkOutDateCopy = selectedDate[1];
        }
        if (tripType) {
            reservation.tripType = tripType;
        }
        if (houseBoatType) {
            reservation.houseBoatType = houseBoatType;
        }
        if (category) {
            reservation.category = category;
        }
        if (totalRooms) {
            reservation.totalRooms = totalRooms;
        }

        if (totalGuests) {
            reservation.totalGuests = totalGuests;
        }
        if (rate) {
            reservation.rate = rate;
        }
        if (extraPersonRate) {
            reservation.extraPersonRate = extraPersonRate;
        }
        if (bookingMode) {
            reservation.bookingMode = bookingMode;
        }
        if (agentName) {
            reservation.agentName = agentName;
        }
        if (guestName) {
            reservation.guestName = guestName;
        }
        if (guestPhoneNumber) {
            reservation.guestPhoneNumber = guestPhoneNumber;
        }
        if (advancePayment) {
            reservation.advancePayment = advancePayment;
        }
        if (totalPayableAmount) {
            reservation.totalPayableAmount = totalPayableAmount;
        }
        if (balancePayedBy) {
            reservation.balancePayedBy = balancePayedBy;
        }
        if (selectedDate.length <= 0) {
            res.status(200).json({
                status: false,
                msg: "Invalid dates seleted."
            });
        }
        if (selectedDate.length > 1) {
            var fromDate = selectedDate[0];
            var toDate = selectedDate[1];
        } else if (selectedDate.length == 1) {
            var fromDate = selectedDate[0];
            var toDate = selectedDate[0];
        }
        var includedDates = await getDatesIncluded(fromDate, toDate)
        if (includedDates.length <= 0) {
            res.status(200).json({
                status: false,
                msg: "Invalid dates selection,Try Again....."
            });
            return;
        }
        if (tripType != "DayCruise") {
            if (includedDates.length > 1) {
                //includedDates.pop();
            }
        }
        reservation.reservedDates = includedDates;
        await reservation.save()
        res.status(200).json({
            status: true,
            data: reservation,
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

router.post('/reservation/houseboat/edit', vendorAuth, async (req, res) => {
    try {

        var { id, houseBoatId, selectedDate, tripType, houseBoatType, category, totalRooms, totalGuests, rate, extraPersonRate, bookingMode, agentName, guestName, guestPhoneNumber, advancePayment, totalPayableAmount, balancePayedBy,balanceAmount } = req.body;
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "Please provide id",
            })
            return;
        }
        var reservation = await reservationModel.findOne({ _id: id, status: "Active" });
        if (Misc.isnullorempty(reservation)) {
            res.status(200).json({
                status: false,
                msg: "Data not found",
            })
            return;
        }
        if (!Array.isArray(selectedDate) || selectedDate.length === 0) {
            res.status(200).json({
                status: false,
                msg: "Please provide Dates"
            })
            return
        }
        if (totalRooms <= 0 || totalGuests <= 0) {
            res.status(200).json({
                status: false,
                msg: "Total rooms and total guests must be greater than 0.",
            });
            return;
        }
        var checkhouseboat = await houseBoatModel.findOne({ _id: reservation.houseBoatId, houseBoatStatus: "Approved", status: "Active" });
        if (Misc.isnullorempty(checkhouseboat)) {
            res.status(200).json({
                status: false,
                msg: "Houseboat not found"
            })
            return;
        }
        if (!Misc.isnullorempty(totalRooms)) {
            totalRooms = parseInt(totalRooms)
            if (totalRooms > checkhouseboat.totalRooms) {
                res.status(200).json({
                    status: false,
                    msg: "Room not available"
                })
                return;
            }
        }
        // if(tripType=="OverNight"){
        //    var checkreservation=await reservationModel.findOne({ houseBoatId: checkhouseboat._id, selectedDate: selectedDate, status: "Active", reservationStatus: "Reserved" });
        //    if(!Misc.isnullorempty(checkreservation)){
        //     res.status(200).json({
        //         status: false,
        //         msg: "Houseboat already reserved in this date"
        //     })
        //     return;
        //    }
        // }
        // if(tripType=="DayCruise"){
        //     var checkreservation=await reservationModel.findOne({ houseBoatId: checkhouseboat._id,tripType:"OverNight" ,selectedDate: selectedDate, status: "Active", reservationStatus: "Reserved" });
        //     if(!Misc.isnullorempty(checkreservation)){
        //      res.status(200).json({
        //          status: false,
        //          msg: "Houseboat already reserved in  daycruise"
        //      })
        //      return;
        //     }
        //  }
        var checktrip=await tripTypeModel.findOne({ tripType: reservation.tripType, status: "Active" ,houseBoatId:checkhouseboat._id});
        if (Misc.isnullorempty(checktrip)) {
            res.status(200).json({
                status: false,
                msg: "Trip is not added for this houseboat"
            })
            return;
        }
         //var checkpackage=await tripPackageModel.findOne({  status: "Active" ,houseBoatId:checkhouseboat._id,tripTypeId:checktrip._id,/*startDate:{$lte:reservation.reservedDates[reservation.reservedDates.length-1]}*/});
        
         var normalCount=checktrip.maxPersonPerRooms*checkhouseboat.totalRooms;
        if(tripType=="OverNight" || tripType=="NightStay"){
            if (totalGuests > normalCount) {
                res.status(200).json({
                    status: false,
                    msg: "Guests count should be less than or equal to " + normalCount
                })
                return;
            }
        }
        if(tripType=="DayCruise"){
            if (totalGuests > checktrip.maxCapacityOfBoats) {
                res.status(200).json({
                    status: false,
                    msg: "Guests count should be less than or equal to " + checktrip.maxCapacityOfBoats
                })
                return;
            }
        }
        if(tripType=="OverNight" || tripType=="NightStay"){
            var lastDate = selectedDate[selectedDate.length - 1];
            var lastDateObject = new Date(lastDate);
            var checkoutDate = new Date(lastDateObject);
            checkoutDate.setDate(lastDateObject.getDate() + 1);
        }
        if(tripType=="DayCruise"){
            var lastDate = selectedDate[selectedDate.length - 1];
            var checkoutDate = new Date(lastDate);
        }

        var checkindateCopy=selectedDate[0];
        var dateObject = new Date(checkindateCopy);
        var cIndatecopy = dateObject.toISOString().split('T')[0];
        var cOutdatecopy=checkoutDate.toISOString().split('T')[0];

        if (tripType) {
            reservation.tripType = tripType;
        }
        if (houseBoatType) {
            reservation.houseBoatType = houseBoatType;
        }
        if (category) {
            reservation.category = category;
        }
        if (totalRooms) {
            reservation.totalRooms = totalRooms;
        }

        if (totalGuests) {
            reservation.totalGuests = totalGuests;
        }
        if (rate) {
            reservation.rate = rate;
        }
        if (extraPersonRate) {
            reservation.extraPersonRate = extraPersonRate;
        }
        if (bookingMode) {
            reservation.bookingMode = bookingMode;
        }
        if (agentName) {
            reservation.agentName = agentName;
        }
        if (guestName) {
            reservation.guestName = guestName;
        }
        if (guestPhoneNumber) {
            reservation.guestPhoneNumber = guestPhoneNumber;
        }
        if (advancePayment) {
            reservation.advancePayment = advancePayment;
        }
        if (totalPayableAmount) {
            reservation.totalPayableAmount = totalPayableAmount;
        }
        if (balancePayedBy) {
            reservation.balancePayedBy = balancePayedBy;
        }
        if (balanceAmount) {
            reservation.balanceAmount = balanceAmount;
        }
        reservation.selectedDate = selectedDate;
        reservation.checkInDate = new Date(cIndatecopy);
        reservation.checkOutDate = new Date(cOutdatecopy);
        reservation.checkInDateCopy = cIndatecopy;
        reservation.checkOutDateCopy = cOutdatecopy;
        reservation.reservedDates = selectedDate;
        await reservation.save()
        res.status(200).json({
            status: true,
            data: reservation,
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
//reservation cancellation
router.get("/reservation/houseboat/cancel", vendorAuth, async (req, res) => {
    try {
        var { id } = req.query;
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "Id is required",
            });
            return;
        }
        var data = await reservationModel.findOne({ _id: id, status: "Active" });
        if (Misc.isnullorempty(data)) {
            res.status(200).json({
                status: false,
                msg: "data not found",
            });
            return;
        }

        data.reservationStatus = "Cancelled";
        await data.save();
        res.status(200).json({
            status: true,
            msg: "Reservation Cancelled ",
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
router.get("/reservation/houseboat/cancelled/getlist", vendorAuth, async (req, res) => {
    try {
        var { page, limit,fromDate,toDate,keyword } = req.query;
        var pageNo = 1, dataLimit = 20;
        if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
            page = parseInt(page);
            limit = parseInt(limit);
            if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        var query = {
            status: "Active", addedBy: new mongoose.Types.ObjectId(req.user.id), houseBoatId: { $ne: null },
            reservationStatus: "Cancelled"
        };
        var query1={};
        if (keyword) {
            query1["houseBoatId.houseBoatName"] = { $regex: keyword, $options: "i" };
        }
        var frm = null;
        if (!Misc.isnullorempty(fromDate)) {
          frm = new Date(fromDate);
          frm.setHours(0, 0, 0, 0);
          query.checkInDate = { $gte: frm };
         
        }
        if (!Misc.isnullorempty(toDate)) {
          var todt = new Date(toDate);
          todt.setHours(24, 0, 0, 0);
          if (query.checkOutDate === undefined) {
            query.checkOutDate = { $lte: todt };
          } else {
            query.checkOutDate = { $gte: frm, $lte: todt };
          }
        }
        // var data = await reservationModel.find(query).populate({
        //     path: 'houseBoatId',
        //     populate: [
        //         { path: 'location' },
        //         { path: 'startingLocation' }
        //     ]
        // }).sort({ created_at: -1 }).skip((pageNo - 1) * limit).limit(dataLimit);
        var data = await reservationModel.aggregate([
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
            // {
            //   $lookup: {
            //     from: "usermodels",
            //     localField: "userid",
            //     foreignField: "_id",
            //     as: "userid",
            //   },
            // },
            // {
            //   $unwind: { path: "$userid", preserveNullAndEmptyArrays: true },
            // },
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
        var totalLength = await reservationModel.countDocuments(query);
        res.status(200).json({
            status: true,
            data: data,
            totalLength: totalLength,
            limit: limit,
            page: page,
            msg: "Success"

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
router.get("/admin/reservation/houseboat/cancel", adminAuth, async (req, res) => {
    try {
        var { id } = req.query;
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "Id is required",
            });
            return;
        }
        var data = await reservationModel.findOne({ _id: id, status: "Active" });
        if (Misc.isnullorempty(data)) {
            res.status(200).json({
                status: false,
                msg: "data not found",
            });
            return;
        }

        data.reservationStatus = "Cancelled";
        data.addedBy=req.user.id;
        await data.save();
        res.status(200).json({
            status: true,
            msg: "Reservation Cancelled ",
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
router.get("/admin/reservation/houseboat/cancelled/getlist", adminAuth, async (req, res) => {
    try {
        var { page, limit ,fromDate,toDate,keyword} = req.query;
        var pageNo = 1, dataLimit = 20;
        if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
            page = parseInt(page);
            limit = parseInt(limit);
            if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        var query = {
            status: "Active", houseBoatId: { $ne: null },
            reservationStatus: "Cancelled"
        };
        var query1={};
        if (keyword) {
            query1["houseBoatId.houseBoatName"] = { $regex: keyword, $options: "i" };
        }
        var frm = null;
        if (!Misc.isnullorempty(fromDate)) {
          frm = new Date(fromDate);
          frm.setHours(0, 0, 0, 0);
          query.checkInDate = { $gte: frm };
         
        }
        if (!Misc.isnullorempty(toDate)) {
          var todt = new Date(toDate);
          todt.setHours(24, 0, 0, 0);
          if (query.checkOutDate === undefined) {
            query.checkOutDate = { $lte: todt };
          } else {
            query.checkOutDate = { $gte: frm, $lte: todt };
          }
        }
        var data = await reservationModel.aggregate([
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
            // {
            //   $lookup: {
            //     from: "usermodels",
            //     localField: "userid",
            //     foreignField: "_id",
            //     as: "userid",
            //   },
            // },
            // {
            //   $unwind: { path: "$userid", preserveNullAndEmptyArrays: true },
            // },
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
       // var totalLength = await reservationModel.countDocuments(query);
       var totalLength = await reservationModel.aggregate([
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
       
        {$sort:{created_at:-1}},
      ]);
        res.status(200).json({
            status: true,
            data: data,
            totalLength: totalLength.length,
            limit: limit,
            page: page,
            msg: "Success"

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

///////////////////////////////////    SHIKARA  RESERVATION ROUTES   //////////////////////////////

router.post('/reservation/blocked/shikara/dates/old', async (req, res) => {
    try {

        var { shikaraId } = req.body;

        if (!shikaraId) {
            res.status(400).json({
                status: false,
                msg: "Please provide shikaraId"
            });
            return;
        }
        var bookingDates = await shikaraBookingModel.find({
            shikaraid: shikaraId,
            paymentStatus: "Success",
            status: "Active"
        });

        var blockedDatesArray = await reservationModel.find({
            shikaraId: shikaraId,
            reservationStatus: "Reserved",
            status: "Active"
        });

        var allDates = [];

        bookingDates.forEach((booking) => {
            var startDate = new Date(booking.startTime);
            var endDate = new Date(booking.endTime);

            var datesArray = generateDatesArray(startDate, endDate);
            allDates.push(...datesArray);
            console.log(datesArray, "date");
        });

        // blockedDatesArray.forEach((reservation) => {
        //   var startDate = new Date(reservation.checkInDate);
        //   var endDate = new Date(reservation.checkOutDate);

        //   var datesArray = generateDatesArray(startDate, endDate);
        //   allDates.push(...datesArray);
        //   console.log(datesArray,"date2");
        // });


        blockedDatesArray.forEach((reservation) => {
            var startDate = new Date(reservation.checkInDate);
            var endDate = new Date(reservation.checkOutDate);

            var datesArray = generateDatesArray(startDate, endDate);
            allDates.push(...datesArray);
        });

        // Remove duplicates from the combined dates
        var uniqueDates = [...new Set(allDates)];
        if (uniqueDates.length > 0) {
            for (var i = 0; i < uniqueDates.length; i++) {
                uniqueDates[i] = uniqueDates[i].toISOString().split('T')[0]
            }
        }
        var d = ["2023-12-19",
            "2023-12-20",
            "2023-12-21",
            "2023-12-28",
            "2023-12-29"]
        res.status(200).json({
            status: true,
            data: d,
            msg: "Success",
        });
        return;
    } catch (error) {
        console.error("Error fetching dates:", error);
        throw error;
    }
});
router.post('/reservation/blocked/shikara/dates', async (req, res) => {
    try {
        // const shikaraid = '657bf03738d41e4796f342cf'; // Replace with the actual shikaraid
        // const year = 2023; // Replace with the desired year
        // const month = 12;
        var { shikaraid, month, year, chooseDate } = req.body;
        console.log(req.body)
        // if (chooseDate) {
            chooseDate = chooseDate.split("-")
            month = chooseDate[1];
            year = chooseDate[0];
       // }

        var totalHours = 12
        const getminHours = await tripTypeModel.findOne({ shikaraId: shikaraid, status: "Active" });
        const minHours = getminHours.minimumHours;
        const result = await shikaraBookingModel.aggregate([
            {
                $match: {
                    status: "Active",
                    shikaraid: shikaraid/* mongoose.Types.ObjectId.createFromHexString()*/,
                    selectedDate: {
                        $gte: new Date(year, month, 1), // Start of the month
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
                        $gte: new Date(year, month, 1),
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
router.post('/reservation/shikara', vendorAuth, async (req, res) => {
    try {
        var { shikaraId, selectedDate, startTime, endTime, totalGuests, rate, bookingMode, agentName, guestName, guestPhoneNumber, advancePayment, totalPayableAmount, balancePayedBy, reservationNo ,balanceAmount} = req.body;
        console.log(req.body)
        if (Misc.isnullorempty(shikaraId)) {
            res.status(200).json({
                status: false,
                msg: "Please provide shikaraId"
            })
            return
        }
        if (!Array.isArray(selectedDate) || selectedDate.length === 0) {
            res.status(200).json({
                status: false,
                msg: "Please provide Dates"
            })
            return
        }
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
        if (Misc.isnullorempty(reservationNo)) {
            res.status(200).json({
                status: false,
                msg: "Please provide reservationNo"
            })
            return
        }
        if (parseInt(totalGuests <= 0)) {
            res.status(200).json({
                status: false,
                msg: "Please provide totalGuests"
            })
            return
        }
        var checkshikara = await shikaraModel.findOne({ _id: shikaraId, shikaraStatus: "Approved", status: "Active" });
        if (Misc.isnullorempty(checkshikara)) {
            res.status(200).json({
                status: false,
                msg: "shikara not found"
            })
            return;
        }
        // var checktrip=await tripTypeModel.findOne({shikaraId:checkshikara._id,status:"Active"});
        // if(!Misc.isnullorempty(checktrip)){
        //     res.status(200).json({
        //         status: false,
        //         msg: "shikara  trip not found"
        //     })
        //     return ;
        // }
        // if(parseInt(totalGuests)>checktrip.maxCapacityOfBoats){
        //     res.status(200).json({
        //         status: false,
        //         msg: "shikara capacity exceeded"
        //     })
        //     return ;
        // }
        //check if shikara already reserved
        var checkexist = await reservationModel.findOne({
            shikaraId: checkshikara._id,
            checkInDate: { $gte: new Date(selectedDate[0]) },
            checkOutDate: { $lte: new Date(selectedDate[1]) }, startTime: { $gte: startTime }, endTime: { $lte: endTime },
            status: "Active", reservationStatus: "Reserved"
        })
        if (!Misc.isnullorempty(checkexist)) {
            res.status(200).json({
                status: false,
                msg: "Shikara already reserved for this date"
            })
            return;
        }
        var start_time = new Date(startTime);
        console.log("startTime before convertion",start_time)
        var end_time = new Date(endTime);

        // Extract the time parts and format them as HH:mm
        const hours = start_time.getHours().toString().padStart(2, '0');
        const minutes = start_time.getMinutes().toString().padStart(2, '0');
        const startTimeCopy = `${hours}:${minutes}`;
        console.log("startTime after convertion",startTimeCopy)
        
        console.log("endTime before convertion",end_time)

        
        // var startTimeCopy = `${start_time.getHours()}:${start_time.getMinutes()}`;
        const hourss = end_time.getHours().toString().padStart(2, '0');
        const minutess = end_time.getMinutes().toString().padStart(2, '0');
        const endTimeCopy = `${hourss}:${minutess}`;
        console.log("endTime after convertion",endTimeCopy)

        // var endTimeCopy = `${end_time.getHours()}:${end_time.getMinutes()}`;


        var reservation = new reservationModel(
            {
                shikaraId: checkshikara._id,
                shikaraName: checkshikara.shikaraName,
                selectedDate: selectedDate,
                startTime: new Date(startTime),//startTime,
                endTime: new Date(endTime),//endTime,
                checkInDate: new Date(selectedDate[0]),
                checkOutDate: new Date(selectedDate[1]),//selectedDate[1],
                checkInDateCopy: selectedDate[0],
                checkOutDateCopy: selectedDate[1],
                startTimeCopy: startTimeCopy,
                endTimeCopy: endTimeCopy,
                totalGuests: totalGuests,
                rate: rate,
                bookingMode: bookingMode,
                agentName: agentName,
                guestName: guestName,
                guestPhoneNumber: guestPhoneNumber,
                advancePayment: advancePayment,
                totalPayableAmount: totalPayableAmount,
                balanceAmount:balanceAmount,
                balancePayedBy: balancePayedBy,
                reservationDate: new Date(),
                reservationNo: reservationNo,
                addedBy: req.user.id
            })
        await reservation.save()
        res.status(200).json({
            status: true,
            data: reservation,
            msg: "Reservation completed successfully",
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
router.get('/reservation/all/shikara', vendorAuth, async (req, res) => {
    try {
        var { page, limit,fromDate,toDate,keyword } = req.query;
        var pageNo = 1, dataLimit = 20;
        if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
            page = parseInt(page);
            limit = parseInt(limit);
            if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        var query1={status: "Active", addedBy:new mongoose.Types.ObjectId (req.user.id), shikaraId: { $ne: null }, reservationStatus: "Reserved"}
        var query2={};
        if (keyword) {
            query2["shikaraId.shikaraName"] = { $regex: keyword, $options: "i" };
        }
        var frm = null;
        if (!Misc.isnullorempty(fromDate)) {
          frm = new Date(fromDate);
          frm.setHours(0, 0, 0, 0);
          query1.checkInDate = { $gte: frm };
         
        }
        if (!Misc.isnullorempty(toDate)) {
          var todt = new Date(toDate);
          todt.setHours(24, 0, 0, 0);
          if (query1.checkInDate === undefined) {
            query1.checkInDate = { $lte: todt };
          } else {
            query1.checkInDate = { $gte: frm, $lte: todt };
          }
        }
        var data = await reservationModel.aggregate([
            { $match: query1 },
            {
              $lookup: {
                from: "shikaramodels",
                localField: "shikaraId",
                foreignField: "_id",
                as: "shikaraId",
              },
            },
            {$match:query2},
            {
              $unwind: { path: "$shikaraId", preserveNullAndEmptyArrays: true },
    
            },
            {
              $lookup: {
                  from: "sublocationmodels", // Adjust this based on your actual sublocation model name
                  localField: "shikaraId.startingLocation",
                  foreignField: "_id",
                  as: "shikaraId.startingLocation",
              },
           },
           {
            $unwind: { path: "$shikaraId.startingLocation", preserveNullAndEmptyArrays: true },
  
          },
            {
              $lookup: {
                  from: "locationmodels", // Adjust this based on your actual sublocation model name
                  localField: "shikaraId.location",
                  foreignField: "_id",
                  as: "shikaraId.location",
              },
          },
          {
            $unwind: { path: "$shikaraId.location", preserveNullAndEmptyArrays: true },
  
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
            {$sort:{created_at:-1}},
            { $skip: (pageNo - 1) * dataLimit },
            { $limit: dataLimit },
          ]);

       // var totalLength = await reservationModel.countDocuments({ status: "Active", shikaraId: { $ne: null },addedBy:new mongoose.Types.ObjectId (req.user.id), reservationStatus: "Reserved" });
       var totalLength = await reservationModel.aggregate([
        { $match: query1 },
        {
          $lookup: {
            from: "shikaramodels",
            localField: "shikaraId",
            foreignField: "_id",
            as: "shikaraId",
          },
        },
        {$match:query2},
        {
          $unwind: { path: "$shikaraId", preserveNullAndEmptyArrays: true },

        },
        
      ]);
       res.status(200).json({
            status: true,
            data: data,
            totalLength: totalLength.length,
            limit: limit,
            page: page,
            msg: "Success",
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
router.get('/admin/reservation/all/shikara', adminAuth, async (req, res) => {
    try {
        var { page, limit,keyword,fromDate,toDate } = req.query;
        var pageNo = 1, dataLimit = 20;
        if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
            page = parseInt(page);
            limit = parseInt(limit);
            if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        var query1={status: "Active", shikaraId: { $ne: null }, reservationStatus: "Reserved"}
        var query2={};
        if (keyword) {
            query2["shikaraId.shikaraName"] = { $regex: keyword, $options: "i" };
        }
        var frm = null;
        if (!Misc.isnullorempty(fromDate)) {
          frm = new Date(fromDate);
          frm.setHours(0, 0, 0, 0);
          query1.checkInDate = { $gte: frm };
         
        }
        if (!Misc.isnullorempty(toDate)) {
          var todt = new Date(toDate);
          todt.setHours(24, 0, 0, 0);
          if (query1.checkOutDate === undefined) {
            query1.checkOutDate = { $lte: todt };
          } else {
            query1.checkOutDate = { $gte: frm, $lte: todt };
          }
        }
        var data = await reservationModel.aggregate([
            { $match: query1 },
            {
              $lookup: {
                from: "shikaramodels",
                localField: "shikaraId",
                foreignField: "_id",
                as: "shikaraId",
              },
            },
            {
              $unwind: { path: "$shikaraId", preserveNullAndEmptyArrays: true },
    
            },
            { $match: query2 },
            {
              $lookup: {
                  from: "sublocationmodels", // Adjust this based on your actual sublocation model name
                  localField: "shikaraId.startingLocation",
                  foreignField: "_id",
                  as: "shikaraId.startingLocation",
              },
           },
           {
            $unwind: { path: "$shikaraId.startingLocation", preserveNullAndEmptyArrays: true },
  
          },
            {
              $lookup: {
                  from: "locationmodels", // Adjust this based on your actual sublocation model name
                  localField: "shikaraId.location",
                  foreignField: "_id",
                  as: "shikaraId.location",
              },
          },
          {
            $unwind: { path: "$shikaraId.location", preserveNullAndEmptyArrays: true },
  
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
            {$sort:{created_at:-1}},
            { $skip: (pageNo - 1) * dataLimit },
            { $limit: dataLimit },
          ]);

       // var totalLength = await reservationModel.countDocuments({ status: "Active", shikaraId: { $ne: null }, reservationStatus: "Reserved" });
       var totalLength = await reservationModel.aggregate([
        { $match: query1 },
        {
          $lookup: {
            from: "shikaramodels",
            localField: "shikaraId",
            foreignField: "_id",
            as: "shikaraId",
          },
        },
        {
          $unwind: { path: "$shikaraId", preserveNullAndEmptyArrays: true },

        },
        { $match: query2 },
       
      ]);
       res.status(200).json({
            status: true,
            data: data,
            totalLength: totalLength.length,
            limit: limit,
            page: page,
            msg: "Success",
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
router.post("/reservation/shikara/view",/*vendorAuth,*/ async (req, res) => {
    try {
        var { id } = req.body

        var reservedata = await reservationModel.findOne({ _id: id, status: "Active" }).populate("shikaraId");

        console.log(reservedata, "rese")
        if (Misc.isnullorempty(reservedata)) {
            res.status(200).json({
                status: false,
                msg: "Data not found",
            });
            return;
        }
        res.status(200).json({
            status: true,
            data: reservedata,
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
});
router.get("/reservation/shikara/cancel", vendorAuth, async (req, res) => {
    try {
        var { id } = req.query;
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "Id is required",
            });
            return;
        }
        var data = await reservationModel.findOne({ _id: id, status: "Active" });
        if (Misc.isnullorempty(data)) {
            res.status(200).json({
                status: false,
                msg: "data not found",
            });
            return;
        }

        data.reservationStatus = "Cancelled";
        await data.save();
        res.status(200).json({
            status: true,
            msg: "Reservation Cancelled ",
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
router.get("/admin/reservation/shikara/cancel", adminAuth, async (req, res) => {
    try {
        var { id } = req.query;
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "Id is required",
            });
            return;
        }
        var data = await reservationModel.findOne({ _id: id, status: "Active" });
        if (Misc.isnullorempty(data)) {
            res.status(200).json({
                status: false,
                msg: "data not found",
            });
            return;
        }

        data.reservationStatus = "Cancelled";
        data.addedBy = req.user.id;
        await data.save();
        res.status(200).json({
            status: true,
            msg: "Reservation Cancelled ",
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
router.get("/reservation/shikara/cancelled/getlist", vendorAuth, async (req, res) => {
    try {
        var { page, limit, keyword,fromDate,toDate } = req.query;
        var pageNo = 1, dataLimit = 20;
        if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
            page = parseInt(page);
            limit = parseInt(limit);
            if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        var query = {
            status: "Active", addedBy:new mongoose.Types.ObjectId(req.user.id), shikaraId: { $ne: null },
            reservationStatus: "Cancelled"
        };
        var query2={};
        if (keyword) {
            query2["shikaraId.shikaraName"] = { $regex: keyword, $options: "i" };
        }

        var frm = null;
        if (!Misc.isnullorempty(fromDate)) {
          frm = new Date(fromDate);
          frm.setHours(0, 0, 0, 0);
          query2.checkInDate = { $gte: frm };
         
        }
        if (!Misc.isnullorempty(toDate)) {
          var todt = new Date(toDate);
          todt.setHours(24, 0, 0, 0);
          if (query2.checkOutDate === undefined) {
            query2.checkOutDate = { $lte: todt };
          } else {
            query2.checkOutDate = { $gte: frm, $lte: todt };
          }
        }
        // var data = await reservationModel.find(query).populate({
        //     path: 'shikaraId',
        //     populate: [
        //         { path: 'location' },
        //         { path: 'startingLocation' }
        //     ]
        // }).sort({ created_at: -1 }).skip((pageNo - 1) * limit).limit(dataLimit);
        var data = await reservationModel.aggregate([
            { $match: query },
            {
              $lookup: {
                from: "shikaramodels",
                localField: "shikaraId",
                foreignField: "_id",
                as: "shikaraId",
              },
            },
            {
              $unwind: { path: "$shikaraId", preserveNullAndEmptyArrays: true },
    
            },
            { $match: query2 },
            {
              $lookup: {
                  from: "sublocationmodels", // Adjust this based on your actual sublocation model name
                  localField: "shikaraId.startingLocation",
                  foreignField: "_id",
                  as: "shikaraId.startingLocation",
              },
           },
           {
            $unwind: { path: "$shikaraId.startingLocation", preserveNullAndEmptyArrays: true },
  
          },
            {
              $lookup: {
                  from: "locationmodels", // Adjust this based on your actual sublocation model name
                  localField: "shikaraId.location",
                  foreignField: "_id",
                  as: "shikaraId.location",
              },
          },
          {
            $unwind: { path: "$shikaraId.location", preserveNullAndEmptyArrays: true },
  
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
            {$sort:{created_at:-1}},
            { $skip: (pageNo - 1) * dataLimit },
            { $limit: dataLimit },
          ]);
        var totalLength = await reservationModel.countDocuments(query);
        res.status(200).json({
            status: true,
            data: data,
            totalLength: totalLength,
            limit: limit,
            page: page,
            msg: "Success"

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
router.get("/admin/reservation/shikara/cancelled/getlist", adminAuth, async (req, res) => {
    try {
        var { page, limit ,keyword,fromDate,toDate} = req.query;
        var pageNo = 1, dataLimit = 20;
        if ((!(Misc.isnullorempty(page))) && (!(Misc.isnullorempty(limit)))) {
            page = parseInt(page);
            limit = parseInt(limit);
            if ((typeof page === "number") && (typeof limit === "number") && (page > 0) && (limit > 0)) {
                pageNo = page;
                dataLimit = limit;
            }
        }
        var query = {
            status: "Active", shikaraId: { $ne: null },
            reservationStatus: "Cancelled"
        };
        var query1={};
        if (keyword) {
            query1["shikaraId.shikaraName"] = { $regex: keyword, $options: "i" };
        }
        var frm = null;
        if (!Misc.isnullorempty(fromDate)) {
          frm = new Date(fromDate);
          frm.setHours(0, 0, 0, 0);
          query.checkInDate = { $gte: frm };
         
        }
        if (!Misc.isnullorempty(toDate)) {
          var todt = new Date(toDate);
          todt.setHours(24, 0, 0, 0);
          if (query.checkOutDate === undefined) {
            query.checkOutDate = { $lte: todt };
          } else {
            query.checkOutDate = { $gte: frm, $lte: todt };
          }
        }
        // var data = await reservationModel.find(query).populate({
        //     path: 'shikaraId',
        //     populate: [
        //         { path: 'location' },
        //         { path: 'startingLocation' }
        //     ]
        // }).sort({ created_at: -1 }).skip((pageNo - 1) * limit).limit(dataLimit);
        var data = await reservationModel.aggregate([
            { $match: query },
            {
              $lookup: {
                from: "shikaramodels",
                localField: "shikaraId",
                foreignField: "_id",
                as: "shikaraId",
              },
            },
            {
              $unwind: { path: "$shikaraId", preserveNullAndEmptyArrays: true },
    
            },
            { $match: query1 },
            {
              $lookup: {
                  from: "sublocationmodels", // Adjust this based on your actual sublocation model name
                  localField: "shikaraId.startingLocation",
                  foreignField: "_id",
                  as: "shikaraId.startingLocation",
              },
           },
           {
            $unwind: { path: "$shikaraId.startingLocation", preserveNullAndEmptyArrays: true },
  
          },
            {
              $lookup: {
                  from: "locationmodels", // Adjust this based on your actual sublocation model name
                  localField: "shikaraId.location",
                  foreignField: "_id",
                  as: "shikaraId.location",
              },
          },
          {
            $unwind: { path: "$shikaraId.location", preserveNullAndEmptyArrays: true },
  
          },
            // {
            //   $lookup: {
            //     from: "usermodels",
            //     localField: "vendorName",
            //     foreignField: "_id",
            //     as: "vendorName",
            //   },
            // },
            // {
            //   $unwind: { path: "$vendorName", preserveNullAndEmptyArrays: true },
            // },
            {$sort:{created_at:-1}},
            { $skip: (pageNo - 1) * dataLimit },
            { $limit: dataLimit },
          ]);
      //  var totalLength = await reservationModel.countDocuments(query);
      var totalLength = await reservationModel.aggregate([
        { $match: query },
        {
          $lookup: {
            from: "shikaramodels",
            localField: "shikaraId",
            foreignField: "_id",
            as: "shikaraId",
          },
        },
        {
          $unwind: { path: "$shikaraId", preserveNullAndEmptyArrays: true },

        },
        { $match: query1 },
        
      ]);
        res.status(200).json({
            status: true,
            data: data,
            totalLength: totalLength.length,
            limit: limit,
            page: page,
            msg: "Success"

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
router.post('/reservation/shikara/edit', vendorAuth, async (req, res) => {
    try {
        var { id, shikaraId, selectedDate, startTime, endTime, totalGuests, rate, bookingMode, agentName, guestName, guestPhoneNumber, advancePayment, totalPayableAmount, balancePayedBy,balanceAmount } = req.body;
       // console.log(req.body);
        if (Misc.isnullorempty(id)) {
            res.status(200).json({
                status: false,
                msg: "Id is required",
            });
            return;
        }
        var reservation = await reservationModel.findOne({ _id: id, status: "Active" });
        if (Misc.isnullorempty(reservation)) {
            res.status(200).json({
                status: false,
                msg: "Data not found",
            })
            return;
        }
        if (parseInt(totalGuests) <= 0) {
            res.status(200).json({
                status: false,
                msg: "total guests must be greater than 0.",
            });
            return;
        }

        if (selectedDate) {
            reservation.selectedDate = selectedDate;
            reservation.checkInDate = selectedDate[0];
            reservation.checkOutDate = selectedDate[1];
            reservation.checkInDateCopy = selectedDate[0];
            reservation.checkOutDateCopy = selectedDate[1];
        }
        if (startTime) {
            var start_time = new Date(startTime);
            // console.log("startTimestamp",start_time)
            reservation.startTime = start_time;
            // var start_time = new Date(startTime);
            // var end_time = new Date(endTime);
    
            // Extract the time parts and format them as HH:mm
            const hours = start_time.getHours().toString().padStart(2, '0');
            const minutes = start_time.getMinutes().toString().padStart(2, '0');
            const startTimeCopy = `${hours}:${minutes}`;
            console.log("startTimeCopy",startTimeCopy)
            ////////////////
            // var startTimeCopy = `${start_time.getHours()}:${start_time.getMinutes()}`;
            // console.log(startTimeCopy)
            reservation.startTimeCopy = startTimeCopy;
        }
        if (endTime) {
            // console.log("endTime",endTime)
            reservation.endTime = new Date(endTime);
            // console.log("endTimestamp",reservation.endTime)
            var end_time = new Date(endTime);
            // var startTimeCopy = `${start_time.getHours()}:${start_time.getMinutes()}`;
            const hourss = end_time.getHours().toString().padStart(2, '0');
            const minutess = end_time.getMinutes().toString().padStart(2, '0');
            const endTimeCopy = `${hourss}:${minutess}`;
            // console.log("endTimeCopy",endTimeCopy)
    
            // var endTimeCopy = `${end_time.getHours()}:${end_time.getMinutes()}`;
            reservation.endTimeCopy = endTimeCopy;
        }

        if (totalGuests) {
            reservation.totalGuests = totalGuests;
        }
        if (rate) {
            reservation.rate = rate;
        }
        if (bookingMode) {
            reservation.bookingMode = bookingMode;
        }
        if (agentName) {
            reservation.agentName = agentName;
        }
        if (guestName) {
            reservation.guestName = guestName;
        }
        if (guestPhoneNumber) {
            reservation.guestPhoneNumber = guestPhoneNumber;
        }
        if (advancePayment) {
            reservation.advancePayment = advancePayment;
        }
        if (totalPayableAmount) {
            reservation.totalPayableAmount = totalPayableAmount;
        }
        if (balancePayedBy) {
            reservation.balancePayedBy = balancePayedBy;
        }
        if (balanceAmount) {
            reservation.balanceAmount = balanceAmount;
        }
        await reservation.save()
        res.status(200).json({
            status: true,
            data: reservation,
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


module.exports = router;