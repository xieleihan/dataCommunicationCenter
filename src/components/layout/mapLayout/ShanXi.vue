<template>
    <div
        class="ShanXi"
        id="ShanXi"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { shanxi } from '../../../utils/Modules/chinaProvinceMapData/shanxi.ts';

function renderShanXiMap() {
    const chartDom = document.getElementById('ShanXi');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('shanxi', shanxi);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'shanxi',
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
    console.log('陕西地图被加载了');
    nextTick(() => {
        renderShanXiMap();
    });
});
onUnmounted(() => {
    console.log('陕西地图被卸载了')
});
</script>

<style lang="scss" scoped>
.ShanXi {
    width: 100%;
    height: 80%;
}
</style>