// const aws = require('aws-sdk')
// const express = require('express')
// const fs = require('fs')
// var path = require('path');
// const sharp = require('sharp')
// const multerS3 = require('multer-s3')
// const multer = require('multer')
// const s3 = new aws.S3({accessKeyId: 'AKIAWTY5A5VRUP7P2UX6',secretAccessKey: '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'});

// var bucket = 'blogsstorage';


// //To upload static images
// let staticUpload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: bucket,
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             var path = require('path');
//             file.oldname = file.originalname;
//             var fname = "static" + Date.now().toString() + path.extname(file.originalname)
//             file.filename = fname;
//             cb(null, fname);
//             towpformat(keyval)
//         }
//     })
// });


// let upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: bucket,
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         metadata: function (req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req, file, cb) {
//             console.log(JSON.stringify(file.originalname))
//             var path = require('path');
//             req.oldfilename = file.originalname;
//             file.oldfilename = file.originalname;
//             file.oldname = file.originalname;
//             var keyval = Date.now().toString() + path.extname(file.originalname)
//             file.filename = keyval;
//             console.log(keyval)
//             cb(null, keyval);
//             towpformat(keyval)
//         }
//     })
// });


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './files')
//     },
//     filename: function (req, file, cb) {
//         var path = require('path');
//         req.oldfilename=file.originalname;
//         file.oldfilename=file.originalname;
//         file.oldname=file.originalname
//         var keyval=Date.now().toString()+ path.extname(file.originalname)
//         file.filename=keyval;
//         file.key=keyval;
//         cb(null,keyval);
//     }
//   })

// // var upload = multer({   
// //     storage :storage 
// // })

// // var staticUpload = multer({   
// //     storage :storage 
// // })

// let reader = async function (res, key) {
//     try {
//         await s3.getObject({ Bucket: bucket, Key: key })
//             .createReadStream()
//             .on('error', (e) => {
//                 res.status(200).json({
//                     status: false,
//                     data: null
//                 })
//             })
//             .pipe(res);

//     } catch (e) {
//         console.log(e)
//         res.status(200).json({
//             status: false,
//             msg: "internal server error"
//         });
//     }
// }

// let deletefile = async function (res, key) {
//     try {
//         //await s3.deleteObject({Bucket: bucket, Key: key})
//         if (key === "logo.png")
//             return;
//         if (key === "account.svg")
//             return;
//         if (key === "45-456898_cart-clip-art-online-shopping-logo-png-transparent.png")
//             return;
//         if (key === "images.jfif")
//             return;
//         s3.deleteObject({
//             Bucket: bucket,
//             Key: key
//         }, function (err, data) {
//             if (err)
//                 console.log(err)
//         })

//     } catch (e) {
//         console.log(e)
//         /* res.status(200).json({ 
//             status: false,
//             msg: "internal server error"
//         }); */
//     }
// }

// let getfile = async function (key) {
//     try {
//         var content = "nodata";
//         var tries = 0;
//         var filedata = null;
//         console.log(key)
//         s3.getObject({ Bucket: bucket, Key: key }, (err, dt) => {
//             if (dt === null) {
//                 //1607507291019.png
//                 console.log('file not found')
//                 s3.getObject({ Bucket: bucket, Key: key }, (err, dt2) => {
//                     if (dt2 === null) {
//                         //1607507291019.png
//                         console.log('file not found')
//                         return null;
//                     }
//                     content = true;
//                     filedata = dt2;
//                     //return dt2;
//                 })
//             }
//             else {
//                 content = true;
//                 filedata = dt;
//                 //return dt;
//             }
//         })
//         function sleep(ms) {
//             return new Promise(resolve => setTimeout(resolve, ms));
//         }
//         do {
//             await sleep(500);
//             tries++;
//             if (tries > 20) {
//                 //10 secs & yet not fully read
//                 return null;
//             }
//         } while (content === "nodata");
//         return filedata;
//     } catch (e) {
//         console.log(e)
//     }
// }



