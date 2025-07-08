// 导入创建存储库函数
import { createPinia } from "pinia";
// pinia持久化插件
import { createPersistedState } from 'pinia-plugin-persistedstate';

// 创建存储库
const store = createPinia();
// 使用持久化插件
store.use(createPersistedState());

// 导出存储库
export default store;