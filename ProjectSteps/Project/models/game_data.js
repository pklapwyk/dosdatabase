let mongoose = require('mongodb');

let gameSchema = mongoose.Schema({
    gameTitle:{
        type: String,
        required: true,
    },
    genre:{
        type: String,
        required: true,
    },
    publisher:{
        type: String,
        required: false,
    },
    developer:{
        type: String,
        required: false,
    },
    yearPublished:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    }
});

let game = module.export = mongoose.model('game_data, gameSchema');
