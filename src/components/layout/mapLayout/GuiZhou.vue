<template>
    <div
        class="GuiZhou"
        id="GuiZhou"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { guizhou } from '../../../utils/Modules/chinaProvinceMapData/guizhou.ts';

function renderGuiZhouMap() {
    const chartDom = document.getElementById('GuiZhou');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('guizhou', guizhou);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'guizhou',
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
    console.log('贵州地图被加载了');
    nextTick(() => {
        renderGuiZhouMap();
    });
});
onUnmounted(() => {
    console.log('贵州地图被卸载了')
});
</script>

<style lang="scss" scoped>
.GuiZhou {
    width: 100%;
    height: 80%;
}
</style>