<template>
    <div class="GuangDong" id="GuangDong">
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { guangdong } from '../../../utils/Modules/chinaProvinceMapData/guangdong.ts';

function renderGuangDongMap() {
    const chartDom = document.getElementById('GuangDong');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('guangdong', guangdong);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'guangdong',
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
    console.log('广东地图被加载了');
    nextTick(() => {
        renderGuangDongMap();
    });
});
onUnmounted(() => {
    console.log('广东地图被卸载了')
});
</script>

<style lang="scss" scoped>
.GuangDong{
    width: 100%;
    height: 80%;
}
</style>