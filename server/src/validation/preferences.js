const Joi = require('joi')

module.exports = {
  update: {
    body: {
      accessToken: Joi.string(),
      branches: Joi.array().items(Joi.string())
    }
  }
}