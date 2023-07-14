const { PokemonMovesJoinTable, Pokemon, Moves } = require('../models/dbModels');

const movesController = {}

//& Gets Top 10 Moves from most recent data
movesController.mostRecentMoves = async (req, res, next) => {
    try {

        //~ Get most recent timestamp
        const mostRecentDocument = await PokemonMovesJoinTable.find({}).sort({ timestamp: -1 })
        const mostRecentTimeStamp = await mostRecentDocument[0].timestamp;
        //console.log(mostRecentTimeStamp)

        //~ Find pokemonID w dexNum and formNum in Pokemon Table
        const { dexNum, formNum } = req.params;
        const { _id } = await Pokemon.findOne({ dexNum: dexNum, formNum: formNum })


        //~ Find all data at that timestamp and pokemon id
        let data = await PokemonMovesJoinTable.find({ timestamp: mostRecentTimeStamp, pokemonId: _id }).sort({ usage: -1 })
        // console.log(data.length) // should equal 10 for 10 moves

        //~ Make an object with properties: moveName, usage, moveId, pokemonId, timestamp
        const result = []
        for (let i = 0; i < data.length; i++) {
            const { moveId, pokemonId, timestamp, usage } = data[i];
            const temp = {}
            const { name } = await Moves.findOne({ moveId: moveId }).exec()
            temp.moveName = name;
            temp.usage = usage;
            temp.moveId = moveId;
            temp.pokemonId = pokemonId;
            temp.timestamp = timestamp;
            result.push(temp)
        };
        //console.log(result)

        res.locals.data = result;
        return next()
    }
    catch (err) {
        const log = `Error occuring in movesController.mostRecentMoves: ${err}`;
        const message = { err: 'Error occured on server side' };
        return next({ log: log, message: message });
    }
}

//& Gets graph data for specific pokemon
movesController.graphData = async (req, res, next) => {
    console.log('body: ', req.body)
    try {
        //~ Get move ids from POST req body

        const moves = req.body.moves
        // console.log(moves)

        //~ Get list of all timestamps
        const uniqueTimestamps = await PokemonMovesJoinTable.distinct('timestamp');
        // console.log(uniqueTimestamps)

        //~ Find pokemonID w dexNum and formNum in Pokemon Table
        const { dexNum, formNum } = req.params;
        const { _id } = await Pokemon.findOne({ dexNum: dexNum, formNum: formNum })
        // console.log(_id);
        //~ For each timestamp, get data for each move
        const data = [];
        for (let i = 0; i < uniqueTimestamps.length; i++) {
            const tempObj = {};
            tempObj.date = uniqueTimestamps[i];
            //Loop through moves list
            for (let j = 0; j < moves.length; j++) {
                const { name } = await Moves.findOne({ moveId: moves[j] })
                // console.log(moves[j], _id, uniqueTimestamps[i])
                const outputObj = await PokemonMovesJoinTable.findOne({ moveId: moves[j], timestamp: uniqueTimestamps[i], pokemonId: _id })
                if ( outputObj !== null) tempObj[name] = outputObj.usage;
                // const { usage } = await PokemonMovesJoinTable.findOne({ moveId: moves[j], timestamp: uniqueTimestamps[i], pokemonId: _id })
                // tempObj[name] = usage;
            }
            data.push(tempObj)
        }
        // console.log(data)

        res.locals.data = data
        // console.log('bottom')
        return next()
    }
    catch (err) {
        const log = `Error occuring in movesController.graphData: ${err}`;
        const message = { err: 'Error occured on server side' };
        return next({ log: log, message: message });
    }
}

module.exports = movesController;
