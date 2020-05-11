<template>
  <div>
    <div class="pro-new">
      <div class="message">
        <img src="~assets/img/profile/message.svg" alt="">
        <span class="message-text">我的信息</span>
      </div>
      <div class="message">
        <img src="~assets/img/profile/pointer.svg" alt="">
        <span class="message-text">积分商城</span>
      </div>
      <div class="message">
        <img src="~assets/img/profile/vip.svg" alt="">
        <span class="message-text">会员卡</span>
      </div>
    </div>
    <div class="line"></div>
    <div class="message">
      <img src="~assets/img/profile/cart.svg" alt="">
      <span class="message-text">我的购物火车</span>
    </div>
    <div class="message">
    <img src="~assets/img/profile/shopping.svg" alt="">
    <span class="message-text">下载APP</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: "ProfileNew"
  }
</script>

<style scoped>
  .message {
    height: 50px;
    margin-left: 15px;
    border-bottom: 1px solid #e6e6e6;
  }
  .message img {
    width: 30px;
    height: 50px;
    vertical-align: middle;
  }
  .message-text {
    display: inline-block;
    margin-left: 10px;
    color: #4e4e4e;
    margin-top: 15px;
  }
  .line {
    background-color: #e6e6e6;
    height: 13px;
  }
</style>
