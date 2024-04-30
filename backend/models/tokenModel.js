const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const tokenAddressSchema = new mongoose.Schema({
    name: {
        type:mongoose.Schema.Types.ObjectId,ref:'userModel'
    },
    token: {
        type: String
    },
    role: {
        type: String
    }
});
module.exports = mongoose.model("tokenAddress", tokenAddressSchema);
