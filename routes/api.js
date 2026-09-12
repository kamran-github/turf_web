
/**
 * Defines the routes for all API endpoints and maps them to the corresponding functions in the dbController class.
 */
const express = require('express');
const dbController = require('../controllers/dbController');
const UserController  = require('../controllers/customApiLoginController')
const router = express.Router();

router.post('/insertOne', dbController.insertOne);
router.post('/insertMany', dbController.insertMany);
router.post('/findOne', dbController.findOne);
router.post('/find', dbController.find);
router.post('/updateOne', dbController.updateOne);
router.post('/deleteOne', dbController.deleteOne);
router.post('/deleteMany', dbController.deleteMany);
router.post('/aggregate', dbController.aggregate);
router.post('/user/create',UserController.createUser);
router.get('/user/getuser',UserController.getUsers);

module.exports = router;
