<template>
    <div
        class="TianJin"
        id="TianJin"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { tianjin } from '../../../utils/Modules/chinaProvinceMapData/tianjin.ts';

function renderTianJinMap() {
    const chartDom = document.getElementById('TianJin');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('tianjin', tianjin);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'tianjin',
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
    console.log('天津地图被加载了');
    nextTick(() => {
        renderTianJinMap();
    });
});
onUnmounted(() => {
    console.log('天津地图被卸载了')
});
</script>

<style lang="scss" scoped>
.TianJin {
    width: 100%;
    height: 80%;
}
</style>