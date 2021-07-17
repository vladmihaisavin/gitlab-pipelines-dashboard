const { Router } = require('express')
const validate = require('express-validation')
const validationRules = require('../validation/users')

module.exports = (userRepository) => {
  const app = new Router()

  /**
   * List all resources
   * @swagger
   * /api/users:
   *   get:
   *     tags:
   *       - Users
   *     name: List users
   *     summary: Lists all the users
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of user objects
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   *       500:
   *         description: Internal Server Error
   */
  app.get('/', async (req, res) => {
    try {
      const users = await userRepository.list()
      return res.status(200).json(users)
    } catch (err) {
      return res.sendStatus(500)
    }
  })

  /**
   * Create a new resource
   * @swagger
   * /api/users:
   *   post:
   *     tags:
   *       - Users
   *     name: Create user
   *     summary: Creates a new user
   *     security:
   *       - bearerAuth: []
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
   *       401:
   *         description: Not authorized to access this resource
   *       422:
   *         description: Unprocessable entity
   *       500:
   *         description: Internal Server Error
   */
  app.post('/', validate(validationRules.store), async (req, res) => {
    try {
      const results = await userRepository.store(req.body)
      return res.status(201).json({ id: results.insertId })
    } catch (err) {
      return res.sendStatus(500)
    }
  })

  /**
   * Show an existing resource
   * @swagger
   * /api/users/{id}:
   *   get:
   *     tags:
   *       - Users
   *     name: Show user
   *     summary: Shows an existing user
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       200:
   *         description: A user object
   *       401:
   *         description: Not authorized to access this resource
   *       404:
   *         description: Not found
   *       422:
   *         description: Unprocessable entity
   *       500:
   *         description: Internal Server Error
   */
  app.get('/:id', async (req, res) => {
    try {
      const result = await userRepository.getById(req.params.id)
      if (result.length > 0) {
        return res.status(200).json(result[0])
      }
      return res.sendStatus(404)
    } catch (err) {
      return res.sendStatus(500)
    }
  })

  /**
   * Update an existing resource
   * @swagger
   * /api/users/{id}:
   *   put:
   *     tags:
   *       - Users
   *     name: Update user
   *     summary: Updates an existing user
   *     security:
   *       - bearerAuth: []
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
   *             type:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *         required:
   *           - name
   *           - email
   *           - type
   *           - password
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       204:
   *         description: No content
   *       401:
   *         description: Not authorized to access this resource
   *       404:
   *         description: Not found
   *       422:
   *         description: Unprocessable entity
   *       500:
   *         description: Internal Server Error
   */
  app.put('/:id', validate(validationRules.update), async (req, res) => {
    try {
      const result = await userRepository.update(req.params.id, req.body)
      if (result.affectedRows === 1) {
        return res.sendStatus(204)
      }
      return res.sendStatus(404)
    } catch (err) {
      return res.sendStatus(500)
    }
  })

  /**
   * Partially update an existing resource
   * @swagger
   * /api/users/{id}:
   *   patch:
   *     tags:
   *       - Users
   *     name: Partially update user
   *     summary: Partially updates an existing user
   *     security:
   *       - bearerAuth: []
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
   *             type:
   *               type: string
   *             password:
   *               type: string
   *               format: password
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       204:
   *         description: No content
   *       401:
   *         description: Not authorized to access this resource
   *       404:
   *         description: Not found
   *       422:
   *         description: Unprocessable entity
   *       500:
   *         description: Internal Server Error
   */
  app.patch('/:id', validate(validationRules.partialUpdate), async (req, res) => {
    try {
      const result = await userRepository.update(req.params.id, req.body)
      if (result.affectedRows === 1) {
        return res.sendStatus(204)
      }
      return res.sendStatus(404)
    } catch (err) {
      return res.sendStatus(500)
    }
  })
  
  /**
   * Destroy an existing resource
   * @swagger
   * /api/users/{id}:
   *   delete:
   *     tags:
   *       - Users
   *     name: Delete user
   *     summary: Deletes an existing user
   *     security:
   *       - bearerAuth: []
   *     consumes:
   *       - application/json
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: id
   *         in: path
   *         schema:
   *           type: string
   *         required:
   *           - id
   *     responses:
   *       204:
   *         description: No content
   *       401:
   *         description: Not authorized to access this resource
   *       404:
   *         description: Not found
   *       500:
   *         description: Internal Server Error
   */
  app.delete('/:id', async (req, res) => {
    try {
      const result = await userRepository.destroy(req.params.id)
      if (result.affectedRows === 1) {
        return res.sendStatus(204)
      }
      return res.sendStatus(404)
    } catch (err) {
      return res.sendStatus(500)
    }
  })

  return app
}