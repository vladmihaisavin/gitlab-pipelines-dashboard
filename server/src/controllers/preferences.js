const { Router } = require('express')
const validate = require('express-validation')
const validationRules = require('../validation/preferences')

module.exports = ({ preferencesRepository }) => {
  const app = new Router()

  app.get('/', async (req, res) => {
    try {
      const preferences = await preferencesRepository.getPreferences(req.currentUser._id)
      if (req.currentUser.gitlabAccessToken) {
        preferences._doc.hasAccessToken = true
      } 
      return res.status(200).json(preferences)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500)
    }
  })

  app.put('/', validate(validationRules.update), async (req, res) => {
    try {
      const result = await preferencesRepository.update(req.currentUser._id, req.body)
      if (result === null) {
        return res.sendStatus(404)
      }
      return res.sendStatus(204)
    } catch (err) {
      console.log(err)
      return res.sendStatus(500)
    }
  })

  return app
}