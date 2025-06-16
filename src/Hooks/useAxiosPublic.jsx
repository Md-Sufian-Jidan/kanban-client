import axios from 'axios';

export const axiosPublic = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL
    // baseURL: 'http://localhost:5000'
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;