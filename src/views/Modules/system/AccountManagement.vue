<template>
    <div class="accountManagement">
        <div class="titleBox">
            <p class="title">账号管理</p>
            <div class="btnBox">
                <el-button type="primary">添加账号</el-button>
                <el-button type="danger">删除账号</el-button>
            </div>
        </div>
        <el-table :data="userData" style="width: 100%;">
            <el-table-column prop="superusername" label="用户名" />
            <el-table-column prop="permissions" label="角色">
                <template #default="{ row }">
                    <el-tag :type="row.permissions === 'admin' ? 'primary' : 'info'">{{ row.permissions === 'admin' ?
                        '超级管理员' : '普通用户' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="online" label="状态">
                <template #default="{ row }">
                    <el-tag :type="row.online === 1 ? 'success' : 'danger'">{{ row.online === 1 ? '在线' :
                        '离线' }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="{ row }">
                    <el-button @click="myeditor(row)" size="small" type="primary">编辑</el-button>
                    <el-button @click="mydelete (row)" size="small" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserData } from '../../../api/request';

const userData = ref([]);

onMounted(() => {
    // 获取用户数据
    getUserData({}).then(res => {
        console.log("获取到的用户数据", res);
        userData.value = res.data || [];
    }).catch(err => {
        console.error("获取用户数据失败", err);
    });
})
</script>

<style lang="scss" scoped>
.accountManagement {
    width: 100%;
    height: 100%;
    box-sizing: border-box;

    .titleBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: .2rem;

        .title {
            font-size: 0.1rem;
            font-weight: bold;
        }

        .btnBox {
            display: flex;
            gap: .02rem;
        }
    }

    el-table {
        width: 100%;
    }
}
</style>