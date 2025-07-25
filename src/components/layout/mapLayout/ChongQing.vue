<template>
    <div
        class="ChongQing"
        id="ChongQing"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { chongqing } from '../../../utils/Modules/chinaProvinceMapData/chongqing.ts';

function renderChongQingMap() {
    const chartDom = document.getElementById('ChongQing');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('chongqing', chongqing);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'chongqing',
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
    console.log('重庆地图被加载了');
    nextTick(() => {
        renderChongQingMap();
    });
});
onUnmounted(() => {
    console.log('重庆地图被卸载了')
});
</script>

<style lang="scss" scoped>
.ChongQing {
    width: 100%;
    height: 80%;
}
</style>