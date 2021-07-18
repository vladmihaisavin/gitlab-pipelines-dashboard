import httpClient from 'axios.js';

export const fetchPreferences = () => {
    return httpClient.get('/preferences');
}

export const updatePreferences = (body) => {
    return httpClient.put('/preferences', body);
}