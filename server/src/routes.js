const { Router } = require('express')
const { version } = require('../package.json')
const authenticate = require('./middlewares/authenticate')
const auth = require('./controllers/auth')
const users = require('./controllers/users')

module.exports = ({ config, repositories }) => {
  const app = new Router()

  app.get('/info', (req, res) => {
    res.json({ version })
  })
  app.use('/auth', auth({ config, userRepository: repositories.user }))
  app.use('/users', authenticate, users(repositories.user))

  return app
}