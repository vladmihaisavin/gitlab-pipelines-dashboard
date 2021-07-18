const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
  'name': String,
  'email': { type: String, unique: true },
  'password': String,
  'gitlabAccessToken': String,
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
})

module.exports = (db) => db.model('User', userSchema)