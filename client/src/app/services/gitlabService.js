import httpClient from 'axios.js'

export const listProjects = (params) => {
    return httpClient.get('/gitlab/projects', { params });
}

export const listPipelines = (projectId, branchToDisplay) => {
    return httpClient.get(`/gitlab/projects/${projectId}/pipelines?ref=${branchToDisplay}`);
}