<template>
    <div
        class="YunNan"
        id="YunNan"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { yunnan } from '../../../utils/Modules/chinaProvinceMapData/yunnan.ts';

function renderYunNanMap() {
    const chartDom = document.getElementById('YunNan');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('yunnan', yunnan);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'yunnan',
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
    console.log('云南地图被加载了');
    nextTick(() => {
        renderYunNanMap();
    });
});
onUnmounted(() => {
    console.log('云南地图被卸载了')
});
</script>

<style lang="scss" scoped>
.YunNan {
    width: 100%;
    height: 80%;
}
</style>