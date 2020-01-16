const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Performance = require('../models/Performance');

// @route   GET api/performances
// @desc    Get all user performances
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    // Get all the attached preformances to current User by it ID gotten
    // from the authentacation mIDdleware
    const performance = await Performance.find({ user: req.user.id });
    res.json(performance);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/performance
// @desc    Add performance to a user
// @access  Private Only a Manager or Admin can do it
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, title, item, rank } = req.body;

    try {
      const newMemo = new Memo({
        name,
        title,
        item,
        rank,
        user: req.user.id
      });

      const memo = await newMemo.save();

      res.json(memo);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/memos/:id
// @desc    Update memo
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { name, title, item, rank } = req.body;

  // Build memo object
  const memoFields = {};
  if (name) memoFields.name = name;
  if (title) memoFields.title = title;
  if (item) memoFields.item = item;
  if (rank) memoFields.rank = rank;

  try {
    let memo = await Memo.findById(req.params.id);

    if (!memo) return res.status(404).json({ msg: 'Memo not found' });

    // Make sure user owns memo
    if (memo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    memo = await Memo.findByIdAndUpdate(
      req.params.id,
      { $set: memoFields },
      { new: true }
    );

    res.json(memo);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/memos/:id
// @desc    Delete memo
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let memo = await Memo.findById(req.params.id);

    if (!memo) return res.status(404).json({ msg: 'Memo not found' });

    // Make sure user owns memo
    if (memo.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Memo.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Memo Removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
