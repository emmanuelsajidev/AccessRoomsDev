const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const agentModelSchema = new mongoose.Schema({

//LEVEL 1
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    agentRole:{type:String,default:"Agent"},

//LEVEL 2
    agentIdProofFront: { type: String},
    agentIdProofBack: { type: String},
    agentGSTProof: { type: String}
    // agentCompanyName: { type: String },
    // agentGSTregistered: { type: String },    //YES OR NO
    // agentGSTNo: { type: Number, default: "NILL." },
    // agentCompanyAddress: { type: String },
    // agentCompanyEmail: { type: String },
    // agentCompanyPhoneNumber: { type: String },
    // agentCompanyLocation: { type: String },
    // bankDetails:{
    //     bankName:{type:String},
    //     acno:{type:Number},
    //     ifsc:{type:String},
    //     branchName:{type:String},
    //     accHolderName:{type:String},
    //     bankProof:{type:String}    
    // },
  

},
{ timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model("agentModel", agentModelSchema);
