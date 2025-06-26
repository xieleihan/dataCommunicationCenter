import { get, post } from './index';

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