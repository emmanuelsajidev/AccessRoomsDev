const express = require("express");
const router = express();
const Misc = require("../controllers/Misc");
const adminAuth = require("../middleware/adminAuth");
const locationModel = require("../models/locationModel");
const subLocationModel = require("../models/subLocationModel");
const ifToken = require("../middleware/ifToken");
const imageHelper = require("../controlize/imageHelperS3");
const upload = imageHelper.upload;
const galleryModel = require("../models/galleryModel");


router.get("/location/list", async (req, res) => {
  var data = await locationModel.find({ status:"Active",_id: { $ne: "6567265e8831e05bfd738ecb" }}).sort({ create_date: -1 });
  res.status(200).json({
    status: true,
    data: data,
    msg: "Success",
  });
});
router.post("/location/add", adminAuth, async (req, res) => {
  try {
    var { name, description } = req.body;

    if (Misc.isnullorempty(name)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Name",
      });
      return;
    }
    if (Misc.isnullorempty(description)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Description",
      });
      return;
    }
   // var recheckname = name.trim();
    // if (Misc.isnullorempty(recheckname)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide Name",
    //   });
    //   return;
    // }
    // recheckname=recheckname.toUpperCase();
    var existingCategory = await locationModel.findOne({
      name:{ $regex: new RegExp("^" + name + "$", "ig") },
      status: "Active",
    });
    if (!Misc.isnullorempty(existingCategory)) {
      res.status(200).json({
        status: false,
        msg: "Name already exists",
      });
      return;
    }

    var location = new locationModel();
    location.name = name;
    location.description = description;
    location.addedBy = req.user.id;
    await location.save();

    res.status(200).json({
      status: true,
      data: location,
      msg: "Added Successfully",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});
// Editing of a category

