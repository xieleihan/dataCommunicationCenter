import axios from 'axios'; // 导入axios

// 获取Cookie的数据
const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
        const [key, value] = cookie.split('=').map(c => c.trim());
        if (key === name) {
            return decodeURIComponent(value);
        }
    }
    return null;
};

// 创建axios实例
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API, // api的base_url
    timeout: 5000, // 请求超时时间
    // headers: {
    //     'Content-Type': 'application/json;charset=UTF-8',
    // },
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    const token = getCookie('AUTO_TOKEN');
    // console.log("获取到的token:", token);
    config.headers['Authorization'] = token;
    console.log("config:", config);
    // return config;
    return Promise.resolve(config);
},
    (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        // 假设响应数据结构为 { text, data }
        if (response.data && response.status === 200) {
            return response.data; // 返回解析后的数据
        }
        // 如果后端有明确的错误码，则在此处理
        const { code, status } = response.data;
        if (code !== 200 && status !== 200) {
            return Promise.reject(response.data);
        }
        return response.data;
    },
    (error) => {
        // 捕获网络或服务器错误
        console.error("请求失败:", error.response || error);
        return Promise.reject(error);
    }
);

// 暴露这个实例
export default instance;