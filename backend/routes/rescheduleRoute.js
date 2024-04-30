const express = require("express");
const router = express();
const mongoose = require("mongoose");

const Misc = require("../controllers/Misc");
const RateController = require("../controllers/rateHelper");

const ifToken = require("../middleware/ifToken");
const adminAuth = require("../middleware/adminAuth");
const guestOrUser = require("../middleware/guestOrUser");

const houseBoatModel = require("../models/houseBoatModel");
const tripPackageModel = require("../models/tripPackageModel");
const houseboatBookingModel = require("../models/houseboatBookingModel");
const tripTypeModel = require("../models/tripTypeModel");
const houseboatBookingItemModel = require("../models/houseboatBookingItemModel");
const rescheduleModel = require("../models/rescheduleModel");
const reservationModel = require("../models/reservationModel");
const rescheduleRateController = require("../controllers/rescheduleRate");
const customerrescheduleRateHelper = require("../controllers/customerRescheduleRateHelper");
const moment = require("moment");
const DateTime = require("../controllers/dateTime");
const shikaraBookingModel = require("../models/shikaraBookingModel");
const shikaraModel = require("../models/shikaraModel");

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
//individual view of booking in reschedule page
router.post("/reschedule/houseboatbooking/details", async (req, res) => {
  try {
    var { bookingId } = req.body;
    if (Misc.isnullorempty(bookingId)) {
      res.status(200).json({
        status: false,
        msg: "Please provide bookingId",
      });
      return;
    }
    var d = await houseboatBookingItemModel
      .findOne({ _id: bookingId, status: "Active" })
      .populate({
        path: "houseBoatId",
        populate: { path: "startingLocation" },
      });
    res.status(200).json({
      status: true,
      msg: "Success",
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
//Admin reschedule ticket
router.post("/reschedule/houseboat", ifToken, async (req, res) => {
  try {
    var { id, startDate, endDate } = req.body;
    // var today = new Date();
    // var eightDaysAhead = new Date(today);
    // eightDaysAhead.setDate(today.getDate() + 8); //8 Days ahead
    // console.log(eightDaysAhead);
    // var includedDates = await getDatesFiltered(startDate, endDate);
    // if (includedDates[0] > eightDaysAhead) {
    //   //Checking for the check in date is in between 8 days
    //   console.log("In 8 Days"); //If out side 8 days error shoud be generated
    //   res.status(200).json({
    //     status: false,
    //     msg: "Cannot reschedule as it is outside 8 days",
    //   });
    //   return;
    // }
    if (Misc.isnullorempty(startDate) || Misc.isnullorempty(endDate)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Date.",
      });
      return;
    }
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Invalid  booking id.",
      });
      return;
    }
    var hb = await houseboatBookingItemModel
      .findOne({ _id: id, status: "Active", paymentStatus: "Success" })
      .populate("houseBoatId");
    if (Misc.isnullorempty(hb)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    //check the date
    var eightDaysBeforeStartDate = new Date(hb.startDate);
    eightDaysBeforeStartDate.setDate(hb.startDate.getDate() - 8);
    var reschedulingDate = new Date();
    if (eightDaysBeforeStartDate <= reschedulingDate) {
      res.status(200).json({
        status: false,
        msg: "Rescheduling is only allowed up to 8 days before the start date of the booking",
      });
      return;
    }
    if (!Misc.isnullorempty(hb)) {
      if (hb.isReschedule == true) {
        res.status(200).json({
          status: false,
          msg: "Already rescheduled",
        });
        return;
      }
    }

    var checkmainhb = await houseboatBookingModel.findOne({
      _id: hb.houseboatBookId,
      status: "Active",
    });
    var houseboat = await houseBoatModel.findOne({
      _id: hb.houseBoatId._id,
      status: "Active",
    });

    var selectedDate = [];
    selectedDate.push(startDate, endDate);
    var mongooseDates = selectedDate.map((date) =>
      moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    var formattedDates = mongooseDates.map((x) => new Date(x));

    var includedDates = await getDatesIncluded(
      formattedDates[0],
      formattedDates[1]
    );
    if (includedDates.length <= 0) {
      res.status(200).json({
        status: false,
        msg: "Invalid dates selection,Try Again.....",
      });
      return;
    }
    if (includedDates[0] == new Date(selectedDate[1])) {
      res.status(200).json({
        status: false,
        msg: "Please select valid date",
      });
      return;
    }
    var checktrip = await tripTypeModel.findOne({
      tripType: hb.tripType,
      houseBoatId: hb.houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checktrip)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Trip Type",
      });
      return;
    }

    //check this date includes any packages or not
    var checkPackage = await tripPackageModel.find({
      tripTypeId: checktrip._id,
      houseBoatId: hb.houseBoatId,
      status: "Active",
      startDate: { $lte: formattedDates[0] },
      endDate: { $gte: formattedDates[0] },
      packageType: { $in: ["Seasonal", "OffSeasonal","Special"] },
    });
    if (checkPackage.length <= 0) {
      res.status(200).json({
        status: false,
        msg: "Cant' reschedule as this date includes no packages",
      });
      return;
    }
    var reschedule = new rescheduleModel();

    reschedule.addedBy = req.user.id;
    reschedule.bookingId = id;
    reschedule.houseBoatId = hb.houseBoatId;
    reschedule.mainBookId = hb.houseboatBookId;
    reschedule.startDate = formattedDates[0];
    //reschedule.endDate = formattedDates[1];
    reschedule.rescheduleDates = includedDates;
    reschedule.newTotalAmount = hb.totalAmount;
    reschedule.newBalanceAmount = hb.balancePayAmount;
    reschedule.amountpaid = hb.advanceAmountPaid;
    reschedule.isAdminUpdated = false;
    reschedule.rescheduleDate = Date.now();
    reschedule.status = "Active";
    await reschedule.save();

    //update in hbItemmodel and hb booking model
    hb.startDate = formattedDates[0];
    //  hb.endDate=formattedDates[1];
    checkmainhb.startDate = formattedDates[0];
    checkmainhb.bookedDates = includedDates;
    hb.bookedDates = includedDates;
    hb.isReschedule = true;
    await hb.save();
    await checkmainhb.save();

    var tripType = hb.tripType;

    if (tripType === "OverNight" || tripType === "NightStay") {
      // Check if startDate and endDate are the same
      if (startDate === endDate) {
        // If same, set endDate to startDate + 1 day
        var nextDay = moment(startDate, "DD-MM-YYYY")
          .add(1, "days")
          .format("YYYY-MM-DD");
        reschedule.endDate = nextDay;
        hb.endDate = nextDay;
        checkmainhb.endDate = nextDay;
        await reschedule.save();
        await hb.save();
        await checkmainhb.save();
      }
    } else {
      reschedule.endDate = formattedDates[1];
      hb.endDate = formattedDates[1];
      checkmainhb.endDate = formattedDates[1];
      await reschedule.save();
      await hb.save();
      await checkmainhb.save();
    }
    if (req.user.user.role == "Agent") {
      console.log("agent entering");
      if (hb.houseBoatType == "Private") {
        if (tripType == "DayCruise") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "DayCruise",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate = await rescheduleRateController.CalculateDayCruisRate(
            houseboat,
            dayTrip,
            includedDates,
            hb.noOfAdults
          );
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              console.log(checkmainhb, "balance");
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "OverNight") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "OverNight",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate =
            await rescheduleRateController.CalculateOverNightStayRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "NightStay") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "NightStay",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate = await rescheduleRateController.CalculateNightStayRate(
            houseboat,
            dayTrip,
            includedDates,
            hb.noOfAdults
          );
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
      } else if (hb.houseBoatType == "Sharing") {
        if (tripType == "DayCruise") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "DayCruise",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate = await rescheduleRateController.CalculateDayCruisRate(
            houseboat,
            dayTrip,
            includedDates,
            hb.noOfAdults
          );
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "OverNight") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "OverNight",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate =
            await rescheduleRateController.CalculateOverNightStayRateSharing(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "NightStay") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "NightStay",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate =
            await rescheduleRateController.CalculateNightStayRateSharing(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
      }
    } else if (req.user.user.role == "Customer") {
      if (hb.houseBoatType == "Private") {
        if (tripType == "DayCruise") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "DayCruise",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate =
            await customerrescheduleRateHelper.CalculateDayCruisRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          if (getRate.status == true) {
            hb.customerRate = getRate.rate;
            console.log(hb.customerRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "OverNight") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "OverNight",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate =
            await customerrescheduleRateHelper.CalculateOverNightStayRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          if (getRate.status == true) {
            hb.customerRate = getRate.rate;
            console.log(hb.customerRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "NightStay") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "NightStay",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate =
            await customerrescheduleRateHelper.CalculateNightStayRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          if (getRate.status == true) {
            hb.customerRate = getRate.rate;
            console.log(hb.customerRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
      } else if (hb.houseBoatType == "Sharing") {
        if (tripType == "DayCruise") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "DayCruise",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate = await rescheduleRateController.CalculateDayCruisRate(
            houseboat,
            dayTrip,
            includedDates,
            hb.noOfAdults
          );
          if (getRate.status == true) {
            hb.customerRate = getRate.rate;
            console.log(hb.customerRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "OverNight") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "OverNight",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate =
            await customerrescheduleRateHelper.CalculateOverNightStayRateSharing(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          if (getRate.status == true) {
            hb.customerRate = getRate.rate;
            console.log(hb.customerRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "NightStay") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "NightStay",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          var getRate =
            await customerrescheduleRateHelper.CalculateNightStayRateSharing(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          if (getRate.status == true) {
            hb.customerRate = getRate.rate;
            console.log(hb.customerRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
      }
    }
    res.status(200).json({
      status: true,
      reschedule: reschedule,
      msg: "Successfully rescheduled.",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "Something went wrong!",
    });
  }
});

function getAllDatesInMonth(input) {
  const [month, year] = input.split("-").map(Number);
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
router.post("/reschedule/houseboat/getdates", async (req, res) => {
  try {
    var { month, bookingId } = req.body;
    console.log(req.body);
    if (Misc.isnullorempty(bookingId)) {
      res.status(400).json({
        status: false,
        msg: "Please provide bookingId",
      });
      return;
    }
    var HBbooking = await houseboatBookingItemModel
      .findOne({ _id: bookingId, status: "Active" /*paymentStatus:"Success"*/ })
      .populate("houseBoatId");
    if (Misc.isnullorempty(HBbooking)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    // var houseBoats = await houseBoatModel.findOne({ _id:HBbooking.houseBoatId ,status:"Active",houseBoatStatus:"Approved"});
    // if (Misc.isnullorempty(houseBoats)) {
    //     res.status(200).json({
    //         status: false,
    //         msg: "Invalid house boat details."
    //     });
    //     return;
    // }
    var houseBoats = await houseBoatModel.findOne({
      _id: HBbooking.houseBoatId,
      status: "Active",
    });
    if (!Misc.isnullorempty(houseBoats)) {
      //check houseboat status
      if (houseBoats.houseBoatStatus != "Approved") {
        res.status(200).json({
          status: false,
          msg: "Cannot reschedule. Houseboat is not approved.",
        });
        return;
      }
    } else {
      res.status(200).json({
        status: false,
        msg: "Invalid house boat details.",
      });
      return;
    }

    var mnth = month;
    if (Misc.isnullorempty(month)) {
      var today = new Date();
      var currentMonth = today.getMonth() + 1;
      var year = today.getFullYear();
      month = currentMonth + 1 + "-" + year;
    } else {
      var dats = month.split("-");
      month = dats[1] + "-" + dats[0];
    }
    var tripType = HBbooking.tripType;
    // if (Misc.isnullorempty(tripType)) {
    //     tripType = "DayCruise"
    // }
    if (tripType == "DayCruise") {
      var bookedData = await houseboatBookingItemModel.findOne({
        status: "Active",
        _id: bookingId,
      });
      var HBDates = bookedData.bookedDates;
      var allResersvationsInDayCruise = await reservationModel.find({
        houseBoatId: HBbooking.houseBoatId,
        reservationStatus: "Reserved",
        status: "Active",
        tripType: { $ne: "NightStay" },
      });
      var allBookingsInDayCruise = await houseboatBookingItemModel.find({
        houseBoatId: HBbooking.houseBoatId,
        paymentStatus: "Success",
        status: "Active",
        tripType: { $in: ["DayCruise", "OverNight"] },
      });
      var reservedDates = await allResersvationsInDayCruise.map(
        (x) => x.reservedDates
      );
      var bookedDates = await allBookingsInDayCruise.map((x) => x.bookedDates);
      var result = reservedDates.concat(bookedDates);
      result = [].concat(...result);
      for (var i = 0; i < HBDates.length; i++) {
        result = result.filter((x) => x.toString() != HBDates[i].toString());
      }
    } else if (tripType == "NightStay") {
      var allDates = getAllDatesInMonth(month);
      var bookedData = await houseboatBookingItemModel.findOne({
        status: "Active",
        _id: bookingId,
      });
      var HBDates = bookedData.bookedDates;
      var allResersvationsInDayCruise = await reservationModel.find({
        houseBoatId: HBbooking.houseBoatId,
        reservationStatus: "Reserved",
        status: "Active",
        tripType: { $in: ["DayCruise"] },
        reservedDates: { $in: allDates },
      });
      var allBookingsInDayCruise = await houseboatBookingItemModel.find({
        houseBoatId: HBbooking.houseBoatId,
        paymentStatus: "Success",
        status: "Active",
        tripType: { $in: ["DayCruise"] },
        bookedDates: { $in: allDates },
      });
      var reservedDates = await allResersvationsInDayCruise.map(
        (x) => x.reservedDates
      );
      var bookedDates = await allBookingsInDayCruise.map((x) => x.bookedDates);
      var result = reservedDates.concat(bookedDates);
      result = [].concat(...result);
      var allResersvationsInNightStay = await reservationModel.find({
        houseBoatId: HBbooking.houseBoatId,
        reservationStatus: "Reserved",
        status: "Active",
        tripType: { $in: ["NightStay"] },
        reservedDates: { $in: allDates },
      });
      var allBookingsInNightStay = await houseboatBookingItemModel.find({
        houseBoatId: HBbooking.houseBoatId,
        paymentStatus: "Success",
        status: "Active",
        tripType: { $in: ["NightStay"] },
        bookedDates: { $in: allDates },
      });
      var reservedDatesInNight = await allResersvationsInNightStay.map(
        (x) => x.reservedDates
      );
      var bookedDatesInNight = await allBookingsInNightStay.map(
        (x) => x.bookedDates
      );
      var allDa = bookedDatesInNight.concat(reservedDatesInNight);
      allDa = [].concat(...allDa);
      result = result.map((x) => x.toString());
      var fnalResult = await allDates.filter((x) => !result.includes(x));
      result = fnalResult.map((x) => new Date(x));
      result = result.concat(allDa);
      for (var i = 0; i < HBDates.length; i++) {
        result = result.filter((x) => x.toString() != HBDates[i].toString());
      }
    } else {
      var bookedData = await houseboatBookingItemModel.findOne({
        status: "Active",
        _id: bookingId,
      });
      var HBDates = bookedData.bookedDates;
      var allResersvationsInDayCruise = await reservationModel.find({
        houseBoatId: HBbooking.houseBoatId,
        reservationStatus: "Reserved",
        status: "Active",
        tripType: { $in: ["NightStay", "OverNight", "DayCruise"] },
      });
      var allBookingsInDayCruise = await houseboatBookingItemModel.find({
        houseBoatId: HBbooking.houseBoatId,
        paymentStatus: "Success",
        status: "Active",
        tripType: { $in: ["NightStay", "OverNight", "DayCruise"] },
      });
      var reservedDates = await allResersvationsInDayCruise.map(
        (x) => x.reservedDates
      );
      var bookedDates = await allBookingsInDayCruise.map((x) => x.bookedDates);
      var result = reservedDates.concat(bookedDates);
      result = [].concat(...result);
      for (var i = 0; i < HBDates.length; i++) {
        result = result.filter((x) => x.toString() != HBDates[i].toString());
      }
    }
    result = result.map((x) => x.toISOString().split("T")[0]);
    res.status(200).json({
      status: true,
      data: result,
      tripType: tripType,
      msg: "Success",
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Internal server error.",
    });
    return;
  }
});

router.post("/reschedule/houseboat/admin", adminAuth, async (req, res) => {
  try {
    var { id, startDate, endDate } = req.body;
    // var today = new Date();
    // var eightDaysAhead = new Date(today);
    // eightDaysAhead.setDate(today.getDate() + 8); //8 Days ahead
    // console.log(eightDaysAhead);
    // var includedDates = await getDatesFiltered(startDate, endDate);
    // if (includedDates[0] > eightDaysAhead) {
    //   //Checking for the check in date is in between 8 days
    //   console.log("In 8 Days"); //If out side 8 days error shoud be generated
    //   res.status(200).json({
    //     status: false,
    //     msg: "Cannot reschedule as it is outside 8 days",
    //   });
    //   return;
    // }
    if (Misc.isnullorempty(startDate) || Misc.isnullorempty(endDate)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Date.",
      });
      return;
    }
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Invalid  booking id.",
      });
      return;
    }
    var hb = await houseboatBookingItemModel
      .findOne({ _id: id, status: "Active", paymentStatus: "Success" })
      .populate("houseBoatId");
    if (Misc.isnullorempty(hb)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    if (!Misc.isnullorempty(hb)) {
      if (hb.isReschedule == true) {
        res.status(200).json({
          status: false,
          msg: "Already rescheduled",
        });
        return;
      }
    }
    var checkmainhb = await houseboatBookingModel.findOne({
      _id: hb.houseboatBookId,
      status: "Active",
    });
    var houseboat = await houseBoatModel.findOne({
      _id: hb.houseBoatId._id,
      status: "Active",
    });

    var selectedDate = [];
    selectedDate.push(startDate, endDate);
    var mongooseDates = selectedDate.map((date) =>
      moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    var formattedDates = mongooseDates.map((x) => new Date(x));

    var includedDates = await getDatesIncluded(
      formattedDates[0],
      formattedDates[1]
    );
    if (includedDates.length <= 0) {
      res.status(200).json({
        status: false,
        msg: "Invalid dates selection,Try Again.....",
      });
      return;
    }
    if (includedDates[0] == new Date(selectedDate[1])) {
      res.status(200).json({
        status: false,
        msg: "Please select valid date",
      });
      return;
    }
    var checktrip = await tripTypeModel.findOne({
      tripType: hb.tripType,
      houseBoatId: hb.houseBoatId,
      status: "Active",
    });
    if (Misc.isnullorempty(checktrip)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Trip Type",
      });
      return;
    }

    //check this date includes any packages or not
    var checkPackage = await tripPackageModel.find({
      tripTypeId: checktrip._id,
      houseBoatId: hb.houseBoatId,
      status: "Active",
      startDate: { $lte: formattedDates[0] },
      endDate: { $gte: formattedDates[0] },
      packageType: { $in: ["Seasonal", "OffSeasonal","Special"] },
    });
    if (checkPackage.length <= 0) {
      res.status(200).json({
        status: false,
        msg: "Cant' reschedule as this date includes no packages",
      });
      return;
    }
    var reschedule = new rescheduleModel();

    reschedule.addedBy = req.user.id;
    reschedule.bookingId = id;
    reschedule.houseBoatId = hb.houseBoatId;
    reschedule.mainBookId = hb.houseboatBookId;
    reschedule.startDate = formattedDates[0];
    //reschedule.endDate = formattedDates[1];
    reschedule.rescheduleDates = includedDates;
    reschedule.newTotalAmount = hb.totalAmount;
    reschedule.newBalanceAmount = hb.balancePayAmount;
    reschedule.amountpaid = hb.advanceAmountPaid;
    reschedule.isAdminUpdated = false;
    reschedule.rescheduleDate = Date.now();
    reschedule.status = "Active";
    await reschedule.save();

    //update in hbItemmodel and hb booking model
    hb.startDate = formattedDates[0];
    //  hb.endDate=formattedDates[1];
    checkmainhb.startDate = formattedDates[0];
    checkmainhb.bookedDates = includedDates;
    hb.bookedDates = includedDates;
    hb.isReschedule = true;
    await hb.save();
    await checkmainhb.save();

    var tripType = hb.tripType;

    if (tripType === "OverNight" || tripType === "NightStay") {
      // Check if startDate and endDate are the same
      if (startDate === endDate) {
        // If same, set endDate to startDate + 1 day
        var nextDay = moment(startDate, "DD-MM-YYYY")
          .add(1, "days")
          .format("YYYY-MM-DD");
        reschedule.endDate = nextDay;
        hb.endDate = nextDay;
        checkmainhb.endDate = nextDay;
        await reschedule.save();
        await hb.save();
        await checkmainhb.save();
      }
    } else {
      reschedule.endDate = formattedDates[1];
      hb.endDate = formattedDates[1];
      checkmainhb.endDate = formattedDates[1];
      await reschedule.save();
      await hb.save();
      await checkmainhb.save();
    }
    if (req.user.user.role == "Admin") {
      console.log("admin entering");
      if (hb.houseBoatType == "Private") {
        if (tripType == "DayCruise") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "DayCruise",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          if (hb.bookingType == "Agent") {
            var getRate = await rescheduleRateController.CalculateDayCruisRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          } else if (hb.bookingType == "Customer") {
            var getRate =
              await customerrescheduleRateHelper.CalculateDayCruisRate(
                houseboat,
                dayTrip,
                includedDates,
                hb.noOfAdults
              );
          }
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              console.log(checkmainhb, "balance");
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "OverNight") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "OverNight",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          if (hb.bookingType == "Agent") {
            var getRate = await rescheduleRateController.CalculateDayCruisRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          } else if (hb.bookingType == "Customer") {
            var getRate =
              await customerrescheduleRateHelper.CalculateDayCruisRate(
                houseboat,
                dayTrip,
                includedDates,
                hb.noOfAdults
              );
          }
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "NightStay") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "NightStay",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          if (hb.bookingType == "Agent") {
            var getRate = await rescheduleRateController.CalculateDayCruisRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          } else if (hb.bookingType == "Customer") {
            var getRate =
              await customerrescheduleRateHelper.CalculateDayCruisRate(
                houseboat,
                dayTrip,
                includedDates,
                hb.noOfAdults
              );
          }
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
      } else if (hb.houseBoatType == "Sharing") {
        if (tripType == "DayCruise") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "DayCruise",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          if (hb.bookingType == "Agent") {
            var getRate = await rescheduleRateController.CalculateDayCruisRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          } else if (hb.bookingType == "Customer") {
            var getRate =
              await customerrescheduleRateHelper.CalculateDayCruisRate(
                houseboat,
                dayTrip,
                includedDates,
                hb.noOfAdults
              );
          }
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "OverNight") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "OverNight",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          if (hb.bookingType == "Agent") {
            var getRate = await rescheduleRateController.CalculateDayCruisRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          } else if (hb.bookingType == "Customer") {
            var getRate =
              await customerrescheduleRateHelper.CalculateDayCruisRate(
                houseboat,
                dayTrip,
                includedDates,
                hb.noOfAdults
              );
          }
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
        if (tripType == "NightStay") {
          var dayTrip = await tripTypeModel.findOne({
            tripType: "NightStay",
            houseBoatId: hb.houseBoatId,
            status: "Active",
          });
          if (hb.bookingType == "Agent") {
            var getRate = await rescheduleRateController.CalculateDayCruisRate(
              houseboat,
              dayTrip,
              includedDates,
              hb.noOfAdults
            );
          } else if (hb.bookingType == "Customer") {
            var getRate =
              await customerrescheduleRateHelper.CalculateDayCruisRate(
                houseboat,
                dayTrip,
                includedDates,
                hb.noOfAdults
              );
          }
          if (getRate.status == true) {
            hb.agentRate = getRate.rate;
            console.log(hb.agentRate, "rate");
            if (getRate.rate > hb.totalAmount) {
              var checkBalance = getRate.rate - hb.advanceAmountPaid;
              hb.totalAmount = getRate.rate;
              hb.balancePayAmount = checkBalance;
              await hb.save();
              checkmainhb.totalAmount = getRate.rate;
              checkmainhb.balancePayAmount = checkBalance;
              await checkmainhb.save();
              reschedule.newTotalAmount = getRate.rate;
              reschedule.newBalanceAmount = checkBalance;
              await reschedule.save();
            }
          }
        }
      }
    }
    res.status(200).json({
      status: true,
      reschedule: reschedule,
      msg: "Successfully rescheduled.",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "Something went wrong!",
    });
  }
});

///SHIKARA RESCHEDULE

router.post("/reschedule/shikara/getdates", async (req, res) => {
  try {
    var { month, bookingId } = req.body;
    console.log(req.body); //{ month: '2024-03' }
    if (Misc.isnullorempty(bookingId)) {
      res.status(400).json({
        status: false,
        msg: "Please provide bookingId",
      });
      return;
    }
    if (Misc.isnullorempty(month)) {
      res.status(400).json({
        status: false,
        msg: "Please provide month",
      });
      return;
    }
    var SKbooking = await shikaraBookingModel
      .findOne({
        _id: bookingId,
        status: "Active",
        advancepaymentStatus: "Success",
      })
      .populate("shikaraid");
    if (Misc.isnullorempty(SKbooking)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    var shikara = await shikaraModel.findOne({
      _id: SKbooking.shikaraid,
      status: "Active",
    });
    if (!Misc.isnullorempty(shikara)) {
      //check houseboat status
      if (shikara.shikaraStatus != "Approved") {
        res.status(200).json({
          status: false,
          msg: "Cannot reschedule. Shikara is not approved.",
        });
        return;
      }
    } else {
      res.status(200).json({
        status: false,
        msg: "Invalid shikara details.",
      });
      return;
    }

    var mnth = month;
    if (Misc.isnullorempty(month)) {
      var today = new Date();
      var currentMonth = today.getMonth() + 1;
      var year = today.getFullYear();
      month = currentMonth + 1 + "-" + year;
    } else {
      var dats = month.split("-");
      month = dats[1] + "-" + dats[0];
    }

    var bookedData = await shikaraBookingModel.findOne({
      status: "Active",
      _id: bookingId,
    });
    var SKDates = [];
    SKDates.push(bookedData.selectedDate);
    var allResersvations = await reservationModel.find({
      shikaraId: SKbooking.shikaraid,
      reservationStatus: "Reserved",
      status: "Active",
    });
    var allBookings = await shikaraBookingModel.find({
      shikaraid: SKbooking.shikaraid,
      advancepaymentStatus: "Success",
      status: "Active",
    });
    var reservedDates = await allResersvations.map((x) => x.reservedDates);
    var bookedDates = await allBookings.map((x) => x.selectedDate);
    var result = reservedDates.concat(bookedDates);
    result = [].concat(...result);
    for (var i = 0; i < SKDates.length; i++) {
      result = result.filter((x) => x.toString() != SKDates[i].toString());
    }
    result = result.map((x) => x.toISOString().split("T")[0]);
    res.status(200).json({
      // status: true,
      data: result,
      msg: "Success",
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: false,
      msg: "Internal server error.",
    });
    return;
  }
});

router.post("/reschedule/shikarabooking/details", async (req, res) => {
  try {
    var { bookingId } = req.body;
    if (Misc.isnullorempty(bookingId)) {
      res.status(200).json({
        status: false,
        msg: "Please provide bookingId",
      });
      return;
    }
    var d = await shikaraBookingModel
      .findOne({ _id: bookingId, status: "Active" })
      .populate({
        path: "shikaraid",
        populate: { path: "startingLocation" },
      });
    res.status(200).json({
      status: true,
      msg: "Success",
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
router.post("/reschedule/shikara/old", ifToken, async (req, res) => {
  try {
    var { id, startDate, startTime, endTime } = req.body;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Please provide id",
      });
      return;
    }
    if (Misc.isnullorempty(startDate)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Date.",
      });
      return;
    }
    if (Misc.isnullorempty(startTime)) {
      res.status(200).json({
        status: false,
        msg: "Invalid start time.",
      });
      return;
    }
    if (Misc.isnullorempty(endTime)) {
      res.status(200).json({
        status: false,
        msg: "Invalid end time.",
      });
      return;
    }
    startDate = new Date(startDate);
    startTime = new Date(startTime);
    endTime = new Date(endTime);
    var sk = await shikaraBookingModel
      .findOne({ _id: id, status: "Active", advancepaymentStatus: "Success" })
      .populate("shikaraid");
    if (Misc.isnullorempty(sk)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    var selectedDate = [];
    selectedDate.push(startDate);
    var mongooseDates = selectedDate.map((date) =>
      moment(date, "DD-MM-YYYY").format("YYYY-MM-DD")
    );
    var formattedDates = mongooseDates.map((x) => new Date(x));
    //check the date
    // var eightDaysBeforeStartDate=new Date(sk.startDate);
    // eightDaysBeforeStartDate.setDate(sk.startDate.getDate() - 8);
    // var reschedulingDate = new Date();
    // if (eightDaysBeforeStartDate <=reschedulingDate) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Rescheduling is only allowed up to 8 days before the start date of the booking",
    //   });
    //   return;
    // }
    if (!Misc.isnullorempty(sk)) {
      if (sk.isReschedule == true) {
        res.status(200).json({
          status: false,
          msg: "Shikara  already rescheduled",
        });
        return;
      }
    }

    var skData = await shikaraModel.findOne({
      _id: sk.shikaraid._id,
      status: "Active",
    });
    if (Misc.isnullorempty(skData)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    var trip = await tripTypeModel.findOne({
      shikaraId: sk.shikaraid,
      status: "Active",
    });
    if (Misc.isnullorempty(trip)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    var checkBooking = await tripPackageModel.find({
      shikaraId: sk.shikaraid,
      status: "Active",
      startDate: { $lte: formattedDates[0] },
      endDate: { $gte: formattedDates[0] },
      packageType: { $in: ["Seasonal", "OffSeasonal", "Special"] },
    });
    // Check if any bookings exist for the specified date range
    if (checkBooking.length <= 0) {
      res.status(200).json({
        status: false,
        msg: "Can't reschedule as there are no package for this date",
      });
      return;
    }

    //check in reservationmodel this date is already booked
    var checkReservation = await reservationModel.find({
      shikaraId: sk.shikaraid,
      selectedDate: formattedDates[0],
      startTimeCopy: { $lte: startTime },
      endTimeCopy: { $gte: endTime },
      reservationStatus: "Reserved",
      status: "Active",
    });
    if (checkReservation.length > 0) {
      res.status(200).json({
        status: false,
        msg: "Can't reschedule as there are reservations for this date",
      });
      return;
    }
    var reschedule = new rescheduleModel();

    reschedule.addedBy = req.user.id;
    reschedule.shikbookId = id;
    reschedule.shikaraId = sk.shikaraid;
    reschedule.startDate = formattedDates[0];
    reschedule.rescheduleDates = formattedDates[0];
    reschedule.newTotalAmount = sk.bookingTotal;
    reschedule.newBalanceAmount = sk.postBookingamount;
    reschedule.amountpaid = sk.advance;
    reschedule.isAdminUpdated = false;
    reschedule.rescheduleDate = Date.now();
    reschedule.status = "Active";
    reschedule.startTime = startTime;
    reschedule.endTime = endTime;
    await reschedule.save();

    sk.selectedDate = formattedDates[0];
    sk.isReschedule = true;
    await sk.save();

    if (req.user.user.role == "Agent") {
      var DateStartEnd = await DateTime.getDateStartEnd(startDate);
      var startDate = DateStartEnd.dStart;
      startDate.setHours(5, 30, 0, 0);
      var endDate = DateStartEnd.dEnd;
      endDate.setHours(5, 30, 0, 0);
      var checkForSpecialRate = await tripPackageModel.findOne({
        status: "Active",
        packageType: "Special",
        shikaraId: sk.shikaraid,
        tripTypeId: trip._id,
        startDate: { $gte: DateStartEnd.dStart },
        endDate: { $lte: DateStartEnd.dEnd },
        agentRate: { $gte: 0 },
      });
      if (Misc.isnullorempty(checkForSpecialRate)) {
        // var normalRate = await tripPackageModel.findOne({status:"Active",shikaraId:sk.shikaraid,tripTypeId:trip._id});
        var details = await tripPackageModel.aggregate([
          {
            $match: {
              packageType: { $ne: "Special" },
              status: "Active",
              shikaraId: new mongoose.Types.ObjectId(sk.shikaraid),
              tripTypeId: new mongoose.Types.ObjectId(trip._id),
              startDate: { $lte: startDate },
              endDate: { $gte: startDate },
              agentRate: { $gte: 0 },
            },
          },
        ]);
        for (var i = 0; i < details.length; i++) {
          var agentRate = details[i].agentRate; /** memberCount;*/
          var startTimeDate = new Date(startTime);
          var endTimeDate = new Date(endTime);
          var durationInHours = Math.ceil(
            (endTimeDate - startTimeDate) / (1000 * 60 * 60)
          );
          var totalRatee = details[i].agentRate; /** memberCount;*/
          var totalAgentRate = totalRatee * durationInHours;
          var totalcusRate = agentRate * durationInHours;
        }
        if (totalAgentRate > sk.bookingTotal) {
          var checkBalance = totalAgentRate - sk.advance;
          sk.bookingTotal = totalAgentRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = endTime;
          await sk.save();

          reschedule.newTotalAmount = totalAgentRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      } else {
        var agentRate = checkForSpecialRate.agentRate; /** memberCount;*/
        var startTimeDate = new Date(startTime);
        var endTimeDate = new Date(endTime);
        var durationInHours = Math.ceil(
          (endTimeDate - startTimeDate) / (1000 * 60 * 60)
        );
        var totalRatee = checkForSpecialRate.agentRate; /** memberCount;*/
        var totalAgentRate = totalRatee * durationInHours;
        var totalcusRate = agentRate * durationInHours;
        if (totalAgentRate > sk.bookingTotal) {
          var checkBalance = totalAgentRate - sk.advance;
          sk.bookingTotal = totalAgentRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = endTime;
          await sk.save();

          reschedule.newTotalAmount = totalAgentRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      }
    } else if (req.user.user.role == "Customer") {
      var DateStartEnd = await DateTime.getDateStartEnd(startDate);
      var startDate = DateStartEnd.dStart;
      startDate.setHours(5, 30, 0, 0);
      var endDate = DateStartEnd.dEnd;
      endDate.setHours(5, 30, 0, 0);
      var checkForSpecialRate = await tripPackageModel.findOne({
        status: "Active",
        packageType: "Special",
        shikaraId: sk.shikaraid,
        tripTypeId: trip._id,
        startDate: { $gte: DateStartEnd.dStart },
        endDate: { $lte: DateStartEnd.dEnd },
        customerRate: { $gte: 0 },
      });
      if (Misc.isnullorempty(checkForSpecialRate)) {
        // var normalRate = await tripPackageModel.findOne({status:"Active",shikaraId:sk.shikaraid,tripTypeId:trip._id});
        var details = await tripPackageModel.aggregate([
          {
            $match: {
              packageType: { $ne: "Special" },
              status: "Active",
              shikaraId: new mongoose.Types.ObjectId(sk.shikaraid),
              tripTypeId: new mongoose.Types.ObjectId(trip._id),
              startDate: { $lte: startDate },
              endDate: { $gte: startDate },
              customerRate: { $gte: 0 },
            },
          },
        ]);
        for (var i = 0; i < details.length; i++) {
          var customerRate = details[i].customerRate; /** memberCount;*/
          var startTimeDate = new Date(startTime);
          var endTimeDate = new Date(endTime);
          var durationInHours = Math.ceil(
            (endTimeDate - startTimeDate) / (1000 * 60 * 60)
          );
          var totalRatee = details[i].customerRate; /** memberCount;*/
          var totalAgentRate = totalRatee * durationInHours;
          var totalcusRate = customerRate * durationInHours;
        }
        if (totalcusRate > sk.bookingTotal) {
          var checkBalance = totalcusRate - sk.advance;
          sk.bookingTotal = totalcusRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = endTime;
          await sk.save();

          reschedule.newTotalAmount = totalcusRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      } else {
        var customerRate = checkForSpecialRate.customerRate; /** memberCount;*/
        var startTimeDate = new Date(startTime);
        var endTimeDate = new Date(endTime);
        var durationInHours = Math.ceil(
          (endTimeDate - startTimeDate) / (1000 * 60 * 60)
        );
        var totalRatee = checkForSpecialRate.customerRate; /** memberCount;*/
        var totalAgentRate = totalRatee * durationInHours;
        var totalcusRate = customerRate * durationInHours;
        if (totalcusRate > sk.bookingTotal) {
          var checkBalance = totalcusRate - sk.advance;
          sk.bookingTotal = totalcusRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = endTime;
          await sk.save();

          reschedule.newTotalAmount = totalcusRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      }
    }
    res.status(200).json({
      status: true,
      reschedule: reschedule,
      msg: "Successfully rescheduled.",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "Something went wrong!",
    });
  }
});

function formatTimestamp(timestamp) {
  return moment(timestamp).format("YYYY-MM-DDTHH:mm:ss");
}
function reduceMinute(timestamp) {
  const oneMinute = 60 * 1000; // 60 seconds * 1000 milliseconds
  return timestamp - oneMinute;
}
router.post("/reschedule/shikara/admin", adminAuth, async (req, res) => {
  try {
    var { id, startDate, startTime, endTime } = req.body;
   
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Please provide id",
      });
      return;
    }
    if (Misc.isnullorempty(startDate)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Date.",
      });
      return;
    }
    if (Misc.isnullorempty(startTime)) {
      res.status(200).json({
        status: false,
        msg: "Invalid start time.",
      });
      return;
    }
    if (Misc.isnullorempty(endTime)) {
      res.status(200).json({
        status: false,
        msg: "Invalid end time.",
      });
      return;
    }
    (startDate = new Date(startDate)),
    (startTime = new Date(startTime)),
    (endTime = new Date(endTime));

    var sk = await shikaraBookingModel
    .findOne({ _id: id, status: "Active", advancepaymentStatus: "Success" })
    .populate("shikaraid");
    if (Misc.isnullorempty(sk)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    if (!Misc.isnullorempty(sk)) {
      if (sk.isReschedule == true) {
        res.status(200).json({
          status: false,
          msg: "Shikara  already rescheduled",
        });
        return;
      }
    }
    const originalTimestamp = moment(endTime, "YYYY-MM-DDTHH:mm:ss").valueOf();
    const reducedTimestamp = reduceMinute(originalTimestamp);
    const formattedTimestamp = formatTimestamp(reducedTimestamp);

    const startHour = new Date(startTime).getHours();
    const startHourr = new Date(startTime);
    const endHourr = new Date(endTime);
    const endHour = new Date(endTime).getHours();
    var durationInHoursssss = (endHourr - startHourr) / (1000 * 60 * 60);

    const endDecimalTime =
      endHourr.getHours() +
      endHourr.getMinutes() / 60 +
      endHourr.getSeconds() / 3600 +
      endHourr.getMilliseconds() / 3600000;

    const startDecimalTime =
      startHourr.getHours() +
      startHourr.getMinutes() / 60 +
      startHourr.getSeconds() / 3600 +
      startHourr.getMilliseconds() / 3600000;

    const currrDate = new Date();
    const currentDate = currrDate.getDate();
    const currmonth = currrDate.getMonth() + 1;
    const currYear = currrDate.getFullYear();
    var currentD =
      currYear +
      "-" +
      (currmonth < 10 ? "0" : "") +
      currmonth +
      "-" +
      (currentDate < 10 ? "0" : "") +
      currentDate;

    const sd = new Date(startDate);
    const sdDate = sd.getDate();
    const sdmonth = sd.getMonth() + 1;
    const sdYear = sd.getFullYear();
    var selectedD =
      sdYear +
      "-" +
      (sdmonth < 10 ? "0" : "") +
      sdmonth +
      "-" +
      (sdDate < 10 ? "0" : "") +
      sdDate;

    if (currentD == selectedD) {
      const currentHour = currrDate.getHours();
      const currentMinute = currrDate.getMinutes();
      const currentTime = currentHour + currentMinute / 60;
      if (startDecimalTime < currentTime || endDecimalTime < currentTime) {
        res.status(200).json({
          status: false,
          msg: "Invalid time slots selected",
        });
        return;
      }
    }
    if (endHour < startHour) {
      res.status(200).json({
        status: false,
        msg: "Invalid time slots.",
      });
      return;
    }
    if (startDecimalTime > 17.5 || startDecimalTime < 6) {
      res.status(200).json({
        status: false,
        msg: "Trip start time is 6 AM.",
      });
      return;
    }
    if (endDecimalTime > 17.5 || endDecimalTime < 6) {
      res.status(200).json({
        status: false,
        msg: "Trip end time limit is 5:30 PM.",
      });
      return;
    }
    var selectedDate = new Date(startDate);
    var selectedDateStartEnd = await DateTime.getDateStartEnd(selectedDate);
    var squery = {
      status: "Active",
      advancepaymentStatus: "Success",
      selectedDate: {
        $gte: selectedDateStartEnd.dStart,
        $lte: selectedDateStartEnd.dEnd,
      },
      shikaraid: sk.shikaraid,
      $or: [
        {
          $and: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: endTime } },
          ],
        },
      ],
    };
    var shiks = await shikaraBookingModel.find(squery);
    if (shiks.length > 0) {
      res.status(200).json({
        status: false,
        msg: "Shikara already booked for this date and time",
      });
      return;
    }
    var checkInDate = selectedDate;
    var checkInDateStartEnd = await DateTime.getDateStartEnd(checkInDate);
    var rquery = {
      status: "Active",
      shikaraId: sk.shikaraid,
      checkInDate: {
        $gte: checkInDateStartEnd.dStart,
        $lte: checkInDateStartEnd.dEnd,
      },
      $or: [
        {
          $and: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: endTime } },
          ],
        },
      ],
    };
    var reservecheck = await reservationModel.find(rquery);
    if (reservecheck.length > 0) {
      res.status(200).json({
        status: false,
        msg: "Reservation already booked for this date and time",
      });
      return;
    }
    var skData = await shikaraModel.findOne({
      _id: sk.shikaraid._id,
      status: "Active",
    });
    if (Misc.isnullorempty(skData)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    if(skData.shikaraStatus!="Approved"){
      res.status(200).json({
        status: false,
        msg: "Shikara status is not approved",
      });
      return;
    }
    var trip = await tripTypeModel.findOne({
      shikaraId: sk.shikaraid,
      status: "Active",
    });
    if (Misc.isnullorempty(trip)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    var tripData = trip.minimumHours;
    var timeDifference = endTime.getTime() - startTime.getTime();

    // Convert the time difference from milliseconds to hours
    var timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
    if (timeDifferenceInHours < tripData) {
      return res.status(200).json({
        status: false,
        msg: "Trip duration is less than the minimum required hours.",
      });
    }
 
    var checkBooking = await tripPackageModel.find({
      shikaraId: sk.shikaraid,
      status: "Active",
      startDate: { $lte: selectedDate },
      endDate: { $gte: selectedDate },
      packageType: { $in: ["Seasonal", "OffSeasonal", "Special"] },
    });
    // Check if any bookings exist for the specified date range
    if (checkBooking.length <= 0) {
      res.status(200).json({
        status: false,
        msg: "Can't reschedule as there are no package for this date",
      });
      return;
    }

    var reschedule = new rescheduleModel();

    reschedule.addedBy = req.user.id;
    reschedule.shikbookId = id;
    reschedule.shikaraId = sk.shikaraid;
    reschedule.startDate = startDate;
    reschedule.rescheduleDates = startDate;
    reschedule.newTotalAmount = sk.bookingTotal;
    reschedule.newBalanceAmount = sk.postBookingamount;
    reschedule.amountpaid = sk.advance;
    reschedule.isAdminUpdated = true;
    reschedule.rescheduleDate = Date.now();
    reschedule.status = "Active";
    reschedule.startTime = startTime;
    reschedule.endTime = formattedTimestamp;
    await reschedule.save();

    sk.selectedDate = startDate;
    sk.isReschedule = true;
    await sk.save();

    if (sk.bookingType == "Agent") {
      var DateStartEnd = await DateTime.getDateStartEnd(startDate);
      var startDate = DateStartEnd.dStart;
      startDate.setHours(5, 30, 0, 0);
      var endDate = DateStartEnd.dEnd;
      endDate.setHours(5, 30, 0, 0);
      var checkForSpecialRate = await tripPackageModel.findOne({
        status: "Active",
        packageType: "Special",
        shikaraId: sk.shikaraid,
        tripTypeId: trip._id,
        startDate: { $gte: DateStartEnd.dStart },
        endDate: { $lte: DateStartEnd.dEnd },
        agentRate: { $gte: 0 },
      });
      if (Misc.isnullorempty(checkForSpecialRate)) {
        // var normalRate = await tripPackageModel.findOne({status:"Active",shikaraId:sk.shikaraid,tripTypeId:trip._id});
        var details = await tripPackageModel.aggregate([
          {
            $match: {
              packageType: { $ne: "Special" },
              status: "Active",
              shikaraId: new mongoose.Types.ObjectId(sk.shikaraid),
              tripTypeId: new mongoose.Types.ObjectId(trip._id),
              startDate: { $lte: startDate },
              endDate: { $gte: startDate },
              agentRate: { $gte: 0 },
            },
          },
        ]);
        for (var i = 0; i < details.length; i++) {
          var agentRate = details[i].agentRate; /** memberCount;*/
          var startTimeDate = new Date(startTime);
          var endTimeDate = new Date(endTime);
          var durationInHours = Math.ceil(
            (endTimeDate - startTimeDate) / (1000 * 60 * 60)
          );
          var totalRatee = details[i].agentRate; /** memberCount;*/
          var totalAgentRate = totalRatee * durationInHours;
          var totalcusRate = agentRate * durationInHours;
        }
        if (totalAgentRate > sk.bookingTotal) {
          var checkBalance = totalAgentRate - sk.advance;
          sk.bookingTotal = totalAgentRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = formattedTimestamp;
          await sk.save();

          reschedule.newTotalAmount = totalAgentRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      } else {
        var agentRate = checkForSpecialRate.agentRate; /** memberCount;*/
        var startTimeDate = new Date(startTime);
        var endTimeDate = new Date(endTime);
        var durationInHours = Math.ceil(
          (endTimeDate - startTimeDate) / (1000 * 60 * 60)
        );
        var totalRatee = checkForSpecialRate.agentRate; /** memberCount;*/
        var totalAgentRate = totalRatee * durationInHours;
        var totalcusRate = agentRate * durationInHours;
        if (totalAgentRate > sk.bookingTotal) {
          var checkBalance = totalAgentRate - sk.advance;
          sk.bookingTotal = totalAgentRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = formattedTimestamp;
          await sk.save();

          reschedule.newTotalAmount = totalAgentRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      }
    } else if (sk.bookingType == "Customer") {
      var DateStartEnd = await DateTime.getDateStartEnd(startDate);
      var startDate = DateStartEnd.dStart;
      startDate.setHours(5, 30, 0, 0);
      var endDate = DateStartEnd.dEnd;
      endDate.setHours(5, 30, 0, 0);
      var checkForSpecialRate = await tripPackageModel.findOne({
        status: "Active",
        packageType: "Special",
        shikaraId: sk.shikaraid,
        tripTypeId: trip._id,
        startDate: { $gte: DateStartEnd.dStart },
        endDate: { $lte: DateStartEnd.dEnd },
        customerRate: { $gte: 0 },
      });
      if (Misc.isnullorempty(checkForSpecialRate)) {
        // var normalRate = await tripPackageModel.findOne({status:"Active",shikaraId:sk.shikaraid,tripTypeId:trip._id});
        var details = await tripPackageModel.aggregate([
          {
            $match: {
              packageType: { $ne: "Special" },
              status: "Active",
              shikaraId: new mongoose.Types.ObjectId(sk.shikaraid),
              tripTypeId: new mongoose.Types.ObjectId(trip._id),
              startDate: { $lte: startDate },
              endDate: { $gte: startDate },
              customerRate: { $gte: 0 },
            },
          },
        ]);
        for (var i = 0; i < details.length; i++) {
          var customerRate = details[i].customerRate; /** memberCount;*/
          var startTimeDate = new Date(startTime);
          var endTimeDate = new Date(endTime);
          var durationInHours = Math.ceil(
            (endTimeDate - startTimeDate) / (1000 * 60 * 60)
          );
          var totalRatee = details[i].customerRate; /** memberCount;*/
          var totalAgentRate = totalRatee * durationInHours;
          var totalcusRate = customerRate * durationInHours;
        }
        if (totalcusRate > sk.bookingTotal) {
          var checkBalance = totalcusRate - sk.advance;
          sk.bookingTotal = totalcusRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = formattedTimestamp;
          await sk.save();

          reschedule.newTotalAmount = totalcusRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      } else {
        var customerRate = checkForSpecialRate.customerRate; /** memberCount;*/
        var startTimeDate = new Date(startTime);
        var endTimeDate = new Date(endTime);
        var durationInHours = Math.ceil(
          (endTimeDate - startTimeDate) / (1000 * 60 * 60)
        );
        var totalRatee = checkForSpecialRate.customerRate; /** memberCount;*/
        var totalAgentRate = totalRatee * durationInHours;
        var totalcusRate = customerRate * durationInHours;
        if (totalcusRate > sk.bookingTotal) {
          var checkBalance = totalcusRate - sk.advance;
          sk.bookingTotal = totalcusRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = formattedTimestamp;
          await sk.save();

          reschedule.newTotalAmount = totalcusRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      }
    }
    res.status(200).json({
      status: true,
      reschedule: reschedule,
      msg: "Successfully rescheduled.",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "Something went wrong!",
    });
  }
});
router.post("/reschedule/shikara", ifToken, async (req, res) => {
  try {
    var { id, startDate, startTime, endTime } = req.body;
   
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Please provide id",
      });
      return;
    }
    if (Misc.isnullorempty(startDate)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Date.",
      });
      return;
    }
    if (Misc.isnullorempty(startTime)) {
      res.status(200).json({
        status: false,
        msg: "Invalid start time.",
      });
      return;
    }
    if (Misc.isnullorempty(endTime)) {
      res.status(200).json({
        status: false,
        msg: "Invalid end time.",
      });
      return;
    }
    (startDate = new Date(startDate)),
    (startTime = new Date(startTime)),
    (endTime = new Date(endTime));

    var sk = await shikaraBookingModel
    .findOne({ _id: id, status: "Active", advancepaymentStatus: "Success" })
    .populate("shikaraid");
    if (Misc.isnullorempty(sk)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    if (!Misc.isnullorempty(sk)) {
      if (sk.isReschedule == true) {
        res.status(200).json({
          status: false,
          msg: "Shikara  already rescheduled",
        });
        return;
      }
    }
    const originalTimestamp = moment(endTime, "YYYY-MM-DDTHH:mm:ss").valueOf();
    const reducedTimestamp = reduceMinute(originalTimestamp);
    const formattedTimestamp = formatTimestamp(reducedTimestamp);

    const startHour = new Date(startTime).getHours();
    const startHourr = new Date(startTime);
    const endHourr = new Date(endTime);
    const endHour = new Date(endTime).getHours();
    var durationInHoursssss = (endHourr - startHourr) / (1000 * 60 * 60);

    const endDecimalTime =
      endHourr.getHours() +
      endHourr.getMinutes() / 60 +
      endHourr.getSeconds() / 3600 +
      endHourr.getMilliseconds() / 3600000;

    const startDecimalTime =
      startHourr.getHours() +
      startHourr.getMinutes() / 60 +
      startHourr.getSeconds() / 3600 +
      startHourr.getMilliseconds() / 3600000;

    const currrDate = new Date();
    const currentDate = currrDate.getDate();
    const currmonth = currrDate.getMonth() + 1;
    const currYear = currrDate.getFullYear();
    var currentD =
      currYear +
      "-" +
      (currmonth < 10 ? "0" : "") +
      currmonth +
      "-" +
      (currentDate < 10 ? "0" : "") +
      currentDate;

    const sd = new Date(startDate);
    const sdDate = sd.getDate();
    const sdmonth = sd.getMonth() + 1;
    const sdYear = sd.getFullYear();
    var selectedD =
      sdYear +
      "-" +
      (sdmonth < 10 ? "0" : "") +
      sdmonth +
      "-" +
      (sdDate < 10 ? "0" : "") +
      sdDate;

    if (currentD == selectedD) {
      const currentHour = currrDate.getHours();
      const currentMinute = currrDate.getMinutes();
      const currentTime = currentHour + currentMinute / 60;
      if (startDecimalTime < currentTime || endDecimalTime < currentTime) {
        res.status(200).json({
          status: false,
          msg: "Invalid time slots selected",
        });
        return;
      }
    }
    if (endHour < startHour) {
      res.status(200).json({
        status: false,
        msg: "Invalid time slots.",
      });
      return;
    }
    if (startDecimalTime > 17.5 || startDecimalTime < 6) {
      res.status(200).json({
        status: false,
        msg: "Trip start time is 6 AM.",
      });
      return;
    }
    if (endDecimalTime > 17.5 || endDecimalTime < 6) {
      res.status(200).json({
        status: false,
        msg: "Trip end time limit is 5:30 PM.",
      });
      return;
    }
    var selectedDate = new Date(startDate);
    var selectedDateStartEnd = await DateTime.getDateStartEnd(selectedDate);
    var squery = {
      status: "Active",
      advancepaymentStatus: "Success",
      selectedDate: {
        $gte: selectedDateStartEnd.dStart,
        $lte: selectedDateStartEnd.dEnd,
      },
      shikaraid: sk.shikaraid,
      $or: [
        {
          $and: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: endTime } },
          ],
        },
      ],
    };
    var shiks = await shikaraBookingModel.find(squery);
    if (shiks.length > 0) {
      res.status(200).json({
        status: false,
        msg: "Shikara already booked for this date and time",
      });
      return;
    }
    var checkInDate = selectedDate;
    var checkInDateStartEnd = await DateTime.getDateStartEnd(checkInDate);
    var rquery = {
      status: "Active",
      shikaraId: sk.shikaraid,
      checkInDate: {
        $gte: checkInDateStartEnd.dStart,
        $lte: checkInDateStartEnd.dEnd,
      },
      $or: [
        {
          $and: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $lte: startTime } },
            { endTime: { $gte: startTime, $lte: endTime } },
          ],
        },
        {
          $and: [
            { startTime: { $gte: startTime, $lte: endTime } },
            { endTime: { $gte: endTime } },
          ],
        },
      ],
    };
    var reservecheck = await reservationModel.find(rquery);
    if (reservecheck.length > 0) {
      res.status(200).json({
        status: false,
        msg: "Reservation already booked for this date and time",
      });
      return;
    }
    var skData = await shikaraModel.findOne({
      _id: sk.shikaraid._id,
      status: "Active",
    });
    if (Misc.isnullorempty(skData)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    if(skData.shikaraStatus!="Approved"){
      res.status(200).json({
        status: false,
        msg: "Shikara status is not approved",
      });
      return;
    }
    var trip = await tripTypeModel.findOne({
      shikaraId: sk.shikaraid,
      status: "Active",
    });
    if (Misc.isnullorempty(trip)) {
      res.status(200).json({
        status: false,
        msg: "Invalid Data",
      });
      return;
    }
    var tripData = trip.minimumHours;
    var timeDifference = endTime.getTime() - startTime.getTime();

    // Convert the time difference from milliseconds to hours
    var timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
    if (timeDifferenceInHours < tripData) {
      return res.status(200).json({
        status: false,
        msg: "Trip duration is less than the minimum required hours.",
      });
    }
 
    var checkBooking = await tripPackageModel.find({
      shikaraId: sk.shikaraid,
      status: "Active",
      startDate: { $lte: selectedDate },
      endDate: { $gte: selectedDate },
      packageType: { $in: ["Seasonal", "OffSeasonal", "Special"] },
    });
    // Check if any bookings exist for the specified date range
    if (checkBooking.length <= 0) {
      res.status(200).json({
        status: false,
        msg: "Can't reschedule as there are no package for this date",
      });
      return;
    }

    var reschedule = new rescheduleModel();

    reschedule.addedBy = req.user.id;
    reschedule.shikbookId = id;
    reschedule.shikaraId = sk.shikaraid;
    reschedule.startDate = startDate;
    reschedule.rescheduleDates = startDate;
    reschedule.newTotalAmount = sk.bookingTotal;
    reschedule.newBalanceAmount = sk.postBookingamount;
    reschedule.amountpaid = sk.advance;
    reschedule.isAdminUpdated = true;
    reschedule.rescheduleDate = Date.now();
    reschedule.status = "Active";
    reschedule.startTime = startTime;
    reschedule.endTime = formattedTimestamp;
    await reschedule.save();

    sk.selectedDate = startDate;
    sk.isReschedule = true;
    await sk.save();

    if (req.user.user.role == "Agent") {
      var DateStartEnd = await DateTime.getDateStartEnd(startDate);
      var startDate = DateStartEnd.dStart;
      startDate.setHours(5, 30, 0, 0);
      var endDate = DateStartEnd.dEnd;
      endDate.setHours(5, 30, 0, 0);
      var checkForSpecialRate = await tripPackageModel.findOne({
        status: "Active",
        packageType: "Special",
        shikaraId: sk.shikaraid,
        tripTypeId: trip._id,
        startDate: { $gte: DateStartEnd.dStart },
        endDate: { $lte: DateStartEnd.dEnd },
        agentRate: { $gte: 0 },
      });
      if (Misc.isnullorempty(checkForSpecialRate)) {
        // var normalRate = await tripPackageModel.findOne({status:"Active",shikaraId:sk.shikaraid,tripTypeId:trip._id});
        var details = await tripPackageModel.aggregate([
          {
            $match: {
              packageType: { $ne: "Special" },
              status: "Active",
              shikaraId: new mongoose.Types.ObjectId(sk.shikaraid),
              tripTypeId: new mongoose.Types.ObjectId(trip._id),
              startDate: { $lte: startDate },
              endDate: { $gte: startDate },
              agentRate: { $gte: 0 },
            },
          },
        ]);
        for (var i = 0; i < details.length; i++) {
          var agentRate = details[i].agentRate; /** memberCount;*/
          var startTimeDate = new Date(startTime);
          var endTimeDate = new Date(endTime);
          var durationInHours = Math.ceil(
            (endTimeDate - startTimeDate) / (1000 * 60 * 60)
          );
          var totalRatee = details[i].agentRate; /** memberCount;*/
          var totalAgentRate = totalRatee * durationInHours;
          var totalcusRate = agentRate * durationInHours;
        }
        if (totalAgentRate > sk.bookingTotal) {
          var checkBalance = totalAgentRate - sk.advance;
          sk.bookingTotal = totalAgentRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = formattedTimestamp;
          await sk.save();

          reschedule.newTotalAmount = totalAgentRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      } else {
        var agentRate = checkForSpecialRate.agentRate; /** memberCount;*/
        var startTimeDate = new Date(startTime);
        var endTimeDate = new Date(endTime);
        var durationInHours = Math.ceil(
          (endTimeDate - startTimeDate) / (1000 * 60 * 60)
        );
        var totalRatee = checkForSpecialRate.agentRate; /** memberCount;*/
        var totalAgentRate = totalRatee * durationInHours;
        var totalcusRate = agentRate * durationInHours;
        if (totalAgentRate > sk.bookingTotal) {
          var checkBalance = totalAgentRate - sk.advance;
          sk.bookingTotal = totalAgentRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = formattedTimestamp;
          await sk.save();

          reschedule.newTotalAmount = totalAgentRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      }
    } else if (req.user.user.role == "Customer") {
      var DateStartEnd = await DateTime.getDateStartEnd(startDate);
      var startDate = DateStartEnd.dStart;
      startDate.setHours(5, 30, 0, 0);
      var endDate = DateStartEnd.dEnd;
      endDate.setHours(5, 30, 0, 0);
      var checkForSpecialRate = await tripPackageModel.findOne({
        status: "Active",
        packageType: "Special",
        shikaraId: sk.shikaraid,
        tripTypeId: trip._id,
        startDate: { $gte: DateStartEnd.dStart },
        endDate: { $lte: DateStartEnd.dEnd },
        customerRate: { $gte: 0 },
      });
      if (Misc.isnullorempty(checkForSpecialRate)) {
        // var normalRate = await tripPackageModel.findOne({status:"Active",shikaraId:sk.shikaraid,tripTypeId:trip._id});
        var details = await tripPackageModel.aggregate([
          {
            $match: {
              packageType: { $ne: "Special" },
              status: "Active",
              shikaraId: new mongoose.Types.ObjectId(sk.shikaraid),
              tripTypeId: new mongoose.Types.ObjectId(trip._id),
              startDate: { $lte: startDate },
              endDate: { $gte: startDate },
              customerRate: { $gte: 0 },
            },
          },
        ]);
        for (var i = 0; i < details.length; i++) {
          var customerRate = details[i].customerRate; /** memberCount;*/
          var startTimeDate = new Date(startTime);
          var endTimeDate = new Date(endTime);
          var durationInHours = Math.ceil(
            (endTimeDate - startTimeDate) / (1000 * 60 * 60)
          );
          var totalRatee = details[i].customerRate; /** memberCount;*/
          var totalAgentRate = totalRatee * durationInHours;
          var totalcusRate = customerRate * durationInHours;
        }
        if (totalcusRate > sk.bookingTotal) {
          var checkBalance = totalcusRate - sk.advance;
          sk.bookingTotal = totalcusRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = formattedTimestamp;
          await sk.save();

          reschedule.newTotalAmount = totalcusRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      } else {
        var customerRate = checkForSpecialRate.customerRate; /** memberCount;*/
        var startTimeDate = new Date(startTime);
        var endTimeDate = new Date(endTime);
        var durationInHours = Math.ceil(
          (endTimeDate - startTimeDate) / (1000 * 60 * 60)
        );
        var totalRatee = checkForSpecialRate.customerRate; /** memberCount;*/
        var totalAgentRate = totalRatee * durationInHours;
        var totalcusRate = customerRate * durationInHours;
        if (totalcusRate > sk.bookingTotal) {
          var checkBalance = totalcusRate - sk.advance;
          sk.bookingTotal = totalcusRate;
          sk.balancePayAmount = checkBalance;
          sk.selectedDate = startDate;
          sk.startTime = startTime;
          sk.endTime = formattedTimestamp;
          await sk.save();

          reschedule.newTotalAmount = totalcusRate;
          reschedule.newBalanceAmount = checkBalance;
          await reschedule.save();
        }
      }
    }
    res.status(200).json({
      status: true,
      reschedule: reschedule,
      msg: "Successfully rescheduled.",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "Something went wrong!",
    });
  }
});
module.exports = router;
