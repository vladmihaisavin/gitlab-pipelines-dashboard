const userRepository = require('./user')

module.exports = (db) => ({
  user: userRepository(db)
})
