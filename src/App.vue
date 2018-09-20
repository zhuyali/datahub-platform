<template>
  <div id="app">
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <el-header class="g-header">
      <a href="/" class="m-title">
        <img class="u-logo" src="//macacajs.github.io/macaca-datahub/logo/logo-color.svg" />
        <span class="u-title">KAOLA-HUB</span>
      </a>
    </el-header>
    <el-main class="g-content">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {

  },
  data () {
    return {

    }
  }
}
</script>

<style lang="less">
.g-content {
  padding: 0!important;
  height: calc(100vh - 80px);
  background: #f0f2f5;
}
.g-header {
  height: 80px!important;
  padding: 0 50px!important;
  .m-title {
    display: flex;
    align-items: center;
    height: 80px;
    .u-logo {
      width: 30px;
      height: 30px;
    }
    .u-title {
      margin-left: 10px;
      font-size: 1.5em;
      font-weight: 500;
      color: rgba(0, 0, 0, .85);
    }
  }
}
</style>
