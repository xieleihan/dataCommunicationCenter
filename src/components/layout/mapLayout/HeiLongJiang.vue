<template>
    <div
        class="HeiLongJiang"
        id="HeiLongJiang"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { heilongjiang } from '../../../utils/Modules/chinaProvinceMapData/heilongjiang.ts';

function renderHeiLongJiangMap() {
    const chartDom = document.getElementById('HeiLongJiang');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('heilongjiang', heilongjiang);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'heilongjiang',
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
    console.log('广西地图被加载了');
    nextTick(() => {
        renderHeiLongJiangMap();
    });
});
onUnmounted(() => {
    console.log('广西地图被卸载了')
});
</script>

<style lang="scss" scoped>
.HeiLongJiang {
    width: 100%;
    height: 80%;
}
</style>