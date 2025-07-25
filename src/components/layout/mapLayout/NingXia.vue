<template>
    <div
        class="NingXia"
        id="NingXia"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { ningxia } from '../../../utils/Modules/chinaProvinceMapData/ningxia.ts';

function renderNingXiaMap() {
    const chartDom = document.getElementById('NingXia');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('ningxia', ningxia);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'ningxia',
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
    console.log('宁夏地图被加载了');
    nextTick(() => {
        renderNingXiaMap();
    });
});
onUnmounted(() => {
    console.log('宁夏地图被卸载了')
});
</script>

<style lang="scss" scoped>
.NingXia {
    width: 100%;
    height: 80%;
}
</style>