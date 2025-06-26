<template>
    <div class="defaultPages">
        <div class="mask"></div>
        <div class="content">
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.defaultPages{
    width: 100%;
    position: relative;
    height: 100%;
    background: url('../../../assets/images/bg.webp') no-repeat center center / cover;
    .mask{
        width: 100%;
        height: 100%;
        backdrop-filter: blur(5px);
        position: absolute;
        background-color: rgba(255, 255, 255, 0.3);
    }
    .content{
        width: 100%;
        height: 100%;
        position: relative;
    }
}
</style>