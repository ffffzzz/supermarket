<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: ''
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper,{
        //click:在BScroll点击事件默认为false
        click: true,
        //probeType: 监听鼠标滚到哪里
        //0和1都是监听不到  2监听到手指滚动,惯性之后不监听,3全部监听
        //看自己需不需要实时监听滚动位置
        probeType: this.probeType,
        //pullUpLoad: 监听上拉事件
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动的位置
      this.scroll.on('scroll',position => {
      // 谁需要position的时候给谁,所以自定义一个事件
        this.$emit('scroll',position)
      })

      //3.监听上拉事件
      this.scroll.on('pullingUp',() => {
        //谁需要上拉加载更多的时候,所以自定义一个事件
        this.$emit('pullingUp')
      })
    }
  }
</script>

<style scoped>

</style>
