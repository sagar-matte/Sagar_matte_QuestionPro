const express = require('express');
const router = express.Router();
const { authenticateUser} = require('../middleware/middleware.js');

const fetchdata = require('../controller/apiController/fetchdata.js');
const insertdata = require('../controller/apiController/insertdata.js')
const {updateData} = require('../controller/apiController/updatedata.js')
const removeData = require('../controller/apiController/removedata.js')
const getsecretekey = require('../controller/apiController/getsecretekey.js')
const bookgrocery = require('../controller/apiController/bookgrocery.js')


//admin
router.post('/insertdata', authenticateUser, insertdata);
router.post('/updateData', authenticateUser, updateData);
router.delete('/removedata',authenticateUser,  removeData);
router.get('/getsecretekey', getsecretekey);

// //admin and user 
router.get('/fetchdata', fetchdata);

// //user
router.get('/bookgrocery', bookgrocery);

module.exports = router;