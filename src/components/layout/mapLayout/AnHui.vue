<template>
    <div
        class="AnHui"
        id="AnHui"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { anhui } from '../../../utils/Modules/chinaProvinceMapData/anhui.ts';

function renderAnHuiMap() {
    const chartDom = document.getElementById('AnHui');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('anhui', anhui);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'anhui',
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
    console.log('安徽地图被加载了');
    nextTick(() => {
        renderAnHuiMap();
    });
});
onUnmounted(() => {
    console.log('安徽地图被卸载了')
});
</script>

<style lang="scss" scoped>
.AnHui {
    width: 100%;
    height: 80%;
}
</style>