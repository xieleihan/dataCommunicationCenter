<template>
    <div class="overview">
        <div id="china-map" class="left"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts';
import { china } from '../../../utils/china';

function renderMap() {
    const chartDom = document.getElementById('china-map');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('china', china);

    const option = {
        tooltip: {
            formatter: (params) => {
                return `${params.seriesName}<br />${params.name}：${params.value || 0}`;
            },
        },
        visualMap: {
            min: 0,
            max: 1500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            inRange: {
                color: ['#fbf8f3', '#94d2a5'],
            },
            show: true,
        },
        geo: {
            map: 'china',
            roam: false,
            zoom: 1.23,
            label: {
                show: true,
                fontSize: 10,
                color: 'rgba(0,0,0,0.7)',
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                },
                emphasis: {
                    areaColor: 'tomato',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
        series: [
            {
                name: '信息量',
                type: 'map',
                geoIndex: 0,
                data: dataList.value,
            },
        ],
    };

    myChart.setOption(option);
}
</script>

<style lang="scss" scoped>
.overview{
    width: 100%;
    height: calc(100% - .35rem);
    display: flex;
    .left{
        width: 50%;
        height: 100%;
    }
}
</style>