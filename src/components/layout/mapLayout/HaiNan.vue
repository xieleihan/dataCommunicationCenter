<template>
    <div
        class="HaiNan"
        id="HaiNan"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { hainan } from '../../../utils/Modules/chinaProvinceMapData/hainan.ts';

function renderHaiNanMap() {
    const chartDom = document.getElementById('HaiNan');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('hainan', hainan);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'hainan',
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
    console.log('海南地图被加载了');
    nextTick(() => {
        renderHaiNanMap();
    });
});
onUnmounted(() => {
    console.log('海南地图被卸载了')
});
</script>

<style lang="scss" scoped>
.HaiNan {
    width: 100%;
    height: 80%;
}
</style>