<template>
    <div
        class="ZheJiang"
        id="ZheJiang"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { zhejiang } from '../../../utils/Modules/chinaProvinceMapData/zhejiang.ts';

function renderZheJiangMap() {
    const chartDom = document.getElementById('ZheJiang');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('zhejiang', zhejiang);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'zhejiang',
            roam: false,
            zoom: 1.2,
            label: {
                show: true,
                fontSize: 10,
                color: 'rgba(0,0,0,0.7)',
            },
        },
    };

    myChart.setOption(option);
}

onMounted(() => {
    console.log('浙江地图被加载了');
    nextTick(() => {
        renderZheJiangMap();
    });
});
onUnmounted(() => {
    console.log('浙江地图被卸载了')
});
</script>

<style lang="scss" scoped>
.ZheJiang {
    width: 100%;
    height: 80%;
}
</style>