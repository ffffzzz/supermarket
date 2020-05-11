<template>
  <div class="cart">
    <!--导航-->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!--商品的列表-->
    <cart-list></cart-list>
    <!--底部汇总-->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import { mapGetters } from  'vuex'

  import CartList from  './childComps/CartList'
  import CartBottomBar from  './childComps/CartBottomBar'

  export default {
    name: "Cart",
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
    //  两种语法引用mapGetters里面的属性
      // 第一种用法可以直接用mapGetters里面的cartLength
      ...mapGetters(['cartLength', 'cartList'])
      // 第二种可以自己取名字 : key取想叫的名称,值取mapGetters里面的cartLength
      // ...mapGetters({
      //   length: 'cartLength'
      // })
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
