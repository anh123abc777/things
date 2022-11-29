import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:3000/api/v1/',
});

export const get = async (path) => {
    const response = await httpRequest.get(path);
    return response.data;
};

export const post = async (path, data) => {
    const response = await httpRequest.post(path, data);
    return response.data;
};

export const patch = async (path, data) => {
    const response = await httpRequest.patch(path, data);
    return response.data;
};

export const put = async (path, data) => {
    const response = await httpRequest.put(path, data);
    return response.data;
};

export const remove = async (path) => {
    await httpRequest.delete(path);
};
