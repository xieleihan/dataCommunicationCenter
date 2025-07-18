import { get, post, getOut } from './index';
// 获取环境变量
const githubOwner = import.meta.env.VITE_GITHUB_OWNER || 'xieleihan';
const githubRepo = import.meta.env.VITE_GITHUB_REPO || 'dataCommunicationCenter';
const ExchangeRate_API = import.meta.env.VITE_EXCHANGE_RATE_API;

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

/**
 * 获取中国访问列表
 */
export const getChinaAccessList = (params) => {
    return get('/private/get-china-datalist', params);
}

/**
 * 获取后端环境变量
 */
export const getEnvVariables = (params) => {
    return get('/private/getEnvConfig', params);
}

/**
 * 修改后端环境变量
 */
export const setEnvVariables = (data) => {
    return post('/private/setEnvConfig', data);
}

/**
 * 上传图片
 */
export const uploadImage = (data) => {
    return post('/upload', data);
}

/**
 * 获取当前实时汇率信息
 * @returns {object} data 返回一个对象
 * @returns {String} data.result 返回success
 * @returns {String} data.base_code 返回基础货币代码
 * @returns {Object} data.conversion_rates 返回汇率转换对象
*/
export const getExchangeRate = (params) => {
    return getOut(`https://v6.exchangerate-api.com/v6/${ExchangeRate_API}/latest/CNY`, params);
}

/**
 * 初始化AddShoping数据的时候发给后端
 * @param {String} id nanoid
 * @returns {Object} data 返回一个对象
 * @returns {String} data.code 返回状态码
 * @returns {String} data.link 返回商品链接
*/
export const initAddShoping = (data) => {
    return post('/private/initAddShoping', data);
}

/**
 * 删除上传的图片
 */
export const deleteUploadImage = (data) => {
    return post('/deleteUpload', data);
}

/**
 * 新增的product加入数据库接口
 * @param {*} data 
 * @returns 
 */
export const saveShopingObj = (data) => {
    return post('/private/addProduct', data);
}

/**
 * 获取某一个productId的产品
 */
export const getProductById = (params) => {
    return get('/public/getProductById', params);
}

/* --------以下还没验证--------- */


/**
 * 发布公告的接口,主要实现就是新增的时候给存量用户或者是运营发送邮件
 */
export const publishMail = (data) => {
    return post('/private/publishMail', data);
}

/**
 * 获取所有入库商品列表(公共)
 */
export const getShoppingList = (params) => {
    return get('/public/getAllProduct', params);
}

/**
 * 变动商品的信息(私有)
 */
export const changeShoppingProductInfo = (data) => {
    return post('/private/changeShoppingProductInfo', data);
}

/**
 * 获取所有店铺信息(公共)
 */
export const getAllStoreInfo = (params) => {
    return get('/public/getAllStoreInfo', params);
}