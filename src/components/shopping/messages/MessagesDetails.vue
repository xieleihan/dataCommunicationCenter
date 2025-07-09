<template>
    <div class="messageDetails">
        <div class="top">
            <img class="avater" src="../../../assets/icon/avater.jpg" alt="avater" loading="lazy" />
            <span class="username">用户名</span>
            <span class="time">最近一条信息:2023-10-01 12:00</span>
        </div>
        <div class="container">

        </div>
        <div class="inputBox">
            
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.messageDetails{
    width: 100%;
    height: 100%;
    .top,
    .container,
    .inputBox{
        width: 100%;
    }
    .top,
    .inputBox{
        height: .2rem;
    }
    .container{
        height: calc(100% - 0.4rem);
        overflow: auto;
        display: flex;
        flex-direction: column;
    }

    .top{
        display: flex;
        align-items: center;
        font-size: .1rem;
        .avater{
            height: 70%;
            aspect-ratio: 1/1;
            border-radius: 50%;
            margin-right: .05rem;
        }
        .username{
            
            margin-right: .05rem;
        }
        .time{
            color: #ccc;
            font-size: .08rem;
            vertical-align: text-bottom;
        }
    }
}
</style>