const getPreferencesModel = require('../models/preference.js')
const getUserModel = require('../models/user.js')
const ObjectId = require('mongoose').Types.ObjectId
const { getCurrentTimestamp } = require('../helpers/moment')

module.exports = (db) => {
  const preferencesModel = getPreferencesModel(db)
  const userModel = getUserModel(db)

  const getPreferences = async (id) => {
    try {
      return await preferencesModel.findOne({ userId: id })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  const update = async (id, body) => {
    try {
      body.updatedAt = getCurrentTimestamp()
      if (body.accessToken) {
        await userModel.findByIdAndUpdate(new ObjectId(id), {
          gitlabAccessToken: body.accessToken,
          updatedAt: body.updatedAt
        })
      }
      return await preferencesModel.findOneAndUpdate({ userId: id }, body, { upsert: true })
    } catch (err) {
      console.error(err)
      throw err
    }
  }

  return {
    getPreferences,
    update
  }
}