// let readFile = async function (res, key) {
//     try {
//         console.log(key)
//         s3.getObject({ Bucket: bucket, Key: key }, (err, dt) => {
//             if (dt === null) {
//                 s3.getObject({ Bucket: bucket, Key: key }, (err, dt2) => {
//                     if (dt2 === null) {
//                         res.status(200).json({
//                             msg: 'file not found'
//                         });
//                         return;
//                     }
//                     res.set('Content-Type', dt2.ContentType);
//                     res.set('Content-Length', dt2.ContentLength)
//                     res.end(dt2.Body);
//                     return;
//                 })
//             }
//             else {
//                 res.set('Content-Type', dt.ContentType);
//                 res.set('Content-Length', dt.ContentLength)
//                 res.end(dt.Body);
//                 return;
//             }
//         })
//     } catch (e) {
//         console.log(e)
//         res.status(200).json({
//             status: false,
//             msg: "internal server error"
//         });
//     }
// }



// let readLocalFile = async function (res, key) {
//     try {
//         console.log(key)
//         var contents= fs.readFileSync('./files/'+key,
//         { encoding: 'utf8'/* , flag: 'r' */ });
//         // console.log("contents: ", contents)
//         // console.log("buffer: ", Buffer.from(contents).toString('base64'))
//         if (contents === null) {
//             res.status(200).json({
//                 msg: 'file not found'
//             });
//             return;
//         }
//         // res.set('Content-Type', 'image/jpeg');
//         res.set('Content-Type', 'image/jpeg');
//         res.writeHead(200, {
//             "Content-Type": 'image/jpeg'
//         });
//         // res.set('Content-Length', contents.ContentLength)
//         res.end(contents);
//         // res.send(contents)
//         return;

//         // s3.getObject({ Bucket: bucket, Key: key }, (err, dt) => {
//         //     if (dt === null) {
//         //         s3.getObject({ Bucket: bucket, Key: key }, (err, dt2) => {
//         //             if (dt2 === null) {
//         //                 res.status(200).json({
//         //                     msg: 'file not found'
//         //                 });
//         //                 return;
//         //             }
//         //             res.set('Content-Type', dt2.ContentType);
//         //             res.set('Content-Length', dt2.ContentLength)
//         //             res.end(dt2.Body);
//         //             return;
//         //         })
//         //     }
//         //     else {
//         //         res.set('Content-Type', dt.ContentType);
//         //         res.set('Content-Length', dt.ContentLength)
//         //         res.end(dt.Body);
//         //         return;
//         //     }
//         // })
//     } catch (e) {
//         console.log(e)
//         res.status(200).json({
//             status: false,
//             msg: "internal server error"
//         });
//     }
// }




// let deleteFiles = async function (res, key) {
//     try {
//         const options = {
//             Bucket: bucket,
//             Delete: {
//                 Objects: key
//                 /*
//                     [{
//                         Key: "picture/5b55a7a6c316686bbbbc8120.jpg"
//                     },
//                     {
//                         Key: "picture/5b4c3ca0097c915e38d0d21515-09-2018_12_13_48.jpg"
//                     }
//                 ],
//                 Quiet: false
//                 */
//             }
//         };

//         s3.deleteObjects(options, function (err, data) {
//             if (err)
//                 console.log(err, err.stack);  // error
//             else
//                 console.log();                 // deleted
//         });
//     } catch (e) {
//         console.log(e)
//         res.status(200).json({
//             status: false,
//             msg: "internal server error"
//         });
//     }
// }

// let downloader = async function (res, key) {
//     try {

//         var files = []
//         s3.listObjects({ Bucket: bucket }, function (err, data) {
//             if (err) {
//                 return 'There was an error viewing your album: ' + err.message
//             } else {
//                 // console.log(data.Contents,"<<<all content");

//                 data.Contents.forEach(function (obj, index) {
//                     // console.log(obj.Key,"<<<file path")
//                     files.push(obj.Key)
//                 })
//                 console.log(files.length)

//                 files.forEach(async function (obj, index) {

//                     s3.getObject({ Bucket: bucket, Key: obj }, (err, dt) => {
//                         try {
//                             //console.log(err);
//                             if (dt === null) {
//                                 console.log("skipping " + obj)
//                                 return;
//                             }
//                             var img = dt.Body;
//                             var dest = "F:\\ptrimages\\" + obj;
//                             fs.writeFile(dest, img, function (err) {
//                                 if (err) {
//                                     console.log("error saving file " + obj)
//                                 }
//                                 console.log(obj + ' Saved!')
//                             });
//                         }
//                         catch (ex) {
//                             console.log("error: ", ex)
//                         }
//                     })
//                 })
//             }
//         })
//         console.log("success")

