<template>
    <keep-alive>
        <div class="releasesPages" v-loading="commitList.length === 0">
            <el-timeline class="timeline" style="overflow-y: scroll;">
                <el-timeline-item v-for="(item, index) in commitList" :key="index" :timestamp="item.commit.author.date"
                    placement="top" :icon="item.icon" :type="item.type">
                    <el-card>
                        <h4>{{ item.sha }}</h4>
                        <div style="display: flex;justify-content: space-between;align-items: center;margin: .1rem 0;">
                            <div class="left" style="display: flex;align-items: center;">
                                <img style="border-radius: 50%;width: 30px;height: 30px;margin-right: .1rem;"
                                    loading="lazy" :src="item.author.avatar_url" alt="头像">
                                <p><el-tag type="info">{{ item.type }}</el-tag></p>
                            </div>
                            <div class="right">
                                <el-button @click="handleDetail(item.url)" type="primary" size="small">查看详情</el-button>
                            </div>
                        </div>
                        <p>提交者:{{ item.author.login }}</p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </keep-alive>
</template>

<script setup>
import { getReleases } from '../../api/request';
import { onMounted, ref } from 'vue';

const commitList = ref([]);

onMounted(() => {
    // 获取最新版本信息
    getReleases({}).then(res => {
        console.log("获取到的版本信息", res);
        if (res.length > 0) {
            res[0] = { ...res[0], icon: 'Select', type: 'primary' };
        }
        commitList.value = res;
    }).catch(err => {
        console.error("获取版本信息失败", err);
    });
});
</script>

<style lang="scss" scoped>
.releasesPages{
    width: 100%;
    padding: .1rem;
    overflow: hidden;
}
</style>