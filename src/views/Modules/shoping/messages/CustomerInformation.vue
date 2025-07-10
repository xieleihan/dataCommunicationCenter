<template>
    <div class="customer">
        <div class="title">商店信息</div>
        <div class="container">
            <!-- 客服 -->
            <div class="left">
                <!-- 消息列表 -->
                <MessagesList />
            </div>
            <div class="right">
                <!-- 消息详情 -->
                <MessagesDetail />
            </div>
        </div>
    </div>
</template>

<script setup>
import MessagesList from '../../../../components/shopping/messages/MessagesList.vue';
import MessagesDetail from '../../../../components/shopping/messages/MessagesDetails.vue';
</script>

<style lang="scss" scoped>
.customer{
    width: 100%;
    height: 100%;
    border: 1px solid #ccc;
    display: flex;
    flex-direction: column;
    .title{
        font-size: .1rem;
        font-weight: bold;
        line-height: 1;
        margin-bottom: 0.1rem;
    }
    .container{
        width: 100%;
        height: calc(100% - 0.2rem);
        display: flex;
        flex-direction: row;
        .left,
        .right{
            height: 100%;
        }
        .left{
            width: 30%;
            border-right: 1px solid #ccc;
        }
        .right{
            width: 70%;
        }
    }
}
</style>