<template>
    <div
        class="JiangSu"
        id="JiangSu"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { jiangsu } from '../../../utils/Modules/chinaProvinceMapData/jiangsu.ts';

function renderJiangSuMap() {
    const chartDom = document.getElementById('JiangSu');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('jiangsu', jiangsu);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'jiangsu',
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
    console.log('江苏地图被加载了');
    nextTick(() => {
        renderJiangSuMap();
    });
});
onUnmounted(() => {
    console.log('江苏地图被卸载了')
});
</script>

<style lang="scss" scoped>
.JiangSu {
    width: 100%;
    height: 80%;
}
</style>