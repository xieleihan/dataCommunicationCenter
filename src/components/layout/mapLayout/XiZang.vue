<template>
    <div
        class="XiZang"
        id="XiZang"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { xizang } from '../../../utils/Modules/chinaProvinceMapData/xizang.ts';

function renderXiZangMap() {
    const chartDom = document.getElementById('XiZang');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('xizang', xizang);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'xizang',
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
    console.log('西藏地图被加载了');
    nextTick(() => {
        renderXiZangMap();
    });
});
onUnmounted(() => {
    console.log('西藏地图被卸载了')
});
</script>

<style lang="scss" scoped>
.XiZang {
    width: 100%;
    height: 80%;
}
</style>