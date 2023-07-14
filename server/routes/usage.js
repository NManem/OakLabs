const express = require('express');
const router = express.Router();
const usageController = require('../controllers/usageController')





//& Handles default route '/' to just get most recent top 50 usage pokemon
router.get('/', usageController.mostRecentUsage, (req, res) => {
    // console.log('Inside usage router')
    return res.status(200).json(res.locals.data);
});

//& Handles custom num route to get most recent based on var 'num' inputted
router.get('/:num', usageController.mostRecentUsage, (req, res) => {
    // console.log('Inside usage router')
    return res.status(200).json(res.locals.data);
});

router.get('/:dexNum/:formNum', usageController.specificPokemonUsage, (req, res) => {
    console.log('pulled data from usageController.specificPokemonUsage', req.params.dexNum, req.params.formNum)
    return res.status(200).json(res.locals.data);
});

// EXPORT THE ROUTER
module.exports = router;