const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController')
const { Pokemon, PokemonUsage } = require('../models/dbModels');



// Handle request for data pulls
router.get('/data_pull', dataController.dataPull, dataController.dataParse, (req, res) => {
    console.log('Inside api router: router.get(/data_pull)')
    return res.status(200).send();
});

// Test, just pulling Pokemon Usage data for one specific pokemon
router.get('/:dexNum/:formNum', async (req, res) => {
    console.log('in get controller')
    const { dexNum, formNum } = req.params;
    console.log('fetching: ', dexNum)
    try {
        // const obj = await models.Pokemon.findOne({ dexNum: dexNum, formNum: formNum })
        // console.log('obj: ',obj)
        const {_id, pokeName} = await Pokemon.findOne({ dexNum: dexNum, formNum: formNum })
        // console.log(_id)
        const outputList = await PokemonUsage.find({ pokemonId: _id }).sort({ timestamp: 1 });
        // console.log('data in system: ', outputList)
        // return an object
            // name: pokemon name
            // form: formNum
            // rankData: array of objets
            //     each object in array
            //      timestamp: timestamp
            //      rank: rank
        const data = {pokeName: pokeName, dexNum: dexNum, formNum: formNum}
        data.rankData = []
        outputList.forEach( (obj) => {
            const temp = {timestamp: obj.timestamp, rank: obj.rank}
            data.rankData.push(temp)
        })
        // console.log(data)
        return res.status(200).json(data)
    }
    catch (err) {
        // this isnt working but ignore for now
        console.log(err)
        return res.status(err.status).json(err.message);
    }
})


// EXPORT THE ROUTER
module.exports = router;