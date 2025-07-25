<template>
    <div class="systemAccess">
        <el-row style="height: 100%;">
            <el-col :span="24">
                <el-radio-group v-model="radio">
                    <el-radio value="1" size="large">国内访问情况(含港澳台)</el-radio>
                    <el-radio value="2" size="large">世界访问情况</el-radio>
                </el-radio-group>
                <el-divider direction="vertical" border-style="dashed" />
            </el-col>
            <el-col v-show="radio === '1'" :span="24" style="display: flex;">
                <div id="china-map" class="chinaMap" v-show="clickChinaProvince === ''"></div>
                <div v-show="clickChinaProvince !== ''" class="province">
                    <el-button @click="clickChinaProvince = ''">返回</el-button>
                    <component :is="renderProvinceMap" />
                </div>
                <div class="list" style="width: 50%;" v-if="chinaDataList.length > 0">
                    <el-table :data="chinaDataList" style="width: 100%;height: 65dvh;" stripe>
                        <el-table-column prop="province" label="省份"></el-table-column>
                        <el-table-column prop="accessvalue" label="访问量"></el-table-column>
                        <el-table-column label="操作">
                            <el-button>
                                查看详情
                            </el-button>
                        </el-table-column>
                    </el-table>
                </div>
            </el-col>
            <el-col v-show="radio === '2'" :span="24">
                <div id="world-map" class="worldMap"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import * as echarts from 'echarts';
import { china } from '../../../utils/china.ts';
import { getChinaAccessList } from '../../../api/request.js';
import chinaProvince from '../../../assets/json/chinaProvince.json'
import { GuangDong, BeiJing, ShangHai, TianJin, ChongQing, HeBei, HeNan, YunNan, LiaoNing, HeiLongJiang, HuNan, AnHui, ShangDong, XinJiang, JiangSu, ZheJiang, JiangXi, HuBei, GuangXi, GanSu, ShanXi1, ShanXi, NeiMengGu, FuJian, GuiZhou, XiZang, HaiNan, QingHai, NingXia, XiangGang, AoMen, Taiwan } from '../../../components/layout/mapLayout/index.js';

const radio = ref('1')
const dataList = ref({
    list: {}
})
const chinaDataList = ref([])
const clickChinaProvince = ref('')
const renderProvinceMap = ref();
const chinaProvinceObj = chinaProvince

function renderMap() {
    const chartDom = document.getElementById('china-map');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('china', china);

    const option = {
        tooltip: {
            formatter: (params: any) => {
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
    myChart.on('click', (params) => {
        console.log('点击的省份:', params.name);
        console.log('访问量:', params.value);
        console.log('完整数据:', params);
        clickChinaProvince.value = params.name;
    });
}

onMounted(async () => {
    await getChinaAccessList({}).then((res: any) => {
        dataList.value = res.chinaDataList.map((item: any) => {
            return {
                ...item,
                value: item.accessvalue,
                name: item.province,
            };
        });
        chinaDataList.value = res.chinaDataList;
    });
    console.log(dataList.value);
    renderMap();
});

watch(radio, (val) => {
    if (val === '1') {
        renderMap();
    } else {
        console.log('世界地图');
    }
});

watch(clickChinaProvince, (val) => {
    // 查找对应的省份对应的字符
    const provinceData = chinaProvinceObj[val];
    if (provinceData) {
        console.log('点击的省份:', val);
        console.log('对应的字符:', provinceData);
    }
    // 动态加载对应的省份组件
    switch (val) {
        case '广东':
            renderProvinceMap.value = GuangDong;
            break;
        case '北京':
            renderProvinceMap.value = BeiJing;
            break;
        case '上海':
            renderProvinceMap.value = ShangHai;
            break;
        case '天津':
            renderProvinceMap.value = TianJin;
            break;
        case '重庆':
            renderProvinceMap.value = ChongQing;
            break;
        case '河北':
            renderProvinceMap.value = HeBei;
            break;
        case '河南':
            renderProvinceMap.value = HeNan;
            break;
        case '云南':
            renderProvinceMap.value = YunNan;
            break;
        case '辽宁':
            renderProvinceMap.value = LiaoNing;
            break;
        case '黑龙江':
            renderProvinceMap.value = HeiLongJiang;
            break;
        case '湖南':
            renderProvinceMap.value = HuNan;
            break;
        case '安徽':
            renderProvinceMap.value = AnHui;
            break;
        case '山东':
            renderProvinceMap.value = ShangDong;
            break;
        case '新疆':
            renderProvinceMap.value = XinJiang;
            break;
        case '江苏':
            renderProvinceMap.value = JiangSu;
            break;
        case '浙江':
            renderProvinceMap.value = ZheJiang;
            break;
        case '江西':
            renderProvinceMap.value = JiangXi;
            break;
        case '湖北':
            renderProvinceMap.value = HuBei;
            break;
        case '广西':
            renderProvinceMap.value = GuangXi;
            break;
        case '甘肃':
            renderProvinceMap.value = GanSu;
            break;
        case '山西':
            renderProvinceMap.value = ShanXi1;
            break;
        case '陕西':
            renderProvinceMap.value = ShanXi;
            break;
        case '内蒙古':
            renderProvinceMap.value = NeiMengGu;
            break;
        case '福建':
            renderProvinceMap.value = FuJian;
            break;
        case '贵州':
            renderProvinceMap.value = GuiZhou;
            break;
        case '西藏':
            renderProvinceMap.value = XiZang;
            break;
        case '海南':
            renderProvinceMap.value = HaiNan;
            break;
        case '青海':
            renderProvinceMap.value = QingHai;
            break;
        case '宁夏':
            renderProvinceMap.value = NingXia;
            break;
        case '香港':
            renderProvinceMap.value = XiangGang;
            break;
        case '澳门':
            renderProvinceMap.value = AoMen;
            break;
        case '台湾':
            renderProvinceMap.value = Taiwan;
            break;
        default:
            renderProvinceMap.value = null; // 如果没有对应的组件，清空
            break;
    }
})
</script>

<style scoped lang="scss">
.systemAccess {
    width: 100%;
    height: 100%;
    min-height: 65dvh;

    .chinaMap {
        width: 50%;
        height: 100%;
        min-height: 65dvh;

    }

    .province {
        width: 50%;
        height: 100%;
        min-height: 60dvh;
    }
}
</style>