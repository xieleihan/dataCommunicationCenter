<template>
    <div
        class="ShangDong"
        id="ShangDong"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { shandong } from '../../../utils/Modules/chinaProvinceMapData/shandong.ts';

function renderShangDongMap() {
    const chartDom = document.getElementById('ShangDong');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('shandong', shandong);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'shandong',
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
    console.log('山东地图被加载了');
    nextTick(() => {
        renderShangDongMap();
    });
});
onUnmounted(() => {
    console.log('山东地图被卸载了')
});
</script>

<style lang="scss" scoped>
.ShangDong {
    width: 100%;
    height: 80%;
}
</style>