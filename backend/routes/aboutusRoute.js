const express = require("express");
var router = express.Router();
const youtubelinkModel = require("../models/youtubelinkmodel");
const Misc = require("../controllers/Misc");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const tokenModel = require("../models/tokenModel");
const ifToken = require("../middleware/ifToken");
const userModel = require("../models/userModel");
const adminAuth = require("../middleware/adminAuth");
const aboutusModel=require("../models/aboutusModel");
//Add/update About us


/////   old routes for about us/////////////////////


router.post("/aboutus/add/edit",adminAuth, async (req, res) => {
  try {
    var { content } = req.body;

    var aboutus = await aboutusModel.findOne({ status: "Active" });
    if (Misc.isnullorempty(aboutus)) {
      if (Misc.isnullorempty(content)) {
        res.status(200).json({
          status: false,
          msg: "Invalid content",
        });
        return;
      }

      var add = new aboutusModel();

      add.name = "About us accessrooms";

      add.content = content;

      try {
        let newadd = await add.save();
        // if (Misc.isnullorempty(dbadd)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: 'Failed to add About us'
        //     });
        //     return;
        // }

        res.status(200).json({
          status: true,
          msg: "About us added successfully",
          id: newadd._id,
        });
        return;
      } catch (ex) {
        console.log(ex);
        res.status(200).json({
          status: false,
          msg: "Failed to add About us",
        });
        return;
      }
    } else {
      if (!Misc.isnullorempty(content)) {
        aboutus.content = content;
      }

      try {
        var aboutusdata = await aboutus.save();

        res.status(200).json({
          status: true,
          data: aboutusdata,
          msg: "Updated Successfully",
        });
        return;
      } catch (ex) {
        console.log(ex);
        res.status(200).json({
          status: false,
          msg: "Failed to update",
        });
        return;
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
    });
  }
});

//View About us
router.get("/aboutus/view", async (req, res) => {
  try {
    var query = { status: "Active" };
    var aboutus = await aboutusModel.findOne(query);
    if (Misc.isnullorempty(aboutus)) {
      res.status(200).json({
        status: false,
        msg: "Failed to find aboutus",
      });
      return;
    }

    res.status(200).json({
      status: true,
      msg: "Aboutus retrieved Successfully",
      aboutus: aboutus,
    });
    return;
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
    });
  }
});

// //delete
// router.post("/aboutus/delete", async (req, res) => {
//   try {
//     const { id } = req.body;

//     var aboutus = await aboutusModel.findOne({ _id: id });
//     if (Misc.isnullorempty(aboutus)) {
//       res.status(200).json({
//         status: false,
//         msg: "Failed to find ",
//       });
//       return;
//     }

//     try {
//       aboutus.status = "Deleted";

//       await aboutus.save();

//       res.status(200).json({
//         status: true,
//         msg: "Deleted successfully",
//       });
//       return;
//     } catch (ex) {
//       console.log(ex);
//       res.status(200).json({
//         status: false,
//         msg: "Failed to delete ",
//       });
//       return;
//     }
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       status: false,
//       msg: "Something went wrong",
//     });
//   }
// });


////////////////////// youtube link add//////////////////////////

router.get("/homepage/videolink/list", async (req, res) => {
  var data = await youtubelinkModel.findOne({ status:"Active" });
  res.status(200).json({
    status: true,
    data: data,
    msg: "Success",
  });
});
router.post("/homepage/videolink/add/edit",adminAuth, async (req, res) => {
  try {
    var { name, content,link } = req.body;

    var aboutus = await youtubelinkModel.findOne({ status: "Active" });
    if (Misc.isnullorempty(aboutus)) {
      if (Misc.isnullorempty(content)) {
        res.status(200).json({
          status: false,
          msg: "Invalid content",
        });
        return;
      }

      var add = new youtubelinkModel();

      add.name =name;

      add.content = content;
      add.link=link;

      try {
        let newadd = await add.save();
        // if (Misc.isnullorempty(dbadd)) {
        //     res.status(200).json({
        //         status: false,
        //         msg: 'Failed to add About us'
        //     });
        //     return;
        // }

        res.status(200).json({
          status: true,
          msg: "Link added successfully",
          id: newadd._id,
        });
        return;
      } catch (ex) {
        console.log(ex);
        res.status(200).json({
          status: false,
          msg: "Failed to add link",
        });
        return;
      }
    } else {
      if (!Misc.isnullorempty(content)) {
        aboutus.content = content;
      }
      if (!Misc.isnullorempty(link)) {
        aboutus.link = link;
      }
      if (!Misc.isnullorempty(name)) {
        aboutus.name = name;
      }
      try {
        var aboutusdata = await aboutus.save();

        res.status(200).json({
          status: true,
          data: aboutusdata,
          msg: "Updated Successfully",
        });
        return;
      } catch (ex) {
        console.log(ex);
        res.status(200).json({
          status: false,
          msg: "Failed to update",
        });
        return;
      }
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({
      status: false,
      msg: "Something went wrong",
    });
  }
});

router.get("/homepage/videolink/delete", adminAuth, async (req, res) => {
  try {
    var { id } = req.query;
    if (Misc.isnullorempty(id)) {
      res.status(200).json({
        status: false,
        msg: "Id is required",
      });
      return;
    }
    var locationdelete = await youtubelinkModel.findOne({
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


module.exports = router;
