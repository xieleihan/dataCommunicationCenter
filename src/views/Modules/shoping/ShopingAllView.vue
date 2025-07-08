<template>
    <div class="shopingAll">
        <div class="left">
            <keep-alive>
                
            </keep-alive>
        </div>
        <div class="right">
            <div class="title">
                客户端模拟
                <el-icon @click="copybox(ShopingPreviewObject.link)">
                    <Link />
                </el-icon>
            </div>
            <!-- 路由出口 -->
            <router-view></router-view>
        </div>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
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
    }
    .left{
        width: 70%;
        border-right: 1px solid #ccc;
        padding-right: .1rem;
        box-sizing: border-box;
    }
    .right{
        width: 30%;
        padding-left: .1rem;
    }
}
</style>