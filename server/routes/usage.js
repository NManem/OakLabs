const express = require('express');
const router = express.Router();
const movesController = require('../controllers/movesController')





//& Handles default route '/' to just get most recent top 50 usage pokemon
router.get('/', movesController.mostRecentUsage, (req, res) => {
    // console.log('Inside usage router')
    return res.status(200).json(res.locals.data);
});

//& Handles custom num route to get most recent based on var 'num' inputted
router.get('/:num', movesController.mostRecentUsage, (req, res) => {
    // console.log('Inside usage router')
    return res.status(200).json(res.locals.data);
});

router.get('/:dexNum/:formNum', movesController.specificPokemonUsage, (req, res) => {
    console.log('pulled data from movesController.specificPokemonUsage', req.params.dexNum, req.params.formNum)
    return res.status(200).json(res.locals.data);
});

// EXPORT THE ROUTER
module.exports = router;