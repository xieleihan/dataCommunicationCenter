<template>
    <div
        class="GanSu"
        id="GanSu"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { gansu } from '../../../utils/Modules/chinaProvinceMapData/gansu.ts';

function renderGanSuMap() {
    const chartDom = document.getElementById('GanSu');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('gansu', gansu);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'gansu',
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
    console.log('甘肃地图被加载了');
    nextTick(() => {
        renderGanSuMap();
    });
});
onUnmounted(() => {
    console.log('甘肃地图被卸载了')
});
</script>

<style lang="scss" scoped>
.GanSu {
    width: 100%;
    height: 80%;
}
</style>