const userRepository = require('./user')
const preferencesRepository = require('./preferences')

module.exports = (db) => ({
  user: userRepository(db),
  preferences: preferencesRepository(db)
})
