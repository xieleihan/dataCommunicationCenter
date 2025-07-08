import { Decimal } from 'decimal.js';

export default {
    install(app) {
        Decimal.set({
            precision: 20,
            rounding: Decimal.ROUND_HALF_UP,
            toExpNeg: -100,
            toExpPos: 100,
        });

        app.config.globalProperties.$decimal = Decimal;

        app.config.globalProperties.$formatDecimal = function (value) {
            return new Decimal(value).toFixed(2);
        };

        app.config.globalProperties.$add = function (...args) {
            return args.reduce((acc, val) => acc.plus(new Decimal(val)), new Decimal(0));
        };

        app.config.globalProperties.$subtract = function (...args) {
            return args.reduce((acc, val) => acc.minus(new Decimal(val)), new Decimal(0));
        };

        app.config.globalProperties.$multiply = function (...args) {
            return args.reduce((acc, val) => acc.times(new Decimal(val)), new Decimal(1));
        };

        app.config.globalProperties.$divide = function (...args) {
            return args.reduce((acc, val) => acc.dividedBy(new Decimal(val)), new Decimal(1));
        };
    }
};