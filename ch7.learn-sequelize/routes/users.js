const express = require('express');
const User = require('../models/user.js');
const Comment = require('../models/comment.js');
const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      console.error(err);
      next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, age, married } = req.body;
      const user = await User.create({
        name,
        age,
        married,
      });
      res.status(201).json(user);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

router.get('/:id/comments', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      includes: {
        model: User,
        where: { id: req.params.id },
      },
    });
    res.json(comments);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
