const mongose = require('mongoose');
const{Schema}= mongose;

const ChatSchema=new Schema({
    nick: String,
    msg: String,
    created_at:{
        type:Date,
        default: Date.now
    }
});

module.exports = mongose.model('Chat',ChatSchema);