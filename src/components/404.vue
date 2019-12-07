<template lang="xtmin">
div .introduce
    h2 .title "404"
    div .sub-title "你访问的页面不存在"
    div style=margin-top:20px
        span .btn @click=gohome "首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页"
        span .btn @click=goback "返回上一页"
    div .breathingLampImage
</template>

<script>
export default {
    methods: {
        goback(){
            this.$router.go(-1)
        },
        gohome(){
            this.$router.push({path: '/'})
        }
    }
}
</script>

<style scoped lang="stylus">
.introduce
    height: 100vh
    width: 100vw
    box-sizing: border-box
    padding: 200px 200px 0 300px
    background-color: #1f2325
    background-image: url(https://img.alicdn.com/tfs/TB15W3LHbPpK1RjSZFFXXa5PpXa-3840-1280.jpg)
    background-size: cover
    background-repeat: no-repeat
    background-position: 75% 0
    .title
        color: #fff
        font-size: 72px
        position: relative
        display: inline-block
        font-weight: 400
    .sub-title
        color: #fff
        text-align: left;
        font-size: 24px;
        max-width: 700px;
        line-height: 36px;
    .breathingLampImage
        position: absolute
        width: 100vw
        height: 100vh
        left: 0
        top: 0
        background-image: url(https://img.alicdn.com/tfs/TB1wZAhHmzqK1RjSZPcXXbTepXa-3840-1280.png)
        background-size: cover
        background-repeat: no-repeat
        background-position: 75% 0
        opacity: .2;
        animation: breath 2s infinite ease-in-out alternate
        z-index: 0
    .btn
        position: relative
        z-index: 1
        display: inline-block
        font-size: 16px
        line-height: 18px
        padding: 8px
        color: #fff
        text-align: center
        margin-right: 20px
        border: 2px #fff solid
        user-select: none
        cursor: pointer
@keyframes breath
    0% {
        opacity: 0;
    }
    // 70% {
    //     opacity: 1;
    // }

    100% {
        opacity: 1;
    }
</style>
