const mongoose = require('mongoose')
const { Schema } = mongoose

const preferenceSchema = new Schema({
  'userId': String,
  'branches': [String],
  'createdAt': { type: Date, default: Date.now },
  'updatedAt': { type: Date, default: Date.now }
})

module.exports = (db) => db.model('Preference', preferenceSchema)