const mongoose = require('mongoose');
let gameSchema = mongoose.Schema({
    name: String,
});

let publishers = module.exports = mongoose.model('publishers', gameSchema);