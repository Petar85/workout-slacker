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

  
  router.get("/exercises/:id", (req, res) => {
    
   db.Exercises.findById(req.params.id)
   .then(result => {
    
       if(!result) {
           return res.status(404).send({
               message: "Exercise not found with id " + req.params.id
           });            
       }
       res.send(result);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "Exercise not found with id " + req.params.id
           });                
       }
       return res.status(500).send({
           message: "Error retrieving exercise with id " + req.params.id
       });
   });
 });
 
 
 router.put("/exercises/:id", (req, res) => {
   
   if(!req.body.name) {
       return res.status(400).send({
           message: "exercise name can not be empty"
       });
   }
   
   db.Exercises.findByIdAndUpdate(req.params.id, {
       name: req.body.name || "Untitled exercise",
       description: req.body.description,
       difficulty: req.body.difficulty
   }, {new: true})
   .then(results => {
       if(!results) {
           return res.status(404).send({
               message: "exercise not found with id " + req.params.id
           });
       }
       console.log('CHRIS SERVER is sending back: '+results);
       res.send(results);
   }).catch(err => {
       if(err.kind === 'ObjectId') {
           return res.status(404).send({
               message: "exercise not found with id " + req.params.id
           });                
       }
       return res.status(500).send({
           message: "Error updating note with id " + req.params.id
       });
   });
 });
 
 
 router.delete("/exercises/:id", (req, res) => {
   let exerciseId = req.params.id;
   db.Exercises.findByIdAndRemove(req.params.id)
   .then(results => {
       if(!results) {
           return res.status(404).send({
               message: "exercise not found with id " + req.params.id
           });
       }
       res.send({message: "exercise deleted successfully!"});
   }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "exercise not found with id " + req.params.id
           });                
       }
       return res.status(500).send({
           message: "Could not delete note with id " + req.params.id
       });
   });
 });
 
 
 module.exports = router;