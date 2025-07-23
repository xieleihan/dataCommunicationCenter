<template>
    <div class="storeInfo">
        <div class="title">店铺信息</div>
        <div class="top">
            <p>基本信息</p>
            <div class="content">
                <div class="avaterBox">
                    <span>头像图片:</span>
                    <el-image :src="`data:image/svg+xml;utf8,${encodeURIComponent(info.storeAvater)}`"
                        style="width: 50px; height: 50px;" fit="cover"
                        @click="changeImage('`data:image/svg+xml;utf8,${encodeURIComponent(info.storeAvater)}`')" />
                </div>
                <div class="infoBox">
                    <span>店铺名:</span>
                    <p>{{ info.storeName }}</p>
                </div>
                <!-- 后续扩展区域 -->
            </div>
        </div>
        <div class="bottom">
            <ProductTable :tableData="info.productList" @lookMore="lookMore" @lookPic="lookPic" />
        </div>
    </div>
    <el-dialog v-model="showConfirm" title="提示" width="600px">
        <p>是否要更换头像图片？</p>
        
        <CanvasImage />

        <template #footer>
            <el-button @click="onCancel">取消</el-button>
            <el-button type="primary" @click="onConfirm">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineEmits, onUnmounted, defineProps,ref } from 'vue';
import ProductTable from '../../../../components/shopping/ProductTable.vue';
import { useRouter } from 'vue-router';
import CanvasImage from '../../../../components/system/CanvasImage.vue';

const router = useRouter();

const emits = defineEmits(['closePreviewShoping']);
const props = defineProps({
    info: {
        type: Object,
        default: () => ({})
    }
});

const showConfirm = ref(false)

const lookMore = (link) => {
    console.log("查看详情链接", link);
    // 跳转到预览
    router.push({ path: '/shoping/shopingAllView/preview', query: { productId: link } });
}

const lookPic = (url) => {
    ElMessageBox.alert(`<img src="${url}" alt="商品图片" style="width: 100%; height: auto;">`, '商品图片', {
        dangerouslyUseHTMLString: true,
        showClose: true,
        closeOnClickModal: true,
        showCancelButton: false,
        showConfirmButton: false,
        center: true
    }).catch(() => {
        console.log("图片查看已关闭");
    });
}

const changeImage = (imageUrl) => {
    console.log("更换头像图片", imageUrl);
    showConfirm.value = true; // 显示确认对话框
}

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
    .title{
        font-size: .1rem;
        border-bottom: 1px solid #ccc;
        margin-bottom: .1rem;
    }
    .top{
        font-size: .08rem;
        .content{
            display: flex;
            flex-direction: row;
            .avaterBox{
                display: flex;
                align-items: start;
                margin-right: .1rem;
            }
            .infoBox{
                display: flex;
                flex-direction: row;
                align-items: flex-start;
            }
        }
    }
}
</style>