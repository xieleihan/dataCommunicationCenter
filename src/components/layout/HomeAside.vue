<template>
    <div class="homeAside">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo" unique-opened="true">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>首页</span>
                </template>
                <el-menu-item-group title="状态">
                    <router-link @click="setRouterStore({
                        path: '/home/overview',
                        name: '概览',
                    })" to="/home/overview">
                        <el-menu-item index="1-1">
                            概览
                        </el-menu-item>
                    </router-link>
                    <router-link to="/home/systemlog">
                        <el-menu-item index="1-2">
                            系统日志
                        </el-menu-item>
                    </router-link>
                    <router-link to="/home/serverstatus">
                        <el-menu-item index="1-3">
                            服务器状态
                        </el-menu-item>
                    </router-link>
                </el-menu-item-group>
                <el-menu-item-group title="系统">
                    <router-link to="/home/system">
                        <el-menu-item index="1-4">管理权</el-menu-item>
                    </router-link>
                    <router-link to="/home/systemAccess">
                        <el-menu-item index="1-5">访问情况</el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
// 导入pinia
import routerStore from '../../store/Modules/router';
const store = routerStore();

const setRouterStore = (data) => {
    store.addPath(data);
};
</script>

<style lang="scss" scoped>
.homeAside {
    width: 100%;
    height: 100%;
    border-right: 1px solid #ccc;
    background-color: #fff;
}
</style>