router.post("/location/edit", adminAuth, async (req, res) => {
  try {
    var { name, id, description } = req.body;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var locationedit = await locationModel.findOne({
      _id: id,
      status: "Active",
    });
    if (Misc.isnullorempty(locationedit)) {
      res.status(200).json({
        status: false,
        msg: "location not found",
      });
      return;
    }
    //var recheckname = name.trim();
    // if (Misc.isnullorempty(recheckname)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide Name",
    //   });
    //   return;
    // }
    // recheckname=recheckname.toUpperCase();
    var catrgyname = await locationModel.findOne({
      _id: { $ne: id },
      name:{ $regex: new RegExp("^" + name + "$", "ig") },
      status: "Active",
    });
    if (!Misc.isnullorempty(catrgyname)) {
      res.status(200).json({
        status: false,
        msg: "name already there",
      });
      return;
    }

    if (!Misc.isnullorempty(name)) {
      locationedit.name = name;
    }
    if (!Misc.isnullorempty(description)) {
      locationedit.description = description;
    }
    await locationedit.save();
    res.status(200).json({
      status: true,
      msg: "Updated Successfully",
      data: locationedit,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});

//Deletion of a category

router.get("/location/delete", adminAuth, async (req, res) => {
  try {
    var { id } = req.query;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var locationdelete = await locationModel.findOne({
      _id: id,
      status: "Active",
    });

    if (Misc.isnullorempty(locationdelete)) {
      res.status(200).json({
        status: false,
        msg: "data not found",
      });
      return;
    }

    locationdelete.status = "Deleted";
    //await locationdelete.save();
    res.status(200).json({
      status: true,
      msg: "Deleted",
      data: locationdelete,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});
router.post(
  "/location/singleimageupload",
  adminAuth,
  upload.fields([{ name: "photo", maxCount: 1 }]),
  async (req, res) => {
    try {
      // if (!req.files.photo) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "photo is empty",
      //   });
      //   return;
      // }

      const { id } = req.body;
      data = await locationModel.findById(id);
      if (!data) {
        res.status(200).json({
          status: false,
          msg: "failed to find  data",
        });
        return;
      }

      if (req.files) {
        if (req.files.photo) {
          data.photo = req.files.photo[0].key;
        }
        await data.save();
      }

      res.status(200).json({
        status: true,
        id: data._id,
        data: data,
        msg: "image added successfully",
      });

      return;
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: false,
        msg: "internal server error",
      });
      return;
    }
  }
);
router.post("/location/sub/add", adminAuth, async (req, res) => {
  try {
    var { locationId, name } = req.body;

    if (Misc.isnullorempty(locationId)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide  locationId",
      });
      return;
    }
    if (Misc.isnullorempty(name)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Name",
      });
      return;
    }
    var categoryfind = await locationModel.findOne({
      _id: locationId,
      status: "Active",
    });
    if (Misc.isnullorempty(categoryfind)) {
      res.status(200).json({
        status: false,
        msg: " invalid location",
      });
      return;
    }
   // var recheckname = name.trim();
    // if (Misc.isnullorempty(recheckname)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide Name",
    //   });
    //   return;
    // }
    var catrgy = await subLocationModel.findOne({
      /*_id:categoryfind._id,*/ locationId: locationId,
      name:{ $regex: new RegExp("^" + name + "$", "ig") },
      status: "Active",
    });
    if (!Misc.isnullorempty(catrgy)) {
      res.status(200).json({
        status: false,
        msg: "location already there",
      });
      return;
    }

    var location = new subLocationModel();
    location.name = name;
    location.locationId = locationId;
    location.addedBy = req.user.id;
    await location.save();

    res.status(200).json({
      status: true,
      msg: "Added Successfully",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});

router.post("/location/sub/edit", adminAuth, async (req, res) => {
  try {
    var { name, id} = req.body;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var Itemedit = await subLocationModel.findOne({
      _id: id,
      status: "Active",
    });
    if (Misc.isnullorempty(Itemedit)) {
      res.status(200).json({
        status: false,
        msg: "Sub location not found",
      });
      return;
    }
    // var recheckname = name.trim();
    // if (Misc.isnullorempty(recheckname)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide Name",
    //   });
    //   return;
    // }
   

    var itemname = await subLocationModel.findOne({
      _id: { $ne: id },
      name:{ $regex: new RegExp("^" + name + "$", "ig") },
      status: "Active",
    });
    if (!Misc.isnullorempty(itemname)) {
      res.status(200).json({
        status: false,
        msg: "location name already there",
      });
      return;
    }

    if (!Misc.isnullorempty(name)) {
      Itemedit.name = name;
    }
    await Itemedit.save();
    res.status(200).json({
      status: true,
      msg: "Updated Successfully",
      data: Itemedit,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});
router.get("/location/sub/list", async (req, res) => {
  try {
    var { limit, page, keyword, locationId } = req.query;
    if(Misc.isnullorempty(locationId)){
      res.status(200).json({
        status: false,
        msg: "locationId is required",
      });
      return;
    }
    var query = { status: "Active" };
    var pageNo = 0,
      dataLimit = 0;
    if (!Misc.isnullorempty(page) && !Misc.isnullorempty(limit)) {
      page = parseInt(page);
      limit = parseInt(limit);
      if (
        typeof page === "number" &&
        typeof limit === "number" &&
        page > 0 &&
        limit > 0
      ) {
        pageNo = page;
        dataLimit = limit;
      }
    }
    if (locationId) {
      query.locationId = locationId;
    }
    var data = await subLocationModel
      .find(query)
      .populate("locationId")
      .sort({ created_at: -1 })
      .skip((pageNo - 1) * limit)
      .limit(dataLimit);
    var totalLength = await subLocationModel.countDocuments(query);
    res.status(200).json({
      status: true,
      data: data,
      page: pageNo,
      limit: dataLimit,
      totalLength: totalLength,
      msg: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});
router.get("/location/sub/delete", adminAuth, async (req, res) => {
  try {
    var { id } = req.query;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var locationdelete = await subLocationModel.findOne({
      _id: id,
      status: "Active",
    });

    if (Misc.isnullorempty(locationdelete)) {
      res.status(200).json({
        status: false,
        msg: "data not found",
      });
      return;
    }

    locationdelete.status = "Deleted";
    await locationdelete.save();
    res.status(200).json({
      status: true,
      msg: "Deleted",
      data: locationdelete,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});
router.get("/location/full/details", async (req, res) => {
  try {
    var { limit, page, keyword, locationId } = req.query;
    if(Misc.isnullorempty(locationId)){
      res.status(200).json({
        status: false,
        msg: "locationId is required",
      });
      return;
    }
    var query = { status: "Active" };
    var pageNo = 0,
      dataLimit = 0;
    if (!Misc.isnullorempty(page) && !Misc.isnullorempty(limit)) {
      page = parseInt(page);
      limit = parseInt(limit);
      if (
        typeof page === "number" &&
        typeof limit === "number" &&
        page > 0 &&
        limit > 0
      ) {
        pageNo = page;
        dataLimit = limit;
      }
    }
    if (locationId) {
      query._id = locationId;
    }
    var data=await locationModel.findOne(query);
    var sublocation=await subLocationModel.find({locationId:data._id,status:"Active"}).skip((pageNo - 1) * limit).limit(dataLimit);;
    var totalLength = await subLocationModel.countDocuments({locationId:data._id,status:"Active"});
    res.status(200).json({
      status: true,
      data: data,
      sublocation:sublocation,
      page: pageNo,
      limit: dataLimit,
      totalLength: totalLength,
      msg: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});




/////////////////////////////////   GALLERY ROUTE //////////////////////

router.post("/gallery/add", adminAuth, async (req, res) => {
  try {
    var { name, description } = req.body;

    if (Misc.isnullorempty(name)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Name",
      });
      return;
    }
    if (Misc.isnullorempty(description)) {
      res.status(200).json({
        status: false,
        msg: "Please Provide Description",
      });
      return;
    }
   // var recheckname = name.trim();
    // if (Misc.isnullorempty(recheckname)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide Name",
    //   });
    //   return;
    // }
    // recheckname=recheckname.toUpperCase();
    var existingCategory = await galleryModel.findOne({
      name:{ $regex: new RegExp("^" + name + "$", "ig") },
      status: "Active",
    });
    if (!Misc.isnullorempty(existingCategory)) {
      res.status(200).json({
        status: false,
        msg: "Name already exists",
      });
      return;
    }

    var location = new galleryModel();
    location.name = name;
    location.description = description;
    location.addedBy = req.user.id;
    await location.save();

    res.status(200).json({
      status: true,
      data: location,
      msg: "Added Successfully",
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});
// Editing of a category

router.post("/gallery/edit", adminAuth, async (req, res) => {
  try {
    var { name, id, description } = req.body;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var locationedit = await galleryModel.findOne({
      _id: id,
      status: "Active",
    });
    if (Misc.isnullorempty(locationedit)) {
      res.status(200).json({
        status: false,
        msg: "location not found",
      });
      return;
    }
    //var recheckname = name.trim();
    // if (Misc.isnullorempty(recheckname)) {
    //   res.status(200).json({
    //     status: false,
    //     msg: "Please Provide Name",
    //   });
    //   return;
    // }
    // recheckname=recheckname.toUpperCase();
    var catrgyname = await galleryModel.findOne({
      _id: { $ne: id },
      name:{ $regex: new RegExp("^" + name + "$", "ig") },
      status: "Active",
    });
    if (!Misc.isnullorempty(catrgyname)) {
      res.status(200).json({
        status: false,
        msg: "name already there",
      });
      return;
    }

    if (!Misc.isnullorempty(name)) {
      locationedit.name = name;
    }
    if (!Misc.isnullorempty(description)) {
      locationedit.description = description;
    }
    await locationedit.save();
    res.status(200).json({
      status: true,
      msg: "Updated Successfully",
      data: locationedit,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
      e,
    });
  }
});
router.post(
  "/gallery/singleimageupload",
  adminAuth,
  upload.fields([{ name: "photo", maxCount: 1 }]),
  async (req, res) => {
    try {
      // if (!req.files.photo) {
      //   res.status(200).json({
      //     status: false,
      //     msg: "photo is empty",
      //   });
      //   return;
      // }

      const { id } = req.body;
      data = await galleryModel.findById(id);
      if (!data) {
        res.status(200).json({
          status: false,
          msg: "failed to find  data",
        });
        return;
      }

      if (req.files) {
        if (req.files.photo) {
          data.photo = req.files.photo[0].key;
        }
        await data.save();
      }

      res.status(200).json({
        status: true,
        id: data._id,
        data: data,
        msg: "image added successfully",
      });

      return;
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: false,
        msg: "internal server error",
      });
      return;
    }
  }
);
router.get("/gallery/list", /*adminAuth,*/ async (req, res) => {
  try {
    var { limit, page } = req.query;
    var query={ status: "Active"}
    var pageNo = 1,
      dataLimit = 10;
    if (!Misc.isnullorempty(page) && !Misc.isnullorempty(limit)) {
      page = parseInt(page);
      limit = parseInt(limit);
      if (
        typeof page === "number" &&
        typeof limit === "number" &&
        page > 0 &&
        limit > 0
      ) {
        pageNo = page;
        dataLimit = limit;
      }
    }
  
    var data = await galleryModel.aggregate([
      { $match: query },
      { $sort: { create_date: -1 } }, 
      { $skip: (pageNo - 1) * dataLimit },
      { $limit: dataLimit },
    ]);
    var totalLength = await galleryModel.countDocuments(query);
    res.status(200).json({
      status: true,
      data: data,
      page: pageNo,
      limit: dataLimit,
      totalLength: totalLength,
      msg: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});
router.get("/gallery/details", async (req, res) => {
  try {
    var { limit, page, keyword, galleryId } = req.query;
    if(Misc.isnullorempty(galleryId)){
      res.status(200).json({
        status: false,
        msg: "galleryId is required",
      });
      return;
    }
    var query = { status: "Active" };
    var pageNo = 0,
      dataLimit = 0;
    if (!Misc.isnullorempty(page) && !Misc.isnullorempty(limit)) {
      page = parseInt(page);
      limit = parseInt(limit);
      if (
        typeof page === "number" &&
        typeof limit === "number" &&
        page > 0 &&
        limit > 0
      ) {
        pageNo = page;
        dataLimit = limit;
      }
    }
    if (galleryId) {
      query._id = galleryId;
    }
    var data=await galleryModel.findOne(query);
    res.status(200).json({
      status: true,
      data: data,
      msg: "Success",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({
      status: false,
      msg: "internal error",
    });
  }
});
module.exports = router;
