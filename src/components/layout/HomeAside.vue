<template>
    <div class="homeAside">
        <el-menu :default-active="activtyMenu" class="el-menu-vertical-demo" :unique-opened="true">
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <House />
                    </el-icon>
                    <span>首页</span>
                </template>
                <el-menu-item-group title="状态">
                    <router-link to="/home/overview">
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
                    <router-link to="/home/accountManagement">
                        <el-menu-item index="1-4">管理权</el-menu-item>
                    </router-link>
                    <router-link to="/home/interviewView">
                        <el-menu-item index="1-5">访问情况</el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script setup>
import { onMounted,ref } from 'vue';
import { useRouter } from 'vue-router';

const routes = [
    {
        path: '/home/overview',
        number: '1-1'
    },
    {
        path: '/home/systemlog',
        number: '1-2'
    },
    {
        path: '/home/serverstatus',
        number: '1-3'
    },
    {
        path: '/home/accountManagement',
        number: '1-4'
    },
    {
        path: '/home/interviewView',
        number: '1-5'
    }
]

const activtyMenu = ref('1-1');

onMounted(() => {
    // 判断当前路径
    const router = useRouter();

    const currentPath = router.currentRoute.value.path;

    // 遍历路由列表，找到匹配的路由
    const matchedRoute = routes.find(route => route.path === currentPath);
    if (matchedRoute) {
        // 如果找到匹配的路由，设置默认激活的菜单项
        const activeMenu = matchedRoute.number;
        activtyMenu.value = activeMenu;
    } else {
        // 如果没有匹配的路由，可以设置一个默认值或处理错误
        console.error('未找到匹配的路由');
    }
    
})
</script>

<style lang="scss" scoped>
.homeAside {
    width: 100%;
    height: 100%;
    border-right: 1px solid #ccc;
    background-color: #fff;
}
</style>