import { Decimal } from 'decimal.js';

export default {
    install(Vue) {
        Vue.prototype.$decimal = Decimal;

        // 设置全局配置
        Decimal.set({
            precision: 20, // 设置精度
            rounding: Decimal.ROUND_HALF_UP, // 设置舍入方式
            toExpNeg: -100, // 设置指数下限
            toExpPos: 100, // 设置指数上限
        });

        // 添加一个全局方法来格式化数字
        Vue.prototype.$formatDecimal = function (value) {
            return new Decimal(value).toFixed(2); // 保留两位小数
        };

        // 加法(传参可以多个)
        Vue.prototype.$add = function (...args) {
            return args.reduce((acc, val) => acc.plus(new Decimal(val)), new Decimal(0));
        };

        // 减法(传参可以多个)
        Vue.prototype.$subtract = function (...args) {
            return args.reduce((acc, val) => acc.minus(new Decimal(val)), new Decimal(0));
        };

        // 乘法(传参可以多个)
        Vue.prototype.$multiply = function (...args) {
            return args.reduce((acc, val) => acc.times(new Decimal(val)), new Decimal(1));
        };
        
        // 除法(传参可以多个)
        Vue.prototype.$divide = function (...args) {
            return args.reduce((acc, val) => acc.dividedBy(new Decimal(val)), new Decimal(1));
        };
    }
}