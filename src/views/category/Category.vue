<template>
  <div class="category">
    <nav-bar class="category-nav"><div slot="center">商品分类</div></nav-bar>
    <category-left :categoryleft="categoryleft"></category-left>

  </div>
</template>

<script>
import CategoryLeft from './childComps/CategoryLeft'

import NavBar from 'components/common/navbar/NavBar'

import {getCategoryl, getCategoryr, getCategoryDetail} from "network/category";

  export default {
    name: "Category",
    data() {
      return {
        categoryleft: []
      }
    },
    components: {
      NavBar,
      CategoryLeft
    },
    created() {
      //1.请求分类数据
      this.getCategoryl();
      this.getCategoryr(maitKey);
      this.getCategoryDetail(type)
    },
    methods: {
      getCategoryl() {
        getCategoryl().then(res => {
          // console.log(res);
          // 1.获取分类数据
          this.categoryleft = res.data.category.list
        })
      },
      getCategoryDetail(type) {
        getCategoryDetail().then(res => {
          console.log(res);
        })
      },
      getCategoryr(maitKey) {
        getCategoryr().then(res => {
          console.log(res);
        })
      }
    }
  }
</script>

<style scoped>
  .category {
    height: 100vh;
  }
  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>
