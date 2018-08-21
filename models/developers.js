const mongoose = require('mongoose');
let gameSchema = mongoose.Schema({
    name: String,
});

let developers = module.exports = mongoose.model('developers', gameSchema);