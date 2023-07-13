const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://niteshmanem:pokemanem123@pokedata.ucoyzeq.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
    // options for the connect method to parse the URI
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // sets the name of the DB that our collections are part of
    dbName: 'PokeData'
  })
    .then(() => console.log('Connected to Mongo DB.'))
    .catch(err => console.log(err));
  
const Schema = mongoose.Schema;

//TODO: Create Pokemon Table Schema

const pokemonSchema = new Schema({
    _id: {type: Schema.Types.ObjectId, required: true},
    dexNum: {type: Number, required: true},
    pokeName: {type: String, required: true},
    formNum: {type: Number, required: true},
    formName: {type: String, required: true}
});

// Ensures the the combo of the two will always be unqiue
pokemonSchema.index({dexNum: 1, formNum: 1}, {unique: true});

//TODO: Create Mongoose model for pokemon Table
//                            collection name
const Pokemon = mongoose.model('pokemons', pokemonSchema);

//TODO: Create Moves Table Schema
const movesSchema = new Schema({
    _id: {type: Number, required: true, unqiue:true},
    name: {type: String, required: true}
});

//TODO: Create Mongoose model for Moves Table
const Moves = mongoose.model('moves', movesSchema);

//TODO: Create Pokemon Move Join Table Schema
const PokemonMovesJoinTableSchema = new Schema({
    pokemonId: {type: Schema.Types.ObjectId, ref: 'Pokemon', required: true},
    moveId: {type: Number, ref: 'Moves', required: true},
    timestamp: {type: Date, required: true},
    usage: {type: Number, required: true}
});

// Ensures the the combo of the three will always be unqiue
PokemonMovesJoinTableSchema.index({pokemonId: 1, moveId: 1, timestamp: 1}, {unique: true});

//TODO: Create Mongoose model for Pokemon Move Join Table
const PokemonMovesJoinTable = mongoose.model('pokemonmovesjointables', PokemonMovesJoinTableSchema);

//TODO: Create Pokemon Usage Table
const PokemonUsageSchema = new Schema({
    pokemonId: {type: Schema.Types.ObjectId, ref: 'Pokemon', required: true},
    timestamp: {type: Date, required: true},
    rank: {type: Number, required: true}
});

// Ensures the the combo of the three will always be unqiue
PokemonUsageSchema.index({pokemonId: 1, timestamp: 1}, {unique: true});

//TODO: Create Mongoose model for Pokemon Usage Table
const PokemonUsage = mongoose.model('pokemonusages', PokemonUsageSchema);


//TODO: Export all tables
module.exports = {
    Pokemon,
    Moves,
    PokemonMovesJoinTable,
    PokemonUsage
  };