const express = require('express');
const Coming = require('mongoose').model('Coming');

const router = new express.Router();

router.get('/dashboard', (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message."
  });
});

router.get('/coming/:bar', (req, res) => {
  Coming.findOne({ barId: req.params.bar }, function (barErr, bar) {
    if (barErr) {
      return res.status(401).end(barErr);
    } else {
      if (!bar) {
        bar = {coming: ""};
      }
      console.log(bar)
      return res.status(200).json({
        bar
      });
    }
  });
});

router.post('/coming/:bar/:username', (req, res) => {
  Coming.findOneAndUpdate(
    { barId: req.params.bar },
    { $addToSet: { coming: req.params.username } },
    { safe: true, upsert: true, new: true },
    function (err, item) {
      if (err) {
        console.log('err', err);
        res.status(401).end();
      } else {
        console.log('updated item', item);
        res.status(200).json(item).end();
      }
    }
  )
});

router.put('/coming/:bar/:username', (req, res) => {
  Coming.update(
    { barId: req.params.bar },
    { $pull: { coming: req.params.username } },
    function (err, item) {
      if (err) {
        console.log('err', err);
        res.status(401).end();
      } else {
        console.log('updated item', item);
        res.status(200).end();
      }

    }
  )
});

module.exports = router;
