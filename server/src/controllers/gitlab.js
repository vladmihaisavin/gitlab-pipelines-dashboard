const { Router } = require('express')
const axios = require('axios')

module.exports = () => {
  const app = new Router()

  app.get('/projects', async (req, res) => {
    const { data } = await axios({
      method: 'get',
      url: 'https://www.gitlab.com/api/v4/projects',
      params: req.query,
      headers: {
        'PRIVATE-TOKEN': req.currentUser.gitlabAccessToken
      }
    })
    return res.json(data)
  })

  return app
}