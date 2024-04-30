const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const tripPackageModelSchema = new mongoose.Schema({
   
    houseBoatId:{ type: mongoose.Schema.Types.ObjectId, ref: 'houseBoatModel' },
    shikaraId:{type: mongoose.Schema.Types.ObjectId, ref: 'shikaraModel' },
    tripTypeId:{ type: mongoose.Schema.Types.ObjectId, ref: 'tripTypeModel' },
    packageType:{type:String,default:"Seasonal"},//OffSeasonal,Special
    startDate:{type:Date},
    endDate:{type:Date},
    customerRate:{type:Number,default:0},
    customerExtraRate:{type:Number,default:0},
    agentRate:{type:Number,default:0},
    agentExtraRate:{type:Number,default:0},
    //commission houseboat case-10%
    //commission shikara case-25%
    customerRateCommission:{type:Number,default:0},
    customerExtraRateCommission:{type:Number,default:0},
    agentRateCommission:{type:Number,default:0},
    agentExtraRateCommission:{type:Number,default:0},
    isAvailable:{type:Boolean,default:true},
    numberOfRooms:{type:Number},
    status:{type:String,default:"Active"}
},


    { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model("tripPackageModel", tripPackageModelSchema);
