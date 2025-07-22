<template>
    <div class="shopingAll">
        <div class="left" v-if="!lookBigOrSmall">
            <div class="title">商品列表</div>
            <keep-alive>
                <div class="container"
                    :style="tableData.length === 0 ? 'display:flex;justify-content: center;align-items: center;' : 'display:flex;justify-content: center;align-items: flex-start;'">
                    <div style="width: 100%;" v-if="tableData.length !== 0" v-loading="tableData.length === 0">
                        <ProductTable :tableData="tableData" @lookMore="lookMore" @lookPic="lookPic"></ProductTable>
                    </div>
                    <el-empty v-else description="暂无商品数据"></el-empty>
                </div>
            </keep-alive>
        </div>
        <router-view v-else @closePreviewShoping="changeStatus"></router-view>

    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { getShoppingList } from '../../../api/request';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import ProductTable from '../../../components/shopping/ProductTable.vue';

const router = useRouter();

const tableData = ref([]);
const lookBigOrSmall = ref(false);

const lookMore = (link) => {
    console.log("查看详情链接", link);
    lookBigOrSmall.value = true; // 切换到大屏模式
    // 跳转到预览
    router.push({ path: '/shoping/shopingAllView/preview', query: { productId:link } });
}

const changeStatus = (status) => {
    console.log("切换状态", status);
    lookBigOrSmall.value = status; // 切换状态
}

const lookPic = (url) => {
    ElMessageBox.alert(`<img src="${url}" alt="商品图片" style="width: 100%; height: auto;">`, '商品图片', {
        dangerouslyUseHTMLString: true,
        showClose: true,
        closeOnClickModal: true,
        showCancelButton: false,
        showConfirmButton: false,
        center: true
    }).catch(() => {
        console.log("图片查看已关闭");
    });
}

onMounted(() => {
    // 检测目前的url是否有productId参数
    const query = router.currentRoute.value.query;
    if (query.productId) {
        lookBigOrSmall.value = true; // 如果有productId参数，切换到
    } else {
        lookBigOrSmall.value = false; // 否则保持小屏模式
    }
    // 获取商品列表
    getShoppingList({}).then(res => {
        console.log("获取到的商品列表", res);
        tableData.value = res.data || [];
    }).catch(err => {
        console.error("获取商品列表失败", err);
    });
});

onUnmounted(() => {
    const query = router.currentRoute.value.query;
    if (query.productId) {
        lookBigOrSmall.value = true; // 如果有productId参数，切换到
    } else {
        lookBigOrSmall.value = false; // 否则保持小屏模式
    }
});
</script>

<style lang="scss" scoped>
.shopingAll{
    width: 100%;
    height: 100%;
    display: flex;
    .left,
    .right{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .title{
            font-size: .1rem;
        }
    }
    .left{
        width: 100%;
        box-sizing: border-box;
        .container{
            width: 100%;
            height: calc(100% - 0.2rem);
            padding: .1rem;
            border: 1px solid #ccc;
        }
    }
}
</style>