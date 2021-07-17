const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const morgan = require('morgan')
const path = require('path')
const validate = require('express-validation')
const passport = require('passport')
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const passportConfig = require('./helpers/passport')
const routes = require('./routes')
const createRepositories = require('./repositories')

const setupAccessLogs = (app) => {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../access.log'), { flags: 'a' })
  app.use(morgan('short', { stream: accessLogStream }))
}

module.exports = ({ config, db }) => {
  const app = express()
  const repositories = createRepositories(db)

  setupAccessLogs(app)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  app.use(passport.initialize())
  passportConfig({ config, passport, repositories })

  app.use('/api', routes({
    config,
    repositories
  }))

  const swaggerOptions = {
    swaggerDefinition: config.get('swaggerDefinition'),
    apis: ['./src/controllers/*.js'],
  }
  const swaggerSpec = swaggerJSDoc(swaggerOptions)
  app.get('/swagger.json', function (req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.all('*', (req, res) => {
    res.sendStatus(404)
  })
  app.use((err, req, res, next) => {
    if (err instanceof validate.ValidationError) {
      console.error('Request validation error:', JSON.stringify(err))
      return res.status(422).json(err)
    }
    console.error('Internal server error', JSON.stringify(err))
    if(err.status) {
      return res.status(err.status).json({description: err.errors}).end()
    }
    return res.sendStatus(500)
  })

  return app
}
