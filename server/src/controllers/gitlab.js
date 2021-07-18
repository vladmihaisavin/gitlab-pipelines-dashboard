const { Router } = require('express')
const axios = require('axios')

module.exports = () => {
  const app = new Router()

  app.get('/projects', async (req, res) => {
    if (req.currentUser.gitlabAccessToken) {
      const { data } = await axios({
        method: 'get',
        url: 'https://www.gitlab.com/api/v4/projects',
        params: req.query,
        headers: {
          'PRIVATE-TOKEN': req.currentUser.gitlabAccessToken
        }
      })
      return res.json(data)
    }
    return res.sendStatus(403)
  })

  app.get('/projects/:projectId/pipelines', async (req, res) => {
    if (req.currentUser.gitlabAccessToken) {
      const { data } = await axios({
        method: 'get',
        url: `https://www.gitlab.com/api/v4/projects/${req.params.projectId}/pipelines`,
        params: req.query,
        headers: {
          'PRIVATE-TOKEN': req.currentUser.gitlabAccessToken
        }
      })
      return res.json(data)
    }
    return res.sendStatus(403)
  })

  return app
}