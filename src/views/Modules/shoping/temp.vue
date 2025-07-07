<template>
    <div class="shopingAddView">
        <div class="left">
            <div class="title leftTitle">
                <p>编辑区</p>
                <el-icon>
                    <Warning />
                </el-icon>
            </div>
            <div class="editor-container">
                <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
                    :mode="mode" />
                <Editor style="height: 500px; overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig"
                    :mode="mode" @onCreated="handleCreated" />
            </div>
            <div class="btnBox">
                <el-button type="info">发布公告</el-button>
                <el-button type="primary">保存</el-button>
            </div>
        </div>
        <div class="right">
            <div class="title">实时预览</div>
            <div class="preview-container">
                <el-empty v-if="valueHtml === '<p><br></p>'" description="description" />
                <ShopingPreviewView v-else :valueHtml="valueHtml" />
            </div>
        </div>
    </div>
</template>

<script>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import ShopingPreviewView from './ShopingPreviewView.vue'

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

import html from '../../../assets/template/wangEdit.js';

export default {
    components: { Editor, Toolbar, ShopingPreviewView },
    setup() {
        // 编辑器实例，必须用 shallowRef
        const editorRef = shallowRef()

        // 内容 HTML
        const valueHtml = ref('')
        // 初始化 base_url（根据环境判断）
        const isLocalhost = window.location.hostname === 'localhost'
        const base_url = isLocalhost
            ? import.meta.env.VITE_BASE_API
            : import.meta.env.VITE_BASE_LAN_API

        const toolbarConfig = {}
        const editorConfig = {
            placeholder: html,
            MENU_CONF: {
                uploadImage: {
                    server: '',
                    fieldName: 'file',
                    maxFileSize: 5 * 1024 * 1024, // 限制上传图片大小为5MB
                    maxNumberOfFiles: 1, // 限制上传图片数量为5张
                    accept: 'image/*', // 接受的文件类型
                },
            },
        }

        console.log("当前环境的base_url:", base_url, isLocalhost);

        editorConfig.MENU_CONF['uploadImage'] = {
            server: base_url + '/upload',
        }

        // 组件销毁时，也及时销毁编辑器
        onBeforeUnmount(() => {
            const editor = editorRef.value
            if (editor == null) return
            editor.destroy()
        })

        const handleCreated = (editor) => {
            editorRef.value = editor // 记录 editor 实例，重要！
        }

        return {
            editorRef,
            valueHtml,
            mode: 'default', // 或 'simple'
            toolbarConfig,
            editorConfig,
            handleCreated,
        }
    },
}
</script>

<style lang="scss" scoped>
.shopingAddView {
    width: 100%;
    height: 100%;
    display: flex;
    font-size: .1rem;

    .left,
    .right {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
            font-size: .1rem;
            font-weight: bold;
            line-height: 1;
            border-bottom: 1px solid #ccc;
        }
    }

    .left {
        width: 70%;

        border-right: 1px solid #ccc;
        padding-right: .1rem;
        box-sizing: border-box;

        .leftTitle {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .editor-container {
            border: 1px solid #ccc;
            height: calc(100% - 0.4rem);
        }

        .btnBox {
            display: flex;
            justify-content: end;
        }
    }

    .right {
        width: 30%;
        padding-left: .1rem;

        .preview-container {
            height: calc(100% - 0.2rem);
            width: 100%;
        }
    }
}
</style>



<template>
    <div class="ShopingPreviewView" v-html="valueHtml">
    </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
    valueHtml: {
        type: String,
        default: ''
    }
});

const valueHtml = ref(props.valueHtml);

watch(
    () => props.valueHtml,
    (newVal) => {
        valueHtml.value = newVal;
    },
    { immediate: true, deep: true }
)
</script>

<style lang="scss" scoped>
.ShopingPreviewView {
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    font-size: .1rem;

    ::v-deep(img) {
        max-width: 100% !important;
        min-width: 100% !important;
        height: fit-content !important;
        max-height: 1rem;
        width: 100%;
        object-fit: cover;
    }
}
</style>