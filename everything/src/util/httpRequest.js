import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
});

export const getAllThing = async (path) => {
    const response = await httpRequest.get(path);
    return response.data;
};
