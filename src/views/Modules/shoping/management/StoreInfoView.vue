<template>
    <div class="storeInfo">
        <div class="title">店铺信息</div>
        <div class="top">
            <p>基本信息</p>
            <div class="content">
                <div class="avaterBox">
                    <span>头像图片:</span>
                    <el-image
                        :src="`data:image/svg+xml;utf8,${encodeURIComponent(info.storeAvater)}`"
                        style="width: 100px; height: 100px;"
                        fit="cover"
                        @click="changeImage('`data:image/svg+xml;utf8,${encodeURIComponent(info.storeAvater)}`')"
                    />
                </div>
                <div class="infoBox">
                    <span>店铺名:</span>
                    <p>{{ info.storeName }}</p>
                </div>
                <!-- 后续扩展区域 -->
            </div>
        </div>
        <div class="bottom">
            <el-table style="width: 100%">

            </el-table>
        </div>
    </div>
</template>

<script setup>
import { ElMessage,h } from 'element-plus';
import { defineEmits, onUnmounted,defineProps } from 'vue';

const emits = defineEmits(['closePreviewShoping']);
const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    }
});

const changeImage = (imageUrl) => {
    console.log("点击了头像图片，当前图片URL:", imageUrl);
    ElMessage.confirm('是否要更换头像图片？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        
    }).catch(() => {
        ElMessage.info('已取消更换头像图片');
    });
};

onUnmounted(() => {
    console.log("StoreInfoView组件卸载了");
    emits('closePreviewShoping'); // 组件卸载时触发关闭事件
})
</script>

<style lang="scss" scoped>
.storeInfo{
    width: 100%;
    height: 100%;
    overflow: auto;
}
</style>