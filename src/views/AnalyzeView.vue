<template>
    <div class="analyze">
        <LayoutView />
    </div>
</template>

<script>
import LayoutView from '../layout/LayoutView.vue';
export default {
    name: 'AnalyzeView',
    components: {
        LayoutView
    },
}

</script>

<style lang="scss" scoped>
.analyze {
    width: 100%;
    height: 100%;
}
</style>