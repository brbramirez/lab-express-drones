const express = require('express');
const router = express.Router();

// require the Drone model here
const drone = require("../models/Drone.model.js");

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  const allDrones = await drone.find();
  console.log(allDrones);
  res.render('drones/list', {allDrones});
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form');
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try{
    const newDrone = req.body;
    await drone.create(newDrone);
    res.redirect('/drones')
  } 
  catch (err) {
    console.log(err);
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const droneFromDB = await drone.findById(req.params.id);
    res.render('drones/update-form', { droneFromDB });
  }
  catch (err) {
     console.log(err);
  }
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    const editedDrone = req.body;
    await drone.findByIdAndUpdate(req.params.id, editedDrone);
    res.redirect('/drones');
  } catch (err) {
    console.log(err);
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  try{
    await drone.findByIdAndDelete(req.params.id);
    res.redirect('/drones');
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
