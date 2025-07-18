<template>
    <div class="product">
        <!-- 商品标题 -->
        <div class="title">{{ props.ShopingPreviewObject.title }}</div>
        <!-- 商品描述 -->
        <div class="desc">{{ props.ShopingPreviewObject.description}}</div>
        <!-- 价格盒子 -->
        <div class="picelBox" >
            <span>￥</span>
            <!-- 原价 -->
            <div class="originalPrice"></div>
            <!-- 现价 -->
            <div class="currentPrice"></div>
        </div>
        <div class="picelBox" >
            <span>￥</span>
            <!-- 现价 -->
            <div class="originalPrice"></div>
            <!-- 原价 -->
            <div class="currentPrice"></div>
        </div>
        <!-- 商店信息-->
        <div class="storeName">{{props.ShopingPreviewObject.storeName}}</div>
        <!-- 商品标签 -->
        <div>
            <el-tag type="primary" v-for="(item,index) in JSON.parse(props.ShopingPreviewObject.dynamicTags)" :key="index">{{item}}</el-tag>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    ShopingPreviewObject: {
        type: Object,
        default: () => ({
            title: '',
            description: '',
            originalPrice: '',
            currentPrice: '',
            dynamicTags: [],
            storeName: ''
        })
    }
})
</script>

<style lang="scss" scoped>
.product{
    width: 100%;
    .title{
        font-size: .12rem;
        line-height: .12rem;
        font-weight: bold;
    }
    .desc{
        font-size: .09rem;
        line-height: .09rem;
        color: #999;
    }
}
</style>