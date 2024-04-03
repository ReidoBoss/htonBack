const { Users } = require("../models/models.js");


//USERS
exports.getUsers = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getUsers((err, agents) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error message",
      });
    }
    res.send(agents);
  });
};

exports.getUserByID = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content cannot be empty",
    });
    return;
  }
  Users.getUserByID(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: err.message || "Some error occured",
      });
    }
    res.send(user);
  });
};

  //POSTER
  exports.addUser = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content cannot be empty",
      });
    }
    
    const { image, extra1 } = req.files;

    if (!image) {
      res.status(400).send({
        message: "Main image is needed",
      });
      return;
    }
  
    const userDetails = new Users({
      username: req.body.username,
      password: req.body.password,
      role: req.body.role,
      text: req.body.text,

      image: image[0] ? image[0].buffer : null,
      extra1: extra1[0] ? extra1[0].buffer : null,


    });

    Users.addUser(userDetails, (err, result) => {
      if (err) {
        res.status(500).send({
          message: err.message || 'Internal Server Error',
        });
        return;
      }
  
      res.status(201).send(result); 
    });
};
 