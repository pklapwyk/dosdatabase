const mongoose = require('mongoose');
let gameSchema = mongoose.Schema({
    title: String,
    genre: Array,
    publisher: String,
    developer: String,
    yearPublished: String,
    description: String,
});

let addGame = module.exports = mongoose.model('addGames', gameSchema);