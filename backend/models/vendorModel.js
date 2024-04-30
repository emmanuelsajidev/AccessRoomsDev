const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const vendorModelSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    vendorCategory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'vendorCategoryModel' }],
    whatsappNumber: {type:String},   //whatsapp
    whatsappCountryCode:{type:String},
    socialMediaLink:{type:String},
    voteridProof:{type:String},
    licenseProof:{type:String},
    administratorApproval: { type: String, default: "Pending" },//Success
    expiryDate:{type:Date},
    bankDetails: {
        bankName: { type: String },
        accHolderName: { type: String },
        accNo: { type: Number },
        accType: { type: String },
        ifscCode: { type: String },
        branchName: { type: String },
        upiId: { type: String },
      //  twoDocs: { type: String },
        qrCode:{type:String},
        passBook:{type:String}
    },
    status:{type:String,default:"Active"},//Active,Deleted
},


    { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model("vendorModel", vendorModelSchema);
