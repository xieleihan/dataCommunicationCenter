<template>
    <div class="homeView">
        <LayoutView />
    </div>
</template>

<script>
import LayoutView from '../layout/LayoutView.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
export default {
    name: 'HomeView',
    components: {
        LayoutView
    },
    setup() {
        // 在组件挂载时执行一些初始化操作
        onMounted(() => {
            // 跳转到首页
            const route = useRouter();
            // route.push({
            //     path: '/home/overview',
            // })
        });
    }
}
</script>

<style scoped lang="scss">
.homeView {
    width: 100%;
    height: 100%;
    // background: url(../assets/images/bg.webp) no-repeat center center / cover;
}
</style>