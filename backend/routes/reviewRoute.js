const express = require("express");
const router = express();
var jwt = require("jsonwebtoken");
const Misc = require("../controllers/Misc");
const mongoose = require("mongoose");
const tokenModel = require("../models/tokenModel");
const ifToken = require("../middleware/ifToken");
const userModel = require("../models/userModel");
const reviewModel=require("../models/reviewModel");
const houseBoatModel=require("../models/houseBoatModel");
const shikaraModel=require("../models/shikaraModel");



async function updatehbrating(houseBoatId)
{
    try
    {
        var p=await houseBoatModel.findById(houseBoatId);
        if(p)
        {
            var rws = await reviewModel.find({ status: "Active",/* approved: true,*/ houseBoatId: houseBoatId });
                    if (rws) {
                        var num = rws.length;
                        var rt = 0;
                        for (var j = 0; j < rws.length; j++) {
                            rt = rt + rws[j].rating
                        }
                        var avg = parseFloat(rt) / parseFloat(num);
                        if(isNaN(avg))
                        avg=null;
                        p.rating = avg;
                        p.ratingcount = num;
                    }
                    else
                    {
                        p.rating=0;
                        p.ratingcount=0;
        
                    }
        }
        return p;
    }
    catch(e)
    {
        console.log(e);
    }
}

async function updateskrating(shikaraId)
{
    try
    {
        var p=await shikaraModel.findById(shikaraId);
        if(p)
        {
            var rws = await reviewModel.find({ status: "Active",/* approved: true,*/ shikaraId: shikaraId });
                    if (rws) {
                        var num = rws.length;
                        var rt = 0;
                        for (var j = 0; j < rws.length; j++) {
                            rt = rt + rws[j].rating
                        }
                        var avg = parseFloat(rt) / parseFloat(num);
                        if(isNaN(avg))
                        avg=null;
                        p.rating = avg;
                        p.ratingcount = num;
                    }
                    else
                    {
                        p.rating=0;
                        p.ratingcount=0;
                    }
        }
        return p;
    }
    catch(e)
    {
        console.log(e);
    }
}
router.post('/review/add/houseboat', ifToken,async (req, res) => {

       var { houseBoatId, rating, comment } = req.body;
       var userid = req.user.id;

        try {
            if (Misc.isnullorempty(houseBoatId)){
                  res.status(200).json({
                      status: false,
                      msg: "Please provide houseBoatId"
                  })
                  return;
              }
  
          var data = await houseBoatModel.findOne({ _id: houseBoatId, status: "Active" })
            if (Misc.isnullorempty(data)){
                res.status(200).json({
                    status: false,
                    msg: "houseboat not found"
                })
                return;
            }

            if (rating) {
                if (typeof rating === "string")
                    rating = parseInt(rating)
                if (rating < 1 || rating > 5) {
                    res.status(200).json({
                        status: false,
                        msg: "rating should be 1 to 5"
                    })
                    return;
                }
            }

            var rw = await reviewModel.findOne({ status: 'Active', user: userid, houseBoatId: houseBoatId })
            if (!Misc.isnullorempty(rw)) {
                if(rating)
                {
                    rw.rating=rating;
                }
                if(comment)
                rw.comment=comment;
                await rw.save();
                var hb=await updatehbrating(houseBoatId)
                await hb.save();
                

                res.status(200).json({
                    status: true,
                    id: rw._id,
                    msg: "updated"
                })
                return;
            }

            var rw = reviewModel({
                houseBoatId: houseBoatId,
                user: userid,
                type:req.user.user.role,
            });

            if (rating)
                rw.rating = rating;
            if (comment)
                rw.comment = comment;

            await rw.save();
            var hb=await updatehbrating(houseBoatId)
            await hb.save();

            res.status(200).json({
                status: true,
                id: rw._id,
                msg: 'Review added'
            });

        } catch (e) {
            console.log(e);
            res.status(200).json({
                status: false,
                msg: "internal server error",
            });

        }
    })

