<template>
    <div class="shopingAll">
        <div class="left" v-if="!lookBigOrSmall">
            <div class="title">商品列表</div>
            <keep-alive>
                <div class="container"
                    :style="tableData.length === 0 ? 'display:flex;justify-content: center;align-items: center;' : 'display:flex;justify-content: center;align-items: flex-start;'">
                    <el-table v-if="tableData.length !== 0" v-loading="tableData.length === 0" :data="tableData"
                        :show-overflow-tooltip="true" style="width: 100%">
                        <el-table-column prop="productId" label="商品ID"></el-table-column>
                        <el-table-column prop="title" label="商品名称"></el-table-column>
                        <el-table-column prop="desctipiton" label="商品描述"></el-table-column>
                        <el-table-column prop="dynamicTags" label="商品标签">
                            <template #default="scope">
                                <el-tag v-for="(tag, index) in JSON.parse(scope.row.dynamicTags)" :key="index"
                                    type="primary">{{ tag }}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="currentPrice" label="现价"></el-table-column>
                        <el-table-column prop="originalPrice" label="原价"></el-table-column>
                        <el-table-column prop="fileList" label="轮播图">
                            <template #default="scope">
                                <el-image v-for="(item, index) in JSON.parse(scope.row.fileList)" :key="index"
                                    :src="item.url" alt="商品图片" @click="lookPic(item.url)"
                                    style="width: 50px; height: 50px; margin-right: 5px;" lazy />
                            </template>
                        </el-table-column>
                        <el-table-column prop="productList" label="商品详情">
                            <template #default="scope">
                                <el-image v-for="(item, index) in JSON.parse(scope.row.productList)" :key="index"
                                    :src="item.url" @click="lookPic(item.url)"
                                    style="width: 50px; height: 50px; margin-right: 5px;" lazy fit="cover" />
                            </template>
                        </el-table-column>
                        <el-table-column prop="faq" label="FAQ"></el-table-column>
                        <el-table-column label="操作" width="200px">
                            <template #default="scope">
                                <el-button type="danger">修改</el-button>
                                <el-button type="primary" @click="lookMore(scope.row.link)">查看详情</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-empty v-else description="暂无商品数据" ></el-empty>
                </div>
            </keep-alive>
        </div>
        <router-view v-else @closePreviewShoping="changeStatus" ></router-view>
        
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { getShoppingList } from '../../../api/request';
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';

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