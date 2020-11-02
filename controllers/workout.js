const router = require("express").Router()
const db = require("../models");
const mongoose = require("mongoose");

router.get("/all", (req, res) => {
    db.Workouts.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
  });