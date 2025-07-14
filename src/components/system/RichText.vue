<template>
    <div class="editor-container">
        <Toolbar style="border-bottom: 1px solid #ccc" :editor="editorRef" :defaultConfig="toolbarConfig"
            :mode="mode" />
        <Editor style="height: .6rem; overflow-y: hidden;box-shadow: 1px 0px 2px #ccc;" v-model="valueHtml"
            :defaultConfig="editorConfig" :mode="mode" @onCreated="handleCreated" />
    </div>
</template>

<script>
import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css' // 引入 css

export default {
    components: { Editor, Toolbar },
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
            placeholder: '请输入内容',
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
.editor-container{
    width: 100%;
    height: 100%;
}
</style>