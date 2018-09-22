<template>
    <div>
        <SectionTitle title="课程管理" />
        <Table border
            class='tasks-table'
            :columns="columns1"
            :data="data1"></Table>
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
            columns1: [
                {
                    title: '课程名称',
                    key: 'name1',
                    align: 'center'
                },
                {
                    title: '所属系列',
                    key: 'name2',
                    align: 'center',
                    className: 'score',
                    render: (h, params) => {
                        let str = params.row.name2
                        return h('p', { style: { color: str == '合格' ? 'black' : 'red' } }, str)
                    }
                },
                {
                    title: '上传时间',
                    key: 'name3',
                    align: 'center',
                    render: (h, params) => {
                        let color = ''
                        let text = ''
                        if (params.row.name3 == '已批改') {
                            color = '#3F4EFC'
                            text = '已批改'
                        }
                        else {
                            color = '#c3e5a0',
                                text = '未批改'
                        }

                        return h(
                            'p',
                            {
                                style: {
                                    color: color,
                                    cursor: 'pointer'
                                },
                                on: {
                                    click: () => {
                                        this.jump2TaskDetail({
                                            id: params.row.id
                                        })
                                    }
                                }
                            },
                            text
                        )
                    }
                },
                {
                    title: '操作',
                    key: 'name4',
                    align: 'center'
                }
            ],
            data1: [
                {
                    name1: '财经',
                    name2: '体育',
                    name3: '未批该',
                    name4: '1'
                },
                {
                    name1: '体育',
                    name2: '财经',
                    name3: '已批改',
                    name4: '2'
                },
                {
                    name1: '民生',
                    name2: '民生',
                    name3: '已批改',
                    name4: '3'
                }
            ]
        }
    },
    methods: {

    },
}
</script>

<style lang="less">
</style>
