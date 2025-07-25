<template>
    <div
        class="AoMen"
        id="AoMen"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { aomen } from '../../../utils/Modules/chinaProvinceMapData/aomen.ts';

function renderAoMenMap() {
    const chartDom = document.getElementById('AoMen');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('aomen', aomen);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'aomen',
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
    console.log('澳门地图被加载了');
    nextTick(() => {
        renderAoMenMap();
    });
});
onUnmounted(() => {
    console.log('澳门地图被卸载了')
});
</script>

<style lang="scss" scoped>
.AoMen {
    width: 100%;
    height: 80%;
}
</style>