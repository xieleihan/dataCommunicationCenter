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
                <!-- 顶部轮播图 -->
                <div class="swiperImageBox">
                    <div class="swiperTitle">
                        <p>商品轮播图</p>
                        <el-icon>
                            <Warning />
                        </el-icon>
                    </div>
                    <p class="desc">请至少上传3张图片作为轮播图</p>
                </div>
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
                <el-dialog v-model="dialogVisible">
                    <img
                        w-full
                        :src="dialogImageUrl"
                        alt="Preview Image"
                    />
                </el-dialog>
                <!-- 商品标题 -->
                <div class="titleBox">
                    <span>商品标题:</span>
                    <el-input
                        v-model="ShopingPreviewObject.title"
                        placeholder="请输入商品标题(必填)"
                    />
                </div>
                <!-- 商品描述 -->
                <div class="titleBox">
                    <span>商品描述:</span>
                    <el-input
                        v-model="ShopingPreviewObject.description"
                        type="textarea"
                        placeholder="请输入商品描述(必填)"
                    />
                </div>
                <!-- 商品原价 -->
                <div class="titleBox">
                    <span>商品价格(原价):</span>
                    <el-input
                        v-model="ShopingPreviewObject.originalPrice"
                        placeholder="请输入商品原价(必填,自动格式化)"
                    />
                </div>
                <!-- 商品现价 -->
                <div class="titleBox">
                    <span>商品价格(现价):</span>
                    <el-input
                        v-model="ShopingPreviewObject.currentPrice"
                        placeholder="请输入商品现价(选填,不填则是原价,与原价相等时无效)"
                    />
                </div>
                <!-- 商品汇率换算 -->
                <div class="titleBox">
                    <span v-if="ShopingPreviewObject.currentPrice !== ShopingPreviewObject.originalPrice">商品折扣换算:</span>
                    <span
                        style="color: red;"
                        v-if="ShopingPreviewObject.currentPrice !== ShopingPreviewObject.originalPrice"
                    >{{ FormatPicel
                        }}</span>
                    <span>海外汇率换算:</span>
                    <el-select
                        v-model="exchangeRate"
                        style="width: 1rem;margin-right: .1rem;"
                        placeholder="请选择币种,自动换算"
                    >
                        <el-option
                            label="美元"
                            value="USD"
                        />
                        <el-option
                            label="港币"
                            value="HKD"
                        />
                        <el-option
                            label="英镑"
                            value="GBP"
                        />
                        <el-option
                            label="日币"
                            value="JPY"
                        />
                        <el-option
                            label="欧元"
                            value="EUR"
                        />
                    </el-select>
                    <span v-if="exchangeRateValue">换算地区价格: {{ exchangeRateValue }} | <span
                            class="placeholder">此处为运营查看,数据库为人民币</span></span>
                </div>
                <!-- 商品标签 -->
                <div class="titleBox">
                    <span>商品标签:</span>
                    <el-tag
                        v-for="tag in dynamicTags"
                        :key="tag"
                        closable
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                    >
                        {{ tag }}
                    </el-tag>
                    <el-input
                        v-if="inputVisible"
                        ref="InputRef"
                        v-model="inputValue"
                        class="w-20"
                        size="small"
                        @keyup.enter="handleInputConfirm"
                        @blur="handleInputConfirm"
                    />
                    <el-button
                        v-else
                        class="button-new-tag"
                        size="small"
                        @click="showInput"
                    >
                        + New Tag
                    </el-button>
                </div>
                <!-- 选项卡 -->
                <div class="tagBox">
                    <p>商品详情(图片流):</p>
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
                    <el-dialog v-model="dialogVisible">
                        <img
                            w-full
                            :src="dialogImageUrl"
                            alt="Preview Image"
                        />
                    </el-dialog>
                    <p>详细参数:</p>
                    <div>
                        <el-radio-group v-model="editType">
                            <el-radio value="edit">修改</el-radio>
                            <el-radio value="add">新增</el-radio>
                        </el-radio-group>
                        <!-- 修改区域 -->
                        <el-input v-model="editProductInfoKeyText" v-if="editType === edit" placeholder="请输入搜索的属性名" />
                        <el-table v-if="editType === edit"></el-table>
                        <!-- 新增区域 -->
                        <el-input v-model="addProoductInfoKeyText" v-if="editType === add" placeholder="属性名" />
                        <el-input v-model="addProoductInfoValueText" v-if="editType === add" placeholder="属性值" />
                        <el-button v-if="editType === add" type="info" @click="addProoductInfo(addProoductInfoKeyText, addProoductInfoValueText)">新增</el-button>
                    </div>
                    <p>商品FAQ:</p>
                    <el-input
                        v-model="ShopingPreviewObject.faq"
                        type="textarea"
                        placeholder="请输入商品FAQ"
                    />
                </div>
            </div>
            <div class="btnBox">
                <el-button type="info" @click="publishMail(ShopingPreviewObject)">发布公告</el-button>
                <el-button type="primary" @click="saveShopObj(ShopingPreviewObject)">保存</el-button>
            </div>
        </div>
        <div class="right">
            <div class="title">
                实时预览(仅供参考)
                <el-icon @click="copybox(ShopingPreviewObject.link)">
                    <Link />
                </el-icon>
            </div>
            <div class="preview-container">
                <el-empty
                    v-if="ShopingPreviewObject.fileList.length === 0"
                    description="description"
                />
                <ShopingPreviewView
                    v-else
                    :ShopingPreviewObject="ShopingPreviewObject"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, nextTick } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import ShopingPreviewView from './ShopingPreviewView.vue';
