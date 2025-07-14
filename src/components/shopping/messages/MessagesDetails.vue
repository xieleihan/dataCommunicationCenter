<template>
    <div class="messageDetails">
        <div class="top">
            <img class="avater" src="../../../assets/icon/avater.jpg" alt="avater" loading="lazy" />
            <div class="info">
                <div>
                    <span class="username">用户名</span>
                    <el-tag type="primary">Tag 1</el-tag>
                </div>
                <span class="time">最近一条信息:2023-10-01 12:00</span>
            </div>
        </div>
        <div class="container">

        </div>
        <div class="inputBox">
            <RichText />
        </div>
    </div>
</template>

<script setup>
import RichText from '../../system/RichText.vue';
</script>

<style lang="scss" scoped>
@import '../../../styles/base.module.scss';
.messageDetails{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .top,
    .container,
    .inputBox{
        width: 100%;
    }
    .top,
    .inputBox{
        height: .35rem;
    }
    .container{
        height: calc(100% - 1.35rem);
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .top{
        display: flex;
        align-items: center;
        font-size: .1rem;
        background-color: $googleBlue;
        padding: 0 .1rem;
        color: #fff;
        .avater{
            height: 70%;
            aspect-ratio: 1/1;
            border-radius: 50%;
            margin-right: .05rem;
        }
        .info{
            display: flex;
            flex-direction: column;
            .username{
                margin-right: .1rem;
            }
            .time{
                color: #ccc;
                font-size: .06rem;
                vertical-align: text-bottom;
            }
        }
    }
    .inputBox{
        border-top: 1px solid #ccc;
        height: 1rem;
    }
    .container{
        background-color: #c7c7c74b;
    }
}
</style>