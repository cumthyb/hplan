<template>
  <div class="create-order-panel">
    <div class="cmd-panel">
      <Button @click="handleOpenDraw"
        type="primary">Open</Button>
    </div>
    <div class='create-panel'>
      <Drawer title="Create"
        v-model="drwaOpen"
        width="900"
        :mask-closable="false"
        :styles="styles">
        <Form :label-width="100" :model="formData">
          <Row>
            <Col span="20">
            <FormItem label="会员"
              label-position="top">
              <Transfer :data="memberArr"
                class="member-transfer"
                :titles="titles"
                :target-keys="formData.member"
                :list-style="listStyle"
                :render-format="renderTransfer"
                :operations="['To left','To right']"
                filterable
                @on-change="handleTransferChange">
                <div style="{float: 'right', margin: '5px'}">
                  <Button size="small"
                    @click="getMemberArr">重新加载</Button>
                </div>
              </Transfer>
            </FormItem>
            </Col>
            <Col span="20">
            <FormItem label="课程"
              label-position="top">
              <Select v-model="formData.course"
                multiple
                style="width:500px">
                <Option v-for="item in courseArr"
                  :value="item._id"
                  :key="item._id">{{ item.title }}</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>
          <Row>
            <Col span="5">
            <FormItem label="付款金额"
              label-position="top">
              <InputNumber :min="0"
                v-model="formData.amount"></InputNumber>
            </FormItem>
            </Col>
            <Col span="7">
            <FormItem label="付款渠道"
              label-position="top">
              <Select v-model="formData.paychannel"
                placeholder="请选择付款渠道">
                <Option value="zfb">支付宝</Option>
                <Option value="wx">微信</Option>
              </Select>
            </FormItem>
            </Col>
             <Col span="10">
               <FormItem label="付款时间"
              label-position="top">
              <DatePicker v-model="formData.paytime" type="datetime" placeholder="Select date and time" style="width: 200px" ></DatePicker>
            </FormItem>
              </Col>
          </Row>
          <Row>
            <FormItem label="有效期"
              label-position="top">
              <DatePicker type="daterange"
                split-panels
                placeholder="Select date"
                style="width: 200px"
                v-model="formData.validityPeriod"></DatePicker>
            </FormItem>
            </Col>
          </Row>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px"
            @click="drwaOpen = false">Cancel</Button>
          <Button type="primary"
            @click="handleCreateOrder">Submit</Button>
        </div>
      </Drawer>
    </div>
    <div class="table-panel"></div>
  </div>
</template>

<script>
export default {
  components: {

  },
  props: {
    id: ''
  },
  data() {
    return {
      drwaOpen: false,
      courseArr: [],
      memberArr: [],
      member: [],
      titles: ['所有会员', '目标会员'],
      listStyle: {
        width: '250px',
        height: '300px'
      },
      styles: {
        height: 'calc(100% - 55px)',
        overflow: 'auto',
        paddingBottom: '53px',
        position: 'static'
      },
      formData: {
        id: '',
        member: [],
        course: '',
        amount: 0,
        paytime: '',
        paychannel: '',
        validityPeriod: ''
      }
    }
  },
  methods: {
    handleOpenDraw(){
       this.drwaOpen = true;
       this.getAllCourse();
       this.getMemberArr();
    },
    handleCreateOrder() {
      console.log(this.formData)
        this.$http.post('create-order',this.formData).then(r => {
        this.$Message.success('操作成功');
      }).catch(e => {
        this.$Message.error(e.message);
      })
      this.drwaOpen = false
    },
    renderTransfer(item) {
      return item.label + ' - ' + item.description;
    },
    handleTransferChange(newTargetKeys) {
      this.formData.member = newTargetKeys;
    },
    getMemberArr() {
      this.$http
        .post('member-findAll', '')
        .then(r => {
          let arr = []
          r.data.map(item => arr.push({
            key: item.id,
            description: item.name,
            label: item.alias,
            disabled: item.name == 'admin'
          }))
          console.log(arr)
          this.memberArr = arr
        })
        .catch(error => {
          this.$Notice.error({
            title: error.message
          })
        })
    },
    getAllCourse() {
      this.$http.get('find-all-course', '').then(r => {
        this.courseArr = r.data;
      }).catch(e => {
        this.$Message.error(e.message);
      })
    },
  },
}
</script>

<style lang="less">
.create-order-panel {
}
.create-panel {
    .member-transfer {
        .ivu-transfer-list-footer {
            bottom: 12px;
        }
    }
}
</style>
