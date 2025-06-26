<template>
    <keep-alive>
        <div class="registerView">
            <div class="container">
                <div class="title">
                    <img class="icon" loading="lazy" src="../assets/icon/peacock_flat.png" alt="图标" />
                    数据中台
                </div>
                <div class="content">
                    <InputBox :isLoginOrRegister="isLoginOrRegister" />
                </div>
            </div>
        </div>
    </keep-alive>
</template>

<script setup>
import InputBox from '../components/start/InputBox.vue'
</script>

<style lang="scss" scoped>
@import '../styles/base.module.scss';
.registerView {
    width: 100%;
    height: 100%;
    background: url('../assets/images/bg.webp') no-repeat center center /cover;
    position: relative;
    overflow: hidden;

    .container {
        background-color: rgba($color: #fff, $alpha: .7);
        position: absolute;
        animation: fadeIn .5s ease-in-out forwards;
        

        .title {
            .icon {
                width: .5rem;
                height: .5rem;
                margin-right: .1rem;
            }

            font-size: .15rem;
            display: flex;
            align-items: center;
            margin-bottom: .2rem;
        }

        .content{
            width: 60%;
            height: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
}
@keyframes fadeIn {
    0% {
        top: 0;
        left: 10%;
        width: 25%;
        height: 100%;
        padding: .5rem .2rem;
        border-radius: 0;
    }
    100% {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 45%;
        height: 75%;
        padding: .2rem .2rem;
        border-radius: .3rem;
    }
}
</style>