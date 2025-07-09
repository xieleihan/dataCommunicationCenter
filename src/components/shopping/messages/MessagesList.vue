<template>
    <div class="messagesList">
        <div class="item">
            <img loading="lazy" class="avater" src="" alt="头像" />
            <div class="userinfo">
                <div class="username"></div>
                <div class="userdesc"></div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.messagesList{
    width: 100%;
    height: 100%;
    overflow: auto;
    .item{
        width: 100%;
        height: .2rem;
        display: flex;
        padding: .05rem .1rem;
        .avater{
            height: 70%;
            aspect-ratio: 1/1;
            border-radius: 50%;
            margin-right: .05rem;
        }
        .userinfo{
            width: calc(100% - 0.2rem);
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            .username{
                font-size: .1rem;
                font-weight: bold;
                margin-bottom: .05rem;
            }
            .userdesc{
                font-size: .08rem;
                color: #ccc;
            }
        }
    }
}
</style>