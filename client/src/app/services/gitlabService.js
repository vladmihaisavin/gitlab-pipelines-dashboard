import httpClient from 'axios.js';

export const listProjects = (params) => {
    return httpClient.get('/gitlab/projects', { params });
};