const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const tripTypeModelSchema = new mongoose.Schema({
   
    houseBoatId:{ type: mongoose.Schema.Types.ObjectId, ref: 'houseBoatModel' },
    shikaraId:{ type: mongoose.Schema.Types.ObjectId, ref: 'shikaraModel' },
    tripType:{type:String},//DayCriuse,OverNight,NightStay
    houseBoatType: [{ type: String }],//Private,Sharing
    checkInTime:{type:String},
    checkOutTime:{type:String},
    maxCapacityOfBoat:{type:String},
    maxCapacityOfBoats:{type:Number},////
    minCapacityOfBoat:{type:String},
    minCapacityOfBoats:{type:Number},////
    addionalRules:{type:String},
    mealPlan:{
        welcomeDrink: { type:Boolean,default:false },
        lunch: { type:Boolean,default:false },
        teaOrsnacks: { type:Boolean,default:false },
        dinner: { type:Boolean,default:false },
        breakfast: { type:Boolean,default:false },
    },
    maxPersonPerRoom:{type:String},
    maxPersonPerRooms:{type:Number},/////
    extraPersonPerRoom:{type:String},
    extraPersonPerRooms:{type:Number},////
    firstDayStartTime:{type:String},
    firstDayEndTime:{type:String},
    secondDayStartTime:{type:String},
    secondDayEndTime:{type:String},
    maxPersonTrip:{type:String},
    maxPersonTrips:{type:Number},////
    minPersonTrip:{type:String},
    minPersonTrips:{type:Number},////
    pickUpLocation:{type:String},
    dropLocation:{type:String},
    minimumHour:{type:String,default:"0"},
    minimumHours:{type:Number,default:0},///
    status:{type:String,default:"Active"}
},
 

    { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model("tripTypeModel", tripTypeModelSchema);
