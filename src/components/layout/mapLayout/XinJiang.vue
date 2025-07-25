<template>
    <div
        class="XinJiang"
        id="XinJiang"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { xinjiang } from '../../../utils/Modules/chinaProvinceMapData/xinjiang.ts';

function renderXinJiangMap() {
    const chartDom = document.getElementById('XinJiang');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('xinjiang', xinjiang);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'xinjiang',
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
    console.log('新疆地图被加载了');
    nextTick(() => {
        renderXinJiangMap();
    });
});
onUnmounted(() => {
    console.log('新疆地图被卸载了')
});
</script>

<style lang="scss" scoped>
.XinJiang {
    width: 100%;
    height: 80%;
}
</style>