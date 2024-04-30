const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const customerModelSchema = new mongoose.Schema({
    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'userModel' },
    status:{type:String,default:"Active"},//Active,Deleted
},


    { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model("customerModel", customerModelSchema);
