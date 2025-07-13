<template>
    <div>
        <el-table :data="props.productInfo" style="width: 100%">
            <el-table-column prop="key" label="商品属性" />
            <el-table-column prop="value" label="属性值" />
        </el-table>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    productInfo: {
        type: Array,
        default: () => []
    }
});
</script>

<style lang="scss" scoped>

</style>