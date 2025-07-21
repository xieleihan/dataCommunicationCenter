<template>
    <div class="canvasImage">
        <div class="left">
            <el-upload
                :action="base_url"
                list-type="picture-card"
                :on-success="handleSuccess"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
            >
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
        </div>
        <div class="right"></div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const base_url = ref(isLocalhost
    ? import.meta.env.VITE_BASE_API + '/upload'
    : import.meta.env.VITE_BASE_LAN_API + '/upload')
</script>

<style lang="scss" scoped>
.canvasImage{
    width: 100%;
    height: 100%;
    display: flex;
}
</style>