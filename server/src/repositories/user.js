const getUserModel = require('../models/user.js')
const ObjectId = require('mongoose').Types.ObjectId
const { hashPassword } = require('../helpers/bcrypt')
const { getCurrentTimestamp } = require('../helpers/moment')

module.exports = (db) => {
  const userModel = getUserModel(db)

  const list = async (filter = {}) => {
    try {
      return await userModel.find(filter, { password: 0 }, {sort: 'name'})
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const store = async (body) => {
    try {
      body.password = await hashPassword(body.password)
      return await userModel.create(body)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const getById = async (id) => {
    try {
      return await userModel.findById(new ObjectId(id), { password: 0 });
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const getByEmail = async (email) => {
    try {
      return await userModel.findOne({ email })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const find = async (filter) => {
    try {
      return await userModel.findOne(filter)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const update = async (id, body) => {
    try {
      if (body.password) {
        body.password = await hashPassword(body.password)
      }
      body.updatedAt = getCurrentTimestamp()
      return await userModel.findByIdAndUpdate(new ObjectId(id), body)
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const destroy = async (id) => {
    try {
      return await userModel.findByIdAndDelete(new ObjectId(id))
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return {
    list,
    store,
    getById,
    getByEmail,
    find,
    update,
    destroy
  }
}