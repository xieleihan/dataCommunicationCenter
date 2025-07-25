<template>
    <div
        class="LiaoNing"
        id="LiaoNing"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { liaoning } from '../../../utils/Modules/chinaProvinceMapData/liaoning.ts';

function renderLiaoNingMap() {
    const chartDom = document.getElementById('LiaoNing');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('liaoning', liaoning);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'liaoning',
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
    console.log('辽宁地图被加载了');
    nextTick(() => {
        renderLiaoNingMap();
    });
});
onUnmounted(() => {
    console.log('辽宁地图被卸载了')
});
</script>

<style lang="scss" scoped>
.LiaoNing {
    width: 100%;
    height: 80%;
}
</style>