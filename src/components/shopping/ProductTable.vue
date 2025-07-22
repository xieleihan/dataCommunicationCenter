<template>
    <el-table :data="tableData"
        :show-overflow-tooltip="true" style="width: 100%">
        <el-table-column prop="productId" label="商品ID"></el-table-column>
        <el-table-column prop="title" label="商品名称"></el-table-column>
        <el-table-column prop="desctipiton" label="商品描述"></el-table-column>
        <el-table-column prop="dynamicTags" label="商品标签">
            <template #default="scope">
                <el-tag v-for="(tag, index) in JSON.parse(scope.row.dynamicTags)" :key="index" type="primary">{{ tag
                    }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column prop="currentPrice" label="现价"></el-table-column>
        <el-table-column prop="originalPrice" label="原价"></el-table-column>
        <el-table-column prop="fileList" label="轮播图">
            <template #default="scope">
                <el-image v-for="(item, index) in JSON.parse(scope.row.fileList)" :key="index" :src="item.url"
                    alt="商品图片" @click="emit('lookPic', item.url)" style="width: 50px; height: 50px; margin-right: 5px;" lazy />
            </template>
        </el-table-column>
        <el-table-column prop="productList" label="商品详情">
            <template #default="scope">
                <el-image v-for="(item, index) in JSON.parse(scope.row.productList)" :key="index" :src="item.url"
                    @click="emit('lookPic', item.url)" style="width: 50px; height: 50px; margin-right: 5px;" lazy fit="cover" />
            </template>
        </el-table-column>
        <el-table-column prop="faq" label="FAQ"></el-table-column>
        <el-table-column label="操作" width="200px">
            <template #default="scope">
                <el-button type="danger">修改</el-button>
                <el-button type="primary" @click="emit('lookMore', scope.row.link)">查看详情</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script setup>
import { defineProps,defineEmits } from 'vue';

const props = defineProps({
    tableData: {
        type: Array,
        default: () => []
    }
});

const emit = defineEmits(['lookMore', 'lookPic']);
</script>

<style lang="scss" scoped>

</style>