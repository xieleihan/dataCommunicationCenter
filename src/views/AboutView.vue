<template>
    <div class="about">
        <div class="container">
            <div class="left">
                <div class="title"><span>{{ project_name }}</span>
                    <p>-- 关于我们</p>
                </div>
                <div class="content">
                    <div>
                        <p>我们是一个致力于提供高质量服务的团队，专注于前端开发和设计。</p>
                        <p>我们的目标是为客户提供最佳的用户体验和满意度。</p>
                        <p>我们相信，优秀的设计和技术可以改变世界。</p>
                        <p>欢迎加入我们，一起创造美好的未来！</p>
                        <p>如果您对我们的项目感兴趣，或者想要了解更多信息，请随时与我们联系。</p>
                    </div>
                    <!-- <img class="image" src="../assets/images/chaozhou.jpg" alt="潮州" loading="lazy" /> -->
                </div>
            </div>
            <div class="right">
                <div class="title">加入我们</div>
                <div class="content">
                    <EmailView />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const project_name = import.meta.env.VITE_PROJECT_NAME;
import EmailView from '../layout/Modules/EmailView.vue';
</script>

<style lang="scss" scoped>
@import '../styles/base.module.scss';

.about {
    width: 100%;
    height: 100%;
    background: url('../assets/images/bg.webp') no-repeat center center / cover;
    position: relative;

    .container {
        width: 80%;
        height: 80%;
        background-color: rgba($color: #fff, $alpha: .7);
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: .2rem .2rem;
        border-radius: .1rem;
        display: flex;

        .left {
            width: 30%;
            height: 100%;
            padding-right: .1rem;
            border-right: 2px dotted #ccc;

            .title {
                font-size: .2rem;
                text-align: center;
                height: .5rem;

                p {
                    font-size: .1rem;
                    text-align: end;
                }
            }

            .content {
                width: 100%;
                height: calc(100% - .5rem);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;

                .image {
                    width: 50%;
                    aspect-ratio: 9/16;
                    border-radius: .05rem;
                }
            }
        }

        .right {
            width: calc(100% - 30%);
            height: 100%;
            padding-left: .1rem;
            .title{
                font-size: .1rem;
                text-align: center;
                height: .2rem;
            }
            .content{
                width: 100%;
                height: calc(100% - .2rem);
            }
        }
    }
}
</style>