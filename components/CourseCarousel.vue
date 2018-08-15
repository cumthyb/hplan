<template>
    <div class="course-carousel">
        <Carousel autoplay
                  v-model="value2"
                  loop
                  :height='500'>
            <CarouselItem>
                <div class="demo-carousel">
                    <span>课程1</span>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <span>课程2</span>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <span>课程3</span>
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <span>课程4</span>
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>
<script>
export default {
  data() {
    return {
      value2: 0
    }
  }
}
</script>
<style lang="less">
.course-carousel {
  .demo-carousel {
    width: 100%;
    height: 100%;
    background-color: #506b9e;
    font-size: 30px;
    color: aliceblue;
    text-align: center;
    position: relative;
        span{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%)
        }
  }
}
</style>
