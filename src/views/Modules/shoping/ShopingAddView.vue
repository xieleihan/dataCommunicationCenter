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
                    <span>店铺名称:</span>
                    <el-input v-model="ShopingPreviewObject.storeName" placeholder="请输入店铺名称(必填)" />
                </div>
                <!-- 商品标题 -->
                <div class="titleBox">
                    <span>商品标题:</span>
                    <el-input v-model="ShopingPreviewObject.title" placeholder="请输入商品标题(必填)" />
                </div>
                <!-- 商品描述 -->
                <div class="titleBox">
                    <span>商品描述:</span>
                    <el-input v-model="ShopingPreviewObject.description" type="textarea" placeholder="请输入商品描述(必填)" />
                </div>
                <!-- 商品原价 -->
                <div class="titleBox">
                    <span>商品价格(原价):</span>
                    <el-input v-model="ShopingPreviewObject.originalPrice" placeholder="请输入商品原价(必填,自动格式化)" />
                </div>
                <!-- 商品现价 -->
                <div class="titleBox">
                    <span>商品价格(现价):</span>
                    <el-input v-model="ShopingPreviewObject.currentPrice" placeholder="请输入商品现价(选填,不填则是原价,与原价相等时无效)" />
                </div>
                <!-- 商品汇率换算 -->
                <div class="titleBox">
                    <span v-if="ShopingPreviewObject.currentPrice !== ShopingPreviewObject.originalPrice">商品折扣换算:</span>
                    <span style="color: red;"
                        v-if="ShopingPreviewObject.currentPrice !== ShopingPreviewObject.originalPrice">{{ FormatPicel
                        }}</span>
                    <span>海外汇率换算:</span>
                    <el-select v-model="exchangeRate" style="width: 1rem;margin-right: .1rem;" placeholder="请选择币种,自动换算">
                        <el-option label="美元" value="USD" />
                        <el-option label="港币" value="HKD" />
                        <el-option label="英镑" value="GBP" />
                        <el-option label="日币" value="JPY" />
                        <el-option label="欧元" value="EUR" />
                    </el-select>
                    <span v-if="exchangeRateValue">换算地区价格: {{ exchangeRateChangeValue }} | <span
                            class="placeholder">此处为运营查看,数据库为人民币</span></span>
                </div>
                <!-- 商品标签 -->
                <div class="titleBox">
                    <span>商品标签:</span>
                    <el-tag v-for="tag in ShopingPreviewObject.dynamicTags" :key="tag" closable :disable-transitions="false"
                        @close="handleClose(tag)">
                        {{ tag }}
                    </el-tag>
                    <el-input v-if="inputVisible" ref="InputRef" v-model="inputValue" class="w-20" size="small"
                        @keyup.enter="handleInputConfirm" @blur="handleInputConfirm" />
                    <el-button v-else class="button-new-tag" size="small" @click="showInput">
                        + New Tag
                    </el-button>
                </div>
                <!-- 选项卡 -->
                <div class="tagBox">
                    <div class="item">
                        <p>商品详情(图片流):</p>
                        <el-upload :action="base_url" list-type="picture-card" :on-success="handleProductSuccess"
                            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                            <el-icon>
                                <Plus />
                            </el-icon>
                        </el-upload>
                        <el-dialog v-model="dialogVisible">
                            <img w-full :src="dialogImageUrl" alt="Preview Image" />
                        </el-dialog>
                    </div>
                    <div class="item noitem">
                        <p>详细参数:</p>
                        <div>
                            <el-radio-group v-model="editType">
                                <el-radio label="edit" value="edit">删除</el-radio>
                                <el-radio label="add" value="add">新增</el-radio>
                            </el-radio-group>
                            <!-- 修改区域 -->
                            <el-input @input="changeInputValue" style="margin-right: .1rem;"
                                v-model="editProductInfoKeyText" v-if="editType === 'edit'" placeholder="请输入搜索的属性名" />
                            <el-table :data="filteredData" v-if="editType === 'edit'">
                                <el-table-column prop="key" label="商品属性" />
                                <el-table-column prop="value" label="属性值" />
                                <el-table-column label="操作">
                                    <template #default="scope">
                                        <el-button type="danger"
                                            @click="deleteTableData(scope.row.key, scope.row.value)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <!-- 新增区域 -->
                            <el-input v-model="addProoductInfoKeyText" v-if="editType === 'add'" placeholder="属性名" />
                            <el-input v-model="addProoductInfoValueText" v-if="editType === 'add'" placeholder="属性值" />
                            <el-button v-if="editType === 'add'"
                                @click="addProoductInfo(addProoductInfoKeyText, addProoductInfoValueText)">新增</el-button>
                        </div>
                    </div>
                    <div class="item">
                        <p>商品FAQ:
                            <el-popover class="box-item" title="提示" content="需要严格按照F:xxx,Q:xxx;格式书写" placement="top">
                                <template #reference>
                                    <el-icon>
                                        <Warning />
                                    </el-icon>
                                </template>
                            </el-popover>
                        </p>
                        <el-input v-model="ShopingPreviewObject.faq" type="textarea" placeholder="请输入商品FAQ" />
                    </div>

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
                <el-empty v-if="ShopingPreviewObject.fileList.length === 0" description="description" />
                <ShopingPreviewView v-else :ShopingPreviewObject="ShopingPreviewObject" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, computed, onMounted, nextTick, watch } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import ShopingPreviewView from './ShopingPreviewView.vue';
