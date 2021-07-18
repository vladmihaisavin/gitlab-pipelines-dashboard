const { Router } = require('express')
const validate = require('express-validation')
const validationRules = require('../validation/auth')
const { comparePassword } = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')

module.exports = ({ config, userRepository }) => {
  const app = new Router()

  /**
   * Registers a user
   * @swagger
   * /api/auth/register:
   *   post:
   *     tags:
   *       - Authentication
   *     name: Register
   *     summary: Register as a user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *             email:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *         required:
   *           - name
   *           - email
   *           - password
   *     responses:
   *       200:
   *         description: A user object
   *       422:
   *         description: Unprocessable entity
   *       500:
   *         description: Internal Server Error
   */
  app.post('/register', validate(validationRules.register), async (req, res) => {
    try {
      const results = (await userRepository.store(req.body))
      return res.status(201).json({ id: results.insertId })
    } catch (err) {
      console.error(`Register failed. Reason: ${ err }`)
      return res.sendStatus(500)
    }
  })

  /**
   * Logs in a user
   * @swagger
   * /api/auth/login:
   *   post:
   *     tags:
   *       - Authentication
   *     name: Log in
   *     summary: Logs in a user
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: body
   *         in: body
   *         schema:
   *           type: object
   *           properties:
   *             email:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *         required:
   *           - email
   *           - password
   *     responses:
   *       200:
   *         description: A user object with a token
   *       403:
   *         description: Invalid email or password
   *       422:
   *         description: Unprocessable entity
   *       500:
   *         description: Internal Server Error
   */
  app.post('/login', validate(validationRules.login), async (req, res) => {
    try {
      let user = await userRepository.getByEmail(req.body.email)
      const passwordMatch = await comparePassword(req.body.password, user.password)
      if (!passwordMatch) {
        console.info('Request forbidden. Reason: user password does not match.')
        return res.sendStatus(403)
      }
      const token = await jwt.sign({ name: user.name, email: user.email }, config.get('auth.secret'), {
        expiresIn: config.get('auth.expiresIn')
      })
      return res.status(200).json({ user, token })
    } catch (err) {
      console.error(`Login failed. Reason: ${ err }`)
      return res.sendStatus(500)
    }
  })

  return app
}