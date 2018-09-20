<template>
  <div id="app">
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <el-header class="g-header">
      <a href="/" class="m-title">
        <img class="u-logo" src="//macacajs.github.io/macaca-datahub/logo/logo-color.svg" />
        <span class="u-title u-font">KAOLA-HUB</span>
      </a>
      <a class="u-issue" :href="issueLink" target="_blank">
        <span class="u-font">问题反馈</span>
      </a>
    </el-header>
    <el-main class="g-content">
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
const pkg = require('../package.json')

export default {
  name: 'app',
  computed: {
    issueLink () {
      return `${pkg.links.issue}?utf8=%E2%9C%93&q=`
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
    float: left;
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
    }
  }
  .u-issue {
    float: right;
    font-size: 1.2em;
    line-height: 80px;
  }
  .u-font {
    font-weight: 500;
    color: rgba(0, 0, 0, .85);
  }
}
</style>
