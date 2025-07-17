<template>
    <div class="product">
        <div class="title"></div>
        <div class="desc"></div>
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