const { default: mongoose } = require('mongoose')
const mongooose = require('mongoose')

const blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required :[true,"token is required to be added in blacklist"]
    }
},{
    timestamps : true 
})

const tokenBlackListModel = mongooose.model("blacklistTokens",blacklistSchema)

module.exports = tokenBlackListModel