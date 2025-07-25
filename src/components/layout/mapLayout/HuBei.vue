<template>
    <div
        class="HuBei"
        id="HuBei"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { hubei } from '../../../utils/Modules/chinaProvinceMapData/hubei.ts';

function renderHuBeiMap() {
    const chartDom = document.getElementById('HuBei');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('hubei', hubei);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'hubei',
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
    console.log('湖北地图被加载了');
    nextTick(() => {
        renderHuBeiMap();
    });
});
onUnmounted(() => {
    console.log('湖北地图被卸载了')
});
</script>

<style lang="scss" scoped>
.HuBei {
    width: 100%;
    height: 80%;
}
</style>