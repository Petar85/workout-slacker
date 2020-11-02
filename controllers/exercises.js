const router = require("express").Router()
const db = require("../models");

router.post("/submit", ({body}, res) => {
    console.log(body);
    db.Exercises.create(body)
      .then((newEx) => {
        console.log(newEx);
        return db.Workouts.findOneAndUpdate({}, { $push: { exercises: newEx._id } }, { new: true })
      })
      .then(dbWorkouts  => {
        res.json(newEx);
      }) 
      .catch(err => {
        res.json(err);
      });
  });