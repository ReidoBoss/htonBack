module.exports = (app) => {

    const controller = require('../controllers/controllers.js');

    const router = require('express').Router();
    const multer = require('multer');
    const storage = multer.memoryStorage();
    const upload = multer({ storage: storage });


    //USER GETTERS
    router.get("/getUsers", controller.getUsers);
    router.get("/getUserImage/:id", controller.getUserImage);
    //USER POSTER
    // router.post('/addUser', upload.fields([
    //     { name: 'image', maxCount: 1 },
    //     { name: 'extra1', maxCount: 1 },
    // ]), controller.addUser);
    //USER UPDATER
    router.put('/updateUser/:id', controller.updateUser); // Route for updating user
    //USER DELETER
    router.delete('/deleteUserByID/:id', controller.deleteUserByID);



    //START OF HACKATHON
    //CHALLENGE
    router.get("/getChallenges", controller.getChallenges);
    router.get("/getChallengeImage/:id", controller.getChallengeImage);
    router.get("/getChallengeByID/:id", controller.getChallengeByID);

    router.post('/addChallenge', upload.fields([{ name: 'image', maxCount: 1 }]), controller.addChallenge);
    router.put('/updateChallenge/:id', controller.updateChallenge); // Route for updating user

    //PUROK
    router.get("/getPuroks", controller.getPuroks);

    //USER
    router.post('/addUser', upload.fields([{}]), controller.addUser);
    //USER AFTER LOGIN
    router.get("/getAllUserChallenge", controller.getAllUserChallenge);
    router.post('/addUserChallenge', upload.fields([{}]), controller.addUserChallenge);
    router.post('/submitChallenge', upload.fields([{ name: 'image', maxCount: 1 }]), controller.submitChallenge);
    router.get("/getSubmitted", controller.getSubmitted);
    router.get("/getSubmittedByID/:id", controller.getSubmittedByID);

    router.put('/disableChallenge/:id', controller.disableChallenge);

    router.put('/acknowledge/:id', controller.acknowledge);

    app.use('/', router);
};