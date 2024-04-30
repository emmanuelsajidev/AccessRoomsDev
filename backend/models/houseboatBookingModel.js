const express = require("express");
const { type } = require("express/lib/response");
const mongoose = require("mongoose");
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const houseboatBookingModelSchema = new mongoose.Schema(
  {
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    vendorIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    }],
    houseBoatIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "houseBoatModel",
    }],
    bookCategory: { type: String ,default:"Single"},//Combination
    startDate: { type: Date },
    endDate: { type: Date },
    bookedDates: {type:[Date]},
    location: { type: mongoose.Schema.Types.ObjectId, ref: "locationModel" },
    totalRooms: { type: Number ,default:0},
    totalGuests: { type: Number ,default:0},  //total count
    noOfAdults: { type: Number,default:0 },
    noOfChildren: { type: Number,default:0 },
    tripType: { type: String },
    houseBoatType: { type: String },
    category: { type: String },
    bookingType: { type: String, default: "Agent" }, //Customer
    bookedFor: { type: String, default: "HouseBoat" },
    bookingNo: { type: String }, //auto generate  -eg:KL01
    checkbookingNo:{type:Number,default:0},//bookingno increment for checking eg:01
    fullName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    bookingDate: { type: Date },
    paymentId: {type: mongoose.Schema.Types.ObjectId, ref: 'paymentModel'},
    advancepaymentMode: { type: String },//TravelAgent,TaxiDriver,Guide,Guest
    //amounts
    totalAmount: { type: Number, default: 0 }, //original amount
    gstAmount: { type: Number, default: 0 },
    advanceAmountPaid: { type: Number, default: 0 }, //50 percent of total amount
    balancePayAmount: { type: Number,default:0 },
    balancepaymentStatus: { type: String, default: "Pending" },//Success
    balancePaymentMode: { type: String },
    paymentReceipt: { type: String },
    payableAmount: { type: Number, default: 0 },  //same as advance amount
    bookingStatus:{type:String,default:"Pending"},
    advancepaymentStatus: { type: String, default: "Pending" },//Success
    paymentStatus:{type:String,default:"Initiate"},//Success
    status: { type: String, default: "Active" },//Cancelled
    isReschedule:{type:Boolean,default:false},

    //settlement details
    accessPayReceipt: { type: String },  //upload from admin
    settlementDate: { type: Date },
    settlementStatus: { type: String, default: "Pending" },//Verified  //by vendor
    vendorNetAmount:{type:Number,default:0},
    accessPayBalance:{type:Number,default:0},
    vendorBalance:{type:Number,default:0},//advanceamountpaid-10%(adv.amountpaid)

  },

  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

module.exports = mongoose.model(
  "houseboatBookingModel",
  houseboatBookingModelSchema
);
