<template>
    <div class="startView">
        <div class="container">
            <div class="title">
                <img class="icon" loading="lazy" src="../assets/icon/peacock_flat.png" alt="图标" />
                数据中台
            </div>
            <InputBox :isLoginOrRegister="isLoginOrRegister" />
        </div>
        <div class="copyright">
            Copyright© 2025 SouthAki, All Rights Reserved.
        </div>
    </div>
</template>

<script>
import InputBox from '../components/start/InputBox.vue'
export default {
    name: 'StartView',
    components: {
        InputBox
    },
    data() {
        return {
            isLoginOrRegister: false
        }
    },
    beforeRouteEnter(to, from, next) {
        console.log('当前路由名称:', to.name);
        next(vm => {
            if (to.name === 'StartView') {
                console.log('是登录页面');
                vm.isLoginOrRegister = true;
            } else {
                console.log('是注册页面');
                vm.isLoginOrRegister = false;
            }
        });
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/base.module.scss';
    .startView{
        width: 100%;
        height: 100%;
        background: url('../assets/images/bg.webp') no-repeat center center /cover;
        position: relative;
        overflow: hidden;
        .container{
            width: 25%;
            height: 100%;
            background-color: rgba($color: #fff, $alpha: .7);
            position: absolute;
            top: 0;
            left: 10%;
            padding: .5rem .2rem;
            .title{
                .icon{
                    width: .5rem;
                    height: .5rem;
                    margin-right: .1rem;
                }
                font-size: .15rem;
                display: flex;
                align-items: center;
                margin-bottom: .2rem;
            }
            
        }
        .copyright{
            position: absolute;
            bottom: 0;
            width: 25%;
            left: 10%;
            text-align: center;
            font-size: .09rem;
        }
    }
</style>