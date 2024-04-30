const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const userModelSchema = new mongoose.Schema({

    //LEVEL 1    
    name: { type: String },
    role: { type: String, default: "Customer" },//TravelAgent,TaxiDriver,Vendor,Guide,Admin,Guest
    phoneNumber: { type: String },//Should be unique for all users
    whatsappNumber: { type: String },
    whatsappCountryCode:{type:String},
    alternateNumber: { type: String },
    countryCode: { type: String },
    address: { type: String },
    email: { type: String },
    password: { type: String },
    is_phone_verified: { type: Boolean, default: false },
    isPassword:{type: Boolean, default: false},
    userType: { type: String },
    vendorCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'vendorCategoryModel' }],
    profileImage:{type:String},
    
    //LEVEL 2
    iscompany: { type: String },
    companyName: { type: String },
    isGst: { type: String},
    gstNo: { type: String},
    buildingNo: { type: String },
    locality: { type: String },
    district: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: Number },
    link:{type:String},
    recentSearch:[{
        
    }],
    location: {
        type: [Number],
        index: { type: '2dsphere', sparse: true }
    },
    level: { type: Number, default: 0 },//For vendor and agents,max 4
    agentId: { type: mongoose.Schema.Types.ObjectId, ref: 'agentModel' },
    vendorId: { type: mongoose.Schema.Types.ObjectId, ref: 'vendorModel' },
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'customerModel' },
    verificationStatus: { type: String, default: "Pending" }, //Pending,Verified,Blocked
    verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    status: { type: String, default: "Active" }//Deleted,Rejected
},



    { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model("userModel", userModelSchema);
