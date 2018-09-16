<!-- 作业组件 批改和未批改 -->
<template>
  <div class="task-view-panel">
    <div class="task-info">
      <Card>
        <p slot="title">作业内容</p>
        <div>
          {{taskInfo.content}}
        </div>
      </Card>

    </div>
    <div class="comment-teacher">
      <Card>
        <p slot="title">老师点评</p>
        <div>
          {{taskInfo.comment}}
        </div>
      </Card>
    </div>
    <div class="comment-student">
      <span class="title">评价老师</span>
      <Rate clearable
        v-model="taskInfo.rate" />
    </div>
    <div class="cmd-panel">
      <Button>继续写作业</Button>
    </div>
  </div>
</template>

<script>
import Mock from 'mockjs'
export default {
  components: {},

  data() {
    return {
      taskId: '',
      corrected: false,
      rate: 2,
      taskInfo: {}
    };
  },

  computed: {},

  mounted() {
    this.taskId = this.$route.query.id;
    let taskInfo = Mock.mock({
      "object": {
        "content": Mock.Random.cparagraph(80, 100),
        "comment": Mock.Random.cparagraph(50, 80),
        "rate": Mock.Random.integer(1, 5),
      }
    })
    this.taskInfo = taskInfo.object
  },

  methods: {}
}

</script>
<style lang='less'>
.task-view-panel {
    overflow-y: inherit;
    .task-info,
    .comment-teacher {
        text-indent: 2em;
        padding: 10px 0;
        margin-bottom: 10px;
    }

    .comment-student {
        margin-bottom: 10px;
        .title {
            font-size: 1em;
            margin-right: 10px;
        }
    }
}
</style>