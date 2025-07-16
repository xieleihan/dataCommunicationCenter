<template>
    <div class="messagesList">
        <div class="item">
            <img loading="lazy" class="avater" src="../../../assets/icon/avater.jpg" alt="头像" />
            <div class="userinfo">
                <div class="username">用户名</div>
                <div class="userdesc">消息简述消息简述消息简述消息简述</div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@import '../../../styles/base.module.scss';
.messagesList{
    width: 100%;
    height: 100%;
    overflow: auto;
    .item{
        width: 100%;
        height: .5rem;
        display: flex;
        padding: .05rem .1rem;
        // background-color: #c7c7c74b;
        border-bottom: 1px solid #ccc;
        align-items: center;
        &:hover{
            background-color: $googleBlue;
            .userinfo{
                .username{
                    color: #fff;
                }
            }
        }
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
                line-height: .1rem;
                margin-bottom: .05rem;
            }
            .userdesc{
                font-size: .07rem;
                color: #ccc;
                width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding: 0 .1rem 0 0;
            }
        }
    }
}
</style>