//     } catch (e) {
//         console.log(e)
//         res.status(200).json({
//             status: false,
//             msg: "internal server error"
//         });
//     }
// }

// let fullList = async function () {
//     try {
//         var files = []
//         var result = []
//         var marker = null;
//         var query = { Bucket: bucket }
//         var it = 1;
//         do {
//             if (marker)
//                 query.Marker = marker;
//             var data = await s3.listObjects(query).promise();
//             console.log("iteration " + it)

//             if (data.Contents) {
//                 if (data.Contents.length > 0)
//                     console.log("files: " + data.Contents.length)
//                 files = files.concat(data.Contents)
//             }

//             var isTruncated = data.IsTruncated;
//             if (isTruncated) {
//                 marker = data.Contents.slice(-1)[0].Key;
//             }
//             else {
//                 marker = null;
//             }
//             console.log(marker)
//         } while (marker != null)

//         for (var i = 0; i < files.length; i++) {
//             var name = files[i].Key
//             var sub = ""
//             if (name)
//                 sub = name.substring(0, 3);
//             if (!(sub === "wp_")) {
//                 result.push(files[i].Key)
//             }
//         }
//         return result;

//     } catch (e) {
//         console.log(e)
//     }
// }

// async function savewpimage(key) {
//     var content = "nodata";
//     try {
//         var data = null;

//         try {
//             data = await s3.getObject(
//                 { Bucket: bucket, Key: key }).promise();
//         }
//         catch (ex) {
//             console.log(ex)
//             return;
//         }

//         var orginalsize = (data.ContentLength / 1024.0)
//         orginalsize = Math.round(orginalsize)
//         console.log("orginal image size: " + orginalsize + " KB")//> 5000000
//         let dataBase64 = await data;
//         let buf = Buffer.from(dataBase64.Body);
//         Buffer.from(buf).toString('base64');

//         var ext = path.extname(key)
//         if (ext)
//             if (ext.length > 1)
//                 if (ext.startsWith('.'))
//                     ext = ext.substring(1)
//         // let result =await webp.str2webpstr(dataBase64.Body,null,"-q 80");
//         var com = await sharp(dataBase64.Body).webp({ reductionEffort: 6, quality: 10 }).toBuffer();
//         var webpimagesize = (com.length / 1024.0)
//         webpimagesize = Math.round(webpimagesize)
//         console.log("webp image size: " + webpimagesize + " KB")

//         if (webpimagesize > 400) {
//             console.log("image greaterthan 400 kb")
//             console.log("quality tolerance to 5%")
//             com = await sharp(dataBase64.Body).webp({ reductionEffort: 6, quality: 5 }).toBuffer();
//             webpimagesize = (com.length / 1024.0)
//             webpimagesize = Math.round(webpimagesize)
//             console.log("new webp image size: " + webpimagesize + " KB")
//         }

//         //buf = Buffer.from(result.replace(/^data:image\/\w+;base64,/, ""),'base64')
//         s3.putObject({
//             Bucket: bucket, Key: ('wp_' + key + ".webp"),
//             Body: com,
//             ContentType: 'image/webp'

//         }, (err, data) => {
//             if (err) {
//                 //console.log(err)
//                 content = err;
//             }
//             else
//                 //console.log(data)
//                 content = data;
//         });



//         var tries = 0;
//         do {
//             await sleep(500);
//             tries++;
//             if (tries > 20) {
//                 //10 secs & yet not fully read
//                 return null;
//             }
//         } while (content === "nodata");

//     } catch (e) {
//         console.log(e)
//     }
// }

// async function compressimage(key) {
//     var content = "nodata";
//     try {
//         const data = await s3.getObject(
//             { Bucket: bucket, Key: key }).promise();


//         let dataBase64 = await data;
//         let buf = Buffer.from(dataBase64.Body);
//         Buffer.from(buf).toString('base64');

