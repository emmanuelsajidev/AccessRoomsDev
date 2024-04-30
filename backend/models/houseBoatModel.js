const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const houseBoatModelSchema = new mongoose.Schema({
    vendorid: { type: mongoose.Schema.Types.ObjectId, ref: 'vendorModel' },
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },//addedBy
    location:{ type: mongoose.Schema.Types.ObjectId, ref: 'locationModel' },
    houseBoatName: { type: String },
    category: { type: String },//Premium,Delux,Luxuary
    facilities:{
        airCondition: { type:Boolean,default:false },
        kettle: { type:Boolean,default:false },
        parking: { type:Boolean,default:false },
        restrooms: { type:Boolean,default:false },
        lifeJacket: { type:Boolean,default:false },
        wifi: { type:Boolean,default:false },
        television: { type:Boolean,default:false },
        swimmingPool: { type:Boolean,default:false },
        powerbackup: { type:Boolean,default:false },
        fireextinguisher: { type:Boolean,default:false },

    },
    totalRooms: { type: Number },
    expiryType:{type:String},//licenseExpiry,insuranceExpiry
    expiryDate:{type:Date},
    boatLicenseProof:{type:String},
    leaseProof:{type:String},
    fullImage:{type:String},
    upperImage:{type:String},
    interiorImage:{type:String},
    roomImage:[{type:String}],
    propertyImages: [{type: String }],
    coverImage:{type:String},
    isDayCriuse:{type:Boolean,default:false},
    isOverNight:{type:Boolean,default:false},
    isNightStay:{type:Boolean,default:false},
    hasPackage:{type:Boolean,default:false},//hb has package
    houseBoatStatus:{type:String,default:"Pending"},//Approved,Rejected,Blocked
    commissionPercentage:{type:Number,default:10},//houseboatCommission Percentage
    startingLocation:{type: mongoose.Schema.Types.ObjectId, ref: 'subLocationModel'},
    status:{type:String,default:"Active"},
    rating: { type: Number,default: 0},
    ratingcount: { type: Number,default: 0 },
},


    { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model("houseBoatModel", houseBoatModelSchema);
