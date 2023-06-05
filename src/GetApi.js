import axios from "axios";

export default function GetApi() {

    const http = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    const http_image = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });
    const http_s3 = axios.create({
        baseURL: "http://127.0.0.1:8000/api/",
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob'
    });
    return {

        http,
        http_s3,
        http_image
    }
}