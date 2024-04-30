const express = require('express');
const { type } = require('express/lib/response');
const mongoose = require('mongoose');
//const schema =mongoose.schema;
var schemaTypes = mongoose.Schema.Types;
const vendorCategoryModelSchema = new mongoose.Schema({

    categoryType: { type: String }, //Houseboat,Shikara
    status:{ type:String, default:"Active"},
},

 { timestamps: { createdAt: 'created_at', updatedAt: "updated_at" } });

module.exports = mongoose.model("vendorCategoryModel", vendorCategoryModelSchema);
