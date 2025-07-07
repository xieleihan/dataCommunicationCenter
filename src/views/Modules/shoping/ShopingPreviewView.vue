<template>
    <div class="ShopingPreviewView">
        <swiper :modules="[Navigation, Pagination, Autoplay]" navigation pagination autoplay loop class="mySwiper">
            <swiper-slide v-for="(item, index) in ShopingPreviewObject.fileList" :key="index">
                <img :src="item.url" :alt="item.name" />
            </swiper-slide>
        </swiper>
        <div class="title">{{ ShopingPreviewObject.title }}</div>
        <div class="desc">{{ ShopingPreviewObject.description }}</div>
        <div class="picelBox" v-if="ShopingPreviewObject.currentPrice === ''">
            <span>￥</span>
            <!-- 原价 -->
            <div class="originalPrice">{{ ShopingPreviewObject.originalPrice }}</div>
            <!-- 现价 -->
            <div class="currentPrice">{{ ShopingPreviewObject.currentPrice }}</div>
        </div>
        <div class="picelBox" v-else>
            <span>￥</span>
            <!-- 现价 -->
            <div class="originalPrice">{{ formattedCurrentPrice }}</div>
            <!-- 原价 -->
            <div class="currentPrice">{{ formattedOriginalPrice }}</div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, watch, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const props = defineProps({
    ShopingPreviewObject: {
        type: Object,
        default: () => ({
            fileList: [],
            title: '',
            description: '',
            originalPrice: '',
            currentPrice: ''
        })
    }
});

watch(
    () => props.ShopingPreviewObject,
    (newVal) => {
        console.log('ShopingPreviewObject（深层）变化了:', newVal)
    },
    { immediate: true, deep: true }
)

// 计算属性:自动补零
const formattedOriginalPrice = computed(() => {
    return props.ShopingPreviewObject.originalPrice ? parseFloat(props.ShopingPreviewObject.originalPrice).toFixed(2) : '';
});
const formattedCurrentPrice = computed(() => {
    return props.ShopingPreviewObject.currentPrice ? parseFloat(props.ShopingPreviewObject.currentPrice).toFixed(2) : '';
});
</script>

<style lang="scss" scoped>
.ShopingPreviewView{
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    font-size: .1rem;
    ::v-deep(img){
        max-width: 100% !important;
        min-width: 100% !important;
        height: fit-content !important;
        max-height: 1rem;
        width: 100%;
        object-fit: cover;
    }
    .mySwiper{
        margin-bottom: .1rem;
    }
    .title{
        width: 100%;
        padding: 0 .1rem;
        font-size: .11rem;
        font-weight: bold;
        // 两行隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 限制为两行 */
        -webkit-box-orient: vertical;
    }
    .desc{
        width: 100%;
        padding: 0 .1rem;
        font-size: .09rem;
        color: #ccc;
    }
    .picelBox{
        width: 100%;
        display: flex;
        align-items: end;
        margin-top: .05rem;
        padding: 0 .1rem;
        span{
            font-size: .15rem;
            color: #f00;
        }
        .originalPrice{
            font-size: .15rem;
            color: #f00;
            margin-right: .05rem;
            font-weight: bold;
        }
        .currentPrice{
            font-size: .10rem;
            text-decoration: line-through;
            color: #ccc;
            
        }
    }
}
</style>