//         var ext = path.extname(key)
//         if (ext)
//             if (ext.length > 1)
//                 if (ext.startsWith('.'))
//                     ext = ext.substring(1)

//         var com = await sharp(dataBase64.Body).webp({ reductionEffort: 6, quality: 80 }).toBuffer()
//         //let result =await webp.str2webpstr(dataBase64.Body,null,"-q 80");

//         //buf = Buffer.from(com.replace(/^data:image\/\w+;base64,/, ""),'base64')
//         s3.putObject({
//             Bucket: bucket, Key: ('test' + key + ".webp"),
//             Body: com,
//             ContentType: 'image/webp'

//         }, (err, data) => {
//             if (err) {
//                 //console.log(err)
//                 content = err;
//             }
//             else
//                 //console.log(data)
//                 content = data;
//         });



//         var tries = 0;
//         do {
//             await sleep(500);
//             tries++;
//             if (tries > 20) {
//                 //10 secs & yet not fully read
//                 return null;
//             }
//         } while (content === "nodata");

//     } catch (e) {
//         console.log(e)
//     }
// }


// let towpformat = async function (key) {
//     await sleep(1000);
//     await savewpimage(key)
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

// module.exports = { upload, staticUpload, reader, readFile, readLocalFile, /*getURL,*/ deletefile, deleteFiles, downloader, fullList, towpformat, savewpimage, compressimage };



const aws = require('aws-sdk')
const express = require('express')
const multer = require('multer')
const multerS3 = require('multer-s3')
var shortid = require('shortid');

const fs=require('fs')
// const webp=require('../webp/src/webpconverter')
// webp.grant_permission();
var path = require('path');
const sharp=require('sharp')

const s3 = new aws.S3({
    accessKeyId: process.env.S3_AWSACCESSKEYID || 'AKIAZ7ZAGNVXUC3VIDPN',
    secretAccessKey: process.env.S3_SECRETACCESSKEY || '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'
});

var bucket = process.env.S3BUCKET || 'accessrooms';
/*
var limits = {
    files: 1, // allow only 1 file per request
    fileSize: 25 * 1024 * 1024, // (replace MBs allowed with your desires)
    };
   */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let upload = multer({
    //limits: limits,
    storage: multerS3({
        s3: s3,
        bucket: bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            console.log(JSON.stringify(file.originalname))
            var path = require('path');
            file.oldname = file.originalname
            var shrt=shortid();
            var fname = Date.now().toString() + shrt + path.extname(file.originalname)
            cb(null, fname);
            towpformat(fname)
        }
    })
});


//To upload static images
let staticUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: bucket,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            var path = require('path');
            file.oldname = file.originalname;
            var shrt=shortid();
            var fname = "static" + Date.now().toString() + shrt + path.extname(file.originalname)
            cb(null, fname);
            towpformat(fname)
        }
    })
});


let reader = async function (res, key) {
    try {
        await s3.getObject({ Bucket: bucket, Key: key })
            .createReadStream()
            .on('error', (e) => {
                res.status(404).json({
                    status: false,
                    data: null
                })
            })
            .pipe(res);

    } catch (e) {
        console.log(e)
        res.status(200).json({
            status: false,
            msg: "internal server error"
        });
    }
}



let readFile = async function (res, key) {
    try {
        s3.getObject({ Bucket: bucket, Key: key }, (err, dt) => {
            if (err) {
                res.status(404).json({
                    status: false,
                    data: null
                });
                return;
            }
            res.set('Content-Type', dt.ContentType);
            res.set('Content-Length', dt.ContentLength)
            res.end(dt.Body);
            return;
        })
    } catch (e) {
        console.log(e)
        res.status(200).json({
            status: false,
            msg: "internal server error"
        });
    }
}



/*
let getURL = async function (res, key) {
    try {
        s3.getSignedUrl('getObject', { Bucket: bucket, Key: key, Expires: 200 }, function (err, url) {
            //console.log('The URL is', url);
            res.end(url);
            return;
          });

    } catch (e) {
        console.log(e)
        res.status(200).json({
            status: false,
            msg: "internal server error"
        });
    }
}
*/



