import * as request from '~/utils/httpRequest';

//get

export const getAll = async () => {
    try {
        const res = await request.get('labels');
        return res;
    } catch (error) {
        console.log(error);
    }
};

//post
export const createLabel = async (data) => {
    try {
        const res = await request.post('labels', data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

//delete
export const removeLabel = async (id) => {
    try {
        await request.remove(`labels/${id}`);
    } catch (error) {
        console.log(error);
    }
};
