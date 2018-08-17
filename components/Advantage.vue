<template>
    <div class="advantage-panel">
        <Row v-for='(item,index) in data'
             :key='item.value'
             v-if='data[index*2]'
             class="advantage-row">
            <Col class="advantage-col"
                 span="11">
            <Card class="advantage-cad">
                <p slot="title">{{data[index*2].label}}</p>
                <p>{{data[index*2].desc}}</p>
                <p>{{data[index*2].desc}}</p>
                <p>{{data[index*2].desc}}</p>
            </Card>
            </Col>
            <Col class="advantage-col"
                 span="11"
                 offset="2">
            <Card class="advantage-cad">
                <p slot="title">{{data[index*2+1].label}}</p>
                <p>{{data[index*2+1].desc}}</p>
                <p>{{data[index*2+1].desc}}</p>
                <p>{{data[index*2+1].desc}}</p>
            </Card>
            </Col>
        </Row>

    </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      defatult: () => []
    }
  }
}
</script>
<style lang="less">
.advantage-panel {
  .advantage-row {
    margin: 10px;
    .advantage-col {
      .advantage-cad {
        width: 350px;
        margin: 0 auto ;
        text-align: center;
      }
    }
  }
}
</style>
