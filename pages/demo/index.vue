<template>
    <div>
        <QuillEditor :value="taskContent"
            @editor-blur='onEditorBlur' />
    </div>
</template>

<script>
import Mock from 'mockjs'
import QuillEditor from '@components/QuillEditor.vue'

export default {
    components: {
        QuillEditor
    },
    data() {
        return {
            taskContent: '',
        }
    },
    mounted() {
        this.taskContent = '<p><br></p><h2 class="ql-align-center"><span class="ql-size-huge">创业大街社区</span></h2><ol><li>创业大街社区是氪空间的第一座社区，2014年4月22日诞生于中国创新创业核心聚集区中关村创业大街，被称为中国的“独角兽诞生地”。社区面积约2000平米，空间内还包含休息区、会议室、路演厅、氪咖啡、露天阳台等。通过打造良好的社群氛围，提供专业的创业指导，整合丰富的资源，为企业建立起一条完整的生态闭环，成为中国最优秀的联合办公空间。</li></ol><p><br></p><p><br></p>'
    },

    methods: {
        onEditorBlur(content) {
            this.taskContent = content
        },
    },
}
</script>

<style lang="less">
</style>
