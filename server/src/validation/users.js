const Joi = require('joi')

module.exports = {
  store: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email({minDomainAtoms: 2}).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },
  update: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().email({minDomainAtoms: 2}).required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
    }
  },
  partialUpdate: {
    body: {
      name: Joi.string(),
      email: Joi.string().email({minDomainAtoms: 2}),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
    }
  }
}