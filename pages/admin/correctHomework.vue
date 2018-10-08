<template>
    <div>
        <SectionTitle title="批改作业" />
        <div class="papers-panel">
            <Table border
                class='tasks-table'
                :columns="columns"
                :data="dataTable"></Table>
        </div>

    </div>
</template>

<script>
import Mock from 'mockjs'
import SectionTitle from '@components/SectionTitle.vue'
import dateUtils from 'vue-dateutils';

export default {
    components: {
        SectionTitle
    },
    props: {
        id: ''
    },
    data() {
        return {
            columns: [
                {
                    title: '学员昵称',
                    key: 'aliasName',
                    align: 'center'
                },
                {
                    title: '课程分类',
                    key: 'courseSeries',
                    align: 'center',
                    render: (h, params) => {
                        let str = params.row.name2
                        return h('p', { style: { color: str == '合格' ? 'black' : 'red' } }, str)
                    }
                },
                {
                    title: '提交时间',
                    key: 'submitTime',
                    align: 'center',
                    render: (h, params) => {
                        return dateUtils.dateToStr("YYYY-MM-DD HH:mm:ss", new Date(params.row.submitTime))
                    }
                },
                {
                    title: '批改人',
                    key: 'corrector',
                    align: 'center'
                },
                {
                    title: '学员评价',
                    key: 'rate',
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'aliasName',
                    align: 'center'
                }
            ],
            dataTable: []
        }
    },
    mounted() {
        this.mockdata()
    },
    methods: {
        mockdata() {
            let data = Mock.mock({
                "arr|10-25": [
                    {
                        'aliasName': () => Mock.Random.cname(),
                        'courseSeries': () => Mock.Random.csentence(5),
                        'submitTime': () => Mock.Random.datetime('yyyy-MM-dd HH:mm:ss'),
                        'corrector': () => Mock.Random.cname(),
                        'rate': () => Mock.Random.integer(0, 5),
                    }
                ]
            })
            this.dataTable = data.arr
        }
    },
}
</script>

<style lang="less">
.papers-panel {
    margin-top: 20px;
    padding: 20px;
}
</style>
