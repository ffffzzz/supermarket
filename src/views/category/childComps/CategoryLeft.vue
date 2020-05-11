<template>
    <div class="sort-left">
      <div  class="left-item"
            v-for="(item,index) in categoryleft"
            :key="index"
            :class="{active: index === currentIndex}"
            @click="leftClick(index)">
        {{item.title}}
      </div>
    </div>
</template>

<script>
  import Scroll from  'components/common/scroll/Scroll'
  export default {
    name: "CategoryLeft",
    components: {
      Scroll
    },
    props: {
      categoryleft: {
        type: Array,
        defaults() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      leftClick(index) {
        this.currentIndex = index
      }
    }
  }
</script>

<style scoped>
  .sort-left {
    background-color: #f6f6f6;
  }
  .left-item {
    height: 45px;
    font-size: 14px;
    /*text-align: center;*/
    padding: 0 0 0 8px;
    line-height: 45px;
    /*margin-left: 10px;*/
    box-sizing: border-box;
  }
  .active {
    border-left: 3px solid var(--color-tint);
    background-color: #fff;
    font-weight: 700;
    color: var(--color-tint);
  }
</style>
