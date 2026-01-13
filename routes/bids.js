const express = require('express');
const Bid = require('../models/Bid');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const bid = new Bid({ ...req.body, freelancerId: 'temp', status: 'pending' });
    await bid.save();
    res.json(bid);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
