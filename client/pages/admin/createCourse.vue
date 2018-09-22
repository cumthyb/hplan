<template>
<div class="new-course-panel">
        <SectionTitle title="新建课程系列" />

        <Form ref="formValidate"
        class="series-course-form"
        :model="formValidate"
        :rules="ruleValidate"
        label-position='right'
        :label-width="150">
        <FormItem label="系列课名称"
            prop="seriesname">
            <Input v-model="formValidate.seriesname"
                placeholder="系列课名称"></Input>
        </FormItem>

        <FormItem label="简介"
            prop="desc">
            <Input v-model="formValidate.desc"
                type="textarea"
                :autosize="{minRows: 10,maxRows:50}"
                placeholder="简介"></Input>
        </FormItem>
        <FormItem>
            <Button type="primary"
                @click="handleSubmit('formValidate')">提交</Button>
            <Button @click="handleReset('formValidate')"
                style="margin-left: 8px">重置</Button>
        </FormItem>
    </Form>
</div>

</template>
<script>
import SectionTitle from '@components/SectionTitle.vue'

export default {
    components: {
        SectionTitle
    },
    data() {
        return {
            formValidate: {
                seriesname: '',
                desc: ''
            },
            ruleValidate: {
                seriesname: [
                    { required: true, message: '请输入课程类名称', trigger: 'blur' }
                ],
                desc: [
                    { required: true, message: '请输入课程简介', trigger: 'blur' },
                    { type: 'string', min: 20, message: '简介不应少于20字符', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset(name) {
            this.$refs[name].resetFields();
        }
    }
}
</script>


<style lang="less">
.new-course-panel{
    .series-course-form{

    }
}
</style>
