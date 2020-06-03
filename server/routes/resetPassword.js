const express = require('express');
const crypto = require('crypto');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');

require('dotenv').config();

const router = express.Router();

router.get('/api/reset', (req, res) => {
  User.findOne({
    resetPasswordToken: req.query.resetPasswordToken,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }).then((user) => {
    if (user == null) {
      console.error('password reset link is invalid or has expired');
      res.status(403).send('password reset link is invalid or has expired');
    } else {
      res.status(200).send({
        email: user.email
      });
    }
  });
});

module.exports = router;
