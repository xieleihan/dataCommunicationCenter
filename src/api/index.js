// 导入axios实例
import instance from "../utils/request";

// 判断当前是否是本地开发环境
const isLocal = window.location.hostname === 'localhost';

// 导入host_url
const host_url = isLocal ? import.meta.env.VITE_BASE_API : import.meta.env.VITE_BASE_LAN_API;

// 校验参数是否为对象类型
const validateParams = (params) => {
    if (params && typeof params !== 'object') {
        throw new Error('参数必须是一个对象');
    }
};

// 封装一个GET请求
export const get = async (url, params) => {
    console.log(`GET 请求: ${host_url}${url}`, params);
    try {
        validateParams(params);
        const response = await instance({
            url: `${host_url}${url}`,
            method: 'get',
            params,
        });
        return response;
    } catch (error) {
        console.error(`GET 请求错误: ${url}`, error);
        throw error; // 继续抛出错误，供调用方捕获
    }
};

// 封装一个POST请求
export const post = async (url, data) => {
    try {
        validateParams(data);
        const response = await instance({
            url: `${host_url}${url}`,
            method: 'post',
            data,
        });
        return response;
    } catch (error) {
        console.error(`POST 请求错误: ${url}`, error);
        throw error; // 继续抛出错误，供调用方捕获
    }
};

// 封装一个外网GET请求
export const getOut = async (url, params) => {
    try {
        validateParams(params);
        const response = await instance({
            url,
            method: 'get',
            params,
        });
        return response;
    } catch (error) {
        console.error(`GET 请求错误: ${url}`, error);
        throw error; // 继续抛出错误，供调用方捕获
    }
};

// 封装一个外网POST请求
export const postOut = async (url, data) => {
    try {
        validateParams(data);
        const response = await instance({
            url,
            method: 'post',
            data,
        });
        return response;
    } catch (error) {
        console.error(`POST 请求错误: ${url}`, error);
        throw error; // 继续抛出错误，供调用方捕获
    }
};