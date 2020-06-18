const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Authorization = require('../middleware/authorization');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Ads = require('../models/Ads');


router.post('/manage/reminder', [Authorization], async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'luzzzapp@gmail.com',
      pass: 'Yarden15'
    }
  });

  // Validations f the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Pull from the req.body the fields to create new schedule later on (instance)
  const { emails } = req.body;

  try {
    var mailOptions = {
      from: 'luzzzapp@gmail.com',
      to: emails.toString(),
      subject: 'תזכורת',
      html: '<h1>תזכורת</h1>' +
        '<p>נא להגיש סידורי עבודה בהקדם</p>'
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
        res.json({ msg: 'Email sent' });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/manage/general_mail', [Authorization], async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'luzzzapp@gmail.com',
      pass: 'Yarden15'
    }
  });

  // Validations f the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Pull from the req.body the fields to create new schedule later on (instance)
  const { subject, message, emails } = req.body;
  try {
    // Pull the organization of manager to know what organization field for UserSchema
    var mailOptions = {
      from: 'luzzzapp@gmail.com',
      to: emails.toString(),
      subject: subject,
      text: message
    }
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(info.response);
        res.json({ msg: 'Email sent' });
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;