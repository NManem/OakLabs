const path = require('path');
const { PokemonUsage, Pokemon } = require('../models/dbModels');

const usageController = {}

//& Gets Top 50 Pokemon from most recent data
usageController.mostRecentUsage = async (req, res, next) => {
    console.log('Inside usageController.mostRecentUsage')
    try {
        //~ Get most recent timestamp
        const mostRecentDocument = await PokemonUsage.find({}).sort({ timestamp: -1 })
        const mostRecentTimeStamp = mostRecentDocument[0].timestamp;
        // console.log('mostRecentTimeStamp: ', mostRecentTimeStamp)
        //~ Find all data at that timestamp
        let data = await PokemonUsage.find({ timestamp: mostRecentTimeStamp }).sort({ rank: 1 })

        //~ Filter data based on num input, if there is one
        const { num } = req.params;
        if (num === undefined) {
            data = data.slice(0, 50)

        }
        else {
            if (num > 150) return next({ message: 'Error inside usageController.filterUsageData. Requested num too big' });
            data = data.slice(0, num)
        }

        //~ Add pokeName, dexNum, and formNum to object
        for (let i = 0; i < data.length; i++) {
            // Need to use temp obj because MongoDB querie results are immutable
            // Reassigning it to a temp variable will fix this problem
            let temp = data[i].toObject()
            const { pokeName, dexNum, formNum } = await Pokemon.findOne({ _id: temp.pokemonId }).exec()
            temp.pokeName = pokeName;
            temp.dexNum = dexNum;
            temp.formNum = formNum
            data[i] = temp
        };

        res.locals.data = data;
        console.log(data[0])
        return next()
    }
    catch (err) {
        const log = `Error occuring in usageController.mostRecentUsage: ${err}`;
        const message = { err: 'Error occured on server side' };
        return next({ log: log, message: message });
    }

}

//& Get usage for specific pokemon
usageController.specificPokemonUsage = async (req, res, next) => {
    // console.log('Inside usageController.specificPokemonUsage')
    try {
        const { dexNum, formNum } = req.params;

        //~ Find pokemonID w dexNum and formNum in Pokemon Table
        const { _id, pokeName } = await Pokemon.findOne({ dexNum: dexNum, formNum: formNum })
        //~ Filter by pokemonID in Pokemon Usage Table
        const outputList = await PokemonUsage.find({ pokemonId: _id }).sort({ timestamp: 1 });
        const data = { pokeName: pokeName, dexNum: dexNum, formNum: formNum }
        data.rankData = []
        outputList.forEach((obj) => {
            const temp = { timestamp: obj.timestamp, rank: obj.rank }
            data.rankData.push(temp)
        })
        // console.log(data)
        res.locals.data = data;
        return next()
    }
    catch (err) {
        const log = `Error occuring in usageController.specificPokemonUsage: ${err}`;
        const message = { err: 'Error occured on server side' };
        return next({ log: log, message: message });
    }

}

module.exports = usageController;
