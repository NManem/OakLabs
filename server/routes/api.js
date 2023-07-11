const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController')


// Handle request for data pulls
router.get('/data_pull', dataController.dataPull, dataController.dataParse, (req,res) =>{
    console.log('Inside api router: router.get(/data_pull)')
    return res.status(200).send();
});


// EXPORT THE ROUTER
module.exports = router;