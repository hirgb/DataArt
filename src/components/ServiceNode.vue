<template lang="html">
<div class="wrap">
    <div class="map">
        <div class="point-area" style="top: 120px; left: 820px; position: absolute; width: 80px; height: 80px; visibility: visible; opacity: 1;">
            <p class="point-name" style="position: absolute; top: 30px; left: 50px;">华东</p>
            <a class="point point-dot"></a>
            <div class="point point-10"></div>
            <div class="point point-70"></div>
        </div>
        <div class="point-area" style="top: 120px; left: 880px; position: absolute; width: 80px; height: 80px; visibility: visible; opacity: 1;">
            <p class="point-name" style="position: absolute; top: 30px; left: 50px;">首尔</p>
            <a class="point point-dot"></a>
            <div class="point point-40"></div>
            <div class="point point-80"></div>
        </div>
        <div class="point-area" style="top: 230px; left: 780px; position: absolute; width: 140px; height: 140px; visibility: visible; opacity: 1;">
            <p class="point-name" style="position: absolute; top: 60px; left: 80px;">新加坡</p>
            <a class="point point-dot"></a>
            <div class="point point-10"></div>
            <div class="point point-40"></div>
            <div class="point point-80"></div>
        </div>
        <div class="point-area" style="top: 120px; left: 250px; position: absolute; width: 80px; height: 80px; visibility: visible; opacity: 1;">
            <p class="point-name" style="position: absolute; top: 30px; left: 50px;">美东</p>
            <a class="point point-dot"></a>
            <div class="point point-10"></div>
            <div class="point point-40"></div>
            <div class="point point-80"></div>
        </div>
    </div>
    <h2 class="title">持续扩张的计算中心不断提升数据的安全性和时效性</h2>
</div>
</template>

<script>
export default {}
</script>

<style scoped lang="stylus">
.title
    text-align: center;
    font-size: 36px;
    color: #fff;
    font-weight: 500;
    transform: translateY(80px)
.wrap
    width: 100%
    height: 100%
    // background-color: #1d748e
    .map
        width: 1127px
        height: 508px
        position: absolute
        left: 0
        top: 0
        right: 0
        bottom: 0
        margin: auto
        background-image: url(https://img.alicdn.com/tfs/TB1EBxZrwoQMeJjy0FoXXcShVXa-1127-508.png);
        background-repeat: no-repeat
        background-size: contain
.point-area
    text-align: center;
    position: relative;
    width: 150px;
    height: 150px;
    transition: opacity 0.5s ease-out;
    .point
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 10px;
        height: 10px;
        margin: auto;
        border-radius: 50%;
        background-clip: padding-box;
        background: transparent;
        &::after
            content: '';
            display: block;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border-radius: 50%;
            border: 2px solid #00cdec;
            opacity: 0;
    .point-name
        color: #fff
        font-size: 14px
    .point-dot
        z-index: 1;
        background-color: #6AD7E9;
        border: 1px solid rgba(0, 205, 236, 0.37);
    .point-10
        width: 100%;
        height: 100%;
        &::after
            animation: ripple 4500ms ease-out 225ms infinite;
    .point-40
        width: 100%;
        height: 100%;
        &::after
            animation: ripple 4500ms ease-out 900ms infinite;
    .point-70
        width: 100%
        height: 100%
        &::after
            animation: ripple 4500ms ease-out 1575ms infinite;
    .point-80
        width: 100%;
        height: 100%;
        &::after
            animation: ripple 4500ms ease-out 1800ms infinite;

@keyframes ripple
    0%
        opacity:0
        transform:scale(0.1,0.1)
    5%
        opacity:1
    100%
        opacity:0
        transform:scale(1)
</style>