let deleteFile = async function (res, key) {
    try {
        s3.deleteObject({ Bucket: bucket, Key: key }, function (err, data) {
            if (err)
                console.log(err, err.stack);  // error
            else
                console.log();                 // deleted
        });
    } catch (e) {
        console.log(e)
        res.status(200).json({
            status: false,
            msg: "internal server error"
        });
    }
}




let deleteFiles = async function (res, key) {
    try {
        const options = {
            Bucket: bucket,
            Delete: {
                Objects: key
                /*
                    [{
                        Key: "picture/5b55a7a6c316686bbbbc8120.jpg"
                    },
                    {
                        Key: "picture/5b4c3ca0097c915e38d0d21515-09-2018_12_13_48.jpg"
                    }
                ],
                Quiet: false
                */
            }
        };

        s3.deleteObjects(options, function (err, data) {
            if (err)
                console.log(err, err.stack);  // error
            else
                console.log();                 // deleted
        });
    } catch (e) {
        console.log(e)
        res.status(200).json({
            status: false,
            msg: "internal server error"
        });
    }
}



//////////////////
let getfile= async function(key){
    try {
        var content="nodata";
        var tries=0;
        var filedata=null;
        console.log(key)
        s3.getObject({Bucket: bucket, Key: key},(err,dt)=>{
            if(dt===null)
            {
                //1607507291019.png
                console.log('file not found')
                s3.getObject({Bucket: bucket, Key:key},(err,dt2)=>{
                    if(dt2===null)
                    {
                        //1607507291019.png
                        console.log('file not found')
                        return null;
                    }
                    content=true;
                    filedata=dt2;
                    //return dt2;
                })
            }
            else
            {
                content=true;
                filedata=dt;
                //return dt;
            }
        })
        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        do {
            await sleep(500);
            tries++;
            if(tries>20)
            {
                //10 secs & yet not fully read
                return null;
            }
        } while (content === "nodata");
        return filedata;
    } catch (e) {
        console.log(e)
    }
}



let readtheFile = async function(res,key){
    try {
        console.log(key)
        s3.getObject({Bucket: bucket, Key: key},(err,dt)=>{
            if(dt===null)
            {
                s3.getObject({Bucket: bucket, Key: key},(err,dt2)=>{
                    if(dt2===null)
                    {
                        key=key.replace('wp_','');
                        key=key.replace('.webp','');
                        readFile(res,key)
                        // res.status(200).json({
                        //     status: false,
                        //     msg:'file not found'
                        // });
                        return;
                    }
                    res.set('Content-Type',dt2.ContentType);
                    res.set('Content-Length',dt2.ContentLength)
                    res.end(dt2.Body);
                    return;
                })
            }
            else
            {
                res.set('Content-Type',dt.ContentType);
                res.set('Content-Length',dt.ContentLength)
                res.end(dt.Body);
                return;
            }
        })
    } catch (e) {
        console.log(e)
        res.status(200).json({ 
            status: false,
            msg: "internal server error"
        });
    }
}


let downloader = async function (res, key) {
    try {
        
        var files = []
        s3.listObjects({ Bucket: bucket }, function(err, data) {
            if (err) {
                return 'There was an error viewing your album: ' + err.message
            }else{
                // console.log(data.Contents,"<<<all content");

                data.Contents.forEach(function(obj,index){
                    // console.log(obj.Key,"<<<file path")
                    files.push(obj.Key)
                })
                //console.log(files.length)

                files.forEach(async function(obj,index){
       
                    s3.getObject({Bucket: bucket, Key: obj},(err,dt)=>{
                        try
                        {
                            //console.log(err);
                            if (dt === null) {
                                console.log("skipping "+obj)
                                return;
                            }
                            var img=dt.Body;
                            var dest="F:\\imagesfroms3\\"+obj;
                            fs.writeFile(dest, img, function (err) {
                                if (err)
                                {
                                    console.log("error saving file "+obj)
                                }
                                console.log(obj+' Saved!')
                              });
                        }
                        catch(ex)
                        {
                            console.log("error: ",ex)
                        }
                    })
                })
            }
        })
        //console.log("success")

    } catch (e) {
        console.log(e)
        res.status(200).json({
            status: false,
            msg: "internal server error"
        });
    }
}

