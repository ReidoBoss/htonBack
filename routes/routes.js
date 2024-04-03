module.exports = (app) => {
  
  const controller = require('../controllers/controllers.js');
  
  const router = require('express').Router();
  const multer = require('multer');
  const storage = multer.memoryStorage(); 
  const upload = multer({ storage: storage });


  //USER GETTERS
  router.get("/getUsers", controller.getUsers);
  router.get("/getUserByID/:id", controller.getUserByID);
  //USER POSTER
  router.post('/addUser', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'extra1', maxCount: 1 },
  ]), controller.addUser);
   


  app.use('/', router);
};
