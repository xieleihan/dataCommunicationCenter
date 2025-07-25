<template>
    <div
        class="ShanXi1"
        id="ShanXi1"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { shanxi1 } from '../../../utils/Modules/chinaProvinceMapData/shanxi1.ts';

function renderShanXi1Map() {
    const chartDom = document.getElementById('ShanXi1');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('shanxi1', shanxi1);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'shanxi1',
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
    console.log('山西地图被加载了');
    nextTick(() => {
        renderShanXi1Map();
    });
});
onUnmounted(() => {
    console.log('山西地图被卸载了')
});
</script>

<style lang="scss" scoped>
.ShanXi1 {
    width: 100%;
    height: 80%;
}
</style>