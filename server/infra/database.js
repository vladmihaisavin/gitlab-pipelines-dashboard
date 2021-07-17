const mongoose = require('mongoose');

const getMongoConnectionUri = (config) => config.get('mongo.connectionUri')
  .replace('<user>', config.get('mongo.user'))
  .replace('<password>', config.get('mongo.password'))
  .replace('<dbname>', config.get('mongo.database'))

module.exports = (config) => new Promise(async (resolve, reject) => {
  try {
    const db = await mongoose.connect(getMongoConnectionUri(config), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    mongoose.set('returnOriginal', false);
    resolve(db)
  } catch (err) {
    reject(err)
  }
})
