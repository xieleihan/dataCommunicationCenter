<template>
    <div
        class="NeiMengGu"
        id="NeiMengGu"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { neimenggu } from '../../../utils/Modules/chinaProvinceMapData/neimenggu.ts';

function renderNeiMengGuMap() {
    const chartDom = document.getElementById('NeiMengGu');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('neimenggu', neimenggu);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'neimenggu',
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
    console.log('内蒙古地图被加载了');
    nextTick(() => {
        renderNeiMengGuMap();
    });
});
onUnmounted(() => {
    console.log('内蒙古地图被卸载了')
});
</script>

<style lang="scss" scoped>
.NeiMengGu {
    width: 100%;
    height: 80%;
}
</style>