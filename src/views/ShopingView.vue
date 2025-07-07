<template>
    <div class="shoping">
        <LayoutView />
    </div>
</template>

<script>
import LayoutView from '../layout/LayoutView.vue';
export default {
    name: 'ShopingView',
    components: {
        LayoutView
    },
}

</script>

<style lang="scss" scoped>
.shoping {
    width: 100%;
    height: 100%;
}
</style>