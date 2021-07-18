const convict = require('convict')

module.exports = convict({
  app: {
    env: {
      doc: 'The environment that the app is run on.',
      format: ['production', 'local'],
      default: 'production',
      env: 'APP_ENV'
    },
    port: {
      doc: 'The port the app is listening to.',
      format: 'port',
      default: 6606,
      env: 'PORT'
    },
    url: {
      doc: 'Web app URL',
      format: String,
      default: 'http://localhost:3000',
      env: 'APP_URL'
    },
    apiUrl: {
      doc: 'API URL',
      format: String,
      default: 'http://localhost:6606',
      env: 'API_URL'
    },
  },
  mongo: {
    user: {
      doc: 'The username used to connect to the mongo server instance.',
      format: String,
      default: 'vanelli',
      env: 'MONGO_USER'
    },
    password: {
      doc: 'The username password used to connect to the mongo server instance.',
      format: String,
      default: '',
      env: 'MONGO_PASSWORD'
    },
    database: {
      doc: 'The database name used to store the app records.',
      format: String,
      default: 'development',
      env: 'MONGO_DBNAME'
    },
    connectionUri: {
      doc: 'The database name used to store the app records.',
      format: String,
      default: 'mongodb+srv://<user>:<password>@cluster0.arurd.mongodb.net/<dbname>?retryWrites=true&w=majority',
      env: 'MONGO_CONN_URI'
    }
  },
  auth: {
    secret: {
      doc: 'Secret key used by passport js to sign the JWT',
      format: String,
      default: 'asd123',
      env: 'AUTH_SECRET'
    },
    expiresIn: {
      doc: 'Token TTL',
      format: Number,
      default: 60 * 60,
      env: 'AUTH_EXPIRES_IN'
    }
  },
  swaggerDefinition: {
    info: {
      title: 'Project Name',
      version: '0.1.0',
      description: '',
    },
    basePath: '/',
    securityDefinitions: {
      bearerAuth: {
        type: 'apiKey',
        name: 'Authorization',
        scheme: 'bearer',
        in: 'header',
      },
    },
  }
}).validate({ allowed: 'strict' })
