<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @itemClick="itemClick"
                 ref="tabControl1" class="tabcontrol" v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="ctnScroll"
            :pull-up-load="true"
            @pullingUp="pullingUp">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <rec-view :recommends="recommends"></rec-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行', '新款', '精选']"
                   @itemClick="itemClick"
                   ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecView from './childComps/RecView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import {getHomeUrl ,getHomeGoods } from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeUrl()

      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('sell')
      this.getHomeGoods('new')
    },
    mounted() {
      //3.监听goodsListItem里的发射出来的事件总线完成
      // const refresh = this.debounce(this.scroll && this.$refs.scroll.scroll.refresh,500)
      this.$bus.$on('homeItemImageLoad', () => {
        this.scroll && this.$refs.scroll.scroll.refresh()
      })

    },
    methods: {
      /**
       *事件监听的方法
       */
      //
      // debounce(func,delay) {
      //   let timer = null
      //   return function (...args) {
      //     var context = this;
      //     if (timer) clearTimeout(timer)
      //     timer = setTimeout(() => {
      //       func.apply(context,args)
      //     },delay)
      //   }
      // },
       itemClick(index) {
        // console.log(index);
        switch (index) {
           case 0:
             this.currentType = 'pop'
             break
           case 1:
             this.currentType = 'new'
             break
           case 2:
             this.currentType = 'sell'
             break
         }
         this.$refs.tabControl1.currentIndex = index;
         this.$refs.tabControl2.currentIndex = index;
      },
      //@click.native : 监听组件原生点击事件
      backClick() {
         this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      ctnScroll(position) {
         //1.判断BackTop是否显示
         this.isShowBackTop = (-position.y) > 500
         //2.判断tabControl是否吸顶(position:fixed)
         this.isTabFixed = (-position.y) > this.tabOffsetTop

      },
      pullingUp() {
         this.getHomeGoods(this.currentType)
      },

      //2.获取tabControl的tabOffsetTop
      //所有的组件都有一个属性$el : 用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop);
      swiperImageLoad() {
         this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      /**
       * 网络请求相关方法
       */
      getHomeUrl() {
        getHomeUrl().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          //push(...):  塞数据
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        //  完成加载更多之后必须进行finishPullUp(),不然只能加载一次
          this.$refs.scroll.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /*在使用浏览器原生滚动时,为了让导航不跟着一起滚动使用的下面这些属性
    *或者自己添加一个margin-top: 44px的样式也行
    */
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 9;*/
  }
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .tabcontrol {
    /*margin-top: 44px;*/
    position: relative;
    z-index: 9;
  }
</style>
