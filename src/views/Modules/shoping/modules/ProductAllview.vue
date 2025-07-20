<template>
    <div class="product">
        <!-- 商品标题 -->
        <div class="box title">商品标题:{{ props.ShopingPreviewObject.title }}</div>
        <!-- 商品描述 -->
        <div class="box desc">商品描述:{{ props.ShopingPreviewObject.desctipiton }}</div>
        <!-- 价格盒子 -->
        <div class="box picelBox" v-if="props.ShopingPreviewObject.currentPrice === ''">
            <span>￥</span>
            <!-- 原价 -->
            <div class="originalPrice">{{ props.ShopingPreviewObject.originalPrice }}</div>
            <!-- 现价 -->
            <div class="currentPrice">{{ props.ShopingPreviewObject.currentPrice }}</div>
        </div>
        <div class="box picelBox" v-else>
            <span>￥</span>
            <!-- 现价 -->
            <div class="originalPrice">{{ props.ShopingPreviewObject.originalPrice }}</div>
            <!-- 原价 -->
            <div class="currentPrice">{{ props.ShopingPreviewObject.currentPrice }}</div>
        </div>
        <!-- 商店信息-->
        <div class="box storeName">{{ props.ShopingPreviewObject.storeName }}</div>
        <!-- 商品标签 -->
        <div class="box ">
            <span>商品标签:</span>
            <el-tag type="primary" v-for="(item, index) in JSON.parse(props.ShopingPreviewObject.dynamicTags)"
                :key="index">{{ item }}</el-tag>
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
.product {
    width: 100%;

    .box {
        margin-bottom: .08rem;
    }

    .title {
        font-size: .12rem;
        line-height: .12rem;
        font-weight: bold;
    }

    .desc {
        font-size: .09rem;
        line-height: .09rem;
        color: #999;
    }

    .picelBox {
        width: 100%;
        display: flex;
        align-items: end;
        margin-top: .05rem;

        span {
            font-size: .12rem;
            color: #f00;
        }

        .originalPrice {
            font-size: .12rem;
            color: #f00;
            margin-right: .05rem;
            font-weight: bold;
        }

        .currentPrice {
            font-size: .08rem;
            text-decoration: line-through;
            color: #ccc;

        }
    }
}
</style>