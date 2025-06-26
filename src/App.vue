<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
// 导入接口
import { getUserIp } from './api/request';
// 导入通用信息的Store
import { useGeneralStore } from './store/Modules/generalStore';

// 获取通用信息的state
const Store = useGeneralStore();

onMounted(() => {
    getUserIp({}).then(res => {
        console.log(res);
        const formData = {
            // @ts-ignore
            ipinfo: res.ipinfo,
            // @ts-ignore
            ipdata: res.ipdata,
            // @ts-ignore
            adcode: res.adcode
        };
        // 将获取到的数据存储到pinia中
        Store.setForm(formData);
        console.log("pinia存储的数据", Store.form);
    });
});
</script>

<style lang="scss" scoped>
#app{
    width: 100dvw;
    height: 100dvh;
}
</style>