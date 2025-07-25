<template>
    <div
        class="shanghai"
        id="ShangHai"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { shanghai } from '../../../utils/Modules/chinaProvinceMapData/shanghai.ts';

function renderGuangDongMap() {
    const chartDom = document.getElementById('ShangHai');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('ShangHai', shanghai);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'shanghai',
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
    console.log('上海地图被加载了');
    nextTick(() => {
        renderGuangDongMap();
    });
});
onUnmounted(() => {
    console.log('上海地图被卸载了')
});
</script>

<style lang="scss" scoped>
.shanghai {
    width: 100%;
    height: 80%;
}
</style>