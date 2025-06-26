<template>
    <div class="homeView">
        <LayoutView />
    </div>
</template>

<script>
import LayoutView from '../layout/LayoutView.vue';
export default {
    name: 'HomeView',
    components: {
        LayoutView
    },

}
</script>

<style scoped lang="scss">
.homeView {
    width: 100%;
    height: 100%;
    // background: url(../assets/images/bg.webp) no-repeat center center / cover;
}
</style>