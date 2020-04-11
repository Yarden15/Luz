const express = require('express');
const router = express.Router();

const Auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Ads = require('../models/Ads');

// @route   GET api/ads/manage
// @desc    Get all Organization locations
// @access  Private- users
router.get('/manage', Auth, async (req, res) => {
  try {
    // Pull the organization of user to know what to pull from DB
    let user = await User.findById(req.user.id).select('organization');
    // Get all the timeTable events
    const ads = await Ads.find({ organization: user.organization }).populate({
      path: 'user',
      model: User,
      select: 'id_number first_name last_name color'
    });;

    // Response- events in table
    res.json(ads);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
// @route   POST api/ads/manage
// @desc    Add ads to Organization
// @access  Private Only users can do it
router.post('/manage', [Auth], async (req, res) => {
  // Validations f the form will take place here
  const errors = validationResult(req);
  // According to validation send errors if there are
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Pull from the req.body the fields to create new ad later on (instance)
  const { content } = req.body;

  try {
    // Pull the organization of manager to know what organization field for UserSchema
    let user = await User.findById(req.user.id).select('organization');

    // Create new ModelSchema of Ads
    const newAd = new Ads({
      user,
      organization: user.organization,
      content,
    });
    // Promise- save ad to db
    await newAd.save();
    res.json({ msg: 'ad_saved', type: 'regular' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/ads/manage/:id
// @desc    Delete ad from DB and all what relevent
// @access  Private- users only
router.delete('/manage/:id', Auth, async (req, res) => {
  try {
    //   Find the ad by id
    let ad = await Ads.findById(req.params.id);
    // ad not found in DB
    if (!ad) return res.status(404).json({ msg: 'ad not found' });

    // Pull the organization of user to know what organization field for UserSchema
    let user = await User.findById(req.user.id);

    //  The manager not authorize to change the specific location requested
    if (user.organization !== ad.organization) {
      res.status(401).json({
        msg: 'Not allowed to delete ads- not the same organization'
      });
    }

    if (user.id.toString() !== ad.user.toString() && !user.manager) {
      res.json({ title: 'error', type: 'error', msg: 'delete_msg_by_another_user_error' });
    } else {
      // Promise- find the User and remove it from db
      await Ads.findByIdAndRemove(req.params.id);
      // Response- msg to indicate that Performance has been removed
      res.json({ title: 'congratulations', type: 'regular', msg: 'ad_was_deleted' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;