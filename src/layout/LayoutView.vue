<template>
        <el-container class="layout">
            <el-header class="header">
                <HomeHeader />
            </el-header>
            <el-container class="container" v-if="isHomePage">
                <el-aside width="200px">
                    <HomeAside />
                </el-aside>
                <el-main class="main">
                    <HomeContainer />
                </el-main>
            </el-container>
            <router-view v-else />
            <el-footer class="footer">
                <HomeFooter />
            </el-footer>
        </el-container>
</template>

<script setup>
import HomeHeader from '../components/layout/HomeHeader.vue';
import HomeAside from '../components/layout/HomeAside.vue';
import HomeContainer from '../components/layout/HomeContainer.vue';
import HomeFooter from '../components/layout/HomeFooter.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isHomePage = computed(() => route.name !== 'PersonalInformationView');
</script>

<style lang="scss" scoped>
@import '../styles/base.module.scss';
.layout{
    width: 100%;
    height: 100%;
    .header{
        background-color: $googleBlue;
    }
    .footer{
        background-color: $headerBgColor;
    }
    .container{
        overflow: hidden;
        .main {
                box-sizing: border-box;
            }
    }
}
</style>