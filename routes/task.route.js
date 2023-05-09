const express = require('express');
const app = express();
const taskRoutes = express.Router();

let Task = require('../model/Task');

// api to add task
taskRoutes.route('/add').post(function (req, res) {
  let task = new Task(req.body);
  task.save()
  .then(task => {
    res.status(200).json({'status': 'success','mssg': 'task added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get tasks
taskRoutes.route('/').get(function (req, res) {
  Task.find(function (err, tasks){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','tasks': tasks});
    }
  });
});

// api to get task
taskRoutes.route('/task/:id').get(function (req, res) {
  let id = req.params.id;
  Task.findById(id, function (err, task){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','task': task});
    }
  });
});

// api to update route
taskRoutes.route('/update/:id').put(function (req, res) {
    Task.findById(req.params.id, function(err, task) {
    if (!task){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        task.id = req.body.id;
        task.name = req.body.name;
        task.description = req.body.description;

        task.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
taskRoutes.route('/delete/:id').delete(function (req, res) {
  Task.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = taskRoutes;