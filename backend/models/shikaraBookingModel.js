const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const shikaraBookingModelSchema = new mongoose.Schema({
    paymentId: {type: mongoose.Schema.Types.ObjectId, ref: 'paymentModel'},
    bookingType: { type: String, default: "Agent" },
    bookedFor:{type:String,default:"Shikara"},
    //PAYMENTS
    amount: { type: Number, default: 0 },
    postBookingamount: { type: Number, default: 0 },
    bookingTotal: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    agentgetAmount: { type: Number },
    advance: { type: Number, default: 0 },
    firstGst: { type: Number, default: 0 },
    secondGst: { type: Number, default: 0 },
    additionalCharge: { type: Number, default: 0 },
    gstAmount: { type: Number, default: 0 },
    paidAmount: { type: Number },
    balanceAmount: { type: Number },
    balancePaymentMode: { type: String },
    paymentReceipt: { type: String },
    shikaraName: { type: String },
    advancepaymentMode: { type: String },
    advancepaymentStatus: { type: String, default: "Pending" },//Success
    balancepaymentStatus: { type: String, default: "Pending" },//Success

    //DATE AND TIME
    selectedDate: { type: Date, required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    bookedOn: { type: Date },
    isReschedule:{type:Boolean,default:false},

    //BOOKING DETAILS
    bookingNo: { type: String, default: "Nill" },
    checkbookingNo:{type:Number,default :0},
    bookedbyid: { type: String, type: mongoose.Schema.Types.ObjectId, ref: 'userModel', },
    shikaraid: { type: String, type: mongoose.Schema.Types.ObjectId, ref: 'shikaraModel', },
    memberCount: { type: Number },
    childrenCount: { type: Number },
    location: { type: String, type: mongoose.Schema.Types.ObjectId, ref: 'locationModel', },
    customerDetails: {
        name: { type: String },
        phoneNumber: { type: String },
        email: { type: String },
        regCompanyName: { type: String },
        regCompanyAddress: { type: String },
        address: { type: String }

    },
    // agentDetails: {
    //     name: { type: String },
    //     phoneNumber: { type: String },
    //     email: { type: String },
    //     address: { type: String },

    // },
    //editStatus: { type: String, default: "Able" },//Disable
    paymentStatus:{type:String,default:"Initiate"},//Success
    status: { type: String, default: "Active" },

    //settlement details
    accessPayReceipt: { type: String },  //upload from admin
    settlementDate: { type: Date },
    settlementStatus: { type: String, default: "Pending" },//Verified  //by vendor
    vendorNetAmount:{type:Number,default:0},
    accessPayBalance:{type:Number,default:0},
    vendorBalance:{type:Number,default:0},//advanceamountpaid-10%(adv.amountpaid)
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: "updated_at" }
    });


module.exports = mongoose.model("shikaraBookingModel", shikaraBookingModelSchema);


