<!-- 作业总览 -->
<template>
  <div class='task-panel'>
    <SectionTitle :title="title"/>
    <Table border class='tasks-table' :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
import SectionTitle from '@components/SectionTitle.vue'
export default {
  name: 'task',
  components: {
    SectionTitle
  },
  data() {
    return {
      userName:'蜗牛',
      wordsCount:56562,
      columns1: [
        {
          title: '作业名称',
          key: 'name1',
          align: 'center'
        },
        {
          title: '作业状态',
          key: 'name2',
          align: 'center',
          className: 'score',
          render: (h, params) => {
            let str = params.row.name2
            return h('p', { style: {color:str=='合格'?'black':'red'} }, str)
          }
        },
        {
          title: '批改状态',
          key: 'name3',
          align: 'center',
          render: (h, params) => {
            if (params.row.name3 == '已批改') {
              return h(
                'p',
                {
                  style: {
                    color: '#3F4EFC',
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
                '已批改'
              )
            } else {
              return h('p', '未批改')
            }
          }
        },
        {
          title: '提交次数',
          key: 'name4',
          align: 'center'
        }
      ],
      data1: [
        {
          name1: '财经',
          name2: '不合格',
          name3: '未批该',
          name4: '1'
        },
        {
          name1: '体育',
          name2: '合格',
          name3: '已批改',
          name4: '2'
        },
        {
          name1: '民生',
          name2: '不合格',
          name3: '已批改',
          name4: '3'
        }
      ]
    }
  },

  computed: {
    title:{
      get(){
        return `亲爱的${this.userName}同学，你已经在花生写作上累计写了${this.wordsCount}字`
      }
    }
  },

  mounted() {},

  methods: {
    jump2TaskDetail() {
      let newWindow = window.open()
      newWindow.location = 'www.baidu.com'
    }
  }
}
</script>
<style lang='less'>
.task-panel {
  padding: 20px;
  .tasks-table {
    margin-top: 10px;
  }
}
</style>