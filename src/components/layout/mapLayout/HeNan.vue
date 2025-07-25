<template>
    <div
        class="HeNan"
        id="HeNan"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { henan } from '../../../utils/Modules/chinaProvinceMapData/henan.ts';

function renderHeNanMap() {
    const chartDom = document.getElementById('HeNan');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('henan', henan);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'henan',
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
    console.log('河南地图被加载了');
    nextTick(() => {
        renderHeNanMap();
    });
});
onUnmounted(() => {
    console.log('河南地图被卸载了')
});
</script>

<style lang="scss" scoped>
.HeNan {
    width: 100%;
    height: 80%;
}
</style>