<template>
    <div class="homeContainer">
        <div class="top">
            <div class="left">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index"
                        :to="index !== breadcrumbList.length - 1 ? item.path : null">
                        {{ item.name }}
                    </el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="right">
                <el-tag v-for="tag in store.getPathList" :key="tag" closable :disable-transitions="false"
                    @click="goToPage(tag.path)" size="small" @close="handleClose(tag)">
                    {{ tag.name }}
                </el-tag>
            </div>
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
import { useRouter,useRoute } from 'vue-router';
// 导入pinia
import routerStore from '../../store/Modules/router';
// 假设 routes 的 meta 定义了面包屑的结构
const router = useRouter();
const route = useRoute();
const store = routerStore();
const breadcrumbList = computed(() => {
    const matchedRoutes = route.matched.filter(item => item.meta && item.meta.breadcrumb);
    return matchedRoutes.map(item => ({
        path: item.path,
        name: item.meta.breadcrumb,
    }));
});

const goToPage = (path) => {
    router.push(path)
}

const handleClose = (tag) => {
    store.deletePath(tag);
}
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