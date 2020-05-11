<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"
                    :is-checked="isSelectAll"
                    @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="reckon" @click="calcClick">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name: "CartBottomBar",
    components: {
      CheckButton
    },
    computed: {
      totalPrice() {
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0)
      },
      checkLength() {
        return this.$store.state.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
        if (this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) { //全部选中
          this.$store.state.cartList.forEach(item => item.checked = false)
        } else { //全部不选中或部分选中
          this.$store.state.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请添加商品到购物车',2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    position: fixed;
    line-height: 40px;
    background-color: #eee;
    display: flex;
    left: 0;
    right: 0;
    bottom: 49px;
    font-size: 14px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .reckon {
    width: 90px;
    text-align: center;
    background-color: orangered;
  }
</style>
