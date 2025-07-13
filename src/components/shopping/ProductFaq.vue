<template>
    <div class="collapse">
        <el-collapse v-model="activeName" accordion>
            <!-- <el-collapse-item
                title="Consistency"
                name="1"
            >
                <div>
                    Consistent with real life: in line with the process and logic of real
                    life, and comply with languages and habits that the users are used to;
                </div>
                <div>
                    Consistent within interface: all elements should be consistent, such
                    as: design style, icons and texts, position of elements, etc.
                </div>
            </el-collapse-item> -->
            <el-collapse-item v-for="(item,index) in data" :title="item.F" :name="index" :key="index">
                <div>{{ item.A }}</div>
            </el-collapse-item> 
        </el-collapse>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, watch } from 'vue'

const activeName = ref('1')
const props = defineProps({
    productFaq: {
        type: String,
        default: () => ('')
    }
})

const data = ref([])

watch(() => props.productFaq, (newVal) => {
    if (newVal) {
        // 解析F:xxx,A:xxx; {F: '问题1', A: '答案1'}
        data.value = newVal.split(';').map(item => {
            const parts = item.split(',');
            const faqObj = {};
            parts.forEach(part => {
                const [key, value] = part.split(':');
                faqObj[key.trim()] = value.trim();
            });
            return faqObj;
        });
    }
}, { immediate: true })
</script>