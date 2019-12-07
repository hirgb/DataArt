<template>
<div>
    <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section">
            <introduce />
        </div>
        <div class="section">
            <service-node />
        </div>
        <div class="section">
            <button class="my-arrow left" @click="$refs.fullpage.api.moveSlideLeft()">
                <svg width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
                    <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="
                        45.63,75.8 0.375,38.087 45.63,0.375 "/>
                </svg>
            </button>
            <button class="my-arrow right" @click="$refs.fullpage.api.moveSlideRight()">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="60px" height="80px" viewBox="0 0 50 80" xml:space="preserve">
                    <polyline fill="none" stroke="#FFFFFF" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" points="
                        0.375,0.375 45.63,38.087 0.375,75.8 "/>
                </svg>
            </button>
            <div class="slide">
                <faq1 />
            </div>
            <div class="slide">
                <faq2 />
            </div>
            <div class="slide">
                <faq3 />
            </div>
            <div class="slide">
                <faq4 />
            </div>
        </div>
        <div class="section">
            历史预测
        </div>
        <div class="section">
            免责声明
        </div>
    </full-page>
    <header>
        <h1 class="logo" style="font-family:'Bigruixian17a14273741bfa7';">阳关三叠</h1>
        <el-menu :default-active="activeIndex" class="menu" mode="horizontal" background-color="#00000000" text-color="#ddd" active-text-color="#fff" @select="goto">
            <el-menu-item index="index">产品概览</el-menu-item>
            <el-menu-item index="node">计算节点</el-menu-item>
            <el-menu-item index="faq">产品特点</el-menu-item>
            <el-menu-item index="forecast">历史预测</el-menu-item>
            <el-menu-item index="disclaimer">使用须知</el-menu-item>
        </el-menu>
    </header>
</div>
</template>

<script>
import Introduce from './Introduce.vue'
import ServiceNode from './ServiceNode.vue'
import Faq1 from './faq/1.vue'
import Faq2 from './faq/2.vue'
import Faq3 from './faq/3.vue'
import Faq4 from './faq/4.vue'
export default {
    components: {
        Introduce,
        ServiceNode,
        Faq1,
        Faq2,
        Faq3,
        Faq4,
    },
    data() {
        return {
            activeIndex: 'index',
            options: {
                menu: '#menu',
                anchors: ['index', 'node', 'faq', 'forecast', 'disclaimer'],
                sectionsColor: ['#961919', '#01579B', '#00796B', '#ff6161', '#444444'],
                navigation: true,
                controlArrows: false,
                afterLoad: this.afterLoad,
            },
        }
    },
    methods: {
        afterLoad() {
            let hash = window.location.href.split('/').slice(-1)[0]
            this.activeIndex = hash
        },
        goto(index) {
            let fromIndex = this.options.anchors.indexOf(this.activeIndex)
            let toIndex = this.options.anchors.indexOf(index)
            let a = fromIndex - toIndex
            let b = Math.abs(a)
            let scroll = a < 0 ? this.$refs.fullpage.api.moveSectionDown : this.$refs.fullpage.api.moveSectionUp
            for (let i = 0; i < b; i++) {
                scroll()
            }
        }
    }
}
</script>
<style lang="stylus">
.el-menu-item
    background-color: transparent !important
</style>
<style scoped lang="stylus">
header
    height: 60px
    width: calc(100vw - 40px)
    padding: 0 20px
    position: fixed
    left: 0
    top: 0
    user-select: none
.logo
    float: left
    line-height: 60px
    font-size: 24px
    color: #ddd
.menu
    float: right
.el-menu.el-menu--horizontal
    border-bottom: none
.my-arrow
    cursor: pointer;
    position: absolute;
    top: 50%;
    margin-top: -45px;
    width: 70px;
    height: 90px;
    z-index: 99;
    -webkit-appearance: none;
    background: 0 0;
    border: 0;
    outline: 0;
    polyline
        transition: all 250ms ease-in-out
    &:hover
        polyline
            stroke-width: 3
    &:active
        polyline
            stroke-width: 6
.left
    left: 5px
.right
    right: 40px
</style>
