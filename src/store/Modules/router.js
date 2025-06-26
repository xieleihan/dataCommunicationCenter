// 引入store
import { defineStore } from 'pinia'

const routerStore = defineStore('router', {
    state: () => ({
        pathList: []  // 存储访问过的路径
    }),

    getters: {
        getPathList: (state) => state.pathList
    },

    actions: {
        addPath(path) {
            // 如果已存在该路径，先删除（去重）
            this.pathList = this.pathList.filter(p => p !== path)

            // 添加到最前面
            this.pathList.unshift(path)

            // 限制最多 6 个
            if (this.pathList.length > 6) {
                this.pathList.pop()
            }
        },

        deletePath(path) {
            this.pathList = this.pathList.filter(p => p !== path)
        },

        clearPaths() {
            this.pathList = []
        }
    }
});

// 导出store
export default routerStore;