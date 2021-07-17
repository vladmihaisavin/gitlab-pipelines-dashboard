import axios from 'axios.js';

export const listProjects = (gitlabUrl, params) => {
    return axios.get(`${gitlabUrl}/api/v4/projects`, { params });
};