<template>
    <div
        class="TaiWan"
        id="TaiWan"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { taiwan } from '../../../utils/Modules/chinaProvinceMapData/taiwan.ts';

function renderTaiWanMap() {
    const chartDom = document.getElementById('TaiWan');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('taiwan', taiwan);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'taiwan',
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
    console.log('台湾地图被加载了');
    nextTick(() => {
        renderTaiWanMap();
    });
});
onUnmounted(() => {
    console.log('台湾地图被卸载了')
});
</script>

<style lang="scss" scoped>
.TaiWan {
    width: 100%;
    height: 80%;
}
</style>