import { getExchangeRate,initAddShoping } from '../../../api/request';
import { nanoid } from 'nanoid';
import { ElMessage } from 'element-plus';
import { copyText } from '../../../utils/copyText';

// 需要传递给预览的对象
const ShopingPreviewObject = reactive({
    fileList: [], // 顶部轮播图数组
    title: '', // 商品标题
    description: '', // 商品描述
    originalPrice: '', // 商品原价
    currentPrice: '', // 商品现价
    link: '', // 商品链接
    productList: [], // 商品详情图片流数组
    tableData: [], // 详细参数表格
})
// 判断是否为本地开发环境
const isLocalhost = window.location.hostname === 'localhost'
const base_url = ref(isLocalhost
    ? import.meta.env.VITE_BASE_API +'/upload'
    : import.meta.env.VITE_BASE_LAN_API + '/upload')

// 选择的汇率
const exchangeRate = ref('');
const exchangeRateValue = ref(null);
const editType = ref('add'); // 编辑类型: edit(修改) | add(新增)
const addProoductInfoKeyText = ref(''); // 新增属性名
const addProoductInfoValueText = ref(''); // 新增属性值
const editProductInfoKeyText = ref(''); // 搜索修改属性名

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 处理上传成功的回调
const handleSuccess = (uploadFile) => {
    console.log(uploadFile)
    const obj = {
        url: uploadFile.data.url,
        name: uploadFile.data.alt,
        uid: Date.now() + Math.random().toString(36).substr(2, 9),
    }
    ShopingPreviewObject.fileList = [...ShopingPreviewObject.fileList, obj]
}

// 处理上传文件被删除的回调
const handleRemove = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

// 处理预览图片的回调
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
// 定义动态标签:输入框
const inputValue = ref('')
// 定义动态标签:标签数组
const dynamicTags = ref([])
// 定义输入框是否显示
const inputVisible = ref(false)
// 定义输入框的引用
const InputRef = ref()

// 处理标签关闭的回调
const handleClose = (tag) => {
    dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1)
}

// 显示输入框的函数
const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
        InputRef.value.input.focus()
    })
}

// 处理输入框确认的回调
const handleInputConfirm = () => {
    if (inputValue.value) {
        dynamicTags.value.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
}


// 复制函数
const copybox = async (text) => {
    const res = await copyText(text)
    if (res) {
        ElMessage({
            message: '复制成功',
            type: 'success',
            duration: 2000
        })
    } else {
        ElMessage({
            message: '复制失败',
            type: 'error',
            duration: 2000
        })
    }
}

// 新增产品详情
const addProoductInfo = (key, value) => {
    if (!key || !value) {
        ElMessage({
            message: '属性名和属性值不能为空去新增',
            type: 'warning',
            duration: 2000
        })
        return
    }
    // 扩展运算符
    ShopingPreviewObject.tableData = [...ShopingPreviewObject.tableData, { key, value }]
    addProoductInfoKeyText.value = ''
    addProoductInfoValueText.value = ''
}

// 保存数据到数据库
const saveShopObj = (obj) => {
    
}

// 发布公告逻辑
const publishMail = (obj) => {
    
}

onMounted(() => {
    // 获取实时汇率
    getExchangeRate({}).then((res) => {
        if(res.result === 'success') {
            Object.keys(res.conversion_rates).forEach((key) => {
                if (key === exchangeRate.value) {
                    exchangeRateValue.value = res.conversion_rates[key]
                } else {
                    exchangeRateValue.value = 1
                }
            })
        } else {
            console.error('获取实时汇率失败:', res)
        }
    }).catch((err) => {
        console.error('获取实时汇率失败:', err)
    })
    // 生成唯一一个ID
    const id = nanoid();
    // 初始化AddShoping数据
    initAddShoping({ id }).then((res) => {
        if (res.code === 200) {
            ShopingPreviewObject.link = res.link
        }
    }).catch((err) => {
        console.error('初始化AddShoping数据失败:', err)
    })
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