<template>
  <div>
    <my-header/>
    <nuxt/>
    <my-footer/>
  </div>
</template>

<script>
import MyFooter from '../components/Footer.vue'
import MyHeader from '../components/Header.vue'

export default {
  components: {
    MyFooter,
    MyHeader
  },
  mounted() {
    window.onhashchange = function (e) {
      console.log('old URL:', e.oldURL)
      console.log('new URL', e.newURL)
    }
    window.onreadystatechange = function (e) {
      debugger
      console.log('===========readystatechange=========================')
      console.log(document.location)
      console.log('====================================')
    }
  }
}
</script>

<style>
.container {
    margin: 0;
    width: 100%;
    padding: 100px 0;
    text-align: center;
}

.button,
.button:visited {
    display: inline-block;
    color: #3b8070;
    letter-spacing: 1px;
    background-color: #fff;
    border: 2px solid #3b8070;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 45px;
}

.button:hover,
.button:focus {
    color: #fff;
    background-color: #3b8070;
}

.title {
    color: #505153;
    font-weight: 300;
    font-size: 2.5em;
    margin: 0;
}
</style>
