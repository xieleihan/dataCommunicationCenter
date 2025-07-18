<template>
    <div class="storeManagement">
        <el-table :data="storeInfo" style="width: 100%">
            <el-table-column prop="storeImg" label="店铺头像">
                <template #default="scope">
                    <el-image
                        :src="scope.row.url"
                        style="width: 50px; height: 50px;"
                        fit="cover"
                    />
                </template>
            </el-table-column>
            <el-table-column prop="storeName" label="店铺名"></el-table-column>
        </el-table>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAllStoreInfo } from '../../../../api/request.js';

const storeInfo = ref([]);

onMounted(()=>{
    getAllStoreInfo().then((res) => {
        console.log(res);
        // 处理获取到的店铺信息
        if (res.code === 200) {
            storeInfo.value = res.data;
        } else {
            console.error("获取店铺信息失败:", res.message);
        }
    }).catch(error => {
        console.error("获取店铺信息失败:", error);
    });
})
</script>

<style lang="scss" scoped>
.storeManagement{
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
}
</style>