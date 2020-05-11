<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @navClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll"
            @scroll="contentScroll" :probe-type="3">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @goCart="addCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import DetailNavBar from  './childComps/DetailNavBar'
  import DetailSwiper from  './childComps/DetailSwiper'
  import DetailBaseInfo from  './childComps/DetailBaseInfo'
  import DetailShopInfo from  './childComps/DetailShopInfo'
  import DetailGoodsInfo from  './childComps/DetailGoodsInfo'
  import DetailParamInfo from  './childComps/DetailParamInfo'
  import DetailCommentInfo from  './childComps/DetailCommentInfo'
  import DetailBottomBar from  './childComps/DetailBottomBar'

  import Scroll from  'components/common/scroll/Scroll'
  import GoodsList from  'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import {getDetailUrl, Goods, Shop, GoodsParam, getRecommend} from "network/detail";

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
      BackTop
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTopYs: [],
        currentIndex: 0,
        isShowBackTop: false
      }
    },
    created() {
      //1.保存存入的iid
      this.iid = this.$route.params.id

      //2.根据iid请求详情数据
      getDetailUrl(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
        //  1.获取顶部图片轮播数据
        this.topImages = data.itemInfo.topImages;

        //  2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

        //  3.创建店铺信息
        this.shop = new Shop(data.shopInfo);

        //  4.保存商品的详情数据
        this.detailInfo = data.detailInfo;

        //  5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

        //  6.取出评论信息
        if (data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        // console.log(res);
        this.recommends = res.data.list
      })
    },
    methods: {
      imageLoad() {
        this.scroll && this.$refs.scroll.scroll.refresh();

        //   对应下边的titleClick 商品里边的navbar滚动到对应的数据
        //created肯定不行,组件压根还没获取元素
        //created里的$nextTick也不行,图片也没有渲染完
        //mounted也不行,数据没获取到
        //没办法,只能在这里才能把所有的组件渲染完的offsetTop的位置才对
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE);
        // console.log(this.themeTopYs);
      },
      titleClick(index) {
        //  对应上边的商品里边的navbar滚动到对应的数据
        this.$refs.scroll.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },
      contentScroll(position) {
        //   商品里边的滚动然后显示对应的navbar
        // 1.获取Y值
        const positoinY = -position.y
        // 2.positoinY和注意中的值进行对比
        // [0, 3014, 3859, 4149, 1.7976931348623157e+308]
        //  positoinY 判断大于等于0和小于3014 之间,index = 0
        //  positoinY 判断大于等于3014和3859 之间,index = 1
        //  positoinY 判断大于等于3859和4149 之间,index = 2
        //  positoinY 判断大于Number的最大值index = 3
        let length = this.themeTopYs.length
        for (let i = 0; i < length-1; i++) {
          if (this.currentIndex !== i && (positoinY >= this.themeTopYs[i] && positoinY < this.themeTopYs[i+1])) {
            this.currentIndex = i;
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
        //3.判断BackTop是否显示
        this.isShowBackTop = (-position.y) > 500
      },
      backClick() {
        this.$refs.scroll.scroll.scrollTo(0,0,500)
      },
      addCart() {
        // 获取添加到购物车的信息
        const box = {};
        box.image = this.topImages[0];
        box.title = this.goods.title;
        box.desc = this.goods.desc;
        box.price = this.goods.realPrice;
        box.iid = this.iid
        // 将商品添加到购物车在mutations
        // this.$store.commit('addCart',box)
        //换到actions执行  而且actions可以返回一个promise
        this.$store.dispatch('addCart',box).then(res => {
          this.$toast.show(res,2000)
        })
      }
    },

    mounted() {
      //GoodslistItem里面发射的bus事件, 监听刷新
      this.$bus.$on('detailItemImageLoad', () => {
        this.scroll && this.$refs.scroll.scroll.refresh()
      })
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
