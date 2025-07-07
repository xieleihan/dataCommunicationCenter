<template>
    <div class="environmentVariableView">
        <el-row class="row">
            <el-col :span="24">
                <div class="titleBox">
                    <p class="title">环境变量</p>
                </div>
                <el-table :data="envVariables" v-loading="!envVariables || envVariables.length === 0"
                    @row-click="sendRowData" style="width: 100%;">
                    <el-table-column prop="key" label="变量名" width="180"></el-table-column>
                    <el-table-column prop="value" label="变量值"></el-table-column>
                </el-table>
            </el-col>
        </el-row>
        <div class="right">
            <keep-alive>
                <EditEnvironment :clickData="clickData" />
            </keep-alive>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getEnvVariables } from '../../../api/request';
import EditEnvironment from '../../../components/start/EditEnvironment.vue';

const envVariables = ref(null);
const clickData = ref(null);

onMounted(() => {
    getEnvVariables({}).then(res => {
        // 这里可以处理获取到的环境变量数据
        const obj = res.data;
        envVariables.value = Object.entries(obj).map(([key, value]) => ({
            key,
            value
        }));
    }).catch(error => {
        console.error("获取环境变量失败:", error);
    });
})

function sendRowData(row) {
    // 这里可以处理行点击事件
    console.log("点击的行数据:", row);
    clickData.value = row;
}
</script>

<style lang="scss" scoped>
.environmentVariableView {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    .row {
        width: 30%;
    }

    .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        .title {
            font-size: 24px;
            font-weight: bold;
        }
    }

    .right {
        height: 100%;
        width: 69%;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
    }
}
</style>