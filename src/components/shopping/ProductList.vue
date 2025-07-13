<template>
    <div class="ProductList">
        <img v-for="(item,index) in props.productList" :key="index" :src="item.url" alt="" />
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    productList: {
        type: Array,
        default: () => []
    }
});
</script>

<style lang="scss" scoped>
    .ProductList{
        width: 100%;
        height: fit-content;
        img{
            height: auto;
            object-fit: cover !important;
            max-height: fit-content !important;
        }
    }
</style>