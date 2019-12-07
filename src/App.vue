<template>
<div id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
*
    margin: 0
    padding: 0
#app
    position: relative
    font-family: 'PingFangSC','helvetica neue','hiragino sans gb','arial','microsoft yahei ui','microsoft yahei','simsun','sans-serif'
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    font-style: normal
    font-variant-ligatures: normal
    font-variant-caps: normal
    font-variant-numeric: normal
    font-variant-east-asian: normal
    font-weight: normal
    font-stretch: normal
</style>
