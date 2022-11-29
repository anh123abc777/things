import * as request from '~/utils/httpRequest';

//get
export const getAll = async () => {
    try {
        const res = await request.get('things');
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const getArchivedThings = async () => {
    try {
        const res = await request.get('archived/things');
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const get = async (id) => {
    try {
        const res = await request.get(`things/${id}`);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//patch, put
export const update = async (id, data) => {
    try {
        const res = await request.patch(`things/${id}`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const labelThing = async (id, data) => {
    try {
        const res = await request.put(`things/${id}/labels`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//post
export const create = async (data) => {
    try {
        const res = await request.post(`things`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//delete
export const remove = async (id) => {
    try {
        await request.remove(`things/${id}`);
    } catch (error) {
        console.log(error);
    }
};

export const removeImages = async (imageId) => {
    try {
        await request.remove(`things/${imageId}/delete_image_attachment`);
    } catch (error) {
        console.log(error);
    }
};
