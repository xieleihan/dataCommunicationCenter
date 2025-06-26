// 导入定义存储模块
import { defineStore } from 'pinia'

// 导出通用模块数据
export const useGeneralStore = defineStore('generalStore', {
    state: () => ({
        form: {
            ipinfo: {
                type: '',
                text: '',
                cnip: ''
            },
            ipdata: {
                info1: '',
                info2: '',
                info3: '',
                isp: ''
            },
            adcode: {
                o: '',
                p: '',
                c: '',
                n: '',
                r: '',
                a: '',
                i: true
            }
        }
    }),
    getters: {
        getForm(state) {
            return state.form;
        }
    },
    actions: {
        setForm(data) {
            this.form = data;
        }
    }
});