import { getExchangeRate, initAddShoping, deleteUploadImage, saveShopingObj } from '../../../api/request';
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
    dynamicTags: [], // 商品动态标签
    faq: '', // 商品FAQ
    storeName: '', // 店铺名称
})
// 判断是否为本地开发环境
const isLocalhost = window.location.hostname === 'localhost'
const base_url = ref(isLocalhost
    ? import.meta.env.VITE_BASE_API +'/upload'
    : import.meta.env.VITE_BASE_LAN_API + '/upload')

// 选择的汇率
const exchangeRate = ref('USD');
const exchangeRateValue = ref(null);
const exchangeRateObj = ref({})
const exchangeRateChangeValue = ref(0); // 汇率换算值
const editType = ref('add'); // 编辑类型: edit(修改) | add(新增)
const addProoductInfoKeyText = ref(''); // 新增属性名
const addProoductInfoValueText = ref(''); // 新增属性值
const editProductInfoKeyText = ref(''); // 搜索修改属性名
const filteredData = ref([]); // 过滤后的数据

const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 处理上传成功的回调(轮播图)
const handleSuccess = (uploadFile) => {
    console.log(uploadFile)
    const obj = {
        url: uploadFile.data.url,
        name: uploadFile.data.alt,
        uid: Date.now() + Math.random().toString(36).substr(2, 9),
    }
    ShopingPreviewObject.fileList = [...ShopingPreviewObject.fileList, obj]
}

// 商品详情
const handleProductSuccess = (uploadFile) => {
    console.log(uploadFile)
    const obj = {
        url: uploadFile.data.url,
        name: uploadFile.data.alt,
        uid: Date.now() + Math.random().toString(36).substr(2, 9),
    }
    ShopingPreviewObject.productList = [...ShopingPreviewObject.productList, obj]
}

