<template>
    <div
        class="GuangXi"
        id="GuangXi"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { guangxi } from '../../../utils/Modules/chinaProvinceMapData/guangxi.ts';

function renderGuangXiMap() {
    const chartDom = document.getElementById('GuangXi');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('guangxi', guangxi);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'guangxi',
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
        renderGuangXiMap();
    });
});
onUnmounted(() => {
    console.log('广西地图被卸载了')
});
</script>

<style lang="scss" scoped>
.GuangXi {
    width: 100%;
    height: 80%;
}
</style>