router.get('/review/checkduplicate',
    ifToken,
    async (req, res) => {
        try {
            
            const { houseBoatId } = req.query;
             const userid = req.user.id;
            if (Misc.isnullorempty(houseBoatId)){
                  res.status(200).json({
                      status: false,
                      msg: "Please provide houseBoatId"
                  })
                  return;
              }
            var query = { status: 'Active', user: userid, houseBoatId: houseBoatId }
            var rw = await reviewModel.findOne(query)
            if (!Misc.isnullorempty(rw)){
                res.status(200).json({
                    status: false,
                    msg: "user already rated this product"
                })
                return;
            }
            else {
                res.status(200).json({
                    status: true,
                    msg: "user have not rated for this product"
                })
                return;
            }

        }
        catch (e) {
             console.log(e);
            res.status(200).json({
                status: false,
                msg: "internal error"
            })
        }
    })


    router.get('/review/all',
    async (req, res) => {
        try {
            var d = await reviewModel.find({ status: "Active", approved: true }).limit(3).sort({ created_at: -1 }).populate("user", { password: 0 });
            if (d === undefined || d === null) {
                res.status(200).json({
                    status: false,
                    msg: "no data found"
                });
                return;
            }
            if (d.length > 0) {
                res.status(200).json({
                    status: true,
                    data: d,
                    msg: "done"
                })
                return;
            }
            else {
                res.status(200).json({
                    status: false,
                    msg: "no data found"
                })
            }
        }
        catch (e) {
            console.log(e);
            res.status(200).json({
                status: false,
                msg: "internal error"
            })
        }
    })

//gets all reviews of the user that have status true and admin approved
router.get('/review/myreviews',
    ifToken,
    async (req, res) => {
        try {

            const userid = req.user.id;
            var {houseBoatId}=req.query;

            var query={ status: "Active", approved: true, user: userid }
            if(houseBoatId)
            query.houseBoatId=houseBoatId;
            var d = await reviewModel.findOne(query);
            if (d === undefined || d === null) {
                res.status(200).json({
                    status: false,
                    msg: "no data found"
                });
                return;
            }
            if (!Misc.isnullorempty(d)) {
                res.status(200).json({
                    status: true,
                    data: d,
                    msg: "done"
                })
                return;
            }
            else {
                res.status(200).json({
                    status: false,
                    msg: "no data found"
                })
            }
        }
        catch (e) {
            console.log(e);
            res.status(200).json({
                status: false,
                msg: "internal error"
            })
        }
    })

    router.get('/review/product/myreviews',
   ifToken,
    async (req, res) => {
        try {
           

            const userid = req.user.id;
            const houseBoatId=req.query.houseBoatId;

            if (Misc.isnullorempty(houseBoatId)){
                  res.status(200).json({
                      status: false,
                      msg: "Please providehouseBoatId"
                  })
                  return;
              }
            var d = await reviewModel.findOne({ status: "Active", approved: true, user: userid,houseBoatId:houseBoatIdq });
            if (d === undefined || d === null) {
                res.status(200).json({
                    status: false,
                    msg: "no data found"
                });
                return;
            }
                res.status(200).json({
                    status: true,
                    data: d,
                    msg: "done"
                })
            
        }
        catch (e) {
            console.log(e);
            res.status(200).json({
                status: false,
                msg: "internal error"
            })
        }
    })