// 处理上传文件被删除的回调
const handleRemove = (uploadFile) => {
    console.log('删除的文件:', JSON.parse(JSON.stringify(uploadFile.response.data.alt)).split('.')[0])
    deleteUploadImage({
        filename: JSON.parse(JSON.stringify(uploadFile.response.data.alt)),
    }).then((res) => {
        if(res.code === 200) {
            ElMessage({
                message: '删除成功',
                type: 'success',
                duration: 2000
            })
        } else {
            ElMessage({
                message: '删除失败',
                type: 'error',
                duration: 2000
            })
        }
    }).catch((err) => {
        console.error('删除失败:', err)
        ElMessage({
            message: '删除失败',
            type: 'error',
            duration: 2000
        })
    })
    // 从轮播图数组中删除该文件
    console.log(ShopingPreviewObject.fileList)
    ShopingPreviewObject.fileList = ShopingPreviewObject.fileList.filter(item => item.name != JSON.parse(JSON.stringify(uploadFile.response.data.alt)))
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
    ShopingPreviewObject.dynamicTags.splice(ShopingPreviewObject.dynamicTags.indexOf(tag), 1)
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
        ShopingPreviewObject.dynamicTags.push(inputValue.value)
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

// 删除产品详情
const deleteTableData = (key, value) => {
    console.log('删除的属性:', key, value)
    // 过滤掉被删除的属性
    ShopingPreviewObject.tableData = ShopingPreviewObject.tableData.filter(item => item.key !== key || item.value !== value)
    nextTick(() => {
        // 重新过滤数据
        filteredData.value = ShopingPreviewObject.tableData
    })
    ElMessage({
        message: '删除成功',
        type: 'success',
        duration: 2000
    })
}

// 保存数据到数据库
const saveShopObj = (obj) => {
    saveShopingObj(obj).then((res) => {
        if (res.code === 200) {
            ElMessage({
                message: '保存成功',
                type: 'success',
                duration: 2000
            })
            // 清空ShopingPreviewObject
            ShopingPreviewObject.fileList = []
            ShopingPreviewObject.title = ''
            ShopingPreviewObject.description = ''
            ShopingPreviewObject.originalPrice = ''
            ShopingPreviewObject.currentPrice = ''
            ShopingPreviewObject.link = ''
            ShopingPreviewObject.productList = []
            ShopingPreviewObject.tableData = []
            ShopingPreviewObject.dynamicTags = []
            ShopingPreviewObject.faq = ''
            ShopingPreviewObject.storeName = ''
            // 重新生成唯一ID
            const id = nanoid();
            console.log('生成的唯一ID:', id)
            // 初始化AddShoping数据
            initAddShoping({ id }).then((res) => {
                if (res.code === 200) {
                    ShopingPreviewObject.link = id
                }
            }).catch((err) => {
                console.error('初始化AddShoping数据失败:', err)
            })
        } else {
            ElMessage({
                message: '保存失败',
                type: 'error',
                duration: 2000
            })
        }
    }).catch((err) => {
        console.error('保存失败:', err)
        ElMessage({
            message: '保存失败',
            type: 'error',
            duration: 2000
        })
    })
}

// 发布公告逻辑
const publishMail = (obj) => {
    
}

// 处理输入框的变化
const changeInputValue = (e) => {
    console.log('输入框变化:', e)
    // 过滤出匹配的属性
    console.log('过滤前的表格数据:', ShopingPreviewObject.tableData.filter(item => item.key.includes(e)))
    filteredData.value = ShopingPreviewObject.tableData.filter(item => item.key.includes(e))
    
    
}

onMounted(() => {
    // 获取实时汇率
    if (Object.keys(exchangeRateObj.value).length === 0) {
        getExchangeRate({}).then((res) => {
            if (res.result === 'success') {
                exchangeRateObj.value = res.conversion_rates
                exchangeRateValue.value = res.conversion_rates[exchangeRate.value] || 1
                exchangeRateChangeValue.value = (ShopingPreviewObject.currentPrice * exchangeRateValue.value).toFixed(2)
            } else {
                console.error('获取实时汇率失败:', res)
            }
        }).catch((err) => {
            console.error('获取实时汇率失败:', err)
        })
    }
    // 生成唯一一个ID
    const id = nanoid();
    console.log('生成的唯一ID:', id)
    // 初始化AddShoping数据
    initAddShoping({ id }).then((res) => {
        if (res.code === 200) {
            ShopingPreviewObject.link = id
        }
    }).catch((err) => {
        console.error('初始化AddShoping数据失败:', err)
    })
})

// 监听汇率选项变化
watch(exchangeRate, (newRate) => {
    if (exchangeRateObj.value[newRate]) {
        exchangeRateValue.value = exchangeRateObj.value[newRate]
        // 计算汇率换算值
        exchangeRateChangeValue.value = (ShopingPreviewObject.currentPrice * exchangeRateValue.value).toFixed(2)
    } else {
        exchangeRateValue.value = null
        exchangeRateChangeValue.value = ''
    }
})
// 监听现价的变化
watch(() => ShopingPreviewObject.currentPrice, (newPrice) => {
    if (newPrice && exchangeRateValue.value) {
    // 计算汇率换算值
        exchangeRateChangeValue.value = (newPrice * exchangeRateValue.value).toFixed(2)
    } else {
        exchangeRateChangeValue.value = ''
    }
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
            overflow: auto;
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
            .tagBox{
                display: flex;
                flex-direction: column;
                .item{
                    display: flex;
                    align-items: center;
                    margin: .02rem 0;
                    &.noitem{
                        align-items: flex-start;
                        .el-input{
                            margin: .02rem 0;
                        }
                        .el-button{
                            margin: .02rem 0;
                        }
                    }
                    p{
                        white-space: nowrap;
                        margin-right: .05rem;
                    }
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