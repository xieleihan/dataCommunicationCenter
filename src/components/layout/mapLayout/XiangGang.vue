<template>
    <div
        class="XiangGang"
        id="XiangGang"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { xianggang } from '../../../utils/Modules/chinaProvinceMapData/xianggang.ts';

function renderXiangGangMap() {
    const chartDom = document.getElementById('XiangGang');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('xianggang', xianggang);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'xianggang',
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
    console.log('香港地图被加载了');
    nextTick(() => {
        renderXiangGangMap();
    });
});
onUnmounted(() => {
    console.log('香港地图被卸载了')
});
</script>

<style lang="scss" scoped>
.XiangGang {
    width: 100%;
    height: 80%;
}
</style>