let fullList = async function () {
    try {
        var files = []
        var result=[]
        var marker=null;
        var query={ Bucket: bucket }
        var it=1;
        do {
            if(marker)
            query.Marker=marker;
            var data = await s3.listObjects(query).promise();
            console.log("iteration "+it)

            if (data.Contents) {
                if (data.Contents.length > 0)
                console.log("files: "+data.Contents.length)
                    files = files.concat(data.Contents)
            }

            var isTruncated = data.IsTruncated;
            if (isTruncated) {
                marker = data.Contents.slice(-1)[0].Key;
            }
            else {
                marker = null;
            }
            console.log(marker)
        } while (marker != null)
        
        for(var i=0;i<files.length;i++)
        {
            var name=files[i].Key
            var sub=""
            if(name)
            sub=name.substring(0,3);
            if(!(sub==="wp_"))
            {
                result.push(files[i].Key)
            }
        }
        return result;

    } catch (e) {
        console.log(e)
    }
}

async function savewpimage(key)
{
    var content="nodata";
    try {
        const data = await s3.getObject(
            {Bucket: bucket, Key: key}).promise();
            var orginalsize=(data.ContentLength/1024.0)
            orginalsize=Math.round(orginalsize)
            console.log("orginal image size: "+orginalsize+" KB")//> 5000000
            let dataBase64 = await data;
            let buf = Buffer.from(dataBase64.Body);
            Buffer.from(buf).toString('base64');

            var ext=path.extname(key)
            if(ext)
            if(ext.length>1)
            if(ext.startsWith('.'))
            ext=ext.substring(1)
           // let result =await webp.str2webpstr(dataBase64.Body,null,"-q 80");
           var com=await sharp(dataBase64.Body).webp({ reductionEffort: 6,quality: 80 }).toBuffer();
           var webpimagesize=(com.length/1024.0)
           webpimagesize=Math.round(webpimagesize)
           console.log("webp image size: "+webpimagesize+" KB")

           if(webpimagesize>100)
           {
               console.log("image greaterthan 100 kb")
               console.log("quality tolerance to 20%")
               com=await sharp(dataBase64.Body).webp({ reductionEffort: 6,quality: 20 }).toBuffer();
               webpimagesize=(com.length/1024.0)
               webpimagesize=Math.round(webpimagesize)
               console.log("new webp image size: "+webpimagesize+" KB")
           }

           //buf = Buffer.from(result.replace(/^data:image\/\w+;base64,/, ""),'base64')
                s3.putObject({
                    Bucket: bucket, Key: ('wp_'+key+".webp"),
                    Body: com,
                    ContentType: 'image/webp'
    
                }, (err, data) => {
                    if (err) {
                        //console.log(err)
                        content=err;
                    }
                    else
                        //console.log(data)
                        content=data;
                });      


        
        var tries=0;
        do {
            await sleep(500);
            tries++;
            if(tries>20)
            {
                //10 secs & yet not fully read
                return null;
            }
        } while (content === "nodata");

    } catch (e) {
        console.log(e)
    }
}


let towpformat = async function (key) {
    await sleep(10000);
    await savewpimage(key)
}


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // if (file.fieldname === "profile") {
        //     cb(null, './uploads/profiles/')
        // }
        // else if (file.fieldname === "natid") {
        //     cb(null, './uploads/ids/');
        // }
        // else if (file.fieldname === "certificate") {
        //     cb(null, './uploads/certificates/')
        // }
        cb(null, 'files/')
    },
    filename: (req, file, cb) => {
        // if (file.fieldname === "profile") {
        //     cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        // }
        // else if (file.fieldname === "natid") {
        //     cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        // }
        // else if (file.fieldname === "certificate") {
        //     cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
        // }
        var shrt = shortid();
        cb(null, path.parse(file.originalname).name + Date.now().toString() + shrt + path.extname(file.originalname));
    }
});

const uploadLocal = multer({
    storage: storage,
    // limits: {
    //     fileSize: 1024 * 1024 * 10
    // }
})



module.exports = { upload, staticUpload, reader, readFile, /*getURL,*/ deleteFile, deleteFiles,  getfile,readtheFile,downloader,fullList,towpformat,savewpimage,uploadLocal };