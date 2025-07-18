<template>
    <div class="product">
        <!-- 商品标题 -->
        <div class="title"></div>
        <!-- 商品描述 -->
        <div class="desc"></div>
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
        <div class="storeName"></div>
        <!-- 商品标签 -->
        <el-tag type="primary">Tag 1</el-tag>
    </div>
</template>

<script setup>

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