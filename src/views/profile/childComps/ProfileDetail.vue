<template>
  <div>
    <div class="pro-detail">
      <div>
        <div><strong>0.00</strong>元</div>
        <span>我的盈余</span>
      </div>
      <div>
        <div><strong>0</strong>个</div>
        <span>我的优惠</span>
      </div>
      <div>
        <div><strong>0</strong>分</div>
        <span>我的积分</span>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: "ProfileDetail"
  }
</script>

<style scoped>
  .pro-detail {
    display: flex;
    justify-content: space-around;
    text-align: center;
    margin-top: 10px;
    color: #5c6b77;
  }
  .pro-detail strong {
    color: orangered;
    font-size: 21px;
  }
  .line {
    margin-top: 10px;
    background-color: #e6e6e6;
    height: 13px;
  }
</style>
