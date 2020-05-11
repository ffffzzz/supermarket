<template>
  <div class="profile">
    <nav-bar class="profile-nav"><div slot="center">我的</div></nav-bar>
    <profile-record></profile-record>
    <profile-detail></profile-detail>
    <profile-new></profile-new>
  </div>
</template>

<script>
  import ProfileRecord from './childComps/ProfileRecord'
  import ProfileDetail from './childComps/ProfileDetail'
  import ProfileNew from './childComps/ProfileNew'

  import NavBar from 'components/common/navbar/NavBar'


  export default {
    name: "Profile",
    components: {
      NavBar,
      ProfileRecord,
      ProfileDetail,
      ProfileNew
    }
  }
</script>

<style scoped>
  .profile {
    height: 100vh;

  }
  .profile-nav {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }
</style>
