<template>
    <div class="homeContainer">
        <div class="top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index"
                    :to="index !== breadcrumbList.length - 1 ? item.path : null">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-divider />
        <div class="content">
            <router-view />
        </div>
    </div>
</template>

<script setup>
// 导入Vue-Router
import { computed } from 'vue';
// 导入Vue-Router
import { useRoute } from 'vue-router';
const route = useRoute();
const breadcrumbList = computed(() => {
    const matchedRoutes = route.matched.filter(item => item.meta && item.meta.breadcrumb);
    return matchedRoutes.map(item => ({
        path: item.path,
        name: item.meta.breadcrumb,
    }));
});
</script>

<style lang="scss" scoped>
    @import '../../styles/base.module.scss';
    .homeContainer{
        width: 100%;
        height: 100%;
        .top{
            width: 100%;
            display: flex;
            height: .08rem;
            
            .left,
            .right{
                width: 50%;
            }
            .left{
                border-right: 1px solid #ccc;
            }
        }
        .content{
            width: 100%;
            height: calc(100% - .34rem);
            overflow-y: auto;
            // 设置滚动条样式
            ::-webkit-scrollbar {
                display: none; /* 隐藏滚动条 */
            }
        }
    }
</style>