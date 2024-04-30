var nodemailer = require('nodemailer');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const env = require('../config/config.gmail.env');
const path = require('path')
const fs = require('fs');
const Misc = require('./Misc')
const { Readable } = require('stream');

const oauth2Client = new OAuth2(
  env.ClientID, // ClientID
  env.client_secret, // Client Secret
  env.redirect_url // Redirect URL
);

oauth2Client.setCredentials({
  refresh_token: env.refresh_token
});

const accessToken = null;//oauth2Client.getAccessToken();

function sendemail(sender, subject, mssg) {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: env.emailId,
      clientId: env.ClientID,
      clientSecret: env.client_secret,
      refreshToken: env.refresh_token,
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // var transporter = nodemailer.createTransport(smtpTransport({
  //   service: 'gmail',
  //   host: 'smtp.gmail.com',
  //   auth: {
  //     user: 'hawkkerala@gmail.com',
  //     pass: 'periyar123'
  //   }
  // }));

  var mailOptions = {
    from: env.emailId,
    to: sender,
    subject: subject,
    html: mssg,
    attachments: [
      {
        filename: 'bookingTicket.pdf',
        content: pdfBuffer,
        encoding: 'base64',
      },
    ]
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

async function readEmailTemplate(template_name, params)//params=[{variable:value},{variable:value},...]
{
  var content = "nodata";
  var tries = 0;
  var filepath = "./EmailTemplates/" + template_name + ".html"
  var root = process.cwd();
  var filepath = path.join(root, filepath);

  content = fs.readFileSync(filepath, 'utf-8', 'r');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  do {
    await sleep(500);
    tries++;
    if (tries > 20) {
      //10 secs & yet not fully read
      return null;
    }
  } while (content === "nodata");

  if (Misc.isnullorempty(params)) {
    return content;
  }

  var keys = Object.keys(params);
  if (Misc.isnullorempty(keys)) {
    return content;
  }

  for (var i = 0; i < keys.length; i++) {
    var val = params[keys[i]];
    var old = "{" + keys[i] + "}";
    var rep = new RegExp(old, "gi");
    content = content.replace(rep, val);
  }

  return content;
}


//////////////////BOOKING SUCCESS EMAIL//////////
async function readEmailBookingSuccessTemplate(template_name, params)//params=[{variable:value},{variable:value},...]
{
  var content = "nodata";
  var tries = 0;
  var filepath = "./EmailTemplates/" + template_name + ".html"
  var root = process.cwd();
  var filepath = path.join(root, filepath);

  content = fs.readFileSync(filepath, 'utf-8', 'r');

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  do {
    await sleep(500);
    tries++;
    if (tries > 20) {
      //10 secs & yet not fully read
      return null;
    }
  } while (content === "nodata");

  if (Misc.isnullorempty(params)) {
    return content;
  }

  var keys = Object.keys(params);
  if (Misc.isnullorempty(keys)) {
    return content;
  }

  for (var i = 0; i < keys.length; i++) {
    var val = params[keys[i]];
    var old = "{" + keys[i] + "}";
    var rep = new RegExp(old, "gi");
    content = content.replace(rep, val);
  }

  return content;
}

async function sendHtmlEmailWithAttachment(to, subject, body, doc, filename) {
  console.log("yess")
  var sender = to;
  var mssg = body;
  let buffers = [];

  const inStream = new Readable({
    read() { }
  });

  doc.pipe(inStream)
  doc.end()

  inStream.on('data', buffers.push.bind(buffers));
  inStream.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    console.log("buffer length:" + buffers.length)

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env.emailId,
        clientId: env.ClientID,
        clientSecret: env.client_secret,
        refreshToken: env.refresh_token,
        accessToken: accessToken
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    console.log("to:" + sender)
    console.log(filename)
    var mailOptions = {
      from: env.emailId,
      to: sender,
      subject: subject,
      html: mssg,
      attachments: [
        {
          filename: 'bookingTicket.pdf',
          content: pdfBuffer,
          encoding: 'base64',
      },
      ]
      // attachments: attachment,
    };


    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  });
}

async function sendHtmlEmail(to, subject, body) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: env.emailId,
      clientId: env.ClientID,
      clientSecret: env.client_secret,
      refreshToken: env.refresh_token,
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: env.emailId,
    to: to,
    subject: subject,
    html: body,
    // attachments: attachment,
  };


  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

async function sendHtmlEmailWithAttachment2(to, subject, body, documentname, filename, deletefile = false) {
  var sender = to;
  var mssg = body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: env.emailId,
      clientId: env.ClientID,
      clientSecret: env.client_secret,
      refreshToken: env.refresh_token,
      accessToken: accessToken
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  console.log("to:" + sender)
  console.log(filename)
  var mailOptions = {
    from: env.emailId,
    to: sender,
    subject: subject,
    html: mssg,
    attachments: [
      {
        filename: 'bookingTicket.pdf',
        content: pdfBuffer,
        encoding: 'base64',
    },
    ]
    // attachments: attachment,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      if (deletefile == true) {
        fs.unlink(documentname, function (err) {
          if (err) return console.log(err);
          console.log('file deleted successfully');
        });
      }

    }
  });
}

module.exports = {
  sendemail: sendemail,
  readEmailTemplate: readEmailTemplate,
  sendHtmlEmail: sendHtmlEmail,
  sendHtmlEmailWithAttachment: sendHtmlEmailWithAttachment,
  sendHtmlEmailWithAttachment2: sendHtmlEmailWithAttachment2,
  readEmailBookingSuccessTemplate: readEmailBookingSuccessTemplate
}