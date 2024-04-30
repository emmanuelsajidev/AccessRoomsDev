const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const shikaraModelSchema = new mongoose.Schema({
    vendorid: { type: mongoose.Schema.Types.ObjectId, ref: 'vendorModel' },
    userid:{ type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    location:{ type: mongoose.Schema.Types.ObjectId, ref: 'locationModel' },
    startingLocation:{type: mongoose.Schema.Types.ObjectId, ref: 'subLocationModel'},
    shikaraName: { type: String },
    totalSeats:{type:Number},
    facilities:{
        airCondition: { type:Boolean,default:false },
        towels: { type:Boolean,default:false },
        parking: { type:Boolean,default:false },
        restrooms: { type:Boolean,default:false },
        lifeJacket: { type:Boolean,default:false },
        wifi: { type:Boolean,default:false },
        television: { type:Boolean,default:false },
        toilet:{type:Boolean,default:false}
    },
    addionalRules:{type:String},
    expiryType:{type:String},//licenseExpiry,insuranceExpiry
    expiryDate:{type:Date},
    boatLicenseProof:{type:String},
    leaseProof:{type:String},
    fullImage:{type:String},
    coverImage:{type:String},
    // upperImage:{type:String},
    // interiorImage:{type:String},
    // roomImage:{type:String},
    propertyImages:[{ type: String }],
    shikaraStatus:{type:String,default:"Pending"},//Approved,Rejected,Blocked
    hasPackage:{type:Boolean,default:false},
    isComplete:{type:Boolean,default:false},
    status:{type:String,default:"Active"},
    rating: { type: Number,default: 0},
    ratingcount: { type: Number,default: 0 },
},


    { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model("shikaraModel", shikaraModelSchema);
