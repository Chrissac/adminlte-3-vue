import axios from 'axios';
import {BaseUrl} from './Config';
axios.defaults.baseURL = BaseUrl;

axios.interceptors.response.use(
    function (response) {
        return {ok: true, data: response?.data};
    },
    function (error) {
        return {ok: false, error: error?.response?.data};
    }
);
axios.interceptors.request.use(
    async (config) => {
        // token = await getToken()
        config.headers.Authorization = 'Basic TXlQdWNrQXBpOlJhbmFNdWhhbW1hZFRlc3RLZXkqJQ==';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export const ApiManager = {
    get: async (endpoint: string, params = {}) => {
        return axios.get(endpoint, {params});
    },
    post: async (endpoint: string, body: any, params = {}) => {
        return axios.post(endpoint, body, {params});
    },
    put: async (endpoint: string, body: any, params = {}) => {
        return axios.put(endpoint, body, {params});
    },
    patch: async (endpoint: string, body: any, params = {}) => {
        return axios.patch(endpoint, body, {params});
    },
    delete: async (endpoint: string, params: any) => {
        return axios.delete(endpoint, {params});
    }
};
