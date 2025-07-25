<template>
    <div
        class="JiangXi"
        id="JiangXi"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { jiangxi } from '../../../utils/Modules/chinaProvinceMapData/jiangxi.ts';

function renderJiangXiMap() {
    const chartDom = document.getElementById('JiangXi');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('jiangxi', jiangxi);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'jiangxi',
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
    console.log('江西地图被加载了');
    nextTick(() => {
        renderJiangXiMap();
    });
});
onUnmounted(() => {
    console.log('江西地图被卸载了')
});
</script>

<style lang="scss" scoped>
.JiangXi {
    width: 100%;
    height: 80%;
}
</style>