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
                prop="series">
                <Select v-model="formItem.series"
                    style="width:600px">
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
import Mock from 'mockjs'
import alimask from 'alimask';
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
                publish: 'no',
                coverimg: '',
                videourl: '',
                audiourl: ''
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
    mounted() {

        this.formItem.title = Mock.Random.csentence(10, 20);
        this.formItem.desc = Mock.Random.cparagraph(10, 20);

        this.formItem.coverimg=alimask('花生地:' + this.formItem.title, { color: '#f6dcd7', alpha: 0.5 });
        this.formItem.videourl=alimask('花生地:' + this.formItem.title, { color: '#f6dcd7', alpha: 0.5 });
        this.formItem.audiourl=alimask('花生地:' + this.formItem.title, { color: '#f6dcd7', alpha: 0.5 });



        this.getSeries();
    },
    methods: {
        getSeries() {
            this.$http.get('find-all-course-series', '').then(r => {
                this.courseSeriesList = r.data;
            }).catch(e => {
                this.$Message.error(e.message);
            })
        },
        handleAdd() {

        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    let params = Object.assign({}, this.formItem, { publish: this.formItem.publish == 'yes' })
                    this.$http.post('create-course', this.formItem).then(r => {
                        this.courseSeriesList = r.data;
                        this.$Message.success('操作成功!');
                    }).catch(e => {
                        this.$Message.error(e.message);
                    })

                } else {
                    this.$Message.error('请填写完整表单');
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
