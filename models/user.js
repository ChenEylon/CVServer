const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String, uniqe: true, required: true },
    password: { type: String, required: true, uniqe: true },
    cvInfo: [{ type:mongoose.Schema.Types.ObjectId, ref:'cv'}],
})

module.exports = mongoose.model('Users', userSchema)