<template>
    <div
        class="QingHai"
        id="QingHai"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { qinghai } from '../../../utils/Modules/chinaProvinceMapData/qinghai.ts';

function renderQingHaiMap() {
    const chartDom = document.getElementById('QingHai');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('qinghai', qinghai);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'qinghai',
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
        renderQingHaiMap();
    });
});
onUnmounted(() => {
    console.log('湖北地图被卸载了')
});
</script>

<style lang="scss" scoped>
.QingHai {
    width: 100%;
    height: 80%;
}
</style>