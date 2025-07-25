<template>
    <div
        class="FuJian"
        id="FuJian"
    >
    </div>
</template>

<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue';
import * as echarts from 'echarts';
import { fujian } from '../../../utils/Modules/chinaProvinceMapData/fujian.ts';

function renderFuJianMap() {
    const chartDom = document.getElementById('FuJian');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('fujian', fujian);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}`;
            },
        },
        geo: {
            map: 'fujian',
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
    console.log('福建地图被加载了');
    nextTick(() => {
        renderFuJianMap();
    });
});
onUnmounted(() => {
    console.log('福建地图被卸载了')
});
</script>

<style lang="scss" scoped>
.FuJian {
    width: 100%;
    height: 80%;
}
</style>