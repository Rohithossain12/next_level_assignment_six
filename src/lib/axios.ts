/* eslint-disable @typescript-eslint/no-unused-vars */

import config from "@/config";
import axios, { type AxiosRequestConfig } from "axios"

export const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
    
});

axiosInstance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});



axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
