<template>
    <div class="storeInfo">

    </div>
</template>

<script setup>
import { defineEmits, onUnmounted } from 'vue';

const emits = defineEmits(['closePreviewShoping']);

onUnmounted(() => {
    console.log("StoreInfoView组件卸载了");
    emits('closePreviewShoping'); // 组件卸载时触发关闭事件
})
</script>

<style lang="scss" scoped>
.storeInfo{
    width: 100%;
    height: 100%;
}
</style>