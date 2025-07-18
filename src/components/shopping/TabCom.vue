<template>
    <div class="tabCom">
        <el-tabs :type="type === '' ? '': 'border-card'" v-model="activeName" stretch="true">
            <el-tab-pane name="productList" label="商品详情">
                <ProductList :productList="productList" />
            </el-tab-pane>
            <el-tab-pane name="tableData" label="详细数据">
                <ProductInfo :productInfo="tableData" />
            </el-tab-pane>
            <el-tab-pane name="faq" label="常见问题">
                <ProductFaq :productFaq="productFaq" />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';
import ProductList from './ProductList.vue';
import ProductInfo from './ProductInfo.vue';
import ProductFaq from './ProductFaq.vue';

const activeName = ref('productList');
const props = defineProps({
    productList: {
        type: Array,
        default: () => []
    },
    tableData: {
        type: Object,
        default: () => ([])
    },
    productFaq: {
        type: String,
        default: () => ('')
    },
    type:{
        type: String,
        default: ()=> ('')
    }
});

</script>

<style lang="scss" scoped>
.tabCom{
    width: 100%;
}
</style>