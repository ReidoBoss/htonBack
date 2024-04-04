const sql = require("../config/config.js");

const Users = function(users) {
    this.user_id = users.user_id;
    this.username = users.username;
    this.password = users.password;
    this.name = users.name;
    this.points = users.points;
    this.purok_id = users.purok_id;

    this.challenge_id = users.challenge_id;
    this.status = users.status;

}




const Challenge = function(challenge) {
    this.challenge_id = challenge.challenge_id;
    this.name = challenge.name;
    this.description = challenge.description;
    this.status = challenge.status;
    this.date = challenge.date;
    this.image = challenge.image;
    this.user_id = challenge.user_id;

}
const Purok = function(purok) {
    this.purok_id = purok.purok_id;
    this.name = purok.name;
    this.points = purok.points;

}


//USERS AUTH
//USER GETTER BY ID
Users.getUserImage = (user_id, result) => {
    sql.query(
        "SELECT  * FROM user_image WHERE user_id= ? ", [user_id],
        (error, queryResult) => {
            if (error) {
                console.log("Error in executing user table query", error);
                result(error, null);
                return;
            }
            const userDetails = queryResult.map((row) => ({
                user_id: row.user_id,
                image: row.image,

            }));
            result(null, userDetails);
        }
    );
};




//USER EDITTOR
// Update user
Users.updateUser = (userId, updatedUser, result) => {
    sql.query(
        "UPDATE users SET username = ?, password = ?, role = ? WHERE user_id = ?", [
            updatedUser.username,
            updatedUser.password,
            updatedUser.role,
            userId
        ],
        (error, res) => {
            if (error) {
                console.log("Error in updating user:", error);
                result(error, null);
                return;
            }

            result(null, { id: userId, ...updatedUser });
        }
    );
};
//DELETE USER by id

Users.deleteUserByID = (userId, result) => {
    sql.query(
        "DELETE FROM users WHERE user_id = ?", [userId],
        (err, res) => {
            if (err) {
                console.log("Error in deleting user:", err);
                result(err, null);
                return;
            }
            console.log(`Deleted user with ID: ${userId}`);
            result(null, res.affectedRows);
        }
    );
};

//START OF REAL HACKATHON DB

//CHALLENG
//CHALLENGE POSTER
Challenge.addChallenge = (newChallenge, result) => {
    sql.query(
        "INSERT INTO challenge SET ?", {
            name: newChallenge.name,
            description: newChallenge.description,
            status: newChallenge.status,
            image: newChallenge.image,

        },
        (error, results) => {
            if (error) {
                console.log("Error: ", error);
                result(error, null);
                return;
            }

            result(null, {...newChallenge });
        }
    );
};
//CHALLENGE GETTER


Challenge.getChallenges = (result) => {
    sql.query(
        "SELECT * FROM challenge",
        (err, res) => {
            if (err) {
                console.log("Error in executing challenge table query: ", err);
                result(err, null);
                return;
            }
            const challenge = res.map((row) => ({
                challenge_id: row.challenge_id,
                name: row.name,
                description: row.description,
                status: row.status,
                date: row.date,

            }));

            console.log(...challenge);
            result(null, challenge);
        }
    );
};
//USER GETTER BY ID
Challenge.getChallengeImage = (challenge_id, result) => {
    sql.query(
        "SELECT  image FROM challenge WHERE challenge_id= ? ", [challenge_id],
        (error, queryResult) => {
            if (error) {
                console.log("Error in executing user table query", error);
                result(error, null);
                return;
            }
            const challengeDetails = queryResult.map((row) => ({
                challenge_id: row.challenge_id,
                image: row.image,

            }));
            result(null, challengeDetails);
        }
    );
};

Challenge.getChallengeByID = (challenge_id, result) => {
    sql.query(
        "SELECT  * FROM challenge WHERE challenge_id= ? ", [challenge_id],
        (error, queryResult) => {
            if (error) {
                console.log("Error in executing user table query", error);
                result(error, null);
                return;
            }
            const challengeDetails = queryResult.map((row) => ({
                challenge_id: row.challenge_id,
                name: row.name,
                description: row.description,
                status: row.status,
                image: row.image,

            }));
            result(null, challengeDetails);
        }
    );
};
//UPDATE CHALLENGE

Challenge.updateChallenge = (userId, updatedChallenge, result) => {
    sql.query(
        "UPDATE challenge SET status = ? WHERE challenge_id = ?", [
            updatedChallenge.status,

        ],
        (error, res) => {
            if (error) {
                console.log("Error in updating challenge:", error);
                result(error, null);
                return;
            }

            result(null, { id: userId, ...updatedChallenge });
        }
    );
};

