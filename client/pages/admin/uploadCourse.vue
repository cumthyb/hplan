<template>
    <div class="upload-course-panel">
        <SectionTitle title="上传课程" />
        <Form ref="formItem"
            class="upload-form "
            :model="formItem"
            :rules="ruleValidate"
            label-position='right'
            :label-width="150">
            <FormItem label="课程标题"
                prop="title">
                <Input v-model="formItem.title"
                    placeholder="课程标题"></Input>
            </FormItem>

            <FormItem label="课程简介"
                prop="desc">
                <Input v-model="formItem.desc"
                    type="textarea"
                    :autosize="{minRows: 10,maxRows:50}"
                    placeholder="课程简介"></Input>
            </FormItem>

            <FormItem label="上传封面"
                prop="pic">
                <!-- <input v-model="formItem.pic"
                    type="file"
                    style="display:none"
                    </input> -->
                <Button type="dashed"
                    long
                    @click="handleAdd"
                    icon="md-add">
                    上传封面
                </Button>
            </FormItem>
            <FormItem label="上传视频"
                prop="video">
                <!-- <input v-model="formItem.video"
                    type="file"
                    style="display:none"></input> -->
                <Button type="dashed"
                    long
                    @click="handleAdd"
                    icon="md-add">
                    上传视频
                </Button>
            </FormItem>
            <FormItem label="课程分类"
                prop="classify">
                <Select v-model="formItem.classify"
                    style="width:200px">
                    <Option v-for="item in courseSeriesList"
                        :value="item.value"
                        :key="item.value">{{ item.label }}</Option>
                </Select>
            </FormItem>
            <FormItem label="是否发布">
                <RadioGroup v-model="formItem.publish">
                    <Radio label="yes">立即发布</Radio>
                    <Radio label="no">暂不发布</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem>
                <Button type="primary"
                    @click="handleSubmit('formItem')">提交</Button>
                <Button @click="handleReset('formItem')"
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

            courseSeriesList: [],
            formItem: {
                title: '',
                desc: '',
                publish: 'no'
            },
            ruleValidate: {
                title: [
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
        handleAdd() {

        },
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
.upload-course-panel {
    .upload-form {
    }
}
</style>
