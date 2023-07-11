const fs = require('fs/promises');
const path = require('path');
const pokedex = require('../data_sets/static_data/pokedex');
const movesList = require('../data_sets/static_data/moves');
const abilityList = require('../data_sets/static_data/ability');
const natureList = require('../data_sets/static_data/nature');
const itemList = require('../data_sets/static_data/item');
const poketypeList = require('../data_sets/static_data/poketype');



const dataController = {}

// Set file path you want to read from (may need to change this in future)
const filePath = '../data_sets/sample_data/DataPullJun30.json'

// For now, reads data from JSON file
dataController.dataPull = async (req, res, next) => {
    console.log('Inside dataController.dataPull');
    try {
        const data = await fs.readFile(path.resolve(__dirname, filePath), 'UTF-8');
        //console.log(data);
        // Assign data to res.locals
        res.locals.data = JSON.parse(data)
        return next();

    }
    catch (err) {
        const log = `Error occuring in dataController.dataPull controller: ${err}`;
        const message = { err: 'Error occured on server side' };
        return next({ log: log, message: message });
    }
}

// Parses data into the correct format
dataController.dataParse = (req, res, next) => {
    try {
        for(let pokemon in res.locals.data) {
            console.log('Pokemon:', pokemon, pokedex[pokemon]);

            const dataset = [
                ['waza', movesList],
                ['tokusei', abilityList],
                ['seikaku', natureList],
                ['motimono', itemList],
                ['pokemon', pokedex],
                ['terastal', poketypeList]
            ]

            // Cycle through each dataset type
            dataset.forEach( (datatype) => {
                const currData = res.locals.data[pokemon]['0']['temoti'][datatype[0]];
                currData.forEach( (obj) => {
                    // if datatype is for pokemon (partner pokemon stats),
                    // dont return obj.val as that field doesnt exist
                    if (datatype[0] === 'pokemon') console.log(obj.id, datatype[1][obj.id])
                    else console.log(obj.id, datatype[1][obj.id], obj.val)
                } )
            })

            // // Move Data
            // const currMoves = res.locals.data[pokemon]['0']['temoti']['waza'];
            // currMoves.forEach( (moveObj) => {
            //     console.log(moveObj.id, moves[moveObj.id], moveObj.val)
            // });

            // // Ability Data
            // const currAbilities = res.locals.data[pokemon]['0']['temoti']['tokusei'];
            // currAbilities.forEach( (abilityObj) => {
            //     console.log(abilityObj.id, abilities[abilityObj.id], abilityObj.val)
            // });

            
        }
        return next();
    }
    catch (err) {
        const log = `Error occuring in dataController.dataParse controller: ${err}`;
        const message = { err: 'Error occured on server side' };
        return next({ log: log, message: message });
    }

}

module.exports = dataController;
