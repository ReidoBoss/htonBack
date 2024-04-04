const { Users, Challenge, Purok } = require("../models/models.js");


//USERS

exports.getUserImage = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }
    Users.getUserImage(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occured",
            });
        }
        res.send(user);
    });
};



// Update user by ID
exports.updateUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }

    const userId = req.params.id;
    const updatedUserData = {
        username: req.body.username,
        password: req.body.password,
        role: req.body.role
    };

    Users.updateUser(userId, updatedUserData, (err, updatedUser) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `User with ID ${userId} not found`,
                });
            }
            return res.status(500).send({
                message: `Error updating user with ID ${userId}`,
            });
        }
        res.send(updatedUser);
    });
};

//USER DELETER
exports.deleteUserByID = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }

    Users.deleteUserByID(req.params.id, (err, affectedRows) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while deleting the user",
            });
        }

        if (affectedRows === 0) {
            return res.status(404).send({
                message: `User with ID ${req.params.id} not found`,
            });
        }

        res.send({
            message: "User deleted successfully",
        });
    });
};

// START CHALLENGE
exports.getChallenges = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }
    Challenge.getChallenges((err, agents) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error message",
            });
        }
        res.send(agents);
    });
};

exports.getChallengeImage = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }
    Challenge.getChallengeImage(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occured",
            });
        }
        res.send(user);
    });
};

//CHALLENGE POSTER
exports.addChallenge = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
    }
    const { image } = req.files;

    const challengeDetails = new Challenge({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        image: image[0] ? image[0].buffer : null,


    });

    Challenge.addChallenge(challengeDetails, (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Internal Server Error',
            });
            return;
        }

        res.status(201).send(result);
    });
};

//UPDATE CHALLENGE BY ID
exports.updateChallenge = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }
    const challengeID = req.params.id;
    const updatedChallengeData = {
        status: req.body.status,
    };

    Challenge.updateChallenge(challengeID, updatedChallengeData, (err, updatedUser) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(404).send({
                    message: `User with ID ${challengeID} not found`,
                });
            }
            return res.status(500).send({
                message: `Error updating user with ID ${challengeID}`,
            });
        }
        res.send(updatedUser);
    });
};

//START PUROK
//GETTER

exports.getPuroks = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }
    Purok.getPuroks((err, agents) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error message",
            });
        }
        res.send(agents);
    });
};

//USER 

//POSTER
exports.addUser = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
    }


    const userDetails = new Users({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        purok_id: req.body.purok_id,

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


exports.getAllUserChallenge = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }
    Users.getAllUserChallenge((err, agents) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error message",
            });
        }
        res.send(agents);
    });
};

exports.addUserChallenge = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
    }


    const userDetails = new Users({
        challenge_id: req.body.challenge_id,
        user_id: req.body.user_id,
        status: req.body.status,

    });
    Users.addUserChallenge(userDetails, (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Internal Server Error',
            });
            return;
        }

        res.status(201).send(result);
    });
};

exports.getChallengeByID = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }
    Challenge.getChallengeByID(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occured",
            });
        }
        res.send(user);
    });
};

//COMPLETER

exports.addCompleters = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
    }


    const userDetails = new Users({
        challenge_id: req.body.challenge_id,
        user_id: req.body.user_id,
        points: req.body.points,

    });
    Users.addCompleters(userDetails, (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Internal Server Error',
            });
            return;
        }

        res.status(201).send(result);
    });
};

exports.submitChallenge = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
    }
    const { image } = req.files;

    const challengeDetails = new Challenge({
        user_id: req.body.user_id,
        description: req.body.description,
        image: image[0] ? image[0].buffer : null,


    });

    Challenge.submitChallenge(challengeDetails, (err, result) => {
        if (err) {
            res.status(500).send({
                message: err.message || 'Internal Server Error',
            });
            return;
        }

        res.status(201).send(result);
    });
};

exports.getSubmitted = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }
    Challenge.getSubmitted((err, agents) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error message",
            });
        }
        res.send(agents);
    });
};


exports.getSubmittedByID = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content cannot be empty",
        });
        return;
    }
    Challenge.getSubmittedByID(req.params.id, (err, user) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occured",
            });
        }
        res.send(user);
    });
};



exports.disableChallenge = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Post ID cannot be empty",
        });
        return;
    }

    const postId = req.params.id;
    const newStatus = "0";

    Challenge.disableChallenge(postId, newStatus, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while updating the Post status.",
            });
        }

        res.send(data);
    });
};

exports.acknowledge = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Post ID cannot be empty",
        });
        return;
    }

    const postId = req.params.id;
    const newStatus = "1";

    Challenge.acknowledge(postId, newStatus, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while updating the Post status.",
            });
        }

        res.send(data);
    });
};