//gets all reviews that have status true and admin approved for a product
router.get('/review/productwise',ifToken,
    async (req, res) => {
        try {
            var userid = null;
            if (req.user) {
                userid = req.user.id
            }
            var productid = req.query.productid;
            var commentcount=0;
            var onestar = 0, twostar = 0, threestar = 0, fourstar = 0, fivestar = 0;
            var d = await reviewModel.find({ status: "Active", approved: true, product: productid }).populate("user", { password: 0 });
            if (d === undefined || d === null) {
                res.status(200).json({
                    status: false,
                    msg: "no data found"
                });
                return;
            }
            if (d.length > 0) {
                var d = JSON.parse(JSON.stringify(d))
                var mine = null;
                var num = d.length;
                var rt = 0;
                for (var i = 0; i < d.length; i++) {
                    if(!Misc.isNullOrUndefined(d[i].comment))
                    commentcount++;
                    rt = rt + d[i].rating
                    if (d[i].rating < 2)
                        onestar++;
                    else
                        if (d[i].rating < 3)
                            twostar++
                        else
                            if (d[i].rating < 4)
                                threestar++
                            else
                                if (d[i].rating < 5)
                                    fourstar++
                                else
                                    if (d[i].rating < 6)
                                        fivestar++
                    if (userid)
                        if (d[i].user._id == userid) {
                            mine = d.splice(i, 1)
                            if(mine.length>0)
                            mine=mine[0];
                        }
                }
                if (!(mine === null))
                    d.unshift(mine)
                var avg = parseFloat(rt) / parseFloat(num);
                res.status(200).json({
                    status: true,
                    data: d,
                    count: num,
                    commentcount:commentcount,
                    avg: avg,
                    onestarcount: onestar,
                    twostarcount: twostar,
                    threestarcount: threestar,
                    fourstarcount: fourstar,
                    fivestarcount: fivestar,
                    msg: "done"
                })
            }
            else {
                res.status(200).json({
                    status: false,
                    msg: "no data found"
                })
            }
        }
        catch (e) {
            Misc.logerror(e, req);
            console.log(e);
            res.status(200).json({
                status: false,
                msg: "internal error"
            })
        }
    })
/////////////////////// SHIKARA //////////////////////////
router.post('/review/add/shikara', ifToken,async (req, res) => {

    var { shikaraId, rating, comment } = req.body;
    var userid = req.user.id;

     try {
         if (Misc.isnullorempty(shikaraId)){
               res.status(200).json({
                   status: false,
                   msg: "Please provide shikaraId"
               })
               return;
           }

       var data = await shikaraModel.findOne({ _id: shikaraId, status: "Active" })
         if (Misc.isnullorempty(data)){
             res.status(200).json({
                 status: false,
                 msg: "shikara not found"
             })
             return;
         }

         if (rating) {
             if (typeof rating === "string")
                 rating = parseInt(rating)
             if (rating < 1 || rating > 5) {
                 res.status(200).json({
                     status: false,
                     msg: "rating should be 1 to 5"
                 })
                 return;
             }
         }

         var rw = await reviewModel.findOne({ status: 'Active', user: userid, shikaraId: shikaraId })
         if (!Misc.isnullorempty(rw)) {
             if(rating)
             {
                 rw.rating=rating;
             }
             if(comment)
             rw.comment=comment;
             await rw.save();
             
             var sk=await updateskrating(shikaraId)
             await sk.save();

             res.status(200).json({
                 status: true,
                 id: rw._id,
                 msg: "updated"
             })
             return;
         }

         var rw = reviewModel({
             shikaraId: shikaraId,
             user: userid,
             type:req.user.user.role,
         });

         if (rating)
             rw.rating = rating;
         if (comment)
             rw.comment = comment;

         await rw.save();
       
         var sk=await updateskrating(shikaraId)
         await sk.save();

         res.status(200).json({
             status: true,
             id: rw._id,
             msg: 'Review added'
         });

     } catch (e) {
         console.log(e);
         res.status(200).json({
             status: false,
             msg: "internal server error",
         });

     }
 })
 router.get('/review/myreviews/shikara',
    ifToken,
    async (req, res) => {
        try {

            const userid = req.user.id;
            var {shikaraId}=req.query;

            var query={ status: "Active", approved: true, user: userid }
            if(shikaraId)
            query.shikaraId=shikaraId;
            var d = await reviewModel.findOne(query);
            if (d === undefined || d === null) {
                res.status(200).json({
                    status: false,
                    msg: "no data found"
                });
                return;
            }
            if (!Misc.isnullorempty(d)) {
                res.status(200).json({
                    status: true,
                    data: d,
                    msg: "done"
                })
                return;
            }
            else {
                res.status(200).json({
                    status: false,
                    msg: "no data found"
                })
            }
        }
        catch (e) {
            console.log(e);
            res.status(200).json({
                status: false,
                msg: "internal error"
            })
        }
    })
module.exports = router;