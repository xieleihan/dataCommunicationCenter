import { get, post, getOut } from './index';
// 获取环境变量
const githubOwner = import.meta.env.VITE_GITHUB_OWNER || 'xieleihan';
const githubRepo = import.meta.env.VITE_GITHUB_REPO || 'dataCommunicationCenter';

/**
 * 获取用户IP
 * @param {string} params
 * @returns res.ip
 */
export const getUserIp = function (params) {
    return getOut('https://api.vore.top/api/IPdata', params);
}

/**
 * 获取当前项目的版本信息
 */
export const getReleases = function (params) {
    return getOut(`https://api.github.com/repos/${githubOwner}/${githubRepo}/commits`, params);
}

/**
 * 获取图片验证码
 * @param {*} params 可不传
 * @returns {object} data 返回一个对象
 * @returns {number} data.code 返回code
 * @returns {string} data.data 返回图片验证码
 * @returns {string} data.key 返回Redis的键
 */
export function getImgVerify(params) {
    return get('/imgVerify/getImgVerify', params);
}

/**
 * 获取邮箱验证码
 * @param {email} data 邮箱 
 * @returns {string} data.data 返回邮箱验证码
 * @returns {string} data.key 返回Redis的键
 */
export function getEmailVerifyCode(data) {
    return post('/emailVerify/sendEmail', data);
}

/**
 * 超级管理员注册
 * @param {object} data 包含用户名、密码、邮箱等信息
 * @returns {object} data 返回一个对象
 */
export function superAdminRegister(data) {
    return post('/private/superRegister', data);
}

/**
 * 超级管理员登录
 */
export function superAdminLogin(data) {
    return post('/private/superLogin', data);
}

/**
 * 获取当前服务器的状态
 */
export function getServerStatus(params) { 
    return get('/private/getServerStatus', params);
}

/**
 * 获取进程列表
 */
export const getProcessList = (params) => {
    return get('/processes', params);
}

/**
 * 检验Token是否有效
 */
export const checkToken = (data) => {
    return post('/private/authentication', data);
}

/**
 * 导出用户表数据
 */
export const getUserData = (params) => {
    return get('/private/getSuperUserData', params);
}