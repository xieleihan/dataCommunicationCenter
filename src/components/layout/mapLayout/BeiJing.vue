<template>
    <div
        class="beijing"
        id="BeiJing"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { beijing } from '../../../utils/Modules/chinaProvinceMapData/beijing.ts';

function renderGuangDongMap() {
    const chartDom = document.getElementById('BeiJing');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('BeiJing', beijing);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'beijing',
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
    console.log('北京地图被加载了');
    nextTick(() => {
        renderGuangDongMap();
    });
});
onUnmounted(() => {
    console.log('北京地图被卸载了')
});
</script>

<style lang="scss" scoped>
.beijing {
    width: 100%;
    height: 80%;
}
</style>