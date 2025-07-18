<template>
    <div class="previewShoping">
        <el-skeleton v-if="Object.keys(ShopingPreviewObject).length === 0" :rows="5" animated />
        <div class="container" v-else>
            <div class="top">
                <div class="left">
                    <el-carousel>
                        <el-carousel-item v-for="(item, index) in JSON.parse(ShopingPreviewObject.fileList)"
                            :key="index">
                            <img :src="item.url" alt="商品图片" style="width: 100%; height: 100%; object-fit: cover;" />
                        </el-carousel-item>
                    </el-carousel>
                </div>
                <div class="right">

                </div>
            </div>
            <div class="bottom">
                <TabCom :product-list="JSON.parse(ShopingPreviewObject.productList)" :table-data="JSON.parse(ShopingPreviewObject.tableData)" :product-faq="JSON.parse(ShopingPreviewObject.faq)" :type="'border-card'" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onUnmounted, defineEmits, onMounted, ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { getProductById } from '../../../api/request';
import TabCom from '../../../components/shopping/TabCom.vue';

const emits = defineEmits(['closePreviewShoping']);
const route = useRoute()

const ShopingPreviewObject = ref({}); // 用于存储商品详情数据

onMounted(() => {
    const productId = route.query.productId
    console.log("组件加载了，productId:", productId)
    getProductById({ productId }).then(res => {
        console.log("获取到的商品详情", res);
        // 这里可以处理获取到的商品详情数据
        if (res.data) {
            setTimeout(() => {
                ShopingPreviewObject.value = res.data; // 假设返回的数据是一个数组，取第一个元素
                
            },3000)
        } else {
            console.warn("没有找到商品详情");
        }
    }).catch(err => {
        console.error("获取商品详情失败", err);
    });
})

onUnmounted(() => {
    console.log("组件卸载了");
    emits('closePreviewShoping',false); // 组件卸载时触发关闭事件
})
</script>

<style lang="scss" scoped>
.previewShoping{
    width: 100%;
    height: 100%;
    padding: .1rem;
    overflow: auto;
    .container{
        width: 100%;
        .top{
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: .1rem;
            .left{
                width: 30%;
                aspect-ratio: 1/1;
                ::v-deep(.el-carousel){
                    height: 100%;
                    .el-carousel__container{
                        height: 100%;
                    }
                }
            }
            .right{
                width: 68%;
                background-color: #ccc;
            }
        }
        .buttom{
            width: 100%;
        }
    }
}
</style>