//PUROK
//PUROK GETTER
Purok.getPuroks = (result) => {
    sql.query(
        "SELECT * FROM purok",
        (err, res) => {
            if (err) {
                console.log("Error in executing purok table query: ", err);
                result(err, null);
                return;
            }
            const purok = res.map((row) => ({
                purok_id: row.purok_id,
                name: row.name,
                points: row.points,

            }));

            console.log(...purok);
            result(null, purok);
        }
    );
};
//USER
//USER POSTER
Users.addUser = (newUser, result) => {
    sql.query(
        "INSERT INTO users SET ?", {
            username: newUser.username,
            password: newUser.password,
            name: newUser.name,
            purok_id: newUser.purok_id,

        },
        (error, results) => {
            if (error) {
                console.log("Error: ", error);
                result(error, null);
                return;
            }


            result(null, {...newUser });
        }
    );
};
//user getter
Users.getUsers = (result) => {
    sql.query(
        "SELECT * FROM users",
        (err, res) => {
            if (err) {
                console.log("Error in executing users table query: ", err);
                result(err, null);
                return;
            }
            const userDetails = res.map((row) => ({
                user_id: row.user_id,
                purok_id: row.user_id,
                username: row.username,
                password: row.password,
                name: row.name,
                points: row.points,
            }));

            console.log(...userDetails);
            result(null, userDetails);
        }
    );
};
//USER ADD CHALLENGE
Users.addUserChallenge = (newChallenge, result) => {
    sql.query(
        "INSERT INTO user_challenge SET ?", {
            challenge_id: newChallenge.challenge_id,
            user_id: newChallenge.user_id,
            status: newChallenge.status,

        },
        (error, results) => {
            if (error) {
                console.log("Error: ", error);
                result(error, null);
                return;
            }

            result(null, {...newChallenge });
        }
    );
};
// GET USER ALL CHALLENGE
Users.getAllUserChallenge = (result) => {
    sql.query(
        "SELECT * FROM user_challenge",
        (err, res) => {
            if (err) {
                console.log("Error in executing users table query: ", err);
                result(err, null);
                return;
            }
            const userDetails = res.map((row) => ({
                challenge_id: row.challenge_id,
                user_id: row.user_id,
                status: row.status,

            }));

            console.log(...userDetails);
            result(null, userDetails);
        }
    );
};

// COMPLETERS

Users.addCompleters = (newUser, result) => {
    sql.query(
        "INSERT INTO completers SET ?", {
            challenge_id: newUser.challenge_id,
            user_id: newUser.user_id,
            points: newUser.points,


        },
        (error, results) => {
            if (error) {
                console.log("Error: ", error);
                result(error, null);
                return;
            }


            result(null, {...newUser });
        }
    );
};
//SUBMIT
Challenge.submitChallenge = (newChallenge, result) => {
    sql.query(
        "INSERT INTO submitted SET ?", {
            user_id: newChallenge.user_id,
            description: newChallenge.description,
            image: newChallenge.image,

        },
        (error, results) => {
            if (error) {
                console.log("Error: ", error);
                result(error, null);
                return;
            }

            result(null, {...newChallenge });
        }
    );
};

//get submitted.
Challenge.getSubmitted = (result) => {
    sql.query(
        "SELECT * FROM submitted",
        (err, res) => {
            if (err) {
                console.log("Error in executing purok table query: ", err);
                result(err, null);
                return;
            }
            const purok = res.map((row) => ({
                user_id: row.user_id,
                description: row.description,
                status: row.status,
                image: row.image,
            }));

            console.log(...purok);
            result(null, purok);
        }
    );
};

Challenge.getSubmittedByID = (user_id, result) => {
    sql.query(
        "SELECT  * FROM submitted WHERE user_id= ? ", [user_id],
        (error, queryResult) => {
            if (error) {
                console.log("Error in executing user table query", error);
                result(error, null);
                return;
            }
            const challengeDetails = queryResult.map((row) => ({
                user_id: row.user_id,
                description: row.description,
                status: row.status,
                image: row.image,

            }));
            result(null, challengeDetails);
        }
    );
};





Challenge.disableChallenge = (challenge_id, newStatus, result) => {
    sql.query(
        "UPDATE challenge SET status = ? WHERE challenge_id = ?", [newStatus, challenge_id],
        (error, results) => {
            if (error) {
                console.log("error: ", error);
                result(error, null);
                return;
            }

            result(null, { challenge_id: challenge_id, status: newStatus });
        }
    );
};

Challenge.enableChallenge = (challenge_id, newStatus, result) => {
    sql.query(
        "UPDATE challenge SET status = ? WHERE challenge_id = ?", [newStatus, challenge_id],
        (error, results) => {
            if (error) {
                console.log("error: ", error);
                result(error, null);
                return;
            }

            result(null, { challenge_id: challenge_id, status: newStatus });
        }
    );
};

exports.disableChallenge = (req, res) => {
    if (!req.params.id) {
        res.status(400).send({
            message: "Post ID cannot be empty",
        });
        return;
    }

    const postId = req.params.id;
    const newStatus = "acknowledged";

    Post.editPostStatus(postId, newStatus, (err, data) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Some error occurred while updating the Post status.",
            });
        }

        res.send(data);
    });
};





module.exports.Purok = Purok;
module.exports.Users = Users;
module.exports.Challenge = Challenge;