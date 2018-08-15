<template>
    <header class="header-can-hide" v-show='headerVisible'>
        <div>
               <img src="https://s1.51cto.com/images/201808/15/4992a80df8dfcd233759c5e5de6e92c2.jpg"
             alt=""
             srcset="">
             <span class="close" @click="headerVisible=false">
                 <img src="https://s1.51cto.com/images/201808/14/d3b6ca55bd5cc7a4999bf8a765059e49.png" alt="" srcset="">
             </span>
        </div>     
    </header>
</template>
<script>
export default {
    data(){
        return{
            headerVisible:true,
        }
    }
}
</script>

<style lang="less">
.header-can-hide {
  background: #ff2045;
  height: 70px;
  div {
    width: 1200px;
    margin: auto;
    position: relative;
    z-index: 2;
    border: none;
    .close{
         position:absolute; width:13px;height:13px; cursor:pointer;right:0; top:5px;z-index:9;
         img{
             border: none;
         }
    }
  }
}
</style>

