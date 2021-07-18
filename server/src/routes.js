const { Router } = require('express')
const { version } = require('../package.json')
const authenticate = require('./middlewares/authenticate')
const auth = require('./controllers/auth')
const users = require('./controllers/users')
const gitlab = require('./controllers/gitlab')
const preferences = require('./controllers/preferences')

module.exports = ({ config, repositories }) => {
  const app = new Router()

  app.get('/info', async (req, res) => {
    return res.json({ version })
  })
  app.use('/auth', auth({ config, userRepository: repositories.user }))
  // app.use('/users', authenticate, users(repositories.user))
  app.use('/gitlab', authenticate, gitlab())
  app.use('/preferences', authenticate, preferences({ preferencesRepository: repositories.preferences }))

  return app
}