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
                <div class="swiperImageBox">
                    <div class="swiperTitle">
                        <p>商品轮播图</p>
                        <el-icon>
                            <Warning />
                        </el-icon>
                    </div>
                    <p class="desc">请至少上传3张图片作为轮播图</p>
                </div>
                <el-upload :action="base_url" list-type="picture-card" :on-success="handleSuccess"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
                <div class="titleBox">
                    <span>商品标题:</span>
                    <el-input v-model="ShopingPreviewObject.title" placeholder="请输入商品标题(必填)" />
                </div>
                <div class="titleBox">
                    <span>商品描述:</span>
                    <el-input v-model="ShopingPreviewObject.description" type="textarea" placeholder="请输入商品描述(必填)" />
                </div>
                <div class="titleBox">
                    <span>商品价格(原价):</span>
                    <el-input v-model="ShopingPreviewObject.originalPrice" placeholder="请输入商品原价(必填,自动格式化)" />
                </div>
                <div class="titleBox">
                    <span>商品价格(现价):</span>
                    <el-input v-model="ShopingPreviewObject.currentPrice" placeholder="请输入商品现价(选填,不填则是原价,与原价相等时无效)" />
                </div>
                <div class="titleBox">
                    <span v-if="ShopingPreviewObject.currentPrice !== ShopingPreviewObject.originalPrice">商品折扣换算:</span>
                    <span style="color: red;"
                        v-if="ShopingPreviewObject.currentPrice !== ShopingPreviewObject.originalPrice">{{ FormatPicel
                        }}</span>
                    <span>海外汇率换算:</span>
                    <el-select style="width: 1rem;margin-right: .1rem;" placeholder="请选择币种,自动换算">
                        <el-option label="美元" value="1" />
                        <el-option label="港币" value="6.5" />
                        <el-option label="英镑" value="7.2" />
                        <el-option label="日币" value="8.0" />
                        <el-option label="欧元" value="9.0" />
                    </el-select>
                    <span>换算地区价格: | <span class="placeholder">此处为运营查看,数据库为人民币</span></span>
                </div>
                <div class="titleBox">
                    <span>商品标签:</span>
                    <el-input v-model="ShopingPreviewObject.tags" placeholder="请输入商品标签(选填,多个用英文逗号分隔)" />
                </div>
            </div>
            <div class="btnBox">
                <el-button type="info">发布公告</el-button>
                <el-button type="primary">保存</el-button>
            </div>
        </div>
        <div class="right">
            <div class="title">
                实时预览(仅供参考)
                <el-icon>
                    <Link />
                </el-icon>
            </div>
            <div class="preview-container">
                <el-empty v-if="ShopingPreviewObject.fileList.length === 0" description="description" />
                <ShopingPreviewView v-else :ShopingPreviewObject="ShopingPreviewObject" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive,ref, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import ShopingPreviewView from './ShopingPreviewView.vue'

const ShopingPreviewObject = reactive({
    fileList: [],
    title: '',
    description: '',
    originalPrice: '',
    currentPrice: ''
})
const isLocalhost = window.location.hostname === 'localhost'
const base_url = ref(isLocalhost
    ? import.meta.env.VITE_BASE_API +'/upload'
    : import.meta.env.VITE_BASE_LAN_API + '/upload')

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleSuccess = (uploadFile) => {
    console.log(uploadFile)
    const obj = {
        url: uploadFile.data.url,
        name: uploadFile.data.alt,
        uid: Date.now() + Math.random().toString(36).substr(2, 9),
    }
    ShopingPreviewObject.fileList = [...ShopingPreviewObject.fileList, obj]
}

const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

// 计算属性:现价与原价相等时，现价无效,但是现价与原价都填入且现价比原价小的时候,计算折扣
const FormatPicel = computed(() => {
    if (ShopingPreviewObject.currentPrice === ShopingPreviewObject.originalPrice) {
        return ShopingPreviewObject.originalPrice
    } else if (ShopingPreviewObject.currentPrice && ShopingPreviewObject.originalPrice && ShopingPreviewObject.currentPrice < ShopingPreviewObject.originalPrice) {
        return (parseFloat(ShopingPreviewObject.currentPrice).toFixed(2) / parseFloat(ShopingPreviewObject.originalPrice).toFixed(2) * 100).toFixed(2) + '%'
    }
    return ''
})
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
            padding: .1rem;
            .swiperImageBox{
                width: 100%;
                display: flex;
                align-items: end;
                margin-bottom: .05rem;
                .swiperTitle{
                    display: flex;
                    align-items: center;
                }
                .desc{
                    color: #ccc;
                    font-size: .08rem;
                    margin-left: .1rem;
                }
            }
            .titleBox{
                display: flex;
                margin: .05rem 0;
                align-items: center;
                span{
                    white-space: nowrap;
                    margin-right: .05rem;
                }
                .placeholder{
                    color: #ccc;
                    font-size: .08rem;
                }
            }
        }

        .btnBox {
            display: flex;
            justify-content: end;
        }
    }

    .right {
        width: 30%;
        padding-left: .1rem;
        .title{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .preview-container{
            height: calc(100% - 0.2rem);
            width: 100%;
        }
    }
}
</style>