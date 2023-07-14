const express = require('express');
const router = express.Router();
const movesController = require('../controllers/movesController')

//& Get top 10 moves for specific dex and form
router.get('/:dexNum/:formNum', movesController.mostRecentMoves, (req, res) => {
    // console.log('Inside move router')
    return res.status(200).json(res.locals.data);
});

//& Get graph data for the specific pokemon inputted
router.post('/graph/:dexNum/:formNum', movesController.graphData , (req, res) => {
    console.log('Inside move router')
    // console.log('data inside router,', res.locals.data)
    return res.status(200).json(res.locals.data);
});

// EXPORT THE ROUTER
module.exports = router;