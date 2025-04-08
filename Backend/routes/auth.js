const express = require('express');
const ImageKit = require('imagekit');
const router=express.Router()
require('dotenv').config()
const imagekit = new ImageKit({
    publicKey: process.env.PUBLICKEY,
    privateKey: process.env.PRAVITEKEY,
    urlEndpoint: process.env.URLENDPOINT
  });
router.get('/auth', (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.json(result);
  })
  module.exports = router;
