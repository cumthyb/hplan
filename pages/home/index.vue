<template>
    <div id="h-paln-container">

        <HeaderSearch class="header"></HeaderSearch>

        <div class="content">
            <CourseCarousel class="content-course-carousel"></CourseCarousel>
        </div>
        <div class="footer"></div>
    </div>
</template>
<script>
import HeaderSearch from '~/components/HeaderSearch'
import CourseCarousel from '~/components/CourseCarousel'
export default {
  components: {
    HeaderSearch,
    CourseCarousel
  },
  data() {
    return {}
  }
}
</script>
<style lang="less">
#h-paln-container {
  width: 1200px;
  margin: 0 auto;
}
</style>
