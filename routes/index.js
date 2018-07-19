'use strict';
const express = require('express');
const router = express.Router();
const jf = require('jsonfile');


//routing
router.get('/config', function (req, res, next) {
  res.render('config', {
    title: 'Config Page',
  });
});

router.post('/config', function (req, res, next) {
  let connstr = req.body.cs;
  let end = connstr.indexOf(';', 0);
  let hostname = (connstr.slice(0, end));
  let config = {
    "hostname": hostname,
    "connectionString": req.body.cs,
    "ipVersion": req.body.ipv,
    "ports": {
      "radius": req.body.radius,
      "udp_raw_d2c": req.body.d2c,
      "udp_raw_c2d": req.body.c2d,
      "coap": req.body.coap
    }
  }
  jf.writeFileSync('config.json', config);
  require('../app').start();
  res.json(config);
});

module.exports = router;