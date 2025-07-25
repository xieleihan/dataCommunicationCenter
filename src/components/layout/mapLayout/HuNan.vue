<template>
    <div
        class="HuNan"
        id="HuNan"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { hunan } from '../../../utils/Modules/chinaProvinceMapData/hunan.ts';

function renderHuNanMap() {
    const chartDom = document.getElementById('HuNan');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('hunan', hunan);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'hunan',
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
    console.log('湖南地图被加载了');
    nextTick(() => {
        renderHuNanMap();
    });
});
onUnmounted(() => {
    console.log('湖南地图被卸载了')
});
</script>

<style lang="scss" scoped>
.HuNan {
    width: 100%;
    height: 80%;
}
</style>