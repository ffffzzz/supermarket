<template>
  <div class="record">
    <a href="#">
      <slot name="record-icon">
        <img src="~assets/img/profile/avatar.svg" alt="" class="record-icon">
      </slot>
      <slot name="register">
        <div class="register">
          <div class="register-text">登录/注册</div>
          <div class="phone">
            <img src="~assets/img/profile/phone.svg" alt="" class="phone-icon">
            <span>暂无绑定手机号</span>
          </div>
        </div>
      </slot>
      <div class="right">
        >
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: "ProfileRecord"
  }
</script>

<style scoped>
  .record {
    background-color: var(--color-tint);
    height: 80px;
    position: relative;
  }
  .record-icon {
    height: 75px;
    margin-left: 15px;
    float: left;
    width: 65px;
  }
  .register {
    float: left;
    color: #fff;
    margin-left: 5px;
    margin-top: 10px;
  }
  .register-text {
    /*font-size: 18px;*/
    font-weight: 500;
  }
  .phone-icon {
    height: 23px;
    margin-top: 5px;
    font-size: 12px;
    position: relative;
    left: -5px;
  }
  .right {
    position: absolute;
    right: 10px;
    bottom: 40px;
    color: #fff;
  }
</style>
