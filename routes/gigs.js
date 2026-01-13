const express = require('express');
const Gig = require('../models/Gig');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    const query = { status: 'open' };
    if (search) query.title = { $regex: search, $options: 'i' };
    const gigs = await Gig.find(query).populate('ownerId', 'name');
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const gig = new Gig({ ...req.body, ownerId: 'temp', status: 'open' });
    await gig.save();
    res.json(gig);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
