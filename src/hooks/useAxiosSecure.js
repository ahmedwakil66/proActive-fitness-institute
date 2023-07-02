import axios from "axios";
import { useEffect } from "react";
import baseUrl from "../utilities/URLs";

const axiosSecure = axios.create({
    baseURL: baseUrl,
})

const useAxiosSecure = () => {
    useEffect(() => {
        axiosSecure.interceptors.request.use(config => {
            const token = localStorage.getItem('proActive-token');
            if (token) {
                config.headers.authorization = `Bearer ${token}`
            }
            return config;
        })
    }, [])

    return { axiosSecure };
}

export default useAxiosSecure;