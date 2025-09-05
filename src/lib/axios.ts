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






let isRefreshing = false;
let pendingQueve: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void;
}[] = [];




const processQueve = (error: unknown) => {
    pendingQueve.forEach((promise) => {

        if (error) {
            promise.reject(error);
        } else {
            promise.resolve(null);
        }
    });


    pendingQueve = [];
};


axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async (error) => {


        const originalRequest = error.config as AxiosRequestConfig;



        if (error.response.status === 500 && error.response.data.message === "jwt expired") {


            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingQueve.push({ resolve, reject })
                })
                    .then(() => axiosInstance(originalRequest))
                    .catch((error) => Promise.reject(error));
            }

            isRefreshing = true;

            try {
                const res = await axiosInstance.post("/auth/refresh-token");

                processQueve(null)
                console.log(res);
                return axiosInstance(originalRequest);

            } catch (error) {
                processQueve(error)
                return Promise.reject(error)
            } finally {
                isRefreshing = false
            }
        }

        Promise.reject(error);
    }


);

