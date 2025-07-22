<template>
    <div class="canvasImage">
        <div class="left">
            <el-upload ref="uploadRef" :action="base_url" list-type="picture-card" :on-success="handleSuccess"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-exceed="handleExceed" :limit="1"
                :before-upload="beforeUpload" v-if="pic === null">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
        </div>
        <div class="right" v-if="pic !== null">
            <img ref="cropperImg" :src="pic.url" loading="lazy" style="max-width: 100%;" />
        </div>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="dialogVisible" title="图片预览">
        <img :src="dialogImageUrl" style="width: 100%" />
    </el-dialog>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { ElMessage, ElDialog } from 'element-plus'
import Cropper from 'cropperjs';

const isLocalhost = window.location.hostname === 'localhost'
const base_url = ref(isLocalhost
    ? import.meta.env.VITE_BASE_API + '/upload'
    : import.meta.env.VITE_BASE_LAN_API + '/upload')

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const uploadRef = ref(null)

const pic = ref(null)
const cropper = ref(null);
const cropperImg = ref(null);

const beforeUpload = (file) => {
    const isValid = file.type.startsWith('image/')
    if (!isValid) {
        ElMessage.error('只能上传图片文件')
    }
    return isValid
}

const handleSuccess = (uploadFile) => {
    console.log('上传成功:', uploadFile)
    if (uploadFile.errno == 0) {
        const obj = {
            url: uploadFile.data.url,
            name: uploadFile.data.alt,
            uid: Date.now() + Math.random().toString(36).substr(2, 9),
        }
        pic.value = obj
        nextTick(() => {
            if (cropper.value) cropper.value.destroy();
            cropper.value = new Cropper(cropperImg.value, {
                aspectRatio: 1,
                viewMode: 1,
                autoCropArea: 1,
            });
        });
    } else {
        ElMessage.error('上传失败')
    }
}

const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

const handleRemove = (uploadFile) => {
    const filename = uploadFile.response?.data?.alt
    if (!filename) {
        ElMessage.error('文件信息异常')
        return
    }

    deleteUploadImage({ filename })
        .then((res) => {
            if (res.code === 200) {
                ElMessage.success('删除成功')
            } else {
                ElMessage.error('删除失败')
            }
        })
        .catch((err) => {
            console.error('删除失败:', err)
            ElMessage.error('删除失败')
        })

    pic.value = null
}

const handleExceed = () => {
    ElMessage.warning('只能上传一张图片')
    uploadRef.value?.clearFiles()
}
</script>

<style lang="scss" scoped>
.canvasImage{
    width: 100%;
    height: 100%;
    display: flex;
}
</style>