<template>
    <div class="defaultPages">
        <div class="mask"></div>
        <div class="content">
            <div class="left">
                <div class="top">
                    <div class="img" v-for="(item, index) in iconData" :key="index">
                        <img loading="lazy" :src="item.iconUrl" :alt="item.iconName" />
                        <!-- <div  class="mask"></div> -->
                    </div>
                </div>
                <div class="bottom">
                    <div class="title">数通中台</div>
                    <div class="desc">--通用数据管理</div>
                    <div class="buttonBox">
                        <el-button type="info" :icon="ElementPlus">访问项目</el-button>
                        <el-button type="primary">联系我们</el-button>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="rightClass">
                    <IpBox />
                    <ReleasesPages />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import iconData from '../../../assets/json/stackIcon.json';
import { ElementPlus } from '@element-plus/icons-vue';

// 导入组件
import IpBox from '../../../components/start/IpBox.vue';
import ReleasesPages from '../../../components/start/ReleasesPages.vue';
</script>

<style scoped lang="scss">
.defaultPages {
    width: 100%;
    position: relative;
    height: 100%;
    background: url('../../../assets/images/bg.webp') no-repeat center center / cover;

    .mask {
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
        position: absolute;
        background-color: rgba(255, 255, 255, 0.3);
    }

    .content {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        padding: .1rem;

        .left,
        .right {
            width: 50%;
            height: 100%;
        }

        .left {
            width: 30%;
            border-right: 1px solid rgba(255, 255, 255, 0.5);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            .top {
                width: 70%;
                height: 15%;
                display: flex;
                margin-bottom: .1rem;
                justify-content: space-between;
                align-items: center;
                background-color: rgba(255, 255, 255, 0.3);
                /* backdrop-filter: blur(5px); */
                padding: 0 .1rem;
                border-radius: .05rem;

                .img {
                    height: 80%;
                    aspect-ratio: 1/1;
                    transition: all .3s ease-in-out;
                    position: relative;

                    img {
                        pointer-events: none;
                        z-index: -1;
                    }
                }
            }

            .bottom {
                width: 70%;

                .title {
                    color: #fff;
                    font-size: .2rem;
                    letter-spacing: .1rem;
                    text-align: center;
                }

                .desc {
                    color: #fff;
                    font-size: .1rem;
                    text-align: end;
                    margin-top: .1rem;
                }

                .buttonBox {
                    display: flex;
                    margin-top: .2rem;
                    justify-content: center;
                }
            }
        }

        .right {
            width: 70%;
            height: 100%;
            padding: .1rem 0 .1rem .1rem;

            .rightClass {
                background-color: rgba(255, 255, 255, 0.3);
                width: 100%;
                height: 100%;
                border-radius: .05rem;
                overflow: scroll;
            }
        }
    }
}
</style>