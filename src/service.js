import axios from 'axios';

export const request = async (url, method, data) => {
    return await axios[method](url, data);
};

export const checkvalue = (e = '') => {
    if (String(e).length > 0 && String(e) !== String(undefined) && String(e) !== String(null)) {
        return true;
    } else {
        return false;
    }
};