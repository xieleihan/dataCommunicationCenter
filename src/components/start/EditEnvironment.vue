<template>
    <div class="editEnvironment">
        <keep-alive>
            <el-card>
                <p class="title">修改变量</p>
                <el-divider />
                <el-form label-width="80px" class="editForm" v-if="!operInput">
                    <el-form-item label="变量名">
                        <el-input v-model="key" disabled placeholder="请输入变量名" />
                    </el-form-item>
                    <el-form-item label="变量值">
                        <el-input v-model="value" :disabled="openDisable" placeholder="请输入变量值" />
                    </el-form-item>
                </el-form>
                <p class="prompt" v-else>暂无可修改的变量</p>
                <div class="operate">
                    <div class="btnBox">
                        <el-button @click="key = ''; value = '';operInput = true">取消</el-button>
                        <el-button @click="openMessageBox" type="danger">修改</el-button>
                    </div>
                </div>
            </el-card>
        </keep-alive>
    </div>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineProps, ref, watch } from 'vue';
import { setEnvVariables } from '../../api/request';

const props = defineProps({
    clickData: {
        type: Object,
        default: () => ({ key: '', value: '' })
    }
});

// 本地可编辑副本
const key = ref('');
const value = ref('');
const operInput = ref(true);
const openDisable = ref(true);

// 同步 props 到本地变量
watch(
    () => props.clickData,
    (newVal) => {
        key.value = newVal?.key ?? '';
        value.value = newVal?.value ?? '';
        operInput.value = !newVal?.key; // 如果有 key，则允许编辑
    },
    { immediate: true, deep: true }
);

async function openMessageBox() {
    if (operInput.value) {
        ElMessage.warning('请先选择一个变量进行编辑');
        return;
    }

    const isSensitive = ['MYSQL_PASSWORD', 'REDIS_PASSWORD', 'EMAIL_PASSWORD', 'SECRET_KEY'].includes(key.value);

    try {
        if (isSensitive) {
            // 第一步：输入权限密码
            const { value: passwordInput } = await ElMessageBox.prompt(
                `变量 "${key.value}" 为敏感字段，请输入权限密码以继续修改。`,
                '权限验证',
                {
                    inputType: 'password',
                    inputPattern: /.+/,
                    inputErrorMessage: '密码不能为空',
                    confirmButtonText: '下一步',
                    cancelButtonText: '取消',
                    type: 'warning'
                }
            );

            // 第二步：输入变量的新值
            const { value: newValue } = await ElMessageBox.prompt(
                `请输入 "${key.value}" 的新值`,
                '修改变量',
                {
                    inputValue: value.value,
                    inputPattern: /.+/,
                    inputErrorMessage: '值不能为空',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }
            );

            const payload = {
                obj: { [key.value]: newValue }, // 将用户输入的值赋给变量
                password: passwordInput
            };

            const res = await setEnvVariables(payload);
            if (res.code === 200) {
                ElMessage.success(`敏感变量 ${key.value} 修改成功`);
                value.value = '';
                operInput.value = true;
            } else {
                ElMessage.error(res.message || '修改失败');
            }

        } else {
            // 非敏感变量直接输入新值
            const { value: newValue } = await ElMessageBox.prompt(
                `请输入 "${key.value}" 的新值`,
                '修改变量',
                {
                    inputValue: value.value,
                    inputPattern: /.+/,
                    inputErrorMessage: '值不能为空',
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }
            );

            const payload = {
                obj: { [key.value]: newValue }
            };

            const res = await setEnvVariables(payload);
            if (res.code === 200) {
                ElMessage.success(`变量 ${key.value} 修改成功`);
                value.value = '';
                operInput.value = true;
            } else {
                ElMessage.error(res.message || '修改失败');
            }
        }
    } catch (err) {
        ElMessage.info('已取消修改');
    }
}
</script>

<style lang="scss" scoped>
.editEnvironment {
    width: 100%;
    height: 100%;
    padding: .1rem;
    .title{
        font-size: .1rem;
        font-weight: bold;
    }
    .operate{
        width: 100%;
        display: flex;
        justify-content: flex-end;
    }
    .prompt{
        width: 100%;
        text-align: center;
        color: #ccc;
    }
}
</style>