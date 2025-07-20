<template>
    <div class="storeManagement" v-if="getStoreInfo == null">
        <el-table :data="storeInfo" style="width: 100%">
            <el-table-column prop="storeAvater" width="100px" label="店铺头像">
                <template #default="scope">
                    <el-image :src="`data:image/svg+xml;utf8,${encodeURIComponent(scope.row.storeAvater)}`"
                        style="width: 50px; height: 50px" fit="cover" />
                </template>
            </el-table-column>
            <el-table-column prop="storeName" width="150px" label="店铺名"></el-table-column>
            <el-table-column prop="productList" label="店铺产品">
                <template #default="scope">
                    <div style="display: flex;">
                        <div v-for="(item, index) in scope.row.productList" :key="index">
                            <el-image :src="JSON.parse(item.fileList)[0].url"
                                style="width: 50px; height: 50px; margin-right: 5px;" lazy fit="cover"
                                @click="goToProductInfoPage(item.productId)" />
                            <p class="overflow">{{ item.title }}</p>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="300px">
                <template #default="scope">
                    <el-button type="primary" @click="lookStoreInfoPage(scope.row)">查看详情</el-button>
                    <el-button type="danger" @click="() => { console.log('删除店铺', scope.row) }">删除店铺</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <router-view v-else @closePreviewShoping="changeStatus"></router-view>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAllStoreInfo, getProductById } from '../../../../api/request.js';
import { useRouter } from 'vue-router';

const storeInfo = ref([]);
const getStoreInfo = ref(null);
const router = useRouter();

const goToProductInfoPage = (productId) => {
    console.log("跳转到产品详情页，产品ID:", productId);
    // 这里可以使用路由跳转到产品详情页
    router.push({ path: '/shoping/shopingAllView/preview', query: { productId } });
};

const changeStatus = () => {
    getStoreInfo.value = null; // 重置店铺信息
    // 这里可以使用路由跳转回店铺管理页
    router.push({ path: '/shoping/storeManagement' });
};

const lookStoreInfoPage = (store) => {
    console.log("查看店铺详情:", store);
    getStoreInfo.value = store;
    // 这里可以使用路由跳转到店铺详情页
    router.push({ path: '/shoping/storeManagement/storeDetail', query: { storeId: store.storeId } });
};

onMounted(async () => {
    // 检查目前的url是否是/shoping/storeManagement,是给getStoreInfo置空
    if (window.location.pathname === '/shoping/storeManagement') {
        getStoreInfo.value = null;
    }

    getAllStoreInfo().then(async (res) => {
        console.log(res);

        if (res.code === 200) {
            const stores = await res.data;

            // 转换 productList 为数组
            await stores.forEach(store => {
                console.log('处理店铺:', store.productList, typeof store.productList === 'string', JSON.parse(store.productList));
                if (store.productList && typeof store.productList === 'string') {
                    store.productList = JSON.parse(store.productList);
                }
                console.log('转换后的 productList:', Array.isArray(store.productList));
            });

            // 对每个 store 的 productList 发请求，并覆盖成产品详情
            await Promise.all(stores.map(async (store) => {
                if (!Array.isArray(store.productList)) {
                    store.productList = [];
                    return;
                }

                const products = await Promise.all(store.productList.map(async (productId) => {
                    try {
                        const productRes = await getProductById({ productId:productId });
                        if (productRes.code === 200) {
                            return productRes.data;
                        } else {
                            console.warn('获取产品失败：', productRes.message);
                            return null;
                        }
                    } catch (e) {
                        console.error('获取产品异常：', e);
                        return null;
                    }
                }));

                // 用真实产品数据覆盖原本的 productList
                store.productList = products.filter(Boolean); // 去掉 null
            }));

            storeInfo.value = stores;
            console.log("店铺信息:", storeInfo.value);
        } else {
            console.error("获取店铺信息失败:", res.message);
        }
    }).catch(error => {
        console.error("获取店铺信息失败:", error);
    });
});
</script>

<style lang="scss" scoped>
.storeManagement{
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    padding: .1rem;
    ::v-deep(.overflow){
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 50px; /* 设置一个固定宽度 */
    }
}
</style>