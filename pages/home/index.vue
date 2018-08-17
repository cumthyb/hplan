<template>
  <div id="h-paln-container">

    <HeaderSearch class="header"></HeaderSearch>

    <div class="content">
      <CourseCarousel class="content-course-carousel">
        <LoginCard slot="card" />
      </CourseCarousel>

      <Advantage class="content-advantage-panel"
                 :data='advantageList' />
      <Comments/>
      <ButtonGroup vertical
                   class="tel">
        <Button icon="logo-facebook"></Button>
        <Button icon="logo-twitter"></Button>
        <Button icon="logo-googleplus"></Button>
        <Button icon="ios-phone-portrait"></Button>
      </ButtonGroup>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import HeaderSearch from '~/components/HeaderSearch'
import CourseCarousel from '~/components/CourseCarousel'
import Advantage from '~/components/Advantage'
import Comments from '~/components/Comments'
import LoginCard from '~/components/LoginCard'
export default {
  components: {
    HeaderSearch,
    CourseCarousel,
    Advantage,
    Comments,
    LoginCard
  },
  data() {
    return {
      advantageList: [
        {
          value: 'AD_1',
          label: '特色一',
          desc: '特色一特色一特色一'
        },
        {
          value: 'AD_2',
          label: '特色二',
          desc: '特色二特色二特色二'
        },
        {
          value: 'AD_3',
          label: '特色三',
          desc: '特色三特色三特色三特色三'
        },
        {
          value: 'AD_4',
          label: '特色四',
          desc: '特色四特色四特色四特色四特色四'
        }
      ]
    }
  }
}
</script>
<style lang="less">
#h-paln-container {
  width: 1200px;
  margin: 0 auto;
  .content {
    .content-advantage-panel {
      margin-top: 25px;
      margin-bottom: 25px;
    }
    .tel {
      position: fixed;
      bottom: 200px;
      right: 20px;
      text-align: center;
      padding: 10px;
      margin: 10px;
    }
  }
}
</style>
